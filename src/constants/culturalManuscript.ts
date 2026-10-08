import { HeritageTabItem, AttireFilterItem } from '../types/culturalManuscript';

export const HERITAGE_TABS: HeritageTabItem[] = [
  { id: 'dances', label: 'Folk Dances (कौरा, सोरठी, मारुनी, सालैजो)' },
  { id: 'history', label: 'Kingdoms & History (१२ र १८ मगरात)' },
  { id: 'festivals', label: 'Festivals (माघी र भूमे पूजा)' },
  { id: 'attire', label: 'Attire & Jewelry (भाङ्ग्रा र घालेक)' },
  { id: 'instruments', label: 'Instruments (मादल र ढ्याङ्ग्रो)' },
  { id: 'culinary', label: 'Culinary (बटुक र जाँड)' },
  { id: 'manuscript', label: 'Chants & Epics (सोरठी मन्त्र)' },
];

export const ATTIRE_FILTERS: AttireFilterItem[] = [
  { id: 'all', label: 'All Regalia (सबै)' },
  { id: 'men', label: "Men's Attire (पुरुष भेषभूषा)" },
  { id: 'women', label: "Women's Attire (महिला भेषभूषा)" },
  { id: 'jewelry', label: 'Royal Jewelry (परम्परागत गहना)' },
];
