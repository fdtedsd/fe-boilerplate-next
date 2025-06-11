'use client';

import { useState } from 'react';

import { useTranslation } from 'react-i18next';

import { useDesignTokens } from './DesignTokenProvider';

export function DesignTokensDemo() {
  const { t } = useTranslation();
  const { overrides, setOverrides } = useDesignTokens();
  const [showDemo, setShowDemo] = useState(false);

  const handleColorChange = (theme: 'light' | 'dark', colorName: string, value: string) => {
    setOverrides({
      ...overrides,
      colors: {
        ...overrides.colors,
        [theme]: {
          ...overrides.colors?.[theme],
          [colorName]: value,
        },
      },
    });
  };

  const handleRadiusChange = (value: string) => {
    setOverrides({
      ...overrides,
      spacing: {
        ...overrides.spacing,
        radius: value,
      },
    });
  };

  const presetThemes = {
    [t('designTokens.demo.default')]: {},
    [t('designTokens.demo.blue')]: {
      colors: {
        light: {
          primary: 'oklch(0.5 0.3 240)',
          'primary-foreground': 'oklch(1 0 0)',
          accent: 'oklch(0.95 0.05 240)',
          'accent-foreground': 'oklch(0.1 0.1 240)',
        },
        dark: {
          primary: 'oklch(0.7 0.3 240)',
          'primary-foreground': 'oklch(0.1 0.1 240)',
          accent: 'oklch(0.2 0.1 240)',
          'accent-foreground': 'oklch(0.9 0.05 240)',
        },
      },
    },
    [t('designTokens.demo.green')]: {
      colors: {
        light: {
          primary: 'oklch(0.5 0.3 120)',
          'primary-foreground': 'oklch(1 0 0)',
          accent: 'oklch(0.95 0.05 120)',
          'accent-foreground': 'oklch(0.1 0.1 120)',
        },
        dark: {
          primary: 'oklch(0.7 0.3 120)',
          'primary-foreground': 'oklch(0.1 0.1 120)',
          accent: 'oklch(0.2 0.1 120)',
          'accent-foreground': 'oklch(0.9 0.05 120)',
        },
      },
    },
    [t('designTokens.demo.purple')]: {
      colors: {
        light: {
          primary: 'oklch(0.5 0.3 300)',
          'primary-foreground': 'oklch(1 0 0)',
          accent: 'oklch(0.95 0.05 300)',
          'accent-foreground': 'oklch(0.1 0.1 300)',
        },
        dark: {
          primary: 'oklch(0.7 0.3 300)',
          'primary-foreground': 'oklch(0.1 0.1 300)',
          accent: 'oklch(0.2 0.1 300)',
          'accent-foreground': 'oklch(0.9 0.05 300)',
        },
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-center">
        <button
          onClick={() => setShowDemo(!showDemo)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-80 transition-opacity"
        >
          {showDemo ? t('designTokens.demo.hideControls') : t('designTokens.demo.showControls')}
        </button>
      </div>

      {/* Exemplo visual dos tokens aplicados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-card rounded-lg border">
          <h3 className="font-semibold text-card-foreground mb-2">
            {t('designTokens.demo.primaryColors')}
          </h3>
          <div className="space-y-2">
            <div className="w-full h-10 bg-primary rounded flex items-center justify-center text-primary-foreground text-sm">
              Primary
            </div>
            <div className="w-full h-10 bg-secondary rounded flex items-center justify-center text-secondary-foreground text-sm">
              Secondary
            </div>
            <div className="w-full h-10 bg-accent rounded flex items-center justify-center text-accent-foreground text-sm">
              Accent
            </div>
          </div>
        </div>

        <div className="p-4 bg-muted rounded-lg">
          <h3 className="font-semibold text-muted-foreground mb-2">
            {t('designTokens.demo.interfaceElements')}
          </h3>
          <div className="space-y-2">
            <button className="w-full px-3 py-2 bg-primary text-primary-foreground rounded hover:opacity-80">
              {t('designTokens.demo.primaryButton')}
            </button>
            <input
              type="text"
              placeholder={t('designTokens.demo.inputPlaceholder')}
              className="w-full px-3 py-2 bg-background border border-border rounded focus:ring-2 focus:ring-ring outline-none"
            />
            <div className="p-2 bg-destructive/10 text-destructive rounded text-sm">
              {t('designTokens.demo.errorMessage')}
            </div>
          </div>
        </div>

        <div className="p-4 bg-card rounded-lg border">
          <h3 className="font-semibold text-card-foreground mb-2">
            {t('designTokens.demo.borderRadius')}
          </h3>
          <div className="space-y-2">
            <div className="w-full h-8 bg-primary rounded-sm flex items-center justify-center text-primary-foreground text-xs">
              {t('designTokens.demo.small')}
            </div>
            <div className="w-full h-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground text-xs">
              {t('designTokens.demo.medium')}
            </div>
            <div className="w-full h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-xs">
              {t('designTokens.demo.large')}
            </div>
            <div className="w-full h-8 bg-primary rounded-xl flex items-center justify-center text-primary-foreground text-xs">
              {t('designTokens.demo.extraLarge')}
            </div>
          </div>
        </div>
      </div>

      {showDemo && (
        <div className="space-y-6 p-6 bg-muted/50 rounded-lg">
          <h3 className="text-lg font-semibold">{t('designTokens.demo.designTokensControls')}</h3>

          {/* Temas pré-definidos */}
          <div>
            <h4 className="font-medium mb-2">{t('designTokens.demo.predefinedThemes')}</h4>
            <div className="flex gap-2 flex-wrap">
              {Object.entries(presetThemes).map(([name, theme]) => (
                <button
                  key={name}
                  onClick={() => setOverrides(theme)}
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* Controle de radius */}
          <div>
            <h4 className="font-medium mb-2">{t('designTokens.demo.borderRadius')}</h4>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              defaultValue="0.625"
              onChange={(e) => handleRadiusChange(`${e.target.value}rem`)}
              className="w-full"
            />
          </div>

          {/* Controles de cores customizadas */}
          <div>
            <h4 className="font-medium mb-2">
              {t('designTokens.demo.customColors')} ({t('designTokens.demo.lightMode')})
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['primary', 'secondary', 'accent', 'destructive'].map((color) => (
                <div key={color} className="space-y-1">
                  <label className="text-sm font-medium capitalize">{color}</label>
                  <input
                    type="color"
                    onChange={() => {
                      const oklchValue = `oklch(0.5 0.3 ${Math.random() * 360})`;
                      handleColorChange('light', color, oklchValue);
                    }}
                    className="w-full h-10 rounded border"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Dark mode colors */}
          <div>
            <h4 className="font-medium mb-2">
              {t('designTokens.demo.customColors')} ({t('designTokens.demo.darkMode')})
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['primary', 'secondary', 'accent', 'destructive'].map((color) => (
                <div key={color} className="space-y-1">
                  <label className="text-sm font-medium capitalize">{color}</label>
                  <input
                    type="color"
                    onChange={() => {
                      const oklchValue = `oklch(0.7 0.3 ${Math.random() * 360})`;
                      handleColorChange('dark', color, oklchValue);
                    }}
                    className="w-full h-10 rounded border"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Reset button */}
          <div className="pt-4 border-t">
            <button
              onClick={() => setOverrides({})}
              className="px-4 py-2 bg-destructive text-destructive-foreground rounded hover:opacity-80 transition-opacity"
            >
              Reset to Default
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
