import { describe, it, expect, vi, afterEach } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  createStrokeBuffer,
  pushStrokePoint,
  resetStrokeBuffer,
  STROKE_BUFFER_INITIAL_CAPACITY,
} from './stroke-buffer';
import { createTimerRegistry } from './timer-registry';
import { loadJSON, saveJSON, mergeWithDefaults } from './safe-storage';

const readSource = (relPath: string): string => readFileSync(resolve(process.cwd(), relPath), 'utf8');

describe('Memory Safety Hardening', () => {
  describe('stroke buffer (SoA Float32Array)', () => {
    it('stores points in place and grows by doubling with logarithmic reallocations', () => {
      const buf = createStrokeBuffer();
      expect(buf.xs).toBeInstanceOf(Float32Array);
      expect(buf.ys).toBeInstanceOf(Float32Array);
      expect(buf.xs.length).toBe(STROKE_BUFFER_INITIAL_CAPACITY);

      let reallocations = 0;
      let lastXs = buf.xs;
      for (let i = 0; i < 1000; i++) {
        pushStrokePoint(buf, i, i * 2);
        if (buf.xs !== lastXs) {
          reallocations++;
          lastXs = buf.xs;
        }
      }

      expect(buf.count).toBe(1000);
      expect(buf.xs[0]).toBe(0);
      expect(buf.xs[999]).toBe(999);
      expect(buf.ys[999]).toBe(1998);
      expect(buf.ys[300]).toBe(600); // preserved across growth
      const capacity = buf.xs.length;
      expect(capacity).toBeGreaterThanOrEqual(1000);
      expect(Math.log2(capacity) % 1).toBe(0);
      expect(reallocations).toBeLessThanOrEqual(Math.ceil(Math.log2(1000 / STROKE_BUFFER_INITIAL_CAPACITY)));
    });

    it('resets without reallocating', () => {
      const buf = createStrokeBuffer();
      for (let i = 0; i < 600; i++) pushStrokePoint(buf, i, i);
      const xsBefore = buf.xs;
      resetStrokeBuffer(buf);
      expect(buf.count).toBe(0);
      expect(buf.xs).toBe(xsBefore);
    });
  });

  describe('timer registry', () => {
    afterEach(() => {
      vi.useRealTimers();
    });

    it('cancels the previous timer when a key is re-armed', () => {
      vi.useFakeTimers();
      const registry = createTimerRegistry();
      const first = vi.fn();
      const second = vi.fn();
      registry.schedule('copied', first, 2000);
      vi.advanceTimersByTime(1000);
      registry.schedule('copied', second, 2000);
      vi.advanceTimersByTime(1500);
      expect(first).not.toHaveBeenCalled();
      expect(second).not.toHaveBeenCalled();
      vi.advanceTimersByTime(500);
      expect(second).toHaveBeenCalledTimes(1);
      expect(registry.size()).toBe(0);
    });

    it('clearAll prevents every pending callback (unmount)', () => {
      vi.useFakeTimers();
      const registry = createTimerRegistry();
      const a = vi.fn();
      const b = vi.fn();
      registry.schedule('a', a, 100);
      registry.schedule('b', b, 200);
      registry.clearAll();
      vi.advanceTimersByTime(1000);
      expect(a).not.toHaveBeenCalled();
      expect(b).not.toHaveBeenCalled();
      expect(registry.size()).toBe(0);
    });
  });

  describe('safe storage', () => {
    const defaults = {
      activeDialect: 'dhut',
      completedLessonIds: ['lesson-1'],
      mundriCount: 8,
      soundEnabled: false,
    };

    it('merges per key, rejecting wrong types and missing arrays', () => {
      const merged = mergeWithDefaults(
        { activeDialect: 'kham', completedLessonIds: 'oops', mundriCount: '12', extraScore: 40 },
        defaults
      );
      expect(merged.activeDialect).toBe('kham');
      expect(merged.completedLessonIds).toEqual(['lesson-1']);
      expect(merged.mundriCount).toBe(8);
      expect(merged.soundEnabled).toBe(false);
      expect((merged as Record<string, unknown>).extraScore).toBe(40);
    });

    it('returns defaults for non-object or malformed input', () => {
      expect(mergeWithDefaults(null, defaults)).toEqual(defaults);
      expect(mergeWithDefaults([1, 2], defaults)).toEqual(defaults);
      const storage = { getItem: () => '{not json', setItem: () => undefined };
      expect(loadJSON(storage, 'k', defaults)).toEqual(defaults);
    });

    it('never throws when storage is unavailable', () => {
      const throwing = {
        getItem: () => {
          throw new Error('SecurityError');
        },
        setItem: () => {
          throw new Error('QuotaExceededError');
        },
      };
      expect(loadJSON(throwing, 'k', defaults)).toEqual(defaults);
      expect(saveJSON(throwing, 'k', defaults)).toBe(false);
      expect(saveJSON(undefined, 'k', defaults)).toBe(false);
    });
  });

  describe('source guards', () => {
    it('sand tracing hot path does not copy arrays or set state per move', () => {
      const src = readSource('src/components/SandTracingCanvas.tsx');
      expect(src.includes('[...prev, pt]')).toBe(false);
      expect(src.includes('pushStrokePoint(')).toBe(true);
    });

    it('Guruma is a static placeholder with no network calls', () => {
      const modal = readSource('src/components/AiGuruModal.tsx');
      expect(modal.includes('fetch(')).toBe(false);
      expect(modal.includes('useState')).toBe(false);
    });

    it('server exposes no paid AI endpoints', () => {
      expect(readSource('server.ts').includes('/api/ai/')).toBe(false);
    });

    it('celebration animation does not restart on parent re-render', () => {
      const src = readSource('src/components/LaliGuransCelebration.tsx');
      expect(src.includes('[active, onComplete]')).toBe(false);
      expect(src.includes('onCompleteRef')).toBe(true);
    });

    it('daily conversation cancels speech on unmount', () => {
      const src = readSource('src/components/DailyConversationLab.tsx');
      expect(/return \(\) => \{[\s\S]{0,600}speechSynthesis\.cancel\(\)/.test(src)).toBe(true);
    });

    it('copy-feedback components use the unmount-safe timeout hook', () => {
      const files = ['ReferencesAndLinks', 'MagarClansAndDemography', 'VirtualKeyboard'];
      for (let i = 0; i < files.length; i++) {
        const src = readSource(`src/components/${files[i]}.tsx`);
        expect(/(^|[^.\w])setTimeout\(/m.test(src), `${files[i]} uses a bare setTimeout`).toBe(false);
        expect(src.includes('useSafeTimeout'), `${files[i]} must use useSafeTimeout`).toBe(true);
      }
    });

    it('App persists stats through safe storage', () => {
      const app = readSource('src/App.tsx');
      expect(app.includes('localStorage.setItem')).toBe(false);
      expect(app.includes('loadJSON(')).toBe(true);
    });
  });
});
