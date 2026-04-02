/**
 * @file utils.ts
 * @description Funções utilitárias da plataforma ImobPremium
 * @module lib
 */

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Mescla classes Tailwind com suporte a condicionais
 * Resolve conflitos de classes automaticamente
 */
export const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs))
}

/**
 * Formata valor monetário em Real brasileiro
 * @param value - Valor numérico
 * @returns String formatada (ex: "R$ 1.200.000")
 */
export const formatPrice = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  }).format(value)
}

/**
 * Formata área em metros quadrados
 * @param value - Metragem
 * @returns String formatada (ex: "120 m²")
 */
export const formatArea = (value: number): string => {
  return `${value} m²`
}

/**
 * Gera slug a partir de string
 * @param text - Texto para converter em slug
 * @returns Slug URL-friendly
 */
export const slugify = (text: string): string => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/**
 * Abrevia número grande (ex: 1200 → "1.2k")
 */
export const abbreviateNumber = (value: number): string => {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}k`
  return value.toString()
}
