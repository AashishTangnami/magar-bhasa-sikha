import { DialogueTurn, ConversationEvaluationResult } from '../types/conversations';

/**
 * Conversation progress held in React state. Scenario completion is a compact bitmask
 * (bit i = scenario i completed); all updates are pure and return a new record.
 */
export interface ConversationProgress {
  completionMask: number;
  streak: number;
  accuracy: number;
}

export const INITIAL_CONVERSATION_PROGRESS: ConversationProgress = Object.freeze({
  completionMask: 0,
  streak: 0,
  accuracy: 0,
});

/** Checks the completion bit for a scenario. */
export function isScenarioCompleted(completionMask: number, scenarioIndex: number): boolean {
  return (completionMask & (1 << scenarioIndex)) !== 0;
}

/** Sets the scenario's completion bit and counts the completion toward the streak. */
export function markScenarioCompleted(progress: ConversationProgress, scenarioIndex: number): ConversationProgress {
  return {
    ...progress,
    completionMask: (progress.completionMask | (1 << scenarioIndex)) >>> 0,
    streak: progress.streak + 1,
  };
}

/** Clears per-attempt accuracy when a scenario is replayed; completion and streak are kept. */
export function resetScenarioProgress(progress: ConversationProgress): ConversationProgress {
  return { ...progress, accuracy: 0 };
}

/**
 * Evaluates a selected response against the current dialogue turn.
 * Culturally appropriate answers add 50 accuracy (capped at 100).
 */
export function evaluateDialogueResponse(
  progress: ConversationProgress,
  turn: DialogueTurn,
  selectedOptionId: string
): { progress: ConversationProgress; result: ConversationEvaluationResult } {
  const optionIndex = turn.options.findIndex((opt) => opt.id === selectedOptionId);
  const selectedOption = optionIndex >= 0 ? turn.options[optionIndex] : turn.options[0];
  const isCorrect = selectedOption.isCulturallyAppropriate;

  return {
    progress: isCorrect ? { ...progress, accuracy: Math.min(100, progress.accuracy + 50) } : progress,
    result: {
      isCorrect,
      selectedOption,
      explanation: selectedOption.culturalNuance,
      scoreBonus: isCorrect ? 50 : 10,
    },
  };
}
