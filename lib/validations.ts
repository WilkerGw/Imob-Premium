/**
 * @file validations.ts
 * @description Schemas de validação Zod para formulários
 * @module lib
 */

import { z } from 'zod'

export const leadFormSchema = z.object({
  name: z.string().min(2, 'Nome deve ter ao menos 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  phone: z
    .string()
    .min(10, 'Telefone inválido')
    .regex(/^[\d\s()+-]+$/, 'Formato de telefone inválido'),
  message: z.string().min(10, 'Mensagem deve ter ao menos 10 caracteres'),
  propertyId: z.string().optional(),
})

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Nome deve ter ao menos 2 caracteres'),
  email: z.string().email('E-mail inválido'),
  phone: z
    .string()
    .min(10, 'Telefone inválido')
    .regex(/^[\d\s()+-]+$/, 'Formato de telefone inválido'),
  subject: z.string().min(3, 'Assunto deve ter ao menos 3 caracteres'),
  message: z.string().min(10, 'Mensagem deve ter ao menos 10 caracteres'),
})

export type LeadFormValues = z.infer<typeof leadFormSchema>
export type ContactFormValues = z.infer<typeof contactFormSchema>
