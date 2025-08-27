'use client';

import { useEffect, useRef, useState } from 'react';

interface SSEData {
  [key: string]: any;
}

export function useSSE() {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionId, setConnectionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<SSEData[]>([]);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {

    const eventSource = new EventSource("/api/sse/connect");
    eventSourceRef.current = eventSource;

    eventSource.onopen = () => {
      setIsConnected(true);
    };

    eventSource.onmessage = (event) => {

      try {
        const data: SSEData = JSON.parse(event.data);

        if (data.connectionId) {
          setConnectionId(data.connectionId);
        }

        setMessages((prev) => [...prev, data]);

        // Dispara evento global para que outros hooks (ex.: useNotifications) consumam
        if (typeof window !== 'undefined') {
          try {
            window.dispatchEvent(new CustomEvent('sse-message', { detail: data }));
          } catch (e) {
            console.error('Erro ao disparar evento sse-message', e);
          }
        }
      } catch (err) {
        console.error("Erro ao parsear SSE:", err, event.data);
      }
    };

    eventSource.onerror = (err) => {
      console.error("Erro SSE:", err);
      setIsConnected(false);
    };

    return () => {
      eventSource.close();
      setIsConnected(false);
    };
  }, []);

  return {
    isConnected,
    connectionId,
    messages,
  };
}
