/**
 * @file ContactForm.tsx
 * @description Formulário de contato com validação Zod + react-hook-form
 * @module app/contato
 */

'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { contactFormSchema, type ContactFormValues } from '@/lib/validations'
import { Button } from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { Send, CheckCircle } from 'lucide-react'

const subjectOptions = [
  { label: 'Quero comprar', value: 'compra' },
  { label: 'Quero vender', value: 'venda' },
  { label: 'Quero alugar', value: 'aluguel' },
  { label: 'Parceria', value: 'parceria' },
  { label: 'Outro', value: 'outro' },
]

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormValues) => {
    // Simular envio
    await new Promise((r) => setTimeout(r, 1500))
    setSubmitted(true)
    reset()
    setTimeout(() => setSubmitted(false), 5000)
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center py-12 text-center">
        <CheckCircle className="w-16 h-16 text-[var(--color-success)] mb-4" />
        <h3 className="font-serif text-2xl font-bold text-[var(--color-black)]">Mensagem enviada!</h3>
        <p className="mt-2 font-sans text-[var(--color-gray-500)]">
          Entraremos em contato em até 24 horas.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label htmlFor="name" className="font-sans text-sm font-medium text-[var(--color-gray-700)] mb-1.5 block">Nome *</label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className={`w-full px-5 py-4 rounded-md border font-sans text-sm outline-none transition-colors ${
              errors.name
                ? 'border-red-500 focus:border-red-500'
                : 'border-[var(--color-gray-100)] focus:border-[var(--color-accent)]'
            }`}
            placeholder="Seu nome completo"
          />
          {errors.name && <p className="mt-1 font-sans text-xs text-[var(--color-error)]">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="font-sans text-sm font-medium text-[var(--color-gray-700)] mb-1.5 block">E-mail *</label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className={`w-full px-5 py-4 rounded-md border font-sans text-sm outline-none transition-colors ${
              errors.email
                ? 'border-red-500 focus:border-red-500'
                : 'border-[var(--color-gray-100)] focus:border-[var(--color-accent)]'
            }`}
            placeholder="seu@email.com"
          />
          {errors.email && <p className="mt-1 font-sans text-xs text-[var(--color-error)]">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label htmlFor="phone" className="font-sans text-sm font-medium text-[var(--color-gray-700)] mb-1.5 block">Telefone *</label>
          <input
            id="phone"
            type="tel"
            {...register('phone')}
            className={`w-full px-5 py-4 rounded-md border font-sans text-sm outline-none transition-colors ${
              errors.phone
                ? 'border-red-500 focus:border-red-500'
                : 'border-[var(--color-gray-100)] focus:border-[var(--color-accent)]'
            }`}
            placeholder="(11) 99999-9999"
          />
          {errors.phone && <p className="mt-1 font-sans text-xs text-[var(--color-error)]">{errors.phone.message}</p>}
        </div>

        <div className="flex flex-col">
          <label htmlFor="subject" className="font-sans text-sm font-medium text-gray-700 mb-1.5 block">Assunto</label>
          <Controller
            name="subject"
            control={control}
            render={({ field }) => (
              <Select
                id="subject"
                options={subjectOptions}
                value={field.value}
                onChange={field.onChange}
                placeholder="Selecione o assunto"
                variant="outline"
                className="h-[52px]"
                error={errors.subject?.message}
              />
            )}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="font-sans text-sm font-medium text-[var(--color-gray-700)] mb-1.5 block">Mensagem *</label>
        <textarea
          id="message"
          rows={5}
          {...register('message')}
          className={`w-full px-5 py-4 rounded-md border font-sans text-sm outline-none transition-colors resize-none ${
            errors.message
              ? 'border-red-500 focus:border-red-500'
              : 'border-[var(--color-gray-100)] focus:border-[var(--color-accent)]'
          }`}
          placeholder="Como podemos ajudar?"
        />
        {errors.message && <p className="mt-1 font-sans text-xs text-[var(--color-error)]">{errors.message.message}</p>}
      </div>

      <div className="flex justify-end pt-2">
        <Button type="submit" variant="accent" size="lg" isLoading={isSubmitting} className="w-full md:w-fit px-10">
          <Send className="w-4 h-4 ml-[-0.25rem] mr-2" />
          Enviar mensagem
        </Button>
      </div>
    </form>
  )
}
