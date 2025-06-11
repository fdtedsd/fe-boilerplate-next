'use client';

import { useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import { useAtom } from 'jotai';
import { Globe, Menu, Palette } from 'lucide-react';
import Link from 'next/link';

import { languageAtom } from '@/store/atoms/language';

import { ThemeToggleButton } from './ThemeToggleButton';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';

const navigationItems = [
  {
    href: '/',
    key: 'home',
    icon: '🏠',
  },
  {
    href: '/config',
    key: 'config',
    icon: '⚙️',
  },
  {
    href: '/design-tokens',
    key: 'designTokens',
    icon: '🎨',
  },
  {
    href: '/atoms',
    key: 'atoms',
    icon: '⚛️',
  },
  {
    href: '/forms',
    key: 'forms',
    icon: '📝',
  },
];

export function Navigation() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useAtom(languageAtom);

  // Inicializar o i18n com o idioma do localStorage na primeira renderização
  useEffect(() => {
    if (language && language !== i18n.language) {
      i18n.changeLanguage(language);
    } else if (!language && i18n.language) {
      // Se não tem idioma no localStorage, salvar o idioma atual do i18n
      setLanguage(i18n.language);
    }
  }, [language, i18n, setLanguage]);

  const changeLanguage = (lng: string) => {
    setLanguage(lng);
    i18n.changeLanguage(lng);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link className="flex items-center space-x-2" href="/">
              <Palette className="h-6 w-6" />
              <span className="font-bold text-lg">FDTE Boilerplate</span>
            </Link>
          </div>

          {/* Desktop Navigation - Centralizada */}
          <nav className="hidden md:flex items-center justify-center flex-1 mx-8">
            <div className="flex items-center gap-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary text-muted-foreground hover:text-foreground"
                >
                  <span>{item.icon}</span>
                  {t(`navigation.${item.key}`)}
                </Link>
              ))}
            </div>
          </nav>

          {/* Actions - Direita */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Globe className="h-4 w-4" />
                  <span className="sr-only">Selecionar idioma</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem
                  onClick={() => changeLanguage('pt')}
                  className={language === 'pt' ? 'bg-accent' : ''}
                >
                  🇧🇷 Português {language === 'pt' && '✓'}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => changeLanguage('en')}
                  className={language === 'en' ? 'bg-accent' : ''}
                >
                  🇺🇸 English {language === 'en' && '✓'}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => changeLanguage('es')}
                  className={language === 'es' ? 'bg-accent' : ''}
                >
                  🇪🇸 Español {language === 'es' && '✓'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <ThemeToggleButton />

            {/* Mobile Menu Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden h-9 w-9">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>
                    <Link className="flex items-center space-x-2" href="/">
                      <Palette className="h-6 w-6" />
                      <span>FDTE Boilerplate</span>
                    </Link>
                  </SheetTitle>
                  <SheetDescription>
                    Navegue pelas diferentes seções do boilerplate
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-1">
                  {navigationItems.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      <span className="text-lg">{item.icon}</span>
                      {t(`navigation.${item.key}`)}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
