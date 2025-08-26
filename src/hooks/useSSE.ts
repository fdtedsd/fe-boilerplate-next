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
    console.log("Iniciando conexão SSE...");

    const eventSource = new EventSource("/api/sse/connect");
    eventSourceRef.current = eventSource;

    eventSource.onopen = () => {
      console.log("Conexão SSE aberta");
      setIsConnected(true);
    };

    eventSource.onmessage = (event) => {
      console.log("Mensagem SSE recebida (raw):", event.data);

      try {
        const data: SSEData = JSON.parse(event.data);
        console.log("Parsed SSE:", data);

        if (data.connectionId) {
          setConnectionId(data.connectionId);
        }

        setMessages((prev) => [...prev, data]);
      } catch (err) {
        console.error("Erro ao parsear SSE:", err, event.data);
      }
    };

    eventSource.onerror = (err) => {
      console.error("Erro SSE:", err);
      setIsConnected(false);
    };

    return () => {
      console.log("Fechando conexão SSE...");
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
