/**
 * @file constants.ts
 * @description Constantes globais da plataforma ImobPremium
 * @module lib
 */

export const SITE_NAME = 'ImobPremium'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://imobpremium.com.br'
export const SITE_DESCRIPTION = 'Encontre apartamentos, casas e coberturas de alto padrão em São Paulo. Mais de 1.200 imóveis curados nos melhores bairros.'

export const COMPANY = {
  name: 'ImobPremium',
  tagline: 'Imóveis de Alto Padrão',
  creci: 'CRECI SP: 45.678-J',
  phone: '(11) 3456-7890',
  whatsapp: '5511934567890',
  email: 'contato@imobpremium.com.br',
  address: {
    street: 'Av. Brigadeiro Faria Lima, 3477',
    complement: '18º andar',
    neighborhood: 'Itaim Bibi',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '04538-133',
  },
  hours: 'Seg a Sex: 9h–18h | Sáb: 9h–13h',
  social: {
    instagram: 'https://instagram.com/imobpremium',
    linkedin: 'https://linkedin.com/company/imobpremium',
    youtube: 'https://youtube.com/@imobpremium',
  },
} as const

export const NAV_LINKS = [
  { label: 'Imóveis', href: '/imoveis' },
  { label: 'Lançamentos', href: '/imoveis?tipo=lancamento' },
  { label: 'Corretores', href: '/corretores' },
  { label: 'Blog', href: '/blog' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Contato', href: '/contato' },
] as const

export const STATS = [
  { value: 1200, suffix: '+', label: 'Imóveis disponíveis' },
  { value: 15, suffix: '+', label: 'Anos no mercado' },
  { value: 98, suffix: '%', label: 'Clientes satisfeitos' },
  { value: 3500, suffix: '+', label: 'Negócios realizados' },
] as const

export const PROPERTY_CATEGORIES = [
  { label: 'Apartamentos', slug: 'apartamentos', count: 487 },
  { label: 'Casas e Sobrados', slug: 'casas', count: 234 },
  { label: 'Coberturas', slug: 'coberturas', count: 89 },
  { label: 'Terrenos', slug: 'terrenos', count: 156 },
  { label: 'Comerciais', slug: 'comerciais', count: 112 },
  { label: 'Lançamentos', slug: 'lancamentos', count: 67 },
] as const

export const HOW_IT_WORKS_STEPS = [
  {
    number: '01',
    title: 'Descubra',
    description: 'Busque entre 1.200+ imóveis curados nos melhores bairros de São Paulo. Filtre por tipo, preço, localização e muito mais.',
  },
  {
    number: '02',
    title: 'Conecte-se',
    description: 'Fale com um corretor especializado em até 24h. Nossa equipe entende suas necessidades e apresenta as melhores opções.',
  },
  {
    number: '03',
    title: 'Realize',
    description: 'Processo simplificado com assinatura digital, assessoria jurídica e financeira completa. A chave do seu novo lar na sua mão.',
  },
] as const

export const AMENITIES_LIST = [
  'Piscina', 'Academia', 'Churrasqueira', 'Playground',
  'Salão de Festas', 'Sauna', 'Quadra', 'Pet Place',
  'Coworking', 'Brinquedoteca', 'Spa', 'Cinema',
  'Rooftop', 'Concierge', 'Lavanderia', 'Bicicletário',
] as const
