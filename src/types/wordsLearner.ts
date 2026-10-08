export type WordsLearnerTab =
  | 'explorer'
  | 'flashcards'
  | 'practice'
  | 'builder'
  | 'dialogue';

export type PracticeMode = 'mcq' | 'script' | 'match';

export type ViewMode = 'split' | 'grid' | 'list';

export interface MagarWordsLearnerProps {
  onAwardXP?: (xp: number, mundri: number) => void;
  className?: string;
}

export interface VocabCategory {
  id: string;
  label: string;
  labelNp: string;
  icon: string;
}

export interface PartOfSpeechOption {
  id: string;
  label: string;
}

export interface SentencePuzzle {
  targetEnglish: string;
  targetNepali: string;
  correctWords: string[];
  deva: string;
  akkha: string;
  scrambled: string[];
  explanation: string;
}
