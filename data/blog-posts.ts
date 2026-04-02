/**
 * @file blog-posts.ts
 * @description Dados mock de posts do blog ImobPremium
 * @module data
 */

import type { BlogPost } from '@/types/blog'

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'tendencias-mercado-imobiliario-2026',
    title: 'Tendências do Mercado Imobiliário para 2026',
    excerpt: 'Descubra as principais tendências que vão moldar o mercado imobiliário de luxo em São Paulo nos próximos meses.',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=500&fit=crop',
    category: 'mercado',
    author: { name: 'Mariana Almeida', role: 'Especialista em Mercado', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=50&h=50&fit=crop&crop=face' },
    publishedAt: '2026-03-25',
    readingTime: 7,
    tags: ['mercado', 'tendências', 'investimento'],
  },
  {
    id: '2',
    slug: 'guia-investimento-imoveis-alto-padrao',
    title: 'Guia Completo: Investir em Imóveis de Alto Padrão',
    excerpt: 'Tudo o que você precisa saber antes de investir em imóveis premium. Retorno, riscos e estratégias.',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop',
    category: 'investimento',
    author: { name: 'Ricardo Ferreira', role: 'Consultor de Investimentos', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face' },
    publishedAt: '2026-03-18',
    readingTime: 12,
    tags: ['investimento', 'alto padrão', 'guia'],
  },
  {
    id: '3',
    slug: 'decoracao-minimalista-apartamentos',
    title: 'Decoração Minimalista para Apartamentos de Luxo',
    excerpt: 'Como criar ambientes sofisticados e acolhedores usando o minimalismo como filosofia de design.',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&h=500&fit=crop',
    category: 'decoracao',
    author: { name: 'Carolina Santos', role: 'Arquiteta e Designer', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=50&h=50&fit=crop&crop=face' },
    publishedAt: '2026-03-10',
    readingTime: 5,
    tags: ['decoração', 'minimalismo', 'design'],
  },
  {
    id: '4',
    slug: 'financiamento-imovel-alto-padrao',
    title: 'Financiamento de Imóveis: Taxas e Condições em 2026',
    excerpt: 'Comparativo completo das taxas dos principais bancos para financiamento de imóveis de alto padrão.',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop',
    category: 'financiamento',
    author: { name: 'Fernando Costa', role: 'Especialista Financeiro', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face' },
    publishedAt: '2026-03-05',
    readingTime: 9,
    tags: ['financiamento', 'taxas', 'bancos'],
  },
]
