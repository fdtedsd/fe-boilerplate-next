'use client';

import { useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { atom, useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { Atom, Database, Globe, Zap } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { counterAtom } from '@/store/atoms/counter';
import { languageAtom } from '@/store/atoms/language';

// Criando alguns atoms adicionais para demonstração

// Atom simples
const messageAtom = atom('');

// Atom com valor inicial
const userAtom = atom({ name: '', email: '' });

// Atom com storage
const preferencesAtom = atomWithStorage('user-preferences', {
  notifications: true,
  theme: 'auto',
  language: 'pt',
});

// Atom derivado (computed)
const counterDoubledAtom = atom((get) => get(counterAtom) * 2);

// Atom write-only
const incrementByAtom = atom(null, (get, set, amount: number) => {
  const current = get(counterAtom);
  set(counterAtom, current + amount);
});

export default function AtomsPage() {
  const { t, i18n } = useTranslation();

  // Usando os atoms
  const [counter, setCounter] = useAtom(counterAtom);
  const [language, setLanguage] = useAtom(languageAtom);
  const [message, setMessage] = useAtom(messageAtom);
  const [user, setUser] = useAtom(userAtom);
  const [preferences, setPreferences] = useAtom(preferencesAtom);
  const [counterDoubled] = useAtom(counterDoubledAtom);
  const [, incrementBy] = useAtom(incrementByAtom);

  // Estado local para exemplo
  const [customIncrement, setCustomIncrement] = useState(1);

  // Sincronizar o atom language com o react-i18next
  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);

  // Função para trocar idioma (atualiza tanto o atom quanto o i18n)
  const handleLanguageChange = (lng: string) => {
    setLanguage(lng);
    i18n.changeLanguage(lng);
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2">
          <Atom className="h-6 w-6" />
          <h1 className="text-3xl font-bold">{t('atoms.title')}</h1>
        </div>
        <p className="text-muted-foreground text-lg">{t('atoms.description')}</p>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">{t('atoms.tabs.basic')}</TabsTrigger>
          <TabsTrigger value="derived">{t('atoms.tabs.derived')}</TabsTrigger>
          <TabsTrigger value="storage">{t('atoms.tabs.storage')}</TabsTrigger>
          <TabsTrigger value="advanced">{t('atoms.tabs.advanced')}</TabsTrigger>
        </TabsList>

        {/* Basic Atoms */}
        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                {t('atoms.basic.title')}
              </CardTitle>
              <CardDescription>{t('atoms.basic.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Counter Atom */}
              <div>
                <h4 className="font-semibold mb-3">{t('atoms.basic.counter.title')}</h4>
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="text-xl px-4 py-2">
                    {counter}
                  </Badge>
                  <div className="flex gap-2">
                    <Button onClick={() => setCounter((c) => c - 1)} variant="outline" size="sm">
                      -1
                    </Button>
                    <Button onClick={() => setCounter(0)} variant="outline" size="sm">
                      Reset
                    </Button>
                    <Button onClick={() => setCounter((c) => c + 1)} variant="outline" size="sm">
                      +1
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>Código:</strong> <code>{t('atoms.basic.counter.code')}</code>
                </p>
              </div>

              <Separator />

              {/* Message Atom */}
              <div>
                <h4 className="font-semibold mb-3">{t('atoms.basic.message.title')}</h4>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <Input
                      placeholder={t('atoms.basic.message.placeholder')}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={() => setMessage('')} variant="outline">
                      {t('atoms.basic.message.clear')}
                    </Button>
                  </div>
                  {message && (
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="text-sm">
                        <strong>{t('atoms.basic.message.messageLabel')}</strong> {message}
                      </p>
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>Código:</strong> <code>{t('atoms.basic.message.code')}</code>
                </p>
              </div>

              <Separator />

              {/* User Object Atom */}
              <div>
                <h4 className="font-semibold mb-3">{t('atoms.basic.user.title')}</h4>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="name">{t('atoms.basic.user.nameLabel')}</Label>
                    <Input
                      id="name"
                      placeholder={t('atoms.basic.user.namePlaceholder')}
                      value={user.name}
                      onChange={(e) => setUser({ ...user, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t('atoms.basic.user.emailLabel')}</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={t('atoms.basic.user.emailPlaceholder')}
                      value={user.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                  </div>
                </div>
                {(user.name || user.email) && (
                  <div className="mt-3 p-3 bg-muted rounded-lg">
                    <p className="text-sm">
                      <strong>{t('atoms.basic.user.userLabel')}</strong>{' '}
                      {user.name || t('atoms.basic.user.notInformed')} -{' '}
                      {user.email || t('atoms.basic.user.notInformed')}
                    </p>
                  </div>
                )}
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>Código:</strong> <code>{t('atoms.basic.user.code')}</code>
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Derived Atoms */}
        <TabsContent value="derived" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                {t('atoms.derived.title')}
              </CardTitle>
              <CardDescription>{t('atoms.derived.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Computed Atom */}
              <div>
                <h4 className="font-semibold mb-3">{t('atoms.derived.computed.title')}</h4>
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      {t('atoms.derived.computed.original')}
                    </p>
                    <Badge variant="outline" className="text-lg px-3 py-1">
                      {counter}
                    </Badge>
                  </div>
                  <span className="text-2xl">→</span>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      {t('atoms.derived.computed.doubled')}
                    </p>
                    <Badge className="text-lg px-3 py-1">{counterDoubled}</Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>Código:</strong> <code>{t('atoms.derived.computed.code')}</code>
                </p>
              </div>

              <Separator />

              {/* Write-only Atom */}
              <div>
                <h4 className="font-semibold mb-3">{t('atoms.derived.writeOnly.title')}</h4>
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    value={customIncrement}
                    onChange={(e) => setCustomIncrement(Number(e.target.value))}
                    className="w-20"
                    min="1"
                  />
                  <Button onClick={() => incrementBy(customIncrement)}>
                    {t('atoms.derived.writeOnly.button', { amount: customIncrement })}
                  </Button>
                  <Badge variant="outline">
                    {t('atoms.derived.writeOnly.current', { value: counter })}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>Código:</strong> <code>{t('atoms.derived.writeOnly.code')}</code>
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Storage Atoms */}
        <TabsContent value="storage" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                {t('atoms.storage.title')}
              </CardTitle>
              <CardDescription>{t('atoms.storage.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Language Atom */}
              <div>
                <h4 className="font-semibold mb-3">{t('atoms.storage.language.title')}</h4>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleLanguageChange('pt')}
                    variant={language === 'pt' ? 'default' : 'outline'}
                    size="sm"
                  >
                    🇧🇷 Português
                  </Button>
                  <Button
                    onClick={() => handleLanguageChange('en')}
                    variant={language === 'en' ? 'default' : 'outline'}
                    size="sm"
                  >
                    🇺🇸 English
                  </Button>
                  <Button
                    onClick={() => handleLanguageChange('es')}
                    variant={language === 'es' ? 'default' : 'outline'}
                    size="sm"
                  >
                    🇪🇸 Español
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>Código:</strong> <code>{t('atoms.storage.language.code')}</code>
                </p>
              </div>

              <Separator />

              {/* Preferences Atom */}
              <div>
                <h4 className="font-semibold mb-3">{t('atoms.storage.preferences.title')}</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{t('atoms.storage.preferences.notifications')}</span>
                    <Button
                      onClick={() =>
                        setPreferences({
                          ...preferences,
                          notifications: !preferences.notifications,
                        })
                      }
                      variant={preferences.notifications ? 'default' : 'outline'}
                      size="sm"
                    >
                      {preferences.notifications
                        ? t('atoms.storage.preferences.activated')
                        : t('atoms.storage.preferences.deactivated')}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{t('atoms.storage.preferences.theme')}</span>
                    <div className="flex gap-1">
                      {['auto', 'light', 'dark'].map((theme) => (
                        <Button
                          key={theme}
                          onClick={() => setPreferences({ ...preferences, theme })}
                          variant={preferences.theme === theme ? 'default' : 'outline'}
                          size="sm"
                        >
                          {theme}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-3 p-3 bg-muted rounded-lg">
                  <p className="text-sm">
                    <strong>{t('atoms.storage.preferences.savedPreferences')}</strong>{' '}
                    {JSON.stringify(preferences)}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  <strong>Código:</strong> <code>{t('atoms.storage.preferences.code')}</code>
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced */}
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('atoms.advanced.title')}</CardTitle>
              <CardDescription>{t('atoms.advanced.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">{t('atoms.advanced.atomFamilies.title')}</h4>
                  <p className="text-sm text-muted-foreground">
                    {t('atoms.advanced.atomFamilies.description')}
                  </p>
                  <code className="text-xs bg-muted p-1 rounded">
                    atomFamily((id) =&gt; atom(...))
                  </code>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">{t('atoms.advanced.asyncAtoms.title')}</h4>
                  <p className="text-sm text-muted-foreground">
                    {t('atoms.advanced.asyncAtoms.description')}
                  </p>
                  <code className="text-xs bg-muted p-1 rounded">
                    atom(async () =&gt; fetch(...))
                  </code>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">{t('atoms.advanced.loadable.title')}</h4>
                  <p className="text-sm text-muted-foreground">
                    {t('atoms.advanced.loadable.description')}
                  </p>
                  <code className="text-xs bg-muted p-1 rounded">loadable(asyncAtom)</code>
                </div>

                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold mb-2">{t('atoms.advanced.splitAtoms.title')}</h4>
                  <p className="text-sm text-muted-foreground">
                    {t('atoms.advanced.splitAtoms.description')}
                  </p>
                  <code className="text-xs bg-muted p-1 rounded">splitAtom(arrayAtom)</code>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t('atoms.advanced.advantages.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>
                  • <strong>Atomic:</strong> {t('atoms.advanced.advantages.atomic')}
                </li>
                <li>
                  • <strong>TypeScript:</strong> {t('atoms.advanced.advantages.typescript')}
                </li>
                <li>
                  • <strong>No boilerplate:</strong> {t('atoms.advanced.advantages.noBoilerplate')}
                </li>
                <li>
                  • <strong>Suspense ready:</strong> {t('atoms.advanced.advantages.suspense')}
                </li>
                <li>
                  • <strong>DevTools:</strong> {t('atoms.advanced.advantages.devtools')}
                </li>
                <li>
                  • <strong>Server-Side:</strong> {t('atoms.advanced.advantages.serverSide')}
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
