import { useEffect, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const {t} = useTranslation;


interface Notification {
  id: string;
  type: 'message' | 'notification' | 'reminder';
  title: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const recentKeysRef = useRef<Set<string>>(new Set());

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'isRead'>) => {
    const newNotification: Notification = {
      ...notification,
      id: crypto.randomUUID(),
      isRead: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  }, []);

  const markAsRead = useCallback((notificationId: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  }, []);

  const removeNotification = useCallback((notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  useEffect(() => {
    
    const handleSSEMessage = (event: CustomEvent) => {
      const payload: any = event.detail;
      if (!payload?.type) return;
      if (payload.type === 'connected' || payload.type === 'ping' || payload.type === 'keepalive') return;
      const normalizedTitle = payload.title || payload.event || payload.type || 'Notificação';
      const normalizedContent = payload.content ?? payload.message;
      if (!normalizedContent) return;

      const normalizedTimestamp = payload.timestamp || undefined;
      const contentString = typeof normalizedContent === 'string' ? normalizedContent : JSON.stringify(normalizedContent);
      const deduplicateKey = payload.id
        ? String(payload.id)
        : normalizedTimestamp
          ? `${normalizedTitle}::${contentString}::${normalizedTimestamp}`
          : `${normalizedTitle}::${contentString}`;
      if (recentKeysRef.current.has(deduplicateKey)) {
        return;
      }
      recentKeysRef.current.add(deduplicateKey);
      if (recentKeysRef.current.size > 200) {
        const iter = recentKeysRef.current.values().next();
        if (!iter.done) {
          recentKeysRef.current.delete(iter.value);
        }
      }

      addNotification({
        type: (payload.type === 'message' || payload.type === 'notification' || payload.type === 'reminder')
          ? payload.type
          : 'notification',
        title: normalizedTitle,
        content: typeof normalizedContent === 'string' ? normalizedContent : JSON.stringify(normalizedContent),
        timestamp: normalizedTimestamp || new Date().toISOString(),
      });
    };

    window.addEventListener('sse-message', handleSSEMessage as EventListener);

    return () => {
      window.removeEventListener('sse-message', handleSSEMessage as EventListener);
    };
  }, [addNotification]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
  }, [notifications, unreadCount]);

  const formatTimestamp = useCallback((isoString: string) => {
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
  }, []);

  return {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    formatTimestamp,
  };
}
