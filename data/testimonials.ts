/**
 * @file testimonials.ts
 * @description Dados mock de depoimentos para a ImobPremium
 * @module data
 */

import type { Testimonial } from '@/types/api'

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Ana Paula Mendes',
    role: 'Empresária',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    quote: 'A ImobPremium transformou a busca pelo nosso apartamento em uma experiência prazerosa. O atendimento personalizado e o conhecimento profundo do mercado fizeram toda a diferença.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Carlos Eduardo Silva',
    role: 'Médico Cirurgião',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
    quote: 'Procurava uma cobertura nos Jardins há meses sem sucesso. Em duas semanas com a ImobPremium, encontrei exatamente o que queria. Profissionalismo impecável.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Beatriz Campos',
    role: 'Advogada',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    quote: 'O processo de compra foi simplificado e transparente. A assessoria jurídica incluída e o acompanhamento pós-venda são diferenciais que realmente importam.',
    rating: 5,
  },
  {
    id: '4',
    name: 'Roberto Nakamura',
    role: 'CEO de Tech',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face',
    quote: 'Investi em três imóveis através da ImobPremium nos últimos dois anos. A curadoria dos imóveis e a visão de mercado da equipe garantem investimentos seguros.',
    rating: 5,
  },
  {
    id: '5',
    name: 'Fernanda Oliveira',
    role: 'Arquiteta',
    photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face',
    quote: 'Como arquiteta, sou exigente com qualidade de acabamento e projeto. A seleção da ImobPremium é impecável — cada imóvel do portfólio é realmente premium.',
    rating: 5,
  },
]
