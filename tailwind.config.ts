import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'teste-color': 'var(--teste-color)',
        'minha-cor': 'var(--minha-cor)',
        // Adicione mais cores aqui seguindo o mesmo padrão
      },
    },
  },
  plugins: [],
};

export default config;
