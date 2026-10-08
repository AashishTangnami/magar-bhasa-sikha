import {
  VocabCategory,
  PartOfSpeechOption,
  SentencePuzzle,
} from '../types/wordsLearner';

export const VOCAB_CATEGORIES: readonly VocabCategory[] = [
  { id: 'all', label: 'All Words', labelNp: 'सबै शब्दहरू', icon: '✨' },
  { id: 'greetings', label: 'Greetings & Salutations', labelNp: 'अभिवादन र शिष्टाचार', icon: '🙏' },
  { id: 'conversation', label: 'Conversations & Phrases', labelNp: 'कुराकानी र संवाद', icon: '💬' },
  { id: 'questions', label: 'Question Words', labelNp: 'प्रश्न शब्दहरू', icon: '❓' },
  { id: 'pronouns', label: 'Pronouns & People', labelNp: 'सर्वनाम र मानिसहरू', icon: '👥' },
  { id: 'body', label: 'Body Parts', labelNp: 'शरीरका अङ्गहरू', icon: '👁️' },
  { id: 'animals', label: 'Animals & Birds', labelNp: 'जनावर र पशुपन्छी', icon: '🐾' },
  { id: 'numbers', label: 'Numbers & Counting', labelNp: 'संख्या र गणना', icon: '🔢' },
  { id: 'colors', label: 'Colors & Senses', labelNp: 'रङ्गहरू', icon: '🎨' },
  { id: 'family', label: 'Kinship & Family', labelNp: 'नातागोता र परिवार', icon: '👨‍👩‍👧‍👦' },
  { id: 'food', label: 'Food & Kitchen', labelNp: 'खानपान र भान्छा', icon: '🍲' },
  { id: 'nature', label: 'Nature & Landscape', labelNp: 'प्रकृति र भूगोल', icon: '🌲' },
  { id: 'verbs', label: 'Verbs & Actions', labelNp: 'क्रियापदहरू', icon: '🏃' },
  { id: 'time', label: 'Time & Days', labelNp: 'समय र दिनहरू', icon: '⏱️' },
] as const;

export const PARTS_OF_SPEECH: readonly PartOfSpeechOption[] = [
  { id: 'all', label: 'All Types' },
  { id: 'noun', label: 'Nouns (नाम)' },
  { id: 'verb', label: 'Verbs (क्रिया)' },
  { id: 'adjective', label: 'Adjectives (विशेषण)' },
  { id: 'pronoun', label: 'Pronouns (सर्वनाम)' },
  { id: 'numeral', label: 'Numerals (संख्या)' },
  { id: 'phrase', label: 'Phrases (वाक्यांश)' },
] as const;

export const SENTENCE_PUZZLES: readonly SentencePuzzle[] = [
  {
    targetEnglish: 'How are you?',
    targetNepali: 'तपाईँलाई कस्तो छ?',
    correctWords: ['Nāko', 'kunchà', 'le?'],
    deva: 'नाको कुन्च ले?',
    akkha: '𑀦𑀸𑀓𑁄 𑀓𑀼𑀦𑁆𑀘𑀸 𑀮𑁂',
    scrambled: ['kunchà', 'le?', 'Nāko', 'ārmin', 'hē'],
    explanation: 'Nāko (You) + kunchà (how) + le (are)?',
  },
  {
    targetEnglish: 'What is your name?',
    targetNepali: 'तपाईँको नाम के हो?',
    correctWords: ['Nāko', 'ārmin', 'hē', 'le?'],
    deva: 'नाको आर्मिन हे ले?',
    akkha: '𑀦𑀸𑀓𑁄 𑀆𑀭𑁆𑀫𑀺𑀦 𑀳𑁂 𑀮𑁂',
    scrambled: ['ārmin', 'Nāko', 'le?', 'hē', 'Ngā', 'dunge'],
    explanation: 'Nāko (Your) + ārmin (name) + hē (what) + le (is)?',
  },
  {
    targetEnglish: 'I am fine / I am well',
    targetNepali: 'मलाई सन्चै छ',
    correctWords: ['Ngā', 'jherma', 'na', 'le'],
    deva: 'ङा झेर्मा न ले',
    akkha: '𑀗𑀸 𑀛𑁂𑀭𑁆𑀫𑀸 𑀦 𑀮𑁂',
    scrambled: ['jherma', 'Ngā', 'le', 'na', 'kunchà', 'kulāk'],
    explanation: 'Ngā (I) + jherma (fine) + na (indeed) + le (am).',
  },
  {
    targetEnglish: 'Where do you live?',
    targetNepali: 'तपाईँ कहाँ बस्नुहुन्छ?',
    correctWords: ['Nāko', 'kulāk', 'dunge?'],
    deva: 'नाको कुलाक दुङे?',
    akkha: '𑀦𑀸𑀓𑁄 𑀓𑀼𑀮𑀸𑀓 𑀤𑀼𑀗𑁂',
    scrambled: ['dunge?', 'Nāko', 'kulāk', 'Ngā', 'Ilāk', 'rāi'],
    explanation: 'Nāko (You) + kulāk (where) + dunge (stay/live)?',
  },
  {
    targetEnglish: 'Please come home and drink water',
    targetNepali: 'घरमा आउनुहोस् र पानी पिउनुहोस्',
    correctWords: ['Zha', 'lāk', 'rāi!', 'Di', 'tungi.'],
    deva: 'झा लाक राई! डी तुङ्गी।',
    akkha: '𑀛𑀸 𑀮𑀸𑀓 𑀭𑀸𑀇 𑀟𑀻 𑀢𑀼𑀗𑁆𑀕𑀻',
    scrambled: ['rāi!', 'Di', 'lāk', 'Zha', 'tungi.', 'Chyā', 'jyāi'],
    explanation: 'Zha lāk (To home) + rāi (come polite)! Di (Water) + tungi (drink polite).',
  },
] as const;
