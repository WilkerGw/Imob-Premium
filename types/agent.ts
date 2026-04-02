/**
 * @file agent.ts
 * @description Tipos para corretores da plataforma ImobPremium
 * @module types
 */

export interface Agent {
  id: string
  name: string
  slug: string
  photo: string
  creci: string
  specialty: string
  rating: number
  totalSales: number
  totalProperties: number
  phone: string
  whatsapp: string
  email: string
  bio: string
  featured: boolean
}
