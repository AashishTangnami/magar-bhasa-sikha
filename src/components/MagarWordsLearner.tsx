import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  WIKIBOOKS_MAGAR_VOCABULARY,
  WIKIBOOKS_CONVERSATION_SAMPLE,
  MagarWordEntry,
} from '../data/wikibooksVocabulary';
import {
  Search,
  BookOpen,
  Sparkles,
  Layers,
  MessageSquare,
  ArrowRight,
  RotateCcw,
  Check,
  Bookmark,
  BookmarkCheck,
  Grid,
  List,
  Columns,
  HelpCircle,
  Award,
  CheckCircle2,
  X,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import {
  MagarWordsLearnerProps,
  WordsLearnerTab,
  PracticeMode,
  ViewMode,
} from '../types/wordsLearner';
import {
  VOCAB_CATEGORIES as categories,
  PARTS_OF_SPEECH as partsOfSpeech,
  SENTENCE_PUZZLES as sentencePuzzles,
} from '../constants/wordsLearner';
import { formatUnboxedMetadata } from '../utils/perception-impeccable-harness';
import { formatVocabWordMetadata } from '../utils/ui-makeover';
import { matchSearchIndex } from '../utils/search-index';
import { VOCAB_SEARCH_INDEX } from '../utils/search-indexes';

export const MagarWordsLearner: React.FC<MagarWordsLearnerProps> = ({
  onAwardXP,
  className = '',
}) => {
  const { isBright } = useTheme();

  // Navigation tab state
  const [activeTab, setActiveTab] = useState<WordsLearnerTab>('explorer');

  // Search & Filter state
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPos, setSelectedPos] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [selectedWord, setSelectedWord] = useState<MagarWordEntry>(
    WIKIBOOKS_MAGAR_VOCABULARY[0]
  );

  // User persistence state
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const parsed: unknown = JSON.parse(localStorage.getItem('magar_bookmarked_vocab') ?? '[]');
      return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : [];
    } catch {
      return [];
    }
  });

  const [masteredIds, setMasteredIds] = useState<string[]>(() => {
    try {
      const parsed: unknown = JSON.parse(localStorage.getItem('magar_mastered_vocab') ?? '[]');
      return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('magar_bookmarked_vocab', JSON.stringify(bookmarkedIds));
    } catch {
      // safe fallback
    }
  }, [bookmarkedIds]);

  useEffect(() => {
    try {
      localStorage.setItem('magar_mastered_vocab', JSON.stringify(masteredIds));
    } catch {
      // safe fallback
    }
  }, [masteredIds]);

  // Flashcards state
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Practice / Quiz Arena State
  const [practiceMode, setPracticeMode] = useState<PracticeMode>('mcq');
  const [quizScore, setQuizScore] = useState({ correct: 0, total: 0 });
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isQuizAnswered, setIsQuizAnswered] = useState(false);

  // Word Match State
  const [matchPairs, setMatchPairs] = useState<
    { left: MagarWordEntry; right: MagarWordEntry }[]
  >([]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);

  // Sentence Builder State
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const [userSelectedWords, setUserSelectedWords] = useState<string[]>([]);
  const [puzzleSolved, setPuzzleSolved] = useState(false);

  // Filtering: search hits come from the prebuilt index into a reusable per-instance mask
  const searchMaskRef = useRef<Uint8Array>(new Uint8Array(WIKIBOOKS_MAGAR_VOCABULARY.length));
  const filteredWords = useMemo(() => {
    const mask = searchMaskRef.current;
    matchSearchIndex(VOCAB_SEARCH_INDEX, searchQuery, mask);
    return WIKIBOOKS_MAGAR_VOCABULARY.filter(
      (w, i) =>
        mask[i] === 1 &&
        (selectedCategory === 'all' || w.category === selectedCategory) &&
        (selectedPos === 'all' || w.partOfSpeech === selectedPos)
    );
  }, [selectedCategory, selectedPos, searchQuery]);

  const handleToggleBookmark = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleMastered = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const isNew = !masteredIds.includes(id);
    setMasteredIds((prev) =>
      isNew ? [...prev, id] : prev.filter((item) => item !== id)
    );
    if (onAwardXP && isNew) {
      onAwardXP(20, 1);
    }
  };

  // Word Match Challenge
  const initializeWordMatch = () => {
    const shuffled = [...WIKIBOOKS_MAGAR_VOCABULARY]
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);
    const rightsShuffled = [...shuffled].sort(() => 0.5 - Math.random());
    const pairs = shuffled.map((left, idx) => ({
      left,
      right: rightsShuffled[idx],
    }));
    setMatchPairs(pairs);
    setSelectedLeft(null);
    setSelectedRight(null);
    setMatchedIds([]);
  };

  useEffect(() => {
    if (activeTab === 'practice' && practiceMode === 'match') {
      initializeWordMatch();
    }
  }, [activeTab, practiceMode]);

  const handleMatchSelect = (type: 'left' | 'right', id: string) => {
    if (type === 'left') {
      setSelectedLeft(id);
      if (selectedRight) {
        checkMatch(id, selectedRight);
      }
    } else {
      setSelectedRight(id);
      if (selectedLeft) {
        checkMatch(selectedLeft, id);
      }
    }
  };

  const checkMatch = (leftId: string, rightId: string) => {
    if (leftId === rightId) {
      setMatchedIds((prev) => [...prev, leftId]);
      if (onAwardXP) onAwardXP(15, 1);
    }
    setSelectedLeft(null);
    setSelectedRight(null);
  };

  // Sentence Builder Handlers
  const currentPuzzle = sentencePuzzles[puzzleIndex];

  const handleSelectWordInPuzzle = (word: string) => {
    if (puzzleSolved) return;
    const newWords = [...userSelectedWords, word];
    setUserSelectedWords(newWords);

    if (newWords.length === currentPuzzle.correctWords.length) {
      const isCorrect = newWords.every((w, i) => w === currentPuzzle.correctWords[i]);
      if (isCorrect) {
        setPuzzleSolved(true);
        if (onAwardXP) {
          onAwardXP(30, 2);
        }
      }
    }
  };

  const handleResetPuzzle = () => {
    setUserSelectedWords([]);
    setPuzzleSolved(false);
  };

  const handleNextPuzzle = () => {
    setPuzzleIndex((prev) => (prev + 1) % sentencePuzzles.length);
    setUserSelectedWords([]);
    setPuzzleSolved(false);
  };

  // Quiz Options Generator
  const currentQuizWord =
    WIKIBOOKS_MAGAR_VOCABULARY[
      currentQuizIndex % WIKIBOOKS_MAGAR_VOCABULARY.length
    ];
  const quizOptions = useMemo(() => {
    const distractors = WIKIBOOKS_MAGAR_VOCABULARY.filter(
      (w) => w.id !== currentQuizWord.id
    )
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);
    return [currentQuizWord, ...distractors].sort(() => 0.5 - Math.random());
  }, [currentQuizIndex, currentQuizWord.id]);

  const handleAnswerQuiz = (idx: number, chosenWord: MagarWordEntry) => {
    if (isQuizAnswered) return;
    setSelectedOption(idx);
    setIsQuizAnswered(true);

    const isCorrect = chosenWord.id === currentQuizWord.id;
    if (isCorrect) {
      setQuizScore((prev) => ({ correct: prev.correct + 1, total: prev.total + 1 }));
      if (onAwardXP) onAwardXP(20, 1);
    } else {
      setQuizScore((prev) => ({ ...prev, total: prev.total + 1 }));
    }
  };

  const handleNextQuiz = () => {
    setSelectedOption(null);
    setIsQuizAnswered(false);
    setCurrentQuizIndex((prev) => (prev + 1) % WIKIBOOKS_MAGAR_VOCABULARY.length);
  };

  const masteryPercent = Math.round(
    (masteredIds.length / WIKIBOOKS_MAGAR_VOCABULARY.length) * 100
  );

  return (
    <div
      id="magar-words-learner"
      className={`space-y-8 pb-16 transition-all ${className}`}
    >
      {/* 1. EDITORIAL HEADER & SCHOLARLY ANCHOR (Clean Unboxed Typography) */}
      <section className="space-y-4 pt-2">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-stone-200 dark:border-stone-800">
          <div className="space-y-2 max-w-2xl">
            {/* Cultural Kicker */}
            <div className="text-xs font-mono tracking-wider uppercase text-amber-800 dark:text-amber-400 font-semibold">
              {formatUnboxedMetadata([
                'मगर ढुट शब्द भण्डार',
                'Living Lexicon Repository',
                '128 Authenticated Entries',
              ])}
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black tracking-tight text-stone-900 dark:text-stone-100">
              Akkha &amp; Magar Dhut Vocabulary
            </h1>
            <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed max-w-xl">
              Authentic Magar vocabulary cataloged with precise Nepali and English meanings, Romanized phonetics, and 11th-century Akkha Lipi calligraphy.
            </p>
          </div>

          {/* Minimalist Tabular Stats Dossier */}
          <div
            className={`flex items-center gap-6 px-5 py-3 rounded-2xl border shrink-0 ${
              isBright
                ? 'bg-stone-50/80 border-stone-200 text-stone-800'
                : 'bg-stone-900/60 border-stone-800 text-stone-200'
            }`}
          >
            <div className="text-left">
              <span className="text-[10px] uppercase font-mono tracking-wider block text-stone-500 dark:text-stone-400">
                Lexicon
              </span>
              <span className="text-lg font-bold font-mono tabular-nums text-stone-900 dark:text-white">
                {WIKIBOOKS_MAGAR_VOCABULARY.length}
              </span>
            </div>
            <div className="h-8 w-px bg-stone-200 dark:bg-stone-800" />
            <div className="text-left">
              <span className="text-[10px] uppercase font-mono tracking-wider block text-stone-500 dark:text-stone-400">
                Mastered
              </span>
              <span className="text-lg font-bold font-mono tabular-nums text-amber-700 dark:text-amber-400">
                {masteredIds.length}{' '}
                <span className="text-xs font-normal text-stone-500 dark:text-stone-400">
                  ({masteryPercent}%)
                </span>
              </span>
            </div>
            <div className="h-8 w-px bg-stone-200 dark:bg-stone-800" />
            <div className="text-left">
              <span className="text-[10px] uppercase font-mono tracking-wider block text-stone-500 dark:text-stone-400">
                Bookmarked
              </span>
              <span className="text-lg font-bold font-mono tabular-nums text-stone-900 dark:text-white">
                {bookmarkedIds.length}
              </span>
            </div>
          </div>
        </div>

        {/* 2. SERENE SEGMENTED TAB SELECTOR (Zero Arbitrary Pills, 44px Touch Targets) */}
        <div
          className={`flex flex-wrap items-center gap-1.5 p-1 rounded-xl border ${
            isBright
              ? 'bg-stone-100/70 border-stone-200'
              : 'bg-stone-900/60 border-stone-800'
          }`}
        >
          {[
            { id: 'explorer', label: 'Lexicon Explorer', icon: BookOpen },
            { id: 'flashcards', label: 'Flashcards', icon: Layers },
            { id: 'practice', label: 'Practice Arena', icon: HelpCircle },
            { id: 'builder', label: 'Sentence Builder', icon: Sparkles },
            { id: 'dialogue', label: 'Dialogue Studio', icon: MessageSquare },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as WordsLearnerTab)}
                className={`min-h-11 flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer select-none ${
                  isActive
                    ? isBright
                      ? 'bg-white text-stone-950 font-bold shadow-xs'
                      : 'bg-stone-800 text-stone-100 font-bold shadow-xs'
                    : isBright
                    ? 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-white/[0.04]'
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isActive
                      ? isBright
                        ? 'text-amber-800'
                        : 'text-amber-400'
                      : 'opacity-60'
                  }`}
                />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* VIEW TAB 1: LEXICON EXPLORER (Serene Split Dossier, Grid, or List) */}
      {/* ========================================================================= */}
      {activeTab === 'explorer' && (
        <section className="space-y-6">
          {/* Streamlined Search & Filter Row (Cognitive Load Cap <= 4 Controls) */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search vocabulary in English, Nepali (पानी), or Magar (Jhorle, Mik)..."
                className={`w-full min-h-11 border rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm transition-colors focus:outline-none ${
                  isBright
                    ? 'bg-white border-stone-200 text-stone-900 placeholder:text-stone-400 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 shadow-xs'
                    : 'bg-stone-900/60 border-stone-800 text-stone-100 placeholder:text-stone-500 focus:border-stone-400 focus:ring-1 focus:ring-stone-400'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Dropdowns and View Controls */}
            <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
              {/* Category Dropdown */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                aria-label="Filter by Category"
                className={`flex-1 min-w-[9rem] sm:flex-none min-h-11 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer focus:outline-none ${
                  isBright
                    ? 'bg-white border-stone-200 text-stone-800 shadow-xs'
                    : 'bg-stone-900/60 border-stone-800 text-stone-200'
                }`}
              >
                <option value="all">
                  All Categories ({WIKIBOOKS_MAGAR_VOCABULARY.length})
                </option>
                {categories
                  .filter((c) => c.id !== 'all')
                  .map((c) => {
                    const count = WIKIBOOKS_MAGAR_VOCABULARY.filter(
                      (w) => w.category === c.id
                    ).length;
                    return (
                      <option key={c.id} value={c.id}>
                        {c.label} ({count})
                      </option>
                    );
                  })}
              </select>

              {/* Part of Speech Dropdown */}
              <select
                value={selectedPos}
                onChange={(e) => setSelectedPos(e.target.value)}
                aria-label="Filter by Part of Speech"
                className={`flex-1 min-w-[9rem] sm:flex-none min-h-11 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer focus:outline-none ${
                  isBright
                    ? 'bg-white border-stone-200 text-stone-800 shadow-xs'
                    : 'bg-stone-900/60 border-stone-800 text-stone-200'
                }`}
              >
                <option value="all">All Word Types</option>
                {partsOfSpeech
                  .filter((p) => p.id !== 'all')
                  .map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.label}
                    </option>
                  ))}
              </select>

              {/* View Switcher */}
              <div
                className={`flex items-center gap-1 p-1 rounded-xl border ${
                  isBright
                    ? 'bg-stone-100/80 border-stone-200'
                    : 'bg-stone-900/60 border-stone-800'
                }`}
              >
                <button
                  onClick={() => setViewMode('split')}
                  className={`min-h-[36px] px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    viewMode === 'split'
                      ? isBright
                        ? 'bg-white text-stone-900 shadow-xs font-bold'
                        : 'bg-stone-800 text-white font-bold'
                      : 'text-stone-500 hover:text-stone-800 dark:hover:text-white'
                  }`}
                  title="Split View (Word Dossier)"
                >
                  <Columns className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`min-h-[36px] px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    viewMode === 'grid'
                      ? isBright
                        ? 'bg-white text-stone-900 shadow-xs font-bold'
                        : 'bg-stone-800 text-white font-bold'
                      : 'text-stone-500 hover:text-stone-800 dark:hover:text-white'
                  }`}
                  title="Cards Grid"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`min-h-[36px] px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                    viewMode === 'list'
                      ? isBright
                        ? 'bg-white text-stone-900 shadow-xs font-bold'
                        : 'bg-stone-800 text-white font-bold'
                      : 'text-stone-500 hover:text-stone-800 dark:hover:text-white'
                  }`}
                  title="Compact List"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Results Summary Info Line */}
          <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 px-1">
            <span>
              Displaying {filteredWords.length} of {WIKIBOOKS_MAGAR_VOCABULARY.length} terms
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-amber-800 dark:text-amber-400 hover:underline cursor-pointer"
              >
                Clear Search Filter
              </button>
            )}
          </div>

          {/* SPLIT VIEW (Primary Scholarly Layout - Serene & Uncrowded) */}
          {viewMode === 'split' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Scannable Word Stream */}
              <div className="lg:col-span-7 space-y-3 max-h-[680px] overflow-y-auto pr-1">
                {filteredWords.length === 0 ? (
                  <div
                    className={`p-12 text-center rounded-2xl border ${
                      isBright
                        ? 'bg-stone-50/80 border-stone-200 text-stone-600'
                        : 'bg-stone-900/60 border-stone-800 text-stone-400'
                    }`}
                  >
                    <BookOpen className="w-8 h-8 mx-auto mb-3 opacity-40" />
                    <p className="font-semibold text-sm">No vocabulary entries found</p>
                    <p className="text-xs mt-1 text-stone-500">
                      Try searching another term in English, Nepali, or Magar.
                    </p>
                  </div>
                ) : (
                  filteredWords.map((item) => {
                    const isSelected = selectedWord.id === item.id;
                    const isMastered = masteredIds.includes(item.id);
                    const isBookmarked = bookmarkedIds.includes(item.id);

                    return (
                      <div
                        key={item.id}
                        onClick={() => setSelectedWord(item)}
                        className={`min-h-[56px] p-4 rounded-xl border transition-all cursor-pointer flex flex-wrap items-center justify-between gap-x-4 gap-y-2 select-none active:scale-[0.99] ${
                          isSelected
                            ? isBright
                              ? 'bg-white border-amber-300 ring-2 ring-amber-400/40 text-stone-900 shadow-sm'
                              : 'bg-stone-900/80 border-amber-500/40 ring-2 ring-amber-400/30 text-white shadow-md'
                            : isBright
                            ? 'bg-white hover:bg-stone-50 border-stone-200 text-stone-800 shadow-xs'
                            : 'bg-stone-900/50 hover:bg-stone-800/80 border-stone-800 text-stone-300'
                        }`}
                      >
                        <div className="flex-1 min-w-[12rem]">
                          {/* Unboxed Metadata (Zero-Pill Discipline) */}
                          <div className="text-[11px] font-mono text-stone-500 dark:text-stone-400 mb-1">
                            {formatVocabWordMetadata(item)}
                            {isMastered && (
                              <span className="ml-2 font-semibold text-emerald-600 dark:text-emerald-400">
                                · Mastered ✓
                              </span>
                            )}
                          </div>

                          {/* Primary English Term */}
                          <h3 className="text-base font-bold truncate text-stone-900 dark:text-white">
                            {item.english}
                          </h3>

                          {/* Romanized Magar + Devanagari Translation */}
                          <div className="flex flex-wrap items-baseline gap-x-2 text-xs mt-0.5">
                            <span className="font-mono font-medium text-stone-700 dark:text-stone-200">
                              {item.magarRoman}
                            </span>
                            <span className="font-devanagari text-stone-500 dark:text-stone-400">
                              · {item.nepali}
                            </span>
                          </div>
                        </div>

                        {/* Akkha Script Glyph & Action */}
                        <div className="text-right shrink-0 flex items-center gap-3 max-sm:w-full max-sm:justify-between">
                          <span className="font-akkha text-2xl sm:text-3xl font-bold text-amber-700 dark:text-amber-400">
                            {item.magarAkkha}
                          </span>
                          <button
                            onClick={(e) => handleToggleBookmark(item.id, e)}
                            aria-label={`Bookmark ${item.english}`}
                            className="min-h-11 min-w-11 flex items-center justify-center rounded-lg transition-colors text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
                          >
                            {isBookmarked ? (
                              <BookmarkCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                            ) : (
                              <Bookmark className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Right Column: Sticky Hero Word Dossier */}
              <div className="lg:col-span-5 sticky top-24">
                <div
                  className={`p-6 rounded-2xl border transition-colors ${
                    isBright
                      ? 'bg-stone-50/80 border-stone-200 text-stone-900 shadow-xs'
                      : 'bg-stone-900/60 border-stone-800 text-stone-100 shadow-xl'
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between gap-2 mb-5 pb-3 border-b border-stone-200 dark:border-stone-800">
                    <div className="text-xs font-mono uppercase tracking-wider text-amber-800 dark:text-amber-400 font-semibold">
                      {formatUnboxedMetadata([
                        'Word Dossier',
                        selectedWord.category,
                        selectedWord.partOfSpeech,
                      ])}
                    </div>
                    <button
                      onClick={(e) => handleToggleBookmark(selectedWord.id, e)}
                      aria-label="Bookmark word in dossier"
                      className={`min-h-11 min-w-11 flex items-center justify-center rounded-xl transition-colors cursor-pointer ${
                        isBright
                          ? 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 shadow-xs'
                          : 'bg-stone-950 hover:bg-stone-800 text-stone-300 border border-stone-800'
                      }`}
                    >
                      {bookmarkedIds.includes(selectedWord.id) ? (
                        <BookmarkCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  {/* Monumental Akkha Lipi Display Block */}
                  <div
                    className={`text-center py-7 px-4 rounded-xl mb-5 border ${
                      isBright
                        ? 'bg-white border-stone-200 text-stone-900 shadow-xs'
                        : 'bg-stone-950 border-stone-800 text-stone-100'
                    }`}
                  >
                    <div className="font-akkha text-5xl sm:text-6xl font-bold tracking-wider mb-2 text-amber-700 dark:text-amber-400">
                      {selectedWord.magarAkkha}
                    </div>
                    <div className="font-devanagari text-xl font-bold text-stone-800 dark:text-stone-200">
                      {selectedWord.magarDeva}
                    </div>
                    <div className="text-xs font-mono mt-1 text-stone-500 dark:text-stone-400">
                      /{selectedWord.phonetic}/
                    </div>
                  </div>

                  {/* Linguistic Meanings & Translations */}
                  <div className="space-y-4 mb-6 text-left">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-mono text-stone-500 dark:text-stone-400 block mb-0.5">
                        English Meaning
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold leading-snug text-stone-900 dark:text-white">
                        {selectedWord.english}
                      </h2>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-mono text-stone-500 dark:text-stone-400 block mb-0.5">
                        Nepali Translation (नेपाली अर्थ)
                      </span>
                      <p className="text-base font-devanagari font-medium text-stone-700 dark:text-stone-300">
                        {selectedWord.nepali}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-mono text-stone-500 dark:text-stone-400 block mb-0.5">
                        Romanized Magar Dhut
                      </span>
                      <p className="text-base font-mono font-bold text-stone-900 dark:text-white">
                        {selectedWord.magarRoman}
                      </p>
                    </div>

                    {selectedWord.literalBreakdown && (
                      <div
                        className={`p-3.5 rounded-xl text-xs ${
                          isBright
                            ? 'bg-stone-100 text-stone-700 border border-stone-200/60'
                            : 'bg-stone-950 text-stone-300 border border-stone-800'
                        }`}
                      >
                        <span className="font-bold text-[10px] uppercase font-mono block mb-1 text-amber-800 dark:text-amber-400">
                          Etymology &amp; Breakdown:
                        </span>
                        {selectedWord.literalBreakdown}
                      </div>
                    )}

                    {selectedWord.exampleSentence && (
                      <div
                        className={`p-4 rounded-xl text-xs space-y-2 border ${
                          isBright
                            ? 'bg-stone-100/70 border-stone-200'
                            : 'bg-stone-950 border-stone-800'
                        }`}
                      >
                        <span className="font-bold text-[10px] uppercase font-mono block text-stone-500 dark:text-stone-400">
                          Conversational Example:
                        </span>
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-stone-900 dark:text-white">
                            {selectedWord.exampleSentence.magar} ({selectedWord.exampleSentence.deva})
                          </span>
                          <span className="font-akkha text-lg font-bold text-amber-700 dark:text-amber-400">
                            {selectedWord.exampleSentence.akkha}
                          </span>
                        </div>
                        <p className="text-xs italic text-stone-600 dark:text-stone-400">
                          "{selectedWord.exampleSentence.english}" · {selectedWord.exampleSentence.nepali}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Primary Mastery Action Button */}
                  <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
                    <button
                      onClick={(e) => handleToggleMastered(selectedWord.id, e)}
                      className={`w-full min-h-11 px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer shadow-xs ${
                        masteredIds.includes(selectedWord.id)
                          ? 'bg-emerald-600 text-white'
                          : isBright
                          ? 'bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300'
                          : 'bg-stone-100 text-stone-900 hover:bg-white'
                      }`}
                    >
                      <Check className="w-4 h-4" />
                      <span>
                        {masteredIds.includes(selectedWord.id)
                          ? 'Mastered ✓ (+20 XP Earned)'
                          : 'Mark as Mastered (+20 XP)'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* GRID VIEW (Serene Stone Cards) */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[640px] overflow-y-auto pr-1">
              {filteredWords.map((item) => {
                const isSelected = selectedWord.id === item.id;
                const isMastered = masteredIds.includes(item.id);
                const isBookmarked = bookmarkedIds.includes(item.id);

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedWord(item)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between select-none active:scale-[0.99] ${
                      isSelected
                        ? isBright
                          ? 'bg-white border-amber-300 ring-2 ring-amber-400/40 shadow-sm'
                          : 'bg-stone-900/80 border-amber-500/40 ring-2 ring-amber-400/30 text-white shadow-md'
                        : isBright
                        ? 'bg-white hover:bg-stone-50 border-stone-200 text-stone-800 shadow-xs'
                        : 'bg-stone-900/50 hover:bg-stone-800/80 border-stone-800 text-stone-300'
                    }`}
                  >
                    <div>
                      {/* Top Metadata */}
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400">
                          {formatVocabWordMetadata(item)}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => handleToggleBookmark(item.id, e)}
                            aria-label={`Bookmark ${item.english}`}
                            className="p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
                          >
                            {isBookmarked ? (
                              <BookmarkCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                            ) : (
                              <Bookmark className="w-3.5 h-3.5" />
                            )}
                          </button>
                          {isMastered && (
                            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                              ✓
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Main English & Nepali */}
                      <h4 className="text-lg font-bold text-stone-900 dark:text-white leading-tight">
                        {item.english}
                      </h4>
                      <p className="text-xs text-stone-500 dark:text-stone-400 font-devanagari mt-0.5">
                        {item.nepali}
                      </p>
                    </div>

                    {/* Magar Dhut & Akkha Scripts */}
                    <div className="mt-4 pt-3 border-t border-stone-200 dark:border-stone-800 flex items-end justify-between gap-2">
                      <div>
                        <div className="font-mono text-sm font-bold text-stone-900 dark:text-white">
                          {item.magarRoman}
                        </div>
                        <div className="text-xs text-stone-500 dark:text-stone-400 font-devanagari">
                          {item.magarDeva}
                        </div>
                      </div>
                      <span className="font-akkha text-2xl font-bold text-amber-700 dark:text-amber-400">
                        {item.magarAkkha}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* LIST VIEW (Serene Tabular Presentation) */}
          {viewMode === 'list' && (
            <div
              className={`rounded-2xl border overflow-hidden ${
                isBright
                  ? 'bg-white border-stone-200 shadow-xs'
                  : 'bg-stone-900/60 border-stone-800'
              }`}
            >
              <div className="max-h-[600px] overflow-y-auto">
                <table className="w-full text-left text-xs">
                  <thead
                    className={`sticky top-0 z-10 border-b uppercase font-mono text-[10px] ${
                      isBright
                        ? 'bg-stone-50 border-stone-200 text-stone-500'
                        : 'bg-stone-950 border-stone-800 text-stone-400'
                    }`}
                  >
                    <tr>
                      <th className="p-3.5">English Translation</th>
                      <th className="p-3.5">Nepali Meaning</th>
                      <th className="p-3.5">Magar Dhut</th>
                      <th className="p-3.5">Devanagari</th>
                      <th className="p-3.5">Akkha Lipi</th>
                      <th className="p-3.5 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody
                    className={`divide-y ${
                      isBright ? 'divide-stone-100' : 'divide-stone-800/80'
                    }`}
                  >
                    {filteredWords.map((item) => {
                      const isSelected = selectedWord.id === item.id;
                      const isMastered = masteredIds.includes(item.id);

                      return (
                        <tr
                          key={item.id}
                          onClick={() => setSelectedWord(item)}
                          className={`cursor-pointer transition-colors ${
                            isSelected
                              ? isBright
                                ? 'bg-amber-50/60 font-medium'
                                : 'bg-stone-800/80 font-medium'
                              : isBright
                              ? 'hover:bg-stone-50'
                              : 'hover:bg-stone-800/40'
                          }`}
                        >
                          <td className="p-3.5 font-bold text-stone-900 dark:text-white">
                            {item.english}
                          </td>
                          <td className="p-3.5 text-stone-500 dark:text-stone-400 font-devanagari">
                            {item.nepali}
                          </td>
                          <td className="p-3.5 font-mono text-stone-800 dark:text-stone-200">
                            {item.magarRoman}
                          </td>
                          <td className="p-3.5 text-stone-600 dark:text-stone-400 font-devanagari">
                            {item.magarDeva}
                          </td>
                          <td className="p-3.5 font-akkha text-xl font-bold text-amber-700 dark:text-amber-400">
                            {item.magarAkkha}
                          </td>
                          <td className="p-3.5 text-center">
                            <button
                              onClick={(e) => handleToggleMastered(item.id, e)}
                              className={`text-[10px] px-2.5 py-1 rounded-md font-semibold transition-colors ${
                                isMastered
                                  ? 'bg-emerald-600 text-white'
                                  : isBright
                                  ? 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                                  : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
                              }`}
                            >
                              {isMastered ? 'Mastered' : 'Learn'}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      )}

      {/* ========================================================================= */}
      {/* VIEW TAB 2: FLASHCARDS (Serene Card Flip) */}
      {/* ========================================================================= */}
      {activeTab === 'flashcards' && (
        <section className="space-y-6 max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
            <span>
              Card {flashcardIndex + 1} of {WIKIBOOKS_MAGAR_VOCABULARY.length}
            </span>
            <span className="font-bold text-stone-700 dark:text-stone-300">
              Mastered: {masteredIds.length} / {WIKIBOOKS_MAGAR_VOCABULARY.length}
            </span>
          </div>

          {/* Flashcard Box with Flip Animation */}
          {(() => {
            const card = WIKIBOOKS_MAGAR_VOCABULARY[flashcardIndex];
            return (
              <div
                onClick={() => setIsFlipped((prev) => !prev)}
                className={`min-h-[300px] border rounded-3xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all select-none relative ${
                  isBright
                    ? 'bg-white hover:bg-stone-50 border-stone-200 text-stone-900 shadow-sm'
                    : 'bg-stone-900/60 hover:bg-stone-900 border-stone-800 text-stone-100 shadow-xl'
                }`}
              >
                <div className="text-[10px] text-stone-400 uppercase tracking-widest font-mono mb-4">
                  {isFlipped
                    ? 'Magar Dhut Solution (समाधान)'
                    : 'Prompt (Click or Tap to Flip)'}
                </div>

                {!isFlipped ? (
                  <div className="space-y-3">
                    <h2 className="text-3xl sm:text-4xl font-heading font-black text-stone-900 dark:text-white">
                      {card.english}
                    </h2>
                    <p className="text-lg text-stone-500 dark:text-stone-400 font-devanagari font-medium">
                      {card.nepali}
                    </p>
                    <p className="text-xs text-stone-400 font-mono">
                      {formatVocabWordMetadata(card)}
                    </p>
                    <p className="text-[11px] text-stone-500 pt-3">
                      Tap anywhere to reveal Akkha Lipi &amp; Magar word ↻
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="text-5xl font-bold font-akkha text-amber-700 dark:text-amber-400">
                      {card.magarAkkha}
                    </div>
                    <div className="text-2xl font-bold text-stone-900 dark:text-white font-devanagari">
                      {card.magarDeva}
                    </div>
                    <div className="text-xl font-mono text-stone-800 dark:text-stone-200 font-bold">
                      {card.magarRoman}
                    </div>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      Phonetic: <span className="font-mono">/{card.phonetic}/</span>
                    </p>
                    {card.literalBreakdown && (
                      <p
                        className={`text-xs p-3 rounded-xl max-w-md ${
                          isBright
                            ? 'bg-stone-100 text-stone-700'
                            : 'bg-stone-950 text-stone-300 border border-stone-800'
                        }`}
                      >
                        {card.literalBreakdown}
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })()}

          {/* Flashcard Controls (44px min-touch) */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                setIsFlipped(false);
                setFlashcardIndex(
                  (prev) =>
                    (prev - 1 + WIKIBOOKS_MAGAR_VOCABULARY.length) %
                    WIKIBOOKS_MAGAR_VOCABULARY.length
                );
              }}
              className={`min-h-11 px-5 py-2.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                isBright
                  ? 'bg-white hover:bg-stone-100 border-stone-200 text-stone-700 shadow-xs'
                  : 'bg-stone-900 hover:bg-stone-800 border-stone-800 text-stone-300'
              }`}
            >
              ← Previous
            </button>

            <button
              onClick={() => {
                const card = WIKIBOOKS_MAGAR_VOCABULARY[flashcardIndex];
                handleToggleMastered(card.id);
              }}
              className={`min-h-11 px-5 py-2.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-2 cursor-pointer shadow-xs ${
                masteredIds.includes(WIKIBOOKS_MAGAR_VOCABULARY[flashcardIndex].id)
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : isBright
                  ? 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-300'
                  : 'bg-stone-100 text-stone-900 border-stone-100 hover:bg-white'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {masteredIds.includes(WIKIBOOKS_MAGAR_VOCABULARY[flashcardIndex].id)
                  ? 'Mastered ✓'
                  : 'Mark Mastered (+20 XP)'}
              </span>
            </button>

            <button
              onClick={() => {
                setIsFlipped(false);
                setFlashcardIndex(
                  (prev) => (prev + 1) % WIKIBOOKS_MAGAR_VOCABULARY.length
                );
              }}
              className={`min-h-11 px-5 py-2.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                isBright
                  ? 'bg-white hover:bg-stone-100 border-stone-200 text-stone-700 shadow-xs'
                  : 'bg-stone-900 hover:bg-stone-800 border-stone-800 text-stone-300'
              }`}
            >
              Next →
            </button>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* VIEW TAB 3: PRACTICE ARENA (MCQ, Script Quiz, Word Match) */}
      {/* ========================================================================= */}
      {activeTab === 'practice' && (
        <section className="space-y-6 max-w-2xl mx-auto">
          {/* Mode Sub-Navigation */}
          <div
            className={`flex items-center justify-center gap-1.5 p-1 rounded-xl border ${
              isBright
                ? 'bg-stone-100 border-stone-200'
                : 'bg-stone-900/60 border-stone-800'
            }`}
          >
            {[
              { id: 'mcq', label: 'Multiple Choice' },
              { id: 'script', label: 'Akkha Script Quiz' },
              { id: 'match', label: 'Word Match Matrix' },
            ].map((m) => {
              const isActive = practiceMode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setPracticeMode(m.id as PracticeMode)}
                  className={`min-h-11 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? isBright
                        ? 'bg-white text-stone-900 shadow-xs'
                        : 'bg-stone-800 text-white shadow-xs'
                      : 'text-stone-500 hover:text-stone-800 dark:hover:text-white'
                  }`}
                >
                  {m.label}
                </button>
              );
            })}
          </div>

          {/* MCQ & SCRIPT MODES */}
          {(practiceMode === 'mcq' || practiceMode === 'script') && (
            <div
              className={`border rounded-2xl p-6 sm:p-8 space-y-6 ${
                isBright
                  ? 'bg-white border-stone-200 text-stone-900 shadow-xs'
                  : 'bg-stone-900/60 border-stone-800 text-stone-100 shadow-xl'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                <span>
                  Question {currentQuizIndex + 1} •{' '}
                  {practiceMode === 'mcq'
                    ? 'Vocabulary Translation'
                    : 'Akkha Script Recognition'}
                </span>
                <span className="font-mono font-bold text-amber-700 dark:text-amber-400">
                  Score: {quizScore.correct} / {quizScore.total}
                </span>
              </div>

              {/* Question Banner */}
              <div className="text-center py-6 border-y border-stone-200 dark:border-stone-800 space-y-2">
                {practiceMode === 'mcq' ? (
                  <>
                    <span className="text-xs text-stone-500 dark:text-stone-400">
                      What is the Magar Dhut word for:
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-heading font-black text-stone-900 dark:text-white">
                      "{currentQuizWord.english}"
                    </h2>
                    <p className="text-sm text-stone-500 dark:text-stone-400 font-devanagari">
                      (नेपाली: {currentQuizWord.nepali})
                    </p>
                  </>
                ) : (
                  <>
                    <span className="text-xs text-stone-500 dark:text-stone-400">
                      Identify the correct Akkha Lipi for:
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-heading font-black text-stone-900 dark:text-white">
                      "{currentQuizWord.magarRoman}"
                    </h2>
                    <p className="text-sm text-stone-500 dark:text-stone-400 font-devanagari">
                      ({currentQuizWord.nepali} · {currentQuizWord.english})
                    </p>
                  </>
                )}
              </div>

              {/* 4 Choices */}
              <div
                role="radiogroup"
                aria-label="Quiz answer choices"
                className="grid grid-cols-1 sm:grid-cols-2 gap-3"
              >
                {quizOptions.map((opt, idx) => {
                  const isChosen = selectedOption === idx;
                  const isCorrect = opt.id === currentQuizWord.id;

                  let cardStyle = isBright
                    ? 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-900'
                    : 'bg-stone-950 hover:bg-stone-800 border-stone-800 text-stone-100';

                  if (isQuizAnswered) {
                    if (isCorrect) {
                      cardStyle = isBright
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold ring-1 ring-emerald-400'
                        : 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-bold';
                    } else if (isChosen) {
                      cardStyle = isBright
                        ? 'bg-rose-50 border-rose-300 text-rose-900'
                        : 'bg-rose-950/40 border-rose-800 text-rose-300';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      role="radio"
                      aria-checked={isChosen}
                      onClick={() => handleAnswerQuiz(idx, opt)}
                      disabled={isQuizAnswered}
                      className={`min-h-[56px] p-4 rounded-xl border transition-all text-left flex flex-col justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-stone-400 ${cardStyle}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-base">{opt.magarRoman}</span>
                        <span className="font-akkha text-2xl text-amber-700 dark:text-amber-400 font-bold">
                          {opt.magarAkkha}
                        </span>
                      </div>
                      <div className="text-xs text-stone-500 dark:text-stone-400 font-devanagari mt-1">
                        {opt.magarDeva}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Next Question / Feedback Bar */}
              {isQuizAnswered && (
                <div className="flex items-center justify-between pt-4 border-t border-stone-200 dark:border-stone-800">
                  <div className="text-xs">
                    {selectedOption !== null &&
                    quizOptions[selectedOption]?.id === currentQuizWord.id ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                        ✓ Correct! (+20 XP, +1 Mundri)
                      </span>
                    ) : (
                      <span className="text-stone-500 dark:text-stone-400">
                        Answer:{' '}
                        <strong className="text-stone-900 dark:text-white">
                          {currentQuizWord.magarRoman}
                        </strong>{' '}
                        ({currentQuizWord.magarDeva})
                      </span>
                    )}
                  </div>

                  <button
                    onClick={handleNextQuiz}
                    className={`min-h-11 px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
                      isBright
                        ? 'bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300'
                        : 'bg-stone-100 text-stone-900 hover:bg-white'
                    }`}
                  >
                    <span>Next Word</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* WORD MATCH MATRIX */}
          {practiceMode === 'match' && (
            <div
              className={`border rounded-2xl p-6 sm:p-8 space-y-6 ${
                isBright
                  ? 'bg-white border-stone-200 text-stone-900 shadow-xs'
                  : 'bg-stone-900/60 border-stone-800 text-stone-100 shadow-xl'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                <span>Pair Magar Dhut with English / Nepali Meaning</span>
                <button
                  onClick={initializeWordMatch}
                  className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300 hover:underline cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Shuffle Pairs</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Left Column (Magar Dhut) */}
                <div className="space-y-2.5">
                  <span className="text-[10px] text-stone-500 dark:text-stone-400 uppercase font-mono block text-center">
                    Magar Dhut Word
                  </span>
                  {matchPairs.map(({ left }) => {
                    const isMatched = matchedIds.includes(left.id);
                    const isSelected = selectedLeft === left.id;
                    return (
                      <button
                        key={left.id}
                        disabled={isMatched}
                        onClick={() => handleMatchSelect('left', left.id)}
                        className={`w-full min-h-[50px] p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isMatched
                            ? 'opacity-40 bg-stone-100 dark:bg-stone-950 border-stone-200 dark:border-stone-800 text-stone-400 line-through'
                            : isSelected
                            ? isBright
                              ? 'bg-amber-50 border-amber-400 text-stone-950 ring-1 ring-amber-400 font-bold'
                              : 'bg-stone-800 border-amber-400 text-amber-300 ring-1 ring-amber-400 font-bold'
                            : isBright
                            ? 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-900'
                            : 'bg-stone-950 hover:bg-stone-800 border-stone-800 text-stone-200'
                        }`}
                      >
                        <div className="font-bold text-sm">{left.magarRoman}</div>
                        <div className="font-akkha text-xs text-amber-700 dark:text-amber-400">
                          {left.magarAkkha}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Right Column (English / Nepali) */}
                <div className="space-y-2.5">
                  <span className="text-[10px] text-stone-500 dark:text-stone-400 uppercase font-mono block text-center">
                    Meaning (English / नेपाली)
                  </span>
                  {matchPairs.map(({ right }) => {
                    const isMatched = matchedIds.includes(right.id);
                    const isSelected = selectedRight === right.id;
                    return (
                      <button
                        key={right.id}
                        disabled={isMatched}
                        onClick={() => handleMatchSelect('right', right.id)}
                        className={`w-full min-h-[50px] p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isMatched
                            ? 'opacity-40 bg-stone-100 dark:bg-stone-950 border-stone-200 dark:border-stone-800 text-stone-400 line-through'
                            : isSelected
                            ? isBright
                              ? 'bg-amber-50 border-amber-400 text-stone-950 ring-1 ring-amber-400 font-bold'
                              : 'bg-stone-800 border-amber-400 text-amber-300 ring-1 ring-amber-400 font-bold'
                            : isBright
                            ? 'bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-900'
                            : 'bg-stone-950 hover:bg-stone-800 border-stone-800 text-stone-200'
                        }`}
                      >
                        <div className="font-bold text-sm">{right.english}</div>
                        <div className="font-devanagari text-xs text-stone-500 dark:text-stone-400">
                          {right.nepali}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {matchedIds.length === matchPairs.length && matchPairs.length > 0 && (
                <div
                  className={`border rounded-xl p-5 text-center space-y-2 ${
                    isBright
                      ? 'bg-stone-50 border-stone-200 text-stone-900'
                      : 'bg-stone-950 border-stone-800 text-stone-100'
                  }`}
                >
                  <p className="font-bold text-sm">
                    🎉 Outstanding! All 5 word pairs successfully matched! (+75 XP)
                  </p>
                  <button
                    onClick={initializeWordMatch}
                    className={`min-h-11 px-5 py-2 rounded-lg text-xs font-bold cursor-pointer ${
                      isBright
                        ? 'bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300'
                        : 'bg-stone-100 text-stone-900 hover:bg-white'
                    }`}
                  >
                    Play Another Round
                  </button>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {/* ========================================================================= */}
      {/* VIEW TAB 4: SENTENCE BUILDER */}
      {/* ========================================================================= */}
      {activeTab === 'builder' && (
        <section className="space-y-6 max-w-2xl mx-auto">
          <div
            className={`border rounded-2xl p-6 sm:p-8 space-y-5 ${
              isBright
                ? 'bg-white border-stone-200 text-stone-900 shadow-xs'
                : 'bg-stone-900/60 border-stone-800 text-stone-100 shadow-xl'
            }`}
          >
            <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
              <span className="font-mono font-bold uppercase tracking-wider">
                Puzzle {puzzleIndex + 1} of {sentencePuzzles.length}
              </span>
              <span>Translate English into Magar Syntax Order</span>
            </div>

            {/* Target Sentence */}
            <div className="text-center py-4 border-y border-stone-200 dark:border-stone-800 space-y-1">
              <span className="text-xs text-stone-500 dark:text-stone-400 block">
                Target Sentence:
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-black text-stone-900 dark:text-white">
                "{currentPuzzle.targetEnglish}"
              </h2>
              <p className="text-sm text-stone-500 dark:text-stone-400 font-devanagari">
                ({currentPuzzle.targetNepali})
              </p>
            </div>

            {/* Assembled Slot */}
            <div
              className={`min-h-[64px] border border-dashed rounded-xl p-3.5 flex flex-wrap items-center justify-center gap-2 ${
                isBright
                  ? 'bg-stone-50 border-stone-300'
                  : 'bg-stone-950 border-stone-800'
              }`}
            >
              {userSelectedWords.length === 0 ? (
                <span className="text-xs text-stone-400 italic">
                  Tap word tiles below in the correct Magar grammatical order...
                </span>
              ) : (
                userSelectedWords.map((w, idx) => (
                  <span
                    key={idx}
                    className={`px-3.5 py-1.5 rounded-lg border font-bold font-mono text-sm shadow-xs ${
                      isBright
                        ? 'bg-white border-stone-300 text-stone-900'
                        : 'bg-stone-800 border-stone-700 text-white'
                    }`}
                  >
                    {w}
                  </span>
                ))
              )}
            </div>

            {/* Success State */}
            {puzzleSolved && (
              <div
                className={`border rounded-xl p-5 text-center space-y-2 ${
                  isBright
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : 'bg-emerald-950/40 border-emerald-800 text-emerald-100'
                }`}
              >
                <div className="flex items-center justify-center gap-2 font-bold text-sm">
                  <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Correct Translation! (+30 XP, +2 Mundri)</span>
                </div>
                <div className="text-3xl font-bold font-akkha text-amber-700 dark:text-amber-400">
                  {currentPuzzle.akkha}
                </div>
                <div className="text-base font-semibold font-devanagari">
                  {currentPuzzle.deva}
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-300">
                  {currentPuzzle.explanation}
                </p>
              </div>
            )}

            {/* Scrambled Word Choices */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] text-stone-500 dark:text-stone-400 block text-center">
                Available Word Tiles:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {currentPuzzle.scrambled.map((word, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectWordInPuzzle(word)}
                    disabled={puzzleSolved}
                    className={`min-h-11 px-4 py-2 rounded-xl font-mono text-xs font-bold border transition-all active:scale-95 disabled:opacity-50 cursor-pointer ${
                      isBright
                        ? 'bg-stone-100 hover:bg-stone-200 border-stone-200 text-stone-900'
                        : 'bg-stone-800 hover:bg-stone-700 border-stone-700 text-white'
                    }`}
                  >
                    {word}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleResetPuzzle}
                className={`min-h-11 flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                  isBright
                    ? 'bg-white hover:bg-stone-100 border-stone-200 text-stone-700'
                    : 'bg-stone-900 hover:bg-stone-800 border-stone-800 text-stone-300'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>

              <button
                onClick={handleNextPuzzle}
                className={`min-h-11 flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs ${
                  isBright
                    ? 'bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300'
                    : 'bg-stone-100 hover:bg-white text-stone-900'
                }`}
              >
                <span>Next Puzzle</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* VIEW TAB 5: DIALOGUE STUDIO */}
      {/* ========================================================================= */}
      {activeTab === 'dialogue' && (
        <section className="space-y-4 max-w-2xl mx-auto">
          <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 border-b border-stone-200 dark:border-stone-800 pb-3">
            <span>Authentic Magar Dialogue (कुराकानी र संवाद)</span>
            <span className="font-mono font-semibold">Dawa &amp; Tara Scenario</span>
          </div>

          <div className="space-y-4">
            {WIKIBOOKS_CONVERSATION_SAMPLE.map((conv) => {
              const isSpeakerA = conv.speaker === 'Speaker A';
              return (
                <div
                  key={conv.id}
                  className={`p-5 rounded-2xl border transition-all ${
                    isSpeakerA
                      ? isBright
                        ? 'bg-stone-50/90 border-stone-200 mr-6 sm:mr-10'
                        : 'bg-stone-900/60 border-stone-800 mr-6 sm:mr-10'
                      : isBright
                      ? 'bg-amber-50/50 border-amber-200/80 ml-6 sm:ml-10'
                      : 'bg-stone-900/90 border-amber-500/20 ml-6 sm:ml-10'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-mono font-bold uppercase text-stone-500 dark:text-stone-400">
                      {conv.avatarRole}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="text-base font-bold text-stone-900 dark:text-white">
                      {conv.magar}
                    </div>
                    <div className="text-xs text-stone-500 dark:text-stone-400 font-devanagari">
                      {conv.nepali}
                    </div>
                    <div className="text-2xl font-bold font-akkha text-amber-700 dark:text-amber-400 pt-0.5">
                      {conv.akkha}
                    </div>
                    <div className="text-xs text-stone-700 dark:text-stone-300 italic pt-1">
                      "{conv.english}"
                    </div>
                    <p className="text-[10px] text-stone-500 dark:text-stone-400 font-mono pt-1">
                      {conv.breakdown}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
};
