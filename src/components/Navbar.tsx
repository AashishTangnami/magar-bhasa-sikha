import React, { useEffect, useRef, useState } from 'react';
import { DialectId } from '../types';
import { DIALECTS } from '../data/dialectData';
import { useTheme } from '../context/ThemeContext';
import {
  Sparkles,
  Flame,
  BookOpen,
  Edit3,
  Compass,
  ScrollText,
  Keyboard,
  Crown,
  Languages,
  ChevronDown,
  Menu,
  X,
  Sun,
  Moon,
  Home,
  Bookmark,
  Users,
  MessageSquare,
} from 'lucide-react';
import { NavbarProps } from '../types/navbar';
import { PRIMARY_NAV_ITEMS, SECONDARY_NAV_ITEMS } from '../constants/navbar';
import { WORKSPACES, getWorkspaceForTab } from '../utils/ui-makeover';
import { bindDismiss } from '../utils/dismiss';

const getNavIcon = (iconName: string) => {
  switch (iconName) {
    case 'Home':
      return <Home className="w-3.5 h-3.5" />;
    case 'Languages':
      return <Languages className="w-3.5 h-3.5" />;
    case 'Edit3':
      return <Edit3 className="w-3.5 h-3.5" />;
    case 'Compass':
      return <Compass className="w-3.5 h-3.5" />;
    case 'ScrollText':
      return <ScrollText className="w-3.5 h-3.5" />;
    case 'Users':
      return <Users className="w-3.5 h-3.5" />;
    case 'Keyboard':
      return <Keyboard className="w-3.5 h-3.5" />;
    case 'Crown':
      return <Crown className="w-3.5 h-3.5" />;
    case 'Bookmark':
      return <Bookmark className="w-3.5 h-3.5" />;
    case 'BookOpen':
      return <BookOpen className="w-3.5 h-3.5" />;
    case 'MessageSquare':
      return <MessageSquare className="w-3.5 h-3.5" />;
    default:
      return <Sparkles className="w-3.5 h-3.5" />;
  }
};

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  userStats,
  onSelectDialect,
  onOpenAiGuru,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dialectDropdownOpen, setDialectDropdownOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const { theme, isBright, toggleTheme } = useTheme();

  const moreRef = useRef<HTMLDivElement>(null);
  const dialectRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLButtonElement>(null);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);
  const mobileBackdropRef = useRef<HTMLDivElement>(null);
  const anyMenuOpen = moreDropdownOpen || dialectDropdownOpen || mobileMenuOpen;

  // Close menus on outside press, Escape, or page scroll (a press inside a menu keeps it open).
  useEffect(() => {
    if (!anyMenuOpen) return;
    return bindDismiss(window, (node) => {
      const inside = (ref: React.RefObject<HTMLElement | null>) =>
        node instanceof Node && ref.current !== null && ref.current.contains(node);
      if (!inside(moreRef)) setMoreDropdownOpen(false);
      if (!inside(dialectRef)) setDialectDropdownOpen(false);
      // The backdrop closes the drawer on its own click, so the dismiss tap never reaches the page.
      if (!inside(mobileToggleRef) && !inside(mobileDrawerRef) && !inside(mobileBackdropRef)) setMobileMenuOpen(false);
    });
  }, [anyMenuOpen]);

  const activeDialect = DIALECTS[userStats.activeDialect] || DIALECTS.dhut;

  const handleDialectChange = (id: DialectId) => {
    onSelectDialect(id);
    setDialectDropdownOpen(false);
  };

  const handleThemeToggle = () => {
    toggleTheme();
  };

  const primaryNavItems = PRIMARY_NAV_ITEMS.map((item) => ({
    id: item.id,
    label: item.label,
    icon: getNavIcon(item.iconName),
  }));

  const secondaryNavItems = SECONDARY_NAV_ITEMS.map((item) => ({
    id: item.id,
    label: item.label,
    icon: getNavIcon(item.iconName),
  }));

  const allNavItems = [...primaryNavItems, ...secondaryNavItems];
  const currentWorkspaceId = getWorkspaceForTab(currentTab);

  return (
    <>
    {/* Drawer backdrop sits outside <header>: the header's backdrop-blur makes it the containing
        block for `fixed` children, which would collapse this to the header's 56px height. */}
    {mobileMenuOpen && (
      <div
        ref={mobileBackdropRef}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
        className="lg:hidden fixed inset-0 z-30 bg-stone-950/40"
      />
    )}
    <header className={`sticky top-0 z-40 w-full border-b transition-all ${
      isBright
        ? 'bg-white/95 backdrop-blur-md border-slate-200 text-slate-900 shadow-xs'
        : 'bg-stone-950/95 backdrop-blur-md border-stone-800 text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 gap-2 sm:gap-4">
          
          {/* Brand Logo - Minimalist & Crisp */}
          <div
            id="brand-logo"
            onClick={() => {
              onSelectTab('home');
            }}
            className="flex items-center gap-2.5 cursor-pointer select-none min-w-0 group"
          >
            <span className="font-bold text-xl text-amber-700 dark:text-amber-400 font-akkha">
              𑀅
            </span>
            <div className="flex flex-col min-w-0 max-[359px]:hidden">
              <span className={`font-heading font-black text-sm tracking-tight transition-colors ${
                isBright ? 'text-slate-900 group-hover:text-amber-700' : 'text-white group-hover:text-amber-400'
              }`}>
                Akkha Magar
              </span>
              <span className={`text-[9px] font-mono -mt-1 hidden sm:block ${
                isBright ? 'text-slate-500' : 'text-gray-400'
              }`}>
                अक्खा मगर प्रतिष्ठान
              </span>
            </div>
          </div>

          {/* Center: Clean Direct Navigation (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1">
            {primaryNavItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => onSelectTab(item.id)}
                  className={`min-h-11 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none active:scale-[0.98] ${
                    isActive
                      ? isBright
                        ? 'bg-amber-100/90 text-amber-950 font-bold border border-amber-300/80 shadow-xs'
                        : 'bg-amber-500/15 text-amber-300 font-bold border border-amber-500/30 shadow-xs'
                      : isBright
                      ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] border border-transparent'
                  }`}
                >
                  <span className={isActive ? (isBright ? 'text-amber-800' : 'text-amber-400') : (isBright ? 'text-slate-400' : 'text-slate-500')}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* "More" dropdown for secondary modules */}
            <div ref={moreRef} className="relative">
              <button
                id="nav-tab-more"
                onClick={() => setMoreDropdownOpen((prev) => !prev)}
                className={`min-h-11 flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                  secondaryNavItems.some((item) => item.id === currentTab)
                    ? isBright
                      ? 'bg-amber-100/90 text-amber-950 font-bold border-amber-300/80 shadow-xs'
                      : 'bg-amber-500/15 text-amber-300 font-bold border-amber-500/30 shadow-xs'
                    : isBright
                    ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border-slate-200'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] border-white/10'
                }`}
              >
                <span>More</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {moreDropdownOpen && (
                <div
                  className={`absolute right-0 mt-1.5 w-56 rounded-2xl shadow-xl p-1.5 z-50 animate-in fade-in-50 border ${
                    isBright
                      ? 'bg-white border-slate-200 shadow-slate-200 text-slate-800'
                      : 'bg-stone-900 border-stone-800 text-white'
                  }`}
                >
                  <div className={`px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider ${
                    isBright ? 'text-slate-500' : 'text-gray-400'
                  }`}>
                    Extended Modules
                  </div>
                  {secondaryNavItems.map((item) => {
                    const isActive = currentTab === item.id;
                    return (
                      <button
                        key={item.id}
                        id={`nav-tab-${item.id}`}
                        onClick={() => {
                          onSelectTab(item.id);
                          setMoreDropdownOpen(false);
                        }}
                        className={`w-full min-h-11 flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-colors cursor-pointer ${
                          isActive
                            ? isBright
                              ? 'bg-amber-100 text-amber-950 font-bold'
                              : 'bg-amber-500/20 text-amber-300 font-semibold'
                            : isBright
                            ? 'text-slate-700 hover:bg-slate-100'
                            : 'text-gray-400 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <span className={isActive ? (isBright ? 'text-amber-800' : 'text-amber-400') : 'text-gray-400'}>
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right Section: Minimalist Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            
            {/* Dialect Selector Button */}
            <div ref={dialectRef} className="relative">
              <button
                id="dialect-selector-btn"
                onClick={() => setDialectDropdownOpen((prev) => !prev)}
                className={`flex items-center gap-1.5 whitespace-nowrap px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors border ${
                  isBright
                    ? 'text-slate-700 bg-slate-100/80 hover:bg-slate-200/70 border-slate-200'
                    : 'text-gray-300 hover:text-white hover:bg-white/[0.06] border-white/10'
                }`}
                title="Change active dialect"
              >
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="font-semibold">{activeDialect.name}</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </button>

              {dialectDropdownOpen && (
                <div className={`absolute right-0 mt-1.5 w-48 rounded-2xl shadow-xl p-1.5 z-50 animate-in fade-in-50 border ${
                  isBright
                    ? 'bg-white border-slate-200 shadow-slate-200 text-slate-800'
                    : 'bg-stone-900 border-stone-800 text-white'
                }`}>
                  <div className={`px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider ${
                    isBright ? 'text-slate-500' : 'text-gray-400'
                  }`}>
                    Choose Magar Dialect
                  </div>
                  {Object.values(DIALECTS).map((d) => (
                    <button
                      key={d.id}
                      onClick={() => handleDialectChange(d.id)}
                      className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs transition-colors ${
                        userStats.activeDialect === d.id
                          ? isBright
                            ? 'bg-amber-50 text-amber-900 font-bold'
                            : 'bg-white/10 text-white font-medium'
                          : isBright
                          ? 'text-slate-700 hover:bg-slate-100'
                          : 'text-gray-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span>{d.name}</span>
                        <span className="text-[10px] opacity-70 font-devanagari">
                          ({d.nativeName})
                        </span>
                      </div>
                      {userStats.activeDialect === d.id && (
                        <span className="text-amber-700 dark:text-amber-400 text-xs font-bold">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Metrics (Mundri + Streak) */}
            <div className={`hidden sm:flex lg:hidden xl:flex items-center text-xs gap-2 px-2.5 py-1 rounded-xl border ${
              isBright ? 'bg-slate-100/60 border-slate-200 text-slate-700' : 'border-white/5 text-gray-300'
            }`}>
              {/* Mundri */}
              <div
                id="mundri-counter"
                onClick={() => onSelectTab('wardrobe')}
                title="Mundri Gold Rings"
                className="flex items-center gap-1 cursor-pointer hover:text-amber-500 transition-colors"
              >
                <span className="text-amber-500 font-bold">◎</span>
                <span className="font-bold font-mono tabular-nums">
                  {userStats.mundriCount}
                </span>
              </div>

              <span className={isBright ? 'text-slate-300' : 'text-white/20'}>|</span>

              {/* Streak */}
              <div
                id="streak-counter"
                title="Daily Learning Streak"
                className="flex items-center gap-1"
              >
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-bold font-mono tabular-nums">
                  {userStats.streakDays}d
                </span>
              </div>
            </div>

            {/* Theme Toggle Button (Dark / Bright) */}
            <button
              id="theme-toggle-btn"
              onClick={handleThemeToggle}
              className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors border ${
                isBright
                  ? 'bg-amber-50 border-amber-200 text-amber-700 hover:bg-amber-100'
                  : 'bg-white/5 border-white/10 text-amber-300 hover:bg-white/10'
              }`}
              title={isBright ? 'Switch to Dark Theme (अँध्यारो)' : 'Switch to Bright Theme (उज्यालो)'}
              aria-label={isBright ? 'Switch to Dark Theme' : 'Switch to Bright Theme'}
            >
              {isBright ? (
                <Moon className="w-3.5 h-3.5" />
              ) : (
                <Sun className="w-3.5 h-3.5" />
              )}
            </button>

            {/* AI Guruma Clean Button */}
            <button
              id="ai-guru-btn"
              onClick={onOpenAiGuru}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all shadow-xs active:scale-95 ${
                isBright
                  ? 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-300'
                  : 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border-amber-500/30'
              }`}
            >
              <Sparkles className={`w-3 h-3 ${isBright ? 'text-amber-700' : 'text-amber-300'}`} />
              <span className="hidden sm:inline">Guruma</span>
            </button>

            {/* Mobile / Tablet Menu Toggle */}
            <button
              ref={mobileToggleRef}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className={`lg:hidden shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-colors border ${
                isBright
                  ? 'bg-slate-100 border-slate-200 text-slate-700'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div ref={mobileDrawerRef} className={`absolute inset-x-0 top-full shadow-xl lg:hidden border-t p-3 space-y-3 max-h-[80vh] overflow-y-auto overscroll-contain ${
          isBright ? 'bg-white border-slate-200' : 'bg-stone-950 border-stone-800'
        }`}>
          {WORKSPACES.map((ws) => (
            <div key={ws.id} className="space-y-1">
              <div className="flex items-center justify-between px-3 py-1 text-[11px] font-mono uppercase tracking-wider font-bold text-amber-600 dark:text-amber-400">
                <span>{ws.label}</span>
                <span className="font-devanagari opacity-70">({ws.nepaliLabel})</span>
              </div>
              {ws.subTabs.map((subTab) => {
                const isActive = currentTab === subTab.id;
                return (
                  <button
                    key={subTab.id}
                    id={`nav-tab-${subTab.id}`}
                    onClick={() => {
                      onSelectTab(subTab.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full min-h-11 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs transition-colors cursor-pointer ${
                      isActive
                        ? isBright
                          ? 'bg-amber-100 text-amber-950 font-bold'
                          : 'bg-amber-500/20 text-amber-300 font-semibold'
                        : isBright
                        ? 'text-slate-700 hover:bg-slate-100'
                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className={isActive ? (isBright ? 'text-amber-800' : 'text-amber-400') : 'text-gray-400'}>
                      {getNavIcon(subTab.iconName)}
                    </span>
                    <span>{subTab.label}</span>
                    <span className="text-[10px] font-devanagari opacity-60 ml-auto">
                      {subTab.nepaliLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          ))}

          {/* Theme Toggle row in Mobile Menu */}
          <div className={`pt-2 border-t flex items-center justify-between px-3 py-2 ${
            isBright ? 'border-slate-200' : 'border-white/10'
          }`}>
            <span className={`text-xs ${isBright ? 'text-slate-600' : 'text-gray-400'}`}>Theme</span>
            <button
              onClick={handleThemeToggle}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border ${
                isBright
                  ? 'bg-slate-100 border-slate-200 text-slate-800'
                  : 'bg-white/10 border-white/10 text-white'
              }`}
            >
              {isBright ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-amber-500" />
                  <span>Dark Mode</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Bright Mode</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
    </>
  );
};
