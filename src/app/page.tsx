'use client';

import { useTranslation } from 'react-i18next';

import { Code, Palette, Settings, Wrench } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  const { t } = useTranslation();

  const features = [
    {
      title: 'Next.js 15',
      description: 'Framework React de produção com App Router',
      icon: '⚡',
      technologies: ['App Router', 'TypeScript', 'Server Components'],
    },
    {
      title: 'shadcn/ui',
      description: 'Componentes UI modernos e acessíveis',
      icon: '🎨',
      technologies: ['Radix UI', 'Tailwind CSS', 'Accessible'],
    },
    {
      title: 'Internacionalização',
      description: 'Suporte completo a múltiplos idiomas',
      icon: '🌍',
      technologies: ['next-intl', 'Português', 'English', 'Español'],
    },
    {
      title: 'Estado Global',
      description: 'Gerenciamento de estado com Jotai',
      icon: '🔄',
      technologies: ['Jotai', 'Atomic State', 'TypeScript'],
    },
    {
      title: 'Temas',
      description: 'Sistema completo de temas light/dark',
      icon: '🌙',
      technologies: ['CSS Variables', 'next-themes', 'Auto Switch'],
    },
    {
      title: 'Design Tokens',
      description: 'Sistema robusto de tokens de design',
      icon: '🎯',
      technologies: ['Colors', 'Typography', 'Spacing'],
    },
  ];

  const sections = [
    {
      title: t('home.explore.configSection.title'),
      description: t('home.explore.configSection.description'),
      href: '/config',
      icon: Settings,
      color: 'bg-blue-500',
    },
    {
      title: t('home.explore.designTokensSection.title'),
      description: t('home.explore.designTokensSection.description'),
      href: '/design-tokens',
      icon: Palette,
      color: 'bg-purple-500',
    },
    {
      title: t('home.explore.atomsSection.title'),
      description: t('home.explore.atomsSection.description'),
      href: '/atoms',
      icon: Code,
      color: 'bg-green-500',
    },
    {
      title: t('home.explore.formsSection.title'),
      description: t('home.explore.formsSection.description'),
      href: '/forms',
      icon: Wrench,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="min-h-full bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            {t('home.title')}
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
            {t('home.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/design-tokens">{t('home.exploreDesignTokens')}</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/atoms">{t('home.seeGlobalState')}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
          <h2 className="font-heading text-2xl md:text-4xl">{t('home.technologies.title')}</h2>
          <p className="max-w-[600px] text-muted-foreground">{t('home.technologies.subtitle')}</p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 mt-8">
          {features.map((feature, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{feature.icon}</span>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  {feature.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Navigation Sections */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
          <h2 className="font-heading text-2xl md:text-4xl">{t('home.explore.title')}</h2>
          <p className="max-w-[600px] text-muted-foreground">{t('home.explore.subtitle')}</p>
        </div>
        <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 md:max-w-[64rem] mt-8">
          {sections.map((section, index) => (
            <Card
              key={index}
              className="relative overflow-hidden group hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${section.color} text-white`}>
                    <section.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                </div>
                <CardDescription className="text-left">{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full" variant="outline">
                  <Link href={section.href}>{t('home.explore.exploreButton')}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2">
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                {t('home.footer.text')}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
