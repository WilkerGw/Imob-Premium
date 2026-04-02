/**
 * @file PropertyFilters.tsx
 * @description Sidebar de filtros para listagem de imóveis
 * @module components/property
 */

'use client'

import { cn } from '@/lib/utils'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { PropertyType, BusinessType, propertyTypeLabels } from '@/types/property'
import type { PropertyFiltersState } from '@/types/property'


interface PropertyFiltersProps {
  filters: PropertyFiltersState
  updateFilter: <K extends keyof PropertyFiltersState>(key: K, value: PropertyFiltersState[K]) => void
  resetFilters: () => void
  activeFiltersCount: number
  totalResults: number
  className?: string
  onApply?: () => void
}

/**
 * Sidebar de filtros completa para listagem de imóveis
 */
export function PropertyFilters({
  filters,
  updateFilter,
  resetFilters,
  activeFiltersCount,
  totalResults,
  className,
  onApply,
}: PropertyFiltersProps) {
  return (
    <aside className={cn('space-y-6', className)} aria-label="Filtros de imóveis">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-[var(--color-gray-700)]" />
          <h2 className="font-sans text-lg font-bold text-[var(--color-black)]">Filtros</h2>
          {activeFiltersCount > 0 && (
            <Badge variant="accent">{activeFiltersCount}</Badge>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <button
            onClick={resetFilters}
            className="font-sans text-xs text-[var(--color-gray-500)] hover:text-[var(--color-error)] transition-colors cursor-pointer"
          >
            Limpar tudo
          </button>
        )}
      </div>

      {/* Busca */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-gray-500)]" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
          placeholder="Buscar por bairro, cidade..."
          className="w-full pl-10 pr-4 py-4 rounded-xl border border-gray-100 font-sans text-sm bg-white focus:border-[var(--color-accent)] outline-none transition-colors"
          aria-label="Buscar imóveis"
        />
      </div>

      {/* Tipo de Negócio */}
      <FilterSection title="Tipo de negócio">
        <div className="flex flex-wrap gap-2">
          {(['all', BusinessType.SALE, BusinessType.RENT, BusinessType.LAUNCH] as const).map((type) => (
            <button
              key={type}
              onClick={() => updateFilter('businessType', type)}
              className={cn(
                'px-5 py-3.5 rounded-lg font-sans text-sm font-medium transition-all cursor-pointer',
                filters.businessType === type
                  ? 'bg-[var(--color-black)] text-white'
                  : 'bg-[var(--color-surface)] text-[var(--color-gray-700)] hover:bg-[var(--color-surface-alt)]'
              )}
            >
              {type === 'all' ? 'Todos' : type === 'sale' ? 'Venda' : type === 'rent' ? 'Aluguel' : 'Lançamento'}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Tipo de Imóvel */}
      <FilterSection title="Tipo de imóvel">
        <div className="flex flex-wrap gap-3">
          {Object.values(PropertyType).map((type) => {
            const isActive = filters.propertyType.includes(type)
            return (
              <button
                key={type}
                onClick={() => {
                  const newTypes = isActive
                    ? filters.propertyType.filter((t) => t !== type)
                    : [...filters.propertyType, type]
                  updateFilter('propertyType', newTypes)
                }}
                className={cn(
                  'px-4 py-2 rounded-lg font-sans text-xs font-medium transition-all cursor-pointer',
                  isActive
                    ? 'bg-[var(--color-accent)] text-white'
                    : 'bg-[var(--color-surface)] text-[var(--color-gray-700)] hover:bg-[var(--color-surface-alt)]'
                )}
              >
                {propertyTypeLabels[type]}
              </button>
            )
          })}
        </div>
      </FilterSection>

      {/* Quartos */}
      <FilterSection title="Quartos">
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3, 4].map((n) => (
            <button
              key={n}
              onClick={() => updateFilter('bedrooms', filters.bedrooms === n ? null : n)}
              className={cn(
                'w-10 h-10 rounded-lg font-sans text-sm font-medium transition-all cursor-pointer',
                filters.bedrooms === n
                  ? 'bg-[var(--color-black)] text-white'
                  : 'bg-[var(--color-surface)] text-[var(--color-gray-700)] hover:bg-[var(--color-surface-alt)]'
              )}
            >
              {n === 4 ? '4+' : n}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Banheiros */}
      <FilterSection title="Banheiros">
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              onClick={() => updateFilter('bathrooms', filters.bathrooms === n ? null : n)}
              className={cn(
                'w-10 h-10 rounded-lg font-sans text-sm font-medium transition-all cursor-pointer',
                filters.bathrooms === n
                  ? 'bg-[var(--color-black)] text-white'
                  : 'bg-[var(--color-surface)] text-[var(--color-gray-700)] hover:bg-[var(--color-surface-alt)]'
              )}
            >
              {n === 3 ? '3+' : n}
            </button>
          ))}
        </div>
      </FilterSection>

      {/* Vagas */}
      <FilterSection title="Vagas">
        <div className="flex flex-wrap gap-2">
          {[0, 1, 2, 3].map((n) => (
            <button
              key={n}
              onClick={() => updateFilter('parkingSpots', filters.parkingSpots === n ? null : n)}
              className={cn(
                'w-10 h-10 rounded-lg font-sans text-sm font-medium transition-all cursor-pointer',
                filters.parkingSpots === n
                  ? 'bg-[var(--color-black)] text-white'
                  : 'bg-[var(--color-surface)] text-[var(--color-gray-700)] hover:bg-[var(--color-surface-alt)]'
              )}
            >
              {n === 3 ? '3+' : n}
            </button>
          ))}
        </div>
      </FilterSection>

      <div className="pt-6 border-t border-[var(--color-gray-100)]">
        <Button 
          variant="accent" 
          fullWidth 
          className="h-14 rounded-xl shadow-lg"
          onClick={onApply}
        >
          Ver {totalResults} imóveis
        </Button>
      </div>
    </aside>
  )
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="font-sans text-sm font-semibold text-[var(--color-gray-700)]">{title}</h3>
      {children}
    </div>
  )
}
