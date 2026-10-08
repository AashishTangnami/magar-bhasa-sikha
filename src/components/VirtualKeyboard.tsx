import React, { useState } from 'react';
import {
  ALL_AKKHA_GLYPHS,
  AKKHA_VOWELS,
  AKKHA_CONSONANTS,
  AKKHA_NUMBERS,
  AKKHA_MATRAS,
  AKKHA_PUNCTUATION,
} from '../data/scriptData';
import { romanToAkkha, PHONETIC_KEY_MAPPINGS } from '../utils/transliteration';
import {
  VirtualKeyboardProps,
  VirtualKeyboardModule,
  KeypadTab,
} from '../types/virtualKeyboard';
import {
  Copy,
  Check,
  Trash2,
  ExternalLink,
  BookOpen,
  Keyboard as KeyboardIcon,
  Layers,
  FileText,
  Delete,
} from 'lucide-react';
import { formatUnboxedMetadata } from '../utils/perception-impeccable-harness';
import { useSafeTimeout } from '../hooks/useSafeTimeout';
import { akkhaToDevanagari } from '../utils/script-index';

// Serene stone surface tokens (shared with Home hub aesthetic)
const CARD = 'bg-white border-stone-200 dark:bg-stone-900/60 dark:border-stone-800';
const INSET = 'bg-stone-50 border-stone-200 dark:bg-stone-950/60 dark:border-stone-800';
const SEGMENT_TRACK = 'bg-stone-100/80 border-stone-200 dark:bg-stone-900/60 dark:border-stone-800';
const SEGMENT_ACTIVE = 'bg-white text-stone-950 font-bold shadow-xs dark:bg-stone-800 dark:text-stone-100';
const SEGMENT_IDLE = 'font-medium text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100';
const SECONDARY_BTN =
  'min-h-11 flex items-center gap-1.5 px-4 rounded-xl text-xs font-semibold border transition-all active:scale-[0.98] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed bg-white hover:bg-stone-100 text-stone-800 border-stone-300 dark:bg-stone-900/60 dark:hover:bg-stone-800 dark:text-stone-200 dark:border-stone-800';
const KEY =
  'min-h-[52px] p-2 rounded-xl border flex flex-col items-center justify-center transition-all active:scale-95 cursor-pointer bg-white hover:bg-amber-50/50 border-stone-200 hover:border-amber-400 shadow-xs dark:bg-stone-900/60 dark:hover:bg-stone-800 dark:border-stone-800 dark:hover:border-amber-500/40';
const GLYPH_TILE =
  'rounded-xl border transition-colors bg-white border-stone-200 hover:border-amber-400 dark:bg-stone-900/60 dark:border-stone-800 dark:hover:border-amber-500/40';
const AKKHA = 'font-akkha font-bold text-amber-700 dark:text-amber-400';
const SECTION_LABEL = 'text-[11px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400';
const LINK = 'inline-flex items-center gap-1 font-semibold text-amber-800 dark:text-amber-400 hover:underline';

const MODULE_TABS = [
  { id: 'keyboard', label: 'Scribe Keyboard', icon: KeyboardIcon },
  { id: 'characters', label: 'Character Table', icon: BookOpen },
  { id: 'barakhari', label: 'Barakhari (१२ खरी)', icon: Layers },
  { id: 'guide', label: 'Key Mapping', icon: FileText },
] as const satisfies readonly { id: VirtualKeyboardModule; label: string; icon: typeof BookOpen }[];

const SCRIBE_PRESETS = [
  { label: 'झोर्ले (Jhorle)', akkha: '𑀛𑁄𑀭𑁆𑀮𑁂', roman: 'jhorle' },
  { label: 'आपा आमा (Parents)', akkha: '𑀅𑀧𑀸 𑀆𑀫𑀸', roman: 'apa aama' },
  { label: 'घालेक (Ghalek)', akkha: '𑀖𑀸𑀮𑁂𑀓', roman: 'ghalek' },
  { label: 'मुन्द्री (Mundri)', akkha: '𑀫𑀼𑀦𑁆𑀤𑁆𑀭𑀻', roman: 'mundri' },
] as const;

// Barakhari vowel-sign suffixes: [name, akkha sign, devanagari sign, roman suffix]
const BARAKHARI_SIGNS = [
  ['Mula (अ)', '', '', ''],
  ['Aa-kar (ा)', '𑀸', 'ा', 'aa'],
  ['I-kar (ि)', '𑀺', 'ि', 'i'],
  ['Ee-kar (ी)', '𑀻', 'ी', 'ee'],
  ['U-kar (ु)', '𑀼', 'ु', 'u'],
  ['Oo-kar (ू)', '𑀽', 'ू', 'oo'],
  ['E-kar (े)', '𑁂', 'े', 'e'],
  ['Ai-kar (ै)', '𑁃', 'ै', 'ai'],
  ['O-kar (ो)', '𑁄', 'ो', 'o'],
  ['Au-kar (ौ)', '𑁅', 'ौ', 'au'],
  ['Anusvara (ं)', '𑀁', 'ं', 'm'],
  ['Visarga (ः)', '𑀂', 'ः', 'h'],
] as const;

export const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({
  className = '',
}) => {
  const [activeModule, setActiveModule] = useState<VirtualKeyboardModule>('keyboard');
  const [typedAkkha, setTypedAkkha] = useState<string>('𑀛𑁄𑀭𑁆𑀮𑁂'); // Default "Jhorle"
  const [romanInput, setRomanInput] = useState<string>('jhorle');
  const [copied, setCopied] = useState(false);
  const timers = useSafeTimeout();
  const [activeKeypadTab, setActiveKeypadTab] = useState<KeypadTab>('consonants');
  
  // Barakhari selected consonant
  const [selectedConsonant, setSelectedConsonant] = useState(AKKHA_CONSONANTS[0]); // Default Ka (𑀓)

  const handleKeyPress = (char: string) => {
    setTypedAkkha((prev) => prev + char);
  };

  const handleBackspace = () => {
    setTypedAkkha((prev) => {
      const arr = Array.from(prev);
      arr.pop();
      return arr.join('');
    });
  };

  const handleClear = () => {
    setTypedAkkha('');
    setRomanInput('');
  };

  const handleCopy = () => {
    if (!typedAkkha) return;
    navigator.clipboard.writeText(typedAkkha);
    setCopied(true);
    timers.schedule('copied', () => setCopied(false), 2000);
  };

  const handleRomanInputChange = (text: string) => {
    setRomanInput(text);
    if (!text.trim()) {
      setTypedAkkha('');
      return;
    }
    const converted = romanToAkkha(text);
    setTypedAkkha(converted.akkha);
  };

  // Approximate Devanagari transliteration via a prebuilt character map (O(1) per character)
  const getDevanagariApprox = (text: string) =>
    akkhaToDevanagari(text) || '(Type characters or phonetic English)';

  const keypadTabs: { id: KeypadTab; label: string }[] = [
    { id: 'consonants', label: `Consonants (${AKKHA_CONSONANTS.length})` },
    { id: 'vowels', label: `Vowels (${AKKHA_VOWELS.length})` },
    { id: 'matras', label: `Matras (${AKKHA_MATRAS.length})` },
    { id: 'numbers', label: `Numbers (${AKKHA_NUMBERS.length})` },
    { id: 'punctuation', label: 'Punctuation' },
  ];

  const keypadKeys: { id: string; glyph: string; display: string; label: string; isDeva: boolean }[] =
    activeKeypadTab === 'consonants'
      ? AKKHA_CONSONANTS.map((g) => ({ id: g.id, glyph: g.glyph, display: g.glyph, label: `${g.devalipi} (${g.romanized})`, isDeva: true }))
      : activeKeypadTab === 'vowels'
      ? AKKHA_VOWELS.map((g) => ({ id: g.id, glyph: g.glyph, display: g.glyph, label: `${g.devalipi} (${g.romanized})`, isDeva: true }))
      : activeKeypadTab === 'matras'
      ? AKKHA_MATRAS.map((m) => ({ id: m.id, glyph: m.glyph, display: m.glyph === '𑁆' ? '◌𑁆' : m.glyph, label: m.deva, isDeva: true }))
      : activeKeypadTab === 'numbers'
      ? AKKHA_NUMBERS.map((g) => ({ id: g.id, glyph: g.glyph, display: g.glyph, label: `${g.devalipi} (${g.romanized.split(' ')[0]})`, isDeva: true }))
      : AKKHA_PUNCTUATION.map((p) => ({ id: p.id, glyph: p.glyph, display: p.glyph, label: p.name, isDeva: false }));

  return (
    <div id="virtual-keyboard-tool" className={`space-y-8 pb-12 ${className}`}>
      {/* Editorial Header & Module Switcher */}
      <section className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div className="space-y-2 max-w-2xl">
          <div className="text-[11px] font-mono uppercase tracking-wider text-amber-800 dark:text-amber-400 font-semibold">
            {formatUnboxedMetadata(['अक्खा कीबोर्ड र वर्णमाला', 'Script Engine', `${ALL_AKKHA_GLYPHS.length} Glyphs`])}
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-stone-900 dark:text-stone-100">
            Akkha Lipi Scribe &amp; Character Reference
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
            Validated against the historical 11th-century Akkha Rika and the{' '}
            <a
              href="https://magarkeyboard.nepexgroup.com/characters"
              target="_blank"
              rel="noopener noreferrer"
              className={LINK}
            >
              Nepex Magar Keyboard
              <ExternalLink className="w-3 h-3" />
            </a>{' '}
            character standard.
          </p>
        </div>

        <div className={`flex items-center gap-1 p-1 rounded-xl border shrink-0 overflow-x-auto ${SEGMENT_TRACK}`}>
          {MODULE_TABS.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveModule(tab.id)}
                className={`min-h-11 whitespace-nowrap flex items-center gap-1.5 px-3.5 rounded-lg text-xs transition-all cursor-pointer ${
                  activeModule === tab.id ? SEGMENT_ACTIVE : SEGMENT_IDLE
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* MODULE 1: INTERACTIVE KEYBOARD */}
      {activeModule === 'keyboard' && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className={SECTION_LABEL}>Cultural presets</span>
            {SCRIBE_PRESETS.map((preset) => (
              <button
                key={preset.roman}
                onClick={() => {
                  setTypedAkkha(preset.akkha);
                  setRomanInput(preset.roman);
                }}
                className={`${SECONDARY_BTN} font-devanagari`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {/* Scribe Output & Phonetic Input */}
          <div className={`rounded-2xl border p-5 sm:p-6 space-y-4 text-center ${CARD}`}>
            <div className={SECTION_LABEL}>Live Akkha Lipi scribe output</div>

            <div className={`min-h-[72px] flex items-center justify-center text-4xl md:text-5xl tracking-widest break-all ${AKKHA}`}>
              {typedAkkha || (
                <span className="text-sm font-normal font-sans tracking-normal text-stone-400 dark:text-stone-500">
                  Type phonetic English below or tap the keypad.
                </span>
              )}
            </div>

            <div className="pt-3 border-t border-stone-100 dark:border-stone-800/80 text-sm">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mr-2">
                Devanagari
              </span>
              <span className="font-devanagari font-semibold text-stone-500 dark:text-stone-400">
                {getDevanagariApprox(typedAkkha)}
              </span>
            </div>

            <label className="max-w-md mx-auto min-h-11 flex items-center gap-2 px-3 rounded-xl border transition-all bg-stone-50 border-stone-200 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-400/20 dark:bg-stone-950/60 dark:border-stone-800 dark:focus-within:border-amber-500/50">
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 shrink-0">
                Phonetic
              </span>
              <input
                type="text"
                value={romanInput}
                onChange={(e) => handleRomanInputChange(e.target.value)}
                placeholder="e.g. jhorle, ka, kha, nam"
                className="bg-transparent text-sm font-mono font-semibold outline-none flex-1 min-w-0 text-stone-900 placeholder:text-stone-400 placeholder:font-normal dark:text-white dark:placeholder:text-stone-600"
              />
            </label>

            <div className="flex items-center justify-center gap-2">
              <button
                onClick={handleCopy}
                disabled={!typedAkkha}
                className="min-h-11 flex items-center gap-2 px-5 rounded-xl text-xs font-bold transition-all active:scale-[0.98] cursor-pointer shadow-xs disabled:opacity-40 disabled:cursor-not-allowed bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 dark:border-transparent dark:bg-stone-100 dark:hover:bg-white dark:text-stone-900"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-amber-700" />
                ) : (
                  <Copy className="w-4 h-4 text-amber-700" />
                )}
                <span>{copied ? 'Copied' : 'Copy Script'}</span>
              </button>
              <button onClick={handleClear} disabled={!typedAkkha} className={SECONDARY_BTN}>
                <Trash2 className="w-4 h-4" />
                <span>Clear</span>
              </button>
            </div>
          </div>

          {/* Keypad */}
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className={`flex items-center gap-1 p-1 rounded-xl border overflow-x-auto ${SEGMENT_TRACK}`}>
                {keypadTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveKeypadTab(tab.id)}
                    className={`min-h-11 whitespace-nowrap px-3 rounded-lg text-xs transition-all cursor-pointer ${
                      activeKeypadTab === tab.id ? SEGMENT_ACTIVE : SEGMENT_IDLE
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <button onClick={handleBackspace} className={SECONDARY_BTN} aria-label="Backspace">
                <Delete className="w-4 h-4" />
                <span>Backspace</span>
              </button>
            </div>

            <div className={`grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 p-3 rounded-2xl border ${INSET}`}>
              {keypadKeys.map((k) => (
                <button key={k.id} onClick={() => handleKeyPress(k.glyph)} className={KEY}>
                  <span className={`text-2xl ${AKKHA}`}>{k.display}</span>
                  <span className={`text-[10px] text-stone-500 dark:text-stone-400 ${k.isDeva ? 'font-devanagari' : ''}`}>
                    {k.label}
                  </span>
                </button>
              ))}

              <button
                onClick={() => handleKeyPress(' ')}
                className={`col-span-2 text-xs font-semibold text-stone-700 dark:text-stone-300 ${KEY}`}
              >
                Space <span className="font-devanagari font-normal text-stone-500 dark:text-stone-400">(खाली)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODULE 2: CHARACTER REFERENCE TABLE */}
      {activeModule === 'characters' && (
        <div className="space-y-8">
          <section className="space-y-3">
            <h2 className="text-sm font-bold font-heading text-stone-900 dark:text-stone-100">
              Independent Vowels <span className="font-devanagari font-normal text-stone-500 dark:text-stone-400">(स्वर वर्ण)</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {AKKHA_VOWELS.map((v) => (
                <div key={v.id} className={`p-3 ${GLYPH_TILE}`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-3xl ${AKKHA}`}>{v.glyph}</span>
                    <span className="text-sm font-devanagari text-stone-500 dark:text-stone-400">{v.devalipi}</span>
                  </div>
                  <div className="mt-2 text-[11px] font-mono font-semibold text-stone-900 dark:text-white">{v.romanized}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold font-heading text-stone-900 dark:text-stone-100">
              Consonants <span className="font-devanagari font-normal text-stone-500 dark:text-stone-400">(व्यञ्जन वर्ण)</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {AKKHA_CONSONANTS.map((c) => (
                <div key={c.id} className={`p-3 ${GLYPH_TILE}`}>
                  <div className="flex items-center justify-between">
                    <span className={`text-3xl ${AKKHA}`}>{c.glyph}</span>
                    <span className="text-sm font-devanagari text-stone-500 dark:text-stone-400">{c.devalipi}</span>
                  </div>
                  <div className="mt-2 text-[11px] font-mono font-semibold text-stone-900 dark:text-white">{c.romanized}</div>
                </div>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="space-y-3">
              <h2 className="text-sm font-bold font-heading text-stone-900 dark:text-stone-100">
                Matras &amp; Diacritics <span className="font-devanagari font-normal text-stone-500 dark:text-stone-400">(मात्रा चिन्हहरू)</span>
              </h2>
              <div className="grid grid-cols-3 gap-2">
                {AKKHA_MATRAS.map((m) => (
                  <div key={m.id} className={`p-2.5 text-center ${GLYPH_TILE}`}>
                    <div className={`text-2xl ${AKKHA}`}>{m.glyph === '𑁆' ? '◌𑁆' : `𑀓${m.glyph}`}</div>
                    <div className="text-[11px] mt-1 text-stone-500 dark:text-stone-400">
                      <span className="font-devanagari">{m.deva}</span> · {m.name.split(' ')[0]}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-sm font-bold font-heading text-stone-900 dark:text-stone-100">
                Numerals 0–9 <span className="font-devanagari font-normal text-stone-500 dark:text-stone-400">(अंकहरू)</span>
              </h2>
              <div className="grid grid-cols-5 gap-2">
                {AKKHA_NUMBERS.map((n) => (
                  <div key={n.id} className={`p-2.5 text-center ${GLYPH_TILE}`}>
                    <div className={`text-2xl ${AKKHA}`}>{n.glyph}</div>
                    <div className="text-[10px] font-mono mt-1 text-stone-500 dark:text-stone-400">
                      {n.devalipi} · {n.romanized.split(' ')[0]}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}

      {/* MODULE 3: BARAKHARI MATRIX (12-KHARI) */}
      {activeModule === 'barakhari' && (
        <div className="space-y-6">
          <div className={`p-4 rounded-2xl border space-y-3 ${CARD}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <span className={SECTION_LABEL}>Base consonant</span>
              <span className="text-sm font-bold text-stone-900 dark:text-white">
                <span className={`text-lg mr-1.5 ${AKKHA}`}>{selectedConsonant.glyph}</span>
                <span className="font-devanagari font-normal text-stone-500 dark:text-stone-400">{selectedConsonant.devalipi}</span>{' '}
                · {selectedConsonant.romanized}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto">
              {AKKHA_CONSONANTS.map((c) => {
                const isActive = selectedConsonant.id === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedConsonant(c)}
                    className={`min-h-11 min-w-11 px-2 rounded-lg border flex items-center justify-center gap-1 text-xs transition-all cursor-pointer ${
                      isActive
                        ? 'bg-amber-50 border-amber-400 ring-1 ring-amber-400/40 dark:bg-amber-500/10 dark:border-amber-500/40'
                        : 'bg-white border-stone-200 hover:border-stone-300 dark:bg-stone-900/60 dark:border-stone-800 dark:hover:border-stone-700'
                    }`}
                  >
                    <span className={`text-base ${AKKHA}`}>{c.glyph}</span>
                    <span className="font-devanagari text-stone-500 dark:text-stone-400">{c.devalipi}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <section className="space-y-3">
            <div className="flex items-baseline justify-between gap-2">
              <h2 className="text-sm font-bold font-heading text-stone-900 dark:text-stone-100">
                Twelve Vowel Sign Attachments <span className="font-devanagari font-normal text-stone-500 dark:text-stone-400">(बारहखरी)</span>
              </h2>
              <span className="text-[11px] text-stone-500 dark:text-stone-400 hidden sm:inline">Tap a syllable to add it to the scribe</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {BARAKHARI_SIGNS.map(([name, akkhaSign, devaSign, romanSuffix]) => {
                const glyph = `${selectedConsonant.glyph}${akkhaSign}`;
                return (
                  <button
                    key={name}
                    onClick={() => handleKeyPress(glyph)}
                    className={`min-h-11 p-3.5 text-center cursor-pointer ${GLYPH_TILE}`}
                  >
                    <div className={`text-3xl mb-1 ${AKKHA}`}>{glyph}</div>
                    <div className="font-devanagari text-sm text-stone-500 dark:text-stone-400">
                      {selectedConsonant.devalipi}{devaSign}
                    </div>
                    <div className="text-[10px] font-mono mt-0.5 text-stone-900 dark:text-white">
                      {selectedConsonant.romanized.toLowerCase()}{romanSuffix}{' '}
                      <span className="text-stone-500 dark:text-stone-400">· {name}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      )}

      {/* MODULE 4: KEY MAPPING GUIDE */}
      {activeModule === 'guide' && (
        <section className="space-y-3">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-sm font-bold font-heading text-stone-900 dark:text-stone-100">
              Phonetic Typing Cheat Sheet
            </h2>
            <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
              {formatUnboxedMetadata(['Nepex Magar Keyboard', `${PHONETIC_KEY_MAPPINGS.length} mappings`, 'Auto-transcription active'])}
            </span>
          </div>

          <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px rounded-xl border overflow-hidden max-h-[440px] overflow-y-auto bg-stone-200 border-stone-200 dark:bg-stone-800 dark:border-stone-800`}>
            {PHONETIC_KEY_MAPPINGS.map((m, idx) => (
              <div
                key={idx}
                className="px-3.5 py-2.5 flex items-center justify-between text-xs bg-white dark:bg-stone-900"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-stone-900 dark:text-white">{m.roman}</span>
                  <span className="text-stone-300 dark:text-stone-600">→</span>
                  <span className="font-devanagari text-stone-500 dark:text-stone-400">{m.devanagari}</span>
                </div>
                <span className={`text-xl ${AKKHA}`}>{m.akkha}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Reference Standards */}
      <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500 dark:text-stone-400">
        <div className="flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
          <span>Reference standards</span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a href="https://magarkeyboard.nepexgroup.com/characters" target="_blank" rel="noopener noreferrer" className={`min-h-11 ${LINK}`}>
            <span>Nepex Magar Keyboard Character Table</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <span className="text-stone-300 dark:text-stone-600">·</span>
          <a href="https://www.omniglot.com/writing/magarakkha.htm" target="_blank" rel="noopener noreferrer" className={`min-h-11 ${LINK}`}>
            <span>Omniglot Akkha Chart</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
