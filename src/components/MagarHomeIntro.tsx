import React from 'react';
import { MagarHomeIntroProps } from '../types/home';
import { DIALECTS } from '../data/dialectData';
import { useTheme } from '../context/ThemeContext';
import {
  LEARNING_MODULES,
  SAMPLE_AKKHA_GLYPHS,
  CULTURAL_FACTS,
} from '../constants/home';
import {
  Languages,
  Edit3,
  Compass,
  ScrollText,
  Keyboard,
  Crown,
  Sparkles,
  ArrowRight,
  Users,
  Bookmark,
  MessageSquare,
  Check,
} from 'lucide-react';
import { formatUnboxedMetadata } from '../utils/perception-impeccable-harness';

const renderModuleIcon = (iconName: string, isBright: boolean) => {
  const iconClass = `w-4 h-4 ${isBright ? 'text-amber-800' : 'text-amber-400'}`;
  switch (iconName) {
    case 'Languages':
      return <Languages className={iconClass} />;
    case 'Edit3':
      return <Edit3 className={iconClass} />;
    case 'Compass':
      return <Compass className={iconClass} />;
    case 'ScrollText':
      return <ScrollText className={iconClass} />;
    case 'Users':
      return <Users className={iconClass} />;
    case 'Keyboard':
      return <Keyboard className={iconClass} />;
    case 'Crown':
      return <Crown className={iconClass} />;
    case 'Bookmark':
      return <Bookmark className={iconClass} />;
    default:
      return <Sparkles className={iconClass} />;
  }
};

export const MagarHomeIntro: React.FC<MagarHomeIntroProps> = ({
  onSelectTab,
  userStats,
  onSelectDialect,
}) => {
  const { isBright } = useTheme();

  return (
    <div id="magar-home-intro" className="space-y-12 pb-16">
      {/* 1. L1 COGNITIVE ANCHOR: EDITORIAL HERO & SCHOLARLY INTRODUCTION */}
      <section className="space-y-6 pt-2">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 pb-8 border-b border-stone-200 dark:border-stone-800">
          <div className="space-y-4 max-w-3xl">
            {/* Authentic Cultural Kicker (Clean Unboxed Typography) */}
            <div className="space-y-1">
              <div className="text-xs font-mono tracking-wider uppercase text-amber-800 dark:text-amber-400 font-semibold">
                {formatUnboxedMetadata(['मगर भाषा, लिपि तथा सांस्कृतिक अभिलेखालय', 'Living Heritage Archive'])}
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-stone-900 dark:text-stone-100">
                Akkha Lipi Calligraphy &amp; Living Magar Dialects
              </h1>
            </div>

            <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed max-w-2xl">
              An authoritative cultural repository dedicated to preserving the endangered 11th-century Akkha Lipi script, the comparative linguistic matrix of <strong className="font-semibold text-stone-900 dark:text-white">Magar Dhut</strong>, <strong className="font-semibold text-stone-900 dark:text-white">Kham Magar</strong>, and <strong className="font-semibold text-stone-900 dark:text-white">Kaike</strong>, and the living heritage of the Magarat hills.
            </p>

            {/* Direct Primary Action Buttons - 44px min-touch target */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onSelectTab('conversations')}
                className={`min-h-11 flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all active:scale-[0.98] cursor-pointer shadow-xs ${
                  isBright
                    ? 'bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 dark:border-transparent'
                    : 'bg-stone-100 hover:bg-white text-stone-900'
                }`}
              >
                <MessageSquare className="w-4 h-4 text-amber-700" />
                <span>Begin Daily Conversation</span>
                <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
              </button>

              <button
                onClick={() => onSelectTab('words')}
                className={`min-h-11 flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs border transition-all active:scale-[0.98] cursor-pointer ${
                  isBright
                    ? 'bg-white hover:bg-stone-100 text-stone-800 border-stone-300'
                    : 'bg-stone-900/60 hover:bg-stone-800 text-stone-200 border-stone-800'
                }`}
              >
                <Languages className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                <span>Explore Vocabulary</span>
              </button>

              <button
                onClick={() => onSelectTab('sand')}
                className={`min-h-11 flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs border transition-all active:scale-[0.98] cursor-pointer ${
                  isBright
                    ? 'bg-white hover:bg-stone-100 text-stone-800 border-stone-300'
                    : 'bg-stone-900/60 hover:bg-stone-800 text-stone-200 border-stone-800'
                }`}
              >
                <Edit3 className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                <span>Trace Akkha Script</span>
              </button>
            </div>
          </div>

          {/* Cultural Identifier & Active Dialect Dossier (Single Elevation, No Clutter) */}
          <div
            className={`p-5 rounded-2xl border transition-colors shrink-0 lg:w-72 space-y-3.5 ${
              isBright
                ? 'bg-stone-50/80 border-stone-200 text-stone-900'
                : 'bg-stone-900/60 border-stone-800 text-stone-100'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-3xl font-bold font-akkha border ${
                  isBright
                    ? 'bg-white border-amber-200 text-amber-800 shadow-xs'
                    : 'bg-stone-950 border-stone-800 text-amber-400'
                }`}
              >
                𑀅
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider block text-stone-500 dark:text-stone-400">
                  Universal Greeting
                </span>
                <span className="text-base font-bold text-stone-900 dark:text-white">
                  Jhorle! <span className="text-stone-500 font-devanagari font-normal">(झोर्ले)</span>
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200/80 dark:border-stone-800/80 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] block font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  Selected Dialect
                </span>
                <span className="font-bold text-amber-700 dark:text-amber-400">
                  {DIALECTS[userStats.activeDialect]?.name || 'Magar Dhut'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] block font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400">
                  Active Streak
                </span>
                <span className="font-bold font-mono text-stone-900 dark:text-white tabular-nums">
                  {userStats.streakDays} {userStats.streakDays === 1 ? 'day' : 'days'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DAILY CONVERSATION HIGHLIGHT (Heuristic: The Conductor Model) */}
      <section
        className={`p-6 rounded-2xl border transition-all ${
          isBright
            ? 'bg-amber-950/[0.02] border-amber-900/15'
            : 'bg-amber-500/[0.03] border-amber-500/20'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-2xl">
            {/* Zero-Pill Unboxed Header */}
            <div className="text-xs font-mono text-amber-800 dark:text-amber-400 font-semibold tracking-wide">
              {formatUnboxedMetadata(['दैनिक कुराकानी', 'Daily Conversation of the Day', 'Day 1'])}
            </div>
            <h2 className="text-base sm:text-lg font-bold font-heading text-stone-900 dark:text-stone-100">
              Morning Greetings at the Hearth · चिया र बिहानी भलाकुसारी
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              Step into a mountain home in Ghandruk or Rolpa. Practice respectful greetings, tea hospitality, and polite responses across Dhut, Kham, and Kaike.
            </p>
          </div>

          <button
            onClick={() => onSelectTab('conversations')}
            className={`min-h-11 flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all active:scale-[0.98] cursor-pointer shrink-0 shadow-xs ${
              isBright
                ? 'bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 dark:border-transparent'
                : 'bg-stone-100 hover:bg-white text-stone-900'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-amber-700" />
            <span>Enter Daily Dialogue</span>
            <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
          </button>
        </div>
      </section>

      {/* 2. THREE DIALECT BRANCHES: Quiet, Unboxed Segmentation (Zero-Pill Discipline) */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-base font-bold font-heading text-stone-900 dark:text-stone-100">
              The Three Living Dialect Branches · तीन प्रमुख भाषिका
            </h2>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Select an active branch to ground phonetic vocabulary and lessons in its regional speech.
            </p>
          </div>
          <button
            onClick={() => onSelectTab('dialects')}
            className="text-xs font-semibold text-amber-800 dark:text-amber-400 hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>Full Comparative Matrix</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Dhut */}
          <button
            onClick={() => onSelectDialect('dhut')}
            className={`min-h-11 p-4 rounded-xl border text-left transition-all cursor-pointer ${
              userStats.activeDialect === 'dhut'
                ? isBright
                  ? 'bg-amber-50/60 border-amber-300 text-stone-900 ring-1 ring-amber-400/40'
                  : 'bg-amber-500/10 border-amber-500/30 text-white ring-1 ring-amber-400/30'
                : isBright
                ? 'bg-white hover:bg-stone-50 border-stone-200 text-stone-800'
                : 'bg-stone-900/60 hover:bg-stone-800 border-stone-800 text-stone-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-stone-900 dark:text-white">
                1. Magar Dhut <span className="font-devanagari font-normal text-stone-500">(धुत)</span>
              </span>
              {userStats.activeDialect === 'dhut' ? (
                <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-800 dark:text-amber-300">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                  <span>Active</span>
                </span>
              ) : (
                <span className="text-[11px] text-stone-400">Select</span>
              )}
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
              Barha Magarat · Palpa, Tanahun, Syangja (~800k speakers)
            </p>
          </button>

          {/* Kham */}
          <button
            onClick={() => onSelectDialect('kham')}
            className={`min-h-11 p-4 rounded-xl border text-left transition-all cursor-pointer ${
              userStats.activeDialect === 'kham'
                ? isBright
                  ? 'bg-amber-50/60 border-amber-300 text-stone-900 ring-1 ring-amber-400/40'
                  : 'bg-amber-500/10 border-amber-500/30 text-white ring-1 ring-amber-400/30'
                : isBright
                ? 'bg-white hover:bg-stone-50 border-stone-200 text-stone-800'
                : 'bg-stone-900/60 hover:bg-stone-800 border-stone-800 text-stone-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-stone-900 dark:text-white">
                2. Kham Magar <span className="font-devanagari font-normal text-stone-500">(खाम)</span>
              </span>
              {userStats.activeDialect === 'kham' ? (
                <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-800 dark:text-amber-300">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                  <span>Active</span>
                </span>
              ) : (
                <span className="text-[11px] text-stone-400">Select</span>
              )}
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
              Athara Magarat · Rolpa, Rukum, Baglung (~70k speakers)
            </p>
          </button>

          {/* Kaike */}
          <button
            onClick={() => onSelectDialect('kaike')}
            className={`min-h-11 p-4 rounded-xl border text-left transition-all cursor-pointer ${
              userStats.activeDialect === 'kaike'
                ? isBright
                  ? 'bg-amber-50/60 border-amber-300 text-stone-900 ring-1 ring-amber-400/40'
                  : 'bg-amber-500/10 border-amber-500/30 text-white ring-1 ring-amber-400/30'
                : isBright
                ? 'bg-white hover:bg-stone-50 border-stone-200 text-stone-800'
                : 'bg-stone-900/60 hover:bg-stone-800 border-stone-800 text-stone-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-stone-900 dark:text-white">
                3. Kaike <span className="font-devanagari font-normal text-stone-500">(काइके)</span>
              </span>
              {userStats.activeDialect === 'kaike' ? (
                <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-800 dark:text-amber-300">
                  <Check className="w-3 h-3 stroke-[2.5]" />
                  <span>Active</span>
                </span>
              ) : (
                <span className="text-[11px] text-stone-400">Select</span>
              )}
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 mt-2 leading-relaxed">
              Tarakot Valley · Dolpa highlands (~1.5k speakers)
            </p>
          </button>
        </div>
      </section>

      {/* 3. CORE ARCHIVAL & LEARNING MODULES (Unboxed Metadata Kicker) */}
      <section className="space-y-4">
        <div>
          <h2 className="text-base font-bold font-heading text-stone-900 dark:text-stone-100">
            Archival &amp; Educational Suites · सिकाइ मोड्युलहरू
          </h2>
          <p className="text-xs text-stone-600 dark:text-stone-400">
            Select a suite below to begin linguistic practice, calligraphy training, or clan research.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {LEARNING_MODULES.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`min-h-11 p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between group ${
                isBright
                  ? 'bg-white hover:border-stone-300 hover:shadow-xs border-stone-200 text-stone-800'
                  : 'bg-stone-900/60 hover:border-stone-700 hover:bg-stone-900 border-stone-800 text-stone-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`p-2 rounded-lg border ${
                      isBright
                        ? 'bg-amber-50 border-amber-200 text-amber-800'
                        : 'bg-stone-950 border-stone-800 text-amber-400'
                    }`}
                  >
                    {renderModuleIcon(item.iconName, isBright)}
                  </div>
                  {/* Clean Unboxed Kicker (No Pill Enclosure) */}
                  <span className="text-[10px] font-mono font-medium text-stone-500 uppercase tracking-wider">
                    {item.tag}
                  </span>
                </div>

                <div className="font-bold text-xs text-stone-900 dark:text-white group-hover:text-amber-800 dark:group-hover:text-amber-400 transition-colors">
                  {item.title}
                </div>
                <div className="text-[10px] text-stone-500 font-devanagari mt-0.5">
                  {item.nepali}
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-2 line-clamp-2 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              <div className="mt-4 pt-2.5 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-xs font-semibold text-amber-800 dark:text-amber-400">
                <span>Enter Suite</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 4. AKKHA GLYPH PRIMER */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <h2 className="text-base font-bold font-heading text-stone-900 dark:text-stone-100">
              Akkha Lipi Primer · अक्खा लिपि वर्णमाला
            </h2>
            <span className="text-xs text-stone-500 dark:text-stone-400 hidden sm:inline">
              Sample characters with phonetic transcription
            </span>
          </div>

          <button
            onClick={() => onSelectTab('sand')}
            className="text-xs font-semibold text-amber-800 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Full Tracing Studio</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
          {SAMPLE_AKKHA_GLYPHS.map((item, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border text-center transition-all group select-none ${
                isBright
                  ? 'bg-white border-stone-200 hover:border-amber-400/80 shadow-xs'
                  : 'bg-stone-900/60 border-stone-800 hover:border-amber-400/60'
              }`}
            >
              <div className="text-2xl font-heading font-black font-akkha text-amber-700 dark:text-amber-400 group-hover:scale-110 transition-transform">
                {item.char}
              </div>
              <div className="text-xs font-bold mt-1 text-stone-900 dark:text-white font-devanagari">
                {item.deva}{' '}
                <span className="font-mono text-[10px] font-normal text-stone-500 dark:text-stone-400">
                  ({item.roman})
                </span>
              </div>
              <div className="text-[10px] text-stone-500 mt-0.5 line-clamp-1">
                {item.meaning}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CULTURAL CHRONICLES & HISTORICAL NOTES */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ScrollText className="w-4 h-4 text-amber-700 dark:text-amber-400" />
            <h2 className="text-base font-bold font-heading text-stone-900 dark:text-stone-100">
              Historical Chronicles &amp; Archaeological Notes · मगरात इतिहास
            </h2>
          </div>
          <button
            onClick={() => onSelectTab('library')}
            className="text-xs font-semibold text-amber-800 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Folklore Library</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {CULTURAL_FACTS.map((fact, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border space-y-2 ${
                isBright
                  ? 'bg-white border-stone-200'
                  : 'bg-stone-900/60 border-stone-800'
              }`}
            >
              <div className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
                {formatUnboxedMetadata([fact.tag, fact.nepali])}
              </div>
              <h3 className="text-xs font-bold text-stone-900 dark:text-white">
                {fact.title}
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                {fact.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
