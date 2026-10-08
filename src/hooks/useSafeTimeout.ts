import { useEffect, useRef } from 'react';
import { createTimerRegistry, TimerRegistry } from '../utils/timer-registry';

/**
 * Component-scoped timeouts: re-scheduling a key replaces its timer,
 * and every pending timer is cleared when the component unmounts.
 */
export function useSafeTimeout(): TimerRegistry {
  const registryRef = useRef<TimerRegistry | null>(null);
  if (registryRef.current === null) {
    registryRef.current = createTimerRegistry();
  }

  useEffect(() => {
    const registry = registryRef.current;
    return () => registry?.clearAll();
  }, []);

  return registryRef.current;
}
