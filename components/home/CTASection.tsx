/**
 * @file CTASection.tsx
 * @description Seção CTA final com fundo dourado e botões de ação
 * @module components/home
 */

'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { COMPANY } from '@/lib/constants'

/**
 * CTA final full-width com fundo accent e botões premium
 */
export function CTASection() {
  return (
    <section
      className="relative overflow-hidden"
      aria-label="Chamada para ação"
    >
      {/* Background com textura */}
      <div className="absolute inset-0 bg-[var(--color-accent)]" />
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      <div className="relative container-premium py-24 md:py-32 text-center">
        <ScrollReveal animation="fade-up">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-black)] max-w-3xl mx-auto leading-tight">
            Pronto para encontrar o imóvel dos seus sonhos?
          </h2>
          <p className="mt-4 font-sans text-lg text-[var(--color-black)]/80 max-w-xl mx-auto">
            Nossa equipe de especialistas está pronta para te ajudar a cada passo do caminho.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/imoveis"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--color-black)] text-white font-sans font-semibold text-base hover:bg-[var(--color-gray-900)] transition-all duration-300 hover:scale-105 hover:shadow-[var(--shadow-lg)]"
            >
              Explorar imóveis
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={`https://wa.me/${COMPANY.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-[var(--color-black)] text-[var(--color-black)] font-sans font-semibold text-base hover:bg-[var(--color-black)] hover:text-white transition-all duration-300"
            >
              <MessageCircle className="w-5 h-5" />
              Falar com especialista
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
