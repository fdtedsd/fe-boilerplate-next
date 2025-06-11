import { Geist, Geist_Mono } from 'next/font/google';

import { Navigation } from '@/components/Navigation';
import { Providers } from '@/providers/providers';

import type { Metadata } from 'next';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'FDTE Boilerplate Next.js',
  description:
    'Boilerplate do FDTE usando Next.js com TypeScript, Tailwind CSS, shadcn/ui, i18n e Jotai',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
