import { useEffect, useState } from 'react';
import ThemeContext from './theme-context';

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    let initialTheme = localStorage.getItem('theme');

    if (!initialTheme) {
      initialTheme = window.matchMedia('(prefers-color-scheme: dark)')
        ? 'dark'
        : 'light';

      localStorage.setItem('theme', initialTheme);
    }
    document.body.classList.add(initialTheme);
    return initialTheme;
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(theme);
  }, [theme]);

  const toggleTheme = () => {
    let newTheme;

    if (theme === 'dark') {
      newTheme = 'light';
    } else {
      newTheme = 'dark';
    }

    setTheme(newTheme);
  };

  const context = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
