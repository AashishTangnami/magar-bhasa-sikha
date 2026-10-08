import React from 'react';
import { DialectId, UserStats } from '../types';

export type AppTabId =
  | 'home'
  | 'words'
  | 'sand'
  | 'dialects'
  | 'library'
  | 'keyboard'
  | 'wardrobe'
  | 'references'
  | 'clans'
  | 'conversations';

export interface MagarHomeIntroProps {
  onSelectTab: (tab: AppTabId) => void;
  userStats: UserStats;
  onSelectDialect: (dialect: DialectId) => void;
}

export interface LearningModule {
  id: AppTabId;
  title: string;
  nepali: string;
  tag: string;
  iconName: string;
  summary: string;
}

export interface SampleAkkhaGlyph {
  char: string;
  roman: string;
  deva: string;
  meaning: string;
}

export interface CulturalFactItem {
  title: string;
  nepali: string;
  desc: string;
  tag: string;
}
