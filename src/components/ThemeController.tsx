import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion } from 'framer-motion';

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

// Theme configuration with visual previews
const themeConfigs = {
  auto: { icon: '🌓', label: 'Auto', color: '#7c7c7c', backgroundColor: 'linear-gradient(to right, #f6f6f6, #2c2c2c)' },
  light: { icon: '☀️', label: 'Light', color: '#333333', backgroundColor: '#ffffff' },
  dark: { icon: '🌙', label: 'Dark', color: '#f3f4f6', backgroundColor: '#1f2937' },
  neon: { icon: '💜', label: 'Neon', color: '#fff', backgroundColor: '#121212' },
  minimalist: { icon: '◯', label: 'Minimal', color: '#222', backgroundColor: '#f9f9f9' },
  retro: { icon: '📟', label: 'Retro', color: '#3b2e1e', backgroundColor: '#f8ecd4' }
};

const ThemeController: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="theme-controller fixed top-4 right-4 z-50">
      <motion.button
        className="theme-toggle-btn flex items-center justify-center w-10 h-10 rounded-full bg-opacity-80 backdrop-blur-sm border border-gray-300 shadow-lg"
        style={{
          background: themeConfigs[theme].backgroundColor,
          color: themeConfigs[theme].color
        }}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle theme selector"
      >
        {themeConfigs[theme].icon}
      </motion.button>

      <motion.div
        className="theme-selector-panel absolute top-12 right-0 p-3 rounded-lg shadow-xl backdrop-blur-md border border-gray-200"
        style={{
          backgroundColor: 'rgba(var(--background-color-rgb), 0.85)',
          color: 'var(--text-color)'
        }}
        initial={{ opacity: 0, scale: 0.9, y: -10 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          scale: isOpen ? 1 : 0.9,
          y: isOpen ? 0 : -10,
          pointerEvents: isOpen ? 'auto' : 'none'
        }}
        transition={{ duration: 0.2 }}
      >
        <p className="mb-2 font-medium text-sm">Select Theme:</p>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(themeConfigs).map(([key, config]) => (
            <motion.button
              key={key}
              className={`p-2 rounded-md flex items-center transition-all ${theme === key ? 'ring-2 ring-primary' : 'hover:bg-opacity-10 hover:bg-primary'}`}
              style={{
                background: config.backgroundColor,
                color: config.color,
                border: `1px solid ${config.color}20`
              }}
              onClick={() => {
                setTheme(key as ThemeMode);
                setIsOpen(false);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">{config.icon}</span>
              <span>{config.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ThemeController;
