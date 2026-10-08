/**
 * Post-build step: writes .br / .gz (and .zst when supported) next to every compressible
 * asset in dist/. Run automatically by `npm run build`.
 */
import path from 'node:path';
import { precompressDirectory, ZSTD_AVAILABLE } from '../server/precompress';

const dist = path.join(process.cwd(), 'dist');
const stats = precompressDirectory(dist);
const kb = (n: number) => `${(n / 1024).toFixed(1)} KB`;

console.log(
  `precompress: ${stats.files} files, ${stats.written} variants (br, gzip${ZSTD_AVAILABLE ? ', zstd' : ''}) · ` +
    `${kb(stats.bytesIn)} → ${kb(stats.bytesOut)} smallest-encoding total`
);
if (!ZSTD_AVAILABLE) {
  console.log('precompress: zstd skipped (needs Node ≥ 22.15 / 23.8); clients fall back to br/gzip');
}
