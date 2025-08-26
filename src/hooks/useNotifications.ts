import { useEffect, useCallback, useState } from 'react';
import { useSSE } from './useSSE';

interface Notification {
  id: string;
  type: 'message' | 'notification' | 'reminder';
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
  timestamp: string;
  isRead: boolean;
  sender?: string;
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { isConnected, connectionId } = useSSE();

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'isRead'>) => {
    console.log('useNotifications: Adicionando notificação:', notification);
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

  const removeNotification = useCallback((notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  useEffect(() => {
    console.log('useNotifications: Configurando listener para mensagens SSE...');
    
    const handleSSEMessage = (event: CustomEvent) => {
      console.log('useNotifications: Evento SSE recebido:', event);
      console.log('useNotifications: Detalhes do evento:', event.detail);
      
      const message = event.detail;
      if (message && message.type && message.title && message.content) {
        console.log('useNotifications: Mensagem válida, adicionando notificação');
        addNotification({
          type: message.type,
          title: message.title,
          content: message.content,
          priority: message.priority || 'medium',
          timestamp: message.timestamp || new Date().toISOString(),
          sender: message.sender,
        });
      } else {
        console.error('useNotifications: Estrutura de mensagem inválida:', message);
      }
    };

    window.addEventListener('sse-message', handleSSEMessage as EventListener);
    console.log('useNotifications: Listener configurado com sucesso');

    return () => {
      console.log('useNotifications: Removendo listener');
      window.removeEventListener('sse-message', handleSSEMessage as EventListener);
    };
  }, [addNotification]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    console.log('useNotifications: Notificações atualizadas:', notifications.length);
    console.log('useNotifications: Contagem de não lidas:', unreadCount);
  }, [notifications, unreadCount]);

  return {
    notifications,
    unreadCount,
    isConnected,
    connectionId,
    markAsRead,
    removeNotification,
    clearAll,
  };
}
