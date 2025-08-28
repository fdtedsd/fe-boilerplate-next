import type { Notification } from '@/hooks/useNotifications';

export function formatTimestamp(isoString: string) {
  try {
    const date = new Date(isoString);
    if (Number.isNaN(date.getTime())) return isoString;
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(date);
  } catch {
    return isoString;
  }
}

export function createNotificationFromPayload(
  payload: any,
): Omit<Notification, 'id' | 'isRead'> | null {
  if (!payload?.type) return null;
  if (payload.type === 'connected' || payload.type === 'ping' || payload.type === 'keepalive')
    return null;

  const normalizedTitle = payload.title || payload.event || payload.type || 'Notificação';
  const normalizedContent = payload.content ?? payload.message;
  if (!normalizedContent) return null;

  const normalizedTimestamp = payload.timestamp || new Date().toISOString();

  return {
    type: ['message', 'notification', 'reminder'].includes(payload.type)
      ? payload.type
      : 'notification',
    title: normalizedTitle,
    content:
      typeof normalizedContent === 'string' ? normalizedContent : JSON.stringify(normalizedContent),
    timestamp: normalizedTimestamp,
  };
}
