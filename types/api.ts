/**
 * @file api.ts
 * @description Tipos de response da API ImobPremium
 * @module types
 */

export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface LeadFormData {
  name: string
  email: string
  phone: string
  message: string
  propertyId?: string
  source: 'contact' | 'property' | 'whatsapp'
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  photo: string
  quote: string
  rating: number
}
