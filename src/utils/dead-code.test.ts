import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const read = (rel: string) => readFileSync(resolve(root, rel), 'utf8');

describe('dead code stays removed', () => {
  it('unused modules are deleted', () => {
    for (const rel of [
      'src/components/AkkhaGlyph.tsx',
      'src/components/WorkspaceSubNav.tsx',
      'src/constants/index.ts',
      'src/types/index.ts',
      'src/utils/audio.ts',
      'src/constants/theme.ts',
      'src/types/theme.ts',
    ]) {
      expect(existsSync(resolve(root, rel)), `${rel} should be deleted`).toBe(false);
    }
  });

  it('unused dependencies are removed from package.json', () => {
    const pkg = JSON.parse(read('package.json'));
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    for (const name of ['motion', 'autoprefixer']) {
      expect(deps[name], `${name} is unused`).toBeUndefined();
    }
  });

  it('no UI source uses arbitrary hex colour classes (stone/amber tokens only)', () => {
    const dir = resolve(root, 'src/components');
    const files = readdirSync(dir).map((f) => `src/components/${f}`);
    files.push('src/App.tsx', 'src/context/ThemeContext.tsx', 'index.html');
    for (const rel of files) {
      expect(/(bg|text|border|ring|from|to|via|shadow)-\[#/.test(read(rel)), `${rel} uses a hex colour class`).toBe(false);
    }
  });

  it('index.css carries no light-mode patches for removed hex classes', () => {
    expect(read('src/index.css').includes('.theme-bright .bg-\\[\\#')).toBe(false);
  });

  it('app opens straight to Home: no welcome screen, celebration kept only for rewards', () => {
    for (const rel of ['src/components/OnboardingModal.tsx', 'src/types/onboarding.ts', 'src/constants/onboarding.ts']) {
      expect(existsSync(resolve(root, rel)), `${rel} should be deleted`).toBe(false);
    }
    const app = read('src/App.tsx');
    expect(app.includes('OnboardingModal')).toBe(false);
    expect(app.includes('onboardingComplete')).toBe(false);
    // lesson completed, trace passed, vocabulary XP
    expect((app.match(/setShowCelebration\(true\)/g) ?? []).length).toBe(3);
    expect(read('src/types.ts').includes('onboardingComplete')).toBe(false);
  });

  it('sand tracing score is computed, not random', () => {
    const src = read('src/components/SandTracingCanvas.tsx');
    expect(src.includes('Math.random() * 18')).toBe(false);
    expect(src.includes('scoreTrace(')).toBe(true);
  });

  it('Devanagari renders in plain Mukta, never the decorative Yatra One', () => {
    const css = read('src/index.css');
    expect(css.includes('Yatra')).toBe(false);
    expect(read('index.html').includes('Yatra')).toBe(false);
    expect(/h1, h2, h3, \.font-heading \{\s*font-family: 'Lexend', 'Mukta'/.test(css)).toBe(true);
  });

  it('Cinzel is gone: headings use plain Lexend at real heavy weights', () => {
    const html = read('index.html');
    expect(read('src/index.css').includes('Cinzel')).toBe(false);
    expect(html.includes('Cinzel')).toBe(false);
    expect(/family=Lexend:wght@[\d;]*900/.test(html)).toBe(true);
  });
});
