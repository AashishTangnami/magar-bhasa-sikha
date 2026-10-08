import React, { useState, useMemo, useRef } from 'react';
import { VocabularyItem } from '../types';
import { DialectMatrixProps, ComparisonMode } from '../types/dialectMatrix';
import { DIALECT_CATEGORIES } from '../constants/dialectMatrix';
import { DIALECTS, COMPARATIVE_VOCABULARY } from '../data/dialectData';
import { useTheme } from '../context/ThemeContext';
import {
  Search,
  MapPin,
  Users,
  X,
  Columns,
  Table as TableIcon,
  Quote,
} from 'lucide-react';
import { formatUnboxedMetadata } from '../utils/perception-impeccable-harness';
import { matchSearchIndex } from '../utils/search-index';
import { DIALECT_SEARCH_INDEX } from '../utils/search-indexes';

export const DialectMatrix: React.FC<DialectMatrixProps> = ({
  activeDialect,
  onSelectDialect,
  className = '',
}) => {
  const { isBright } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedWord, setSelectedWord] = useState<VocabularyItem>(
    COMPARATIVE_VOCABULARY[0]
  );
  const [comparisonMode, setComparisonMode] = useState<ComparisonMode>('matrix');

  // Filtered vocabulary list: search hits from the prebuilt index into a reusable per-instance mask
  const searchMaskRef = useRef<Uint8Array>(new Uint8Array(COMPARATIVE_VOCABULARY.length));
  const filteredVocab = useMemo(() => {
    const mask = searchMaskRef.current;
    matchSearchIndex(DIALECT_SEARCH_INDEX, searchQuery, mask);
    return COMPARATIVE_VOCABULARY.filter(
      (item, i) => mask[i] === 1 && (selectedCategory === 'all' || item.category === selectedCategory)
    );
  }, [selectedCategory, searchQuery]);

  const activeDialectInfo = DIALECTS[activeDialect];

  return (
    <div
      id="dialect-hub-matrix"
      className={`space-y-8 pb-16 transition-all ${className}`}
    >
      {/* 1. L1 COGNITIVE ANCHOR: SCHOLARLY & EDITORIAL HEADER */}
      <section className="space-y-4 pt-2">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-stone-200 dark:border-stone-800">
          <div className="space-y-2 max-w-2xl">
            {/* Authentic Cultural Kicker (Clean Unboxed Typography) */}
            <div className="text-xs font-mono tracking-wider uppercase text-amber-800 dark:text-amber-400 font-semibold">
              {formatUnboxedMetadata([
                'मगर भाषा त्रयी अनुसन्धान',
                'Living Magarat Linguistic Tapestry',
                'Dhut · Kham · Kaike',
              ])}
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-black tracking-tight text-stone-900 dark:text-stone-100">
              Dialect Hub: Dhut, Kham &amp; Kaike
            </h1>
            <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed max-w-xl">
              The Magar linguistic continuum spans from the Gandaki river basin slopes to the high alpine highlands of Rolpa and Rukum, and the sacred deity valley of Dolpa. Compare vocabulary, phonetics, and Akkha Lipi side-by-side in real time.
            </p>
          </div>

          {/* Minimalist Tabular Stats Dossier */}
          <div
            className={`flex flex-wrap items-center gap-x-6 gap-y-3 px-5 py-3 rounded-2xl border shrink-0 ${
              isBright
                ? 'bg-stone-50/80 border-stone-200 text-stone-800'
                : 'bg-stone-900/60 border-stone-800 text-stone-200'
            }`}
          >
            <div className="text-left">
              <span className="text-[10px] uppercase font-mono tracking-wider block text-stone-500 dark:text-stone-400">
                Dialects
              </span>
              <span className="text-lg font-bold font-mono tabular-nums text-stone-900 dark:text-white">
                3 Living
              </span>
            </div>
            <div className="hidden sm:block h-8 w-px bg-stone-200 dark:bg-stone-800" />
            <div className="text-left">
              <span className="text-[10px] uppercase font-mono tracking-wider block text-stone-500 dark:text-stone-400">
                Comparative Corridors
              </span>
              <span className="text-lg font-bold font-mono tabular-nums text-amber-700 dark:text-amber-400">
                {COMPARATIVE_VOCABULARY.length} Concepts
              </span>
            </div>
            <div className="hidden sm:block h-8 w-px bg-stone-200 dark:bg-stone-800" />
            <div className="text-left">
              <span className="text-[10px] uppercase font-mono tracking-wider block text-stone-500 dark:text-stone-400">
                Speakers
              </span>
              <span className="text-lg font-bold font-mono tabular-nums text-stone-900 dark:text-white">
                ~1.1M+
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE TRIO PROFILE CARDS (Stone Palette & Zero Clutter) */}
      <section className="space-y-3">
        <div className="text-xs font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 font-semibold px-1">
          Select Primary Dialect Focus
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {Object.values(DIALECTS).map((d) => {
            const isActive = activeDialect === d.id;
            return (
              <div
                key={d.id}
                id={`dialect-card-${d.id}`}
                onClick={() => onSelectDialect(d.id)}
                className={`relative p-5 rounded-2xl cursor-pointer transition-all duration-200 border flex flex-col justify-between select-none active:scale-[0.99] min-h-11 ${
                  isActive
                    ? isBright
                      ? 'bg-white border-amber-300 ring-2 ring-amber-400/40 text-stone-900 shadow-sm'
                      : 'bg-stone-900/80 border-amber-500/40 ring-2 ring-amber-400/30 text-white shadow-md'
                    : isBright
                    ? 'bg-stone-50/80 hover:bg-white border-stone-200 text-stone-800 shadow-xs'
                    : 'bg-stone-900/50 hover:bg-stone-800/80 border-stone-800 text-stone-300'
                }`}
              >
                <div>
                  {/* Card Header & Custom Icon */}
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${
                        isActive
                          ? isBright
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : 'bg-stone-950 text-amber-400 border-stone-700'
                          : isBright
                          ? 'bg-white text-stone-700 border-stone-200 shadow-xs'
                          : 'bg-stone-950 text-stone-400 border-stone-800'
                      }`}
                    >
                      {d.iconType === 'river' && (
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M2 12c3-3 6-3 9 0s6 3 9 0 4-2 4-2" />
                          <path d="M2 17c3-3 6-3 9 0s6 3 9 0 4-2 4-2" opacity="0.6" />
                        </svg>
                      )}
                      {d.iconType === 'mountain' && (
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                        </svg>
                      )}
                      {d.iconType === 'sun' && (
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="4" />
                          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                        </svg>
                      )}
                    </div>

                    {isActive ? (
                      <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-800 dark:text-amber-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600 dark:bg-amber-400 animate-pulse" />
                        <span>Active Focus</span>
                      </span>
                    ) : (
                      <span className="text-[11px] text-stone-400 dark:text-stone-500">
                        Click to Focus
                      </span>
                    )}
                  </div>

                  {/* Title & Native Title */}
                  <h3 className="text-xl font-heading font-black text-stone-900 dark:text-white">
                    {d.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-semibold text-amber-800 dark:text-amber-400">
                      {d.nativeName}
                    </span>
                    <span className="text-xs text-stone-400 dark:text-stone-500">
                      · {d.symbolName}
                    </span>
                  </div>

                  {/* Region & Speaker Meta */}
                  <div className="mt-3.5 space-y-1.5 text-xs text-stone-600 dark:text-stone-400">
                    <div className="flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-2 leading-relaxed">{d.region}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span className="font-mono">{d.speakerCountEstimate} Speakers</span>
                    </div>
                  </div>

                  {/* Cultural Note Quote */}
                  <p className="mt-3 text-xs line-clamp-2 text-stone-500 dark:text-stone-400 leading-relaxed italic">
                    "{d.culturalNote}"
                  </p>
                </div>

                {/* Greeting Footer */}
                <div className="mt-4 pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs">
                  <span className="text-stone-400 dark:text-stone-500 font-mono text-[11px]">
                    Traditional Greeting:
                  </span>
                  <div className="text-right">
                    <span className="font-bold text-stone-900 dark:text-white block">
                      {d.greeting}
                    </span>
                    <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400">
                      /{d.greetingPhonetic}/
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. STREAMLINED UNIFIED TOOLBAR (Cognitive Load Cap <= 4) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search concepts in English, Dhut, Kham, Kaike, or Devanagari..."
              className={`w-full min-h-11 border rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm transition-colors focus:outline-none ${
                isBright
                  ? 'bg-white border-stone-200 text-stone-900 placeholder:text-stone-400 focus:border-stone-900 focus:ring-1 focus:ring-stone-900 shadow-xs'
                  : 'bg-stone-900/60 border-stone-800 text-stone-100 placeholder:text-stone-500 focus:border-stone-400 focus:ring-1 focus:ring-stone-400'
              }`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                aria-label="Clear dialect search query"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors cursor-pointer"
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
              aria-label="Filter by Dialect Category"
              className={`flex-1 min-w-[9rem] sm:flex-none min-h-11 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer focus:outline-none ${
                isBright
                  ? 'bg-white border-stone-200 text-stone-800 shadow-xs'
                  : 'bg-stone-900/60 border-stone-800 text-stone-200'
              }`}
            >
              {DIALECT_CATEGORIES.map((c) => {
                const count =
                  c.id === 'all'
                    ? COMPARATIVE_VOCABULARY.length
                    : COMPARATIVE_VOCABULARY.filter((w) => w.category === c.id).length;
                return (
                  <option key={c.id} value={c.id}>
                    {c.label} ({count})
                  </option>
                );
              })}
            </select>

            {/* View Mode Switcher */}
            <div
              className={`flex items-center gap-1 p-1 rounded-xl border ${
                isBright
                  ? 'bg-stone-100/80 border-stone-200'
                  : 'bg-stone-900/60 border-stone-800'
              }`}
            >
              <button
                onClick={() => setComparisonMode('matrix')}
                className={`min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  comparisonMode === 'matrix'
                    ? isBright
                      ? 'bg-white text-stone-900 shadow-xs font-bold'
                      : 'bg-stone-800 text-white font-bold'
                    : 'text-stone-500 hover:text-stone-800 dark:hover:text-white'
                }`}
                title="Matrix Table View"
              >
                <TableIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Matrix Table</span>
              </button>

              <button
                onClick={() => setComparisonMode('cards')}
                className={`min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  comparisonMode === 'cards'
                    ? isBright
                      ? 'bg-white text-stone-900 shadow-xs font-bold'
                      : 'bg-stone-800 text-white font-bold'
                    : 'text-stone-500 hover:text-stone-800 dark:hover:text-white'
                }`}
                title="Comparative Cards View"
              >
                <Columns className="w-4 h-4" />
                <span className="hidden sm:inline">Trio Cards</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results summary info line */}
        <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 px-1">
          <span>
            Displaying {filteredVocab.length} of {COMPARATIVE_VOCABULARY.length} comparative concepts
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
      </section>

      {/* 4. INTERACTIVE HERO SPOTLIGHT / SELECTED WORD DOSSIER */}
      {selectedWord && (
        <section
          className={`p-6 rounded-2xl border transition-colors ${
            isBright
              ? 'bg-stone-50/80 border-stone-200 text-stone-900 shadow-xs'
              : 'bg-stone-900/60 border-stone-800 text-stone-100 shadow-xl'
          }`}
        >
          {/* Spotlight Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-5 border-b border-stone-200 dark:border-stone-800">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-800 dark:text-amber-400 font-semibold block">
                {formatUnboxedMetadata([
                  'Selected Word Spotlight',
                  selectedWord.category.toUpperCase(),
                  'All 3 Dialects',
                ])}
              </span>
              <h2 className="text-2xl font-bold text-stone-900 dark:text-white">
                {selectedWord.english}
              </h2>
            </div>
            {selectedWord.culturalContext && (
              <div className="flex items-start gap-2 max-w-md text-xs italic text-stone-600 dark:text-stone-400">
                <Quote className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
                <span>{selectedWord.culturalContext}</span>
              </div>
            )}
          </div>

          {/* Tri-Column Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 1. Dhut */}
            <div
              className={`p-5 rounded-xl border transition-colors ${
                isBright
                  ? 'bg-white border-stone-200 text-stone-900 shadow-xs'
                  : 'bg-stone-950 border-stone-800 text-stone-100'
              }`}
            >
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="font-semibold text-stone-700 dark:text-stone-300">
                  🌊 Magar Dhut
                </span>
                <span className="text-[10px] font-mono text-stone-400">
                  Gandaki Basin
                </span>
              </div>
              <div className="font-mono text-xl font-bold text-stone-900 dark:text-white">
                {selectedWord.dhut.word}
              </div>
              <div className="font-devanagari text-sm font-medium text-stone-600 dark:text-stone-400 mt-0.5">
                {selectedWord.dhut.deva}
              </div>
              <div className="text-xs font-mono text-stone-500 dark:text-stone-400 mt-1">
                /{selectedWord.dhut.phonetic}/
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <span className="text-[10px] uppercase font-mono text-stone-400">
                  Akkha Lipi
                </span>
                <span className="font-akkha text-2xl font-bold text-amber-700 dark:text-amber-400">
                  {selectedWord.dhut.akkha}
                </span>
              </div>
            </div>

            {/* 2. Kham */}
            <div
              className={`p-5 rounded-xl border transition-colors ${
                isBright
                  ? 'bg-white border-stone-200 text-stone-900 shadow-xs'
                  : 'bg-stone-950 border-stone-800 text-stone-100'
              }`}
            >
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="font-semibold text-stone-700 dark:text-stone-300">
                  🏔️ Kham Magar
                </span>
                <span className="text-[10px] font-mono text-stone-400">
                  High Alpine
                </span>
              </div>
              <div className="font-mono text-xl font-bold text-stone-900 dark:text-white">
                {selectedWord.kham.word}
              </div>
              <div className="font-devanagari text-sm font-medium text-stone-600 dark:text-stone-400 mt-0.5">
                {selectedWord.kham.deva}
              </div>
              <div className="text-xs font-mono text-stone-500 dark:text-stone-400 mt-1">
                /{selectedWord.kham.phonetic}/
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <span className="text-[10px] uppercase font-mono text-stone-400">
                  Akkha Lipi
                </span>
                <span className="font-akkha text-2xl font-bold text-amber-700 dark:text-amber-400">
                  {selectedWord.kham.akkha}
                </span>
              </div>
            </div>

            {/* 3. Kaike */}
            <div
              className={`p-5 rounded-xl border transition-colors ${
                isBright
                  ? 'bg-white border-stone-200 text-stone-900 shadow-xs'
                  : 'bg-stone-950 border-stone-800 text-stone-100'
              }`}
            >
              <div className="flex items-center justify-between mb-3 text-xs">
                <span className="font-semibold text-stone-700 dark:text-stone-300">
                  ☀️ Kaike
                </span>
                <span className="text-[10px] font-mono text-stone-400">
                  Dolpa Deities
                </span>
              </div>
              <div className="font-mono text-xl font-bold text-stone-900 dark:text-white">
                {selectedWord.kaike.word}
              </div>
              <div className="font-devanagari text-sm font-medium text-stone-600 dark:text-stone-400 mt-0.5">
                {selectedWord.kaike.deva}
              </div>
              <div className="text-xs font-mono text-stone-500 dark:text-stone-400 mt-1">
                /{selectedWord.kaike.phonetic}/
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <span className="text-[10px] uppercase font-mono text-stone-400">
                  Akkha Lipi
                </span>
                <span className="font-akkha text-2xl font-bold text-amber-700 dark:text-amber-400">
                  {selectedWord.kaike.akkha}
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. VIEW MODE A: MATRIX TABLE VIEW (Serene & Uncrowded) */}
      {comparisonMode === 'matrix' && (
        <div
          className={`border rounded-2xl overflow-hidden transition-colors ${
            isBright
              ? 'bg-white border-stone-200 shadow-xs'
              : 'bg-stone-900/60 border-stone-800 shadow-xl'
          }`}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr
                  className={`border-b uppercase font-mono text-[10px] tracking-wider ${
                    isBright
                      ? 'bg-stone-50 border-stone-200 text-stone-500'
                      : 'bg-stone-950 border-stone-800 text-stone-400'
                  }`}
                >
                  <th className="p-4">English Concept</th>
                  <th className="p-4">
                    <span className="font-semibold text-stone-800 dark:text-stone-200">
                      🌊 Dhut (Gandaki Basin)
                    </span>
                  </th>
                  <th className="p-4">
                    <span className="font-semibold text-stone-800 dark:text-stone-200">
                      🏔️ Kham (High Alpine)
                    </span>
                  </th>
                  <th className="p-4">
                    <span className="font-semibold text-stone-800 dark:text-stone-200">
                      ☀️ Kaike (Dolpa Deities)
                    </span>
                  </th>
                  <th className="p-4 text-right">Akkha Script</th>
                </tr>
              </thead>
              <tbody
                className={`divide-y ${
                  isBright ? 'divide-stone-100' : 'divide-stone-800/80'
                }`}
              >
                {filteredVocab.map((item) => {
                  const isSelected = selectedWord.id === item.id;
                  return (
                    <tr
                      key={item.id}
                      onClick={() => {
                        setSelectedWord(item);
                      }}
                      className={`cursor-pointer transition-colors select-none ${
                        isSelected
                          ? isBright
                            ? 'bg-amber-50/70 font-medium'
                            : 'bg-stone-800/90 font-medium'
                          : isBright
                          ? 'hover:bg-stone-50'
                          : 'hover:bg-stone-800/40'
                      }`}
                    >
                      {/* English Concept */}
                      <td className="p-4">
                        <div className="font-bold text-stone-900 dark:text-white text-sm">
                          {item.english}
                        </div>
                        {item.culturalContext && (
                          <div className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-1 mt-0.5">
                            {item.culturalContext}
                          </div>
                        )}
                      </td>

                      {/* Dhut */}
                      <td className="p-4">
                        <div className="font-mono font-bold text-stone-900 dark:text-white">
                          {item.dhut.word}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs mt-0.5">
                          <span className="font-devanagari text-stone-500 dark:text-stone-400">
                            {item.dhut.deva}
                          </span>
                          <span className="text-[10px] font-mono text-stone-400">
                            /{item.dhut.phonetic}/
                          </span>
                        </div>
                      </td>

                      {/* Kham */}
                      <td className="p-4">
                        <div className="font-mono font-bold text-stone-900 dark:text-white">
                          {item.kham.word}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs mt-0.5">
                          <span className="font-devanagari text-stone-500 dark:text-stone-400">
                            {item.kham.deva}
                          </span>
                          <span className="text-[10px] font-mono text-stone-400">
                            /{item.kham.phonetic}/
                          </span>
                        </div>
                      </td>

                      {/* Kaike */}
                      <td className="p-4">
                        <div className="font-mono font-bold text-stone-900 dark:text-white">
                          {item.kaike.word}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs mt-0.5">
                          <span className="font-devanagari text-stone-500 dark:text-stone-400">
                            {item.kaike.deva}
                          </span>
                          <span className="text-[10px] font-mono text-stone-400">
                            /{item.kaike.phonetic}/
                          </span>
                        </div>
                      </td>

                      {/* Akkha Lipi */}
                      <td className="p-4 text-right">
                        <span className="font-akkha text-2xl font-bold text-amber-700 dark:text-amber-400">
                          {item.dhut.akkha}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 6. VIEW MODE B: COMPARATIVE CARDS VIEW (Tri-Column Stone Dossiers) */}
      {comparisonMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredVocab.map((item) => {
            const isSelected = selectedWord.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedWord(item);
                }}
                className={`p-5 rounded-2xl border transition-all cursor-pointer select-none active:scale-[0.99] flex flex-col justify-between ${
                  isSelected
                    ? isBright
                      ? 'bg-white border-amber-300 ring-2 ring-amber-400/40 shadow-sm'
                      : 'bg-stone-900/80 border-amber-500/40 ring-2 ring-amber-400/30 text-white shadow-md'
                    : isBright
                    ? 'bg-stone-50/80 hover:bg-white border-stone-200 text-stone-800 shadow-xs'
                    : 'bg-stone-900/50 hover:bg-stone-800/80 border-stone-800 text-stone-300'
                }`}
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 dark:text-amber-400 font-semibold block">
                        {item.category}
                      </span>
                      <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                        {item.english}
                      </h3>
                    </div>
                    <span className="font-akkha text-2xl font-bold text-amber-700 dark:text-amber-400 shrink-0">
                      {item.dhut.akkha}
                    </span>
                  </div>

                  {item.culturalContext && (
                    <p className="text-xs text-stone-500 dark:text-stone-400 italic mb-4 leading-relaxed">
                      "{item.culturalContext}"
                    </p>
                  )}

                  {/* 3 Dialects Comparison Grid */}
                  <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-stone-200 dark:border-stone-800 text-left">
                    {/* Dhut */}
                    <div
                      className={`p-2.5 rounded-lg border ${
                        isBright
                          ? 'bg-white border-stone-200'
                          : 'bg-stone-950 border-stone-800'
                      }`}
                    >
                      <span className="text-[9px] uppercase font-mono block text-stone-400 mb-1">
                        🌊 Dhut
                      </span>
                      <div className="font-mono text-xs font-bold text-stone-900 dark:text-white truncate">
                        {item.dhut.word}
                      </div>
                      <div className="text-[10px] text-stone-500 dark:text-stone-400 font-devanagari truncate">
                        {item.dhut.deva}
                      </div>
                    </div>

                    {/* Kham */}
                    <div
                      className={`p-2.5 rounded-lg border ${
                        isBright
                          ? 'bg-white border-stone-200'
                          : 'bg-stone-950 border-stone-800'
                      }`}
                    >
                      <span className="text-[9px] uppercase font-mono block text-stone-400 mb-1">
                        🏔️ Kham
                      </span>
                      <div className="font-mono text-xs font-bold text-stone-900 dark:text-white truncate">
                        {item.kham.word}
                      </div>
                      <div className="text-[10px] text-stone-500 dark:text-stone-400 font-devanagari truncate">
                        {item.kham.deva}
                      </div>
                    </div>

                    {/* Kaike */}
                    <div
                      className={`p-2.5 rounded-lg border ${
                        isBright
                          ? 'bg-white border-stone-200'
                          : 'bg-stone-950 border-stone-800'
                      }`}
                    >
                      <span className="text-[9px] uppercase font-mono block text-stone-400 mb-1">
                        ☀️ Kaike
                      </span>
                      <div className="font-mono text-xs font-bold text-stone-900 dark:text-white truncate">
                        {item.kaike.word}
                      </div>
                      <div className="text-[10px] text-stone-500 dark:text-stone-400 font-devanagari truncate">
                        {item.kaike.deva}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 flex items-center justify-between text-[11px] text-stone-400 dark:text-stone-500">
                  <span>Click to view detailed spotlight</span>
                  <span className="font-mono">
                    /{item.dhut.phonetic}/
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
