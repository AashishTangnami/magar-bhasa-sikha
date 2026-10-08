import { SandTracingTabItem, SandCanvasPalette } from '../types/sandTracing';

export const DEFAULT_SAND_GLYPH_ID = 'vowel-a';

export const SAND_TRACING_TABS: SandTracingTabItem[] = [
  { id: 'vowels', label: 'Vowels (स्वर)' },
  { id: 'consonants', label: 'Consonants (व्यञ्जन)' },
  { id: 'numbers', label: 'Numerals (अङ्क)' },
];

export const SAND_CANVAS_PALETTES: {
  light: SandCanvasPalette;
  dark: SandCanvasPalette;
} = {
  light: {
    canvasBg: '#F9F7F2',
    granuleColor: 'rgba(160, 140, 120, 0.12)',
    borderColor: 'rgba(203, 213, 225, 0.8)',
    cornerMarkColor: '#D97706',
    guideColor: 'rgba(100, 116, 139, 0.35)',
    guidePointBg: '#D97706',
    guidePointText: '#FFFFFF',
    tracedStrokeColor: '#B45309',
    tracedStrokeWidth: 14,
  },
  dark: {
    canvasBg: '#141820',
    granuleColor: 'rgba(255, 255, 255, 0.04)',
    borderColor: 'rgba(255, 255, 255, 0.15)',
    cornerMarkColor: '#F59E0B',
    guideColor: 'rgba(255, 255, 255, 0.22)',
    guidePointBg: '#F59E0B',
    guidePointText: '#0F172A',
    tracedStrokeColor: '#FBBF24',
    tracedStrokeWidth: 14,
  },
};
