/**
 * DOD hot-path micro-benchmarks: legacy implementation vs current one.
 * Run with `npm run bench`. Not part of the test gate; numbers are machine-dependent.
 */
import { performance } from 'node:perf_hooks';
import { romanToAkkha, PHONETIC_KEY_MAPPINGS } from '../src/utils/transliteration';
import { createStrokeBuffer, pushStrokePoint, resetStrokeBuffer } from '../src/utils/stroke-buffer';
import { buildSearchIndex, matchSearchIndex } from '../src/utils/search-index';
import { normalizeSearchQuery } from '../src/utils/uiux-laws';
import { WIKIBOOKS_MAGAR_VOCABULARY } from '../src/data/wikibooksVocabulary';

function measure(label: string, iterations: number, fn: () => void): number {
  for (let i = 0; i < Math.min(50, iterations); i++) fn(); // warm-up
  const start = performance.now();
  for (let i = 0; i < iterations; i++) fn();
  const perOpUs = ((performance.now() - start) * 1000) / iterations;
  console.log(`  ${label.padEnd(34)} ${perOpUs.toFixed(2).padStart(10)} µs/op`);
  return perOpUs;
}

function compare(title: string, iterations: number, legacy: () => void, current: () => void): void {
  console.log(title);
  const a = measure('legacy', iterations, legacy);
  const b = measure('current (DOD)', iterations, current);
  console.log(`  speed-up ×${(a / b).toFixed(1)}\n`);
}

// 1. Stroke capture: 2,000 pointer moves per trace
type Pt = { x: number; y: number };
compare(
  'Sand tracing capture — 2,000 points per trace',
  200,
  () => {
    let points: Pt[] = [];
    for (let i = 0; i < 2000; i++) points = [...points, { x: i, y: i * 0.5 }];
  },
  (() => {
    const buf = createStrokeBuffer();
    return () => {
      resetStrokeBuffer(buf);
      for (let i = 0; i < 2000; i++) pushStrokePoint(buf, i, i * 0.5);
    };
  })()
);

// 2. Transliteration: one keystroke on a 40-character sentence
const sentence = 'jhorle apa aama ghalek mundri kshatriya ';
function legacyRomanToAkkha(input: string): string {
  let out = '';
  const lower = input.toLowerCase();
  let i = 0;
  while (i < lower.length) {
    if (lower[i] === ' ') { out += ' '; i++; continue; }
    let matched = false;
    for (let len = 4; len >= 1; len--) {
      if (i + len <= lower.length) {
        const m = PHONETIC_KEY_MAPPINGS.find((k) => k.roman === lower.substring(i, i + len));
        if (m) { out += m.akkha; i += len; matched = true; break; }
      }
    }
    if (!matched) { out += input[i]; i++; }
  }
  return out;
}
compare('Transliteration — 40-char input per keystroke', 20000, () => void legacyRomanToAkkha(sentence), () => void romanToAkkha(sentence));

// 3. Vocabulary search: one keystroke over the full vocabulary
const index = buildSearchIndex(WIKIBOOKS_MAGAR_VOCABULARY, (w) => [w.english, w.nepali, w.magarRoman, w.magarDeva, w.phonetic, w.magarAkkha]);
const mask = new Uint8Array(WIKIBOOKS_MAGAR_VOCABULARY.length);
const legacyMatch = (t: string | undefined, q: string) => Boolean(t) && normalizeSearchQuery(t!).includes(normalizeSearchQuery(q));
compare(
  `Vocabulary search — ${WIKIBOOKS_MAGAR_VOCABULARY.length} words per keystroke`,
  20000,
  () =>
    void WIKIBOOKS_MAGAR_VOCABULARY.filter(
      (w) =>
        legacyMatch(w.english, 'wat') ||
        legacyMatch(w.nepali, 'wat') ||
        legacyMatch(w.magarRoman, 'wat') ||
        legacyMatch(w.magarDeva, 'wat') ||
        legacyMatch(w.phonetic, 'wat') ||
        legacyMatch(w.magarAkkha, 'wat')
    ),
  () => void matchSearchIndex(index, 'wat', mask)
);
