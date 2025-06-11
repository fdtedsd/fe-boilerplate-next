# FDTE Boilerplate - Next.js

Este é um boilerplate moderno para desenvolvimento web usando **Next.js** com as melhores práticas e ferramentas atuais.

## 🚀 Tecnologias Utilizadas

- **Next.js 15** - Framework React para produção
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Componentes de UI modernos e acessíveis
- **React Hook Form** - Gerenciamento de formulários eficiente
- **Zod** - Validação de esquemas TypeScript-first
- **Jotai** - Gerenciamento de estado atômico
- **i18next** - Internacionalização (i18n)
- **Jest** - Framework de testes
- **Testing Library** - Utilitários para testes de componentes React
- **Husky** - Git hooks para quality assurance
- **ESLint + Prettier** - Linting e formatação de código

## 📦 Estrutura do Projeto

```
src/
├── app/                    # App Router do Next.js
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   └── page.tsx          # Página inicial
├── components/            # Componentes React
│   ├── ui/               # Componentes base do shadcn/ui
│   ├── App.tsx          # Componente principal da aplicação
│   ├── DemoForm.tsx     # Demonstração de formulário com validação
│   └── ThemeToggle.tsx  # Toggle de tema claro/escuro
├── lib/                  # Utilitários e configurações
├── store/               # Gerenciamento de estado (Jotai)
│   └── atoms/          # Definição dos atoms
├── locales/            # Arquivos de tradução
├── i18n/              # Configuração do i18next
└── providers/         # Providers React (Context, etc.)
```

## 🛠️ Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm start` - Inicia servidor de produção
- `npm run lint` - Executa o linter
- `npm test` - Executa os testes
- `npm run test:watch` - Executa testes em modo watch
- `npm run test:coverage` - Executa testes com relatório de cobertura

## 🚀 Como Usar

1. **Instalação das dependências:**

   ```bash
   npm install
   ```

2. **Executar em modo desenvolvimento:**

   ```bash
   npm run dev
   ```

3. **Acessar a aplicação:**
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador

## ✨ Funcionalidades Incluídas

### 🎨 Interface de Usuário

- Sistema de design consistente com shadcn/ui
- Tema claro/escuro automático
- Componentes responsivos e acessíveis
- Animations suaves com Tailwind CSS

### 🌍 Internacionalização

- Suporte a múltiplos idiomas (PT, EN, ES)
- Alternância dinâmica de idiomas
- Tradução de todos os textos da interface

### 📝 Formulários e Validação

- Formulários tipados com React Hook Form
- Validação robusta com Zod
- Feedback visual de erros
- Preview em tempo real dos dados

### 🧪 Testes

- Configuração completa do Jest com Next.js
- Testing Library para testes de componentes
- Cobertura de código automática
- Mocks para APIs e dependências

### 📊 Gerenciamento de Estado

- Jotai para estado global leve
- Estados reativos e persistentes
- Composição atômica de estado

### 🔧 Qualidade de Código

- ESLint com regras rigorosas
- Prettier para formatação automática
- Husky para git hooks
- TypeScript para tipagem

## 🎯 Próximos Passos

Este boilerplate serve como base sólida para desenvolvimento. Você pode:

1. **Personalizar o tema:** Edite `src/app/globals.css` e `tailwind.config.js`
2. **Adicionar páginas:** Crie novos arquivos em `src/app/`
3. **Criar componentes:** Adicione em `src/components/`
4. **Configurar APIs:** Use API Routes do Next.js em `src/app/api/`
5. **Expandir testes:** Adicione testes em arquivos `*.test.tsx`

## 📖 Documentação Adicional

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [React Hook Form](https://react-hook-form.com)
- [Zod](https://zod.dev)
- [Jotai](https://jotai.org)

---

Desenvolvido com ❤️ para acelerar o desenvolvimento web moderno.
