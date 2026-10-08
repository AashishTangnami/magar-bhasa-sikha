import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { bindDismiss } from './dismiss';

const keydown = (key: string) => Object.assign(new Event('keydown'), { key });

describe('bindDismiss closes open menus', () => {
  it('pointer-down reports the pressed node', () => {
    const target = new EventTarget();
    const seen: (EventTarget | null)[] = [];
    bindDismiss(target, (node) => seen.push(node));
    target.dispatchEvent(new Event('pointerdown'));
    expect(seen).toEqual([target]);
  });

  it('Escape and page scroll dismiss everything; other keys do not', () => {
    const target = new EventTarget();
    const seen: (EventTarget | null)[] = [];
    bindDismiss(target, (node) => seen.push(node));
    target.dispatchEvent(keydown('a'));
    target.dispatchEvent(keydown('Escape'));
    target.dispatchEvent(new Event('scroll'));
    expect(seen).toEqual([null, null]);
  });

  it('cleanup detaches every listener', () => {
    const target = new EventTarget();
    let calls = 0;
    const cleanup = bindDismiss(target, () => calls++);
    cleanup();
    target.dispatchEvent(new Event('pointerdown'));
    target.dispatchEvent(keydown('Escape'));
    target.dispatchEvent(new Event('scroll'));
    expect(calls).toBe(0);
  });

  it('Navbar wires its menus to bindDismiss', () => {
    const src = readFileSync(resolve(process.cwd(), 'src/components/Navbar.tsx'), 'utf8');
    expect(src.includes('bindDismiss(window')).toBe(true);
    expect(src.includes('overscroll-contain')).toBe(true);
  });

  it('mobile drawer overlays the page, so opening it never shifts layout (a shift fires scroll → instant close)', () => {
    const src = readFileSync(resolve(process.cwd(), 'src/components/Navbar.tsx'), 'utf8');
    expect(/ref=\{mobileDrawerRef\} className=\{`absolute inset-x-0 top-full/.test(src)).toBe(true);
  });

  it('mobile drawer has a backdrop that swallows the dismiss tap (no click-through to the page)', () => {
    const src = readFileSync(resolve(process.cwd(), 'src/components/Navbar.tsx'), 'utf8');
    expect(src.includes('ref={mobileBackdropRef}')).toBe(true);
    expect(src.includes('!inside(mobileBackdropRef)')).toBe(true);
  });
});
