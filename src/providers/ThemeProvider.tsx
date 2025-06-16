'use client';

import { useEffect } from 'react';

import { useAtom } from 'jotai';

import { themeAtom } from '@/store/theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme] = useAtom(themeAtom);

  // Aplica o tema na inicialização e quando mudar
  useEffect(() => {
    // Verifica o tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme');
    const currentTheme = savedTheme === 'dark' ? 'dark' : 'light';

    // Remove classes existentes
    document.documentElement.classList.remove('light', 'dark');

    // Adiciona a classe do tema atual
    document.documentElement.classList.add(currentTheme);
  }, [theme]);

  return <>{children}</>;
}
