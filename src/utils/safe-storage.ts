/**
 * Defensive localStorage helpers: persisted data is untrusted (stale schema, manual edits,
 * quota errors, private mode), so reads are validated per key and writes never throw.
 */
export interface StorageLike {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
}

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

/**
 * Takes each default key from `parsed` only when its type matches the default's type
 * (arrays must stay arrays). Unknown extra keys are kept so newer fields are not lost.
 */
export function mergeWithDefaults<T extends object>(parsed: unknown, defaults: T): T {
  if (!isPlainObject(parsed)) return { ...defaults };
  const merged: Record<string, unknown> = { ...parsed };
  const defaultRecord = defaults as Record<string, unknown>;
  for (const key of Object.keys(defaultRecord)) {
    const fallback = defaultRecord[key];
    const candidate = parsed[key];
    const sameShape = Array.isArray(fallback)
      ? Array.isArray(candidate)
      : typeof candidate === typeof fallback && candidate !== null;
    merged[key] = sameShape ? candidate : fallback;
  }
  return merged as T;
}

export function loadJSON<T extends object>(storage: StorageLike | undefined, key: string, defaults: T): T {
  try {
    const raw = storage?.getItem(key);
    if (!raw) return { ...defaults };
    return mergeWithDefaults(JSON.parse(raw), defaults);
  } catch {
    return { ...defaults };
  }
}

export function saveJSON(storage: StorageLike | undefined, key: string, value: unknown): boolean {
  if (!storage) return false;
  try {
    storage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/** Returns window.localStorage when accessible, otherwise undefined (SSR, blocked site data). */
export function getBrowserStorage(): StorageLike | undefined {
  try {
    return typeof window !== 'undefined' ? window.localStorage : undefined;
  } catch {
    return undefined;
  }
}
