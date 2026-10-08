/**
 * Phonetic Transliteration Engine for Magar Akkha Lipi
 * Referenced from Nepex Magar Keyboard Specifications (https://magarkeyboard.nepexgroup.com/characters)
 */

export interface TransliterationMapping {
  roman: string;
  devanagari: string;
  akkha: string;
  type: 'consonant' | 'vowel' | 'matra' | 'number' | 'conjunct' | 'punctuation';
}

export const PHONETIC_KEY_MAPPINGS: TransliterationMapping[] = [
  // Conjuncts
  { roman: 'ksha', devanagari: 'क्ष', akkha: '𑀓𑁆𑀱', type: 'conjunct' },
  { roman: 'tra', devanagari: 'त्र', akkha: '𑀢𑁆𑀭', type: 'conjunct' },
  { roman: 'gya', devanagari: 'ज्ञ', akkha: '𑀚𑁆𑀜', type: 'conjunct' },

  // Complex Consonants
  { roman: 'chha', devanagari: 'छ', akkha: '𑀙', type: 'consonant' },
  { roman: 'chh', devanagari: 'छ', akkha: '𑀙', type: 'consonant' },
  { roman: 'shha', devanagari: 'ष', akkha: '𑀱', type: 'consonant' },
  { roman: 'sha', devanagari: 'श', akkha: '𑀰', type: 'consonant' },
  { roman: 'sh', devanagari: 'श', akkha: '𑀰', type: 'consonant' },
  { roman: 'kha', devanagari: 'ख', akkha: '𑀔', type: 'consonant' },
  { roman: 'kh', devanagari: 'ख', akkha: '𑀔', type: 'consonant' },
  { roman: 'gha', devanagari: 'घ', akkha: '𑀖', type: 'consonant' },
  { roman: 'gh', devanagari: 'घ', akkha: '𑀖', type: 'consonant' },
  { roman: 'nga', devanagari: 'ङ', akkha: '𑀗', type: 'consonant' },
  { roman: 'ng', devanagari: 'ङ', akkha: '𑀗', type: 'consonant' },
  { roman: 'cha', devanagari: 'च', akkha: '𑀘', type: 'consonant' },
  { roman: 'ch', devanagari: 'च', akkha: '𑀘', type: 'consonant' },
  { roman: 'jha', devanagari: 'झ', akkha: '𑀛', type: 'consonant' },
  { roman: 'jh', devanagari: 'झ', akkha: '𑀛', type: 'consonant' },
  { roman: 'nya', devanagari: 'ञ', akkha: '𑀜', type: 'consonant' },
  { roman: 'ny', devanagari: 'ञ', akkha: '𑀜', type: 'consonant' },
  { roman: 'tta', devanagari: 'ट', akkha: '𑀝', type: 'consonant' },
  { roman: 'ttha', devanagari: 'ठ', akkha: '𑀞', type: 'consonant' },
  { roman: 'dda', devanagari: 'ड', akkha: '𑀟', type: 'consonant' },
  { roman: 'ddha', devanagari: 'ढ', akkha: '𑀠', type: 'consonant' },
  { roman: 'nna', devanagari: 'ण', akkha: '𑀡', type: 'consonant' },
  { roman: 'tha', devanagari: 'थ', akkha: '𑀣', type: 'consonant' },
  { roman: 'th', devanagari: 'थ', akkha: '𑀣', type: 'consonant' },
  { roman: 'dha', devanagari: 'ध', akkha: '𑀥', type: 'consonant' },
  { roman: 'dh', devanagari: 'ध', akkha: '𑀥', type: 'consonant' },
  { roman: 'pha', devanagari: 'फ', akkha: '𑀨', type: 'consonant' },
  { roman: 'ph', devanagari: 'फ', akkha: '𑀨', type: 'consonant' },
  { roman: 'bha', devanagari: 'भ', akkha: '𑀪', type: 'consonant' },
  { roman: 'bh', devanagari: 'भ', akkha: '𑀪', type: 'consonant' },

  // Base Consonants
  { roman: 'ka', devanagari: 'क', akkha: '𑀓', type: 'consonant' },
  { roman: 'k', devanagari: 'क', akkha: '𑀓', type: 'consonant' },
  { roman: 'ga', devanagari: 'ग', akkha: '𑀕', type: 'consonant' },
  { roman: 'g', devanagari: 'ग', akkha: '𑀕', type: 'consonant' },
  { roman: 'ja', devanagari: 'ज', akkha: '𑀚', type: 'consonant' },
  { roman: 'j', devanagari: 'ज', akkha: '𑀚', type: 'consonant' },
  { roman: 'ta', devanagari: 'त', akkha: '𑀢', type: 'consonant' },
  { roman: 't', devanagari: 'त', akkha: '𑀢', type: 'consonant' },
  { roman: 'da', devanagari: 'द', akkha: '𑀤', type: 'consonant' },
  { roman: 'd', devanagari: 'द', akkha: '𑀤', type: 'consonant' },
  { roman: 'na', devanagari: 'न', akkha: '𑀦', type: 'consonant' },
  { roman: 'n', devanagari: 'न', akkha: '𑀦', type: 'consonant' },
  { roman: 'pa', devanagari: 'प', akkha: '𑀧', type: 'consonant' },
  { roman: 'p', devanagari: 'प', akkha: '𑀧', type: 'consonant' },
  { roman: 'ba', devanagari: 'ब', akkha: '𑀩', type: 'consonant' },
  { roman: 'b', devanagari: 'ब', akkha: '𑀩', type: 'consonant' },
  { roman: 'ma', devanagari: 'म', akkha: '𑀫', type: 'consonant' },
  { roman: 'm', devanagari: 'म', akkha: '𑀫', type: 'consonant' },
  { roman: 'ya', devanagari: 'य', akkha: '𑀬', type: 'consonant' },
  { roman: 'y', devanagari: 'य', akkha: '𑀬', type: 'consonant' },
  { roman: 'ra', devanagari: 'र', akkha: '𑀭', type: 'consonant' },
  { roman: 'r', devanagari: 'र', akkha: '𑀭', type: 'consonant' },
  { roman: 'la', devanagari: 'ल', akkha: '𑀮', type: 'consonant' },
  { roman: 'l', devanagari: 'ल', akkha: '𑀮', type: 'consonant' },
  { roman: 'wa', devanagari: 'व', akkha: '𑀯', type: 'consonant' },
  { roman: 'w', devanagari: 'व', akkha: '𑀯', type: 'consonant' },
  { roman: 'va', devanagari: 'व', akkha: '𑀯', type: 'consonant' },
  { roman: 'v', devanagari: 'व', akkha: '𑀯', type: 'consonant' },
  { roman: 'sa', devanagari: 'स', akkha: '𑀲', type: 'consonant' },
  { roman: 's', devanagari: 'स', akkha: '𑀲', type: 'consonant' },
  { roman: 'ha', devanagari: 'ह', akkha: '𑀳', type: 'consonant' },
  { roman: 'h', devanagari: 'ह', akkha: '𑀳', type: 'consonant' },

  // Vowels (Independent & Initial)
  { roman: 'aa', devanagari: 'आ', akkha: '𑀆', type: 'vowel' },
  { roman: 'a', devanagari: 'अ', akkha: '𑀅', type: 'vowel' },
  { roman: 'ee', devanagari: 'ई', akkha: '𑀈', type: 'vowel' },
  { roman: 'i', devanagari: 'इ', akkha: '𑀇', type: 'vowel' },
  { roman: 'oo', devanagari: 'ऊ', akkha: '𑀊', type: 'vowel' },
  { roman: 'u', devanagari: 'उ', akkha: '𑀉', type: 'vowel' },
  { roman: 'ai', devanagari: 'ऐ', akkha: '𑀐', type: 'vowel' },
  { roman: 'e', devanagari: 'ए', akkha: '𑀏', type: 'vowel' },
  { roman: 'au', devanagari: 'औ', akkha: '𑀒', type: 'vowel' },
  { roman: 'o', devanagari: 'ओ', akkha: '𑀑', type: 'vowel' },

  // Numbers
  { roman: '0', devanagari: '०', akkha: '𑁦', type: 'number' },
  { roman: '1', devanagari: '१', akkha: '𑁧', type: 'number' },
  { roman: '2', devanagari: '२', akkha: '𑁨', type: 'number' },
  { roman: '3', devanagari: '३', akkha: '𑁩', type: 'number' },
  { roman: '4', devanagari: '४', akkha: '𑁪', type: 'number' },
  { roman: '5', devanagari: '५', akkha: '𑁫', type: 'number' },
  { roman: '6', devanagari: '६', akkha: '𑁬', type: 'number' },
  { roman: '7', devanagari: '७', akkha: '𑁭', type: 'number' },
  { roman: '8', devanagari: '८', akkha: '𑁮', type: 'number' },
  { roman: '9', devanagari: '९', akkha: '𑁯', type: 'number' },

  // Punctuation
  { roman: '||', devanagari: '॥', akkha: '𑁈', type: 'punctuation' },
  { roman: '|', devanagari: '।', akkha: '𑁇', type: 'punctuation' },
];

// Lookup table built once at module load: roman key -> index into index-aligned output arrays.
// The first mapping registered for a key wins (same precedence as a linear .find over the list).
const ROMAN_INDEX = new Map<string, number>();
const AKKHA_OUT: string[] = [];
const DEVA_OUT: string[] = [];
let MAX_KEY_LEN = 1;
for (let i = 0; i < PHONETIC_KEY_MAPPINGS.length; i++) {
  const m = PHONETIC_KEY_MAPPINGS[i];
  AKKHA_OUT.push(m.akkha);
  DEVA_OUT.push(m.devanagari);
  if (!ROMAN_INDEX.has(m.roman)) ROMAN_INDEX.set(m.roman, i);
  if (m.roman.length > MAX_KEY_LEN) MAX_KEY_LEN = m.roman.length;
}

/**
 * Converts Romanized English text to Akkha Lipi and Devanagari phonetically.
 * Greedy longest match (up to MAX_KEY_LEN chars) via hash lookups; unmapped characters pass through.
 */
export function romanToAkkha(input: string): { akkha: string; devanagari: string } {
  const akkhaParts: string[] = [];
  const devaParts: string[] = [];
  const lower = input.toLowerCase();
  let i = 0;

  while (i < lower.length) {
    if (lower[i] === ' ') {
      akkhaParts.push(' ');
      devaParts.push(' ');
      i++;
      continue;
    }

    let matchedLen = 0;
    for (let len = Math.min(MAX_KEY_LEN, lower.length - i); len >= 1; len--) {
      const idx = ROMAN_INDEX.get(lower.substring(i, i + len));
      if (idx !== undefined) {
        akkhaParts.push(AKKHA_OUT[idx]);
        devaParts.push(DEVA_OUT[idx]);
        matchedLen = len;
        break;
      }
    }

    if (matchedLen > 0) {
      i += matchedLen;
    } else {
      akkhaParts.push(input[i]);
      devaParts.push(input[i]);
      i++;
    }
  }

  return {
    akkha: akkhaParts.join(''),
    devanagari: devaParts.join(''),
  };
}
