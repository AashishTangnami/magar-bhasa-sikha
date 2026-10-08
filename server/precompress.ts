import { readdirSync, readFileSync, statSync, writeFileSync, existsSync, unlinkSync } from 'node:fs';
import { join, extname } from 'node:path';
import * as zlib from 'node:zlib';

/**
 * Build-time precompression of the client bundle. Each compressible text asset gets
 * `.br` (Brotli q11), `.gz` (gzip level 9) and — when the running Node supports it —
 * `.zst` (zstd level 19) siblings, so the server never compresses static files per request.
 */

/** Web text assets worth compressing. Source maps and the server bundle are deliberately excluded. */
export const COMPRESSIBLE_EXTENSIONS: ReadonlySet<string> = new Set([
  '.js', '.mjs', '.css', '.html', '.json', '.svg', '.txt', '.xml', '.webmanifest',
]);

export const MIN_COMPRESS_BYTES = 1024;

type ZstdCompressSync = (buf: Buffer, options?: { params?: Record<number, number> }) => Buffer;
const zstdCompressSync = (zlib as unknown as { zstdCompressSync?: ZstdCompressSync }).zstdCompressSync;
const ZSTD_LEVEL_PARAM = (zlib.constants as unknown as Record<string, number>).ZSTD_c_compressionLevel;

/** True on Node versions that ship zstd in node:zlib (≥ 22.15 / 23.8). */
export const ZSTD_AVAILABLE = typeof zstdCompressSync === 'function' && typeof ZSTD_LEVEL_PARAM === 'number';

export interface PrecompressStats {
  files: number;
  written: number;
  bytesIn: number;
  bytesOut: number;
}

function compressors(): ReadonlyArray<readonly [string, (buf: Buffer) => Buffer]> {
  const list: Array<readonly [string, (buf: Buffer) => Buffer]> = [
    ['.br', (buf) => zlib.brotliCompressSync(buf, {
      params: {
        [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY,
        [zlib.constants.BROTLI_PARAM_SIZE_HINT]: buf.length,
      },
    })],
    ['.gz', (buf) => zlib.gzipSync(buf, { level: zlib.constants.Z_BEST_COMPRESSION })],
  ];
  if (ZSTD_AVAILABLE) {
    list.push(['.zst', (buf) => zstdCompressSync!(buf, { params: { [ZSTD_LEVEL_PARAM]: 19 } })]);
  }
  return list;
}

export function precompressDirectory(dir: string, minBytes = MIN_COMPRESS_BYTES): PrecompressStats {
  const stats: PrecompressStats = { files: 0, written: 0, bytesIn: 0, bytesOut: 0 };
  const encoders = compressors();

  const walk = (current: string) => {
    for (const name of readdirSync(current)) {
      const path = join(current, name);
      const info = statSync(path);
      if (info.isDirectory()) {
        walk(path);
        continue;
      }
      if (!COMPRESSIBLE_EXTENSIONS.has(extname(name)) || info.size < minBytes) continue;

      const original = readFileSync(path);
      stats.files++;
      stats.bytesIn += original.length;
      let smallest = original.length;
      for (const [ext, encode] of encoders) {
        const target = path + ext;
        const compressed = encode(original);
        if (compressed.length < original.length) {
          writeFileSync(target, compressed);
          stats.written++;
          smallest = Math.min(smallest, compressed.length);
        } else if (existsSync(target)) {
          unlinkSync(target); // stale variant from an earlier build
        }
      }
      stats.bytesOut += smallest;
    }
  };

  walk(dir);
  return stats;
}
