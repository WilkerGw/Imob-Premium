/**
 * @file page.tsx
 * @description Página "Sobre Nós" com história, missão e valores
 * @module app/sobre
 */

import type { Metadata } from 'next'
import Image from 'next/image'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { AnimatedNumber } from '@/components/ui/AnimatedNumber'
import { generatePageMetadata } from '@/lib/seo'
import { COMPANY, STATS } from '@/lib/constants'
import { Award, Shield, Heart, Users } from 'lucide-react'

export const metadata: Metadata = generatePageMetadata({
  title: 'Sobre a ImobPremium',
  description: 'Conheça a história da ImobPremium: mais de 15 anos conectando pessoas aos melhores imóveis de São Paulo. Nossa missão, valores e equipe.',
  path: '/sobre',
})

const values = [
  { icon: Shield, title: 'Transparência', description: 'Processos claros e comunicação honesta em toda a jornada de compra.' },
  { icon: Award, title: 'Excelência', description: 'Padrão premium em cada serviço, do primeiro contato à pós-venda.' },
  { icon: Heart, title: 'Cuidado', description: 'Tratamos cada cliente de forma única, entendendo sonhos e necessidades.' },
  { icon: Users, title: 'Parceria', description: 'Construímos relações duradouras com clientes, corretores e incorporadores.' },
]

export default function SobrePage() {
  return (
    <>
      <Header theme="light" />
      <main id="main-content" className="pt-20">
        {/* Hero */}
        <section className="relative bg-[var(--color-black)] overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <Image
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&h=600&fit=crop"
              alt=""
              fill className="object-cover" sizes="100vw"
            />
          </div>
          <div className="relative container-premium py-20 md:py-18">
            <ScrollReveal animation="fade-up">
              <span className="font-mono text-sm text-[var(--color-accent)] tracking-wider uppercase">Quem somos</span>
              <h1 className="mt-3 font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-3xl">
                Transformando sonhos em endereços <span className="text-[var(--color-accent)]">desde 2009</span>
              </h1>
              <p className="mt-4 font-sans text-lg text-white/70 max-w-2xl">
                A ImobPremium nasceu com o propósito de revolucionar o mercado imobiliário
                paulistano, oferecendo uma experiência verdadeiramente premium na busca pelo lar ideal.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-white border-b border-[var(--color-gray-100)]">
          <div className="container-premium py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <span className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-accent-text)]">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} duration={2} />
                  </span>
                  <p className="mt-1 font-sans text-sm text-[var(--color-gray-500)]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="section-padding bg-[var(--color-off-white)]">
          <div className="container-premium">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <ScrollReveal animation="fade-up">
                <div className="space-y-6">
                  <span className="font-mono text-sm text-[var(--color-accent-text)] tracking-wider uppercase">Nossa Missão</span>
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-black)]">
                    Uma trajetória de confiança e resultados
                  </h2>
                  <div className="space-y-4 font-sans text-[var(--color-gray-700)] leading-relaxed">
                    <p>
                      Fundada em 2009 por um grupo de profissionais apaixonados pelo mercado imobiliário,
                      a ImobPremium rapidamente se consolidou como referência em imóveis de alto padrão em São Paulo.
                    </p>
                    <p>
                      Com uma curadoria rigorosa e atendimento personalizado, selecionamos apenas os melhores
                      imóveis nos bairros mais valorizados da cidade. Nossa equipe de corretores certificados
                      acompanha cada cliente do primeiro contato até a entrega das chaves.
                    </p>
                    <p>
                      Hoje, somos mais de 30 profissionais dedicados a oferecer a melhor experiência do mercado,
                      com tecnologia de ponta e um olhar humano sobre cada negociação.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal animation="fade-up" delay={0.15}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop"
                    alt="Equipe ImobPremium em reunião"
                    fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section-padding">
          <div className="container-premium">
            <ScrollReveal animation="fade-up">
              <div className="text-center mb-12">
                <span className="font-mono text-sm text-[var(--color-accent-text)] tracking-wider uppercase">Nossos pilares</span>
                <h2 className="mt-3 font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-black)]">Valores</h2>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => (
                <ScrollReveal key={v.title} animation="fade-up" delay={i * 0.1}>
                  <div className="bg-white rounded-2xl p-6 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-shadow h-full">
                    <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[var(--color-surface)] mb-6">
                      <v.icon className="w-6 h-6 text-[var(--color-accent-text)]" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-[var(--color-black)] mb-3">{v.title}</h3>
                    <p className="mt-2 font-sans text-sm text-[var(--color-gray-500)] leading-relaxed">{v.description}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
