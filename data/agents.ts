/**
 * @file agents.ts
 * @description Dados mock de corretores para a ImobPremium
 * @module data
 */

import type { Agent } from '@/types/agent'

export const agents: Agent[] = [
  {
    id: '1',
    name: 'Mariana Almeida',
    slug: 'mariana-almeida',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
    creci: '145.678',
    specialty: 'Alto Padrão',
    rating: 4.9,
    totalSales: 234,
    totalProperties: 48,
    phone: '(11) 98765-4321',
    whatsapp: '5511987654321',
    email: 'mariana@imobpremium.com.br',
    bio: 'Especialista em imóveis de alto padrão nos Jardins e Vila Nova Conceição. Mais de 12 anos de experiência e foco em atendimento personalizado.',
    featured: true,
  },
  {
    id: '2',
    name: 'Ricardo Ferreira',
    slug: 'ricardo-ferreira',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    creci: '156.789',
    specialty: 'Lançamentos',
    rating: 4.8,
    totalSales: 187,
    totalProperties: 35,
    phone: '(11) 97654-3210',
    whatsapp: '5511976543210',
    email: 'ricardo@imobpremium.com.br',
    bio: 'Consultor imobiliário focado em lançamentos e empreendimentos de alto padrão. Parceiro das principais incorporadoras de São Paulo.',
    featured: true,
  },
  {
    id: '3',
    name: 'Carolina Santos',
    slug: 'carolina-santos',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
    creci: '167.890',
    specialty: 'Investimento',
    rating: 4.9,
    totalSales: 156,
    totalProperties: 42,
    phone: '(11) 96543-2109',
    whatsapp: '5511965432109',
    email: 'carolina@imobpremium.com.br',
    bio: 'Especialista em investimentos imobiliários e imóveis para renda. Formada em economia com MBA em mercado imobiliário.',
    featured: true,
  },
  {
    id: '4',
    name: 'Fernando Costa',
    slug: 'fernando-costa',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    creci: '178.901',
    specialty: 'Terrenos & Casas',
    rating: 4.7,
    totalSales: 198,
    totalProperties: 29,
    phone: '(11) 95432-1098',
    whatsapp: '5511954321098',
    email: 'fernando@imobpremium.com.br',
    bio: 'Mais de 15 anos de experiência em terrenos e casas em condomínios fechados. Conhecedor profundo da região da Granja Viana e Alphaville.',
    featured: true,
  },
]
