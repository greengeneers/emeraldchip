import { useEffect, useState } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    let initialTheme = localStorage.getItem('theme');

    if (!initialTheme) {
      initialTheme = window.matchMedia('(prefers-color-scheme: dark)')
        ? 'dark'
        : 'light';
    }

    localStorage.setItem('theme', initialTheme);
    document.body.classList.add(initialTheme);

    return initialTheme;
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(theme);
  }, [theme]);

  return [theme, setTheme];
};

export default useTheme;
