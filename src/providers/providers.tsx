'use client';

import { Provider } from 'jotai';

import { DesignTokenProvider } from '@/components/DesignTokenProvider';

import '@/i18n';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider>
      <DesignTokenProvider>{children}</DesignTokenProvider>
    </Provider>
  );
}
