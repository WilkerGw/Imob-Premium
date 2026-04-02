/**
 * @file ImoveisPageContent.tsx
 * @description Client component para a listagem de imóveis com filtros interativos
 * @module app/imoveis
 */

'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { PropertyFilters } from '@/components/property/PropertyFilters'
import { PropertyGrid } from '@/components/property/PropertyGrid'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { usePropertyFilters } from '@/hooks/usePropertyFilters'
import { properties } from '@/data/properties'
import { SlidersHorizontal, LayoutGrid, List, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'
import { Select } from '@/components/ui/Select'

const sortOptions = [
  { label: 'Destaque', value: 'featured' },
  { label: 'Mais recentes', value: 'recent' },
  { label: 'Menor preço', value: 'price-asc' },
  { label: 'Maior preço', value: 'price-desc' },
]

export function ImoveisPageContent() {
  const {
    filters,
    updateFilter,
    resetFilters,
    filteredProperties,
    activeFiltersCount,
    totalResults,
  } = usePropertyFilters(properties)

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [gridLayout, setGridLayout] = useState<'grid-2' | 'grid-3'>('grid-3')

  return (
    <>
      <Header theme="light" />
      <main id="main-content" className="min-h-screen pt-20 bg-[var(--color-off-white)]">
        {/* Page header */}
        <section className="bg-[var(--color-black)]">
          <div className="container-premium py-20 md:py-18">
            <ScrollReveal animation="fade-up">
              <span className="font-mono text-sm text-[var(--color-accent)] tracking-wider uppercase">
                Portfólio
              </span>
              <h1 className="mt-3 font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                Nossos Imóveis
              </h1>
              <p className="mt-3 font-sans text-lg text-white/70 max-w-xl">
                {totalResults} imóveis encontrados — curadoria exclusiva de propriedades de alto padrão em São Paulo.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <div className="container-premium py-10 md:py-16">
          {/* Controls bar */}
          <div className="flex items-center justify-between mb-8">
            {/* Mobile filter trigger */}
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[var(--color-gray-100)] font-sans text-sm font-medium cursor-pointer hover:bg-[var(--color-surface)] transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filtros
              {activeFiltersCount > 0 && (
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[var(--color-accent)] text-white text-[10px] font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </button>

            {/* Sort & Layout */}
            <div className="flex items-center gap-4 ml-auto h-12">
              <Select
                value={filters.sortBy}
                onChange={(val) => updateFilter('sortBy', val as any)}
                options={sortOptions}
                variant="outline"
                className="w-[180px] h-full"
                aria-label="Ordenar por"
              />

              {/* Layout toggle — desktop only */}
              <div className="hidden md:flex items-stretch gap-1 p-1 h-full rounded-xl bg-white border border-[var(--color-gray-100)]">
                <button
                  onClick={() => setGridLayout('grid-3')}
                  className={cn(
                    'flex items-center justify-center px-2.5 rounded-lg transition-colors cursor-pointer',
                    gridLayout === 'grid-3' ? 'bg-[var(--color-black)] text-white' : 'text-[var(--color-gray-500)] hover:bg-[var(--color-surface)]'
                  )}
                  aria-label="Grid de 3 colunas"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setGridLayout('grid-2')}
                  className={cn(
                    'flex items-center justify-center px-2.5 rounded-lg transition-colors cursor-pointer',
                    gridLayout === 'grid-2' ? 'bg-[var(--color-black)] text-white' : 'text-[var(--color-gray-500)] hover:bg-[var(--color-surface)]'
                  )}
                  aria-label="Grid de 2 colunas"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Main content grid */}
          <div className="flex gap-8">
            {/* Desktop sidebar */}
            <div className="hidden lg:block w-[300px] shrink-0">
              <div className="sticky top-28 bg-white rounded-2xl p-6 shadow-[var(--shadow-sm)]">
                <PropertyFilters
                  filters={filters}
                  updateFilter={updateFilter}
                  resetFilters={resetFilters}
                  activeFiltersCount={activeFiltersCount}
                  totalResults={totalResults}
                />
              </div>
            </div>

            {/* Grid */}
            <div className="flex-1 min-w-0">
              <PropertyGrid
                properties={filteredProperties}
                layout={gridLayout}
              />
            </div>
          </div>
        </div>

        {/* Mobile filter drawer */}
        <AnimatePresence>
          {mobileFiltersOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                onClick={() => setMobileFiltersOpen(false)}
              />
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="fixed bottom-0 left-0 right-0 z-60 max-h-[85vh] bg-white rounded-t-3xl overflow-y-auto"
              >
                <div className="sticky top-0 bg-white p-4 border-b border-[var(--color-gray-100)] flex items-center justify-between z-10">
                  <h2 className="font-sans text-lg font-bold">Filtros</h2>
                  <button
                    onClick={() => setMobileFiltersOpen(false)}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--color-surface)] cursor-pointer"
                    aria-label="Fechar filtros"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-6">
                  <PropertyFilters
                    filters={filters}
                    updateFilter={updateFilter}
                    resetFilters={resetFilters}
                    activeFiltersCount={activeFiltersCount}
                    totalResults={totalResults}
                    onApply={() => setMobileFiltersOpen(false)}
                  />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  )
}

type PropertyFiltersState = {
  sortBy: 'featured' | 'recent' | 'price-asc' | 'price-desc'
}
