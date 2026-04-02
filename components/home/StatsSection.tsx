/**
 * @file StatsSection.tsx
 * @description Seção de números de credibilidade com counters animados
 * @module components/home
 */

'use client'

import { AnimatedNumber } from '@/components/ui/AnimatedNumber'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { STATS } from '@/lib/constants'

/**
 * Seção de estatísticas com fundo preto e números animados
 */
export function StatsSection() {
  return (
    <section
      className="bg-[var(--color-black)] py-20 md:py-28"
      aria-label="Estatísticas da ImobPremium"
    >
      <ScrollReveal animation="fade-up">
        <div className="container-premium">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0">
            {STATS.map((stat, index) => (
              <div
                key={stat.label}
                className={`flex flex-col items-center text-center ${
                  index < STATS.length - 1
                    ? 'md:border-r md:border-[var(--color-accent)]/20'
                    : ''
                }`}
              >
                <span className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                  <AnimatedNumber
                    value={stat.value}
                    suffix={stat.suffix}
                    duration={2.5}
                  />
                </span>
                <span className="mt-2 font-sans text-sm text-zinc-400 tracking-wide">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  )
}
