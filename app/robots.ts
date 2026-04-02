/**
 * @file robots.ts
 * @description Robots.txt config para SEO
 * @module app
 */

import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: 'https://imobpremium.com.br/sitemap.xml',
  }
}
