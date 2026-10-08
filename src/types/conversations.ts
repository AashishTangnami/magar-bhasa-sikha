import { DialectId } from '../types';

export interface DialogueSpeaker {
  id: string;
  name: string;
  role: string; // e.g., 'Village Elder (बाजे)', 'Bazaar Merchant (साहूजी)', 'Highland Trail Guide (गोठाला)'
  avatarSymbol: string;
}

export interface DialectSentence {
  roman: string;
  devanagari: string;
  akkha: string;
  ipa?: string;
}

export interface DialogueOption {
  id: string;
  isCulturallyAppropriate: boolean;
  honorificLevel: 'high_honorific' | 'standard' | 'informal';
  dialects: Record<DialectId, DialectSentence>;
  english: string;
  culturalNuance: string; // Explains etiquette, dialect difference, or why this fits/fails
}

export interface DialogueTurn {
  id: string;
  speaker: DialogueSpeaker;
  prompt: {
    english: string;
    dialects: Record<DialectId, DialectSentence>;
  };
  options: DialogueOption[];
}

export interface ConversationScenario {
  id: string;
  dayNumber: number;
  title: string;
  nepaliTitle: string;
  location: string;
  contextDesc: string;
  culturalInsight: string;
  turns: DialogueTurn[];
}

export interface ConversationEvaluationResult {
  isCorrect: boolean;
  selectedOption: DialogueOption;
  explanation: string;
  scoreBonus: number;
}
