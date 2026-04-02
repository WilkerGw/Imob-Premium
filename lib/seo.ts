/**
 * @file seo.ts
 * @description Helpers de metadata SEO para páginas da ImobPremium
 * @module lib
 */

import type { Metadata } from 'next'
import { SITE_NAME, SITE_URL } from './constants'

interface SeoParams {
  title: string
  description: string
  path?: string
  image?: string
  type?: 'website' | 'article'
}

/**
 * Gera metadata SEO para uma página
 * @param params - Parâmetros de SEO da página
 * @returns Objeto Metadata do Next.js
 */
export const generatePageMetadata = ({
  title,
  description,
  path = '/',
  image = '/og-image.jpg',
  type = 'website',
}: SeoParams): Metadata => {
  const url = `${SITE_URL}${path}`

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      type,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [image],
    },
  }
}

/**
 * Gera JSON-LD para Organization (usado na Home)
 */
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description: 'Imobiliária de alto padrão em São Paulo',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Brigadeiro Faria Lima, 3477',
    addressLocality: 'São Paulo',
    addressRegion: 'SP',
    postalCode: '04538-133',
    addressCountry: 'BR',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+55-11-3456-7890',
    contactType: 'sales',
    availableLanguage: 'Portuguese',
  },
}
