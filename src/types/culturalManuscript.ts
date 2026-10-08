export interface CulturalManuscriptProps {
  className?: string;
}

export type HeritageTab =
  | 'dances'
  | 'history'
  | 'festivals'
  | 'attire'
  | 'instruments'
  | 'culinary'
  | 'manuscript';

export type AttireFilter = 'all' | 'men' | 'women' | 'jewelry';

export interface HeritageTabItem {
  id: HeritageTab;
  label: string;
}

export interface AttireFilterItem {
  id: AttireFilter;
  label: string;
}
