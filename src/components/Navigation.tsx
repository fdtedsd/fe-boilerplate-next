'use client';

import { useEffect } from 'react';

import { useTranslation } from 'react-i18next';

import { useAtom } from 'jotai';
import { Globe, LogIn, LogOut, Menu, Palette, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { currentUserAtom, isAuthenticatedAtom, logoutAtom } from '@/store/atoms/auth';
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
    href: '/atoms',
    key: 'atoms',
    icon: '⚛️',
  },
  {
    href: '/forms',
    key: 'forms',
    icon: '📝',
  },
  {
    href: '/dashboard',
    key: 'dashboard',
    icon: '🔒',
  },
];

export function Navigation() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [language, setLanguage] = useAtom(languageAtom);
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const [user] = useAtom(currentUserAtom);
  const [, logout] = useAtom(logoutAtom);

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

  const handleAuthAction = () => {
    if (isAuthenticated) {
      logout();
      router.push('/');
    } else {
      router.push('/login');
    }
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
            {/* Auth Button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  {isAuthenticated ? <User className="h-4 w-4" /> : <LogIn className="h-4 w-4" />}
                  <span className="sr-only">
                    {isAuthenticated ? t('auth.userMenu') : t('auth.login.title')}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {isAuthenticated ? (
                  <>
                    <div className="px-2 py-1.5 text-sm font-semibold">{user?.name}</div>
                    <div className="px-2 py-1.5 text-xs text-muted-foreground">{user?.email}</div>
                    <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                      <User className="h-4 w-4 mr-2" />
                      {t('navigation.dashboard')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleAuthAction}>
                      <LogOut className="h-4 w-4 mr-2" />
                      {t('auth.logout')}
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem onClick={handleAuthAction}>
                    <LogIn className="h-4 w-4 mr-2" />
                    {t('auth.login.title')}
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

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

                  {/* Auth Section in Mobile Menu */}
                  <div className="border-t pt-3 mt-3">
                    {isAuthenticated ? (
                      <>
                        <div className="px-3 py-2 text-sm">
                          <p className="font-semibold">{user?.name}</p>
                          <p className="text-xs text-muted-foreground">{user?.email}</p>
                        </div>
                        <button
                          onClick={handleAuthAction}
                          className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground text-left"
                        >
                          <LogOut className="h-4 w-4" />
                          {t('auth.logout')}
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={handleAuthAction}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-accent hover:text-accent-foreground text-left"
                      >
                        <LogIn className="h-4 w-4" />
                        {t('auth.login.title')}
                      </button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
