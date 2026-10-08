import { describe, it, expect } from 'vitest';
import { normalizeSearchQuery } from './uiux-laws';
import { LEARNING_MODULES, SAMPLE_AKKHA_GLYPHS } from '../constants/home';
import { VOCAB_CATEGORIES } from '../constants/wordsLearner';
import { DIALECT_CATEGORIES } from '../constants/dialectMatrix';
import { SAND_TRACING_TABS, DEFAULT_SAND_GLYPH_ID, SAND_CANVAS_PALETTES } from '../constants/sandTracing';
import { AVATAR_CATEGORY_FILTERS } from '../constants/avatarWardrobe';
import { HERITAGE_TABS } from '../constants/culturalManuscript';

describe('UI constants rendered by the app', () => {
  it('home learning modules follow the serial-position order (explore first, references last)', () => {
    expect(LEARNING_MODULES.length).toBeGreaterThan(0);
    expect(LEARNING_MODULES[0].id).toBe('words');
    expect(LEARNING_MODULES[LEARNING_MODULES.length - 1].id).toBe('references');
    expect(SAMPLE_AKKHA_GLYPHS.length).toBeGreaterThan(0);
  });

  it('tab and filter sets are complete', () => {
    expect(VOCAB_CATEGORIES.length).toBeGreaterThan(0);
    expect(DIALECT_CATEGORIES.length).toBeGreaterThan(0);
    expect(SAND_TRACING_TABS.length).toBe(3);
    expect(DEFAULT_SAND_GLYPH_ID).toBe('vowel-a');
    expect(AVATAR_CATEGORY_FILTERS.length).toBe(4);
    expect(HERITAGE_TABS.length).toBe(7);
  });

  it('sand canvas palettes avoid the legacy crimson base in both themes', () => {
    expect(SAND_CANVAS_PALETTES.light.canvasBg).not.toBe('#BC002D');
    expect(SAND_CANVAS_PALETTES.dark.canvasBg).not.toBe('#BC002D');
  });
});

describe("Postel's Law: tolerant multilingual search input", () => {
  it('normalizes case, surrounding and repeated whitespace, and zero-width characters', () => {
    expect(normalizeSearchQuery('   JHORLE   ')).toBe('jhorle');
    expect(normalizeSearchQuery('Kaike   Language')).toBe('kaike language');
    expect(normalizeSearchQuery('झोर्ले​नमस्कार')).toBe('झोर्ले नमस्कार');
    expect(normalizeSearchQuery('')).toBe('');
  });

  it('produces canonical (NFC) Unicode so composed and decomposed input match', () => {
    const decomposed = 'é'; // e + combining acute
    expect(normalizeSearchQuery(decomposed)).toBe('é');
  });
});
