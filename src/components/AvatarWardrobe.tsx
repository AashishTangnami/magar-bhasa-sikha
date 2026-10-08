import React from 'react';
import { AvatarWardrobeProps, AvatarCategoryFilter } from '../types/avatarWardrobe';
import { AVATAR_CATEGORY_FILTERS } from '../constants/avatarWardrobe';
import { Check, Lock } from 'lucide-react';
import { formatUnboxedMetadata } from '../utils/perception-impeccable-harness';

const getCategoryLabel = (category: string): string => {
  if (category === 'jewelry' || category === 'ornament') return 'Jewelry';
  if (category === 'clothing' || category === 'attire') return 'Attire';
  return 'Headwear';
};

export const AvatarWardrobe: React.FC<AvatarWardrobeProps> = ({
  userStats,
  avatarItems,
  onUnlockItem,
  onToggleEquip,
  className = '',
}) => {
  const [categoryFilter, setCategoryFilter] = React.useState<AvatarCategoryFilter>('all');

  const equippedMundri = avatarItems.find((i) => i.id === 'item-mundri-gold')?.isEquipped;
  const equippedDhugri = avatarItems.find((i) => i.id === 'item-dhugri-floral')?.isEquipped;
  const equippedGhalek = avatarItems.find((i) => i.id === 'item-ghalek-crimson')?.isEquipped;
  const equippedPatuka = avatarItems.find((i) => i.id === 'item-patuka-yellow')?.isEquipped;
  const equippedCholo = avatarItems.find((i) => i.id === 'item-cholo-chaubandi')?.isEquipped;
  const equippedKantha = avatarItems.find((i) => i.id === 'item-kantha-mala')?.isEquipped;
  const equippedSirbandi = avatarItems.find((i) => i.id === 'item-sirbandi-gold')?.isEquipped;
  const equippedTopi = avatarItems.find((i) => i.id === 'item-dhaka-topi')?.isEquipped;
  const equippedBhangra = avatarItems.find((i) => i.id === 'item-bhangra-vest')?.isEquipped;

  const filteredItems = avatarItems.filter((item) => {
    if (categoryFilter === 'all') return true;
    if (categoryFilter === 'jewelry') return ['jewelry', 'ornament'].includes(item.category);
    if (categoryFilter === 'clothing') return ['clothing', 'attire'].includes(item.category);
    return ['headwear', 'accessory'].includes(item.category);
  });

  const equippedCount = avatarItems.filter((i) => i.isEquipped).length;

  return (
    <div id="cultural-avatar-wardrobe" className={`space-y-8 pb-12 ${className}`}>
      {/* Editorial Header */}
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-stone-200 dark:border-stone-800">
        <div className="space-y-2 max-w-2xl">
          <div className="text-[11px] font-mono uppercase tracking-wider text-amber-800 dark:text-amber-400 font-semibold">
            {formatUnboxedMetadata(['पहिरन तथा गहना', 'Heritage Wardrobe', `${avatarItems.length} Regalia`])}
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-stone-900 dark:text-stone-100">
            Magar Cultural Avatar &amp; Attire
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
            Dress the avatar in traditional ornaments, headwear and hand-woven textiles of the Magarat hills. Equip pieces to see them on the live figure.
          </p>
        </div>

        <div className="p-4 rounded-2xl border lg:w-72 shrink-0 flex items-center justify-between gap-4 bg-stone-50/80 border-stone-200 dark:bg-stone-900/60 dark:border-stone-800">
          <div>
            <span className="text-[10px] block font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Gold Balance
            </span>
            <span className="font-bold font-mono tabular-nums text-stone-900 dark:text-white">
              <span className="text-amber-700 dark:text-amber-400">◎</span> {userStats.mundriCount} Mundri
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] block font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Equipped
            </span>
            <span className="font-bold font-mono tabular-nums text-stone-900 dark:text-white">
              {equippedCount} / {avatarItems.length}
            </span>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Live Visualizer on a warm stone pedestal */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center rounded-2xl border p-5 relative overflow-hidden bg-stone-100/70 border-stone-200 dark:bg-stone-950/60 dark:border-stone-800">
          <div className="text-center mb-3 z-10">
            <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Live Preview
            </span>
            <h4 className="text-sm font-heading font-bold text-stone-900 dark:text-white">
              Heritage Attire Visualizer
            </h4>
          </div>

          <div className="relative w-56 h-72 z-10 drop-shadow-md">
            <svg viewBox="0 0 200 260" className="w-full h-full">
              <defs>
                {/* Gold Gradient */}
                <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF275" />
                  <stop offset="60%" stopColor="#FFCC00" />
                  <stop offset="100%" stopColor="#D4A000" />
                </linearGradient>

                {/* Crimson Gradient */}
                <linearGradient id="crimsonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E60039" />
                  <stop offset="100%" stopColor="#BC002D" />
                </linearGradient>

                {/* Emerald Gradient */}
                <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#046307" />
                </linearGradient>
              </defs>

              {/* Base Head & Neck (Skin) */}
              <ellipse cx="100" cy="85" rx="36" ry="42" fill="#d99f77" />
              <rect x="88" y="115" width="24" height="28" fill="#c98a5e" rx="4" />

              {/* Shoulders & Torso Base */}
              <path
                d="M 50,140 Q 100,130 150,140 L 165,250 L 35,250 Z"
                fill={equippedCholo ? 'url(#crimsonGrad)' : '#2e3538'}
              />

              {/* Chaubandi Cholo ties */}
              {equippedCholo && (
                <g stroke="#FFCC00" strokeWidth="2">
                  <line x1="85" y1="145" x2="115" y2="175" />
                  <line x1="85" y1="165" x2="110" y2="190" />
                  <circle cx="85" cy="145" r="2.5" fill="#FFCC00" />
                  <circle cx="85" cy="165" r="2.5" fill="#FFCC00" />
                </g>
              )}

              {/* Bhangra Cross Pouch Vest */}
              {equippedBhangra && (
                <path
                  d="M 60,138 L 140,240 L 155,240 L 75,138 Z"
                  fill="#dfd3be"
                  stroke="#8B4513"
                  strokeWidth="1.5"
                />
              )}

              {/* Ghalek (Traditional Diagonal Wrap Cloth in Crimson & Emerald) */}
              {equippedGhalek && (
                <g>
                  <path
                    d="M 65,138 L 145,138 L 165,250 L 45,250 Z"
                    fill="url(#emeraldGrad)"
                    opacity="0.9"
                  />
                  {/* Diagonal Ghalek Ribbon */}
                  <path
                    d="M 60,136 L 155,245 L 140,248 L 48,140 Z"
                    fill="url(#crimsonGrad)"
                  />
                  {/* Gold Dhaka Weave Border */}
                  <line
                    x1="60"
                    y1="136"
                    x2="155"
                    y2="245"
                    stroke="#FFCC00"
                    strokeWidth="2.5"
                  />
                </g>
              )}

              {/* Patuka (Sun Yellow Waist Sash) */}
              {equippedPatuka && (
                <g>
                  <rect
                    x="48"
                    y="225"
                    width="104"
                    height="24"
                    fill="url(#goldGrad)"
                    rx="3"
                    stroke="#BC002D"
                    strokeWidth="1.5"
                  />
                  <line x1="50" y1="233" x2="150" y2="233" stroke="#BC002D" strokeWidth="1" strokeDasharray="3 3" />
                </g>
              )}

              {/* Hair Base */}
              <path
                d="M 64,85 C 64,48 136,48 136,85 C 136,60 120,40 100,40 C 80,40 64,60 64,85 Z"
                fill="#1A1A1A"
              />

              {/* Dhaka Topi */}
              {equippedTopi && (
                <path
                  d="M 64,65 Q 100,30 136,65 L 132,48 Q 100,20 68,48 Z"
                  fill="url(#crimsonGrad)"
                  stroke="#FFCC00"
                  strokeWidth="1.5"
                />
              )}

              {/* Facial features */}
              <path d="M 80,82 Q 88,78 94,82" stroke="#1A1A1A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M 106,82 Q 112,78 120,82" stroke="#1A1A1A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <path d="M 99,82 L 97,94 L 102,94" stroke="#b0754c" strokeWidth="1.5" fill="none" />
              <path d="M 94,106 Q 100,110 106,106" stroke="#BC002D" strokeWidth="2" fill="none" strokeLinecap="round" />
              <circle cx="100" cy="74" r="2.5" fill="#FFCC00" />

              {/* Kantha Mala */}
              {equippedKantha && (
                <g>
                  <path
                    d="M 85,124 Q 100,144 115,124"
                    stroke="#BC002D"
                    strokeWidth="5"
                    fill="none"
                  />
                  {[87, 94, 100, 106, 113].map((cx, i) => (
                    <circle
                      key={i}
                      cx={cx}
                      cy={126 + (i === 2 ? 8 : i === 1 || i === 3 ? 5 : 0)}
                      r={i % 2 === 0 ? 4 : 3}
                      fill="url(#goldGrad)"
                      stroke="#8B0000"
                      strokeWidth="0.5"
                    />
                  ))}
                </g>
              )}

              {/* Sirbandi */}
              {equippedSirbandi && (
                <g>
                  <path
                    d="M 68,62 Q 100,75 132,62"
                    stroke="url(#goldGrad)"
                    strokeWidth="2.5"
                    fill="none"
                  />
                  <circle cx="100" cy="72" r="4.5" fill="url(#goldGrad)" stroke="#BC002D" strokeWidth="1" />
                </g>
              )}

              {/* Mundri */}
              {equippedMundri && (
                <g>
                  <circle cx="62" cy="94" r="6" stroke="url(#goldGrad)" strokeWidth="3" fill="none" />
                  <circle cx="138" cy="94" r="6" stroke="url(#goldGrad)" strokeWidth="3" fill="none" />
                </g>
              )}

              {/* Dhugri */}
              {equippedDhugri && (
                <g>
                  <circle cx="95" cy="94" r="3" fill="url(#goldGrad)" stroke="#BC002D" strokeWidth="0.8" />
                  <circle cx="95" cy="94" r="1" fill="#FFFFFF" />
                </g>
              )}
            </svg>
          </div>
          <div className="w-40 h-2 rounded-full bg-stone-300/60 dark:bg-stone-800 blur-[2px] -mt-1" />
        </div>

        {/* Right: Wardrobe Items */}
        <div className="lg:col-span-7 space-y-4">
          {/* Segmented Category Control */}
          <div className="flex items-center gap-1 p-1 rounded-xl border overflow-x-auto bg-stone-100/80 border-stone-200 dark:bg-stone-900/60 dark:border-stone-800">
            {AVATAR_CATEGORY_FILTERS.map((filter) => {
              const isActive = categoryFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setCategoryFilter(filter.id)}
                  className={`min-h-11 flex-1 whitespace-nowrap px-3 rounded-lg text-xs transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-stone-950 font-bold shadow-xs dark:bg-stone-800 dark:text-stone-100'
                      : 'font-medium text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100'
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[480px] overflow-y-auto pr-1">
            {filteredItems.map((item) => {
              const canAfford = userStats.mundriCount >= item.costMundri;

              return (
                <div
                  key={item.id}
                  id={`wardrobe-item-${item.id}`}
                  className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
                    item.isEquipped
                      ? 'bg-amber-50/60 border-amber-300 ring-1 ring-amber-400/40 dark:bg-amber-500/10 dark:border-amber-500/30 dark:ring-amber-400/30'
                      : item.isUnlocked
                      ? 'bg-white border-stone-200 hover:border-stone-300 dark:bg-stone-900/60 dark:border-stone-800 dark:hover:border-stone-700'
                      : 'bg-stone-50 border-stone-200 opacity-75 dark:bg-stone-950/40 dark:border-stone-800/60'
                  }`}
                >
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1.5">
                      {getCategoryLabel(item.category)}
                    </div>
                    <h5 className="font-heading font-bold text-xs text-stone-900 dark:text-white">
                      {item.name}{' '}
                      <span className="font-devanagari font-normal text-stone-500 dark:text-stone-400">
                        ({item.nepaliName})
                      </span>
                    </h5>
                    <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed mt-1">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-stone-600 dark:text-stone-300">
                      <span className="text-amber-700 dark:text-amber-400">◎</span>{' '}
                      {item.costMundri === 0 ? 'Free' : `${item.costMundri} Mundri`}
                    </span>

                    {item.isUnlocked ? (
                      <button
                        onClick={() => onToggleEquip(item)}
                        className={`min-h-11 flex items-center gap-1.5 px-3.5 rounded-xl text-xs font-semibold border transition-all active:scale-[0.98] cursor-pointer ${
                          item.isEquipped
                            ? 'bg-white border-amber-300 text-amber-800 dark:bg-stone-900 dark:border-amber-500/30 dark:text-amber-300'
                            : 'bg-white hover:bg-stone-100 border-stone-300 text-stone-800 dark:bg-stone-900/60 dark:hover:bg-stone-800 dark:border-stone-800 dark:text-stone-200'
                        }`}
                      >
                        {item.isEquipped && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                        <span>{item.isEquipped ? 'Equipped' : 'Equip'}</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          if (canAfford) onUnlockItem(item);
                        }}
                        disabled={!canAfford}
                        title={canAfford ? undefined : `You need ${item.costMundri} Mundri. Complete lessons to earn more.`}
                        className={`min-h-11 flex items-center gap-1.5 px-3.5 rounded-xl text-xs font-bold transition-all active:scale-[0.98] ${
                          canAfford
                            ? 'bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 dark:border-transparent dark:bg-stone-100 dark:hover:bg-white dark:text-stone-900 cursor-pointer shadow-xs'
                            : 'bg-stone-100 text-stone-400 dark:bg-stone-900 dark:text-stone-600 cursor-not-allowed'
                        }`}
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>Unlock</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
