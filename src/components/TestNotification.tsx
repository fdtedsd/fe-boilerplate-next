'use client';

import { useState } from 'react';
import { useSSE } from '@/hooks/useSSE'; // <-- importe seu hook
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Bell, Send } from 'lucide-react';

export function TestNotification() {
  const { connectionId, isConnected } = useSSE();

  const [formData, setFormData] = useState({
    type: 'notification' as 'message' | 'notification' | 'reminder',
    title: 'Notificação de Teste',
    content: 'Esta é uma notificação de teste para verificar se o sistema está funcionando.',
    sender: 'Sistema de Teste',
  });

  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState<string>('');

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const sendToBackend = async () => {
    setIsSending(true);
    setResult('');

    try {
      const response = await fetch('/api/sse/broadcast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: formData.type,
          title: formData.title,
          content: formData.content,
          sender: formData.sender,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Backend responded with ${response.status}`);
      }

      const resultData = await response.json();
      setResult(`Mensagem enviada para o backend com sucesso! ID: ${resultData.id || 'N/A'}`);
    } catch (error) {
      setResult(`Erro ao enviar para o backend: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Teste de Notificações
        </CardTitle>
        <CardDescription>
          Envie notificações para o backend ou teste localmente
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-2 rounded-md bg-gray-100 text-sm">
          <p>Status SSE: {isConnected ? 'Conectado' : 'Desconectado'}</p>
          <p>Connection ID: {connectionId ?? 'N/A'}</p>
        </div>

        {/* Formulário */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="type">Tipo</Label>
            <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="message">Mensagem</SelectItem>
                <SelectItem value="notification">Notificação</SelectItem>
                <SelectItem value="reminder">Lembrete</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="title">Título</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Título da notificação"
          />
        </div>

        <div>
          <Label htmlFor="content">Conteúdo</Label>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) => handleInputChange('content', e.target.value)}
            placeholder="Conteúdo da notificação"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="sender">Remetente</Label>
          <Input
            id="sender"
            value={formData.sender}
            onChange={(e) => handleInputChange('sender', e.target.value)}
            placeholder="Nome do remetente"
          />
        </div>

        <div className="flex gap-2">
          <Button 
            onClick={sendToBackend} 
            disabled={isSending}
            className="flex-1"
          >
            <Send className="h-4 w-4 mr-2" />
            {isSending ? 'Enviando...' : 'Enviar para Backend'}
          </Button>
        </div>

        {result && (
          <div className={`p-3 rounded-md text-sm ${
            result.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            {result}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function Label({ children, className, ...props }: any) {
  return (
    <label className={`text-sm font-medium ${className || ''}`} {...props}>
      {children}
    </label>
  );
}
