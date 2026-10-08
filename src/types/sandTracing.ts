export type SandTracingTab = 'vowels' | 'consonants' | 'numbers';

export interface SandTracingCanvasProps {
  selectedGlyphId?: string;
  onTraceComplete?: (glyphId: string, accuracy: number) => void;
  className?: string;
}

export interface SandTracingTabItem {
  id: SandTracingTab;
  label: string;
}

export interface SandCanvasPalette {
  canvasBg: string;
  granuleColor: string;
  borderColor: string;
  cornerMarkColor: string;
  guideColor: string;
  guidePointBg: string;
  guidePointText: string;
  tracedStrokeColor: string;
  tracedStrokeWidth: number;
}
