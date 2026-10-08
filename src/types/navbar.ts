import { DialectId, UserStats } from '../types';

export type NavTabId =
  | 'home'
  | 'words'
  | 'sand'
  | 'dialects'
  | 'library'
  | 'keyboard'
  | 'wardrobe'
  | 'lab'
  | 'references'
  | 'clans'
  | 'conversations';

export interface NavbarProps {
  currentTab: NavTabId;
  onSelectTab: (tab: NavTabId) => void;
  userStats: UserStats;
  onSelectDialect: (dialect: DialectId) => void;
  onOpenAiGuru: () => void;
}

export interface NavItemConfig {
  id: NavTabId;
  label: string;
  iconName: string;
}
