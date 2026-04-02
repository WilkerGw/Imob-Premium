/**
 * @file TestimonialsSection.tsx
 * @description Carrossel de depoimentos com dots e auto-play
 * @module components/home
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { testimonials } from '@/data/testimonials'
import { Star, Quote } from 'lucide-react'

/**
 * Carrossel de depoimentos com fundo escuro, auto-play e dots
 */
export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length)
  }, [])

  // Auto-play
  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [isPaused, next])

  const testimonial = testimonials[current]

  return (
    <section
      className="bg-[var(--color-black)] section-padding"
      aria-label="Depoimentos de clientes"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container-premium max-w-4xl mx-auto text-center">
        <ScrollReveal animation="fade-up">
          <Quote className="w-12 h-12 text-[var(--color-accent)]/30 mx-auto mb-8" aria-hidden="true" />
        </ScrollReveal>

        <div className="min-h-[280px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              {/* Citação */}
              <blockquote className="font-serif text-lg md:text-xl lg:text-2xl font-normal text-white/90 leading-relaxed italic">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Autor */}
              <div className="flex items-center justify-center gap-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[var(--color-accent)]">
                  <Image
                    src={testimonial.photo}
                    alt={`Foto de ${testimonial.name}`}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </div>
                <div className="text-left">
                  <p className="font-sans text-base font-semibold text-white">
                    {testimonial.name}
                  </p>
                  <span className="font-mono text-sm text-[var(--color-accent-text)] tracking-wider uppercase">
                    Depoimentos reais
                  </span>
                </div>
                <div className="flex gap-0.5 ml-4" aria-label={`Avaliação: ${testimonial.rating} estrelas`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < testimonial.rating ? 'fill-[var(--color-accent)] text-[var(--color-accent)]' : 'text-zinc-600'}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-10" role="tablist" aria-label="Navegar depoimentos">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                i === current
                  ? 'w-8 bg-[var(--color-accent)]'
                  : 'bg-zinc-600 hover:bg-zinc-500'
              }`}
              role="tab"
              aria-selected={i === current}
              aria-label={`Depoimento ${i + 1} de ${testimonials.length}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
