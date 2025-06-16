import { atomWithStorage } from 'jotai/utils';

export type Theme = 'light' | 'dark';

// Configuração do atom com storage
export const themeAtom = atomWithStorage<Theme>('theme', 'light', {
  getItem: (key) => {
    const value = localStorage.getItem(key);
    return value === 'dark' ? 'dark' : 'light';
  },
  setItem: (key, value) => {
    localStorage.setItem(key, value);
  },
  removeItem: (key) => {
    localStorage.removeItem(key);
  },
});
