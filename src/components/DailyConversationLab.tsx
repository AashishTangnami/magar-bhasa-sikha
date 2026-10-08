import React, { useState, useEffect, useRef } from 'react';
import { DialectId, UserStats } from '../types';
import { DIALECTS } from '../data/dialectData';
import { useTheme } from '../context/ThemeContext';
import { CONVERSATION_SCENARIOS } from '../data/conversationsData';
import {
  INITIAL_CONVERSATION_PROGRESS,
  ConversationProgress,
  evaluateDialogueResponse,
  isScenarioCompleted,
  markScenarioCompleted,
  resetScenarioProgress,
} from '../utils/daily-conversations';
import {
  ConversationScenario,
  DialogueTurn,
  DialogueOption,
  ConversationEvaluationResult,
} from '../types/conversations';
import {
  MessageSquare,
  Volume2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  Sparkles,
  MapPin,
  Award,
  BookOpen,
} from 'lucide-react';

interface DailyConversationLabProps {
  activeDialect: DialectId;
  onSelectDialect: (dialect: DialectId) => void;
  userStats: UserStats;
  onUpdateStats?: (updater: (prev: UserStats) => UserStats) => void;
  onOpenAiGuru?: () => void;
}

export const DailyConversationLab: React.FC<DailyConversationLabProps> = ({
  activeDialect,
  onSelectDialect,
  userStats,
  onUpdateStats,
  onOpenAiGuru,
}) => {
  const { isBright } = useTheme();

  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState<number>(0);
  const [activeTurnIndex, setActiveTurnIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [evaluation, setEvaluation] = useState<ConversationEvaluationResult | null>(null);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  // Single source of truth: completion bitmask, streak and accuracy (pure updates)
  const [progress, setProgress] = useState<ConversationProgress>(INITIAL_CONVERSATION_PROGRESS);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const scenario: ConversationScenario = CONVERSATION_SCENARIOS[selectedScenarioIndex] || CONVERSATION_SCENARIOS[0];
  const currentTurn: DialogueTurn | undefined = scenario.turns[activeTurnIndex];

  // Stop any in-flight pronunciation when leaving the lab so the utterance
  // (and its setState callbacks) do not outlive the component
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  useEffect(() => {
    return () => {
      const utterance = utteranceRef.current;
      if (utterance) {
        utterance.onstart = null;
        utterance.onend = null;
        utterance.onerror = null;
        utteranceRef.current = null;
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, []);

  const handleSelectOption = (option: DialogueOption) => {
    if (evaluation || !currentTurn) return;
    setSelectedOptionId(option.id);

    const { progress: nextProgress, result } = evaluateDialogueResponse(progress, currentTurn, option.id);
    setProgress(nextProgress);
    setEvaluation(result);

    // If culturally appropriate and userStats updater provided
    if (result.isCorrect && onUpdateStats) {
      onUpdateStats((prev) => ({
        ...prev,
        score: prev.score + result.scoreBonus,
      }));
    }
  };

  const handleNextTurn = () => {
    if (!currentTurn) return;
    setSelectedOptionId(null);
    setEvaluation(null);

    const nextIndex = activeTurnIndex + 1;
    if (nextIndex < scenario.turns.length) {
      setActiveTurnIndex(nextIndex);
    } else {
      // Scenario Completed!
      const completed = markScenarioCompleted(progress, selectedScenarioIndex);
      setProgress(completed);
      setIsCompleted(true);
      if (onUpdateStats) {
        onUpdateStats((prev) => ({
          ...prev,
          score: prev.score + 100,
          streakDays: Math.max(prev.streakDays, completed.streak),
        }));
      }
    }
  };

  const handleResetScenario = () => {
    setActiveTurnIndex(0);
    setSelectedOptionId(null);
    setEvaluation(null);
    setIsCompleted(false);
    setProgress(resetScenarioProgress);
  };

  const handleSelectScenario = (idx: number) => {
    setSelectedScenarioIndex(idx);
    setActiveTurnIndex(0);
    setSelectedOptionId(null);
    setEvaluation(null);
    setIsCompleted(false);
  };

  const playPronunciation = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      utterance.lang = 'ne-NP';
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }
  };

  const activeDialectSentence = currentTurn
    ? currentTurn.prompt.dialects[activeDialect] || currentTurn.prompt.dialects.dhut
    : null;

  return (
    <div id="daily-conversation-lab" className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header & Context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              दैनिक कुराकानी · Daily Situational Dialogues
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-heading font-black tracking-tight text-stone-900 dark:text-white mt-1">
            Living Everyday Magar Conversations
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1 max-w-2xl">
            Learn through real-world social exchanges at the mountain hearth, bazaar, and trails with interactive response choices and multi-dialect comparisons.
          </p>
        </div>

        {/* Dialect Quick Toggle */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl border self-start sm:self-auto shrink-0 bg-stone-100 dark:bg-stone-900/60 border-stone-200 dark:border-stone-800">
          {(['dhut', 'kham', 'kaike'] as const).map((d) => (
            <button
              key={d}
              onClick={() => onSelectDialect(d)}
              className={`min-h-11 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeDialect === d
                  ? isBright
                    ? 'bg-white text-stone-900 shadow-xs font-bold'
                    : 'bg-stone-800 text-stone-100 shadow-xs font-bold'
                  : 'text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white'
              }`}
            >
              {DIALECTS[d].name.replace('Magar ', '')}
            </button>
          ))}
        </div>
      </div>

      {/* Scenario Day Selector Rail */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {CONVERSATION_SCENARIOS.map((sc, idx) => {
          const isSelected = idx === selectedScenarioIndex;
          const isDone = isScenarioCompleted(progress.completionMask, idx);
          return (
            <button
              key={sc.id}
              onClick={() => handleSelectScenario(idx)}
              className={`min-h-11 p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? isBright
                    ? 'bg-amber-50/70 border-amber-300 ring-1 ring-amber-400/40 shadow-xs'
                    : 'bg-amber-500/10 border-amber-500/30 ring-1 ring-amber-400/30'
                  : isBright
                  ? 'bg-white hover:bg-stone-50 border-stone-200'
                  : 'bg-stone-900/60 hover:bg-stone-800 border-stone-800'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-amber-700 dark:text-amber-400">
                    Day {sc.dayNumber}
                  </span>
                  {isDone && (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-amber-800 dark:text-amber-300">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Completed
                    </span>
                  )}
                </div>
                <div className="font-bold text-xs text-stone-900 dark:text-white mt-1">
                  {sc.title}
                </div>
                <div className="text-[10px] text-stone-500 font-devanagari mt-0.5">
                  {sc.nepaliTitle}
                </div>
              </div>
              <div className="text-[10px] text-stone-500 dark:text-stone-400 mt-2 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span className="truncate">{sc.location}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Scenario Atmosphere Context Card */}
      <div
        className={`p-4 rounded-2xl border transition-colors space-y-2 ${
          isBright ? 'bg-white border-stone-200 shadow-xs' : 'bg-stone-900/60 border-stone-800'
        }`}
      >
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-700 dark:text-amber-400" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
            Cultural Setting · {scenario.location}
          </h2>
        </div>
        <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
          {scenario.contextDesc}
        </p>
        <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80 text-[11px] text-amber-800 dark:text-amber-300 italic">
          <span className="not-italic font-semibold">Cultural insight · </span>{scenario.culturalInsight}
        </div>
      </div>

      {/* Active Dialogue Interactive Stage */}
      {!isCompleted && currentTurn && activeDialectSentence && (
        <div className="space-y-4">
          {/* 1. Native Speaker Speech Bubble */}
          <div
            className={`p-5 rounded-2xl border transition-colors space-y-3 ${
              isBright
                ? 'bg-stone-50 border-stone-200'
                : 'bg-stone-900/40 border-stone-800'
            }`}
          >
            {/* Speaker Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-2xl">{currentTurn.speaker.avatarSymbol}</div>
                <div>
                  <div className="font-bold text-xs text-stone-900 dark:text-white">
                    {currentTurn.speaker.name}
                  </div>
                  <div className="text-[10px] text-stone-500 font-devanagari">
                    {currentTurn.speaker.role}
                  </div>
                </div>
              </div>

              {/* Pronunciation & Audio Trigger */}
              <button
                onClick={() => playPronunciation(activeDialectSentence.devanagari)}
                className={`min-h-11 flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer active:scale-95 ${
                  isSpeaking
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : isBright
                    ? 'bg-white hover:bg-stone-100 text-stone-800 border-stone-200 shadow-xs'
                    : 'bg-stone-900/60 hover:bg-stone-800 text-stone-200 border-stone-800'
                }`}
                title="Listen to native pronunciation"
              >
                <Volume2 className={`w-4 h-4 ${isSpeaking ? 'text-amber-600 animate-pulse' : 'text-amber-700 dark:text-amber-400'}`} />
                <span>Listen</span>
              </button>
            </div>

            {/* Authentic Script Display with Standardized 3-Role Typographic Color Hierarchy */}
            <div className="p-4 rounded-xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-2">
              {/* Indigenous Akkha Lipi Script: Warm Cultural Amber */}
              <div className="text-xl sm:text-2xl font-bold font-akkha text-amber-700 dark:text-amber-400 tracking-wide">
                {activeDialectSentence.akkha}
              </div>

              {/* Secondary Translation (Nepali Devanagari): Muted Slate */}
              <div className="text-sm sm:text-base font-devanagari text-stone-600 dark:text-stone-400">
                {activeDialectSentence.devanagari}
              </div>

              {/* Primary Words (Romanized): Clean high-contrast neutral */}
              <div className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-white font-mono">
                {activeDialectSentence.roman}
              </div>

              {/* English Meaning */}
              <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80 text-xs text-stone-600 dark:text-stone-400">
                <span className="font-semibold text-stone-700 dark:text-stone-300">Meaning:</span>{' '}
                {currentTurn.prompt.english}
              </div>
            </div>

            {/* Dialect Contrast Matrix for this prompt (Unboxed Clean Typography) */}
            <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80 text-[11px] text-stone-500 dark:text-stone-400">
              <span className="font-mono uppercase text-[10px] font-semibold text-stone-400 dark:text-stone-500 mr-2">
                Comparative Dialects:
              </span>
              {(['dhut', 'kham', 'kaike'] as const)
                .filter((d) => d !== activeDialect)
                .map((d, i, arr) => {
                  const sent = currentTurn.prompt.dialects[d];
                  return (
                    <span key={d} className="inline-flex items-center">
                      <span className="font-semibold capitalize text-stone-700 dark:text-stone-300 mr-1">{d}:</span>
                      <span>{sent.roman}</span>
                      {i < arr.length - 1 && <span className="mx-2 opacity-40">·</span>}
                    </span>
                  );
                })}
            </div>
          </div>

          {/* 2. Learner Response Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                Choose your response · तपाईंको उत्तर छान्नुहोस्
              </span>
              <span className="text-xs font-mono text-stone-500">
                Turn {activeTurnIndex + 1} of {scenario.turns.length}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {currentTurn.options.map((option) => {
                const optSentence = option.dialects[activeDialect] || option.dialects.dhut;
                const isSelected = selectedOptionId === option.id;
                const showSuccess = evaluation && isSelected && option.isCulturallyAppropriate;
                const showWarning = evaluation && isSelected && !option.isCulturallyAppropriate;

                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(option)}
                    disabled={Boolean(evaluation)}
                    className={`min-h-11 p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      showSuccess
                        ? 'bg-amber-50/70 dark:bg-amber-500/10 border-amber-400 ring-1 ring-amber-400/40 text-stone-900 dark:text-white'
                        : showWarning
                        ? 'bg-red-50 dark:bg-red-500/10 border-red-300 dark:border-red-500/30 text-stone-900 dark:text-white'
                        : isBright
                        ? 'bg-white hover:bg-stone-50 hover:border-stone-300 border-stone-200 text-stone-800'
                        : 'bg-stone-900/60 hover:bg-stone-800 border-stone-800 text-stone-200'
                    }`}
                  >
                    <div className="space-y-1">
                      {/* Akkha Lipi */}
                      <div className="text-base sm:text-lg font-bold font-akkha text-amber-700 dark:text-amber-400">
                        {optSentence.akkha}
                      </div>

                      {/* Devanagari */}
                      <div className="text-xs sm:text-sm font-devanagari text-stone-600 dark:text-stone-400">
                        {optSentence.devanagari}
                      </div>

                      {/* Romanized */}
                      <div className="text-xs font-semibold text-stone-900 dark:text-white font-mono">
                        {optSentence.roman}
                      </div>

                      {/* English Meaning */}
                      <div className="text-xs text-stone-600 dark:text-stone-400 pt-1">
                        "{option.english}"
                      </div>
                    </div>

                    <div className="mt-2 pt-2 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-[10px]">
                      <span className="font-mono uppercase tracking-wider text-stone-500">
                        Honorific: {option.honorificLevel.replace('_', ' ')}
                      </span>
                      {showSuccess && (
                        <span className="flex items-center gap-1 font-bold text-amber-800 dark:text-amber-300">
                          <CheckCircle2 className="w-3 h-3" /> Culturally Appropriate (+50 pts)
                        </span>
                      )}
                      {showWarning && (
                        <span className="flex items-center gap-1 font-bold text-red-700 dark:text-red-300">
                          <AlertCircle className="w-3 h-3" /> Impolite or Abrupt
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Cultural Feedback & Turn Progression */}
          {evaluation && (
            <div
              className={`p-4 rounded-xl border space-y-3 animate-in fade-in-50 ${
                evaluation.isCorrect
                  ? 'bg-amber-50/60 dark:bg-amber-500/[0.06] border-amber-300 dark:border-amber-500/30'
                  : 'bg-stone-50 dark:bg-stone-900/60 border-stone-300 dark:border-stone-700'
              }`}
            >
              <div className="flex items-start gap-2.5">
                {evaluation.isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-amber-800 dark:text-amber-300 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                )}
                <div className="space-y-1">
                  <div className="font-bold text-xs text-stone-900 dark:text-white">
                    {evaluation.isCorrect ? 'Well said · उत्तम संवाद' : 'Cultural Note · सांस्कृतिक मार्गदर्शन'}
                  </div>
                  <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                    {evaluation.explanation}
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  onClick={handleNextTurn}
                  className={`min-h-11 px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    isBright
                      ? 'bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 dark:border-transparent shadow-xs'
                      : 'bg-stone-100 hover:bg-white text-stone-900'
                  }`}
                >
                  <span>Continue Dialogue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Scenario Completed Celebration State */}
      {isCompleted && (
        <div
          className={`p-6 rounded-2xl border text-center space-y-4 animate-in zoom-in-95 ${
            isBright ? 'bg-white border-stone-200 shadow-md' : 'bg-stone-900/60 border-stone-800'
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center mx-auto text-2xl">
            <Award className="w-6 h-6" />
          </div>

          <div className="space-y-1 max-w-md mx-auto">
            <h2 className="text-lg font-heading font-black text-stone-900 dark:text-white">
              Dialogue Completed · कुराकानी सफल भयो
            </h2>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              You navigated the scenario with authentic cultural etiquette. You have strengthened your active speaking familiarity with {DIALECTS[activeDialect].name}.
            </p>
          </div>

          <div className="flex items-center justify-center gap-6 py-2">
            <div className="text-center">
              <span className="text-[10px] uppercase font-mono tracking-wider text-stone-500 block">
                Bonus Awarded
              </span>
              <span className="text-lg font-black text-amber-700 dark:text-amber-400">
                +150 XP
              </span>
            </div>
            <div className="h-8 w-px bg-stone-200 dark:bg-stone-800" />
            <div className="text-center">
              <span className="text-[10px] uppercase font-mono tracking-wider text-stone-500 block">
                Daily Streak
              </span>
              <span className="text-lg font-black text-stone-900 dark:text-white">
                {userStats.streakDays + 1} Days
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleResetScenario}
              className={`min-h-11 px-4 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 cursor-pointer ${
                isBright
                  ? 'bg-white hover:bg-stone-50 text-stone-800 border-stone-300'
                  : 'bg-stone-900/60 hover:bg-stone-800 text-stone-200 border-stone-800'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Practice Again</span>
            </button>

            {selectedScenarioIndex < CONVERSATION_SCENARIOS.length - 1 && (
              <button
                onClick={() => handleSelectScenario(selectedScenarioIndex + 1)}
                className={`min-h-11 px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer ${
                  isBright
                    ? 'bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 dark:border-transparent shadow-xs'
                    : 'bg-stone-100 hover:bg-white text-stone-900'
                }`}
              >
                <span>Next Scenario</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {onOpenAiGuru && (
              <button
                onClick={onOpenAiGuru}
                className="min-h-11 px-4 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 dark:bg-stone-900/60 dark:hover:bg-stone-800 dark:text-stone-200 dark:border-stone-800 flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                <span>Roleplay with Guruma</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
