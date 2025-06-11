'use client';

import { useTranslation } from 'react-i18next';

import { Palette } from 'lucide-react';

import { DesignTokensDemo } from '@/components/DesignTokensDemo';

export default function DesignTokensPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-full bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col gap-4 py-8 text-center">
          <div className="flex items-center justify-center gap-2">
            <Palette className="h-6 w-6" />
            <h1 className="text-3xl font-bold">{t('designTokens.title')}</h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            {t('designTokens.description')}
          </p>
        </div>

        <DesignTokensDemo />
      </div>
    </div>
  );
}
