'use client';

import { useTranslation } from 'react-i18next';

import { FileText, Folder, Package, Settings } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function ConfigPage() {
  const { t } = useTranslation();

  const projectStructure = [
    {
      name: 'src/',
      type: 'folder',
      description: t('config.projectStructure.main'),
      items: [
        { name: 'app/', type: 'folder', description: t('config.projectStructure.appRouter') },
        {
          name: 'components/',
          type: 'folder',
          description: t('config.projectStructure.components'),
        },
        { name: 'lib/', type: 'folder', description: t('config.projectStructure.lib') },
        { name: 'providers/', type: 'folder', description: t('config.projectStructure.providers') },
        { name: 'store/', type: 'folder', description: t('config.projectStructure.store') },
        { name: 'locales/', type: 'folder', description: t('config.projectStructure.locales') },
        { name: 'i18n/', type: 'folder', description: t('config.projectStructure.i18n') },
      ],
    },
  ];

  const configFiles = [
    {
      name: 'next.config.ts',
      description: t('config.configFiles.nextConfig.description'),
      features: ['App Router', 'Otimizações', 'Middleware'],
    },
    {
      name: 'tailwind.config.ts',
      description: t('config.configFiles.tailwindConfig.description'),
      features: ['Design Tokens', 'Temas', 'Animações'],
    },
    {
      name: 'tsconfig.json',
      description: t('config.configFiles.tsConfig.description'),
      features: ['Path mapping', 'Strict mode', 'Decorators'],
    },
    {
      name: 'components.json',
      description: t('config.configFiles.componentsJson.description'),
      features: ['Componentes', 'Estilos', 'Aliases'],
    },
    {
      name: 'design-tokens.json',
      description: t('config.configFiles.designTokens.description'),
      features: ['Cores', 'Tipografia', 'Espaçamentos'],
    },
  ];

  const technologies = [
    {
      category: t('config.technologies.framework'),
      items: [
        {
          name: 'Next.js 15',
          version: '^15.0.0',
          description: t('config.technologies.descriptions.nextjs'),
        },
        {
          name: 'React 19',
          version: '^19.0.0',
          description: t('config.technologies.descriptions.react'),
        },
        {
          name: 'TypeScript',
          version: '^5.0.0',
          description: t('config.technologies.descriptions.typescript'),
        },
      ],
    },
    {
      category: t('config.technologies.styling'),
      items: [
        {
          name: 'Tailwind CSS',
          version: '^3.4.0',
          description: t('config.technologies.descriptions.tailwind'),
        },
        {
          name: 'shadcn/ui',
          version: 'latest',
          description: t('config.technologies.descriptions.shadcn'),
        },
        {
          name: 'Radix UI',
          version: '^1.0.0',
          description: t('config.technologies.descriptions.radix'),
        },
        {
          name: 'Lucide React',
          version: '^0.400.0',
          description: t('config.technologies.descriptions.lucide'),
        },
      ],
    },
    {
      category: t('config.technologies.stateI18n'),
      items: [
        {
          name: 'Jotai',
          version: '^2.8.0',
          description: t('config.technologies.descriptions.jotai'),
        },
        {
          name: 'next-intl',
          version: '^3.15.0',
          description: t('config.technologies.descriptions.nextIntl'),
        },
        {
          name: 'next-themes',
          version: '^0.3.0',
          description: t('config.technologies.descriptions.nextThemes'),
        },
      ],
    },
    {
      category: t('config.technologies.quality'),
      items: [
        {
          name: 'ESLint',
          version: '^9.0.0',
          description: t('config.technologies.descriptions.eslint'),
        },
        {
          name: 'Prettier',
          version: '^3.3.0',
          description: t('config.technologies.descriptions.prettier'),
        },
        {
          name: 'Jest',
          version: '^29.0.0',
          description: t('config.technologies.descriptions.jest'),
        },
        {
          name: 'Husky',
          version: '^9.0.0',
          description: t('config.technologies.descriptions.husky'),
        },
      ],
    },
  ];

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2">
          <Settings className="h-6 w-6" />
          <h1 className="text-3xl font-bold">{t('config.title')}</h1>
        </div>
        <p className="text-muted-foreground text-lg">{t('config.description')}</p>
      </div>

      {/* Project Structure */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Folder className="h-5 w-5" />
          {t('config.projectStructure.title')}
        </h2>
        <div className="grid gap-6">
          {projectStructure.map((folder) => (
            <Card key={folder.name}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Folder className="h-4 w-4" />
                  {folder.name}
                </CardTitle>
                <CardDescription>{folder.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-3">
                  {folder.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center gap-2 p-2 rounded-lg bg-muted/50"
                    >
                      {item.type === 'folder' ? (
                        <Folder className="h-4 w-4 text-blue-500" />
                      ) : (
                        <FileText className="h-4 w-4 text-green-500" />
                      )}
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Configuration Files */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <FileText className="h-5 w-5" />
          {t('config.configFiles.title')}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {configFiles.map((config) => (
            <Card key={config.name}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  {config.name}
                </CardTitle>
                <CardDescription>{config.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1">
                  {config.features.map((feature) => (
                    <Badge key={feature} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Technologies */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Package className="h-5 w-5" />
          {t('config.technologies.title')}
        </h2>
        <div className="grid gap-6">
          {technologies.map((category) => (
            <Card key={category.category}>
              <CardHeader>
                <CardTitle>{category.category}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.items.map((tech) => (
                    <div key={tech.name} className="p-3 rounded-lg border bg-card">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium text-sm">{tech.name}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {tech.version}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{tech.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Separator className="my-8" />

      {/* Layout Information */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Layout do Boilerplate</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>App Router</CardTitle>
              <CardDescription>Estrutura baseada no novo App Router do Next.js 15</CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>
                • <strong>layout.tsx:</strong> Layout raiz com providers globais
              </p>
              <p>
                • <strong>page.tsx:</strong> Páginas específicas de cada rota
              </p>
              <p>
                • <strong>loading.tsx:</strong> Estados de carregamento
              </p>
              <p>
                • <strong>error.tsx:</strong> Tratamento de erros
              </p>
              <p>
                • <strong>not-found.tsx:</strong> Página 404 personalizada
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sistema de Themes</CardTitle>
              <CardDescription>Implementação completa de light/dark mode</CardDescription>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>
                • <strong>CSS Variables:</strong> Tokens dinâmicos
              </p>
              <p>
                • <strong>next-themes:</strong> Persistência do tema
              </p>
              <p>
                • <strong>shadcn/ui:</strong> Componentes adaptativos
              </p>
              <p>
                • <strong>Tailwind:</strong> Classes utilitárias
              </p>
              <p>
                • <strong>Auto-detection:</strong> Preferência do sistema
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
