import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const read = (rel: string) => readFileSync(resolve(process.cwd(), rel), 'utf8');

describe('layout holds down to a 320px phone', () => {
  it('Navbar keeps the menu button on screen at every width', () => {
    const src = read('src/components/Navbar.tsx');
    expect(src.includes('max-[359px]:hidden'), 'wordmark gives way below 360px').toBe(true);
    expect(src.includes('whitespace-nowrap'), 'dialect pill stays on one line').toBe(true);
    expect(src.includes('lg:hidden xl:flex'), 'metrics pill yields to the desktop nav at 1024px').toBe(true);
    expect(/ref=\{mobileToggleRef\}[\s\S]{0,200}shrink-0/.test(src), 'menu toggle never shrinks').toBe(true);
  });

  it('filter rows and stats wrap instead of widening the page', () => {
    const words = read('src/components/MagarWordsLearner.tsx');
    const dialects = read('src/components/DialectMatrix.tsx');
    expect(words.includes('{/* Filter Dropdowns and View Controls */}\n            <div className="flex flex-wrap')).toBe(true);
    expect(dialects.includes('{/* Filter Dropdowns and View Controls */}\n          <div className="flex flex-wrap')).toBe(true);
    expect(dialects.includes('flex flex-wrap items-center gap-x-6 gap-y-3 px-5 py-3')).toBe(true);
  });

  it('dropdowns wrap at a readable width instead of squeezing to "All C…"', () => {
    for (const rel of ['src/components/MagarWordsLearner.tsx', 'src/components/DialectMatrix.tsx']) {
      const src = read(rel);
      expect(src.includes('flex-1 min-w-0 sm:flex-none min-h-11'), rel).toBe(false);
      expect(src.includes('flex-1 min-w-[9rem] sm:flex-none min-h-11'), rel).toBe(true);
    }
  });

  it('Trace Script tabs stack English over Nepali on phones instead of overlapping', () => {
    const src = read('src/components/SandTracingCanvas.tsx');
    expect(src.includes('min-w-0 min-h-11 py-1.5 rounded-lg transition-colors flex flex-col sm:flex-row')).toBe(true);
  });

  it('vocabulary cards stack the Akkha word under the text on phones', () => {
    const src = read('src/components/MagarWordsLearner.tsx');
    expect(src.includes('flex flex-wrap items-center justify-between gap-x-4 gap-y-2 select-none')).toBe(true);
    expect(src.includes('max-sm:w-full max-sm:justify-between')).toBe(true);
  });
});
