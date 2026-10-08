import { NavTabId } from '../types/navbar';
import { MagarWordEntry } from '../data/wikibooksVocabulary';

export type WorkspaceId = 'heritage' | 'language-lab' | 'scribe-studio';

export interface WorkspaceSubTab {
  readonly id: NavTabId;
  readonly label: string;
  readonly nepaliLabel: string;
  readonly iconName: string;
  readonly description?: string;
}

export interface WorkspaceConfig {
  readonly id: WorkspaceId;
  readonly label: string;
  readonly nepaliLabel: string;
  readonly iconName: string;
  readonly description: string;
  readonly tabs: readonly NavTabId[];
  readonly subTabs: readonly WorkspaceSubTab[];
  readonly defaultTab: NavTabId;
}

export const WORKSPACES: readonly WorkspaceConfig[] = [
  {
    id: 'heritage',
    label: 'Cultural Heritage & Dialects',
    nepaliLabel: 'संस्कृति र भाषाहरू',
    iconName: 'Compass',
    description: 'Magar history, clan demography, 11th-century inscriptions, and comparative dialects.',
    tabs: ['dialects', 'library', 'clans', 'home'] as const,
    subTabs: [
      { id: 'dialects', label: 'Dialect Matrix', nepaliLabel: 'भाषा तुलना', iconName: 'Compass' },
      { id: 'library', label: 'Heritage Manuscripts', nepaliLabel: 'ऐतिहासिक पाण्डुलिपि', iconName: 'ScrollText' },
      { id: 'clans', label: 'Clans & Demography', nepaliLabel: 'थर र जनसङ्ख्या', iconName: 'Users' },
      { id: 'home', label: 'Introduction', nepaliLabel: 'परिचय', iconName: 'Home' },
    ],
    defaultTab: 'dialects',
  },
  {
    id: 'language-lab',
    label: 'Language Lab & Vocabulary',
    nepaliLabel: 'शब्दावली र सिकाइ',
    iconName: 'Languages',
    description: 'Categorized vocabulary explorer, split-view word dossier, and lesson challenges.',
    tabs: ['words', 'lab', 'wardrobe'] as const,
    subTabs: [
      { id: 'words', label: 'Vocabulary Explorer', nepaliLabel: 'शब्दावली', iconName: 'Languages' },
      { id: 'lab', label: 'Lesson Challenges', nepaliLabel: 'पाठ अभ्यास', iconName: 'BookOpen' },
      { id: 'wardrobe', label: 'Avatar Wardrobe', nepaliLabel: 'परम्परागत भेषभूषा', iconName: 'Crown' },
    ],
    defaultTab: 'words',
  },
  {
    id: 'scribe-studio',
    label: 'Scribe Studio & Calligraphy',
    nepaliLabel: 'अक्खा लिपि स्टुडियो',
    iconName: 'Edit3',
    description: 'Akkha script sand-box tracing canvas, character charts, and virtual keyboard.',
    tabs: ['sand', 'keyboard', 'references'] as const,
    subTabs: [
      { id: 'sand', label: 'Sand Tracing Canvas', nepaliLabel: 'बालुवा रेखाङ्कन', iconName: 'Edit3' },
      { id: 'keyboard', label: 'Scribe Keyboard', nepaliLabel: 'भर्चुअल किबोर्ड', iconName: 'Keyboard' },
      { id: 'references', label: 'Bibliography & Sources', nepaliLabel: 'स्रोत तथा ग्रन्थसूची', iconName: 'Bookmark' },
    ],
    defaultTab: 'sand',
  },
] as const;

/**
 * Maps any legacy NavTabId to its parent WorkspaceId.
 */
export function getWorkspaceForTab(tab: NavTabId): WorkspaceId {
  for (const workspace of WORKSPACES) {
    if (workspace.tabs.includes(tab)) {
      return workspace.id;
    }
  }
  return 'heritage';
}

/**
 * Formats vocabulary metadata as clean unboxed text with typographic separators.
 * Enforces Zero-Pill Discipline: no static pill capsules or bordered chips.
 */
export function formatVocabWordMetadata(entry: MagarWordEntry): string {
  const parts: string[] = [];
  if (entry.partOfSpeech) parts.push(entry.partOfSpeech);
  if (entry.category) parts.push(entry.category);
  if (entry.phonetic) parts.push(`/${entry.phonetic}/`);
  return parts.join(' · ');
}
