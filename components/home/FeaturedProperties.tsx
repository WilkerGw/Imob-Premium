/**
 * @file FeaturedProperties.tsx
 * @description Carrossel horizontal de imóveis em destaque com drag
 * @module components/home
 */

'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { PropertyCard } from '@/components/property/PropertyCard'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { getFeaturedProperties } from '@/data/properties'

/**
 * Carrossel horizontal de imóveis em destaque com scroll drag
 */
export function FeaturedProperties() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const properties = getFeaturedProperties()

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return
    const scrollAmount = 400
    carouselRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  return (
    <section className="section-padding overflow-hidden" aria-label="Imóveis em destaque">
      <div className="container-premium">
        <ScrollReveal animation="fade-up">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="font-mono text-sm text-[var(--color-accent-text)] tracking-wider uppercase">
                Seleção curada
              </span>
              <h2 className="mt-2 font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-black)]">
                Destaques
              </h2>
              <p className="mt-3 font-sans text-[var(--color-gray-500)] text-lg">
                <span className="font-mono text-[var(--color-accent)]">{properties.length}</span>
                {' '}imóveis selecionados
              </p>
            </div>

            {/* Navigation arrows */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => scroll('left')}
                className="flex items-center justify-center w-12 h-12 rounded-full border border-[var(--color-gray-300)] text-[var(--color-gray-700)] hover:border-[var(--color-black)] hover:text-[var(--color-black)] transition-all duration-300 cursor-pointer"
                aria-label="Imóvel anterior"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="flex items-center justify-center w-12 h-12 rounded-full border border-[var(--color-gray-300)] text-[var(--color-gray-700)] hover:border-[var(--color-black)] hover:text-[var(--color-black)] transition-all duration-300 cursor-pointer"
                aria-label="Próximo imóvel"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Carousel */}
      <div
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide px-6 md:px-12 lg:px-24 pb-4 snap-x snap-mandatory"
        role="region"
        aria-label="Carrossel de imóveis em destaque"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {properties.map((property, i) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.01 }}
            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="snap-start shrink-0 w-[320px] md:w-[400px]"
          >
            <PropertyCard
              property={property}
              layout="carousel"
              priority={i < 3}
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
