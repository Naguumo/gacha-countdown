import { useEffect, useState } from 'react';

import { tailwind } from '@/generated/tailwindcss';

type BreakPoint = keyof typeof tailwind.variants.default.breakpoints;

export function useMediaBreakPoint(checkedBreakPoint: BreakPoint, defaultValue: boolean) {
  const [isMatchingBreakpoint, setIsMatchingBreakpoint] = useState(defaultValue);
  useEffect(() => {
    if (typeof window === 'undefined' || !('matchMedia' in window) || !window.matchMedia) {
      setIsMatchingBreakpoint(defaultValue);
      return;
    }

    const value = tailwind.variants.default.breakpoints[checkedBreakPoint];
    const query = window.matchMedia(`(min-width: ${value})`);
    setIsMatchingBreakpoint(query.matches);

    const listener = (event: MediaQueryListEvent) => {
      setIsMatchingBreakpoint(event.matches);
    };
    query.addEventListener('change', listener);
    return () => query.removeEventListener('change', listener);
  }, [checkedBreakPoint, defaultValue]);

  return isMatchingBreakpoint;
}
