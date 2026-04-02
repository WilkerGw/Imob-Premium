/**
 * @file property.ts
 * @description Tipos centrais para imóveis da plataforma ImobPremium
 * @module types
 */

export enum PropertyType {
  APARTMENT = 'apartment',
  HOUSE = 'house',
  PENTHOUSE = 'penthouse',
  LAND = 'land',
  COMMERCIAL = 'commercial',
  LAUNCH = 'launch',
}

export enum PropertyStatus {
  AVAILABLE = 'available',
  SOLD = 'sold',
  RENTED = 'rented',
  RESERVED = 'reserved',
}

export enum BusinessType {
  SALE = 'sale',
  RENT = 'rent',
  LAUNCH = 'launch',
}

export interface Address {
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
  latitude: number
  longitude: number
}

export interface PropertyImage {
  id: string
  url: string
  alt: string
  width: number
  height: number
  isPrimary: boolean
}

export interface Property {
  id: string
  slug: string
  title: string
  description: string
  type: PropertyType
  status: PropertyStatus
  businessType: BusinessType
  price: number
  condoFee?: number
  iptu?: number
  area: {
    total: number
    useful: number
  }
  rooms: {
    bedrooms: number
    bathrooms: number
    suites: number
    parkingSpots: number
  }
  floor?: number
  yearBuilt?: number
  address: Address
  images: PropertyImage[]
  amenities: string[]
  condoAmenities: string[]
  agentId: string
  createdAt: string
  updatedAt: string
  featured: boolean
  isNew: boolean
  isExclusive: boolean
  views: number
  badge?: 'NOVO' | 'EXCLUSIVO' | 'ÚLTIMAS UNIDADES' | 'DESTAQUE'
}

export interface PropertyFiltersState {
  search: string
  businessType: BusinessType | 'all'
  propertyType: PropertyType[]
  priceRange: [number, number]
  areaRange: [number, number]
  bedrooms: number | null
  bathrooms: number | null
  parkingSpots: number | null
  amenities: string[]
  sortBy: 'recent' | 'price-asc' | 'price-desc' | 'featured'
}

export const propertyTypeLabels: Record<PropertyType, string> = {
  [PropertyType.APARTMENT]: 'Apartamento',
  [PropertyType.HOUSE]: 'Casa',
  [PropertyType.PENTHOUSE]: 'Cobertura',
  [PropertyType.LAND]: 'Terreno',
  [PropertyType.COMMERCIAL]: 'Comercial',
  [PropertyType.LAUNCH]: 'Lançamento',
}

export const businessTypeLabels: Record<BusinessType, string> = {
  [BusinessType.SALE]: 'Venda',
  [BusinessType.RENT]: 'Aluguel',
  [BusinessType.LAUNCH]: 'Lançamento',
}
