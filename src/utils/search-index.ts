import { normalizeSearchQuery } from './uiux-laws';

/**
 * Prebuilt search index: one normalized haystack string per record (index-aligned with the
 * record list), built once. Per keystroke the query is normalized once and each record costs a
 * single `includes`, instead of re-normalizing every field of every record.
 */

// Joins fields so a query can never match across a field boundary (typed queries cannot contain it).
const FIELD_SEPARATOR = '\u0001';

export function buildSearchIndex<T>(
  records: readonly T[],
  pickFields: (record: T) => ReadonlyArray<string | undefined | null>
): string[] {
  const index: string[] = new Array(records.length);
  for (let i = 0; i < records.length; i++) {
    const fields = pickFields(records[i]);
    const parts: string[] = [];
    for (const field of fields) {
      if (field) parts.push(normalizeSearchQuery(field));
    }
    index[i] = parts.join(FIELD_SEPARATOR);
  }
  return index;
}

/**
 * Writes 1/0 per record into `outMask` (reused across keystrokes) and returns the match count.
 * An empty or whitespace-only query matches everything.
 */
export function matchSearchIndex(index: readonly string[], query: string, outMask: Uint8Array): number {
  const needle = normalizeSearchQuery(query);
  let matches = 0;
  for (let i = 0; i < index.length; i++) {
    const hit = needle === '' || index[i].includes(needle) ? 1 : 0;
    outMask[i] = hit;
    matches += hit;
  }
  return matches;
}
