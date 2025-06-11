'use client';

import React, { useState } from 'react';

import { useDesignTokens } from './DesignTokenProvider';

export function DesignTokensDemo() {
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
    padrao: {},
    azul: {
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
    verde: {
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
    roxo: {
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
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Sistema de Design Tokens</h2>
        <button
          onClick={() => setShowDemo(!showDemo)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-80 transition-opacity"
        >
          {showDemo ? 'Ocultar' : 'Mostrar'} Controles
        </button>
      </div>

      {/* Exemplo visual dos tokens aplicados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-card rounded-lg border">
          <h3 className="font-semibold text-card-foreground mb-2">Cores Primárias</h3>
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
          <h3 className="font-semibold text-muted-foreground mb-2">Elementos de Interface</h3>
          <div className="space-y-2">
            <button className="w-full px-3 py-2 bg-primary text-primary-foreground rounded hover:opacity-80">
              Botão Primário
            </button>
            <input
              type="text"
              placeholder="Input de exemplo"
              className="w-full px-3 py-2 bg-background border border-border rounded focus:ring-2 focus:ring-ring outline-none"
            />
            <div className="p-2 bg-destructive/10 text-destructive rounded text-sm">
              Mensagem de erro
            </div>
          </div>
        </div>

        <div className="p-4 bg-card rounded-lg border">
          <h3 className="font-semibold text-card-foreground mb-2">Border Radius</h3>
          <div className="space-y-2">
            <div className="w-full h-8 bg-primary rounded-sm flex items-center justify-center text-primary-foreground text-xs">
              Small
            </div>
            <div className="w-full h-8 bg-primary rounded-md flex items-center justify-center text-primary-foreground text-xs">
              Medium
            </div>
            <div className="w-full h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground text-xs">
              Large
            </div>
            <div className="w-full h-8 bg-primary rounded-xl flex items-center justify-center text-primary-foreground text-xs">
              Extra Large
            </div>
          </div>
        </div>
      </div>

      {showDemo && (
        <div className="space-y-6 p-6 bg-muted/50 rounded-lg">
          <h3 className="text-lg font-semibold">Controles de Design Tokens</h3>

          {/* Temas pré-definidos */}
          <div>
            <h4 className="font-medium mb-2">Temas Pré-definidos</h4>
            <div className="flex gap-2 flex-wrap">
              {Object.entries(presetThemes).map(([name, theme]) => (
                <button
                  key={name}
                  onClick={() => setOverrides(theme)}
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded hover:bg-accent hover:text-accent-foreground transition-colors capitalize"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          {/* Controle de radius */}
          <div>
            <h4 className="font-medium mb-2">Border Radius</h4>
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
            <h4 className="font-medium mb-2">Cores Customizadas (Modo Claro)</h4>
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

          {/* Carregar JSON customizado */}
          <div>
            <h4 className="font-medium mb-2">Carregar JSON Customizado</h4>
            <input
              type="file"
              accept=".json"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  try {
                    const text = await file.text();
                    const customTokens = JSON.parse(text);
                    setOverrides(customTokens);
                  } catch (error) {
                    alert('Erro ao carregar o arquivo JSON: ' + error);
                  }
                }
              }}
              className="w-full px-3 py-2 border border-border rounded bg-background"
            />
          </div>

          {/* Exportar configuração atual */}
          <div>
            <h4 className="font-medium mb-2">Exportar Configuração</h4>
            <button
              onClick={() => {
                const dataStr = JSON.stringify(overrides, null, 2);
                const dataUri =
                  'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
                const exportFileDefaultName = 'design-tokens-custom.json';

                const linkElement = document.createElement('a');
                linkElement.setAttribute('href', dataUri);
                linkElement.setAttribute('download', exportFileDefaultName);
                linkElement.click();
              }}
              className="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-80"
            >
              Baixar JSON
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
