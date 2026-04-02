/**
 * @file HeroSection.tsx
 * @description Hero full-screen com parallax, search bar e animações de entrada
 * @module components/home
 */

'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Search, ChevronDown } from 'lucide-react'
import { Select } from '@/components/ui/Select'

const propertyTypeOptions = [
  { label: 'Apartamento', value: 'apartment' },
  { label: 'Casa', value: 'house' },
  { label: 'Cobertura', value: 'penthouse' },
]

const priceRangeOptions = [
  { label: 'Até R$ 500k', value: '0-500000' },
  { label: 'R$ 500k - R$ 1M', value: '500000-1000000' },
  { label: 'R$ 1M - R$ 5M', value: '1000000-5000000' },
  { label: 'Acima de R$ 5M', value: '5000000+' },
]

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: typeof delay === 'number' ? delay : 0,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

/**
 * Hero section full viewport com parallax, animações e barra de busca
 */
export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [priceRange, setPriceRange] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchQuery) params.set('q', searchQuery)
    if (propertyType) params.set('type', propertyType)
    if (priceRange) params.set('price', priceRange)
    router.push(`/imoveis?${params.toString()}`)
  }

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] overflow-hidden"
      aria-label="Seção principal"
    >
      {/* Imagem de fundo com parallax e Ken Burns */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop&q=85"
          alt=""
          fill
          priority
          quality={85}
          className="object-cover scale-105 animate-[kenBurns_20s_ease-in-out_infinite_alternate]"
          sizes="100vw"
        />
        {/* Overlay gradiente para legibilidade */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/60"
          aria-hidden="true"
        />
      </motion.div>

      {/* Conteúdo principal */}
      <motion.div
        className="relative z-10 flex h-full flex-col items-start justify-center container-premium"
        style={{ y: contentY, opacity }}
      >
        {/* Badge de localização */}
        <motion.div
          custom={0.3}
          initial="hidden"
          animate="visible"
          variants={contentVariants}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 backdrop-blur-sm"
        >
          <span className="h-2 w-2 rounded-full bg-[var(--color-accent)]" aria-hidden="true" />
          <span className="font-sans text-sm text-white/90 font-medium">
            Imóveis Premium · São Paulo
          </span>
        </motion.div>

        {/* Título principal */}
        <motion.h1
          custom={0.5}
          initial="hidden"
          animate="visible"
          variants={contentVariants}
          className={cn(
            'max-w-5xl font-serif font-bold text-white',
            'text-[clamp(2.5rem,7vw,7.5rem)] leading-[1.15]',
          )}
        >
          Encontre o Lar
          <br />
          <span className="text-gradient-gold">que Define Você.</span>
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          custom={0.7}
          initial="hidden"
          animate="visible"
          variants={contentVariants}
          className="mt-6 max-w-xl font-sans text-lg font-light text-white/80 md:text-xl leading-relaxed"
        >
          Mais de 1.200 imóveis curados nos melhores bairros de São Paulo.
        </motion.p>

        {/* Barra de busca glassmorphism */}
        <motion.div
          custom={0.9}
          initial="hidden"
          animate="visible"
          variants={contentVariants}
          className="mt-10 w-full max-w-3xl"
        >
          <form 
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row items-center gap-3 sm:rounded-2xl bg-white/10 sm:border border-white/20 sm:backdrop-blur-xl sm:p-2"
          >
            <div className="flex-1 w-full flex items-center gap-3 px-4 h-12 rounded-xl bg-white/10 border border-white/10 transition-all duration-300 focus-within:border-accent focus-within:bg-white/20 focus-within:shadow-[0_0_0_1px_var(--color-accent)]">
              <Search className="w-5 h-5 text-white/80 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por bairro, cidade..."
                className="w-full h-full bg-transparent text-white placeholder:text-white/80 font-sans text-base outline-none! focus:outline-none! focus-visible:outline-none! focus:ring-0"
                aria-label="Buscar imóveis"
              />
            </div>
            <div className="flex flex-row items-stretch gap-2 w-full sm:w-auto md:h-12">
              <Select
                variant="glass"
                placeholder="Tipo"
                options={propertyTypeOptions}
                value={propertyType}
                onChange={setPropertyType}
                className="flex-1 h-12 md:h-full min-w-0 md:w-[170px]"
              />
              <Select
                variant="glass"
                placeholder="Preço"
                options={priceRangeOptions}
                value={priceRange}
                onChange={setPriceRange}
                className="flex-1 h-12 md:h-full min-w-0 md:w-[170px]"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 h-12 w-12 px-0 sm:w-auto sm:px-8 rounded-xl bg-[var(--color-accent)] text-white font-sans text-sm font-semibold hover:bg-[var(--color-accent-dark)] transition-colors duration-300 cursor-pointer shrink-0"
                aria-label="Buscar imóveis"
              >
                <span className="hidden sm:inline">Buscar</span>
                <Search className="w-5 h-5 sm:hidden" />
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="font-sans text-xs tracking-[0.2em] text-white/80 uppercase">
          Explorar
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-white/70" />
        </motion.div>
      </motion.div>

      {/* Ken Burns keyframes — injected via style tag */}
      <style jsx global>{`
        @keyframes kenBurns {
          0% { transform: scale(1.05) translate(0, 0); }
          100% { transform: scale(1.12) translate(-1%, -1%); }
        }
      `}</style>
    </section>
  )
}
