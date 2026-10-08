/**
 * Content-Encoding negotiation (RFC 9110 §12.5.3) for precompressed static files.
 * Server preference order: br → zstd → gzip. Client q-values win; ties go to server order.
 */
export type Encoding = 'br' | 'zstd' | 'gzip';

export const ENCODING_PREFERENCE: readonly Encoding[] = ['br', 'zstd', 'gzip'];

export const ENCODING_EXTENSION: Readonly<Record<Encoding, string>> = {
  br: '.br',
  zstd: '.zst',
  gzip: '.gz',
};

/**
 * Picks the best encoding the client accepts among `available` (variants that exist on disk).
 * Returns null when the client accepts none of them (serve the uncompressed original).
 */
export function negotiateEncoding(acceptEncoding: string | undefined, available: readonly Encoding[]): Encoding | null {
  if (!acceptEncoding || available.length === 0) return null;

  const explicit = new Map<string, number>();
  let wildcard: number | undefined;
  for (const part of acceptEncoding.split(',')) {
    const [rawName, ...params] = part.trim().toLowerCase().split(';');
    const name = rawName.trim();
    if (!name) continue;
    let q = 1;
    for (const param of params) {
      const [key, value] = param.trim().split('=');
      if (key === 'q') {
        const parsed = Number.parseFloat(value);
        q = Number.isFinite(parsed) ? Math.min(1, Math.max(0, parsed)) : 0;
      }
    }
    if (name === '*') wildcard = q;
    else explicit.set(name, q);
  }

  let best: Encoding | null = null;
  let bestQ = 0;
  for (const encoding of ENCODING_PREFERENCE) {
    if (!available.includes(encoding)) continue;
    const q = explicit.get(encoding) ?? wildcard ?? 0;
    // Strictly greater keeps the earlier (server-preferred) encoding on ties
    if (q > bestQ) {
      best = encoding;
      bestQ = q;
    }
  }
  return best;
}
