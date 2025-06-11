import designTokens from '../../design-tokens.json';

export interface DesignTokens {
  colors: {
    light: Record<string, string>;
    dark: Record<string, string>;
  };
  spacing: {
    radius: string;
  };
  typography: {
    'font-family': Record<string, string[]>;
    'font-size': Record<string, string>;
  };
}

export interface TokenOverrides {
  colors?: {
    light?: Record<string, string>;
    dark?: Record<string, string>;
  };
  spacing?: Record<string, string>;
  typography?: {
    'font-family'?: Record<string, string[]>;
    'font-size'?: Record<string, string>;
  };
}

/**
 * Carrega os design tokens padrão do arquivo JSON
 */
export function getDefaultTokens(): DesignTokens {
  return designTokens as DesignTokens;
}

/**
 * Mescla os tokens padrão com overrides personalizados
 */
export function mergeTokens(overrides: TokenOverrides = {}): DesignTokens {
  const defaultTokens = getDefaultTokens();

  return {
    colors: {
      light: {
        ...defaultTokens.colors.light,
        ...(overrides.colors?.light || {}),
      },
      dark: {
        ...defaultTokens.colors.dark,
        ...(overrides.colors?.dark || {}),
      },
    },
    spacing: {
      ...defaultTokens.spacing,
      ...(overrides.spacing || {}),
    },
    typography: {
      'font-family': {
        ...defaultTokens.typography['font-family'],
        ...(overrides.typography?.['font-family'] || {}),
      },
      'font-size': {
        ...defaultTokens.typography['font-size'],
        ...(overrides.typography?.['font-size'] || {}),
      },
    },
  };
}

/**
 * Gera CSS personalizado com base nos tokens fornecidos
 */
export function generateCustomCSS(tokens: DesignTokens): string {
  const lightVars = Object.entries(tokens.colors.light)
    .map(([key, value]) => `  --${key}: ${value};`)
    .join('\n');

  const darkVars = Object.entries(tokens.colors.dark)
    .map(([key, value]) => `  --${key}: ${value};`)
    .join('\n');

  const spacingVars = Object.entries(tokens.spacing)
    .map(([key, value]) => `  --${key}: ${value};`)
    .join('\n');

  // Calcular variações do radius baseadas no valor principal
  const radiusBase = tokens.spacing.radius;
  const radiusCalculated = `
  --radius-sm: calc(${radiusBase} - 4px);
  --radius-md: calc(${radiusBase} - 2px);
  --radius-lg: ${radiusBase};
  --radius-xl: calc(${radiusBase} + 4px);`;

  return `
:root {
${spacingVars}
${radiusCalculated}
${lightVars}
}

.dark {
${darkVars}
}
`;
}

/**
 * Carrega tokens customizados de um arquivo JSON externo (se existir)
 */
export async function loadCustomTokens(filePath?: string): Promise<TokenOverrides | null> {
  try {
    if (!filePath) return null;

    const response = await fetch(filePath);
    if (!response.ok) return null;

    return await response.json();
  } catch {
    return null;
  }
}

/**
 * Hook para usar tokens em componentes React
 */
export function useDesignTokens(overrides?: TokenOverrides) {
  const tokens = mergeTokens(overrides);
  const css = generateCustomCSS(tokens);

  return { tokens, css };
}
