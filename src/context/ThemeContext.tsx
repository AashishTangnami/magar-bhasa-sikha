import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'dark' | 'bright';

interface ThemeContextType {
  theme: Theme;
  isBright: boolean;
  toggleTheme: () => void;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('magar_app_theme');
      if (saved === 'bright' || saved === 'dark') {
        return saved;
      }
      // Check system preference
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'bright';
      }
    } catch {
      // Fallback
    }
    return 'dark';
  });

  useEffect(() => {
    try {
      localStorage.setItem('magar_app_theme', theme);
    } catch {
      // safe fallback
    }

    const root = document.documentElement;
    const body = document.body;

    if (theme === 'bright') {
      root.classList.remove('dark', 'theme-dark');
      root.classList.add('light', 'theme-bright');
      body.classList.remove('dark', 'theme-dark', 'bg-stone-950', 'text-stone-100');
      body.classList.add('light', 'theme-bright', 'bg-stone-50', 'text-stone-900');
    } else {
      root.classList.remove('light', 'theme-bright');
      root.classList.add('dark', 'theme-dark');
      body.classList.remove('light', 'theme-bright', 'bg-stone-50', 'text-stone-900');
      body.classList.add('dark', 'theme-dark', 'bg-stone-950', 'text-stone-100');
    }
  }, [theme]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'dark' ? 'bright' : 'dark'));
  };

  const setTheme = (t: Theme) => {
    setThemeState(t);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isBright: theme === 'bright',
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
