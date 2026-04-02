/**
 * @file Footer.tsx
 * @description Footer premium com 4 colunas e fundo escuro
 * @module components/layout
 */

import Link from 'next/link'
import { Globe, Briefcase, Play, MessageCircle, MapPin, Phone, Mail, Clock } from 'lucide-react'
import { COMPANY } from '@/lib/constants'

/**
 * Footer completo com branding, links e informações de contato
 */
export function Footer() {
  return (
    <footer className="bg-[var(--color-black)] text-white" role="contentinfo">
      <div className="container-premium py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="inline-block" aria-label="ImobPremium - Home">
              <span className="font-serif text-2xl font-bold">
                Imob<span className="text-[var(--color-accent)]">Premium</span>
              </span>
            </Link>
            <p className="font-sans text-sm text-zinc-400 leading-relaxed max-w-xs">
              Sua imobiliária de alto padrão em São Paulo. Curadoria de imóveis premium
              nos melhores bairros da cidade.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Globe, href: COMPANY.social.instagram, label: 'Instagram' },
                { icon: Briefcase, href: COMPANY.social.linkedin, label: 'LinkedIn' },
                { icon: Play, href: COMPANY.social.youtube, label: 'YouTube' },
                { icon: MessageCircle, href: `https://wa.me/${COMPANY.whatsapp}`, label: 'WhatsApp' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-zinc-700 text-zinc-400 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <p className="font-mono text-xs text-zinc-500">{COMPANY.creci}</p>
          </div>

          {/* Imóveis */}
          <div>
            <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-white mb-6">
              Imóveis
            </h3>
            <ul className="space-y-3">
              {['Venda', 'Aluguel', 'Lançamentos', 'Comercial', 'Alto Padrão', 'Por Bairro'].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href="/imoveis"
                      className="font-sans text-sm text-zinc-400 hover:text-[var(--color-accent)] transition-colors duration-300 inline-flex items-center gap-2"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-white mb-6">
              Empresa
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Sobre nós', href: '/sobre' },
                { label: 'Corretores', href: '/corretores' },
                { label: 'Blog', href: '/blog' },
                { label: 'Parcerias', href: '/contato' },
                { label: 'Trabalhe conosco', href: '/contato' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="font-sans text-sm text-zinc-400 hover:text-[var(--color-accent)] transition-colors duration-300"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-white mb-6">
              Contato
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[var(--color-accent)] mt-0.5 shrink-0" />
                <span className="font-sans text-sm text-zinc-400 leading-relaxed">
                  {COMPANY.address.street}, {COMPANY.address.complement}<br />
                  {COMPANY.address.neighborhood} — {COMPANY.address.city}/{COMPANY.address.state}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
                <a href={`tel:${COMPANY.phone}`} className="font-sans text-sm text-zinc-400 hover:text-white transition-colors">
                  {COMPANY.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
                <a href={`mailto:${COMPANY.email}`} className="font-sans text-sm text-zinc-400 hover:text-white transition-colors">
                  {COMPANY.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[var(--color-accent)] shrink-0" />
                <span className="font-sans text-sm text-zinc-400">{COMPANY.hours}</span>
              </li>
            </ul>
            <a
              href={`https://wa.me/${COMPANY.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[var(--color-accent)] text-white font-sans text-sm font-semibold hover:bg-[var(--color-accent-dark)] transition-colors duration-300"
            >
              <MessageCircle className="w-4 h-4" />
              Falar no WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-zinc-500">
            © {new Date().getFullYear()} {COMPANY.name}. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            {['Política de Privacidade', 'Termos de Uso', 'LGPD'].map((item) => (
              <Link
                key={item}
                href="/contato"
                className="font-sans text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
              >
                {item}
              </Link>
            ))}
            <span className="font-mono text-xs text-zinc-600">{COMPANY.creci}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
