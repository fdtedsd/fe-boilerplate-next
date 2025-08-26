'use client';

import { TestNotification } from "@/components/TestNotification";
import { useEffect } from "react";


export default function NotificationsPage() {

  useEffect(() => {
    const es = new EventSource("/api/sse/connect");
  
    es.onopen = () => console.log("🔗 Conectado ao SSE");
  
    es.addEventListener("connected", (e) => {
      const data = JSON.parse((e as MessageEvent).data);
      console.log("🆔 ConnectionID:", data.connectionId);
    });
  
    es.onmessage = (e) => {
      console.log("Mensagem recebida:", e.data);
    };
  
    es.onerror = (err) => console.error("SSE error:", err);
  
    return () => es.close();
  }, []);
  

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Sistema de Notificações SSE</h1>
          <p className="text-muted-foreground mt-2">
            Teste o sistema de notificações em tempo real com Server-Sent Events
          </p>
        </div>
        
        <div className="grid gap-6">
          <div>
          </div>
          <div>
            <TestNotification />
          </div>
        </div>
      </div>
    </div>
  );
}
