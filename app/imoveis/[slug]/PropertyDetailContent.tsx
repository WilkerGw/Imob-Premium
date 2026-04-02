/**
 * @file PropertyDetailContent.tsx
 * @description Client component para detalhes do imóvel com galeria, specs e contato
 * @module app/imoveis/[slug]
 */

'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { cn, formatPrice, formatArea } from '@/lib/utils'
import { COMPANY } from '@/lib/constants'
import { agents } from '@/data/agents'
import type { Property } from '@/types/property'
import {
  Bed, Bath, Car, Maximize, ChevronLeft, ChevronRight,
  Heart, Share2, MapPin, Calendar, Building, Eye,
  MessageCircle, Phone, Mail, Check, X, ArrowLeft,
  DollarSign, Ruler,
} from 'lucide-react'

interface PropertyDetailContentProps {
  property: Property
}

/**
 * Página de detalhe premium com galeria fullscreen, specs, amenities e sidebar de contato
 */
export function PropertyDetailContent({ property }: PropertyDetailContentProps) {
  const [currentImage, setCurrentImage] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)

  const agent = agents.find((a) => a.id === property.agentId) || agents[0]

  const typeLabel = {
    apartment: 'Apartamento',
    house: 'Casa',
    penthouse: 'Cobertura',
    land: 'Terreno',
    commercial: 'Comercial',
    launch: 'Lançamento',
  }[property.type]

  const nextImage = () => setCurrentImage((p) => (p + 1) % property.images.length)
  const prevImage = () => setCurrentImage((p) => (p - 1 + property.images.length) % property.images.length)

  return (
    <>
      <Header theme="light" />
      <main id="main-content" className="pt-32 pb-8 bg-[var(--color-off-white)]">
        {/* Breadcrumb */}
        <div className="container-premium py-4">
          <nav className="flex items-center gap-2 font-sans text-sm text-[var(--color-gray-500)]" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-[var(--color-black)] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/imoveis" className="hover:text-[var(--color-black)] transition-colors">Imóveis</Link>
            <span>/</span>
            <span className="text-[var(--color-black)] font-medium truncate max-w-xs">{property.title}</span>
          </nav>
        </div>

        {/* Gallery */}
        <section className="container-premium mb-8" aria-label="Galeria de fotos">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 rounded-2xl overflow-hidden">
            {/* Main image */}
            <div
              className="relative lg:col-span-3 aspect-[16/10] cursor-pointer group"
              onClick={() => setLightboxOpen(true)}
            >
              <Image
                src={property.images[currentImage]?.url || property.images[0].url}
                alt={property.images[currentImage]?.alt || property.title}
                fill
                priority
                className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 75vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Nav arrows */}
              {property.images.length > 1 && (
                <>
                  <button onClick={(e) => { e.stopPropagation(); prevImage() }} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-[var(--color-black)] hover:bg-white shadow-[var(--shadow-sm)] cursor-pointer z-10" aria-label="Foto anterior">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); nextImage() }} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-[var(--color-black)] hover:bg-white shadow-[var(--shadow-sm)] cursor-pointer z-10" aria-label="Próxima foto">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2 z-10">
                {property.badge && (
                  <Badge variant={property.badge === 'NOVO' ? 'success' : property.badge === 'EXCLUSIVO' ? 'accent' : 'default'}>
                    {property.badge}
                  </Badge>
                )}
              </div>

              {/* Actions */}
              <div className="absolute top-4 right-4 flex gap-2 z-10">
                <button
                  onClick={(e) => { e.stopPropagation(); setIsFavorited(!isFavorited) }}
                  className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white cursor-pointer"
                  aria-label={isFavorited ? 'Remover dos favoritos' : 'Favoritar'}
                >
                  <Heart className={cn('w-5 h-5', isFavorited ? 'fill-red-500 text-red-500' : 'text-[var(--color-gray-700)]')} />
                </button>
                <button className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white cursor-pointer" aria-label="Compartilhar">
                  <Share2 className="w-5 h-5 text-[var(--color-gray-700)]" />
                </button>
              </div>

              {/* Counter */}
              <span className="absolute bottom-4 right-4 bg-black/60 text-white font-mono text-xs px-3 py-1.5 rounded-lg z-10">
                {currentImage + 1} / {property.images.length}
              </span>
            </div>

            {/* Thumbnails (desktop) */}
            <div className="hidden lg:grid grid-rows-3 gap-3">
              {property.images.slice(1, 4).map((img, i) => (
                <div
                  key={img.id}
                  className={cn(
                    'relative cursor-pointer rounded-lg overflow-hidden',
                    'ring-2 ring-transparent hover:ring-[var(--color-accent)] transition-all',
                    currentImage === i + 1 && 'ring-[var(--color-accent)]'
                  )}
                  onClick={() => setCurrentImage(i + 1)}
                >
                  <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="25vw" />
                  {i === 2 && property.images.length > 4 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center" onClick={(e) => { e.stopPropagation(); setLightboxOpen(true) }}>
                      <span className="font-sans text-white text-sm font-semibold">
                        +{property.images.length - 4} fotos
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile thumbnails */}
          <div className="flex gap-2 mt-3 overflow-x-auto lg:hidden scrollbar-hide pb-2">
            {property.images.map((img, i) => (
              <button
                key={img.id}
                onClick={() => setCurrentImage(i)}
                className={cn(
                  'relative shrink-0 w-16 h-16 rounded-lg overflow-hidden cursor-pointer',
                  'ring-2 transition-all',
                  currentImage === i ? 'ring-[var(--color-accent)]' : 'ring-transparent'
                )}
              >
                <Image src={img.url} alt={img.alt} fill className="object-cover" sizes="64px" />
              </button>
            ))}
          </div>
        </section>

        {/* Content */}
        <div className="container-premium pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14">
            {/* Main info */}
            <div className="lg:col-span-8 xl:col-span-8 space-y-8">
              {/* Title & location */}
              <ScrollReveal animation="fade-up">
                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-[var(--shadow-sm)]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-sans text-sm text-[var(--color-gray-500)] uppercase tracking-wide">
                        {typeLabel} · {property.businessType === 'rent' ? 'Aluguel' : property.businessType === 'launch' ? 'Lançamento' : 'Venda'}
                      </p>
                      <h1 className="mt-2 font-serif text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--color-black)] leading-tight">
                        {property.title}
                      </h1>
                      <div className="mt-3 flex items-center gap-2 text-[var(--color-gray-500)]">
                        <MapPin className="w-4 h-4 text-[var(--color-accent)]" />
                        <span className="font-sans text-sm">
                          {property.address.street}, {property.address.number} — {property.address.neighborhood}, {property.address.city}
                        </span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-serif text-2xl md:text-3xl font-bold text-[var(--color-accent)]">
                        {formatPrice(property.price)}
                      </p>
                      {property.businessType === 'rent' && <span className="font-sans text-xs text-[var(--color-gray-500)]">/mês</span>}
                      {property.condoFee && (
                        <p className="mt-1 font-sans text-xs text-[var(--color-gray-500)]">
                          Condomínio: {formatPrice(property.condoFee)}/mês
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Specs row */}
                  <div className="mt-6 pt-6 border-t border-[var(--color-gray-100)] grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { icon: Maximize, value: formatArea(property.area.total), label: 'Área total' },
                      { icon: Bed, value: `${property.rooms.bedrooms} quartos`, label: `${property.rooms.suites} suítes` },
                      { icon: Bath, value: `${property.rooms.bathrooms} banheiros`, label: '' },
                      { icon: Car, value: `${property.rooms.parkingSpots} vagas`, label: '' },
                    ].map(({ icon: Icon, value, label }) => (
                      <div key={value} className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-[var(--color-surface)]">
                          <Icon className="w-5 h-5 text-[var(--color-accent)]" />
                        </div>
                        <div>
                          <p className="font-sans text-sm font-semibold text-[var(--color-black)]">{value}</p>
                          {label && <p className="font-sans text-xs text-[var(--color-gray-500)]">{label}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              {/* Description */}
              <ScrollReveal animation="fade-up" delay={0.1}>
                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-[var(--shadow-sm)]">
                  <h2 className="font-serif text-xl md:text-2xl font-bold text-[var(--color-black)] mb-6">Descrição</h2>
                  <div className="font-sans text-[var(--color-gray-700)] leading-relaxed whitespace-pre-line">
                    {property.description}
                  </div>
                </div>
              </ScrollReveal>

              {/* Amenities */}
              {property.amenities.length > 0 && (
                <ScrollReveal animation="fade-up" delay={0.15}>
                  <div className="bg-white rounded-2xl p-8 md:p-12 shadow-[var(--shadow-sm)]">
                    <h2 className="font-serif text-xl md:text-2xl font-bold text-[var(--color-black)] mb-6">
                      Comodidades do Imóvel
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {property.amenities.map((amenity) => (
                        <div key={amenity} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-[var(--color-success)] shrink-0" />
                          <span className="font-sans text-sm text-[var(--color-gray-700)]">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )}

              {/* Condo amenities */}
              {property.condoAmenities.length > 0 && (
                <ScrollReveal animation="fade-up" delay={0.2}>
                  <div className="bg-white rounded-2xl p-8 md:p-12 shadow-[var(--shadow-sm)]">
                    <h2 className="font-serif text-xl md:text-2xl font-bold text-[var(--color-black)] mb-6">
                      Infraestrutura do Condomínio
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {property.condoAmenities.map((amenity) => (
                        <div key={amenity} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
                          <span className="font-sans text-sm text-[var(--color-gray-700)]">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )}

              {/* Details table */}
              <ScrollReveal animation="fade-up" delay={0.25}>
                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-[var(--shadow-sm)]">
                  <h2 className="font-serif text-xl md:text-2xl font-bold text-[var(--color-black)] mb-6">Detalhes</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { label: 'Tipo', value: typeLabel },
                      { label: 'Área total', value: formatArea(property.area.total) },
                      { label: 'Área útil', value: formatArea(property.area.useful) },
                      { label: 'Suítes', value: property.rooms.suites.toString() },
                      { label: 'Andar', value: property.floor ? `${property.floor}º` : '—' },
                      { label: 'Ano', value: property.yearBuilt?.toString() || '—' },
                      { label: 'IPTU', value: property.iptu ? formatPrice(property.iptu) + '/ano' : '—' },
                      { label: 'Condomínio', value: property.condoFee ? formatPrice(property.condoFee) + '/mês' : '—' },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-start justify-between py-3 border-b border-[var(--color-gray-100)] gap-4">
                        <span className="font-sans text-sm text-[var(--color-gray-500)] shrink-0">{label}</span>
                        <span className="font-sans text-sm font-semibold text-[var(--color-black)] text-right">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 xl:col-span-4 space-y-6">
              {/* Agent card */}
              <ScrollReveal animation="fade-up">
                <div className="sticky top-28 bg-white rounded-2xl p-6 md:p-8 shadow-[var(--shadow-sm)] space-y-6">
                  <h3 className="font-sans text-sm font-semibold text-[var(--color-gray-500)] uppercase tracking-wider">
                    Corretor responsável
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[var(--color-accent)]">
                      <Image src={agent.photo} alt={agent.name} fill className="object-cover" sizes="56px" />
                    </div>
                    <div>
                      <p className="font-sans text-base font-bold text-[var(--color-black)]">{agent.name}</p>
                      <p className="font-sans text-xs text-[var(--color-gray-500)]">{agent.specialty}</p>
                      <p className="font-mono text-xs text-[var(--color-gray-500)] mt-0.5">CRECI {agent.creci}</p>
                    </div>
                  </div>

                  {/* Contact buttons */}
                  <div className="space-y-3">
                    <a
                      href={`https://wa.me/${agent.whatsapp}?text=Olá ${agent.name}! Tenho interesse no imóvel: ${property.title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[var(--color-success)] text-white font-sans text-sm font-semibold hover:brightness-110 transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </a>
                    <a
                      href={`tel:${agent.phone}`}
                      className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border border-[var(--color-gray-200)] text-[var(--color-gray-700)] font-sans text-sm font-semibold hover:bg-[var(--color-surface)] transition-all"
                    >
                      <Phone className="w-4 h-4" />
                      Ligar
                    </a>
                    <a
                      href={`mailto:${agent.email}?subject=Interesse: ${property.title}`}
                      className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border border-[var(--color-gray-200)] text-[var(--color-gray-700)] font-sans text-sm font-semibold hover:bg-[var(--color-surface)] transition-all"
                    >
                      <Mail className="w-4 h-4" />
                      E-mail
                    </a>
                  </div>

                  {/* Property code & views */}
                  <div className="pt-4 border-t border-[var(--color-gray-100)] flex items-center justify-between text-[var(--color-gray-500)]">
                    <span className="font-mono text-xs">Código: {property.id.slice(0, 8).toUpperCase()}</span>
                    <span className="flex items-center gap-1 font-sans text-xs">
                      <Eye className="w-3 h-3" />
                      {property.views} visitas
                    </span>
                  </div>
                </div>
              </ScrollReveal>

              {/* Mortgage calculator preview */}
              <ScrollReveal animation="fade-up" delay={0.1}>
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-[var(--shadow-sm)]">
                  <h3 className="font-sans text-sm font-semibold text-[var(--color-gray-700)] mb-5 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-[var(--color-accent)]" />
                    Simulação de financiamento
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between font-sans text-sm">
                      <span className="text-[var(--color-gray-500)]">Valor do imóvel</span>
                      <span className="font-semibold text-[var(--color-black)]">{formatPrice(property.price)}</span>
                    </div>
                    <div className="flex justify-between font-sans text-sm">
                      <span className="text-[var(--color-gray-500)]">Entrada (20%)</span>
                      <span className="font-semibold text-[var(--color-black)]">{formatPrice(property.price * 0.2)}</span>
                    </div>
                    <div className="flex justify-between font-sans text-sm">
                      <span className="text-[var(--color-gray-500)]">Financiamento (360×)</span>
                      <span className="font-semibold text-[var(--color-accent)]">
                        ~{formatPrice((property.price * 0.8) / 360 * 1.85)}/mês
                      </span>
                    </div>
                    <p className="font-sans text-[10px] text-[var(--color-gray-500)] mt-2">
                      *Simulação ilustrativa. Taxa de 9,5% a.a., prazo 30 anos.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[80] bg-black/95 flex items-center justify-center"
              onClick={() => setLightboxOpen(false)}
            >
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 cursor-pointer z-20"
                aria-label="Fechar galeria"
              >
                <X className="w-6 h-6" />
              </button>

              <button onClick={(e) => { e.stopPropagation(); prevImage() }} className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 cursor-pointer z-20" aria-label="Anterior">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); nextImage() }} className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 cursor-pointer z-20" aria-label="Próxima">
                <ChevronRight className="w-6 h-6" />
              </button>

              <motion.div
                key={currentImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative w-[90vw] h-[80vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={property.images[currentImage].url}
                  alt={property.images[currentImage].alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </motion.div>

              <span className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-sm text-white/60">
                {currentImage + 1} / {property.images.length}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}
