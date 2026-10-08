import React from 'react';
import { AiGuruModalProps } from '../types/aiGuru';
import { X, Sparkles } from 'lucide-react';
import { formatUnboxedMetadata } from '../utils/perception-impeccable-harness';

/**
 * Guruma AI chat is retired for now: this is a static placeholder
 * (no state, no network requests, nothing retained between openings).
 */
export const AiGuruModal: React.FC<AiGuruModalProps> = ({ isOpen, onClose, activeDialect }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="guruma-placeholder-title"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-2xl border p-6 space-y-5 shadow-xl bg-white border-stone-200 dark:bg-stone-900 dark:border-stone-800"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 min-h-11 min-w-11 rounded-xl flex items-center justify-center cursor-pointer transition-colors text-stone-500 hover:text-stone-900 hover:bg-stone-100 dark:text-stone-400 dark:hover:text-white dark:hover:bg-stone-800"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-12 h-12 rounded-xl border flex items-center justify-center text-3xl font-akkha bg-amber-50 border-amber-200 text-amber-700 dark:bg-stone-950 dark:border-stone-800 dark:text-amber-400">
          𑀅
        </div>

        <div className="space-y-2">
          <div className="text-[11px] font-mono uppercase tracking-wider text-amber-800 dark:text-amber-400 font-semibold">
            {formatUnboxedMetadata(['मगर गुरुमा', 'Coming Soon'])}
          </div>
          <h2 id="guruma-placeholder-title" className="text-lg font-heading font-black text-stone-900 dark:text-stone-100">
            Magar Guruma
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
            The cultural mentor chat is being reworked and is not available yet. Meanwhile, practise{' '}
            <span className="font-semibold capitalize text-stone-900 dark:text-white">{activeDialect}</span> through Daily
            Conversations, the Vocabulary Explorer and the Lesson Lab.
          </p>
        </div>

        <button
          onClick={onClose}
          className="min-h-11 w-full flex items-center justify-center gap-2 px-5 rounded-xl font-bold text-xs border transition-all active:scale-[0.98] cursor-pointer shadow-xs bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-300 dark:bg-stone-100 dark:hover:bg-white dark:text-stone-900 dark:border-transparent"
        >
          <Sparkles className="w-4 h-4 text-amber-700" />
          <span>Continue Learning</span>
        </button>
      </div>
    </div>
  );
};
