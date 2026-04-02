/**
 * @file CategoriesSection.tsx
 * @description Grid de categorias de imóveis com imagens de fundo e overlay
 * @module components/home
 */

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { ArrowRight } from 'lucide-react'
import { PROPERTY_CATEGORIES } from '@/lib/constants'

const categoryImages: Record<string, string> = {
  apartamentos: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop',
  casas: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop',
  coberturas: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&h=400&fit=crop',
  terrenos: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop',
  comerciais: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
  lancamentos: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
}

/**
 * Grid de categorias de imóveis com hover effects premium
 */
export function CategoriesSection() {
  return (
    <section className="section-padding" aria-label="Categorias de imóveis">
      <div className="container-premium">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-12 md:mb-16">
            <span className="font-mono text-sm text-[var(--color-accent-text)] tracking-wider uppercase">
              Curadoria por estilo
            </span>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-black)]">
              Categorias
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROPERTY_CATEGORIES.map((cat, i) => (
            <ScrollReveal key={cat.slug} animation="fade-up" delay={i * 0.08}>
              <Link href={`/imoveis?tipo=${cat.slug}`} className="group block">
                <div className="relative aspect-[3/2] rounded-2xl overflow-hidden">
                  <Image
                    src={categoryImages[cat.slug] || categoryImages.apartamentos}
                    alt={`Imóveis categoria ${cat.label}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/70 group-hover:via-black/20 transition-all duration-500" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                    <div>
                      <h3 className="font-serif text-xl md:text-2xl font-bold text-white">
                        {cat.label}
                      </h3>
                      <span className="font-sans text-sm text-[var(--color-accent-light)] mt-1 block">
                        {cat.count} imóveis
                      </span>
                    </div>
                    <motion.div
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white backdrop-blur-sm opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
