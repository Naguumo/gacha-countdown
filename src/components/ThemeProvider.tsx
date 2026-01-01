import { createContext, type ReactNode, useContext, useEffect, useReducer, useState } from 'react';
import z from 'zod';

const themeSchema = z.enum(['dark', 'light', 'system']);
type Theme = z.infer<typeof themeSchema>;

type ThemeProviderProps = {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

const storageKey = 'ui-theme';
const defaultTheme: Theme = 'system';
const getThemeFromLocalStorage = (): Theme => {
  if (typeof window === 'undefined') return defaultTheme;
  const storedThemeParse = themeSchema.safeParse(localStorage.getItem(storageKey));

  if (!storedThemeParse.success) {
    localStorage.setItem(storageKey, defaultTheme);
    return defaultTheme;
  }

  return storedThemeParse.data;
};

export function ThemeProvider({ children, defaultTheme = 'system', storageKey = 'ui-theme', ...props }: ThemeProviderProps) {
  const [theme, setTheme] = useReducer((prev: Theme, next: Theme) => {
    if (prev === next) return prev;
    localStorage.setItem(storageKey, next);
    return next;
  }, getThemeFromLocalStorage());

  const value = {
    theme,
    setTheme,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export function getInitializeThemeScript() {
  return `
function initializeTheme() {
  const theme = '${getThemeFromLocalStorage()}';
  const root = window.document.documentElement;

  if (theme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    root.setAttribute('data-theme', systemTheme);
    return;
  }
  root.setAttribute('data-theme', theme);
}
initializeTheme()
  `;
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
