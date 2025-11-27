'use client';

import { useEffect, useState } from 'react';

/**
 * Hook that returns true only after client-side hydration is complete
 * Use this to prevent hydration mismatches with localStorage or other browser APIs
 */
export function useHydration() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
}