'use client';

import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function DemoForm() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  // Schema de validação com Zod
  const formSchema = z.object({
    name: z.string().min(1, t('form.errors.nameRequired')).min(2, t('form.errors.nameMin')),
    email: z.string().min(1, t('form.errors.emailRequired')).email(t('form.errors.emailInvalid')),
    notifications: z.boolean(),
  });

  type FormValues = z.infer<typeof formSchema>;

  // Hook Form com resolver Zod
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      notifications: false,
    },
  });

  const { handleSubmit, formState, watch } = form;
  const { isSubmitting, errors } = formState;

  // Watch para preview em tempo real
  const watchedValues = watch();

  const onSubmit = async (data: FormValues) => {
    try {
      // Simular envio de formulário
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log('Dados do formulário:', data);
      setSubmitted(true);

      // Reset do form após sucesso
      form.reset();

      // Remove mensagem de sucesso após 3 segundos
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('form.title')}</CardTitle>
        <CardDescription>{t('form.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="form" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="form">{t('form.tabs.form')}</TabsTrigger>
            <TabsTrigger value="preview">{t('form.tabs.preview')}</TabsTrigger>
          </TabsList>

          <TabsContent value="form" className="space-y-4">
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Campo Nome */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.fields.name')}</FormLabel>
                      <FormControl>
                        <Input placeholder={t('form.fields.namePlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Campo Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('form.fields.email')}</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder={t('form.fields.emailPlaceholder')}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Campo Notificações */}
                <FormField
                  control={form.control}
                  name="notifications"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">
                          {t('form.fields.notifications')}
                        </FormLabel>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Separator />

                {/* Botão Submit */}
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting
                    ? t('form.submitting')
                    : submitted
                      ? t('form.submitted')
                      : t('form.submit')}
                </Button>

                {/* Debug: Mostrar erros se houver */}
                {Object.keys(errors).length > 0 && (
                  <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <h4 className="text-sm font-medium text-red-800 dark:text-red-200 mb-2">
                      Erros de validação:
                    </h4>
                    <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
                      {Object.entries(errors).map(([field, error]) => (
                        <li key={field}>• {error?.message}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </form>
            </Form>
          </TabsContent>

          <TabsContent value="preview" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{t('form.preview.title')}</h3>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{t('form.preview.name')}</Badge>
                  <span>{watchedValues.name || t('form.preview.notInformed')}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="outline">{t('form.preview.email')}</Badge>
                  <span>{watchedValues.email || t('form.preview.notInformed')}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="outline">{t('form.preview.notifications')}</Badge>
                  <Badge variant={watchedValues.notifications ? 'default' : 'secondary'}>
                    {watchedValues.notifications
                      ? t('form.preview.enabled')
                      : t('form.preview.disabled')}
                  </Badge>
                </div>
              </div>

              {/* Status de validação */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Status de Validação:</h4>
                <div className="flex items-center gap-2">
                  <Badge variant={Object.keys(errors).length === 0 ? 'default' : 'destructive'}>
                    {Object.keys(errors).length === 0
                      ? '✓ Válido'
                      : `${Object.keys(errors).length} erro(s)`}
                  </Badge>
                </div>
              </div>

              {/* Mensagem de sucesso */}
              {submitted && (
                <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="text-green-800 dark:text-green-200 font-medium">
                    {t('form.preview.success')}
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
