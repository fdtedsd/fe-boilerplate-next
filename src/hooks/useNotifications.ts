import { useCallback, useEffect, useRef, useState } from 'react';

import { createNotificationFromPayload, formatTimestamp } from '@/utils/notifications';

export type NotificationType = 'message' | 'notification' | 'reminder';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const recentKeysRef = useRef<Set<string>>(new Set());

  const addNotification = useCallback((newNotification: Omit<Notification, 'id' | 'isRead'>) => {
    setNotifications((prev) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      const notification: Notification = {
        ...newNotification,
        id,
        isRead: false,
      };
      return [notification, ...prev];
    });
    setUnreadCount((c) => c + 1);
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
    setUnreadCount((c) => Math.max(0, c - 1));
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    setUnreadCount(0);
  }, []);

  useEffect(() => {
    const handleSSEMessage = (event: CustomEvent) => {
      const payload = event.detail;
      const notification = createNotificationFromPayload(payload);
      if (!notification) return;

      //Previne duplicação da mensagem
      const deduplicateKey = payload.id
        ? String(payload.id)
        : `${notification.title}::${notification.content}::${notification.timestamp}`;

      if (recentKeysRef.current.has(deduplicateKey)) return;
      recentKeysRef.current.add(deduplicateKey);

      if (recentKeysRef.current.size > 200) {
        const iter = recentKeysRef.current.values().next();
        if (!iter.done) {
          recentKeysRef.current.delete(iter.value);
        }
      }

      addNotification(notification);
    };

    window.addEventListener('sse-message', handleSSEMessage as EventListener);
    return () => {
      window.removeEventListener('sse-message', handleSSEMessage as EventListener);
    };
  }, [addNotification]);

  return {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    formatTimestamp,
  };
}
