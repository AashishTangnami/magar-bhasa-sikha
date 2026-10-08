import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  WORKSPACES,
  getWorkspaceForTab,
  formatVocabWordMetadata,
} from './ui-makeover';
import { NavTabId } from '../types/navbar';
import { WIKIBOOKS_MAGAR_VOCABULARY } from '../data/wikibooksVocabulary';
import { DIALECTS, COMPARATIVE_VOCABULARY } from '../data/dialectData';
import {
  DANCE_HERITAGE,
  MAGARAT_HISTORY,
  FESTIVAL_HERITAGE,
  ATTIRE_HERITAGE,
  INSTRUMENT_HERITAGE,
  CULINARY_HERITAGE,
} from '../data/heritageData';
import { FOLKLORE_STORIES } from '../data/folkloreData';
import { CONVERSATION_SCENARIOS } from '../data/conversationsData';
import { LESSONS } from '../data/lessonsData';
import { MAGAR_CLANS_DATA, PROVINCE_DISTRIBUTION, DEMOGRAPHIC_METRICS } from '../data/clansAndDemographyData';
import { ALL_AKKHA_GLYPHS, AKKHA_MATRAS } from '../data/scriptData';
import { AVATAR_ITEMS } from '../data/avatarData';
import { REFERENCES_DATA } from '../data/referencesData';

describe('UI Makeover Architecture (3 Workspaces & Hero Word Dossier)', () => {
  it('defines exactly 3 consolidated workspaces according to Hick and Miller laws', () => {
    expect(WORKSPACES).toHaveLength(3);
    const workspaceIds = WORKSPACES.map((w) => w.id);
    expect(workspaceIds).toEqual(['heritage', 'language-lab', 'scribe-studio']);
  });

  it('maps every legacy NavTabId to exactly one parent workspace', () => {
    const allTabs: NavTabId[] = [
      'home',
      'dialects',
      'library',
      'clans',
      'words',
      'lab',
      'wardrobe',
      'sand',
      'keyboard',
      'references',
    ];

    allTabs.forEach((tab) => {
      const workspace = getWorkspaceForTab(tab);
      expect(['heritage', 'language-lab', 'scribe-studio']).toContain(workspace);
    });

    expect(getWorkspaceForTab('dialects')).toBe('heritage');
    expect(getWorkspaceForTab('clans')).toBe('heritage');
    expect(getWorkspaceForTab('words')).toBe('language-lab');
    expect(getWorkspaceForTab('lab')).toBe('language-lab');
    expect(getWorkspaceForTab('sand')).toBe('scribe-studio');
    expect(getWorkspaceForTab('keyboard')).toBe('scribe-studio');
  });

  it('formats vocabulary metadata as clean unboxed text with typographic separators (Zero-Pill Rule)', () => {
    const sampleWord = WIKIBOOKS_MAGAR_VOCABULARY[0];
    const metadataText = formatVocabWordMetadata(sampleWord);
    expect(metadataText).toBeDefined();
    expect(metadataText).toContain('·');
    expect(metadataText).not.toContain('rounded-full');
    expect(metadataText).not.toContain('badge');
  });

  it('strictly preserves 100% of all existing dialect profile data and comparative vocabulary', () => {
    // Check all 3 dialects exist and retain all fields
    const dialectKeys = Object.keys(DIALECTS);
    expect(dialectKeys).toEqual(['dhut', 'kham', 'kaike']);

    dialectKeys.forEach((key) => {
      const d = DIALECTS[key];
      expect(d.id).toBeDefined();
      expect(d.name).toBeDefined();
      expect(d.nativeName).toBeDefined();
      expect(d.symbolName).toBeDefined();
      expect(d.iconType).toBeDefined();
      expect(d.region).toBeDefined();
      expect(d.culturalNote).toBeDefined();
      expect(d.greeting).toBeDefined();
      expect(d.greetingPhonetic).toBeDefined();
      expect(d.speakerCountEstimate).toBeDefined();
      expect(d.color).toBeDefined();
    });

    // Check all 15 comparative vocabulary items retain all fields
    expect(COMPARATIVE_VOCABULARY.length).toBe(15);
    COMPARATIVE_VOCABULARY.forEach((item) => {
      expect(item.id).toBeDefined();
      expect(item.english).toBeDefined();
      expect(item.category).toBeDefined();
      expect(item.culturalContext).toBeDefined();

      // Dhut check
      expect(item.dhut.word).toBeDefined();
      expect(item.dhut.deva).toBeDefined();
      expect(item.dhut.phonetic).toBeDefined();
      expect(item.dhut.akkha).toBeDefined();

      // Kham check
      expect(item.kham.word).toBeDefined();
      expect(item.kham.deva).toBeDefined();
      expect(item.kham.phonetic).toBeDefined();
      expect(item.kham.akkha).toBeDefined();

      // Kaike check
      expect(item.kaike.word).toBeDefined();
      expect(item.kaike.deva).toBeDefined();
      expect(item.kaike.phonetic).toBeDefined();
      expect(item.kaike.akkha).toBeDefined();
    });
  });

  it('preserves 100% of authentic Magar cultural heritage data across all categories', () => {
    // 1. Folk dances (all 6 dances with choreography and instruments)
    expect(DANCE_HERITAGE.length).toBe(6);
    DANCE_HERITAGE.forEach((dance) => {
      expect(dance.id).toBeDefined();
      expect(dance.name).toBeDefined();
      expect(dance.nameNepali).toBeDefined();
      expect(dance.nameAkkha).toBeDefined();
      expect(dance.originRegion).toBeDefined();
      expect(dance.historicalEra).toBeDefined();
      expect(dance.instrumentsUsed.length).toBeGreaterThan(0);
      expect(dance.performanceStructure.length).toBeGreaterThan(0);
      expect(dance.sampleBhakaVerse).toBeDefined();
      expect(dance.description).toBeDefined();
    });

    // 2. Magarat Kingdoms & History (all 4 items)
    expect(MAGARAT_HISTORY.length).toBe(4);
    MAGARAT_HISTORY.forEach((item) => {
      expect(item.id).toBeDefined();
      expect(item.era).toBeDefined();
      expect(item.title).toBeDefined();
      expect(item.titleNepali).toBeDefined();
      expect(item.category).toBeDefined();
      expect(item.summary).toBeDefined();
      expect(item.details.length).toBeGreaterThan(0);
    });

    // 3. Sacred Festivals (all 3 festivals)
    expect(FESTIVAL_HERITAGE.length).toBe(3);
    FESTIVAL_HERITAGE.forEach((fest) => {
      expect(fest.id).toBeDefined();
      expect(fest.name).toBeDefined();
      expect(fest.nameNepali).toBeDefined();
      expect(fest.nameAkkha).toBeDefined();
      expect(fest.monthTiming).toBeDefined();
      expect(fest.rituals.length).toBeGreaterThan(0);
      expect(fest.specialFoods.length).toBeGreaterThan(0);
    });

    // 4. Attire & Jewelry Regalia (all 6 items)
    expect(ATTIRE_HERITAGE.length).toBe(6);
    ATTIRE_HERITAGE.forEach((attire) => {
      expect(attire.id).toBeDefined();
      expect(attire.name).toBeDefined();
      expect(attire.nameNepali).toBeDefined();
      expect(attire.genderCategory).toBeDefined();
      expect(attire.material).toBeDefined();
      expect(attire.symbolism).toBeDefined();
    });

    // 5. Musical Instruments (all 4 instruments)
    expect(INSTRUMENT_HERITAGE.length).toBe(4);
    INSTRUMENT_HERITAGE.forEach((inst) => {
      expect(inst.id).toBeDefined();
      expect(inst.name).toBeDefined();
      expect(inst.nameNepali).toBeDefined();
      expect(inst.type).toBeDefined();
      expect(inst.materials).toBeDefined();
      expect(inst.magarConnection).toBeDefined();
    });

    // 6. Culinary Traditions (all 3 culinary items)
    expect(CULINARY_HERITAGE.length).toBe(3);
    CULINARY_HERITAGE.forEach((food) => {
      expect(food.id).toBeDefined();
      expect(food.name).toBeDefined();
      expect(food.nameNepali).toBeDefined();
      expect(food.ingredients.length).toBeGreaterThan(0);
      expect(food.festivalOccasion).toBeDefined();
    });

    // 7. Oral Folklore & Epics (all 5 stories)
    expect(FOLKLORE_STORIES.length).toBe(5);
    FOLKLORE_STORIES.forEach((story) => {
      expect(story.id).toBeDefined();
      expect(story.title).toBeDefined();
      expect(story.titleAkkha).toBeDefined();
      expect(story.verses.length).toBeGreaterThan(0);
    });
  });

  describe('Extended Modules UI Makeover & 100% Data Preservation', () => {
    it('strictly preserves 100% of all data across all 6 extended modules', () => {
      // 1. Daily Conversations & Scenarios
      expect(CONVERSATION_SCENARIOS.length).toBeGreaterThanOrEqual(3);
      CONVERSATION_SCENARIOS.forEach((scenario) => {
        expect(scenario.id).toBeDefined();
        expect(scenario.title).toBeDefined();
        expect(scenario.turns.length).toBeGreaterThan(0);
        scenario.turns.forEach((turn) => {
          expect(turn.prompt.dialects.dhut).toBeDefined();
          expect(turn.prompt.dialects.kham).toBeDefined();
          expect(turn.prompt.dialects.kaike).toBeDefined();
        });
      });

      // 2. Lesson Lab Curriculum
      expect(LESSONS.length).toBeGreaterThanOrEqual(5);
      LESSONS.forEach((lesson) => {
        expect(lesson.id).toBeDefined();
        expect(lesson.title).toBeDefined();
        expect(lesson.steps.length).toBeGreaterThan(0);
      });

      // 3. Clans, Demography, and Provinces
      expect(MAGAR_CLANS_DATA.length).toBeGreaterThanOrEqual(7);
      let totalSubClans = 0;
      MAGAR_CLANS_DATA.forEach((clan) => {
        expect(clan.id).toBeDefined();
        expect(clan.name).toBeDefined();
        expect(clan.subClans.length).toBeGreaterThan(0);
        totalSubClans += clan.subClans.length;
      });
      expect(totalSubClans).toBeGreaterThan(40);
      expect(PROVINCE_DISTRIBUTION.length).toBeGreaterThanOrEqual(7);
      expect(DEMOGRAPHIC_METRICS.length).toBeGreaterThanOrEqual(3);

      // 4. Akkha Lipi Scribe & Character Glyphs
      expect(ALL_AKKHA_GLYPHS.length).toBeGreaterThanOrEqual(40);
      expect(AKKHA_MATRAS.length).toBeGreaterThanOrEqual(10);

      // 5. Traditional Wardrobe Items
      expect(AVATAR_ITEMS.length).toBeGreaterThanOrEqual(9);
      AVATAR_ITEMS.forEach((item) => {
        expect(item.id).toBeDefined();
        expect(item.name).toBeDefined();
        expect(item.category).toBeDefined();
      });

      // 6. Citations & Archival References
      expect(REFERENCES_DATA.length).toBeGreaterThanOrEqual(14);
      REFERENCES_DATA.forEach((ref) => {
        expect(ref.id).toBeDefined();
        expect(ref.title).toBeDefined();
        expect(ref.category).toBeDefined();
      });
    });

    it('renders all 6 extended modules in the serene stone palette with zero rainbow accents', () => {
      const moduleFiles = [
        'DailyConversationLab',
        'LessonLab',
        'MagarClansAndDemography',
        'VirtualKeyboard',
        'AvatarWardrobe',
        'ReferencesAndLinks',
      ];
      const bannedTokens = ['[#BC002D]', '[#FFCC00]', 'emerald-', 'cyan-', 'purple-', 'indigo-', 'teal-', 'bg-black/'];

      for (let i = 0; i < moduleFiles.length; i++) {
        const source = readFileSync(resolve(process.cwd(), `src/components/${moduleFiles[i]}.tsx`), 'utf8');
        for (let j = 0; j < bannedTokens.length; j++) {
          expect(source.includes(bannedTokens[j]), `${moduleFiles[i]} contains banned token ${bannedTokens[j]}`).toBe(false);
        }
        expect(source.includes('stone-'), `${moduleFiles[i]} must use the stone palette`).toBe(true);
        expect(source.includes('min-h-11'), `${moduleFiles[i]} must declare 44px (min-h-11) touch targets`).toBe(true);
      }
    });

    it('binds the Tailwind dark variant to the ThemeContext .dark class', () => {
      const css = readFileSync(resolve(process.cwd(), 'src/index.css'), 'utf8');
      expect(css.includes('@custom-variant dark')).toBe(true);
    });
  });
});

