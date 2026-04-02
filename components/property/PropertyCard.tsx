/**
 * @file PropertyCard.tsx
 * @description Card premium de imóvel com suporte a múltiplos layouts
 * @module components/property
 */

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, Bed, Bath, Car, Maximize } from 'lucide-react'
import { cn, formatPrice, formatArea } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import type { Property } from '@/types/property'
import { useState } from 'react'

interface PropertyCardProps {
  property: Property
  layout?: 'grid' | 'carousel' | 'featured'
  priority?: boolean
  className?: string
}

/**
 * Card de imóvel premium com imagem hover zoom, badge e ação de favoritar
 */
export function PropertyCard({
  property,
  layout = 'grid',
  priority = false,
  className,
}: PropertyCardProps) {
  const [isFavorited, setIsFavorited] = useState(false)
  const primaryImage = property.images.find((img) => img.isPrimary) || property.images[0]
  const priceLabel = property.businessType === 'rent' ? '/mês' : ''

  return (
    <Link
      href={`/imoveis/${property.slug}`}
      className={cn(
        'group flex flex-col rounded-2xl bg-white overflow-hidden',
        'shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)]',
        'transition-all duration-500 ease-[var(--ease-out-expo)]',
        layout === 'carousel' ? 'w-[320px] md:w-[400px]' : 'h-full',
        className
      )}
    >
      {/* Imagem */}
      <div className={cn(
        'relative overflow-hidden',
        layout === 'carousel' ? 'aspect-[16/10]' : 'aspect-[4/3]'
      )}>
        <Image
          src={primaryImage.url}
          alt={primaryImage.alt}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
        />

        {/* Overlay gradiente sutil */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Badge de status */}
        {property.badge && (
          <div className="absolute top-5 left-5 z-10">
            <Badge
              variant={
                property.badge === 'NOVO'
                  ? 'success'
                  : property.badge === 'EXCLUSIVO'
                  ? 'accent'
                  : property.badge === 'ÚLTIMAS UNIDADES'
                  ? 'warning'
                  : 'default'
              }
            >
              {property.badge}
            </Badge>
          </div>
        )}

        {/* Botão favoritar */}
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setIsFavorited(!isFavorited)
          }}
          className={cn(
            'absolute top-5 right-5 z-10 flex items-center justify-center w-10 h-10',
            'rounded-full bg-white/80 backdrop-blur-sm',
            'hover:bg-white transition-all duration-300 cursor-pointer',
            'shadow-[var(--shadow-sm)]'
          )}
          aria-label={isFavorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
        >
          <Heart
            className={cn(
              'w-4 h-4 transition-all duration-300',
              isFavorited
                ? 'fill-red-500 text-red-500'
                : 'text-[var(--color-gray-700)] hover:text-red-500'
            )}
          />
        </button>
      </div>

      {/* Info */}
      <div className="p-4 md:p-5 flex-1 flex flex-col gap-2">
        {/* Tipo + Bairro */}
        <p className="font-sans text-[11px] md:text-xs text-[var(--color-gray-500)] uppercase tracking-wider truncate">
          {property.type === 'apartment' ? 'Apartamento' : property.type === 'house' ? 'Casa' : property.type === 'penthouse' ? 'Cobertura' : property.type === 'land' ? 'Terreno' : property.type === 'launch' ? 'Lançamento' : 'Comercial'}
          {' · '}
          {property.address.neighborhood}
        </p>

        {/* Nome — altura fixa de 2 linhas para alinhamento entre cards */}
        <h3 className="font-sans text-base md:text-lg font-bold text-[var(--color-black)] leading-snug line-clamp-2 h-[2.75rem] md:h-[3.125rem] group-hover:text-[var(--color-accent-text)] transition-colors duration-300">
          {property.title}
        </h3>

        {/* Specs — sempre renderizado para manter altura consistente */}
        <div className={cn(
          "flex items-center gap-3 md:gap-4 text-[var(--color-gray-500)]",
          property.rooms.bedrooms === 0 && "invisible"
        )}>
          <span className="flex items-center gap-1.5 font-mono text-xs whitespace-nowrap">
            <Maximize className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            {formatArea(property.area.total)}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-xs">
            <Bed className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            {property.rooms.bedrooms}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-xs">
            <Bath className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            {property.rooms.bathrooms}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-xs">
            <Car className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            {property.rooms.parkingSpots}
          </span>
        </div>

        {/* Preço + CTA */}
        <div className="pt-3 mt-auto border-t border-[var(--color-gray-100)] flex items-center justify-between">
          <span className="font-serif text-xl md:text-2xl font-bold text-[var(--color-black)] flex items-baseline gap-1">
            <span className="font-sans text-[11px] md:text-xs font-semibold text-[var(--color-gray-500)] tracking-wide">R$</span>
            {formatPrice(property.price).replace(/^R\$\s*/, '').trim()}
            <span className="font-sans text-[10px] md:text-xs font-normal text-[var(--color-gray-500)] ml-0.5">
              {priceLabel}
            </span>
          </span>
          <span className="font-sans text-xs md:text-sm font-semibold text-[var(--color-accent-text)] group-hover:translate-x-1.5 transition-transform duration-300 inline-flex items-center gap-1">
            Ver detalhes
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </Link>
  )
}
