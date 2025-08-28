import { useState } from 'react';

export function useNotificationSender() {
  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState<string>('');

  const sendNotification = async (data: any, url: string, t: any) => {
    setIsSending(true);
    setResult('');

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Backend responded with ${response.status}`);
      }

      setResult(t('testNotification.messages.success'));
    } catch (error) {
      setResult(
        t('testNotification.messages.error', {
          error: error instanceof Error ? error.message : t('testNotification.messages.unknownError'),
        }),
      );
    } finally {
      setIsSending(false);
    }
  };

  return { sendNotification, isSending, result };
}
