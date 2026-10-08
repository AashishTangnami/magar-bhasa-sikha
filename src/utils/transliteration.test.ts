import { describe, it, expect } from 'vitest';
import { romanToAkkha, PHONETIC_KEY_MAPPINGS } from './transliteration';

describe('Transliteration Engine', () => {
  it('converts basic Romanized text into Akkha Lipi and Devanagari', () => {
    const result = romanToAkkha('ka');
    expect(result).toBeDefined();
    expect(result.akkha).toBe('𑀓');
    expect(result.devanagari).toBe('क');
  });

  it('handles empty input gracefully', () => {
    const result = romanToAkkha('');
    expect(result.akkha).toBe('');
    expect(result.devanagari).toBe('');
  });

  it('contains phonetic key mappings for vowels, consonants, and numerals', () => {
    expect(PHONETIC_KEY_MAPPINGS.length).toBeGreaterThan(0);
    const ka = PHONETIC_KEY_MAPPINGS.find((m) => m.roman === 'ka');
    expect(ka).toBeDefined();
    expect(ka?.devanagari).toBe('क');
  });
});
