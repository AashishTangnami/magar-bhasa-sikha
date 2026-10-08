import { describe, it, expect } from 'vitest';
import { formatUnboxedMetadata } from './perception-impeccable-harness';

describe('Impeccable & Perception-First Design Invariants', () => {
  it('formats metadata as clean unboxed text with typographic separators (No Static Pills)', () => {
    const formatted = formatUnboxedMetadata(['Dhut Dialect', 'Tanahun Hearth', '4 min read']);
    expect(formatted).toBe('Dhut Dialect · Tanahun Hearth · 4 min read');
    // Ensure no HTML tags or pill capsule artifacts
    expect(formatted).not.toContain('<span');
    expect(formatted).not.toContain('rounded-full');
    expect(formatted).not.toContain('badge');
  });

  it('drops empty and whitespace-only segments', () => {
    expect(formatUnboxedMetadata(['A', '', '  ', null, undefined, 'B'])).toBe('A · B');
  });
});
