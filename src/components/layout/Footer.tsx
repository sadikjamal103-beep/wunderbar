'use client'

import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

export default function Footer() {
  const t = useTranslations()
  const locale = useLocale()
  const year = new Date().getFullYear()

  const navLinks = [
    { href: `/${locale}`,              label: t('nav.home') },
    { href: `/${locale}/menu`,         label: t('nav.menu') },
    { href: `/${locale}/gallery`,      label: t('nav.gallery') },
    { href: `/${locale}/about`,        label: t('nav.about') },
    { href: `/${locale}/contact`,      label: t('nav.contact') },
    { href: `/${locale}/reservation`,  label: t('nav.reserve') },
  ]

  return (
    <footer className="relative border-t border-gold-500/10 bg-dark-400 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-hero-gradient opacity-30 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <ScrollReveal className="lg:col-span-1">
            <div className="space-y-5">
              <div>
                <p className="font-display text-3xl font-bold tracking-[0.25em] text-gold-gradient">WUNDERBAR</p>
                <p className="text-[9px] tracking-[0.35em] uppercase font-sans mt-1" style={{ color: 'var(--text-muted)' }}>
                  Restaurant · Pizzeria · Cocktail Bar
                </p>
              </div>
              <p className="text-sm font-serif italic" style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
                {t('footer.tagline')}
              </p>
              {/* Socials */}
              <div className="flex gap-4">
                {[
                  { icon: Instagram, href: 'https://instagram.com/wunderbar', label: 'Instagram' },
                  { icon: Facebook,  href: 'https://facebook.com/wunderbar',  label: 'Facebook' },
                ].map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    whileHover={{ scale: 1.1, color: '#C9A84C' }}
                    className="w-9 h-9 border border-gold-500/20 rounded-full flex items-center justify-center transition-colors text-gold-600 hover:text-gold-400 hover:border-gold-400"
                  >
                    <Icon size={15} />
                  </motion.a>
                ))}
                {/* WhatsApp */}
                <motion.a
                  href="https://wa.me/390000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  whileHover={{ scale: 1.1 }}
                  className="w-9 h-9 border border-gold-500/20 rounded-full flex items-center justify-center transition-colors text-gold-600 hover:text-gold-400 hover:border-gold-400"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </motion.a>
              </div>
            </div>
          </ScrollReveal>

          {/* Navigation */}
          <ScrollReveal delay={0.1}>
            <div>
              <h4 className="text-[10px] tracking-[0.3em] uppercase font-sans text-gold-500 mb-6">Menu</h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm font-sans transition-colors duration-200 hover:text-gold-400"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Contact */}
          <ScrollReveal delay={0.2}>
            <div>
              <h4 className="text-[10px] tracking-[0.3em] uppercase font-sans text-gold-500 mb-6">
                {t('contact.title')}
              </h4>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <MapPin size={15} className="text-gold-600 mt-0.5 shrink-0" />
                  <span className="text-sm font-sans" style={{ color: 'var(--text-muted)' }}>
                    Via Roma 1<br />39100 Bolzano BZ, Italy
                  </span>
                </li>
                <li className="flex gap-3">
                  <Phone size={15} className="text-gold-600 mt-0.5 shrink-0" />
                  <a href="tel:+390471000000" className="text-sm font-sans hover:text-gold-400 transition-colors" style={{ color: 'var(--text-muted)' }}>
                    +39 0471 000 000
                  </a>
                </li>
                <li className="flex gap-3">
                  <Mail size={15} className="text-gold-600 mt-0.5 shrink-0" />
                  <a href="mailto:info@wunderbarweb.it" className="text-sm font-sans hover:text-gold-400 transition-colors" style={{ color: 'var(--text-muted)' }}>
                    info@wunderbarweb.it
                  </a>
                </li>
              </ul>
            </div>
          </ScrollReveal>

          {/* Opening Hours */}
          <ScrollReveal delay={0.3}>
            <div>
              <h4 className="text-[10px] tracking-[0.3em] uppercase font-sans text-gold-500 mb-6">
                {t('opening.title')}
              </h4>
              <ul className="space-y-2.5">
                {[
                  { day: t('opening.mon_fri'), hours: '12:00 – 14:30 / 18:00 – 01:00' },
                  { day: t('opening.sat'),     hours: '12:00 – 15:00 / 18:00 – 02:00' },
                  { day: t('opening.sun'),     hours: '18:00 – 01:00' },
                ].map(({ day, hours }) => (
                  <li key={day} className="flex gap-2">
                    <Clock size={13} className="text-gold-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[11px] tracking-wider uppercase font-sans text-gold-600">{day}</p>
                      <p className="text-sm font-sans" style={{ color: 'var(--text-muted)' }}>{hours}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>

        {/* Divider */}
        <div className="gold-divider mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-sans" style={{ color: 'var(--text-muted)' }}>
            © {year} WUNDERBAR. {t('footer.rights')}.
          </p>
          <div className="flex gap-6">
            <Link href={`/${locale}`} className="text-xs font-sans transition-colors hover:text-gold-400" style={{ color: 'var(--text-muted)' }}>
              {t('footer.privacy')}
            </Link>
            <Link href={`/${locale}`} className="text-xs font-sans transition-colors hover:text-gold-400" style={{ color: 'var(--text-muted)' }}>
              {t('footer.cookies')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
