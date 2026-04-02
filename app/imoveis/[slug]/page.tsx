/**
 * @file page.tsx
 * @description Página de detalhes do imóvel com galeria, info e contato
 * @module app/imoveis/[slug]
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { properties } from '@/data/properties'
import { PropertyDetailContent } from './PropertyDetailContent'
import { generatePageMetadata } from '@/lib/seo'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const property = properties.find((p) => p.slug === slug)
  if (!property) return {}

  return generatePageMetadata({
    title: property.title,
    description: property.description.slice(0, 160),
    path: `/imoveis/${slug}`,
  })
}

export default async function PropertyDetailPage({ params }: Props) {
  const { slug } = await params
  const property = properties.find((p) => p.slug === slug)
  if (!property) notFound()

  return <PropertyDetailContent property={property} />
}
