'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

import {
  TokenOverrides,
  mergeTokens,
  generateCustomCSS,
  loadCustomTokens,
} from '@/lib/design-tokens';

interface DesignTokenContextType {
  overrides: TokenOverrides;
  setOverrides: (overrides: TokenOverrides) => void;
  loadTokensFromFile: (filePath: string) => Promise<void>;
}

const DesignTokenContext = createContext<DesignTokenContextType | undefined>(undefined);

interface DesignTokenProviderProps {
  children: React.ReactNode;
  initialOverrides?: TokenOverrides;
  customTokensPath?: string;
}

export function DesignTokenProvider({
  children,
  initialOverrides = {},
  customTokensPath,
}: DesignTokenProviderProps) {
  const [overrides, setOverrides] = useState<TokenOverrides>(initialOverrides);

  // Carrega tokens customizados se um caminho for fornecido
  useEffect(() => {
    if (customTokensPath) {
      loadCustomTokens(customTokensPath).then((tokens) => {
        if (tokens) {
          setOverrides((current) => ({ ...current, ...tokens }));
        }
      });
    }
  }, [customTokensPath]);

  // Aplica os tokens ao DOM sempre que houver mudanças
  useEffect(() => {
    const tokens = mergeTokens(overrides);
    const css = generateCustomCSS(tokens);

    // Remove estilo anterior se existir
    const existingStyle = document.getElementById('dynamic-design-tokens');
    if (existingStyle) {
      existingStyle.remove();
    }

    // Adiciona novo estilo
    const style = document.createElement('style');
    style.id = 'dynamic-design-tokens';
    style.textContent = css;
    document.head.appendChild(style);

    return () => {
      const styleElement = document.getElementById('dynamic-design-tokens');
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, [overrides]);

  const loadTokensFromFile = async (filePath: string) => {
    const tokens = await loadCustomTokens(filePath);
    if (tokens) {
      setOverrides((current) => ({ ...current, ...tokens }));
    }
  };

  return (
    <DesignTokenContext.Provider value={{ overrides, setOverrides, loadTokensFromFile }}>
      {children}
    </DesignTokenContext.Provider>
  );
}

export function useDesignTokens() {
  const context = useContext(DesignTokenContext);
  if (!context) {
    throw new Error('useDesignTokens deve ser usado dentro de um DesignTokenProvider');
  }
  return context;
}
