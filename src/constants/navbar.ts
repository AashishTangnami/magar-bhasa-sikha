import { NavItemConfig } from '../types/navbar';

export const PRIMARY_NAV_ITEMS: readonly NavItemConfig[] = [
  { id: 'home', label: 'Home', iconName: 'Home' },
  { id: 'words', label: 'Vocabulary', iconName: 'Languages' },
  { id: 'sand', label: 'Trace Script', iconName: 'Edit3' },
  { id: 'dialects', label: 'Dialects', iconName: 'Compass' },
  { id: 'library', label: 'Heritage', iconName: 'ScrollText' },
] as const;

export const SECONDARY_NAV_ITEMS: readonly NavItemConfig[] = [
  { id: 'conversations', label: 'Daily Dialogues', iconName: 'MessageSquare' },
  { id: 'lab', label: 'Lesson Lab', iconName: 'BookOpen' },
  { id: 'clans', label: 'Clans & Demography', iconName: 'Users' },
  { id: 'keyboard', label: 'Virtual Keyboard', iconName: 'Keyboard' },
  { id: 'wardrobe', label: 'Avatar Wardrobe', iconName: 'Crown' },
  { id: 'references', label: 'References & Sources', iconName: 'Bookmark' },
] as const;
