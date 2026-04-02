/**
 * @file blog.ts
 * @description Tipos para posts do blog ImobPremium
 * @module types
 */

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  coverImage: string
  category: BlogCategory
  author: {
    name: string
    avatar: string
    role: string
  }
  publishedAt: string
  readingTime: number
  tags: string[]
}

export type BlogCategory =
  | 'mercado'
  | 'investimento'
  | 'decoracao'
  | 'financiamento'
  | 'legislacao'
  | 'dicas'
