import { useAtom } from 'jotai';

import { themeAtom } from '@/store/theme';

export function useTheme() {
  const [theme, setTheme] = useAtom(themeAtom);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
}
