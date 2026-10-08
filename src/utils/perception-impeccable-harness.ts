/**
 * Perception-First Design helpers.
 */

/**
 * Formats metadata as clean unboxed text with typographic separators.
 * Enforces Zero-Pill Discipline: no static pill capsules, badges, or chips.
 */
export function formatUnboxedMetadata(items: (string | undefined | null)[]): string {
  return items.filter((item): item is string => Boolean(item && item.trim().length > 0)).join(' · ');
}
