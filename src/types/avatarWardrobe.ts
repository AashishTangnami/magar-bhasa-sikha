import { AvatarItem, UserStats } from '../types';

export type AvatarCategoryFilter = 'all' | 'jewelry' | 'clothing' | 'headwear';

export interface AvatarWardrobeProps {
  userStats: UserStats;
  avatarItems: AvatarItem[];
  onUnlockItem: (item: AvatarItem) => void;
  onToggleEquip: (item: AvatarItem) => void;
  className?: string;
}

export interface AvatarCategoryFilterItem {
  id: AvatarCategoryFilter;
  label: string;
}
