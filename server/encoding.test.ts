import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { negotiateEncoding, Encoding } from './encoding';

const ALL: readonly Encoding[] = ['br', 'zstd', 'gzip'];

describe('negotiateEncoding', () => {
  it('prefers the server order when the client accepts several at equal quality', () => {
    expect(negotiateEncoding('gzip, deflate, br', ALL)).toBe('br');
    expect(negotiateEncoding('gzip, deflate, br, zstd', ALL)).toBe('br');
    expect(negotiateEncoding('gzip, zstd', ALL)).toBe('zstd');
  });

  it('honours client q-values over server preference', () => {
    expect(negotiateEncoding('br;q=0.5, gzip;q=1', ALL)).toBe('gzip');
    expect(negotiateEncoding('gzip;q=0.2, zstd;q=0.9', ALL)).toBe('zstd');
  });

  it('excludes encodings with q=0', () => {
    expect(negotiateEncoding('br;q=0, gzip', ALL)).toBe('gzip');
    expect(negotiateEncoding('*;q=0', ALL)).toBeNull();
  });

  it('treats * as matching the best available encoding not listed explicitly', () => {
    expect(negotiateEncoding('*', ALL)).toBe('br');
    expect(negotiateEncoding('br;q=0, *', ALL)).toBe('zstd');
  });

  it('only returns encodings that actually have a variant on disk', () => {
    expect(negotiateEncoding('br, gzip', ['gzip'])).toBe('gzip');
    expect(negotiateEncoding('br', ['gzip'])).toBeNull();
  });

  it('returns null for a missing, empty or identity-only header', () => {
    expect(negotiateEncoding(undefined, ALL)).toBeNull();
    expect(negotiateEncoding('', ALL)).toBeNull();
    expect(negotiateEncoding('identity', ALL)).toBeNull();
  });

  it('is case- and whitespace-tolerant', () => {
    expect(negotiateEncoding('  GZIP ;Q=0.8 ,  Br ; q=0.9 ', ALL)).toBe('br');
  });
});

describe('server wiring', () => {
  it('server compresses dynamic responses and serves precompressed static files', () => {
    const server = readFileSync(resolve(process.cwd(), 'server.ts'), 'utf8');
    expect(server.includes('compression(')).toBe(true);
    expect(server.includes('servePrecompressed(')).toBe(true);
  });

  it('build precompresses the client bundle', () => {
    const pkg = JSON.parse(readFileSync(resolve(process.cwd(), 'package.json'), 'utf8'));
    expect(pkg.scripts.build).toContain('scripts/precompress.ts');
    expect(pkg.dependencies.compression).toBeDefined();
  });
});
