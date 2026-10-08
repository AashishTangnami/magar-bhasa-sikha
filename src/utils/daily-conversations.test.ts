import { describe, it, expect } from 'vitest';
import {
  INITIAL_CONVERSATION_PROGRESS,
  evaluateDialogueResponse,
  isScenarioCompleted,
  markScenarioCompleted,
} from './daily-conversations';
import { CONVERSATION_SCENARIOS } from '../data/conversationsData';

describe('Daily Situational Conversations Engine (TDD)', () => {
  it('starts with empty progress (no completions, streak or accuracy)', () => {
    expect(INITIAL_CONVERSATION_PROGRESS.completionMask).toBe(0);
    expect(INITIAL_CONVERSATION_PROGRESS.streak).toBe(0);
    expect(INITIAL_CONVERSATION_PROGRESS.accuracy).toBe(0);
    expect(Object.isFrozen(INITIAL_CONVERSATION_PROGRESS)).toBe(true);
  });

  it('provides authentic daily scenarios with all 3 living dialects', () => {
    expect(CONVERSATION_SCENARIOS.length).toBeGreaterThanOrEqual(3);

    const scenario = CONVERSATION_SCENARIOS[0];
    expect(scenario).toBeDefined();
    expect(scenario.title).toBeTruthy();
    expect(scenario.turns.length).toBeGreaterThan(0);

    const firstTurn = scenario.turns[0];
    expect(firstTurn.prompt.dialects.dhut).toBeDefined();
    expect(firstTurn.prompt.dialects.kham).toBeDefined();
    expect(firstTurn.prompt.dialects.kaike).toBeDefined();

    // Invariant: each dialect sentence must include Roman, Devanagari, and Akkha Lipi
    for (const d of ['dhut', 'kham', 'kaike'] as const) {
      const sentence = firstTurn.prompt.dialects[d];
      expect(sentence.roman).toBeTruthy();
      expect(sentence.devanagari).toBeTruthy();
      expect(sentence.akkha).toBeTruthy();
    }
  });

  it('evaluates culturally appropriate and respectful options correctly', () => {
    const scenario = CONVERSATION_SCENARIOS[0];
    const turn = scenario.turns[0];
    const correctOption = turn.options.find((o) => o.isCulturallyAppropriate)!;
    expect(correctOption).toBeDefined();

    const { progress, result } = evaluateDialogueResponse(INITIAL_CONVERSATION_PROGRESS, turn, correctOption.id);
    expect(result.isCorrect).toBe(true);
    expect(result.scoreBonus).toBeGreaterThan(0);
    expect(result.explanation).toBeTruthy();
    expect(progress.accuracy).toBe(50);
  });

  it('tracks scenario completion flags via a bitmask', () => {
    let progress = INITIAL_CONVERSATION_PROGRESS;
    expect(isScenarioCompleted(progress.completionMask, 0)).toBe(false);
    expect(isScenarioCompleted(progress.completionMask, 1)).toBe(false);

    progress = markScenarioCompleted(progress, 0);
    expect(isScenarioCompleted(progress.completionMask, 0)).toBe(true);
    expect(isScenarioCompleted(progress.completionMask, 1)).toBe(false);

    progress = markScenarioCompleted(progress, 2);
    expect(isScenarioCompleted(progress.completionMask, 0)).toBe(true);
    expect(isScenarioCompleted(progress.completionMask, 1)).toBe(false);
    expect(isScenarioCompleted(progress.completionMask, 2)).toBe(true);
  });
});
