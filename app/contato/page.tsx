/**
 * @file page.tsx
 * @description Página de contato com formulário + mapa + info
 * @module app/contato
 */

import type { Metadata } from 'next'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ContactForm } from './ContactForm'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { generatePageMetadata } from '@/lib/seo'
import { COMPANY } from '@/lib/constants'
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react'

export const metadata: Metadata = generatePageMetadata({
  title: 'Fale Conosco',
  description: 'Entre em contato com a ImobPremium. Estamos prontos para ajudar você a encontrar o imóvel ideal em São Paulo.',
  path: '/contato',
})

export default function ContatoPage() {
  return (
    <>
      <Header theme="light" />
      <main id="main-content" className="pt-20 bg-[var(--color-off-white)]">
        {/* Header banner */}
        <section className="bg-[var(--color-black)]">
          <div className="container-premium py-20 md:py-18">
            <ScrollReveal animation="fade-up">
              <span className="font-mono text-sm text-[var(--color-accent)] tracking-wider uppercase">Contato</span>
              <h1 className="mt-3 font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                Fale Conosco
              </h1>
              <p className="mt-3 font-sans text-lg text-white/70 max-w-xl">
                Nossa equipe está pronta para ajudar. Escolha o canal que preferir.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <div className="container-premium py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Form */}
            <div className="lg:col-span-3">
              <ScrollReveal animation="fade-up">
                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-[var(--shadow-sm)]">
                  <h2 className="font-serif text-2xl font-bold text-[var(--color-black)] mb-8">
                    Envie uma mensagem
                  </h2>
                  <ContactForm />
                </div>
              </ScrollReveal>
            </div>

            {/* Contact info */}
            <div className="lg:col-span-2 space-y-6">
              <ScrollReveal animation="fade-up" delay={0.1}>
                <div className="bg-white rounded-2xl p-8 md:p-10 shadow-[var(--shadow-sm)] space-y-6">
                  <h3 className="font-sans text-sm font-semibold text-[var(--color-gray-500)] uppercase tracking-wider">
                    Informações
                  </h3>
                  {[
                    { icon: MapPin, label: 'Endereço', value: `${COMPANY.address.street}, ${COMPANY.address.complement}\n${COMPANY.address.neighborhood} — ${COMPANY.address.city}/${COMPANY.address.state}` },
                    { icon: Phone, label: 'Telefone', value: COMPANY.phone },
                    { icon: Mail, label: 'E-mail', value: COMPANY.email },
                    { icon: Clock, label: 'Horário', value: COMPANY.hours },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--color-surface)] shrink-0">
                        <Icon className="w-4 h-4 text-[var(--color-accent-text)]" />
                      </div>
                      <div>
                        <p className="font-sans text-xs text-[var(--color-gray-500)]">{label}</p>
                        <p className="font-sans text-sm text-[var(--color-black)] whitespace-pre-line">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={0.15}>
                <a
                  href={`https://wa.me/${COMPANY.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-[var(--color-success)] text-white font-sans font-semibold text-base hover:brightness-110 transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  Falar pelo WhatsApp
                </a>
              </ScrollReveal>

              {/* Map placeholder */}
              <ScrollReveal animation="fade-up" delay={0.2}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-[var(--shadow-sm)]">
                  <div className="relative aspect-video flex items-center justify-center bg-[var(--color-black)]">
                    <Image
                      src="https://images.unsplash.com/photo-1543083477-4f785aeafaa9?q=80&w=800&auto=format&fit=crop"
                      alt={`Localização: ${COMPANY.address.neighborhood}`}
                      fill
                      className="object-cover opacity-50 mix-blend-luminosity"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-black)]/60 to-transparent" />

                    <div className="relative z-10 text-center p-5 md:p-6 bg-white/90 backdrop-blur-md rounded-xl shadow-[var(--shadow-lg)] border border-white/20 mx-4">
                      <MapPin className="w-8 h-8 text-[var(--color-accent-text)] mx-auto mb-2" />
                      <p className="font-sans text-sm font-semibold text-[var(--color-gray-700)]">
                        {COMPANY.address.neighborhood} — {COMPANY.address.city}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
