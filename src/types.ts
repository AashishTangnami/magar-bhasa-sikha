export type DialectId = 'dhut' | 'kham' | 'kaike';

export interface DialectInfo {
  id: DialectId;
  name: string;
  nativeName: string;
  symbolName: string;
  iconType: 'river' | 'mountain' | 'sun';
  region: string;
  culturalNote: string;
  greeting: string;
  greetingPhonetic: string;
  speakerCountEstimate: string;
  color: string;
}

export type GlyphCategory = 'vowel' | 'consonant' | 'number' | 'ligature';

export interface StrokePoint {
  x: number;
  y: number;
}

export interface StrokeGuide {
  id: number;
  points: StrokePoint[];
  instruction: string;
}

export interface AkkhaGlyph {
  id: string;
  glyph: string; // Akkha Lipi character presentation
  devalipi: string; // Nepali / Devanagari equivalent (e.g. क, ख, अ, आ)
  romanized: string; // Romanized phonetics (e.g. Ka, Kha, A, Aa)
  ipa: string; // IPA phonetics
  category: GlyphCategory;
  svgPath: string; // SVG path data for crisp scalable vector rendering
  strokes: StrokeGuide[]; // Guide points for sand tracing canvas
  sampleWord: {
    akkha: string;
    roman: string;
    deva: string;
    meaning: string;
  };
  audioNoteFreq: number; // Frequency/timbre parameter for synthetic acoustic articulation
}

export interface VocabularyItem {
  id: string;
  english: string;
  category: 'greetings' | 'kinship' | 'nature' | 'food' | 'numbers' | 'tradition' | 'conversation';
  dhut: {
    word: string;
    deva: string;
    phonetic: string;
    akkha: string;
  };
  kham: {
    word: string;
    deva: string;
    phonetic: string;
    akkha: string;
  };
  kaike: {
    word: string;
    deva: string;
    phonetic: string;
    akkha: string;
  };
  culturalContext?: string;
}

export interface LessonStep {
  type: 'intro' | 'trace' | 'match' | 'quiz' | 'listening' | 'sentence';
  title: string;
  instructions: string;
  glyphId?: string;
  quizQuestion?: {
    prompt: string;
    promptAkkha?: string;
    options: { text: string; akkha?: string; isCorrect: boolean }[];
    explanation: string;
  };
  matchPairs?: { left: string; right: string; leftAkkha?: string }[];
}

export interface Lesson {
  id: string;
  title: string;
  titleAkkha: string;
  subtitle: string;
  category: 'alphabet' | 'basics' | 'culture' | 'kinship' | 'folklore';
  level: number;
  xpReward: number;
  mundriReward: number;
  steps: LessonStep[];
}

export interface StoryVerse {
  verseNumber: number;
  akkhaText: string;
  dialectText: string;
  transliteration: string;
  englishText: string;
  devanagariText: string;
  shamanicNote?: string;
}

export interface FolkloreStory {
  id: string;
  title: string;
  titleAkkha: string;
  dialect: DialectId | 'all';
  type: 'sorathi' | 'maruni' | 'shamanic' | 'kaura';
  historicalPeriod: string;
  originLocation: string;
  summary: string;
  verses: StoryVerse[];
}

export interface AvatarItem {
  id: string;
  name: string;
  nepaliName: string;
  category: 'earring' | 'nose' | 'head' | 'wrap' | 'cholo' | 'vest' | 'beads';
  costMundri: number;
  description: string;
  svgElement: string;
  isEquipped?: boolean;
  isUnlocked?: boolean;
}

export interface UserStats {
  streakDays: number;
  xpPoints: number;
  score: number;
  mundriCount: number;
  completedLessonIds: string[];
  tracedGlyphIds: string[];
  activeDialect: DialectId;
  soundEnabled: boolean;
}
