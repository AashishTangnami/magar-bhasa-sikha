import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { romanToAkkha, PHONETIC_KEY_MAPPINGS } from './transliteration';
import { glyphById, akkhaToDevanagari } from './script-index';
import {
  createParticleField,
  spawnParticles,
  stepParticles,
  PARTICLE_GRAVITY,
  PARTICLE_DRAG,
  PARTICLE_FADE,
} from './particle-field';
import { buildSearchIndex, matchSearchIndex } from './search-index';
import {
  VOCAB_SEARCH_INDEX,
  DIALECT_SEARCH_INDEX,
  REFERENCE_SEARCH_INDEX,
  CLAN_SEARCH_INDEX,
} from './search-indexes';
import {
  INITIAL_CONVERSATION_PROGRESS,
  evaluateDialogueResponse,
  markScenarioCompleted,
  isScenarioCompleted,
  resetScenarioProgress,
} from './daily-conversations';
import { normalizeSearchQuery } from './uiux-laws';
import { ALL_AKKHA_GLYPHS, AKKHA_MATRAS, AKKHA_PUNCTUATION } from '../data/scriptData';
import { WIKIBOOKS_MAGAR_VOCABULARY } from '../data/wikibooksVocabulary';
import { COMPARATIVE_VOCABULARY } from '../data/dialectData';
import { REFERENCES_DATA } from '../data/referencesData';
import { MAGAR_CLANS_DATA } from '../data/clansAndDemographyData';
import { CONVERSATION_SCENARIOS } from '../data/conversationsData';

// ---------------------------------------------------------------------------
// Legacy reference implementations (verbatim behaviour before the refactor).
// The new code must reproduce these outputs exactly.
// ---------------------------------------------------------------------------
function legacyRomanToAkkha(input: string): { akkha: string; devanagari: string } {
  let akkhaResult = '';
  let devaResult = '';
  let i = 0;
  const lower = input.toLowerCase();
  while (i < lower.length) {
    if (lower[i] === ' ') {
      akkhaResult += ' ';
      devaResult += ' ';
      i++;
      continue;
    }
    let matched = false;
    for (let len = 4; len >= 1; len--) {
      if (i + len <= lower.length) {
        const sub = lower.substring(i, i + len);
        const mapping = PHONETIC_KEY_MAPPINGS.find((m) => m.roman === sub);
        if (mapping) {
          akkhaResult += mapping.akkha;
          devaResult += mapping.devanagari;
          i += len;
          matched = true;
          break;
        }
      }
    }
    if (!matched) {
      akkhaResult += input[i];
      devaResult += input[i];
      i++;
    }
  }
  return { akkha: akkhaResult, devanagari: devaResult };
}

function legacyDevanagari(text: string): string {
  let result = '';
  for (const c of Array.from(text)) {
    const g = ALL_AKKHA_GLYPHS.find((glyph) => glyph.glyph === c);
    const m = AKKHA_MATRAS.find((matra) => matra.glyph === c);
    const p = AKKHA_PUNCTUATION.find((punc) => punc.glyph === c);
    if (g) result += g.devalipi;
    else if (m) result += m.deva;
    else if (p) result += p.deva;
    else result += c;
  }
  return result;
}

// Legacy per-field matcher (formerly exported from uiux-laws; now only a test reference)
function matchesQuery(target: string | undefined | null, query: string): boolean {
  if (!target || !query) return false;
  return normalizeSearchQuery(target).includes(normalizeSearchQuery(query));
}

const readSource = (relPath: string): string => readFileSync(resolve(process.cwd(), relPath), 'utf8');

describe('DOD consolidation', () => {
  describe('A · transliteration lookup table', () => {
    it('matches the legacy linear-scan engine for every key and mixed input', () => {
      const cases: string[] = PHONETIC_KEY_MAPPINGS.map((m) => m.roman);
      cases.push(
        '',
        ' ',
        'jhorle',
        'Jhorle Apa Aama',
        'ksha tra gya',
        'kshatriya',
        'magarat akkha lipi',
        'chhaaaa  kha',
        'xyz?! 123 || |',
        'NAMASTE',
        'ghalek mundri'
      );
      for (const input of cases) {
        expect(romanToAkkha(input), `input "${input}"`).toEqual(legacyRomanToAkkha(input));
      }
    });

    it('does not scan the mapping list per keystroke', () => {
      const src = readSource('src/utils/transliteration.ts');
      const body = src.slice(src.indexOf('export function romanToAkkha'));
      expect(body.includes('.find(')).toBe(false);
    });
  });

  describe('B/C · script indexes', () => {
    it('glyph index lookups equal the legacy .find results', () => {
      for (const g of ALL_AKKHA_GLYPHS) {
        expect(glyphById(g.id)).toBe(ALL_AKKHA_GLYPHS.find((x) => x.id === g.id));
      }
      expect(glyphById('missing')).toBeUndefined();
    });

    it('Devanagari conversion equals the legacy three-scan conversion', () => {
      const all =
        ALL_AKKHA_GLYPHS.map((g) => g.glyph).join('') +
        AKKHA_MATRAS.map((m) => m.glyph).join('') +
        AKKHA_PUNCTUATION.map((p) => p.glyph).join('');
      for (const text of [all, '', ' ', '𑀛𑁄𑀭𑁆𑀮𑁂', '𑀅𑀧𑀸 𑀆𑀫𑀸', 'abc 𑀓']) {
        expect(akkhaToDevanagari(text)).toBe(legacyDevanagari(text));
      }
    });
  });

  describe('D · particle field (SoA)', () => {
    it('steps with the same physics as the legacy per-object loop, without reallocating', () => {
      const field = createParticleField(4);
      let seed = 7;
      const rng = () => {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
      };
      spawnParticles(field, 4, 400, 300, 7, rng);

      const legacy = Array.from({ length: field.count }, (_, i) => ({
        x: field.x[i],
        y: field.y[i],
        vx: field.vx[i],
        vy: field.vy[i],
        rot: field.rot[i],
        rotSpeed: field.rotSpeed[i],
        alpha: field.alpha[i],
      }));
      const buffers = [field.x, field.y, field.vx, field.vy, field.alpha];

      for (let step = 0; step < 10; step++) {
        stepParticles(field);
        for (const p of legacy) {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += PARTICLE_GRAVITY;
          p.vx *= PARTICLE_DRAG;
          p.rot += p.rotSpeed;
          p.alpha -= PARTICLE_FADE;
        }
      }
      for (let i = 0; i < legacy.length; i++) {
        expect(field.x[i]).toBeCloseTo(legacy[i].x, 2);
        expect(field.y[i]).toBeCloseTo(legacy[i].y, 2);
        expect(field.vy[i]).toBeCloseTo(legacy[i].vy, 3);
        expect(field.rot[i]).toBeCloseTo(legacy[i].rot, 3);
        expect(field.alpha[i]).toBeCloseTo(legacy[i].alpha, 3);
      }
      expect([field.x, field.y, field.vx, field.vy, field.alpha]).toEqual(buffers);
      expect(buffers.every((b, i) => b === [field.x, field.y, field.vx, field.vy, field.alpha][i])).toBe(true);
    });

    it('live count reaches zero as particles fade', () => {
      const field = createParticleField(8);
      spawnParticles(field, 8, 0, 0, 7, Math.random);
      let live = field.count;
      for (let step = 0; step < 200 && live > 0; step++) live = stepParticles(field);
      expect(live).toBe(0);
    });
  });

  describe('E · prebuilt search indexes', () => {
    const queries = ['a', 'water', 'मा', 'jhorle', 'kham', 'thapa', 'gaha', 'unicode', 'palpa', 'rolpa', '  Dhut ', 'zzzz-none'];

    it('generic index never matches across field boundaries', () => {
      const index = buildSearchIndex([{ a: 'ab', b: 'cd' }], (r) => [r.a, r.b]);
      const mask = new Uint8Array(1);
      expect(matchSearchIndex(index, 'bc', mask)).toBe(0);
      expect(matchSearchIndex(index, 'cd', mask)).toBe(1);
      expect(mask[0]).toBe(1);
    });

    it('vocabulary and dialect indexes equal the legacy per-field matchesQuery filters', () => {
      const vocabMask = new Uint8Array(WIKIBOOKS_MAGAR_VOCABULARY.length);
      const dialectMask = new Uint8Array(COMPARATIVE_VOCABULARY.length);
      for (const q of queries) {
        matchSearchIndex(VOCAB_SEARCH_INDEX, q, vocabMask);
        WIKIBOOKS_MAGAR_VOCABULARY.forEach((w, i) => {
          const legacy =
            matchesQuery(w.english, q) ||
            matchesQuery(w.nepali, q) ||
            matchesQuery(w.magarRoman, q) ||
            matchesQuery(w.magarDeva, q) ||
            matchesQuery(w.phonetic, q) ||
            matchesQuery(w.magarAkkha, q);
          expect(vocabMask[i] === 1, `vocab "${q}" #${i}`).toBe(legacy);
        });

        matchSearchIndex(DIALECT_SEARCH_INDEX, q, dialectMask);
        COMPARATIVE_VOCABULARY.forEach((item, i) => {
          const legacy =
            matchesQuery(item.english, q) ||
            matchesQuery(item.dhut.word, q) ||
            matchesQuery(item.dhut.deva, q) ||
            matchesQuery(item.dhut.phonetic, q) ||
            matchesQuery(item.kham.word, q) ||
            matchesQuery(item.kham.deva, q) ||
            matchesQuery(item.kham.phonetic, q) ||
            matchesQuery(item.kaike.word, q) ||
            matchesQuery(item.kaike.deva, q) ||
            matchesQuery(item.kaike.phonetic, q) ||
            Boolean(item.culturalContext && matchesQuery(item.culturalContext, q));
          expect(dialectMask[i] === 1, `dialect "${q}" #${i}`).toBe(legacy);
        });
      }
    });

    it('reference and clan indexes equal the legacy lowercase filters for ordinary queries', () => {
      const refMask = new Uint8Array(REFERENCES_DATA.length);
      const clanMask = new Uint8Array(MAGAR_CLANS_DATA.length);
      for (const raw of queries) {
        const q = raw.toLowerCase().trim();
        matchSearchIndex(REFERENCE_SEARCH_INDEX, raw, refMask);
        REFERENCES_DATA.forEach((item, i) => {
          const legacy =
            item.title.toLowerCase().includes(q) ||
            item.titleNepali.toLowerCase().includes(q) ||
            item.authorOrOrg.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q) ||
            item.tags.some((t) => t.toLowerCase().includes(q));
          expect(refMask[i] === 1, `ref "${raw}" #${i}`).toBe(legacy);
        });

        matchSearchIndex(CLAN_SEARCH_INDEX, raw, clanMask);
        MAGAR_CLANS_DATA.forEach((clan, i) => {
          const legacy =
            clan.name.toLowerCase().includes(q) ||
            clan.nameNepali.toLowerCase().includes(q) ||
            clan.description.toLowerCase().includes(q) ||
            clan.historicalRole.toLowerCase().includes(q) ||
            clan.primaryRegions.some((r) => r.toLowerCase().includes(q)) ||
            clan.subClans.some(
              (sc) =>
                sc.name.toLowerCase().includes(q) ||
                sc.nameNepali.toLowerCase().includes(q) ||
                Boolean(sc.meaningOrNote && sc.meaningOrNote.toLowerCase().includes(q))
            );
          expect(clanMask[i] === 1, `clan "${raw}" #${i}`).toBe(legacy);
        });
      }
    });

    it('empty or whitespace query matches every record', () => {
      const mask = new Uint8Array(REFERENCES_DATA.length);
      expect(matchSearchIndex(REFERENCE_SEARCH_INDEX, '   ', mask)).toBe(REFERENCES_DATA.length);
    });
  });

  describe('G · conversation progress (pure, bitmask in state)', () => {
    it('evaluates, completes and resets without mutating inputs', () => {
      const turn = CONVERSATION_SCENARIOS[0].turns[0];
      const correct = turn.options.find((o) => o.isCulturallyAppropriate)!;
      const start = INITIAL_CONVERSATION_PROGRESS;

      const { progress, result } = evaluateDialogueResponse(start, turn, correct.id);
      expect(result.isCorrect).toBe(true);
      expect(result.scoreBonus).toBe(50);
      expect(result.explanation).toBeTruthy();
      expect(progress.accuracy).toBe(50);
      expect(start.accuracy).toBe(0);

      const again = evaluateDialogueResponse(evaluateDialogueResponse(progress, turn, correct.id).progress, turn, correct.id);
      expect(again.progress.accuracy).toBe(100); // capped

      let p = markScenarioCompleted(start, 0);
      p = markScenarioCompleted(p, 2);
      expect(isScenarioCompleted(p.completionMask, 0)).toBe(true);
      expect(isScenarioCompleted(p.completionMask, 1)).toBe(false);
      expect(isScenarioCompleted(p.completionMask, 2)).toBe(true);
      expect(p.streak).toBe(2);
      expect(start.completionMask).toBe(0);

      const reset = resetScenarioProgress({ ...p, accuracy: 100 });
      expect(reset.accuracy).toBe(0);
      expect(reset.completionMask).toBe(p.completionMask);
      expect(reset.streak).toBe(p.streak);
    });
  });

  describe('F · no write-only state mirrors', () => {
    it('no component mirrors UI state into module-level typed buffers', () => {
      const dir = resolve(process.cwd(), 'src/components');
      for (const file of readdirSync(dir)) {
        const src = readFileSync(resolve(dir, file), 'utf8');
        expect(/_STATE_BUFFER|init\w*StateBuffer|set\w*State\(\d/.test(src), `${file} mirrors state into a buffer`).toBe(false);
      }
      const utils = readSource('src/utils/ui-makeover.ts') + readSource('src/utils/perception-impeccable-harness.ts');
      expect(/_STATE_BUFFER|initUiInteractionBuffer/.test(utils)).toBe(false);
    });

    it('celebration renders from the SoA particle field', () => {
      const src = readSource('src/components/LaliGuransCelebration.tsx');
      expect(src.includes('stepParticles(')).toBe(true);
      expect(src.includes('particles.forEach')).toBe(false);
    });
  });
});
