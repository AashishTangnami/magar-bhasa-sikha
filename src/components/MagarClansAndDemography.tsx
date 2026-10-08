import React, { useState, useMemo, useRef } from 'react';
import { matchSearchIndex } from '../utils/search-index';
import { CLAN_SEARCH_INDEX } from '../utils/search-indexes';
import {
  MAGAR_CLANS_DATA,
  DEMOGRAPHIC_METRICS,
  PROVINCE_DISTRIBUTION,
  DISTRICT_HIGHLIGHTS,
  WIKIPEDIA_MAGAR_CLANS_SOURCE,
  MagarClan,
} from '../data/clansAndDemographyData';
import {
  MagarClansAndDemographyProps,
  ClanDemographyTab,
  ClanDialectFilter,
} from '../types/clansAndDemography';
import {
  Users,
  Search,
  Shield,
  MapPin,
  HeartHandshake,
  Check,
  Copy,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Flame,
  Crown,
  Info,
  X,
} from 'lucide-react';
import { formatUnboxedMetadata } from '../utils/perception-impeccable-harness';
import { useSafeTimeout } from '../hooks/useSafeTimeout';

// Serene stone surface tokens (shared with Home hub aesthetic)
const CARD = 'bg-white border-stone-200 dark:bg-stone-900/60 dark:border-stone-800';
const INSET = 'bg-stone-50 border-stone-200 dark:bg-stone-950/60 dark:border-stone-800';
const SEGMENT_TRACK = 'bg-stone-100/80 border-stone-200 dark:bg-stone-900/60 dark:border-stone-800';
const SEGMENT_ACTIVE = 'bg-white text-stone-950 font-bold shadow-xs dark:bg-stone-800 dark:text-stone-100';
const SEGMENT_IDLE = 'font-medium text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100';
const BULLET = 'w-1 h-1 mt-1.5 rounded-full shrink-0 bg-amber-600 dark:bg-amber-400';

const CLAN_TABS = [
  { id: 'clans', label: 'Clans & Septs', icon: Users },
  { id: 'demographics', label: 'Demographics', icon: BarChart3 },
  { id: 'customs', label: 'Kinship & Marriage', icon: HeartHandshake },
] as const satisfies readonly { id: ClanDemographyTab; label: string; icon: typeof Users }[];

export const MagarClansAndDemography: React.FC<MagarClansAndDemographyProps> = ({
  className = '',
}) => {

  const [activeTab, setActiveTab] = useState<ClanDemographyTab>('clans');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDialectFilter, setSelectedDialectFilter] = useState<ClanDialectFilter>('All');
  const [expandedClanId, setExpandedClanId] = useState<string | null>('thapa');
  const [copiedClanId, setCopiedClanId] = useState<string | null>(null);
  const timers = useSafeTimeout();

  // Filtered Clans based on search & dialect filter
  // Search hits (clan + sub-clan fields) from the prebuilt index into a reusable per-instance mask
  const searchMaskRef = useRef<Uint8Array>(new Uint8Array(MAGAR_CLANS_DATA.length));
  const filteredClans = useMemo(() => {
    const mask = searchMaskRef.current;
    matchSearchIndex(CLAN_SEARCH_INDEX, searchQuery, mask);
    return MAGAR_CLANS_DATA.filter(
      (clan, i) =>
        mask[i] === 1 &&
        (selectedDialectFilter === 'All' ||
          clan.primaryDialect === selectedDialectFilter ||
          clan.primaryDialect === 'Dhut & Kham' ||
          clan.primaryDialect === 'All')
    );
  }, [searchQuery, selectedDialectFilter]);

  // Total sub-clans count across database
  const totalSubClansCount = useMemo(() => {
    return MAGAR_CLANS_DATA.reduce((acc, curr) => acc + curr.subClans.length, 0);
  }, []);

  const handleCopyClan = (clan: MagarClan) => {
    const text = `${clan.name} (${clan.nameNepali})
Primary Dialect: ${clan.primaryDialect}
Regions: ${clan.primaryRegions.join(', ')}
Deity / Kulpuja: ${clan.deityOrKulpuja}
Sub-Clans (${clan.subClans.length}): ${clan.subClans.map((s) => `${s.name} (${s.nameNepali})`).join(', ')}`;

    navigator.clipboard.writeText(text);
    setCopiedClanId(clan.id);
    timers.schedule('copied', () => setCopiedClanId(null), 2000);
  };


  return (
    <div id="magar-clans-demography-page" className={`space-y-8 pb-12 ${className}`}>
      {/* 1. Editorial Header & Segmented Switcher */}
      <section className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-stone-200 dark:border-stone-800">
          <div className="space-y-2 max-w-3xl">
            <div className="text-[11px] font-mono uppercase tracking-wider text-amber-800 dark:text-amber-400 font-semibold">
              {formatUnboxedMetadata(['मगर थर, उपथर तथा जनसाङ्ख्यिकी', `${MAGAR_CLANS_DATA.length} Major Clans`, `${totalSubClansCount}+ Sub-clans`, '2021 Census'])}
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-stone-900 dark:text-stone-100">
              Magar Clans, Sub-Clans &amp; Demography
            </h1>
            <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
              A genealogical and demographic explorer documenting the historical lineages (सात थर र उपथरहरू), sacred Kulpuja traditions, and province-wise census distribution of the Magar indigenous nation.
            </p>
          </div>

          <div className={`flex items-center gap-1 p-1 rounded-xl border shrink-0 overflow-x-auto ${SEGMENT_TRACK}`}>
            {CLAN_TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`min-h-11 whitespace-nowrap flex items-center gap-1.5 px-3.5 rounded-lg text-xs transition-all cursor-pointer ${
                    activeTab === tab.id ? SEGMENT_ACTIVE : SEGMENT_IDLE
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Demographic Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {DEMOGRAPHIC_METRICS.map((metric, index) => (
            <div key={index} className={`p-4 rounded-xl border ${CARD}`}>
              <div className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
                {metric.badge}
              </div>
              <div className="text-2xl font-black font-mono tabular-nums tracking-tight text-stone-900 dark:text-white">
                {metric.value}
              </div>
              <div className="text-xs font-bold mt-1 text-stone-900 dark:text-white">{metric.title}</div>
              <div className="text-[11px] font-devanagari mt-0.5 text-stone-500 dark:text-stone-400">
                {metric.titleNepali}
              </div>
              <div className="text-[11px] mt-1 text-stone-600 dark:text-stone-400">
                {metric.subtitle}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TAB 1: CLANS & SUB-CLANS DIRECTORY */}
      {activeTab === 'clans' && (
        <section className="space-y-5 animate-fadeIn">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 dark:text-stone-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search clan, sub-clan or district (e.g. Tangnami, Darlami, Arghakhanchi, Gaha)"
                aria-label="Search clans"
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

            <div className={`flex items-center gap-1 p-1 rounded-xl border shrink-0 overflow-x-auto ${SEGMENT_TRACK}`}>
              {(['All', 'Dhut', 'Kham', 'Kaike'] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDialectFilter(d)}
                  className={`min-h-11 whitespace-nowrap px-3.5 rounded-lg text-xs transition-all cursor-pointer ${
                    selectedDialectFilter === d ? SEGMENT_ACTIVE : SEGMENT_IDLE
                  }`}
                >
                  {d === 'All' ? 'All Dialects' : d}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {filteredClans.length === 0 ? (
              <div className={`p-8 text-center rounded-2xl border ${CARD}`}>
                <Info className="w-6 h-6 mx-auto text-stone-400 mb-2" />
                <p className="text-sm font-semibold text-stone-900 dark:text-white">No clan or sub-clan matched your search.</p>
                <p className="text-xs mt-1 text-stone-600 dark:text-stone-400">
                  Try an English or Devanagari sub-clan name (e.g. Gaha, गाहा, Sinjali).
                </p>
              </div>
            ) : (
              filteredClans.map((clan) => {
                const isExpanded = expandedClanId === clan.id;
                const isCopied = copiedClanId === clan.id;

                return (
                  <div
                    key={clan.id}
                    className={`rounded-xl border transition-all overflow-hidden ${
                      isExpanded
                        ? 'bg-white border-stone-300 dark:bg-stone-900/60 dark:border-stone-700'
                        : `${CARD} hover:border-stone-300 dark:hover:border-stone-700`
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedClanId(isExpanded ? null : clan.id)}
                      aria-expanded={isExpanded}
                      className="min-h-11 w-full p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left cursor-pointer select-none"
                    >
                      <div className="flex items-start sm:items-center gap-3">
                        <div className="w-10 h-10 rounded-xl border flex items-center justify-center font-black text-lg font-heading shrink-0 bg-amber-50 border-amber-200 text-amber-800 dark:bg-stone-950 dark:border-stone-800 dark:text-amber-400">
                          {clan.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="text-base font-bold font-heading text-stone-900 dark:text-white">
                            {clan.name}{' '}
                            <span className="font-devanagari font-normal text-sm text-stone-500 dark:text-stone-400">
                              ({clan.nameNepali})
                            </span>
                          </h3>
                          <div className="text-[11px] font-mono text-stone-500 dark:text-stone-400 mt-0.5">
                            {formatUnboxedMetadata([`${clan.subClans.length} sub-clans`, `${clan.primaryDialect} branch`, clan.primaryRegions.slice(0, 3).join(', ')])}
                          </div>
                        </div>
                      </div>

                      <span className="flex items-center gap-1 self-end sm:self-center text-xs font-semibold text-amber-800 dark:text-amber-400">
                        <span>{isExpanded ? 'Collapse' : 'Lineage'}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </span>
                    </button>

                    {isExpanded && (
                      <div className="p-4 sm:p-6 border-t space-y-5 border-stone-200 dark:border-stone-800">
                        <p className="text-xs sm:text-sm leading-relaxed text-stone-700 dark:text-stone-300">
                          {clan.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className={`p-3.5 rounded-xl border text-xs space-y-1 ${INSET}`}>
                            <span className="font-mono text-[10px] uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
                              Historical Role · Magarat Legacy
                            </span>
                            <p className="text-stone-700 dark:text-stone-300 leading-relaxed">{clan.historicalRole}</p>
                          </div>
                          <div className={`p-3.5 rounded-xl border text-xs space-y-1 ${INSET}`}>
                            <span className="font-mono text-[10px] uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
                              Sacred Deities · Kulpuja
                            </span>
                            <p className="text-stone-700 dark:text-stone-300 leading-relaxed">{clan.deityOrKulpuja}</p>
                          </div>
                        </div>

                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="text-xs font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                              <Shield className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                              <span>
                                Documented Sub-Clans{' '}
                                <span className="font-devanagari font-normal text-stone-500 dark:text-stone-400">(उपथरहरू तथा पाचा)</span>
                              </span>
                            </h4>
                            <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400">
                              {clan.subClans.length} lineages
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                            {clan.subClans.map((sub, idx) => (
                              <div key={idx} className={`p-3 rounded-xl border text-xs ${INSET}`}>
                                <div className="flex items-baseline justify-between gap-1">
                                  <span className="font-bold text-sm text-stone-900 dark:text-white">{sub.name}</span>
                                  <span className="font-devanagari text-xs text-stone-500 dark:text-stone-400">{sub.nameNepali}</span>
                                </div>
                                {sub.historicalRegion && (
                                  <div className="text-[10px] font-mono flex items-center gap-1 mt-0.5 text-stone-500 dark:text-stone-400">
                                    <MapPin className="w-2.5 h-2.5" />
                                    <span>{sub.historicalRegion}</span>
                                  </div>
                                )}
                                {sub.meaningOrNote && (
                                  <div className="text-[11px] mt-1.5 pt-1.5 border-t border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400">
                                    {sub.meaningOrNote}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-stone-100 dark:border-stone-800/80 flex flex-wrap items-center justify-between gap-2">
                          <div className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
                            <span className="uppercase tracking-wider">Key districts · </span>
                            <span className="text-stone-700 dark:text-stone-300">{formatUnboxedMetadata(clan.primaryRegions)}</span>
                          </div>

                          <button
                            onClick={() => handleCopyClan(clan)}
                            className={`min-h-11 flex items-center gap-1.5 px-3 rounded-xl text-xs transition-colors cursor-pointer ${
                              isCopied
                                ? 'font-semibold text-amber-800 dark:text-amber-300'
                                : 'font-medium text-stone-500 hover:text-stone-900 hover:bg-stone-100 dark:text-stone-400 dark:hover:text-white dark:hover:bg-stone-800'
                            }`}
                          >
                            {isCopied ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{isCopied ? 'Lineage Copied' : 'Copy Clan Details'}</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
          <p className="text-[11px] text-stone-500 dark:text-stone-400">
            Sub-clan names compiled from{' '}
            <a
              href={WIKIPEDIA_MAGAR_CLANS_SOURCE}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-amber-800 dark:text-amber-400 hover:underline"
            >
              Wikipedia · Magars
            </a>{' '}
            (CC BY-SA 4.0).
          </p>
        </section>
      )}

      {/* TAB 2: PROVINCE & DISTRICT DEMOGRAPHICS */}
      {activeTab === 'demographics' && (
        <div className="space-y-10 animate-fadeIn">
          <section className="space-y-4">
            <div>
              <h2 className="text-base font-bold font-heading text-stone-900 dark:text-stone-100">
                Province-Wise Population Distribution · प्रदेशगत वितरण
              </h2>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                {formatUnboxedMetadata(['National Census of Nepal 2021 (राष्ट्रिय जनगणना २०७८)', 'Total 2,013,708', `${PROVINCE_DISTRIBUTION.length} provinces`])}
              </p>
            </div>

            <div className={`rounded-xl border divide-y divide-stone-200 dark:divide-stone-800 ${CARD}`}>
              {PROVINCE_DISTRIBUTION.map((prov, idx) => (
                <div key={idx} className="p-4 space-y-2.5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div className="text-sm font-bold text-stone-900 dark:text-white">
                      {prov.province}{' '}
                      <span className="font-devanagari font-normal text-xs text-stone-500 dark:text-stone-400">
                        ({prov.provinceNepali})
                      </span>
                    </div>
                    <div className="text-sm font-bold font-mono tabular-nums text-stone-900 dark:text-white">
                      {prov.population.toLocaleString()}{' '}
                      <span className="font-normal text-stone-500 dark:text-stone-400">· {prov.percentage}%</span>
                    </div>
                  </div>

                  <div className="w-full h-1.5 rounded-full overflow-hidden bg-stone-200 dark:bg-stone-800">
                    <div
                      className="h-full rounded-full bg-amber-600 dark:bg-amber-400 transition-all duration-1000"
                      style={{ width: `${prov.percentage}%` }}
                    />
                  </div>

                  <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">{prov.notes}</p>
                  <div className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
                    <span className="uppercase tracking-wider">High density · </span>
                    <span className="text-stone-700 dark:text-stone-300">{formatUnboxedMetadata(prov.keyDistricts)}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="text-base font-bold font-heading text-stone-900 dark:text-stone-100">
                Top Magar Concentration Districts · प्रमुख मगर बाहुल्य जिल्लाहरू
              </h2>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                Districts with high historical Magar demographic density and clan centers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {DISTRICT_HIGHLIGHTS.map((dh, i) => (
                <div key={i} className={`p-4 rounded-xl border space-y-3 ${CARD}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold font-heading text-stone-900 dark:text-white">{dh.district}</h3>
                      <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
                        {dh.province} Province
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold font-mono tabular-nums text-stone-900 dark:text-white block">
                        {dh.magarPercentage}
                      </span>
                      <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400">District ratio</span>
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-stone-100 dark:border-stone-800/80 space-y-1.5 text-xs">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400">Magar population</span>
                      <span className="font-bold font-mono tabular-nums text-stone-900 dark:text-white">{dh.magarPopulation}</span>
                    </div>
                    <div className="text-[11px] text-stone-600 dark:text-stone-400">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400">Prominent clans · </span>
                      {formatUnboxedMetadata(dh.prominentClans)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* TAB 3: KINSHIP, MARRIAGE & KULPUJA CUSTOMS */}
      {activeTab === 'customs' && (
        <div className="space-y-4 animate-fadeIn">
          <section className="p-6 rounded-2xl border space-y-3 bg-amber-950/[0.02] border-amber-900/15 dark:bg-amber-500/[0.03] dark:border-amber-500/20">
            <div className="flex items-start gap-2">
              <HeartHandshake className="w-4 h-4 mt-1 shrink-0 text-amber-700 dark:text-amber-400" />
              <h2 className="text-base font-bold font-heading text-stone-900 dark:text-stone-100">
                Magar Kinship &amp; Matrilateral Cross-Cousin Marriage{' '}
                <span className="font-devanagari font-normal text-sm text-stone-500 dark:text-stone-400">
                  (मामा-चेली फुपु-चेली विवाह परम्परा)
                </span>
              </h2>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-stone-700 dark:text-stone-300">
              In traditional Magar society, marriage is rooted in strong exogamous clan systems (सगोत्रीय विवाह निषेध) paired with preferred <strong className="font-semibold text-stone-900 dark:text-white">matrilateral cross-cousin marriage</strong> (मामाको छोरीसँग विवाह गर्ने प्राचीन प्रथा). This customary practice preserves inter-clan kinship alliances (*Solti-Soltina* relationships), maintains land rights, and fosters lifelong bonds between allied Magar lineages.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className={`p-5 rounded-xl border space-y-3 ${CARD}`}>
              <div className="flex items-start gap-2">
                <Flame className="w-4 h-4 mt-0.5 shrink-0 text-amber-700 dark:text-amber-400" />
                <h3 className="text-sm font-bold font-heading text-stone-900 dark:text-white">
                  Kulpuja &amp; Pitri Puja{' '}
                  <span className="font-devanagari font-normal text-stone-500 dark:text-stone-400">(कुलपूजा तथा कुल देवता)</span>
                </h3>
              </div>
              <p className="text-xs leading-relaxed text-stone-600 dark:text-stone-400">
                Every Magar clan observes periodic <em>Kulpuja</em> (ancestral rites) every 3, 5, or 12 years. Rituals honor the <em>Baraha</em> (mountain boar spirit), <em>Sime-Bhume</em> (earth and spring deities), and ancient ancestors (*Pitri*). Scribes and elders gather to chant oral genealogies (*Pacha*) and cleanse household shrines.
              </p>
              <ul className="text-xs space-y-1.5 text-stone-700 dark:text-stone-300 pt-1">
                <li className="flex items-start gap-2">
                  <span className={BULLET} />
                  <span>Strict prohibition of within-clan (*Sagotra*) marriage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={BULLET} />
                  <span>Use of pure fermented millet brew (*Jhad/Chhyang*) in sacred offerings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={BULLET} />
                  <span>Erection of sacred *Linga* wood totems during harvest festivals</span>
                </li>
              </ul>
            </div>

            <div className={`p-5 rounded-xl border space-y-3 ${CARD}`}>
              <div className="flex items-start gap-2">
                <Crown className="w-4 h-4 mt-0.5 shrink-0 text-amber-700 dark:text-amber-400" />
                <h3 className="text-sm font-bold font-heading text-stone-900 dark:text-white">
                  Clan Specialization in 12 &amp; 18 Magarat{' '}
                  <span className="font-devanagari font-normal text-stone-500 dark:text-stone-400">(राज्य सञ्चालनमा भूमिका)</span>
                </h3>
              </div>
              <p className="text-xs leading-relaxed text-stone-600 dark:text-stone-400">
                In the medieval confederacies of <em>Barha Magarat</em> (Gandaki) and <em>Athara Magarat</em> (Karnali/Rapti), governance was distributed harmoniously among clans:
              </p>
              <ul className="text-xs space-y-1.5 text-stone-700 dark:text-stone-300 pt-1">
                <li className="flex items-start gap-2">
                  <span className={BULLET} />
                  <span><strong className="text-stone-900 dark:text-white">Thapa &amp; Rana</strong>: State administrators, ambassadors &amp; kingdom rulers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={BULLET} />
                  <span><strong className="text-stone-900 dark:text-white">Ale</strong>: Scribes of Akkha Lipi, priests &amp; temple keepers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={BULLET} />
                  <span><strong className="text-stone-900 dark:text-white">Pun, Gharti &amp; Budha</strong>: Mine masters, highland sentinels &amp; shamans</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className={BULLET} />
                  <span><strong className="text-stone-900 dark:text-white">Roka</strong>: Border vanguard officers &amp; arbiters of customary law</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
