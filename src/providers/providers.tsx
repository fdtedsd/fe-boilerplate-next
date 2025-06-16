'use client';

import { Provider } from 'jotai';

import { ThemeProvider } from './ThemeProvider';

import '@/i18n';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
}
