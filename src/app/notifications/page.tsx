'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { TestNotification } from '@/components/TestNotification';

export default function NotificationsPage() {
  const { t } = useTranslation();

  useEffect(() => {
    const es = new EventSource('/api/sse/connect');

    return () => es.close();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">{t('notifications.title')}</h1>
          <p className="text-muted-foreground mt-2">{t('notifications.description')}</p>
        </div>

        <div className="grid gap-6">
          <div></div>
          <div>
            <TestNotification />
          </div>
        </div>
      </div>
    </div>
  );
}
