/**
 * @file PropertyGrid.tsx
 * @description Grid de imóveis com suporte a diferentes layouts
 * @module components/property
 */

'use client'

import { PropertyCard } from './PropertyCard'
import { PropertyCardSkeleton } from '@/components/ui/Skeleton'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import type { Property } from '@/types/property'
import { Home } from 'lucide-react'

interface PropertyGridProps {
  properties: Property[]
  isLoading?: boolean
  layout?: 'grid-2' | 'grid-3'
}

/**
 * Grid de imóveis com stagger animation e estado vazio estilizado
 */
export function PropertyGrid({ properties, isLoading, layout = 'grid-3' }: PropertyGridProps) {
  if (isLoading) {
    return (
      <div className={`grid gap-6 ${layout === 'grid-3' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
        {Array.from({ length: 6 }).map((_, i) => (
          <PropertyCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (properties.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[var(--color-surface)] mb-6">
          <Home className="w-8 h-8 text-[var(--color-gray-500)]" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-[var(--color-black)]">
          Nenhum imóvel encontrado
        </h3>
        <p className="mt-2 font-sans text-[var(--color-gray-500)] max-w-md">
          Tente ajustar os filtros ou realizar uma nova busca. Estamos sempre adicionando novos imóveis ao nosso portfólio.
        </p>
      </div>
    )
  }

  return (
    <div className={`grid gap-6 ${layout === 'grid-3' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
      {properties.map((property, i) => (
        <ScrollReveal key={property.id} animation="fade-up" delay={i * 0.05}>
          <PropertyCard property={property} layout="grid" priority={i < 6} />
        </ScrollReveal>
      ))}
    </div>
  )
}
