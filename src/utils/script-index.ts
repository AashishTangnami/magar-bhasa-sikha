import { AkkhaGlyph } from '../types';
import { ALL_AKKHA_GLYPHS, AKKHA_MATRAS, AKKHA_PUNCTUATION } from '../data/scriptData';

/**
 * Akkha script lookup tables, built once at module load.
 * Replace per-render / per-keystroke linear scans over the glyph lists with O(1) Map lookups.
 */

// First occurrence wins (same result as Array.prototype.find).
const GLYPH_BY_ID = new Map<string, AkkhaGlyph>();
for (const g of ALL_AKKHA_GLYPHS) {
  if (!GLYPH_BY_ID.has(g.id)) GLYPH_BY_ID.set(g.id, g);
}

/** Glyph by id. */
export function glyphById(id: string): AkkhaGlyph | undefined {
  return GLYPH_BY_ID.get(id);
}

// Akkha character -> Devanagari. Precedence: glyphs, then matras, then punctuation (first set wins).
const DEVA_BY_CHAR = new Map<string, string>();
for (const g of ALL_AKKHA_GLYPHS) if (!DEVA_BY_CHAR.has(g.glyph)) DEVA_BY_CHAR.set(g.glyph, g.devalipi);
for (const m of AKKHA_MATRAS) if (!DEVA_BY_CHAR.has(m.glyph)) DEVA_BY_CHAR.set(m.glyph, m.deva);
for (const p of AKKHA_PUNCTUATION) if (!DEVA_BY_CHAR.has(p.glyph)) DEVA_BY_CHAR.set(p.glyph, p.deva);

/** Approximate Devanagari rendering of Akkha text; unmapped code points pass through unchanged. */
export function akkhaToDevanagari(text: string): string {
  const parts: string[] = [];
  for (const c of text) {
    parts.push(DEVA_BY_CHAR.get(c) ?? c);
  }
  return parts.join('');
}
