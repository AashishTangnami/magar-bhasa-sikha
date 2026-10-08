import React, { useState } from 'react';
import { FolkloreStory } from '../types';
import { FOLKLORE_STORIES } from '../data/folkloreData';
import {
  DANCE_HERITAGE,
  MAGARAT_HISTORY,
  FESTIVAL_HERITAGE,
  ATTIRE_HERITAGE,
  INSTRUMENT_HERITAGE,
  CULINARY_HERITAGE,
  DanceHeritageItem,
  HistoryItem,
  FestivalItem,
} from '../data/heritageData';
import { useTheme } from '../context/ThemeContext';
import {
  CulturalManuscriptProps,
  HeritageTab,
  AttireFilter,
} from '../types/culturalManuscript';
import {
  HERITAGE_TABS,
  ATTIRE_FILTERS,
} from '../constants/culturalManuscript';
import {
  Music,
  ScrollText,
  Landmark,
  Sparkles,
  Info,
  Layers,
  Flame,
  Crown,
  Heart,
  Utensils,
  Calendar,
  CheckCircle2,
} from 'lucide-react';

const HERITAGE_TAB_ICONS: Record<HeritageTab, typeof Music> = {
  dances: Music,
  history: Landmark,
  festivals: Calendar,
  attire: Crown,
  instruments: Flame,
  culinary: Utensils,
  manuscript: ScrollText,
};

export const CulturalManuscript: React.FC<CulturalManuscriptProps> = ({
  className = '',
}) => {
  const { isBright } = useTheme();

  // Active top-level category tab
  const [activeHeritageTab, setActiveHeritageTab] = useState<HeritageTab>('dances');

  // Selected items inside sub-sections
  const [selectedDance, setSelectedDance] = useState<DanceHeritageItem>(DANCE_HERITAGE[0]);
  const [selectedHistory, setSelectedHistory] = useState<HistoryItem>(MAGARAT_HISTORY[0]);
  const [selectedFestival, setSelectedFestival] = useState<FestivalItem>(FESTIVAL_HERITAGE[0]);
  const [attireFilter, setAttireFilter] = useState<AttireFilter>('all');
  const [selectedStory, setSelectedStory] = useState<FolkloreStory>(FOLKLORE_STORIES[0]);
  const [activeVerseIndex, setActiveVerseIndex] = useState<number>(0);

  // Filtered Attire Items
  const filteredAttire = ATTIRE_HERITAGE.filter((item) => {
    if (attireFilter === 'all') return true;
    if (attireFilter === 'men') return item.genderCategory === 'men';
    if (attireFilter === 'women') return item.genderCategory === 'women';
    if (attireFilter === 'jewelry') return item.genderCategory === 'jewelry';
    return true;
  });

  return (
    <div
      id="magar-heritage-portal"
      className={`rounded-2xl border transition-all duration-200 p-5 md:p-7 shadow-xl space-y-6 ${
        isBright
          ? 'bg-stone-50/80 border-stone-200 text-stone-900 shadow-stone-200/50'
          : 'bg-stone-950/70 border-stone-800 text-stone-100'
      } ${className}`}
    >
      {/* Heritage Portal Header Banner */}
      <div
        className={`flex flex-col lg:flex-row lg:items-center justify-between gap-5 border-b pb-6 ${
          isBright ? 'border-stone-200' : 'border-stone-800'
        }`}
      >
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="text-amber-800 dark:text-amber-400 font-semibold tracking-wide">
              मगर मौलिक सम्पदा र संस्कृति
            </span>
            <span className="text-stone-300 dark:text-stone-700">·</span>
            <span className="text-stone-500 dark:text-stone-400">
              Living Treasury of Magarat Heritage
            </span>
            <span className="text-stone-300 dark:text-stone-700">·</span>
            <span className="text-stone-500 dark:text-stone-400">
              Authenticated Archives
            </span>
          </div>

          <h2
            className={`text-2xl md:text-3xl font-heading font-black tracking-tight ${
              isBright ? 'text-stone-900' : 'text-stone-100'
            }`}
          >
            Magar Heritage & Cultural Treasury
          </h2>

          <p
            className={`text-xs md:text-sm max-w-3xl leading-relaxed ${
              isBright ? 'text-stone-600' : 'text-stone-400'
            }`}
          >
            Explore authentic Magar folk dances (Kauda, Sorathi, Maruni, Salaijo, Bhume, Ghatu),
            historical kingdoms of Barha & Athara Magarat, ancestral clan traditions, sacred seasonal
            festivals, ceremonial regalia, Madal acoustics, and ancient oral epics inscribed in Akkha Lipi.
          </p>
        </div>

        {/* Traditional Greeting Cultural Anchor */}
        <div
          className={`flex items-center gap-3.5 px-4 py-3 rounded-xl border shrink-0 ${
            isBright
              ? 'bg-amber-50/70 border-amber-200/80 text-amber-950'
              : 'bg-amber-950/30 border-amber-800/40 text-amber-200'
          }`}
        >
          <div className="w-10 h-10 rounded-lg border bg-amber-50 border-amber-200 text-amber-800 dark:bg-stone-950 dark:border-stone-800 dark:text-amber-400 flex items-center justify-center font-bold text-xl font-heading shadow-xs">
            𑀅
          </div>
          <div>
            <span className="text-[10px] uppercase font-mono block opacity-75">
              Magar Cultural Greeting
            </span>
            <span className="text-sm font-bold font-heading">
              Jhorle! (झोर्ले / <span className="font-akkha text-amber-700 dark:text-amber-400 font-semibold">𑀛𑁄𑀭𑁆𑀮𑁂</span>)
            </span>
          </div>
        </div>
      </div>

      {/* Main Heritage Category Navigation Tabs */}
      <div
        className={`flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl border ${
          isBright ? 'bg-stone-100/90 border-stone-200' : 'bg-stone-900/90 border-stone-800'
        }`}
      >
        {HERITAGE_TABS.map((tab) => {
          const Icon = HERITAGE_TAB_ICONS[tab.id];
          return (
            <button
              key={tab.id}
              onClick={() => setActiveHeritageTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all min-h-11 ${
                activeHeritageTab === tab.id
                  ? 'bg-white text-stone-950 font-bold shadow-xs dark:bg-stone-800 dark:text-stone-100'
                  : isBright
                  ? 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
                  : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800/60'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 1. FOLK DANCES SECTION (कौरा, सोरठी, मारुनी, सालैजो, भूमे, घाटु) */}
      {/* ========================================================================= */}
      {activeHeritageTab === 'dances' && (
        <div className="space-y-6">
          {/* Dance Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {DANCE_HERITAGE.map((dance) => {
              const isSelected = dance.id === selectedDance.id;
              return (
                <button
                  key={dance.id}
                  onClick={() => setSelectedDance(dance)}
                  className={`p-3.5 rounded-xl text-left transition-all border min-h-11 ${
                    isSelected
                      ? isBright
                        ? 'bg-white border-amber-600/80 shadow-md ring-1 ring-amber-600/20'
                        : 'bg-stone-900 border-amber-500/80 shadow-md ring-1 ring-amber-500/20'
                      : isBright
                      ? 'bg-white/70 border-stone-200 hover:border-stone-300 hover:bg-stone-100/50 text-stone-800'
                      : 'bg-stone-900/40 border-stone-800 hover:border-stone-700 hover:bg-stone-800/40 text-stone-200'
                  }`}
                >
                  <div className="text-[10px] uppercase font-mono text-stone-500 dark:text-stone-400 line-clamp-1">
                    {dance.originRegion.split(',')[0]}
                  </div>
                  <div className="text-xs font-bold font-heading mt-0.5 line-clamp-1 text-stone-900 dark:text-stone-100">
                    {dance.nameNepali}
                  </div>
                  <div className="text-[11px] font-akkha font-bold line-clamp-1 mt-0.5 text-amber-700 dark:text-amber-400">
                    {dance.nameAkkha}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Selected Dance Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Comprehensive Overview & Structure */}
            <div
              className={`lg:col-span-2 space-y-5 rounded-xl border p-5 md:p-6 ${
                isBright
                  ? 'bg-white/80 border-stone-200 shadow-xs'
                  : 'bg-stone-900/60 border-stone-800 shadow-xs'
              }`}
            >
              <div
                className={`flex flex-wrap items-start justify-between gap-3 border-b pb-4 ${
                  isBright ? 'border-stone-200' : 'border-stone-800'
                }`}
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                    <span className="font-semibold text-stone-800 dark:text-stone-200">
                      {selectedDance.historicalEra}
                    </span>
                    <span className="text-stone-300 dark:text-stone-700">·</span>
                    <span className="text-stone-500 dark:text-stone-400">
                      Origin: {selectedDance.originRegion}
                    </span>
                  </div>

                  <h3
                    className={`text-2xl md:text-3xl font-heading font-black mt-1.5 ${
                      isBright ? 'text-stone-900' : 'text-stone-100'
                    }`}
                  >
                    {selectedDance.nameNepali} ({selectedDance.name})
                  </h3>

                  <div className="font-heading font-akkha text-xl font-bold text-amber-700 dark:text-amber-400 mt-0.5">
                    {selectedDance.nameAkkha}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p
                className={`text-xs md:text-sm leading-relaxed ${
                  isBright ? 'text-stone-700' : 'text-stone-300'
                }`}
              >
                {selectedDance.description}
              </p>

              {/* Interactive Sample Bhaka Verse Card */}
              <div
                className={`rounded-xl border p-4 space-y-2.5 ${
                  isBright
                    ? 'border-amber-200 bg-amber-50/60 text-stone-900'
                    : 'border-amber-800/40 bg-amber-950/20 text-stone-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider font-mono text-amber-800 dark:text-amber-400">
                    Authentic Bhaka Verse (मौलिक भाका)
                  </span>
                </div>
                <div className="text-lg md:text-xl font-heading font-akkha font-bold tracking-wide text-amber-700 dark:text-amber-400">
                  {selectedDance.sampleBhakaVerse.akkha}
                </div>
                <div className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                  {selectedDance.sampleBhakaVerse.deva}
                </div>
                <div className="text-xs italic text-stone-600 dark:text-stone-400">
                  "{selectedDance.sampleBhakaVerse.english}"
                </div>
              </div>

              {/* Step-by-Step Choreography & Performance Stages */}
              <div className="space-y-3">
                <h4
                  className={`text-xs uppercase tracking-wider font-bold font-mono flex items-center gap-2 ${
                    isBright ? 'text-stone-800' : 'text-stone-200'
                  }`}
                >
                  <Layers className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                  <span>Performance Stages & Choreography (नृत्य चरणहरू)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedDance.performanceStructure.map((step, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border space-y-1 ${
                        isBright
                          ? 'border-stone-200 bg-white text-stone-800 shadow-xs'
                          : 'border-stone-800 bg-stone-900/40 text-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 text-xs font-bold font-mono text-stone-900 dark:text-stone-100">
                        <span className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
                          {idx + 1}
                        </span>
                        <span>Phase {idx + 1}</span>
                      </div>
                      <p className="text-xs leading-relaxed text-stone-600 dark:text-stone-400">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Attire, Instruments & Significance */}
            <div className="space-y-4">
              {/* Cultural Significance Card */}
              <div
                className={`rounded-xl border p-5 space-y-2 ${
                  isBright
                    ? 'bg-white/80 border-stone-200 text-stone-900'
                    : 'bg-stone-900/60 border-stone-800 text-stone-100'
                }`}
              >
                <h4 className="text-xs uppercase tracking-wider font-bold text-stone-900 dark:text-stone-100 font-mono flex items-center gap-2">
                  <Heart className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                  <span>Cultural Significance</span>
                </h4>
                <p className="text-xs leading-relaxed text-stone-600 dark:text-stone-400">
                  {selectedDance.culturalSignificance}
                </p>
              </div>

              {/* Accompanying Instruments */}
              <div
                className={`rounded-xl border p-5 space-y-3 ${
                  isBright
                    ? 'bg-white/80 border-stone-200 text-stone-900'
                    : 'bg-stone-900/60 border-stone-800 text-stone-100'
                }`}
              >
                <h4 className="text-xs uppercase tracking-wider font-bold text-stone-900 dark:text-stone-100 font-mono flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                  <span>Instruments Used (बाजागाजा)</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDance.instrumentsUsed.map((inst, idx) => (
                    <span
                      key={idx}
                      className={`text-xs font-medium px-2.5 py-1 rounded-lg border ${
                        isBright
                          ? 'border-stone-200 bg-stone-100 text-stone-800'
                          : 'border-stone-700 bg-stone-800 text-stone-200'
                      }`}
                    >
                      {inst}
                    </span>
                  ))}
                </div>
              </div>

              {/* Costumes & Ornaments */}
              <div
                className={`rounded-xl border p-5 space-y-2 ${
                  isBright
                    ? 'bg-white/80 border-stone-200 text-stone-900'
                    : 'bg-stone-900/60 border-stone-800 text-stone-100'
                }`}
              >
                <h4 className="text-xs uppercase tracking-wider font-bold text-stone-900 dark:text-stone-100 font-mono flex items-center gap-2">
                  <Crown className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                  <span>Costumes & Ornaments (भेषभूषा)</span>
                </h4>
                <p className="text-xs leading-relaxed text-stone-600 dark:text-stone-400">
                  {selectedDance.attireDescription}
                </p>
              </div>

              {/* Associated Festivals */}
              <div
                className={`rounded-xl border p-5 space-y-2 ${
                  isBright
                    ? 'bg-white/80 border-stone-200 text-stone-900'
                    : 'bg-stone-900/60 border-stone-800 text-stone-100'
                }`}
              >
                <h4 className="text-xs uppercase tracking-wider font-bold text-stone-900 dark:text-stone-100 font-mono flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                  <span>Celebrated During</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDance.associatedFestivals.map((fest, idx) => (
                    <span
                      key={idx}
                      className={`text-xs font-medium px-2.5 py-1 rounded-lg border ${
                        isBright
                          ? 'border-stone-200 bg-stone-100 text-stone-800'
                          : 'border-stone-700 bg-stone-800 text-stone-200'
                      }`}
                    >
                      {fest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. KINGDOMS & HISTORY SECTION (१२ र १८ मगरात, थर, लिपि) */}
      {/* ========================================================================= */}
      {activeHeritageTab === 'history' && (
        <div className="space-y-6">
          {/* History Nav Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {MAGARAT_HISTORY.map((item) => {
              const isSelected = item.id === selectedHistory.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedHistory(item)}
                  className={`p-4 rounded-xl text-left transition-all border min-h-11 ${
                    isSelected
                      ? isBright
                        ? 'bg-white border-amber-600/80 shadow-md ring-1 ring-amber-600/20'
                        : 'bg-stone-900 border-amber-500/80 shadow-md ring-1 ring-amber-500/20'
                      : isBright
                      ? 'bg-white/70 border-stone-200 hover:border-stone-300 hover:bg-stone-100/50 text-stone-800'
                      : 'bg-stone-900/40 border-stone-800 hover:border-stone-700 hover:bg-stone-800/40 text-stone-200'
                  }`}
                >
                  <div className="text-[10px] uppercase font-mono text-stone-500 dark:text-stone-400">
                    {item.era}
                  </div>
                  <div className="text-sm font-bold font-heading mt-0.5 text-stone-900 dark:text-stone-100">
                    {item.titleNepali}
                  </div>
                  <div className="text-xs line-clamp-1 mt-0.5 text-stone-600 dark:text-stone-400">
                    {item.title}
                  </div>
                </button>
              );
            })}
          </div>

          {/* History Card Detail */}
          <div
            className={`rounded-xl border p-5 md:p-6 space-y-6 ${
              isBright
                ? 'bg-white/80 border-stone-200 text-stone-900 shadow-xs'
                : 'bg-stone-900/60 border-stone-800 text-stone-100 shadow-xs'
            }`}
          >
            <div
              className={`flex flex-wrap items-start justify-between gap-3 border-b pb-4 ${
                isBright ? 'border-stone-200' : 'border-stone-800'
              }`}
            >
              <div>
                <span className="text-xs font-mono uppercase font-semibold text-amber-800 dark:text-amber-400">
                  {selectedHistory.region} · {selectedHistory.era}
                </span>
                <h3
                  className={`text-2xl md:text-3xl font-heading font-black mt-1 ${
                    isBright ? 'text-stone-900' : 'text-stone-100'
                  }`}
                >
                  {selectedHistory.titleNepali} — {selectedHistory.title}
                </h3>
              </div>
            </div>

            <p
              className={`text-sm leading-relaxed ${
                isBright ? 'text-stone-700' : 'text-stone-300'
              }`}
            >
              {selectedHistory.summary}
            </p>

            {/* Key Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {selectedHistory.keyHighlights.map((hl, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border space-y-1 ${
                    isBright
                      ? 'border-stone-200 bg-stone-50 text-stone-900'
                      : 'border-stone-800 bg-stone-900/40 text-stone-100'
                  }`}
                >
                  <span className="text-[10px] uppercase font-mono block text-stone-500 dark:text-stone-400">
                    {hl.label}
                  </span>
                  <span className="text-xs font-bold block text-stone-900 dark:text-stone-100">
                    {hl.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Detailed Historical Narratives */}
            <div className="space-y-3">
              <h4
                className={`text-xs uppercase tracking-wider font-bold font-mono ${
                  isBright ? 'text-stone-800' : 'text-stone-200'
                }`}
              >
                Key Historical Chronicle
              </h4>
              <div className="space-y-2">
                {selectedHistory.details.map((detail, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border ${
                      isBright
                        ? 'border-stone-200 bg-stone-50/60'
                        : 'border-stone-800 bg-stone-900/30'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
                    <p
                      className={`text-xs md:text-sm leading-relaxed ${
                        isBright ? 'text-stone-700' : 'text-stone-300'
                      }`}
                    >
                      {detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. FESTIVALS SECTION (माघे सङ्क्रान्ति, भूमे पूजा, चण्डी पूर्णिमा) */}
      {/* ========================================================================= */}
      {activeHeritageTab === 'festivals' && (
        <div className="space-y-6">
          {/* Festival Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {FESTIVAL_HERITAGE.map((fest) => {
              const isSelected = fest.id === selectedFestival.id;
              return (
                <button
                  key={fest.id}
                  onClick={() => setSelectedFestival(fest)}
                  className={`p-4 rounded-xl text-left transition-all border min-h-11 ${
                    isSelected
                      ? isBright
                        ? 'bg-white border-amber-600/80 shadow-md ring-1 ring-amber-600/20'
                        : 'bg-stone-900 border-amber-500/80 shadow-md ring-1 ring-amber-500/20'
                      : isBright
                      ? 'bg-white/70 border-stone-200 hover:border-stone-300 hover:bg-stone-100/50 text-stone-800'
                      : 'bg-stone-900/40 border-stone-800 hover:border-stone-700 hover:bg-stone-800/40 text-stone-200'
                  }`}
                >
                  <div className="text-[10px] uppercase font-mono text-stone-500 dark:text-stone-400">
                    {fest.monthTiming}
                  </div>
                  <div className="text-sm font-bold font-heading mt-0.5 text-stone-900 dark:text-stone-100">
                    {fest.nameNepali}
                  </div>
                  <div className="text-xs font-akkha mt-0.5 text-amber-700 dark:text-amber-400">
                    {fest.nameAkkha}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Festival Detail Card */}
          <div
            className={`rounded-xl border p-5 md:p-6 space-y-6 ${
              isBright
                ? 'bg-white/80 border-stone-200 text-stone-900 shadow-xs'
                : 'bg-stone-900/60 border-stone-800 text-stone-100 shadow-xs'
            }`}
          >
            <div
              className={`border-b pb-4 space-y-1 ${
                isBright ? 'border-stone-200' : 'border-stone-800'
              }`}
            >
              <div className="text-xs font-mono uppercase text-stone-500 dark:text-stone-400">
                {selectedFestival.monthTiming}
              </div>
              <h3
                className={`text-2xl md:text-3xl font-heading font-black ${
                  isBright ? 'text-stone-900' : 'text-stone-100'
                }`}
              >
                {selectedFestival.nameNepali} ({selectedFestival.name})
              </h3>
              <div className="font-heading font-akkha text-xl font-bold text-amber-700 dark:text-amber-400">
                {selectedFestival.nameAkkha}
              </div>
            </div>

            <p
              className={`text-sm leading-relaxed ${
                isBright ? 'text-stone-700' : 'text-stone-300'
              }`}
            >
              {selectedFestival.significance}
            </p>

            {/* Sacred Rituals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className={`p-4 rounded-xl border space-y-3 ${
                  isBright
                    ? 'border-stone-200 bg-stone-50/70 text-stone-800'
                    : 'border-stone-800 bg-stone-900/40 text-stone-200'
                }`}
              >
                <h4 className="text-xs uppercase font-bold text-stone-900 dark:text-stone-100 font-mono flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                  <span>Sacred Rituals & Procedures (धार्मिक विधि)</span>
                </h4>
                <ul className="space-y-2">
                  {selectedFestival.rituals.map((r, idx) => (
                    <li key={idx} className="text-xs flex items-start gap-2">
                      <span className="text-amber-700 dark:text-amber-400 font-bold">•</span>
                      <span className={isBright ? 'text-stone-700' : 'text-stone-300'}>
                        {r}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className={`p-4 rounded-xl border space-y-3 ${
                  isBright
                    ? 'border-stone-200 bg-stone-50/70 text-stone-800'
                    : 'border-stone-800 bg-stone-900/40 text-stone-200'
                }`}
              >
                <h4 className="text-xs uppercase font-bold text-stone-900 dark:text-stone-100 font-mono flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                  <span>Special Delicacies & Feast (विशेष परिकार)</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedFestival.specialFoods.map((food, idx) => (
                    <span
                      key={idx}
                      className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${
                        isBright
                          ? 'border-stone-200 bg-white text-stone-800'
                          : 'border-stone-700 bg-stone-800 text-stone-200'
                      }`}
                    >
                      {food}
                    </span>
                  ))}
                </div>

                <div
                  className={`pt-2.5 border-t ${
                    isBright ? 'border-stone-200' : 'border-stone-800'
                  }`}
                >
                  <span className="text-[10px] uppercase font-mono block text-stone-500 dark:text-stone-400">
                    Associated Dances
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {selectedFestival.associatedDances.map((d, idx) => (
                      <span
                        key={idx}
                        className={`text-xs px-2 py-0.5 rounded border ${
                          isBright
                            ? 'bg-stone-100 border-stone-200 text-stone-800'
                            : 'bg-stone-800 border-stone-700 text-stone-200'
                        }`}
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Ecological Wisdom Note */}
            <div
              className={`p-4 rounded-xl border flex items-start gap-3 ${
                isBright
                  ? 'border-stone-200 bg-stone-50 text-stone-800'
                  : 'border-stone-800 bg-stone-900/40 text-stone-200'
              }`}
            >
              <Info className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span
                  className={`text-xs font-bold block ${
                    isBright ? 'text-stone-900' : 'text-stone-100'
                  }`}
                >
                  Ecological & Cultural Philosophy
                </span>
                <p
                  className={`text-xs mt-0.5 leading-relaxed ${
                    isBright ? 'text-stone-600' : 'text-stone-400'
                  }`}
                >
                  {selectedFestival.culturalWisdom}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. ATTIRE & JEWELRY SECTION (भाङ्ग्रा, घालेक, कण्ठ, सिरबन्दी) */}
      {/* ========================================================================= */}
      {activeHeritageTab === 'attire' && (
        <div className="space-y-6">
          {/* Gender / Category Filter Tabs */}
          <div
            className={`flex items-center gap-2 border-b pb-3 ${
              isBright ? 'border-stone-200' : 'border-stone-800'
            }`}
          >
            <span
              className={`text-xs font-mono uppercase mr-2 ${
                isBright ? 'text-stone-500' : 'text-stone-400'
              }`}
            >
              Filter:
            </span>
            {ATTIRE_FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setAttireFilter(f.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all min-h-[36px] ${
                  attireFilter === f.id
                    ? 'bg-amber-50 text-stone-950 font-bold ring-1 ring-amber-400/60 dark:bg-amber-500/10 dark:text-white dark:ring-amber-400/30'
                    : isBright
                    ? 'text-stone-600 hover:text-stone-900 bg-stone-100/80 hover:bg-stone-200/60'
                    : 'text-stone-400 hover:text-stone-100 bg-stone-800/60 hover:bg-stone-700/60'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Attire Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAttire.map((item) => (
              <div
                key={item.id}
                className={`p-5 rounded-xl border space-y-3 transition-all ${
                  isBright
                    ? 'bg-white/80 border-stone-200 hover:border-stone-300 text-stone-800 shadow-xs'
                    : 'bg-stone-900/60 border-stone-800 hover:border-stone-700 text-stone-200 shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded border font-semibold border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                    {item.genderCategory}
                  </span>
                  <span className="text-xs font-bold font-devanagari text-stone-600 dark:text-stone-400">
                    {item.nameNepali}
                  </span>
                </div>

                <div>
                  <h4
                    className={`text-base font-bold font-heading ${
                      isBright ? 'text-stone-900' : 'text-stone-100'
                    }`}
                  >
                    {item.name}
                  </h4>
                  <p
                    className={`text-xs mt-1 leading-relaxed ${
                      isBright ? 'text-stone-600' : 'text-stone-400'
                    }`}
                  >
                    {item.description}
                  </p>
                </div>

                <div
                  className={`space-y-1.5 pt-2 border-t text-xs ${
                    isBright ? 'border-stone-200' : 'border-stone-800'
                  }`}
                >
                  <div>
                    <span className="font-mono text-[10px] uppercase text-stone-500 dark:text-stone-400">
                      Material:{' '}
                    </span>
                    <span className={isBright ? 'text-stone-700' : 'text-stone-300'}>
                      {item.material}
                    </span>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase text-stone-500 dark:text-stone-400">
                      Symbolism:{' '}
                    </span>
                    <span className={isBright ? 'text-stone-700' : 'text-stone-300'}>
                      {item.symbolism}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. MUSICAL INSTRUMENTS SECTION (मादल, ढ्याङ्ग्रो, खैँजडी, मुर्चुङ्गा) */}
      {/* ========================================================================= */}
      {activeHeritageTab === 'instruments' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {INSTRUMENT_HERITAGE.map((inst) => (
              <div
                key={inst.id}
                className={`p-5 rounded-xl border space-y-4 ${
                  isBright
                    ? 'bg-white/80 border-stone-200 text-stone-800 shadow-xs'
                    : 'bg-stone-900/60 border-stone-800 text-stone-200 shadow-xs'
                }`}
              >
                <div
                  className={`flex items-center justify-between border-b pb-3 ${
                    isBright ? 'border-stone-200' : 'border-stone-800'
                  }`}
                >
                  <div>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded border font-semibold border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                      {inst.type}
                    </span>
                    <h4
                      className={`text-lg font-bold font-heading mt-1 ${
                        isBright ? 'text-stone-900' : 'text-stone-100'
                      }`}
                    >
                      {inst.name}
                    </h4>
                  </div>
                  <span className="text-xs font-devanagari font-semibold text-stone-500 dark:text-stone-400">
                    {inst.nameNepali}
                  </span>
                </div>

                <p
                  className={`text-xs leading-relaxed ${
                    isBright ? 'text-stone-600' : 'text-stone-400'
                  }`}
                >
                  {inst.description}
                </p>

                <div
                  className={`p-3.5 rounded-xl border text-xs space-y-1 ${
                    isBright
                      ? 'bg-stone-50 border-stone-200 text-stone-800'
                      : 'bg-stone-900/40 border-stone-800 text-stone-300'
                  }`}
                >
                  <span className="text-[10px] font-mono uppercase font-bold block text-stone-900 dark:text-stone-100">
                    Magar Cultural Connection:
                  </span>
                  <p className="text-stone-600 dark:text-stone-400">
                    {inst.magarConnection}
                  </p>
                </div>

                <div
                  className={`text-xs space-y-1 ${
                    isBright ? 'text-stone-600' : 'text-stone-400'
                  }`}
                >
                  <div>
                    <strong className={isBright ? 'text-stone-800' : 'text-stone-200'}>
                      Crafting Materials:
                    </strong>{' '}
                    {inst.materials}
                  </div>
                  <div>
                    <strong className={isBright ? 'text-stone-800' : 'text-stone-200'}>
                      Acoustic Nature:
                    </strong>{' '}
                    {inst.acoustics}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. CULINARY HERITAGE SECTION (बटुक, जाँड, गुन्द्रुक) */}
      {/* ========================================================================= */}
      {activeHeritageTab === 'culinary' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {CULINARY_HERITAGE.map((food) => (
              <div
                key={food.id}
                className={`p-5 rounded-xl border space-y-4 ${
                  isBright
                    ? 'bg-white/80 border-stone-200 text-stone-800 shadow-xs'
                    : 'bg-stone-900/60 border-stone-800 text-stone-200 shadow-xs'
                }`}
              >
                <div
                  className={`border-b pb-3 ${
                    isBright ? 'border-stone-200' : 'border-stone-800'
                  }`}
                >
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded border font-semibold border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                    {food.festivalOccasion.split(',')[0]}
                  </span>
                  <h4
                    className={`text-lg font-bold font-heading mt-1 ${
                      isBright ? 'text-stone-900' : 'text-stone-100'
                    }`}
                  >
                    {food.name}
                  </h4>
                  <span className="text-xs font-devanagari font-bold text-stone-500 dark:text-stone-400">
                    {food.nameNepali}
                  </span>
                </div>

                <p
                  className={`text-xs leading-relaxed ${
                    isBright ? 'text-stone-600' : 'text-stone-400'
                  }`}
                >
                  {food.description}
                </p>

                <div className="space-y-1.5 text-xs">
                  <span className="text-[10px] uppercase font-mono block font-bold text-stone-500 dark:text-stone-400">
                    Key Ingredients:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {food.ingredients.map((ing, idx) => (
                      <span
                        key={idx}
                        className={`text-[11px] px-2 py-0.5 rounded border ${
                          isBright
                            ? 'bg-stone-100 border-stone-200 text-stone-700'
                            : 'bg-stone-800 border-stone-700 text-stone-300'
                        }`}
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  className={`p-3 rounded-xl border text-xs ${
                    isBright
                      ? 'bg-stone-50 border-stone-200 text-stone-800'
                      : 'bg-stone-900/40 border-stone-800 text-stone-300'
                  }`}
                >
                  <span className="text-[10px] uppercase font-mono font-bold block text-stone-900 dark:text-stone-100">
                    Cultural Significance:
                  </span>
                  <p className="mt-0.5 text-stone-600 dark:text-stone-400">
                    {food.culturalImportance}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. FOLKLORE MANUSCRIPT & CHANTS READER */}
      {/* ========================================================================= */}
      {activeHeritageTab === 'manuscript' && (
        <div className="space-y-6">
          {/* Story Selector Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {FOLKLORE_STORIES.map((story) => {
              const isSelected = story.id === selectedStory.id;
              return (
                <button
                  key={story.id}
                  onClick={() => {
                    setSelectedStory(story);
                    setActiveVerseIndex(0);
                  }}
                  className={`p-4 rounded-xl text-left transition-all border min-h-11 ${
                    isSelected
                      ? isBright
                        ? 'bg-white border-amber-600/80 shadow-md ring-1 ring-amber-600/20'
                        : 'bg-stone-900 border-amber-500/80 shadow-md ring-1 ring-amber-500/20'
                      : isBright
                      ? 'bg-white/70 border-stone-200 hover:border-stone-300 hover:bg-stone-100/50 text-stone-800'
                      : 'bg-stone-900/40 border-stone-800 hover:border-stone-700 hover:bg-stone-800/40 text-stone-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded border border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                      {story.type}
                    </span>
                    <span className="text-[10px] font-mono opacity-80 text-stone-500 dark:text-stone-400">
                      {story.dialect.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-xs font-bold line-clamp-1 text-stone-900 dark:text-stone-100">
                    {story.title}
                  </div>
                  <div className="text-[11px] line-clamp-1 mt-0.5 text-stone-500 dark:text-stone-400">
                    {story.originLocation}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Manuscript Parchment Reader Box */}
          <div
            className={`rounded-xl border p-5 md:p-6 space-y-5 ${
              isBright
                ? 'bg-white/80 border-stone-200 text-stone-900 shadow-xs'
                : 'bg-stone-900/60 border-stone-800 text-stone-100 shadow-xs'
            }`}
          >
            <div
              className={`border-b pb-4 space-y-1 ${
                isBright ? 'border-stone-200' : 'border-stone-800'
              }`}
            >
              <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
                {selectedStory.historicalPeriod} · {selectedStory.originLocation}
              </span>
              <h3
                className={`text-xl md:text-2xl font-heading font-black ${
                  isBright ? 'text-stone-900' : 'text-stone-100'
                }`}
              >
                {selectedStory.title}
              </h3>
              <div className="font-heading font-akkha text-xl font-bold text-amber-700 dark:text-amber-400">
                {selectedStory.titleAkkha}
              </div>
            </div>

            <p
              className={`text-xs md:text-sm italic leading-relaxed p-4 rounded-xl border ${
                isBright
                  ? 'bg-stone-50 border-stone-200 text-stone-700'
                  : 'bg-stone-900/40 border-stone-800 text-stone-300'
              }`}
            >
              "{selectedStory.summary}"
            </p>

            {/* Verses List */}
            <div className="space-y-3">
              <div className="text-[11px] font-semibold uppercase tracking-wider font-mono text-stone-500 dark:text-stone-400">
                Inscribed Verses & Akkha Lipi Chants
              </div>

              {selectedStory.verses.map((verse, idx) => {
                const isActive = activeVerseIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveVerseIndex(idx)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      isActive
                        ? isBright
                          ? 'bg-amber-50/70 border-amber-300 shadow-xs'
                          : 'bg-amber-950/20 border-amber-800/60 shadow-xs'
                        : isBright
                        ? 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50/60'
                        : 'bg-stone-900/40 border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-2 flex-1">
                        {/* Akkha Lipi Scribe Rendering */}
                        <div className="text-xl md:text-2xl font-heading font-akkha font-bold tracking-wide leading-relaxed text-amber-700 dark:text-amber-400">
                          {verse.akkhaText}
                        </div>

                        {/* Transliteration & Devanagari */}
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span
                            className={`font-devanagari font-semibold px-2 py-0.5 rounded border ${
                              isBright
                                ? 'bg-stone-100 text-stone-900 border-stone-200'
                                : 'bg-stone-800 text-stone-100 border-stone-700'
                            }`}
                          >
                            {verse.devanagariText}
                          </span>
                          <span className="font-mono text-[11px] text-stone-500 dark:text-stone-400">
                            {verse.transliteration}
                          </span>
                        </div>

                        {/* English Meaning */}
                        <p
                          className={`text-xs md:text-sm font-reading max-w-prose leading-relaxed ${
                            isBright ? 'text-stone-700' : 'text-stone-300'
                          }`}
                        >
                          {verse.englishText}
                        </p>

                        {/* Shamanic / Ritual Footnote */}
                        {verse.shamanicNote && (
                          <div
                            className={`flex items-center gap-2 text-[11px] px-3 py-1.5 rounded-lg border mt-1 ${
                              isBright
                                ? 'text-stone-800 bg-stone-50 border-stone-200'
                                : 'text-stone-200 bg-stone-900/40 border-stone-800'
                            }`}
                          >
                            <Info className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 shrink-0" />
                            <span>
                              <strong>Ritual Context:</strong> {verse.shamanicNote}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
