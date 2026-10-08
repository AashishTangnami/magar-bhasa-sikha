import { AkkhaGlyph } from '../types';

export const AKKHA_MATRAS = [
  { id: 'matra-aa', glyph: '𑀸', name: 'Aa-kar (ा)', deva: 'ा', sound: 'aa' },
  { id: 'matra-i', glyph: '𑀺', name: 'Hraswa I-kar (ि)', deva: 'ि', sound: 'i' },
  { id: 'matra-ee', glyph: '𑀻', name: 'Dirgha Ee-kar (ी)', deva: 'ी', sound: 'ee' },
  { id: 'matra-u', glyph: '𑀼', name: 'Hraswa U-kar (ु)', deva: 'ु', sound: 'u' },
  { id: 'matra-oo', glyph: '𑀽', name: 'Dirgha Oo-kar (ू)', deva: 'ू', sound: 'oo' },
  { id: 'matra-e', glyph: '𑁂', name: 'E-kar (े)', deva: 'े', sound: 'e' },
  { id: 'matra-ai', glyph: '𑁃', name: 'Ai-kar (ै)', deva: 'ै', sound: 'ai' },
  { id: 'matra-o', glyph: '𑁄', name: 'O-kar (ो)', deva: 'ो', sound: 'o' },
  { id: 'matra-au', glyph: '𑁅', name: 'Au-kar (ौ)', deva: 'ौ', sound: 'au' },
  { id: 'matra-anusvara', glyph: '𑀁', name: 'Anusvara (ं)', deva: 'ं', sound: 'm/ng' },
  { id: 'matra-visarga', glyph: '𑀂', name: 'Visarga (ः)', deva: 'ः', sound: 'h' },
  { id: 'matra-virama', glyph: '𑁆', name: 'Virama / Halanta (्)', deva: '्', sound: 'mute' },
];

export const AKKHA_VOWELS: AkkhaGlyph[] = [
  {
    id: 'vowel-a',
    glyph: '𑀅', // Akkha / Brahmi A
    devalipi: 'अ',
    romanized: 'A',
    ipa: '/ə/',
    category: 'vowel',
    svgPath: 'M 35,25 C 20,25 20,45 35,50 C 20,55 20,75 35,75 M 35,50 L 65,50 M 65,20 L 65,80',
    strokes: [
      { id: 1, points: [{ x: 35, y: 25 }, { x: 20, y: 38 }, { x: 35, y: 50 }], instruction: 'Top left open crescent' },
      { id: 2, points: [{ x: 35, y: 50 }, { x: 20, y: 62 }, { x: 35, y: 75 }], instruction: 'Bottom left open crescent' },
      { id: 3, points: [{ x: 35, y: 50 }, { x: 65, y: 50 }], instruction: 'Middle horizontal bridge' },
      { id: 4, points: [{ x: 65, y: 20 }, { x: 65, y: 80 }], instruction: 'Right vertical anchor stem' },
    ],
    sampleWord: {
      akkha: '𑀅𑀧𑀸',
      roman: 'Aapa',
      deva: 'आपा',
      meaning: 'Father (Dhut & Kham roots)',
    },
    audioNoteFreq: 220,
  },
  {
    id: 'vowel-aa',
    glyph: '𑀆', // Akkha / Brahmi Aa
    devalipi: 'आ',
    romanized: 'Aa',
    ipa: '/aː/',
    category: 'vowel',
    svgPath: 'M 35,25 C 20,25 20,45 35,50 C 20,55 20,75 35,75 M 35,50 L 65,50 M 65,20 L 65,80 M 65,20 L 80,20',
    strokes: [
      { id: 1, points: [{ x: 35, y: 25 }, { x: 20, y: 38 }, { x: 35, y: 50 }], instruction: 'Top left crescent' },
      { id: 2, points: [{ x: 35, y: 50 }, { x: 20, y: 62 }, { x: 35, y: 75 }], instruction: 'Bottom left crescent' },
      { id: 3, points: [{ x: 35, y: 50 }, { x: 65, y: 50 }], instruction: 'Middle horizontal link' },
      { id: 4, points: [{ x: 65, y: 20 }, { x: 65, y: 80 }], instruction: 'Right vertical stem' },
      { id: 5, points: [{ x: 65, y: 20 }, { x: 80, y: 20 }], instruction: 'Upper right vowel arm (Aa-kar)' },
    ],
    sampleWord: {
      akkha: '𑀆𑀫𑀸',
      roman: 'Aama',
      deva: 'आमा',
      meaning: 'Mother (Heart of the Magar hearth)',
    },
    audioNoteFreq: 246,
  },
  {
    id: 'vowel-i',
    glyph: '𑀇', // Akkha / Brahmi I
    devalipi: 'इ',
    romanized: 'I',
    ipa: '/i/',
    category: 'vowel',
    svgPath: 'M 35,35 A 8,8 0 1,1 35,34.9 M 65,35 A 8,8 0 1,1 65,34.9 M 50,68 A 8,8 0 1,1 50,67.9',
    strokes: [
      { id: 1, points: [{ x: 35, y: 35 }], instruction: 'Top left point of origin' },
      { id: 2, points: [{ x: 65, y: 35 }], instruction: 'Top right harmonic point' },
      { id: 3, points: [{ x: 50, y: 68 }], instruction: 'Lower sacred anchor point' },
    ],
    sampleWord: {
      akkha: '𑀇𑀦𑀸𑀫',
      roman: 'Inam',
      deva: 'इनाम',
      meaning: 'Reward / Blessing of the Elders',
    },
    audioNoteFreq: 293,
  },
  {
    id: 'vowel-ee',
    glyph: '𑀈', // Akkha / Brahmi Ee
    devalipi: 'ई',
    romanized: 'Ee',
    ipa: '/iː/',
    category: 'vowel',
    svgPath: 'M 35,30 A 7,7 0 1,1 35,29.9 M 65,30 A 7,7 0 1,1 65,29.9 M 35,70 A 7,7 0 1,1 35,69.9 M 65,70 A 7,7 0 1,1 65,69.9',
    strokes: [
      { id: 1, points: [{ x: 35, y: 30 }], instruction: 'Upper left point' },
      { id: 2, points: [{ x: 65, y: 30 }], instruction: 'Upper right point' },
      { id: 3, points: [{ x: 35, y: 70 }], instruction: 'Lower left point' },
      { id: 4, points: [{ x: 65, y: 70 }], instruction: 'Lower right point' },
    ],
    sampleWord: {
      akkha: '𑀈𑀭𑀗',
      roman: 'Eerang',
      deva: 'ईरङ',
      meaning: 'Friend / Beloved Kin',
    },
    audioNoteFreq: 330,
  },
  {
    id: 'vowel-u',
    glyph: '𑀉', // Akkha / Brahmi U
    devalipi: 'उ',
    romanized: 'U',
    ipa: '/u/',
    category: 'vowel',
    svgPath: 'M 40,25 L 40,75 L 75,75',
    strokes: [
      { id: 1, points: [{ x: 40, y: 25 }, { x: 40, y: 75 }], instruction: 'Downward vertical spine' },
      { id: 2, points: [{ x: 40, y: 75 }, { x: 75, y: 75 }], instruction: 'Rightward base foundation stroke' },
    ],
    sampleWord: {
      akkha: '𑀉𑀮𑀻',
      roman: 'Uli',
      deva: 'उली',
      meaning: 'Arrow / Sacred Aim',
    },
    audioNoteFreq: 261,
  },
  {
    id: 'vowel-oo',
    glyph: '𑀊', // Akkha / Brahmi Oo
    devalipi: 'ऊ',
    romanized: 'Oo',
    ipa: '/uː/',
    category: 'vowel',
    svgPath: 'M 40,25 L 40,75 L 75,75 M 40,50 L 65,50',
    strokes: [
      { id: 1, points: [{ x: 40, y: 25 }, { x: 40, y: 75 }], instruction: 'Downward vertical spine' },
      { id: 2, points: [{ x: 40, y: 75 }, { x: 75, y: 75 }], instruction: 'Rightward base stroke' },
      { id: 3, points: [{ x: 40, y: 50 }, { x: 65, y: 50 }], instruction: 'Middle horizontal branch' },
    ],
    sampleWord: {
      akkha: '𑀊𑀭𑁆𑀚𑀸',
      roman: 'Oorja',
      deva: 'ऊर्जा',
      meaning: 'Strength / Energy of the Mountains',
    },
    audioNoteFreq: 280,
  },
  {
    id: 'vowel-e',
    glyph: '𑀏', // Akkha / Brahmi E
    devalipi: 'ए',
    romanized: 'E',
    ipa: '/e/',
    category: 'vowel',
    svgPath: 'M 25,30 L 75,30 L 50,75 Z',
    strokes: [
      { id: 1, points: [{ x: 25, y: 30 }, { x: 75, y: 30 }], instruction: 'Top horizontal header' },
      { id: 2, points: [{ x: 75, y: 30 }, { x: 50, y: 75 }], instruction: 'Right diagonal descent to apex' },
      { id: 3, points: [{ x: 50, y: 75 }, { x: 25, y: 30 }], instruction: 'Left diagonal upward close' },
    ],
    sampleWord: {
      akkha: '𑀏𑀓',
      roman: 'Ekka',
      deva: 'एक्का',
      meaning: 'One / Unity of Clan',
    },
    audioNoteFreq: 349,
  },
  {
    id: 'vowel-ai',
    glyph: '𑀐', // Akkha / Brahmi Ai
    devalipi: 'ऐ',
    romanized: 'Ai',
    ipa: '/əi/',
    category: 'vowel',
    svgPath: 'M 25,30 L 75,30 L 50,75 Z M 50,30 L 50,15',
    strokes: [
      { id: 1, points: [{ x: 25, y: 30 }, { x: 75, y: 30 }, { x: 50, y: 75 }, { x: 25, y: 30 }], instruction: 'Triangular body' },
      { id: 2, points: [{ x: 50, y: 30 }, { x: 50, y: 15 }], instruction: 'Top vertical plume' },
    ],
    sampleWord: {
      akkha: '𑀐𑀭𑀸𑀯𑀢',
      roman: 'Airawat',
      deva: 'ऐरावत',
      meaning: 'Sacred White Elephant',
    },
    audioNoteFreq: 370,
  },
  {
    id: 'vowel-o',
    glyph: '𑀑', // Akkha / Brahmi O
    devalipi: 'ओ',
    romanized: 'O',
    ipa: '/o/',
    category: 'vowel',
    svgPath: 'M 35,25 L 65,25 L 65,50 L 35,50 L 35,75 L 65,75',
    strokes: [
      { id: 1, points: [{ x: 35, y: 25 }, { x: 65, y: 25 }], instruction: 'Top horizontal step' },
      { id: 2, points: [{ x: 65, y: 25 }, { x: 65, y: 50 }], instruction: 'Right downward descent' },
      { id: 3, points: [{ x: 65, y: 50 }, { x: 35, y: 50 }], instruction: 'Center horizontal shift' },
      { id: 4, points: [{ x: 35, y: 50 }, { x: 35, y: 75 }], instruction: 'Left downward drop' },
      { id: 5, points: [{ x: 35, y: 75 }, { x: 65, y: 75 }], instruction: 'Base foundation line' },
    ],
    sampleWord: {
      akkha: '𑀑𑀮𑁆𑀫𑁄',
      roman: 'Olmo',
      deva: 'ओल्मो',
      meaning: 'Ancestral Homeland of Magarat',
    },
    audioNoteFreq: 392,
  },
  {
    id: 'vowel-au',
    glyph: '𑀒', // Akkha / Brahmi Au
    devalipi: 'औ',
    romanized: 'Au',
    ipa: '/əu/',
    category: 'vowel',
    svgPath: 'M 35,25 L 65,25 L 65,50 L 35,50 L 35,75 L 65,75 M 65,50 L 80,50',
    strokes: [
      { id: 1, points: [{ x: 35, y: 25 }, { x: 65, y: 25 }, { x: 65, y: 50 }, { x: 35, y: 50 }, { x: 35, y: 75 }, { x: 65, y: 75 }], instruction: 'Zigzag stepped body' },
      { id: 2, points: [{ x: 65, y: 50 }, { x: 80, y: 50 }], instruction: 'Right middle arm extension' },
    ],
    sampleWord: {
      akkha: '𑀒𑀱𑀥',
      roman: 'Aushadh',
      deva: 'औषध',
      meaning: 'Himalayan Herbal Medicine',
    },
    audioNoteFreq: 415,
  },
];

export const AKKHA_CONSONANTS: AkkhaGlyph[] = [
  // Ka-Varga (क-वर्ग)
  {
    id: 'cons-ka',
    glyph: '𑀓', // Ka (Cross +)
    devalipi: 'क',
    romanized: 'Ka',
    ipa: '/kə/',
    category: 'consonant',
    svgPath: 'M 50,15 L 50,85 M 15,50 L 85,50',
    strokes: [
      { id: 1, points: [{ x: 50, y: 15 }, { x: 50, y: 85 }], instruction: 'Vertical central spine' },
      { id: 2, points: [{ x: 15, y: 50 }, { x: 85, y: 50 }], instruction: 'Intersecting horizontal crossbar' },
    ],
    sampleWord: {
      akkha: '𑀓𑀸𑀦𑁆𑀙𑁄',
      roman: 'Kanchho',
      deva: 'कान्छो',
      meaning: 'Younger Brother / Beloved',
    },
    audioNoteFreq: 440,
  },
  {
    id: 'cons-kha',
    glyph: '𑀔', // Kha
    devalipi: 'ख',
    romanized: 'Kha',
    ipa: '/kʰə/',
    category: 'consonant',
    svgPath: 'M 45,25 C 45,15 65,15 65,25 L 65,55 C 65,75 35,75 35,55 C 35,45 65,45 65,55',
    strokes: [
      { id: 1, points: [{ x: 45, y: 25 }, { x: 55, y: 15 }, { x: 65, y: 25 }], instruction: 'Top rounded hook' },
      { id: 2, points: [{ x: 65, y: 25 }, { x: 65, y: 55 }], instruction: 'Right vertical stem' },
      { id: 3, points: [{ x: 65, y: 55 }, { x: 50, y: 75 }, { x: 35, y: 55 }, { x: 50, y: 45 }, { x: 65, y: 55 }], instruction: 'Base circle loop' },
    ],
    sampleWord: {
      akkha: '𑀔𑀼𑀭𑁆𑀧𑁂𑀝𑁄',
      roman: 'Khurpeto',
      deva: 'खुरपेटो',
      meaning: 'Traditional Magar Knife Scabbard',
    },
    audioNoteFreq: 494,
  },
  {
    id: 'cons-ga',
    glyph: '𑀕', // Ga (Mountain Peak ^)
    devalipi: 'ग',
    romanized: 'Ga',
    ipa: '/ɡə/',
    category: 'consonant',
    svgPath: 'M 25,80 L 50,20 L 75,80',
    strokes: [
      { id: 1, points: [{ x: 25, y: 80 }, { x: 50, y: 20 }], instruction: 'Left ascending mountain peak' },
      { id: 2, points: [{ x: 50, y: 20 }, { x: 75, y: 80 }], instruction: 'Right descending mountain slope' },
    ],
    sampleWord: {
      akkha: '𑀕𑀼𑀭𑀸𑀁𑀲',
      roman: 'Gurans',
      deva: 'गुराँस',
      meaning: 'Sacred Hill Rhododendron',
    },
    audioNoteFreq: 523,
  },
  {
    id: 'cons-gha',
    glyph: '𑀖', // Gha (Trident Chalice)
    devalipi: 'घ',
    romanized: 'Gha',
    ipa: '/ɡʱə/',
    category: 'consonant',
    svgPath: 'M 30,25 L 30,65 C 30,80 70,80 70,65 L 70,25 M 50,45 L 50,75',
    strokes: [
      { id: 1, points: [{ x: 30, y: 25 }, { x: 30, y: 65 }], instruction: 'Left vertical chalice rim' },
      { id: 2, points: [{ x: 30, y: 65 }, { x: 50, y: 80 }, { x: 70, y: 65 }], instruction: 'Lower bowl curve' },
      { id: 3, points: [{ x: 70, y: 65 }, { x: 70, y: 25 }], instruction: 'Right vertical chalice rim' },
      { id: 4, points: [{ x: 50, y: 45 }, { x: 50, y: 75 }], instruction: 'Central trident spike' },
    ],
    sampleWord: {
      akkha: '𑀖𑀸𑀮𑁂𑀓',
      roman: 'Ghalek',
      deva: 'घालेक',
      meaning: 'Traditional Magar Cross-Wrap Cloth',
    },
    audioNoteFreq: 587,
  },
  {
    id: 'cons-nga',
    glyph: '𑀗', // Nga
    devalipi: 'ङ',
    romanized: 'Nga',
    ipa: '/ŋə/',
    category: 'consonant',
    svgPath: 'M 25,35 L 65,35 L 65,75 M 65,75 L 80,75',
    strokes: [
      { id: 1, points: [{ x: 25, y: 35 }, { x: 65, y: 35 }], instruction: 'Top horizontal bar' },
      { id: 2, points: [{ x: 65, y: 35 }, { x: 65, y: 75 }], instruction: 'Vertical stem' },
      { id: 3, points: [{ x: 65, y: 75 }, { x: 80, y: 75 }], instruction: 'Rightward base tick' },
    ],
    sampleWord: {
      akkha: '𑀗𑀸',
      roman: 'Nga',
      deva: 'ङा',
      meaning: 'I / Me (Self in Dhut & Kham)',
    },
    audioNoteFreq: 659,
  },

  // Cha-Varga (च-वर्ग)
  {
    id: 'cons-cha',
    glyph: '𑀘', // Cha
    devalipi: 'च',
    romanized: 'Cha',
    ipa: '/t͡ʃə/',
    category: 'consonant',
    svgPath: 'M 50,20 L 50,80 M 50,50 C 28,50 28,80 50,80',
    strokes: [
      { id: 1, points: [{ x: 50, y: 20 }, { x: 50, y: 80 }], instruction: 'Right vertical backbone' },
      { id: 2, points: [{ x: 50, y: 50 }, { x: 28, y: 65 }, { x: 50, y: 80 }], instruction: 'Left sweeping loop' },
    ],
    sampleWord: {
      akkha: '𑀘𑁄𑀮𑁄',
      roman: 'Cholo',
      deva: 'चोलो',
      meaning: 'Traditional Blouse (Chaubandi)',
    },
    audioNoteFreq: 698,
  },
  {
    id: 'cons-chha',
    glyph: '𑀙', // Chha (Circle with central line)
    devalipi: 'छ',
    romanized: 'Chha',
    ipa: '/t͡ʃʰə/',
    category: 'consonant',
    svgPath: 'M 50,30 A 25,25 0 1,1 50,80 A 25,25 0 1,1 50,30 M 50,15 L 50,85',
    strokes: [
      { id: 1, points: [{ x: 50, y: 30 }, { x: 75, y: 55 }, { x: 50, y: 80 }, { x: 25, y: 55 }, { x: 50, y: 30 }], instruction: 'Circular body' },
      { id: 2, points: [{ x: 50, y: 15 }, { x: 50, y: 85 }], instruction: 'Intersecting vertical spine' },
    ],
    sampleWord: {
      akkha: '𑀙𑁂𑀢𑁆𑀭𑀻',
      roman: 'Chhetri',
      deva: 'छेत्री',
      meaning: 'Guardian of Tradition',
    },
    audioNoteFreq: 740,
  },
  {
    id: 'cons-ja',
    glyph: '𑀚', // Ja (E-Pronged Ladle)
    devalipi: 'ज',
    romanized: 'Ja',
    ipa: '/d͡ʒə/',
    category: 'consonant',
    svgPath: 'M 30,30 L 70,30 M 50,30 L 50,55 C 30,55 30,80 65,80',
    strokes: [
      { id: 1, points: [{ x: 30, y: 30 }, { x: 70, y: 30 }], instruction: 'Top horizontal header bar' },
      { id: 2, points: [{ x: 50, y: 30 }, { x: 50, y: 55 }], instruction: 'Central vertical stem' },
      { id: 3, points: [{ x: 50, y: 55 }, { x: 30, y: 68 }, { x: 65, y: 80 }], instruction: 'Lower sweeping ladle curve' },
    ],
    sampleWord: {
      akkha: '𑀚𑀢',
      roman: 'Jaat',
      deva: 'जात',
      meaning: 'Community & Lineage',
    },
    audioNoteFreq: 784,
  },
  {
    id: 'cons-jha',
    glyph: '𑀛', // Jha
    devalipi: 'झ',
    romanized: 'Jha',
    ipa: '/d͡ʒʱə/',
    category: 'consonant',
    svgPath: 'M 35,25 L 35,75 M 35,50 L 65,50 M 65,25 L 65,75',
    strokes: [
      { id: 1, points: [{ x: 35, y: 25 }, { x: 35, y: 75 }], instruction: 'Left vertical pillar' },
      { id: 2, points: [{ x: 35, y: 50 }, { x: 65, y: 50 }], instruction: 'Center bridge' },
      { id: 3, points: [{ x: 65, y: 25 }, { x: 65, y: 75 }], instruction: 'Right vertical pillar' },
    ],
    sampleWord: {
      akkha: '𑀛𑁄𑀭𑁆𑀮𑁂',
      roman: 'Jhorle',
      deva: 'झोर्ले',
      meaning: 'Sacred Magar Greeting of Respect',
    },
    audioNoteFreq: 830,
  },
  {
    id: 'cons-nya',
    glyph: '𑀜', // Nya
    devalipi: 'ञ',
    romanized: 'Nya',
    ipa: '/ɲə/',
    category: 'consonant',
    svgPath: 'M 35,35 L 65,35 M 50,35 L 50,65 C 50,80 75,80 75,65',
    strokes: [
      { id: 1, points: [{ x: 35, y: 35 }, { x: 65, y: 35 }], instruction: 'Top horizontal line' },
      { id: 2, points: [{ x: 50, y: 35 }, { x: 50, y: 65 }, { x: 75, y: 65 }], instruction: 'Downward hook' },
    ],
    sampleWord: {
      akkha: '𑀚𑁆𑀜𑀸𑀦',
      roman: 'Gyan',
      deva: 'ज्ञान',
      meaning: 'Wisdom of Elders',
    },
    audioNoteFreq: 850,
  },

  // Ta-Varga Retroflex (ट-वर्ग)
  {
    id: 'cons-tta',
    glyph: '𑀝', // Tta (ट)
    devalipi: 'ट',
    romanized: 'Tta',
    ipa: '/ʈə/',
    category: 'consonant',
    svgPath: 'M 35,20 L 65,20 M 65,20 L 65,45 C 65,75 35,75 35,45',
    strokes: [
      { id: 1, points: [{ x: 35, y: 20 }, { x: 65, y: 20 }], instruction: 'Top horizontal header' },
      { id: 2, points: [{ x: 65, y: 20 }, { x: 65, y: 45 }], instruction: 'Right vertical stem' },
      { id: 3, points: [{ x: 65, y: 45 }, { x: 65, y: 75 }, { x: 35, y: 75 }, { x: 35, y: 45 }], instruction: 'Bottom semicircular curve' },
    ],
    sampleWord: {
      akkha: '𑀝𑀺𑀓',
      roman: 'Tika',
      deva: 'टिका',
      meaning: 'Sacred Forehead Blessing',
    },
    audioNoteFreq: 860,
  },
  {
    id: 'cons-ttha',
    glyph: '𑀞', // Ttha (ठ)
    devalipi: 'ठ',
    romanized: 'Ttha',
    ipa: '/ʈʰə/',
    category: 'consonant',
    svgPath: 'M 50,20 A 25,25 0 1,1 50,75 A 25,25 0 1,1 50,20',
    strokes: [
      { id: 1, points: [{ x: 50, y: 20 }, { x: 75, y: 47 }, { x: 50, y: 75 }, { x: 25, y: 47 }, { x: 50, y: 20 }], instruction: 'Full circle glyph' },
    ],
    sampleWord: {
      akkha: '𑀞𑀸𑀉',
      roman: 'Thau',
      deva: 'ठाउँ',
      meaning: 'Ancestral Settlement / Place',
    },
    audioNoteFreq: 870,
  },
  {
    id: 'cons-dda',
    glyph: '𑀟', // Dda (ड)
    devalipi: 'ड',
    romanized: 'Dda',
    ipa: '/ɖə/',
    category: 'consonant',
    svgPath: 'M 35,25 L 65,25 L 65,50 L 35,50 L 35,75 L 65,75',
    strokes: [
      { id: 1, points: [{ x: 35, y: 25 }, { x: 65, y: 25 }, { x: 65, y: 50 }, { x: 35, y: 50 }, { x: 35, y: 75 }, { x: 65, y: 75 }], instruction: 'S-curved stepped body' },
    ],
    sampleWord: {
      akkha: '𑀟𑀫𑀭𑀼',
      roman: 'Damaru',
      deva: 'डमरु',
      meaning: 'Sacred Shamanic Hourglass Drum',
    },
    audioNoteFreq: 875,
  },
  {
    id: 'cons-ddha',
    glyph: '𑀠', // Ddha (ढ)
    devalipi: 'ढ',
    romanized: 'Ddha',
    ipa: '/ɖʱə/',
    category: 'consonant',
    svgPath: 'M 35,25 L 65,25 L 65,55 C 65,75 35,75 35,55 C 35,45 55,45 55,55',
    strokes: [
      { id: 1, points: [{ x: 35, y: 25 }, { x: 65, y: 25 }], instruction: 'Top horizontal header' },
      { id: 2, points: [{ x: 65, y: 25 }, { x: 65, y: 55 }], instruction: 'Right vertical stem' },
      { id: 3, points: [{ x: 65, y: 55 }, { x: 50, y: 75 }, { x: 35, y: 55 }, { x: 45, y: 45 }, { x: 55, y: 55 }], instruction: 'Inner looped curl' },
    ],
    sampleWord: {
      akkha: '𑀠𑁄𑀮',
      roman: 'Dhol',
      deva: 'ढोल',
      meaning: 'Ceremonial Bass Drum',
    },
    audioNoteFreq: 880,
  },
  {
    id: 'cons-nna',
    glyph: '𑀡', // Nna (ण)
    devalipi: 'ण',
    romanized: 'Nna',
    ipa: '/ɳə/',
    category: 'consonant',
    svgPath: 'M 30,25 L 30,75 M 50,25 L 50,75 M 30,50 L 50,50 M 50,50 L 70,50',
    strokes: [
      { id: 1, points: [{ x: 30, y: 25 }, { x: 30, y: 75 }], instruction: 'Left parallel stem' },
      { id: 2, points: [{ x: 50, y: 25 }, { x: 50, y: 75 }], instruction: 'Right parallel stem' },
      { id: 3, points: [{ x: 30, y: 50 }, { x: 70, y: 50 }], instruction: 'Connecting crossbar with extension' },
    ],
    sampleWord: {
      akkha: '𑀕𑀼𑀡',
      roman: 'Guna',
      deva: 'गुण',
      meaning: 'Noble Virtue / Magar Ethical Code',
    },
    audioNoteFreq: 885,
  },

  // Ta-Varga (त-वर्ग)
  {
    id: 'cons-ta',
    glyph: '𑀢', // Ta (Inverted Y)
    devalipi: 'त',
    romanized: 'Ta',
    ipa: '/t̪ə/',
    category: 'consonant',
    svgPath: 'M 50,20 L 50,50 M 50,50 L 25,80 M 50,50 L 75,80',
    strokes: [
      { id: 1, points: [{ x: 50, y: 20 }, { x: 50, y: 50 }], instruction: 'Upper vertical stem' },
      { id: 2, points: [{ x: 50, y: 50 }, { x: 25, y: 80 }], instruction: 'Left diagonal leg' },
      { id: 3, points: [{ x: 50, y: 50 }, { x: 75, y: 80 }], instruction: 'Right diagonal leg' },
    ],
    sampleWord: {
      akkha: '𑀢𑀼𑀗',
      roman: 'Tung',
      deva: 'तुङ',
      meaning: 'Traditional Ceremonial Wine Vessel',
    },
    audioNoteFreq: 880,
  },
  {
    id: 'cons-tha',
    glyph: '𑀣', // Tha (Circle with Dot)
    devalipi: 'थ',
    romanized: 'Tha',
    ipa: '/t̪ʰə/',
    category: 'consonant',
    svgPath: 'M 50,20 A 30,30 0 1,1 50,80 A 30,30 0 1,1 50,20 M 50,50 A 4,4 0 1,1 50,49.9',
    strokes: [
      { id: 1, points: [{ x: 50, y: 20 }, { x: 80, y: 50 }, { x: 50, y: 80 }, { x: 20, y: 50 }, { x: 50, y: 20 }], instruction: 'Circular perimeter' },
      { id: 2, points: [{ x: 50, y: 50 }], instruction: 'Center bindu (clan spirit dot)' },
    ],
    sampleWord: {
      akkha: '𑀣𑀭𑀻',
      roman: 'Thar',
      deva: 'थरी',
      meaning: 'Clan Lineage of Magarat',
    },
    audioNoteFreq: 932,
  },
  {
    id: 'cons-da',
    glyph: '𑀤', // Da (Open Crescent with Bars)
    devalipi: 'द',
    romanized: 'Da',
    ipa: '/d̪ə/',
    category: 'consonant',
    svgPath: 'M 40,25 L 65,25 L 65,40 C 38,40 38,75 65,75 L 65,85',
    strokes: [
      { id: 1, points: [{ x: 40, y: 25 }, { x: 65, y: 25 }], instruction: 'Top header bar' },
      { id: 2, points: [{ x: 65, y: 25 }, { x: 35, y: 55 }, { x: 65, y: 75 }], instruction: 'Open left-facing crescent belly' },
      { id: 3, points: [{ x: 65, y: 75 }, { x: 65, y: 85 }], instruction: 'Bottom anchor tick' },
    ],
    sampleWord: {
      akkha: '𑀤𑀸𑀚𑀼',
      roman: 'Daju',
      deva: 'दाजु',
      meaning: 'Elder Brother',
    },
    audioNoteFreq: 988,
  },
  {
    id: 'cons-dha',
    glyph: '𑀥', // Dha (D-Shape Arc)
    devalipi: 'ध',
    romanized: 'Dha',
    ipa: '/d̪ʱə/',
    category: 'consonant',
    svgPath: 'M 35,20 L 35,80 M 35,20 C 72,20 72,80 35,80',
    strokes: [
      { id: 1, points: [{ x: 35, y: 20 }, { x: 35, y: 80 }], instruction: 'Left vertical straight spine' },
      { id: 2, points: [{ x: 35, y: 20 }, { x: 72, y: 50 }, { x: 35, y: 80 }], instruction: 'Right sweeping semicircular arch' },
    ],
    sampleWord: {
      akkha: '𑀥𑀼𑀢',
      roman: 'Dhut',
      deva: 'धुत',
      meaning: 'Magar Dhut (Spoken Mother Tongue of the Valleys)',
    },
    audioNoteFreq: 1010,
  },
  {
    id: 'cons-na',
    glyph: '𑀦', // Na (Inverted T)
    devalipi: 'न',
    romanized: 'Na',
    ipa: '/nə/',
    category: 'consonant',
    svgPath: 'M 50,20 L 50,80 M 20,80 L 80,80',
    strokes: [
      { id: 1, points: [{ x: 50, y: 20 }, { x: 50, y: 80 }], instruction: 'Central vertical stem' },
      { id: 2, points: [{ x: 20, y: 80 }, { x: 80, y: 80 }], instruction: 'Bottom horizontal foundation bar' },
    ],
    sampleWord: {
      akkha: '𑀦𑀸𑀫',
      roman: 'Nam',
      deva: 'नाम',
      meaning: 'Sunlight / Solar Radiance in Dhut',
    },
    audioNoteFreq: 1046,
  },

  // Pa-Varga (प-वर्ग)
  {
    id: 'cons-pa',
    glyph: '𑀧', // Pa (Open U-Bucket)
    devalipi: 'प',
    romanized: 'Pa',
    ipa: '/pə/',
    category: 'consonant',
    svgPath: 'M 30,25 L 30,65 C 30,80 65,80 65,65 L 65,25',
    strokes: [
      { id: 1, points: [{ x: 30, y: 25 }, { x: 30, y: 65 }], instruction: 'Left descending limb' },
      { id: 2, points: [{ x: 30, y: 65 }, { x: 48, y: 80 }, { x: 65, y: 65 }], instruction: 'Curved bottom cup' },
      { id: 3, points: [{ x: 65, y: 65 }, { x: 65, y: 25 }], instruction: 'Right ascending vertical stem' },
    ],
    sampleWord: {
      akkha: '𑀧𑀝𑀼𑀓𑀸',
      roman: 'Patuka',
      deva: 'पटुका',
      meaning: 'Yellow Waist Wrap Sash',
    },
    audioNoteFreq: 523,
  },
  {
    id: 'cons-pha',
    glyph: '𑀨', // Pha
    devalipi: 'फ',
    romanized: 'Pha',
    ipa: '/pʰə/',
    category: 'consonant',
    svgPath: 'M 30,25 L 30,65 C 30,80 65,80 65,50 C 65,30 45,30 45,45',
    strokes: [
      { id: 1, points: [{ x: 30, y: 25 }, { x: 30, y: 65 }], instruction: 'Left stem' },
      { id: 2, points: [{ x: 30, y: 65 }, { x: 65, y: 80 }, { x: 65, y: 50 }, { x: 45, y: 45 }], instruction: 'Loop curl' },
    ],
    sampleWord: {
      akkha: '𑀨𑀼𑀮',
      roman: 'Phul',
      deva: 'फुल',
      meaning: 'Sacred Blossom',
    },
    audioNoteFreq: 550,
  },
  {
    id: 'cons-ba',
    glyph: '𑀩', // Ba (Perfect Square)
    devalipi: 'ब',
    romanized: 'Ba',
    ipa: '/bə/',
    category: 'consonant',
    svgPath: 'M 30,25 L 70,25 L 70,75 L 30,75 Z',
    strokes: [
      { id: 1, points: [{ x: 30, y: 25 }, { x: 70, y: 25 }], instruction: 'Top horizontal boundary' },
      { id: 2, points: [{ x: 70, y: 25 }, { x: 70, y: 75 }], instruction: 'Right vertical edge' },
      { id: 3, points: [{ x: 70, y: 75 }, { x: 30, y: 75 }], instruction: 'Bottom horizontal foundation' },
      { id: 4, points: [{ x: 30, y: 75 }, { x: 30, y: 25 }], instruction: 'Left vertical closure' },
    ],
    sampleWord: {
      akkha: '𑀩𑀸𑀚𑁂',
      roman: 'Baje',
      deva: 'बाजे',
      meaning: 'Grandfather / Respected Elder',
    },
    audioNoteFreq: 587,
  },
  {
    id: 'cons-bha',
    glyph: '𑀪', // Bha
    devalipi: 'भ',
    romanized: 'Bha',
    ipa: '/bʱə/',
    category: 'consonant',
    svgPath: 'M 35,20 L 35,80 M 35,50 L 65,50 L 65,80',
    strokes: [
      { id: 1, points: [{ x: 35, y: 20 }, { x: 35, y: 80 }], instruction: 'Left vertical spine' },
      { id: 2, points: [{ x: 35, y: 50 }, { x: 65, y: 50 }, { x: 65, y: 80 }], instruction: 'Right downward step leg' },
    ],
    sampleWord: {
      akkha: '𑀪𑀽𑀫𑁂',
      roman: 'Bhume',
      deva: 'भूमे',
      meaning: 'Sacred Earth Deity Worshiped in Shamanic Rites',
    },
    audioNoteFreq: 620,
  },
  {
    id: 'cons-ma',
    glyph: '𑀫', // Ma (Circle with Upper Prongs)
    devalipi: 'म',
    romanized: 'Ma',
    ipa: '/mə/',
    category: 'consonant',
    svgPath: 'M 50,50 A 20,20 0 1,1 50,90 A 20,20 0 1,1 50,50 M 35,20 L 35,55 M 65,20 L 65,55',
    strokes: [
      { id: 1, points: [{ x: 35, y: 20 }, { x: 35, y: 55 }], instruction: 'Left upper prong' },
      { id: 2, points: [{ x: 65, y: 20 }, { x: 65, y: 55 }], instruction: 'Right upper prong' },
      { id: 3, points: [{ x: 50, y: 50 }, { x: 70, y: 70 }, { x: 50, y: 90 }, { x: 30, y: 70 }, { x: 50, y: 50 }], instruction: 'Lower sacred loop circle' },
    ],
    sampleWord: {
      akkha: '𑀫𑀼𑀦𑁆𑀤𑁆𑀭𑀻',
      roman: 'Mundri',
      deva: 'मुन्द्री',
      meaning: 'Traditional Gold Ear Ornament',
    },
    audioNoteFreq: 659,
  },

  // Antastha & Ushma (य, र, ल, व, श, ष, स, ह)
  {
    id: 'cons-ya',
    glyph: '𑀬', // Ya
    devalipi: 'य',
    romanized: 'Ya',
    ipa: '/jə/',
    category: 'consonant',
    svgPath: 'M 50,20 L 50,80 M 30,35 C 30,65 50,65 50,65 C 50,65 70,65 70,35',
    strokes: [
      { id: 1, points: [{ x: 50, y: 20 }, { x: 50, y: 80 }], instruction: 'Center spine' },
      { id: 2, points: [{ x: 30, y: 35 }, { x: 50, y: 65 }, { x: 70, y: 35 }], instruction: 'Anchor bowl' },
    ],
    sampleWord: {
      akkha: '𑀬𑀸𑀢𑁆𑀭𑀸',
      roman: 'Yatra',
      deva: 'यात्रा',
      meaning: 'Sacred Pilgrimage across Magarat',
    },
    audioNoteFreq: 700,
  },
  {
    id: 'cons-ra',
    glyph: '𑀭', // Ra (Straight River Line)
    devalipi: 'र',
    romanized: 'Ra',
    ipa: '/rə/',
    category: 'consonant',
    svgPath: 'M 50,15 L 50,85',
    strokes: [
      { id: 1, points: [{ x: 50, y: 15 }, { x: 50, y: 85 }], instruction: 'Continuous vertical stream line' },
    ],
    sampleWord: {
      akkha: '𑀭𑀺𑀓',
      roman: 'Rika',
      deva: 'रिका',
      meaning: 'Script / Writing / Calligraphy Lab',
    },
    audioNoteFreq: 784,
  },
  {
    id: 'cons-la',
    glyph: '𑀮', // La (Crook Hook)
    devalipi: 'ल',
    romanized: 'La',
    ipa: '/lə/',
    category: 'consonant',
    svgPath: 'M 65,20 L 65,65 C 65,80 35,80 35,60 C 35,45 50,45 50,55',
    strokes: [
      { id: 1, points: [{ x: 65, y: 20 }, { x: 65, y: 65 }], instruction: 'Right vertical stem' },
      { id: 2, points: [{ x: 65, y: 65 }, { x: 50, y: 80 }, { x: 35, y: 60 }, { x: 50, y: 50 }], instruction: 'Bottom sweeping curl' },
    ],
    sampleWord: {
      akkha: '𑀮𑀸𑀮𑀻𑀕𑀼𑀭𑀸𑀁𑀲',
      roman: 'Lali Gurans',
      deva: 'लालीगुराँस',
      meaning: 'Crimson Rhododendron Flower of the Hills',
    },
    audioNoteFreq: 880,
  },
  {
    id: 'cons-va',
    glyph: '𑀯', // Wa / Va (Circle with Stem)
    devalipi: 'व',
    romanized: 'Wa / Va',
    ipa: '/wə/',
    category: 'consonant',
    svgPath: 'M 50,20 L 50,55 A 18,18 0 1,1 50,90 A 18,18 0 1,1 50,55',
    strokes: [
      { id: 1, points: [{ x: 50, y: 20 }, { x: 50, y: 55 }], instruction: 'Top vertical mast' },
      { id: 2, points: [{ x: 50, y: 55 }, { x: 68, y: 72 }, { x: 50, y: 90 }, { x: 32, y: 72 }, { x: 50, y: 55 }], instruction: 'Base circle loop' },
    ],
    sampleWord: {
      akkha: '𑀯𑀭𑁆𑀱',
      roman: 'Barsha',
      deva: 'वर्ष',
      meaning: 'Magar Lunar Calendar Cycle',
    },
    audioNoteFreq: 920,
  },
  {
    id: 'cons-sha',
    glyph: '𑀰', // Sha
    devalipi: 'श',
    romanized: 'Sha',
    ipa: '/ʃə/',
    category: 'consonant',
    svgPath: 'M 35,25 C 35,15 65,15 65,40 L 65,80 M 35,50 L 65,50',
    strokes: [
      { id: 1, points: [{ x: 35, y: 25 }, { x: 50, y: 15 }, { x: 65, y: 40 }, { x: 65, y: 80 }], instruction: 'Hooked arch and stem' },
      { id: 2, points: [{ x: 35, y: 50 }, { x: 65, y: 50 }], instruction: 'Horizontal cross line' },
    ],
    sampleWord: {
      akkha: '𑀰𑀸𑀦𑁆𑀢𑀺',
      roman: 'Shanti',
      deva: 'शान्ति',
      meaning: 'Peace & Harmony',
    },
    audioNoteFreq: 950,
  },
  {
    id: 'cons-shha',
    glyph: '𑀱', // Ssa / Shha (ष)
    devalipi: 'ष',
    romanized: 'Shha',
    ipa: '/ʂə/',
    category: 'consonant',
    svgPath: 'M 30,25 L 30,65 C 30,80 65,80 65,65 L 65,25 M 30,45 L 65,65',
    strokes: [
      { id: 1, points: [{ x: 30, y: 25 }, { x: 30, y: 65 }, { x: 48, y: 80 }, { x: 65, y: 65 }, { x: 65, y: 25 }], instruction: 'Pa frame' },
      { id: 2, points: [{ x: 30, y: 45 }, { x: 65, y: 65 }], instruction: 'Interior diagonal slash' },
    ],
    sampleWord: {
      akkha: '𑀯𑀺𑀱𑁂𑀱',
      roman: 'Vishesh',
      deva: 'विशेष',
      meaning: 'Sacred Distinction',
    },
    audioNoteFreq: 965,
  },
  {
    id: 'cons-sa',
    glyph: '𑀲', // Sa (Open Upper Arch with Stem)
    devalipi: 'स',
    romanized: 'Sa',
    ipa: '/sə/',
    category: 'consonant',
    svgPath: 'M 30,35 C 30,20 60,20 60,35 L 60,85 M 60,50 L 35,70',
    strokes: [
      { id: 1, points: [{ x: 30, y: 35 }, { x: 45, y: 20 }, { x: 60, y: 35 }], instruction: 'Left upper arch' },
      { id: 2, points: [{ x: 60, y: 35 }, { x: 60, y: 85 }], instruction: 'Right vertical stem' },
      { id: 3, points: [{ x: 60, y: 50 }, { x: 35, y: 70 }], instruction: 'Downward left diagonal leg' },
    ],
    sampleWord: {
      akkha: '𑀲𑁄𑀭𑀞𑀻',
      roman: 'Sorathi',
      deva: 'सोरठी',
      meaning: 'Ancient Magar Epic Folklore & Dance',
    },
    audioNoteFreq: 988,
  },
  {
    id: 'cons-ha',
    glyph: '𑀳', // Ha (Hooked Arch)
    devalipi: 'ह',
    romanized: 'Ha',
    ipa: '/hə/',
    category: 'consonant',
    svgPath: 'M 35,20 L 35,50 C 35,65 65,65 65,45 C 65,35 55,30 45,35',
    strokes: [
      { id: 1, points: [{ x: 35, y: 20 }, { x: 35, y: 50 }], instruction: 'Left upper vertical post' },
      { id: 2, points: [{ x: 35, y: 50 }, { x: 50, y: 65 }, { x: 65, y: 45 }, { x: 45, y: 35 }], instruction: 'Right curved hook arm' },
    ],
    sampleWord: {
      akkha: '𑀳𑀼𑀭𑁆𑀭𑀸',
      roman: 'Hurra',
      deva: 'हुर्रा',
      meaning: 'Festive Magar Harvest Dance of Eastern Hills',
    },
    audioNoteFreq: 1174,
  },
  {
    id: 'cons-ksha',
    glyph: '𑀓𑁆𑀱', // Ksha (क्ष)
    devalipi: 'क्ष',
    romanized: 'Ksha',
    ipa: '/kʃə/',
    category: 'consonant',
    svgPath: 'M 50,15 L 50,85 M 15,50 L 85,50',
    strokes: [
      { id: 1, points: [{ x: 50, y: 15 }, { x: 50, y: 85 }], instruction: 'Ka-Halanta-Ssa conjunct' },
    ],
    sampleWord: {
      akkha: '𑀓𑁆𑀱𑁂𑀢𑁆𑀭',
      roman: 'Kshetra',
      deva: 'क्षेत्र',
      meaning: 'Sacred Realm / Magarat Territory',
    },
    audioNoteFreq: 1190,
  },
  {
    id: 'cons-tra',
    glyph: '𑀢𑁆𑀭', // Tra (त्र)
    devalipi: 'त्र',
    romanized: 'Tra',
    ipa: '/t̪rə/',
    category: 'consonant',
    svgPath: 'M 50,20 L 50,80 L 25,80 M 50,50 L 75,80',
    strokes: [
      { id: 1, points: [{ x: 50, y: 20 }, { x: 50, y: 80 }], instruction: 'Ta-Halanta-Ra conjunct' },
    ],
    sampleWord: {
      akkha: '𑀢𑁆𑀭𑀺𑀰𑀽𑀮',
      roman: 'Trishul',
      deva: 'त्रिशूल',
      meaning: 'Sacred Mountain Trident',
    },
    audioNoteFreq: 1200,
  },
  {
    id: 'cons-gya',
    glyph: '𑀚𑁆𑀜', // Gya / Jnya (ज्ञ)
    devalipi: 'ज्ञ',
    romanized: 'Gya',
    ipa: '/ɡjə/',
    category: 'consonant',
    svgPath: 'M 30,30 L 70,30 M 50,30 L 50,55 C 30,55 30,80 65,80',
    strokes: [
      { id: 1, points: [{ x: 30, y: 30 }, { x: 70, y: 30 }], instruction: 'Ja-Halanta-Nya conjunct' },
    ],
    sampleWord: {
      akkha: '𑀚𑁆𑀜𑀸𑀦',
      roman: 'Gyan',
      deva: 'ज्ञान',
      meaning: 'Sacred Ancestral Wisdom',
    },
    audioNoteFreq: 1220,
  },
];

export const AKKHA_PUNCTUATION = [
  { id: 'punc-danda', glyph: '𑁇', name: 'Danda / Purna Virama (।)', deva: '।', roman: '|' },
  { id: 'punc-doubledanda', glyph: '𑁈', name: 'Double Danda (॥)', deva: '॥', roman: '||' },
  { id: 'punc-dot', glyph: '·', name: 'Magar Word Spacer (·)', deva: '·', roman: '.' },
];

export const AKKHA_NUMBERS: AkkhaGlyph[] = [
  {
    id: 'num-0',
    glyph: '𑁦', // 0
    devalipi: '०',
    romanized: 'Sunya (0)',
    ipa: '/sunjə/',
    category: 'number',
    svgPath: 'M 50,25 A 25,25 0 1,1 50,75 A 25,25 0 1,1 50,25',
    strokes: [
      { id: 1, points: [{ x: 50, y: 25 }, { x: 75, y: 50 }, { x: 50, y: 75 }, { x: 25, y: 50 }, { x: 50, y: 25 }], instruction: 'Complete sacred zero circle' },
    ],
    sampleWord: {
      akkha: '𑁦',
      roman: 'Sunya',
      deva: 'शून्य',
      meaning: 'Void / Origin',
    },
    audioNoteFreq: 260,
  },
  {
    id: 'num-1',
    glyph: '𑁧', // 1
    devalipi: '१',
    romanized: 'Kat (1)',
    ipa: '/kət/',
    category: 'number',
    svgPath: 'M 50,20 L 50,80',
    strokes: [
      { id: 1, points: [{ x: 50, y: 20 }, { x: 50, y: 80 }], instruction: 'Single continuous vertical stroke (One unit)' },
    ],
    sampleWord: {
      akkha: '𑀓𑀢',
      roman: 'Kat',
      deva: 'कत्',
      meaning: 'One (in Magar Dhut & Kham)',
    },
    audioNoteFreq: 300,
  },
  {
    id: 'num-2',
    glyph: '𑁨', // 2
    devalipi: '२',
    romanized: 'Nhis (2)',
    ipa: '/nʰis/',
    category: 'number',
    svgPath: 'M 30,35 L 70,35 M 30,65 L 70,65',
    strokes: [
      { id: 1, points: [{ x: 30, y: 35 }, { x: 70, y: 35 }], instruction: 'Upper horizontal bar' },
      { id: 2, points: [{ x: 30, y: 65 }, { x: 70, y: 65 }], instruction: 'Lower parallel horizontal bar' },
    ],
    sampleWord: {
      akkha: '𑀦𑁆𑀳𑀺𑀲',
      roman: 'Nhis',
      deva: 'न्हिस',
      meaning: 'Two',
    },
    audioNoteFreq: 337,
  },
  {
    id: 'num-3',
    glyph: '𑁩', // 3
    devalipi: '३',
    romanized: 'Som (3)',
    ipa: '/som/',
    category: 'number',
    svgPath: 'M 30,25 L 70,25 M 30,50 L 70,50 M 30,75 L 70,75',
    strokes: [
      { id: 1, points: [{ x: 30, y: 25 }, { x: 70, y: 25 }], instruction: 'Top parallel stroke' },
      { id: 2, points: [{ x: 30, y: 50 }, { x: 70, y: 50 }], instruction: 'Middle parallel stroke' },
      { id: 3, points: [{ x: 30, y: 75 }, { x: 70, y: 75 }], instruction: 'Bottom parallel stroke' },
    ],
    sampleWord: {
      akkha: '𑀲𑁄𑀫',
      roman: 'Som',
      deva: 'सोम',
      meaning: 'Three',
    },
    audioNoteFreq: 380,
  },
  {
    id: 'num-4',
    glyph: '𑁪', // 4
    devalipi: '४',
    romanized: 'Buli (4)',
    ipa: '/buli/',
    category: 'number',
    svgPath: 'M 35,25 L 35,75 L 65,75 M 65,25 L 65,75',
    strokes: [
      { id: 1, points: [{ x: 35, y: 25 }, { x: 35, y: 75 }, { x: 65, y: 75 }], instruction: 'Left angle cup' },
      { id: 2, points: [{ x: 65, y: 25 }, { x: 65, y: 75 }], instruction: 'Right vertical stem' },
    ],
    sampleWord: {
      akkha: '𑀩𑀼𑀮𑀺',
      roman: 'Buli',
      deva: 'बुलि',
      meaning: 'Four',
    },
    audioNoteFreq: 415,
  },
  {
    id: 'num-5',
    glyph: '𑁫', // 5
    devalipi: '५',
    romanized: 'Banga (5)',
    ipa: '/bəŋɡə/',
    category: 'number',
    svgPath: 'M 35,25 L 65,25 L 65,50 L 35,50 L 35,75 L 65,75',
    strokes: [
      { id: 1, points: [{ x: 35, y: 25 }, { x: 65, y: 25 }, { x: 65, y: 50 }, { x: 35, y: 50 }, { x: 35, y: 75 }, { x: 65, y: 75 }], instruction: 'Harmonic five step glyph' },
    ],
    sampleWord: {
      akkha: '𑀩𑀸𑀗𑀸',
      roman: 'Banga',
      deva: 'बाङा',
      meaning: 'Five (Magar hand & fingers)',
    },
    audioNoteFreq: 450,
  },
  {
    id: 'num-6',
    glyph: '𑁬', // 6
    devalipi: '६',
    romanized: 'Ghud (6)',
    ipa: '/ɡʱud/',
    category: 'number',
    svgPath: 'M 35,25 L 65,25 L 65,75 M 35,50 L 65,50',
    strokes: [
      { id: 1, points: [{ x: 35, y: 25 }, { x: 65, y: 25 }, { x: 65, y: 75 }], instruction: 'Main framework' },
      { id: 2, points: [{ x: 35, y: 50 }, { x: 65, y: 50 }], instruction: 'Crossbar' },
    ],
    sampleWord: {
      akkha: '𑀖𑀼𑀤',
      roman: 'Ghud',
      deva: 'घुद',
      meaning: 'Six',
    },
    audioNoteFreq: 480,
  },
  {
    id: 'num-7',
    glyph: '𑁭', // 7
    devalipi: '७',
    romanized: 'Myat (7)',
    ipa: '/mjət/',
    category: 'number',
    svgPath: 'M 35,25 L 65,25 L 65,75 M 35,25 L 35,50',
    strokes: [
      { id: 1, points: [{ x: 35, y: 25 }, { x: 65, y: 25 }, { x: 65, y: 75 }], instruction: 'Main upper bar & stem' },
      { id: 2, points: [{ x: 35, y: 25 }, { x: 35, y: 50 }], instruction: 'Left drop tick' },
    ],
    sampleWord: {
      akkha: '𑀫𑁆𑀬𑀸𑀢',
      roman: 'Myat',
      deva: 'म्यात',
      meaning: 'Seven',
    },
    audioNoteFreq: 510,
  },
  {
    id: 'num-8',
    glyph: '𑁮', // 8
    devalipi: '८',
    romanized: 'Jhat (8)',
    ipa: '/d͡ʒʱət/',
    category: 'number',
    svgPath: 'M 35,25 L 65,25 L 65,75 L 35,75 M 35,50 L 65,50',
    strokes: [
      { id: 1, points: [{ x: 35, y: 25 }, { x: 65, y: 25 }, { x: 65, y: 75 }, { x: 35, y: 75 }], instruction: 'Outer enclosure' },
      { id: 2, points: [{ x: 35, y: 50 }, { x: 65, y: 50 }], instruction: 'Center partition' },
    ],
    sampleWord: {
      akkha: '𑀛𑀸𑀢',
      roman: 'Jhat',
      deva: 'झात',
      meaning: 'Eight',
    },
    audioNoteFreq: 540,
  },
  {
    id: 'num-9',
    glyph: '𑁯', // 9
    devalipi: '९',
    romanized: 'Khu (9)',
    ipa: '/kʰu/',
    category: 'number',
    svgPath: 'M 65,25 L 35,25 L 35,50 L 65,50 L 65,75',
    strokes: [
      { id: 1, points: [{ x: 65, y: 25 }, { x: 35, y: 25 }, { x: 35, y: 50 }, { x: 65, y: 50 }, { x: 65, y: 75 }], instruction: 'Curved nine path' },
    ],
    sampleWord: {
      akkha: '𑀔𑀼',
      roman: 'Khu',
      deva: 'खु',
      meaning: 'Nine',
    },
    audioNoteFreq: 570,
  },
];

export const ALL_AKKHA_GLYPHS = [...AKKHA_VOWELS, ...AKKHA_CONSONANTS, ...AKKHA_NUMBERS];
