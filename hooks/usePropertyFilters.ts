/**
 * @file usePropertyFilters.ts
 * @description Hook para gerenciamento de filtros de imóveis
 * @module hooks
 */

'use client'

import { useState, useMemo, useCallback, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useDebounce } from './useDebounce'
import type { Property, PropertyFiltersState, BusinessType, PropertyType } from '@/types/property'

const initialFilters: PropertyFiltersState = {
  search: '',
  businessType: 'all',
  propertyType: [],
  priceRange: [0, 20000000],
  areaRange: [0, 1000],
  bedrooms: null,
  bathrooms: null,
  parkingSpots: null,
  amenities: [],
  sortBy: 'featured',
}

/**
 * Gerencia estado de filtros e aplica filtragem em lista de imóveis
 */
export function usePropertyFilters(properties: Property[]) {
  const searchParams = useSearchParams()

  const [filters, setFilters] = useState<PropertyFiltersState>(() => {
    // Inicialização direta caso SearchParams já estejam disponíveis
    const q = searchParams.get('q') || ''
    const t = searchParams.get('type')
    const p = searchParams.get('price')

    const init = { ...initialFilters }
    if (q) init.search = q
    if (t && t !== 'all') init.propertyType = [t as PropertyType]
    if (p) {
      const parts = p.split('-')
      if (parts.length === 2) {
        init.priceRange = [Number(parts[0]), Number(parts[1])]
      } else if (p.endsWith('+')) {
        init.priceRange = [Number(p.replace('+', '')), 50000000]
      }
    }
    return init
  })

  // Permite que navegadores mudem os filtros ao voltarem via history back/forward
  useEffect(() => {
    const q = searchParams.get('q') || ''
    const t = searchParams.get('type')
    const p = searchParams.get('price')

    setFilters(prev => {
      const init = { ...prev }
      if (q) init.search = q
      else init.search = ''
      
      if (t && t !== 'all') init.propertyType = [t as PropertyType]
      else init.propertyType = []

      if (p) {
        const parts = p.split('-')
        if (parts.length === 2) {
          init.priceRange = [Number(parts[0]), Number(parts[1])]
        } else if (p.endsWith('+')) {
          init.priceRange = [Number(p.replace('+', '')), 50000000]
        }
      } else {
        init.priceRange = [0, 20000000]
      }
      return init
    })
  }, [searchParams])

  const debouncedSearch = useDebounce(filters.search, 300)

  const updateFilter = useCallback(<K extends keyof PropertyFiltersState>(
    key: K,
    value: PropertyFiltersState[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }, [])

  const resetFilters = useCallback(() => {
    setFilters(initialFilters)
  }, [])

  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (filters.businessType !== 'all') count++
    if (filters.propertyType.length > 0) count++
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 20000000) count++
    if (filters.areaRange[0] > 0 || filters.areaRange[1] < 1000) count++
    if (filters.bedrooms !== null) count++
    if (filters.bathrooms !== null) count++
    if (filters.parkingSpots !== null) count++
    if (filters.amenities.length > 0) count++
    return count
  }, [filters])

  const filteredProperties = useMemo(() => {
    let result = [...properties]

    // Busca por texto
    if (debouncedSearch) {
      const search = debouncedSearch.toLowerCase()
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(search) ||
          p.address.neighborhood.toLowerCase().includes(search) ||
          p.address.city.toLowerCase().includes(search)
      )
    }

    // Tipo de negócio
    if (filters.businessType !== 'all') {
      result = result.filter((p) => p.businessType === filters.businessType)
    }

    // Tipo de imóvel
    if (filters.propertyType.length > 0) {
      result = result.filter((p) => filters.propertyType.includes(p.type))
    }

    // Faixa de preço
    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    )

    // Metragem
    result = result.filter(
      (p) => p.area.total >= filters.areaRange[0] && p.area.total <= filters.areaRange[1]
    )

    // Quartos
    if (filters.bedrooms !== null) {
      result = result.filter((p) =>
        filters.bedrooms === 4 ? p.rooms.bedrooms >= 4 : p.rooms.bedrooms === filters.bedrooms
      )
    }

    // Banheiros
    if (filters.bathrooms !== null) {
      result = result.filter((p) =>
        filters.bathrooms === 3 ? p.rooms.bathrooms >= 3 : p.rooms.bathrooms === filters.bathrooms
      )
    }

    // Vagas
    if (filters.parkingSpots !== null) {
      result = result.filter((p) =>
        filters.parkingSpots === 3 ? p.rooms.parkingSpots >= 3 : p.rooms.parkingSpots === filters.parkingSpots
      )
    }

    // Ordenação
    switch (filters.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'recent':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case 'featured':
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        break
    }

    return result
  }, [properties, debouncedSearch, filters])

  return {
    filters,
    updateFilter,
    resetFilters,
    filteredProperties,
    activeFiltersCount,
    totalResults: filteredProperties.length,
  }
}
