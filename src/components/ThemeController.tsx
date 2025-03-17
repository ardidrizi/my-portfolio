import React, { useState, useEffect, createContext, useContext } from 'react';

type ThemeMode = 'light' | 'dark' | 'neon' | 'minimalist' | 'retro' | 'auto';
type ThemeContextType = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {}
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  // Get saved preference or default to auto (time-based)
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('theme-preference') as ThemeMode;
    return saved || 'auto';
  });

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;

    // Remove all previous theme classes
    root.classList.remove('theme-light', 'theme-dark', 'theme-neon', 'theme-minimalist', 'theme-retro');

    // Handle auto theme based on time of day
    if (theme === 'auto') {
      const hour = new Date().getHours();
      const isDaytime = hour > 7 && hour < 19;
      root.classList.add(isDaytime ? 'theme-light' : 'theme-dark');
    } else {
      root.classList.add(`theme-${theme}`);
    }

    // Save preference
    localStorage.setItem('theme-preference', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const ThemeController: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="theme-controller">
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as ThemeMode)}
        className="theme-selector"
        aria-label="Select theme"
      >
        <option value="auto">Auto (Time-based)</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="neon">Neon</option>
        <option value="minimalist">Minimalist</option>
        <option value="retro">Retro</option>
      </select>
    </div>
  );
};

export default ThemeController;
