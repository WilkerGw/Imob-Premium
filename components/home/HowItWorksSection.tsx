/**
 * @file HowItWorksSection.tsx
 * @description Seção "Como Funciona" com scroll sticky e progress bar
 * @module components/home
 */

'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { HOW_IT_WORKS_STEPS } from '@/lib/constants'
import { Search, MessageCircle, Key } from 'lucide-react'

const stepIcons = [
  <Search key="search" className="w-8 h-8" />,
  <MessageCircle key="connect" className="w-8 h-8" />,
  <Key key="key" className="w-8 h-8" />,
]

/**
 * Seção "Como Funciona" com 3 etapas e animações de entrada
 */
export function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const progressHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%'])

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-[var(--color-off-white)]"
      aria-label="Como funciona"
    >
      <div className="container-premium">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-16 md:mb-20">
            <span className="font-mono text-sm text-[var(--color-accent-text)] tracking-wider uppercase">
              Processo simplificado
            </span>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-black)]">
              Do sonho ao lar
              <br />
              <span className="text-[var(--color-accent-text)]">em 3 etapas</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="relative max-w-4xl mx-auto">
          {/* Linha de progresso vertical */}
          <div className="absolute left-8 md:left-12 top-0 bottom-0 w-px bg-[var(--color-gray-100)]" aria-hidden="true">
            <motion.div
              className="w-full bg-[var(--color-accent)]"
              style={{ height: progressHeight }}
            />
          </div>

          {/* Steps */}
          <div className="space-y-16 md:space-y-24">
            {HOW_IT_WORKS_STEPS.map((step, i) => (
              <ScrollReveal key={step.number} animation="fade-up" delay={i * 0.15}>
                <div className="flex gap-8 md:gap-12 items-start">
                  {/* Number circle */}
                  <div className="relative shrink-0">
                    <div className="flex items-center justify-center w-16 h-16 md:w-24 md:h-24 rounded-full bg-white border-2 border-[var(--color-accent)] shadow-[var(--shadow-md)]">
                      <span className="text-[var(--color-accent)]">
                        {stepIcons[i]}
                      </span>
                    </div>
                    <span className="absolute -top-2 -right-2 flex items-center justify-center w-7 h-7 rounded-full bg-[var(--color-accent)] text-white font-mono text-xs font-bold">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="pt-2 md:pt-4">
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-[var(--color-black)]">
                      {step.title}
                    </h3>
                    <p className="mt-3 font-sans text-base md:text-lg text-[var(--color-gray-500)] leading-relaxed max-w-lg">
                      {step.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
