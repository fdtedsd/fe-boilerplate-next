'use client';

import { useTranslation } from 'react-i18next';

import { FileText } from 'lucide-react';

import { DemoForm } from '@/components/DemoForm';

export default function FormsPage() {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-8 text-center">
        <div className="flex items-center justify-center gap-2">
          <FileText className="h-6 w-6" />
          <h1 className="text-3xl font-bold">{t('forms.title')}</h1>
        </div>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t('forms.description')}</p>
      </div>

      <DemoForm />
    </div>
  );
}
