import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'auto';

interface ThemeContextType {
  theme: Theme;
  actualTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('auto');
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');

  // Detect system preference
  const getSystemTheme = (): 'light' | 'dark' => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  // Update actual theme based on theme setting
  useEffect(() => {
    let newActualTheme: 'light' | 'dark';
    
    if (theme === 'auto') {
      newActualTheme = getSystemTheme();
    } else {
      newActualTheme = theme;
    }
    
    setActualTheme(newActualTheme);
    
    // Update document classes and CSS variables
    document.documentElement.setAttribute('data-theme', newActualTheme);
    document.documentElement.className = newActualTheme;
    
    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', newActualTheme === 'dark' ? '#1a1a1a' : '#ffffff');
    }
    
    // Save to localStorage
    localStorage.setItem('theme-preference', theme);
  }, [theme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (theme === 'auto') {
        setActualTheme(getSystemTheme());
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Load saved preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme-preference') as Theme;
    if (savedTheme && ['light', 'dark', 'auto'].includes(savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  const toggleTheme = () => {
    setTheme(current => {
      if (current === 'light') return 'dark';
      if (current === 'dark') return 'auto';
      return 'light';
    });
  };

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      actualTheme, 
      setTheme: handleSetTheme, 
      toggleTheme 
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
