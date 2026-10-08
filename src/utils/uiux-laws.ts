/**
 * Postel's Law (Robustness Principle) — see .harness/guides/15-ui-ux-design-laws.md
 * Liberal input normalizer for search queries across multilingual scripts
 * (English, Romanized Magar, Devanagari Nepali, Akkha Lipi).
 */
export function normalizeSearchQuery(query: string): string {
  if (!query) return '';
  return query
    .trim()
    .toLowerCase()
    .replace(/[\s​-‍﻿]+/g, ' ') // Collapse whitespace & zero-width characters
    .normalize('NFC'); // Canonical Unicode decomposition/composition
}
