import React, { useState, useEffect } from 'react';
import { DialectId, UserStats, AvatarItem } from './types';
import { AVATAR_ITEMS } from './data/avatarData';
import { loadJSON, saveJSON, getBrowserStorage } from './utils/safe-storage';
import { Navbar } from './components/Navbar';
import { LessonLab } from './components/LessonLab';
import { SandTracingCanvas } from './components/SandTracingCanvas';
import { DialectMatrix } from './components/DialectMatrix';
import { CulturalManuscript } from './components/CulturalManuscript';
import { VirtualKeyboard } from './components/VirtualKeyboard';
import { AvatarWardrobe } from './components/AvatarWardrobe';
import { MagarWordsLearner } from './components/MagarWordsLearner';
import { MagarHomeIntro } from './components/MagarHomeIntro';
import { DailyConversationLab } from './components/DailyConversationLab';
import { ReferencesAndLinks } from './components/ReferencesAndLinks';
import { MagarClansAndDemography } from './components/MagarClansAndDemography';
import { AiGuruModal } from './components/AiGuruModal';
import { LaliGuransCelebration } from './components/LaliGuransCelebration';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { NavTabId } from './types/navbar';

const DEFAULT_USER_STATS: UserStats = {
  activeDialect: 'dhut',
  completedLessonIds: ['lesson-1'],
  tracedGlyphIds: [],
  mundriCount: 8, // Initial starter gift of Mundri gold rings
  streakDays: 3,
  xpPoints: 120,
  score: 0,
  soundEnabled: true,
};

function AppContent() {
  const { isBright } = useTheme();

  // Navigation State - Default to Home / Introduction landing page
  const [currentTab, setCurrentTab] = useState<NavTabId>('home');

  // User Stats & Persistence
  // Persisted data is untrusted: loadJSON validates each field against the defaults
  const [userStats, setUserStats] = useState<UserStats>(() =>
    loadJSON(getBrowserStorage(), 'akkha_user_stats', DEFAULT_USER_STATS)
  );

  // Avatar Items Inventory (All unlocked). Item definitions always come from AVATAR_ITEMS;
  // only each item's saved equip flag is restored, so stale or junk entries are ignored.
  const [avatarItems, setAvatarItems] = useState<AvatarItem[]>(() => {
    const storage = getBrowserStorage();
    const savedEquip = loadJSON<Record<string, unknown>>(storage, 'akkha_avatar_equipped', {});
    if (Object.keys(savedEquip).length === 0) {
      // One-time migration from the legacy full-item array key
      try {
        const legacy: unknown = JSON.parse(storage?.getItem('akkha_avatar_items') ?? 'null');
        if (Array.isArray(legacy)) {
          for (const entry of legacy) {
            if (entry && typeof entry.id === 'string' && typeof entry.isEquipped === 'boolean') {
              savedEquip[entry.id] = entry.isEquipped;
            }
          }
        }
      } catch {
        // ignore malformed legacy data
      }
    }
    return AVATAR_ITEMS.map((item) => ({
      ...item,
      isUnlocked: true,
      isEquipped: typeof savedEquip[item.id] === 'boolean' ? (savedEquip[item.id] as boolean) : item.isEquipped,
    }));
  });

  // Modal Dialogs
  const [isAiGuruOpen, setIsAiGuruOpen] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Sync to LocalStorage
  useEffect(() => {
    saveJSON(getBrowserStorage(), 'akkha_user_stats', userStats);
  }, [userStats]);

  useEffect(() => {
    const equipped: Record<string, boolean> = {};
    for (let i = 0; i < avatarItems.length; i++) {
      equipped[avatarItems[i].id] = Boolean(avatarItems[i].isEquipped);
    }
    saveJSON(getBrowserStorage(), 'akkha_avatar_equipped', equipped);
  }, [avatarItems]);

  // Handlers
  const handleDialectSelect = (dialect: DialectId) => {
    setUserStats((prev) => ({ ...prev, activeDialect: dialect }));
  };

  const handleCompleteLesson = (lessonId: string, xp: number, mundri: number) => {
    setUserStats((prev) => {
      const alreadyDone = prev.completedLessonIds.includes(lessonId);
      const newDone = alreadyDone
        ? prev.completedLessonIds
        : [...prev.completedLessonIds, lessonId];
      return {
        ...prev,
        completedLessonIds: newDone,
        xpPoints: prev.xpPoints + xp,
        mundriCount: prev.mundriCount + mundri,
      };
    });
    setShowCelebration(true);
  };

  const handleTraceComplete = (glyphId: string, accuracy: number) => {
    setUserStats((prev) => {
      const alreadyTraced = prev.tracedGlyphIds.includes(glyphId);
      const newTraced = alreadyTraced
        ? prev.tracedGlyphIds
        : [...prev.tracedGlyphIds, glyphId];
      return {
        ...prev,
        tracedGlyphIds: newTraced,
        mundriCount: prev.mundriCount + 2,
        xpPoints: prev.xpPoints + 15,
      };
    });
    setShowCelebration(true);
  };

  const handleUnlockAvatarItem = (item: AvatarItem) => {
    if (userStats.mundriCount < item.costMundri) return;

    setUserStats((prev) => ({
      ...prev,
      mundriCount: prev.mundriCount - item.costMundri,
    }));

    setAvatarItems((prev) =>
      prev.map((i) =>
        i.id === item.id ? { ...i, isUnlocked: true, isEquipped: true } : i
      )
    );
  };

  const handleToggleEquipAvatarItem = (item: AvatarItem) => {
    setAvatarItems((prev) =>
      prev.map((i) =>
        i.id === item.id ? { ...i, isEquipped: !i.isEquipped } : i
      )
    );
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 selection:bg-amber-200 selection:text-stone-900 ${
        isBright
          ? 'theme-bright light bg-stone-50 text-stone-900'
          : 'theme-dark dark bg-stone-950 text-stone-100'
      }`}
    >
      {/* Top Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        userStats={userStats}
        onSelectDialect={handleDialectSelect}
        onOpenAiGuru={() => setIsAiGuruOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {/* Dynamic Screen View Based on Selected Tab */}
        {currentTab === 'home' && (
          <MagarHomeIntro
            onSelectTab={setCurrentTab}
            userStats={userStats}
            onSelectDialect={handleDialectSelect}
          />
        )}

        {currentTab === 'lab' && (
          <LessonLab
            userStats={userStats}
            onCompleteLesson={handleCompleteLesson}
          />
        )}

        {currentTab === 'words' && (
          <MagarWordsLearner
            onAwardXP={(xp, mundri) => {
              setUserStats((prev) => ({
                ...prev,
                xpPoints: prev.xpPoints + xp,
                mundriCount: prev.mundriCount + mundri,
              }));
              setShowCelebration(true);
            }}
          />
        )}

        {currentTab === 'sand' && (
          <SandTracingCanvas onTraceComplete={handleTraceComplete} />
        )}

        {currentTab === 'dialects' && (
          <DialectMatrix
            activeDialect={userStats.activeDialect}
            onSelectDialect={handleDialectSelect}
          />
        )}

        {currentTab === 'library' && <CulturalManuscript />}

        {currentTab === 'keyboard' && <VirtualKeyboard />}

        {currentTab === 'wardrobe' && (
          <AvatarWardrobe
            userStats={userStats}
            avatarItems={avatarItems}
            onUnlockItem={handleUnlockAvatarItem}
            onToggleEquip={handleToggleEquipAvatarItem}
          />
        )}

        {currentTab === 'clans' && (
          <MagarClansAndDemography />
        )}

        {currentTab === 'conversations' && (
          <DailyConversationLab
            activeDialect={userStats.activeDialect}
            onSelectDialect={handleDialectSelect}
            userStats={userStats}
            onUpdateStats={setUserStats}
            onOpenAiGuru={() => setIsAiGuruOpen(true)}
          />
        )}

        {currentTab === 'references' && (
          <ReferencesAndLinks onSelectTab={setCurrentTab} />
        )}
      </main>

      {/* Traditional Footer with Cultural Statement & References Link */}
      <footer
        className={`border-t py-6 px-4 text-center text-xs space-y-3 transition-colors ${
          isBright
            ? 'bg-white border-stone-200 text-stone-500'
            : 'bg-stone-950 border-stone-800 text-stone-400'
        }`}
      >
        <div className="flex items-center justify-center gap-2">
          <span className="text-amber-700 dark:text-amber-400 font-akkha font-bold">𑀅</span>
          <span className={`font-heading font-black text-sm ${isBright ? 'text-slate-900' : 'text-white'}`}>
            Akkha Magar (अक्खा मगर)
          </span>
          <span className="text-amber-700 dark:text-amber-400 font-akkha font-bold">𑀅</span>
        </div>
        <p className="max-w-md mx-auto text-xs leading-relaxed">
          Akkha Lipi Calligraphy & Comparative Magar Dialects (Dhut • Kham • Kaike)
        </p>

        {/* Quick Nav in Footer */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono pt-1">
          <button
            onClick={() => {
              setCurrentTab('home');
            }}
            className={`hover:underline ${isBright ? 'text-slate-600 hover:text-amber-700' : 'text-gray-400 hover:text-white'}`}
          >
            Home / परिचय
          </button>
          <span>•</span>
          <button
            onClick={() => {
              setCurrentTab('clans');
            }}
            className={`hover:underline ${isBright ? 'text-slate-600 hover:text-amber-700' : 'text-gray-400 hover:text-white'}`}
          >
            Clans & Demography (थर र जनसाङ्ख्यिकी)
          </button>
          <span>•</span>
          <button
            onClick={() => {
              setCurrentTab('library');
            }}
            className={`hover:underline ${isBright ? 'text-slate-600 hover:text-amber-700' : 'text-gray-400 hover:text-white'}`}
          >
            Heritage & Dances
          </button>
          <span>•</span>
          <button
            onClick={() => {
              setCurrentTab('references');
            }}
            className={`font-bold hover:underline ${isBright ? 'text-amber-700' : 'text-amber-400'}`}
          >
            References & Links (स्रोत निर्देशिका)
          </button>
        </div>
      </footer>

      {/* Modals & Visual FX Overlays */}
      <AiGuruModal
        isOpen={isAiGuruOpen}
        onClose={() => setIsAiGuruOpen(false)}
        activeDialect={userStats.activeDialect}
      />

      <LaliGuransCelebration
        active={showCelebration}
        onComplete={() => setShowCelebration(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

