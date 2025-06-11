'use client';

import { useTranslation } from 'react-i18next';

import { useAtom } from 'jotai';
import { Calendar, LogOut, Mail, Shield, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { currentUserAtom, isAuthenticatedAtom, logoutAtom } from '@/store/atoms/auth';

export default function DashboardPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const [user] = useAtom(currentUserAtom);
  const [, logout] = useAtom(logoutAtom);

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.push('/login');
  //   }
  // }, [isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Shield className="h-12 w-12 mx-auto text-destructive mb-4" />
            <CardTitle>{t('auth.dashboard.accessDenied')}</CardTitle>
            <CardDescription>{t('auth.dashboard.loginRequired')}</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={() => router.push('/login')} className="w-full">
              {t('auth.dashboard.goToLogin')}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">{t('auth.dashboard.title')}</h1>
          <p className="text-muted-foreground text-center">{t('auth.dashboard.description')}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* User Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                {t('auth.dashboard.userInfo')}
              </CardTitle>
              <CardDescription>{t('auth.dashboard.welcomeMessage')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{t('auth.dashboard.name')}</p>
                  <p className="text-sm text-muted-foreground">{user?.name}</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{t('auth.dashboard.email')}</p>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{t('auth.dashboard.lastLogin')}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date().toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                {t('auth.dashboard.actions')}
              </CardTitle>
              <CardDescription>{t('auth.dashboard.actionsDescription')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800 dark:text-green-400">
                    {t('auth.dashboard.authenticated')}
                  </span>
                </div>
                <p className="text-xs text-green-700 dark:text-green-300">
                  {t('auth.dashboard.secureAccess')}
                </p>
              </div>

              <Button variant="outline" onClick={handleLogout} className="w-full">
                <LogOut className="h-4 w-4 mr-2" />
                {t('auth.dashboard.logout')}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Demo Info */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>{t('auth.dashboard.demoInfo')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">{t('auth.dashboard.demoDescription')}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
