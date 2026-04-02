/**
 * @file sitemap.ts
 * @description Dynamic sitemap generation para SEO
 * @module app
 */

import { MetadataRoute } from 'next'
import { properties } from '@/data/properties'
import { blogPosts } from '@/data/blog-posts'

const BASE_URL = 'https://imobpremium.com.br'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${BASE_URL}/imoveis`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${BASE_URL}/corretores`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${BASE_URL}/sobre`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${BASE_URL}/contato`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
  ]

  const propertyPages = properties.map((p) => ({
    url: `${BASE_URL}/imoveis/${p.slug}`,
    lastModified: new Date(p.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const blogPages = blogPosts.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...propertyPages, ...blogPages]
}
