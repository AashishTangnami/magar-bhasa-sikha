import React, { useState, useMemo, useRef } from 'react';
import { matchSearchIndex } from '../utils/search-index';
import { REFERENCE_SEARCH_INDEX } from '../utils/search-indexes';
import { REFERENCES_DATA, ReferenceItem } from '../data/referencesData';
import { ExternalLink, Search, Copy, Check, ArrowRight, Info, X } from 'lucide-react';
import { formatUnboxedMetadata } from '../utils/perception-impeccable-harness';
import { useSafeTimeout } from '../hooks/useSafeTimeout';

interface ReferencesAndLinksProps {
  onSelectTab: (tab: 'home' | 'words' | 'sand' | 'dialects' | 'library' | 'keyboard' | 'wardrobe' | 'references' | 'clans') => void;
  className?: string;
}

type FilterCategory = 'all' | 'academic' | 'literature' | 'script_unicode' | 'cultural_org' | 'sitemap';

export const ReferencesAndLinks: React.FC<ReferencesAndLinksProps> = ({
  onSelectTab,
  className = '',
}) => {

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const timers = useSafeTimeout();

  // Copy citation or reference details
  const handleCopyCitation = (item: ReferenceItem) => {
    const citation = `${item.title} (${item.titleNepali}) - Author/Org: ${item.authorOrOrg}. ${item.url ? `URL: ${item.url}` : ''}`;
    navigator.clipboard.writeText(citation);
    setCopiedId(item.id);
    timers.schedule('copied', () => setCopiedId(null), 2000);
  };

  // Filtered and searched references
  // Search hits from the prebuilt index into a reusable per-instance mask
  const searchMaskRef = useRef<Uint8Array>(new Uint8Array(REFERENCES_DATA.length));
  const filteredReferences = useMemo(() => {
    const mask = searchMaskRef.current;
    matchSearchIndex(REFERENCE_SEARCH_INDEX, searchQuery, mask);
    return REFERENCES_DATA.filter(
      (item, i) =>
        mask[i] === 1 &&
        (selectedCategory === 'all' ||
          item.category === selectedCategory ||
          (selectedCategory === 'academic' && item.category === 'cultural_org'))
    );
  }, [searchQuery, selectedCategory]);

  const categories: { id: FilterCategory; label: string; labelNepali: string; count: number }[] = [
    { id: 'all', label: 'All Sources', labelNepali: 'सबै स्रोतहरू', count: REFERENCES_DATA.length },
    {
      id: 'sitemap',
      label: 'App Site Map',
      labelNepali: 'एप्लिकेशन पृष्ठहरू',
      count: REFERENCES_DATA.filter((r) => r.category === 'sitemap').length,
    },
    {
      id: 'academic',
      label: 'Academic & Govt Bodies',
      labelNepali: 'प्राज्ञिक तथा सरकारी निकाय',
      count: REFERENCES_DATA.filter((r) => r.category === 'academic' || r.category === 'cultural_org').length,
    },
    {
      id: 'literature',
      label: 'Books & Research',
      labelNepali: 'ग्रन्थहरू तथा अनुसन्धान',
      count: REFERENCES_DATA.filter((r) => r.category === 'literature').length,
    },
    {
      id: 'script_unicode',
      label: 'Script & Unicode',
      labelNepali: 'लिपि तथा युनिकोड मानक',
      count: REFERENCES_DATA.filter((r) => r.category === 'script_unicode').length,
    },
  ];

  return (
    <div id="magar-references-directory" className={`space-y-8 pb-12 ${className}`}>
      {/* 1. Editorial Header */}
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div className="space-y-2 max-w-3xl">
          <div className="text-[11px] font-mono uppercase tracking-wider text-amber-800 dark:text-amber-400 font-semibold">
            {formatUnboxedMetadata(['सन्दर्भ तथा स्रोत निर्देशिका', 'Citations', 'Archives', 'Site Map'])}
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-stone-900 dark:text-stone-100">
            References, Archival Sources &amp; Links
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
            A verified bibliography of linguistic research, Language Commission reports, Unicode technical standards, historical chronicles and internal application navigation.
          </p>
        </div>

        <div className="p-4 rounded-2xl border lg:w-64 shrink-0 bg-stone-50/80 border-stone-200 dark:bg-stone-900/60 dark:border-stone-800">
          <span className="text-[10px] block font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400">
            Indexed Sources
          </span>
          <span className="font-bold font-mono tabular-nums text-stone-900 dark:text-white">
            {REFERENCES_DATA.length} verified citations
          </span>
        </div>
      </section>

      {/* 2. Search & Segmented Category Control */}
      <section className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 dark:text-stone-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by author, title, organization or keyword (e.g. Watters, Unicode, Kaike)"
            aria-label="Search references"
            className="min-h-11 w-full pl-10 pr-12 py-2.5 rounded-xl text-xs sm:text-sm border transition-all outline-none bg-white border-stone-200 text-stone-900 placeholder:text-stone-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 dark:bg-stone-900/60 dark:border-stone-800 dark:text-white dark:placeholder:text-stone-500 dark:focus:border-amber-500/50"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              aria-label="Clear search"
              className="absolute right-1 top-1/2 -translate-y-1/2 min-h-11 min-w-11 flex items-center justify-center rounded-lg cursor-pointer text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1 p-1 rounded-xl border overflow-x-auto bg-stone-100/80 border-stone-200 dark:bg-stone-900/60 dark:border-stone-800">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                title={cat.labelNepali}
                className={`min-h-11 flex-1 whitespace-nowrap flex items-center justify-center gap-1.5 px-3 rounded-lg text-xs transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white text-stone-950 font-bold shadow-xs dark:bg-stone-800 dark:text-stone-100'
                    : 'font-medium text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100'
                }`}
              >
                <span>{cat.label}</span>
                <span className="font-mono text-[10px] tabular-nums text-stone-400 dark:text-stone-500">
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Citation Cards */}
      {filteredReferences.length === 0 ? (
        <div className="p-8 text-center rounded-2xl border bg-stone-50 border-stone-200 text-stone-600 dark:bg-stone-900/60 dark:border-stone-800 dark:text-stone-400">
          <Info className="w-6 h-6 mx-auto text-stone-400 mb-2" />
          <p className="text-sm font-semibold text-stone-900 dark:text-white">No citations match your search.</p>
          <p className="text-xs mt-1">Try broader terms or clear the search filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredReferences.map((item) => {
            const isCopied = copiedId === item.id;
            const isInternal = item.category === 'sitemap';

            return (
              <div
                key={item.id}
                className="p-5 rounded-xl border transition-all flex flex-col justify-between gap-4 group bg-white border-stone-200 hover:border-stone-300 hover:shadow-xs dark:bg-stone-900/60 dark:border-stone-800 dark:hover:border-stone-700"
              >
                <div className="space-y-2.5">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400">
                    {formatUnboxedMetadata([item.category.replace('_', ' '), item.yearOrType])}
                  </div>

                  <div>
                    <h3 className="text-sm font-bold font-heading leading-snug transition-colors text-stone-900 group-hover:text-amber-800 dark:text-white dark:group-hover:text-amber-400">
                      {item.title}
                    </h3>
                    <div className="text-xs font-devanagari mt-0.5 text-stone-500 dark:text-stone-400">
                      {item.titleNepali}
                    </div>
                    <div className="text-xs mt-1 text-stone-700 dark:text-stone-300">
                      <span className="text-stone-500 dark:text-stone-400">By </span>
                      <span className="font-semibold">{item.authorOrOrg}</span>
                    </div>
                  </div>

                  <p className="text-xs leading-relaxed text-stone-600 dark:text-stone-400">
                    {item.description}
                  </p>

                  <div className="text-[10px] font-mono text-stone-400 dark:text-stone-500">
                    {formatUnboxedMetadata(item.tags.map((t) => `#${t}`))}
                  </div>
                </div>

                <div className="pt-3 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between gap-2">
                  {isInternal && item.internalTab ? (
                    <button
                      onClick={() => onSelectTab(item.internalTab!)}
                      className="min-h-11 flex items-center gap-1.5 px-4 rounded-xl text-xs font-bold transition-all active:scale-[0.98] cursor-pointer shadow-xs bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 dark:border-transparent dark:bg-stone-100 dark:hover:bg-white dark:text-stone-900"
                    >
                      <span>Open Page</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-11 flex items-center gap-1.5 px-4 rounded-xl text-xs font-semibold border transition-all active:scale-[0.98] bg-white hover:bg-stone-100 text-stone-800 border-stone-300 dark:bg-stone-900/60 dark:hover:bg-stone-800 dark:text-stone-200 dark:border-stone-800"
                    >
                      <span>Official Source</span>
                      <ExternalLink className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                    </a>
                  ) : (
                    <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
                      Printed Reference
                    </span>
                  )}

                  <button
                    onClick={() => handleCopyCitation(item)}
                    title="Copy full reference citation"
                    className={`min-h-11 flex items-center gap-1.5 px-3 rounded-xl text-xs transition-colors cursor-pointer ${
                      isCopied
                        ? 'font-semibold text-amber-800 dark:text-amber-300'
                        : 'font-medium text-stone-500 hover:text-stone-900 hover:bg-stone-100 dark:text-stone-400 dark:hover:text-white dark:hover:bg-stone-800'
                    }`}
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Copied' : 'Cite'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 4. Scholarly Attribution */}
      <section className="p-5 rounded-2xl border flex flex-col sm:flex-row items-start gap-3.5 bg-amber-950/[0.02] border-amber-900/15 dark:bg-amber-500/[0.03] dark:border-amber-500/20">
        <Info className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs leading-relaxed">
          <span className="font-bold block text-stone-900 dark:text-stone-100">
            Scholarly Integrity &amp; Indigenous Open-Access Commitment
          </span>
          <p className="text-stone-600 dark:text-stone-400">
            The Akkha Magar digital learning platform honors the scholarly research of the Language Commission of Nepal, Tribhuvan University, Nepal Magar Association, and pioneering linguists. All pedagogical materials, audio pronunciations, and Akkha Lipi stroke tracings are created for educational and language revitalization purposes.
          </p>
        </div>
      </section>
    </div>
  );
};
