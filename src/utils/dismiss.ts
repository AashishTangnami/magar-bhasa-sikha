/**
 * Close-on-outside behaviour for popovers (dropdowns, drawers).
 *
 * `onDismiss(node)` gets the pointer-down target so callers can keep a menu open
 * when the press lands inside it, or `null` for Escape / page scroll, which close
 * everything. Element scroll events don't bubble to `window`, so scrolling inside
 * a menu never dismisses it. Returns a cleanup that detaches all listeners.
 */
export function bindDismiss(
  target: EventTarget,
  onDismiss: (node: EventTarget | null) => void,
): () => void {
  const onPointerDown = (e: Event) => onDismiss(e.target);
  const onKeyDown = (e: Event) => {
    if ((e as KeyboardEvent).key === 'Escape') onDismiss(null);
  };
  const onScroll = () => onDismiss(null);

  // Capture phase so a child's stopPropagation can't swallow the outside press.
  target.addEventListener('pointerdown', onPointerDown, { capture: true });
  target.addEventListener('keydown', onKeyDown);
  target.addEventListener('scroll', onScroll, { passive: true });

  return () => {
    target.removeEventListener('pointerdown', onPointerDown, { capture: true });
    target.removeEventListener('keydown', onKeyDown);
    target.removeEventListener('scroll', onScroll);
  };
}
