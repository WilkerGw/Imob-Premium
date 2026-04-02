/**
 * @file AgentsSection.tsx
 * @description Grid de corretores em destaque com cards premium
 * @module components/home
 */

'use client'

import Image from 'next/image'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { agents } from '@/data/agents'
import { Star, MessageCircle, Building2, TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'

/**
 * Grid de corretores em destaque com stats e WhatsApp CTA
 */
export function AgentsSection() {
  return (
    <section className="section-padding bg-[var(--color-off-white)]" aria-label="Corretores em destaque">
      <div className="container-premium">
        <ScrollReveal animation="fade-up">
          <div className="text-center mb-12 md:mb-16">
            <span className="font-mono text-sm text-[var(--color-accent-text)] tracking-wider uppercase">
              Nosso Time
            </span>
            <h2 className="mt-3 font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-black)]">
              Nossos Corretores
            </h2>
            <p className="mt-4 font-sans text-lg text-[var(--color-gray-500)] max-w-2xl mx-auto">
              Profissionais certificados com anos de experiência no mercado imobiliário paulistano.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {agents.map((agent, i) => (
            <ScrollReveal key={agent.id} animation="fade-up" delay={i * 0.1}>
              <div className="group bg-white rounded-2xl overflow-hidden shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] transition-all duration-500">
                {/* Foto */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={agent.photo}
                    alt={`Foto de ${agent.name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Info */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="font-sans text-lg font-bold text-[var(--color-black)]">
                      {agent.name}
                    </h3>
                    <Badge variant="outline" className="mt-1">
                      {agent.specialty}
                    </Badge>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star
                          key={j}
                          className={`w-3.5 h-3.5 ${
                            j < Math.round(agent.rating)
                              ? 'fill-[var(--color-accent)] text-[var(--color-accent)]'
                              : 'text-[var(--color-gray-300)]'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-mono text-xs text-[var(--color-gray-500)]">
                      {agent.rating}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-[var(--color-gray-500)]">
                    <span className="flex items-center gap-1 font-sans text-xs">
                      <Building2 className="w-3.5 h-3.5" />
                      {agent.totalProperties} imóveis
                    </span>
                    <span className="flex items-center gap-1 font-sans text-xs">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {agent.totalSales} vendas
                    </span>
                  </div>

                  {/* WhatsApp CTA */}
                  <a
                    href={`https://wa.me/${agent.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-[var(--color-success)] text-[var(--color-success)] font-sans text-sm font-medium hover:bg-[var(--color-success)] hover:text-white transition-all duration-300"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Falar no WhatsApp
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
