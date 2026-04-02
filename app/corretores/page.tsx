/**
 * @file page.tsx
 * @description Página de corretores com grid e perfil expandido
 * @module app/corretores
 */

import type { Metadata } from 'next'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Badge } from '@/components/ui/Badge'
import { generatePageMetadata } from '@/lib/seo'
import { agents } from '@/data/agents'
import { Star, MessageCircle, Phone, Mail, Building2, TrendingUp } from 'lucide-react'

export const metadata: Metadata = generatePageMetadata({
  title: 'Nossos Corretores',
  description: 'Conheça os especialistas da ImobPremium. Corretores certificados com anos de experiência no mercado de imóveis de alto padrão.',
  path: '/corretores',
})

export default function CorretoresPage() {
  return (
    <>
      <Header theme="light" />
      <main id="main-content" className="pt-20 bg-[var(--color-off-white)]">
        {/* Header */}
        <section className="bg-[var(--color-black)]">
          <div className="container-premium py-20 md:py-18">
            <ScrollReveal animation="fade-up">
              <span className="font-mono text-sm text-[var(--color-accent)] tracking-wider uppercase">
                Time de especialistas
              </span>
              <h1 className="mt-3 font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                Nossos Corretores
              </h1>
              <p className="mt-3 font-sans text-lg text-white/70 max-w-xl">
                Profissionais certificados, dedicados a oferecer a melhor experiência no mercado imobiliário.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Grid */}
        <div className="container-premium py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {agents.map((agent, i) => (
              <ScrollReveal key={agent.id} animation="fade-up" delay={i * 0.1}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] transition-shadow">
                  <div className="flex flex-col sm:flex-row">
                    {/* Photo */}
                    <div className="relative w-full sm:w-48 h-64 sm:h-auto shrink-0">
                      <Image
                        src={agent.photo}
                        alt={`Foto de ${agent.name}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 200px"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 p-6 space-y-4">
                      <div>
                        <h2 className="font-sans text-xl font-bold text-[var(--color-black)]">{agent.name}</h2>
                        <Badge variant="outline" className="mt-1">{agent.specialty}</Badge>
                        <p className="mt-1 font-mono text-xs text-[var(--color-gray-500)]">CRECI {agent.creci}</p>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star key={j} className={`w-4 h-4 ${j < Math.round(agent.rating) ? 'fill-[var(--color-accent)] text-[var(--color-accent)]' : 'text-[var(--color-gray-300)]'}`} />
                          ))}
                        </div>
                        <span className="font-mono text-sm text-[var(--color-gray-700)]">{agent.rating}</span>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-6">
                        <span className="flex items-center gap-1 font-sans text-sm text-[var(--color-gray-500)]">
                          <Building2 className="w-4 h-4" />{agent.totalProperties} imóveis
                        </span>
                        <span className="flex items-center gap-1 font-sans text-sm text-[var(--color-gray-500)]">
                          <TrendingUp className="w-4 h-4" />{agent.totalSales} vendas
                        </span>
                      </div>

                      <p className="font-sans text-sm text-[var(--color-gray-500)] leading-relaxed line-clamp-2">
                        {agent.bio}
                      </p>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <a
                          href={`https://wa.me/${agent.whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--color-success)] text-white font-sans text-xs font-semibold hover:brightness-110 transition-all"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />WhatsApp
                        </a>
                        <a href={`tel:${agent.phone}`} className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[var(--color-gray-200)] text-[var(--color-gray-700)] font-sans text-xs font-medium hover:bg-[var(--color-surface)] transition-all">
                          <Phone className="w-3.5 h-3.5" />Ligar
                        </a>
                        <a href={`mailto:${agent.email}`} className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-[var(--color-gray-200)] text-[var(--color-gray-700)] font-sans text-xs font-medium hover:bg-[var(--color-surface)] transition-all">
                          <Mail className="w-3.5 h-3.5" />E-mail
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
