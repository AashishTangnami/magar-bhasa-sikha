/**
 * Keyed timeout registry. Re-arming a key cancels its pending timer (no stacking),
 * and clearAll() cancels everything — call it on component unmount.
 */
export interface TimerRegistry {
  schedule: (key: string, fn: () => void, delayMs: number) => void;
  cancel: (key: string) => void;
  clearAll: () => void;
  size: () => number;
}

export function createTimerRegistry(): TimerRegistry {
  const timers = new Map<string, ReturnType<typeof setTimeout>>();

  const cancel = (key: string) => {
    const id = timers.get(key);
    if (id !== undefined) {
      clearTimeout(id);
      timers.delete(key);
    }
  };

  return {
    schedule: (key, fn, delayMs) => {
      cancel(key);
      timers.set(
        key,
        setTimeout(() => {
          timers.delete(key);
          fn();
        }, delayMs)
      );
    },
    cancel,
    clearAll: () => {
      timers.forEach((id) => clearTimeout(id));
      timers.clear();
    },
    size: () => timers.size,
  };
}
