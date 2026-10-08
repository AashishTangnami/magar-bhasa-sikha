import React, { useState } from 'react';
import { Lesson } from '../types';
import { LessonLabProps } from '../types/lessonLab';
import { LESSONS } from '../data/lessonsData';
import { SandTracingCanvas } from './SandTracingCanvas';
import { CheckCircle, ArrowRight, X, Lock, XCircle } from 'lucide-react';
import { formatUnboxedMetadata } from '../utils/perception-impeccable-harness';

// Serene stone surface tokens (shared with Home hub aesthetic)
const CARD = 'bg-white border-stone-200 dark:bg-stone-900/60 dark:border-stone-800';
const PRIMARY_BTN =
  'min-h-11 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all active:scale-[0.98] cursor-pointer shadow-xs bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 dark:border-transparent dark:bg-stone-100 dark:hover:bg-white dark:text-stone-900';
const SECONDARY_BTN =
  'min-h-11 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl font-semibold text-xs border transition-all active:scale-[0.98] cursor-pointer bg-white hover:bg-stone-100 text-stone-800 border-stone-300 dark:bg-stone-900/60 dark:hover:bg-stone-800 dark:text-stone-200 dark:border-stone-800';
const OPTION_IDLE =
  'bg-white hover:bg-stone-50 border-stone-200 text-stone-900 dark:bg-stone-900/60 dark:hover:bg-stone-800 dark:border-stone-800 dark:text-white';
const OPTION_DONE =
  'bg-stone-100 border-stone-200 text-stone-400 dark:bg-stone-950/60 dark:border-stone-800 dark:text-stone-600 cursor-not-allowed';
const KICKER = 'text-[11px] font-mono uppercase tracking-wider text-amber-800 dark:text-amber-400 font-semibold';

export const LessonLab: React.FC<LessonLabProps> = ({
  userStats,
  onCompleteLesson,
  className = '',
}) => {
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [matchSelectedLeft, setMatchSelectedLeft] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [stepComplete, setStepComplete] = useState(false);

  const activeLesson = LESSONS.find((l) => l.id === activeLessonId);

  const startLesson = (lesson: Lesson) => {
    setActiveLessonId(lesson.id);
    setCurrentStepIndex(0);
    setSelectedQuizOption(null);
    setQuizSubmitted(false);
    setMatchSelectedLeft(null);
    setMatchedPairs([]);
    setStepComplete(false);
  };

  const handleNextStep = () => {
    if (!activeLesson) return;

    if (currentStepIndex < activeLesson.steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      setSelectedQuizOption(null);
      setQuizSubmitted(false);
      setMatchSelectedLeft(null);
      setMatchedPairs([]);
      setStepComplete(false);
    } else {
      // Complete lesson!
      onCompleteLesson(activeLesson.id, activeLesson.xpReward, activeLesson.mundriReward);
      setActiveLessonId(null);
    }
  };

  const handleQuizSelect = (index: number) => {
    if (quizSubmitted) return;
    setSelectedQuizOption(index);
    setQuizSubmitted(true);
    const step = activeLesson?.steps[currentStepIndex];
    const isCorrect = step?.quizQuestion?.options[index]?.isCorrect;
    if (isCorrect) {
      setStepComplete(true);
    }
  };

  const handleMatchClick = (side: 'left' | 'right', text: string) => {
    if (matchedPairs.includes(text)) return;

    if (side === 'left') {
      setMatchSelectedLeft(text);
    } else if (side === 'right' && matchSelectedLeft) {
      const step = activeLesson?.steps[currentStepIndex];
      const pair = step?.matchPairs?.find(
        (p) => p.left === matchSelectedLeft && p.right === text
      );

      if (pair) {
        setMatchedPairs((prev) => [...prev, pair.left, pair.right]);
        setMatchSelectedLeft(null);

        if (step?.matchPairs && matchedPairs.length + 2 >= step.matchPairs.length * 2) {
          setStepComplete(true);
        }
      } else {
        setMatchSelectedLeft(null);
      }
    }
  };

  const totalLessonsCount = LESSONS.length;
  const completedLessonsCount = userStats.completedLessonIds.length;
  const progressPercent = (completedLessonsCount / totalLessonsCount) * 100;

  return (
    <div id="learning-lab-container" className={`space-y-8 pb-12 ${className}`}>
      {!activeLesson ? (
        <div className="space-y-8 max-w-5xl mx-auto">
          {/* Editorial Header with Khurpeto Progress */}
          <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-stone-200 dark:border-stone-800">
            <div className="space-y-2 max-w-2xl">
              <div className={KICKER}>
                {formatUnboxedMetadata(['अक्खा लिपि पाठ्यक्रम', 'Learning Path', `${totalLessonsCount} Lessons`])}
              </div>
              <h1 className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-stone-900 dark:text-stone-100">
                Akkha Lipi Learning Path
              </h1>
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                Progress level by level through script fundamentals, sand tracing, quizzes and matching exercises. Each completed lesson unlocks the next.
              </p>
            </div>

            <div className={`p-4 rounded-2xl border lg:w-72 shrink-0 space-y-2.5 ${CARD}`}>
              <div className="flex items-baseline justify-between text-xs">
                <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  Khurpeto Progress
                </span>
                <span className="font-bold font-mono tabular-nums text-stone-900 dark:text-white">
                  {completedLessonsCount} / {totalLessonsCount}
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full overflow-hidden bg-stone-200 dark:bg-stone-800">
                <div
                  className="h-full bg-amber-600 dark:bg-amber-400 transition-all duration-700"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="text-[11px] text-stone-500 dark:text-stone-400">
                {Math.round(progressPercent)}% of the curriculum complete
              </div>
            </div>
          </section>

          {/* Curriculum Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {LESSONS.map((lesson, idx) => {
              const isCompleted = userStats.completedLessonIds.includes(lesson.id);
              const isUnlocked = idx === 0 || userStats.completedLessonIds.includes(LESSONS[idx - 1].id);

              return (
                <div
                  key={lesson.id}
                  id={`lesson-card-${lesson.id}`}
                  className={`p-5 rounded-xl border transition-all flex flex-col justify-between group ${
                    isCompleted
                      ? 'bg-amber-50/50 border-amber-200 dark:bg-amber-500/[0.04] dark:border-amber-500/20'
                      : isUnlocked
                      ? `${CARD} hover:border-stone-300 dark:hover:border-stone-700 hover:shadow-xs`
                      : 'bg-stone-50 border-stone-200 dark:bg-stone-950/40 dark:border-stone-800/60 opacity-60'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3 text-[11px] font-mono text-stone-500 dark:text-stone-400">
                      <span className="uppercase tracking-wider">
                        {formatUnboxedMetadata([`Level ${lesson.level}`, lesson.category, `+${lesson.xpReward} XP`, `◎ ${lesson.mundriReward}`])}
                      </span>
                      {isCompleted && (
                        <span className="flex items-center gap-1 font-sans font-semibold text-amber-800 dark:text-amber-300">
                          <CheckCircle className="w-3.5 h-3.5" />
                          Completed
                        </span>
                      )}
                    </div>

                    <div className="font-akkha text-xl font-bold text-amber-700 dark:text-amber-400 mb-1">
                      {lesson.titleAkkha}
                    </div>
                    <h3 className="font-heading font-bold text-base text-stone-900 dark:text-white group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors">
                      {lesson.title}
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                      {lesson.subtitle}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between">
                    <span className="text-xs text-stone-500 dark:text-stone-400">
                      {lesson.steps.length} exercises
                    </span>

                    {isUnlocked ? (
                      <button
                        onClick={() => startLesson(lesson)}
                        className={isCompleted ? SECONDARY_BTN : PRIMARY_BTN}
                      >
                        <span>{isCompleted ? 'Review' : 'Start'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <span className="min-h-11 flex items-center gap-1.5 text-xs text-stone-500 font-medium">
                        <Lock className="w-3.5 h-3.5" />
                        Complete Level {idx}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Focused Lesson Flow */
        <div
          id="active-lesson-player"
          className={`border rounded-2xl p-5 md:p-8 max-w-3xl mx-auto space-y-6 ${CARD}`}
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-4">
            <div className="space-y-1">
              <div className={KICKER}>
                {formatUnboxedMetadata([`Level ${activeLesson.level}`, activeLesson.category, `Step ${currentStepIndex + 1} of ${activeLesson.steps.length}`])}
              </div>
              <h3 className="text-lg md:text-xl font-heading font-black text-stone-900 dark:text-white">
                {activeLesson.title}
              </h3>
            </div>

            <button
              onClick={() => setActiveLessonId(null)}
              className="min-h-11 min-w-11 rounded-xl border flex items-center justify-center transition-colors cursor-pointer bg-white hover:bg-stone-100 border-stone-200 text-stone-500 hover:text-stone-900 dark:bg-stone-900 dark:hover:bg-stone-800 dark:border-stone-800 dark:text-stone-400 dark:hover:text-white"
              title="Exit lesson"
              aria-label="Exit lesson"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Step Progress */}
          <div className="w-full h-1 rounded-full overflow-hidden bg-stone-200 dark:bg-stone-800">
            <div
              className="h-full bg-amber-600 dark:bg-amber-400 transition-all duration-300"
              style={{
                width: `${((currentStepIndex + 1) / activeLesson.steps.length) * 100}%`,
              }}
            />
          </div>

          {/* Step Renderer */}
          {(() => {
            const step = activeLesson.steps[currentStepIndex];

            // 1. Intro Step
            if (step.type === 'intro') {
              return (
                <div className="space-y-6 text-center py-6 max-w-md mx-auto">
                  <div className="w-16 h-16 mx-auto rounded-2xl border flex items-center justify-center text-3xl font-akkha bg-amber-50 border-amber-200 text-amber-700 dark:bg-stone-950 dark:border-stone-800 dark:text-amber-400">
                    𑀅
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-heading font-bold text-stone-900 dark:text-white">
                      {step.title}
                    </h4>
                    <p className="text-xs md:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                      {step.instructions}
                    </p>
                  </div>
                  <button onClick={handleNextStep} className={PRIMARY_BTN}>
                    <span>Begin Exercises</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              );
            }

            // 2. Sand Tracing Step
            if (step.type === 'trace') {
              return (
                <div className="space-y-4">
                  <div className="text-center space-y-1">
                    <h4 className="text-base font-heading font-bold text-stone-900 dark:text-white">
                      {step.title}
                    </h4>
                    <p className="text-xs text-stone-600 dark:text-stone-400">{step.instructions}</p>
                  </div>
                  <SandTracingCanvas
                    selectedGlyphId={step.glyphId}
                    onTraceComplete={(_glyphId, _accuracy) => {
                      setStepComplete(true);
                    }}
                  />
                  {stepComplete && (
                    <div className="text-center pt-2">
                      <button onClick={handleNextStep} className={PRIMARY_BTN}>
                        <span>Continue</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              );
            }

            // 3. Quiz Step
            if (step.type === 'quiz' && step.quizQuestion) {
              const q = step.quizQuestion;
              return (
                <div className="space-y-5 max-w-lg mx-auto py-2">
                  <div className="text-center space-y-1">
                    <span className={KICKER}>Quiz</span>
                    <h4 className="text-lg font-heading font-bold text-stone-900 dark:text-white">
                      {q.prompt}
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {q.options.map((opt, idx) => {
                      const isSelected = selectedQuizOption === idx;
                      let btnStyle = OPTION_IDLE;
                      if (quizSubmitted) {
                        if (opt.isCorrect) {
                          btnStyle = 'bg-amber-50 border-amber-400 text-stone-900 ring-1 ring-amber-400/40 dark:bg-amber-500/10 dark:border-amber-500/40 dark:text-white';
                        } else if (isSelected) {
                          btnStyle = 'bg-red-50 border-red-300 text-red-900 dark:bg-red-500/10 dark:border-red-500/30 dark:text-red-200';
                        } else {
                          btnStyle = OPTION_DONE;
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleQuizSelect(idx)}
                          className={`min-h-11 p-3.5 rounded-xl border font-medium text-xs md:text-sm text-left flex items-center justify-between transition-all cursor-pointer ${btnStyle}`}
                        >
                          <span>{opt.text}</span>
                          {quizSubmitted && opt.isCorrect && (
                            <CheckCircle className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0" />
                          )}
                          {quizSubmitted && isSelected && !opt.isCorrect && (
                            <XCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="p-4 rounded-xl border text-xs space-y-3 bg-stone-50 border-stone-200 text-stone-700 dark:bg-stone-950/60 dark:border-stone-800 dark:text-stone-300">
                      <p className="leading-relaxed">
                        <strong className="font-semibold text-stone-900 dark:text-white">Explanation · </strong>
                        {q.explanation}
                      </p>
                      <button onClick={handleNextStep} className={`w-full ${PRIMARY_BTN}`}>
                        Continue
                      </button>
                    </div>
                  )}
                </div>
              );
            }

            // 4. Match Pairs Step
            if (step.type === 'match' && step.matchPairs) {
              const leftItems = step.matchPairs.map((p) => p.left);
              const rightItems = [...step.matchPairs.map((p) => p.right)].sort();

              return (
                <div className="space-y-5 max-w-lg mx-auto py-2">
                  <div className="text-center space-y-1">
                    <h4 className="text-lg font-heading font-bold text-stone-900 dark:text-white">
                      {step.title}
                    </h4>
                    <p className="text-xs text-stone-600 dark:text-stone-400">{step.instructions}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Left Items (Akkha) */}
                    <div className="space-y-2">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 text-center">
                        Akkha Lipi
                      </div>
                      {leftItems.map((item, i) => {
                        const isMatched = matchedPairs.includes(item);
                        const isSelected = matchSelectedLeft === item;
                        return (
                          <button
                            key={i}
                            onClick={() => handleMatchClick('left', item)}
                            disabled={isMatched}
                            className={`min-h-11 w-full p-2.5 rounded-xl border font-akkha font-bold text-lg text-center transition-all cursor-pointer ${
                              isMatched
                                ? OPTION_DONE
                                : isSelected
                                ? 'bg-amber-50 border-amber-400 text-amber-700 ring-1 ring-amber-400/40 dark:bg-amber-500/10 dark:border-amber-500/40 dark:text-amber-400'
                                : 'bg-white hover:bg-stone-50 border-stone-200 text-amber-700 dark:bg-stone-900/60 dark:hover:bg-stone-800 dark:border-stone-800 dark:text-amber-400'
                            }`}
                          >
                            {item}
                          </button>
                        );
                      })}
                    </div>

                    {/* Right Items */}
                    <div className="space-y-2">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 text-center">
                        Meaning
                      </div>
                      {rightItems.map((item, i) => {
                        const isMatched = matchedPairs.includes(item);
                        return (
                          <button
                            key={i}
                            onClick={() => handleMatchClick('right', item)}
                            disabled={isMatched}
                            className={`min-h-11 w-full p-2.5 rounded-xl border text-xs text-center transition-all cursor-pointer ${
                              isMatched ? OPTION_DONE : OPTION_IDLE
                            }`}
                          >
                            {item}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {stepComplete && (
                    <div className="text-center pt-2">
                      <button onClick={handleNextStep} className={PRIMARY_BTN}>
                        <span>All Matched · Continue</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              );
            }

            return null;
          })()}
        </div>
      )}
    </div>
  );
};
