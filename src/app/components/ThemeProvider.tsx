'use client';

import { createContext, useContext, useEffect } from 'react';
import { useApp } from '../context/AppContext';

const ThemeContext = createContext<{
  theme: 'light' | 'dark';
  toggleTheme: () => void;
} | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useApp();

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
}; 