'use client';

import { useEffect, useState } from 'react';

import { useForm, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { zodResolver } from '@hookform/resolvers/zod';
import { Bell, Send } from 'lucide-react';
import { z } from 'zod';

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
import { cn } from '@/lib/utils';

export function TestNotification() {
  const { t } = useTranslation();
  const { connectionId, isConnected } = useSSE();
  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState<string>('');

  const schema = z.object({
    type: z.enum(['Message', 'Notification', 'Reminder'], {
      errorMap: () => ({
        message: t('testNotification.errors.typeRequired'),
      }),
    }),
    title: z.string().min(1, { message: t('testNotification.errors.titleRequired') }),
    content: z.string().min(1, { message: t('testNotification.errors.contentRequired') }),
  });

  type FormData = z.infer<typeof schema>;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: 'Notification',
      title: t('testNotification.defaultValues.title'),
      content: t('testNotification.defaultValues.content'),
    },
  });

  // atualiza valores padrão quando a tradução mudar
  useEffect(() => {
    reset({
      type: 'Notification',
      title: t('testNotification.defaultValues.title'),
      content: t('testNotification.defaultValues.content'),
    });
  }, [t, reset]);

  const send = async (data: FormData, url: string) => {
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
          error:
            error instanceof Error ? error.message : t('testNotification.messages.unknownError'),
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

        <form
          onSubmit={handleSubmit((data) => send(data, '/api/sse/broadcast'))}
          className="space-y-4"
        >
          <div>
            <Label htmlFor="type">{t('testNotification.form.type')}</Label>
            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Message">{t('testNotification.types.message')}</SelectItem>
                    <SelectItem value="Notification">
                      {t('testNotification.types.notification')}
                    </SelectItem>
                    <SelectItem value="Reminder">{t('testNotification.types.reminder')}</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div>
            <Label htmlFor="title">{t('testNotification.form.title')}</Label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  id="title"
                  {...field}
                  placeholder={t('testNotification.form.titlePlaceholder')}
                />
              )}
            />
            {errors.title && <p className="text-sm text-red-800 mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <Label htmlFor="content">{t('testNotification.form.content')}</Label>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <Textarea
                  id="content"
                  {...field}
                  placeholder={t('testNotification.form.contentPlaceholder')}
                  rows={3}
                />
              )}
            />
            {errors.content && (
              <p className="text-sm text-red-800 mt-1">{errors.content.message}</p>
            )}
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={isSending} className="flex-1">
              <Send className="h-4 w-4 mr-2" />
              {isSending
                ? t('testNotification.buttons.sending')
                : t('testNotification.buttons.sendToAll')}
            </Button>
            <Button
              type="button"
              onClick={handleSubmit((data) => send(data, `/api/sse/send/${connectionId}`))}
              disabled={isSending}
              className="flex-1"
            >
              <Send className="h-4 w-4 mr-2" />
              {isSending
                ? t('testNotification.buttons.sending')
                : t('testNotification.buttons.sendToCurrent')}
            </Button>
          </div>
        </form>

        {result && (
          <div
            className={cn(
              'p-3 rounded-md text-sm',
              result.includes('Erro') || result.includes('Error')
                ? 'bg-red-50 text-red-800'
                : 'bg-green-50 text-green-800',
            )}
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
