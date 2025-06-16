# Sistema de Design Tokens

Este projeto implementa um sistema simples e eficiente de design tokens usando variáveis CSS e Tailwind.

## 📋 Funcionalidades

- ✅ **Tokens Dinâmicos**: Altere cores, espaçamentos e tipografia em tempo real
- ✅ **Compatibilidade Tailwind**: Funciona com todas as classes utilitárias do Tailwind
- ✅ **TypeScript**: Tipagem completa para segurança de tipos
- ✅ **Modo Claro/Escuro**: Suporte nativo para temas light e dark

## 🚀 Como Usar

### 1. Definindo Cores

As cores são definidas no arquivo `globals.css` usando variáveis CSS:

```css
:root {
  --minha-cor: #3b82f6; /* Cor para tema claro */
}

.dark {
  --minha-cor: #60a5fa; /* Cor para tema escuro */
}
```

### 2. Configurando o Tailwind

Adicione a cor no arquivo `tailwind.config.ts`:

```typescript
const config: Config = {
  theme: {
    extend: {
      colors: {
        'minha-cor': 'var(--minha-cor)',
      },
    },
  },
};
```

### 3. Usando nos Componentes

Use as cores diretamente com as classes do Tailwind:

```tsx
<div className="text-minha-cor">Texto com minha cor</div>
<div className="bg-minha-cor">Fundo com minha cor</div>
<div className="border-minha-cor">Borda com minha cor</div>
```

## 📚 Estrutura das Cores

### Cores do Sistema

O sistema já vem com várias cores pré-definidas:

- `background`: Cor de fundo principal
- `foreground`: Cor do texto principal
- `primary`: Cor primária da marca
- `primary-foreground`: Texto sobre cor primária
- `secondary`: Cor secundária
- `secondary-foreground`: Texto sobre cor secundária
- `accent`: Cor de destaque
- `accent-foreground`: Texto sobre cor de destaque
- `destructive`: Cor para ações destrutivas
- `border`: Cor das bordas
- `input`: Cor de fundo dos inputs
- `ring`: Cor do focus ring

### Adicionando Novas Cores

Para adicionar uma nova cor:

1. Adicione a variável CSS no `globals.css`:

```css
:root {
  --nova-cor: #10b981; /* Cor para tema claro */
}

.dark {
  --nova-cor: #34d399; /* Cor para tema escuro */
}
```

2. Adicione no `tailwind.config.ts`:

```typescript
colors: {
  'nova-cor': 'var(--nova-cor)'
}
```

3. Use nos componentes:

```tsx
<div className="text-nova-cor">Texto com nova cor</div>
```

## 🎨 Paleta de Cores

O sistema suporta qualquer formato de cor CSS:

```css
:root {
  --cor-hex: #3b82f6;
  --cor-rgb: rgb(59, 130, 246);
  --cor-rgba: rgba(59, 130, 246, 0.5);
  --cor-hsl: hsl(217, 91%, 60%);
  --cor-oklch: oklch(0.5 0.3 240);
}
```

## 🛠️ Casos de Uso

### 1. Tema Claro/Escuro

O sistema troca automaticamente entre temas:

```tsx
import { useTheme } from '@/providers/ThemeProvider';

function MeuComponente() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>Trocar para {theme === 'light' ? 'escuro' : 'claro'}</button>
  );
}
```

### 2. Preferências do Usuário

Você pode salvar a preferência do tema:

```tsx
const salvarPreferencia = () => {
  localStorage.setItem('theme', theme);
};

const carregarPreferencia = () => {
  const saved = localStorage.getItem('theme');
  if (saved) setTheme(saved as 'light' | 'dark');
};
```

## 🔧 Desenvolvimento

### Adicionando Novos Tokens

1. Adicione a variável CSS no `globals.css`
2. Configure no `tailwind.config.ts`
3. Use nos componentes com classes do Tailwind

### Debugging

Use o DevTools do navegador para inspecionar as variáveis CSS e verificar se estão sendo aplicadas corretamente.

## 📖 Exemplos

Veja `DesignTokensDemo.tsx` para exemplos completos de implementação.

Arquivo de exemplo: `public/custom-theme-example.json`
