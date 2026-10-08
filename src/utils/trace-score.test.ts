import { describe, it, expect } from 'vitest';
import { buildGuideSamples, scoreTrace, CanvasMapping, TRACE_PASS_SCORE } from './trace-score';
import { createStrokeBuffer, pushStrokePoint } from './stroke-buffer';
import { ALL_AKKHA_GLYPHS } from '../data/scriptData';

// Same mapping SandTracingCanvas uses: 40px margin, glyph space 0–100 scaled to the drawable area
const SIZE = 380;
const MAPPING: CanvasMapping = { originX: 40, originY: 40, scaleX: (SIZE - 80) / 100, scaleY: (SIZE - 80) / 100 };
const glyph = ALL_AKKHA_GLYPHS.find((g) => g.strokes.length >= 3)!;
const guide = buildGuideSamples(glyph.strokes);

const traceGuide = (fraction: number, offsetPx = 0) => {
  const buf = createStrokeBuffer();
  const n = Math.floor(guide.count * fraction);
  for (let i = 0; i < n; i++) {
    pushStrokePoint(
      buf,
      MAPPING.originX + guide.gx[i] * MAPPING.scaleX + offsetPx,
      MAPPING.originY + guide.gy[i] * MAPPING.scaleY + offsetPx
    );
  }
  return buf;
};

describe('trace score (geometric, deterministic)', () => {
  it('densifies stroke guides into evenly spaced typed-array samples', () => {
    expect(guide.gx).toBeInstanceOf(Float32Array);
    expect(guide.count).toBeGreaterThan(glyph.strokes.reduce((n, s) => n + s.points.length, 0));
    for (let i = 0; i < guide.count; i++) {
      expect(guide.gx[i]).toBeGreaterThanOrEqual(0);
      expect(guide.gx[i]).toBeLessThanOrEqual(100);
    }
  });

  it('scores a faithful trace near 100', () => {
    const result = scoreTrace(guide, traceGuide(1), MAPPING);
    expect(result.coverage).toBeGreaterThanOrEqual(0.99);
    expect(result.precision).toBeGreaterThanOrEqual(0.99);
    expect(result.score).toBeGreaterThanOrEqual(95);
  });

  it('scores an empty trace as 0', () => {
    const result = scoreTrace(guide, createStrokeBuffer(), MAPPING);
    expect(result.score).toBe(0);
  });

  it('penalises a trace drawn far from the guide', () => {
    // 400px ≈ 133 glyph units: entirely outside the 0–100 glyph box
    const result = scoreTrace(guide, traceGuide(1, 400), MAPPING);
    expect(result.score).toBeLessThan(20);
  });

  it('reflects partial coverage', () => {
    const result = scoreTrace(guide, traceGuide(0.5), MAPPING);
    expect(result.coverage).toBeGreaterThan(0.35);
    expect(result.coverage).toBeLessThan(0.7);
    expect(result.precision).toBeGreaterThanOrEqual(0.99);
  });

  it('does not reward scribbling on a single spot', () => {
    const buf = createStrokeBuffer();
    const x = MAPPING.originX + guide.gx[0] * MAPPING.scaleX;
    const y = MAPPING.originY + guide.gy[0] * MAPPING.scaleY;
    for (let i = 0; i < 200; i++) pushStrokePoint(buf, x + (i % 3), y + (i % 2));
    expect(scoreTrace(guide, buf, MAPPING).coverage).toBeLessThan(0.2);
  });

  it('passes a faithful trace and fails a far-off one against the pass threshold', () => {
    expect(scoreTrace(guide, traceGuide(1), MAPPING).score).toBeGreaterThanOrEqual(TRACE_PASS_SCORE);
    expect(scoreTrace(guide, traceGuide(1, 400), MAPPING).score).toBeLessThan(TRACE_PASS_SCORE);
  });

  it('is deterministic', () => {
    const buf = traceGuide(0.8);
    expect(scoreTrace(guide, buf, MAPPING)).toEqual(scoreTrace(guide, buf, MAPPING));
  });
});
