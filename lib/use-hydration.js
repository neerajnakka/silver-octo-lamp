'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/lib/store';

/**
 * Hook that returns true only after client-side hydration is complete
 * AND the Zustand store has finished rehydrating from localStorage.
 */
export function useHydration() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Check if store is already hydrated
    if (useStore.getState()._hasHydrated) {
      setIsHydrated(true);
      return;
    }

    // Subscribe to store changes to detect hydration
    const unsub = useStore.subscribe((state) => {
      if (state._hasHydrated) {
        setIsHydrated(true);
      }
    });

    return () => unsub();
  }, []);

  return isHydrated;
}