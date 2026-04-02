/**
 * @file layout.tsx
 * @description Root layout com metadata SEO global, fontes premium e skip navigation
 * @module app
 */

import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans, DM_Mono } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const dmMono = DM_Mono({
  variable: '--font-dm-mono',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://imobpremium.com.br'),
  title: {
    default: 'ImobPremium | Imóveis de Alto Padrão em São Paulo',
    template: '%s | ImobPremium',
  },
  description:
    'Encontre apartamentos, casas e coberturas de alto padrão em São Paulo. Mais de 1.200 imóveis curados nos melhores bairros. Atendimento personalizado.',
  keywords: [
    'imóveis alto padrão São Paulo',
    'apartamentos de luxo SP',
    'imobiliária São Paulo',
    'comprar imóvel SP',
    'alugar apartamento São Paulo',
    'coberturas de luxo',
    'imóveis premium',
  ],
  authors: [{ name: 'ImobPremium' }],
  creator: 'ImobPremium',
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'ImobPremium',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@imobpremium',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-[var(--color-white)] text-[var(--color-black)]" suppressHydrationWarning>
        {/* Skip navigation link — acessibilidade */}
        <a href="#main-content" className="sr-only">
          Ir para o conteúdo principal
        </a>
        {children}
      </body>
    </html>
  )
}
