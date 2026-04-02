/**
 * @file page.tsx
 * @description Página de listagem de imóveis com filtros e grid
 * @module app/imoveis
 */

import type { Metadata } from 'next'
import { generatePageMetadata } from '@/lib/seo'
import { ImoveisPageContent } from './ImoveisPageContent'

export const metadata: Metadata = generatePageMetadata({
  title: 'Imóveis de Alto Padrão em São Paulo',
  description: 'Encontre seu imóvel ideal entre mais de 1.200 opções em São Paulo. Apartamentos, casas, coberturas e terrenos nos melhores bairros.',
  path: '/imoveis',
})

import { Suspense } from 'react'

export default function ImoveisPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--color-off-white)] pt-20" />}>
      <ImoveisPageContent />
    </Suspense>
  )
}
