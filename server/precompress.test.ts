import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mkdtempSync, rmSync, writeFileSync, readFileSync, existsSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { brotliDecompressSync, gunzipSync } from 'node:zlib';
import { randomBytes } from 'node:crypto';
import { precompressDirectory, ZSTD_AVAILABLE } from './precompress';

let dir: string;
const js = 'export const greet = (name) => `Jhorle, ${name}!`;\n'.repeat(200); // ~11 KB, compressible

beforeEach(() => {
  dir = mkdtempSync(join(tmpdir(), 'precompress-'));
  mkdirSync(join(dir, 'assets'));
  writeFileSync(join(dir, 'assets', 'app.js'), js);
  writeFileSync(join(dir, 'index.html'), '<!doctype html><title>x</title>'); // < 1 KB
  writeFileSync(join(dir, 'assets', 'logo.png'), Buffer.alloc(4096, 1)); // not a text asset
  writeFileSync(join(dir, 'server.cjs'), js); // server bundle, never served
  writeFileSync(join(dir, 'assets', 'app.js.map'), js); // source map, skipped
  writeFileSync(join(dir, 'assets', 'noise.json'), randomBytes(8192)); // incompressible
});

afterEach(() => {
  rmSync(dir, { recursive: true, force: true });
});

describe('precompressDirectory', () => {
  it('writes .br and .gz variants that decompress byte-identically', () => {
    const stats = precompressDirectory(dir);
    const br = readFileSync(join(dir, 'assets', 'app.js.br'));
    const gz = readFileSync(join(dir, 'assets', 'app.js.gz'));
    expect(brotliDecompressSync(br).toString()).toBe(js);
    expect(gunzipSync(gz).toString()).toBe(js);
    expect(br.length).toBeLessThan(js.length / 5);
    expect(stats.bytesOut).toBeLessThan(stats.bytesIn);
  });

  it('writes .zst only when the runtime supports zstd', () => {
    precompressDirectory(dir);
    expect(existsSync(join(dir, 'assets', 'app.js.zst'))).toBe(ZSTD_AVAILABLE);
  });

  it('skips small files, binary assets, server bundles and source maps', () => {
    precompressDirectory(dir);
    for (const skipped of ['index.html', 'assets/logo.png', 'server.cjs', 'assets/app.js.map']) {
      expect(existsSync(join(dir, `${skipped}.br`)), skipped).toBe(false);
      expect(existsSync(join(dir, `${skipped}.gz`)), skipped).toBe(false);
    }
  });

  it('never writes a variant larger than the original', () => {
    precompressDirectory(dir);
    const original = readFileSync(join(dir, 'assets', 'noise.json')).length;
    for (const ext of ['.br', '.gz', '.zst']) {
      const variant = join(dir, 'assets', `noise.json${ext}`);
      if (existsSync(variant)) expect(readFileSync(variant).length).toBeLessThan(original);
    }
  });

  it('is idempotent (does not compress its own .br/.gz output)', () => {
    precompressDirectory(dir);
    const second = precompressDirectory(dir);
    expect(existsSync(join(dir, 'assets', 'app.js.br.br'))).toBe(false);
    expect(second.written).toBeGreaterThanOrEqual(0);
  });
});
