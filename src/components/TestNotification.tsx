'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Bell, Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { useSSE } from '@/hooks/useSSE';

export function TestNotification() {
  const { t } = useTranslation();
  const { connectionId, isConnected } = useSSE();

  const [formData, setFormData] = useState({
    type: 'Notification' as 'Message' | 'Notification' | 'Reminder',
    title: t('testNotification.defaultValues.title'),
      content: t('testNotification.defaultValues.content'),
  });

  // Atualizar os valores padrão quando a tradução estiver disponível
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      title: t('testNotification.defaultValues.title'),
      content: t('testNotification.defaultValues.content'),
    }));
  }, [t]);

  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState<string>('');

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const broadcastToBackend = async () => {
    setIsSending(true);
    setResult('');

    try {
      //send to one connectionId
      const response = await fetch('/api/sse/broadcast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: formData.type,
          title: formData.title,
          content: formData.content,
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

  const messageConnection = async () => {
    setIsSending(true);
    setResult('');

    //send to all connections
    try {
      const response = await fetch(`/api/sse/send/${connectionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: formData.type,
          title: formData.title,
          content: formData.content,
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          {t('testNotification.title')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p>
            {t('testNotification.status')}:{' '}
            {isConnected ? t('testNotification.connected') : t('testNotification.disconnected')}
          </p>
          <p>
            {t('testNotification.connectionId')}:{' '}
            {connectionId ?? t('testNotification.notConnected')}
          </p>
        </div>

        {/* Formulário */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="type">{t('testNotification.form.type')}</Label>
            <Select
              value={formData.type}
              onValueChange={(value) => handleInputChange('type', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Message">{t('testNotification.types.message')}</SelectItem>
                <SelectItem value="Notification">{t('testNotification.types.notification')}</SelectItem>
                <SelectItem value="Reminder">{t('testNotification.types.reminder')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label htmlFor="title">{t('testNotification.form.title')}</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder={t('testNotification.form.titlePlaceholder')}
          />
        </div>

        <div>
          <Label htmlFor="content">{t('testNotification.form.content')}</Label>
          <Textarea
            id="content"
            value={formData.content}
            onChange={(e) => handleInputChange('content', e.target.value)}
            placeholder={t('testNotification.form.contentPlaceholder')}
            rows={3}
          />
        </div>

        <div className="flex gap-2">
          <Button onClick={broadcastToBackend} disabled={isSending} className="flex-1">
            <Send className="h-4 w-4 mr-2" />
            {isSending ? t('testNotification.buttons.sending') : t('testNotification.buttons.sendToAll')}
          </Button>
          <Button onClick={messageConnection} disabled={isSending} className="flex-1">
            <Send className="h-4 w-4 mr-2" />
            {isSending ? t('testNotification.buttons.sending') : t('testNotification.buttons.sendToCurrent')}
          </Button>
        </div>

        {result && (
          <div
            className={`p-3 rounded-md text-sm ${
              result.includes('Erro') || result.includes('Error')
                ? 'bg-red-50 text-red-800'
                : 'bg-green-50 text-green-800'
            }`}
          >
            {result}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function Label({ children, className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className={`text-sm font-medium ${className || ''}`} {...props}>
      {children}
    </label>
  );
}
