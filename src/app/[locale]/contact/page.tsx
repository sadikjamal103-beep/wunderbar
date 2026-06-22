'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

export default function ContactPage() {
  const t = useTranslations('contact')

  const contactItems = [
    {
      icon: MapPin,
      label: t('address'),
      value: 'Via Roma 1, 39100 Bolzano BZ',
      href: 'https://maps.app.goo.gl/PSSB4ycYm1rUsEJG7',
    },
    {
      icon: Phone,
      label: t('phone'),
      value: '+39 0471 000 000',
      href: 'tel:+390471000000',
    },
    {
      icon: Mail,
      label: t('email'),
      value: 'info@wunderbarweb.it',
      href: 'mailto:info@wunderbarweb.it',
    },
  ]

  return (
    <div className="min-h-screen pt-28 pb-24">
      {/* Header */}
      <div className="relative py-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,76,0.07)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <ScrollReveal>
            <div className="gold-divider mb-6" />
            <h1 className="font-display text-5xl lg:text-7xl font-light text-gold-gradient tracking-wide mb-4">
              {t('title')}
            </h1>
          </ScrollReveal>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12">

          {/* Left: Info */}
          <div className="space-y-8">
            {contactItems.map((item, i) => (
              <ScrollReveal key={item.label} delay={i * 0.1}>
                <motion.a
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex gap-5 p-6 glass gold-border rounded-2xl group hover:border-gold-400/50 transition-all"
                  whileHover={{ x: 4 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center shrink-0 group-hover:border-gold-400/40 transition-colors">
                    <item.icon size={20} className="text-gold-400" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.25em] uppercase font-sans text-gold-500 mb-1">{item.label}</p>
                    <p className="font-sans text-sm group-hover:text-gold-300 transition-colors" style={{ color: 'var(--text)' }}>
                      {item.value}
                    </p>
                  </div>
                </motion.a>
              </ScrollReveal>
            ))}

            {/* WhatsApp */}
            <ScrollReveal delay={0.3}>
              <motion.a
                href="https://wa.me/390000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-5 p-6 glass border border-green-600/30 rounded-2xl group hover:border-green-500/60 transition-all"
                whileHover={{ x: 4 }}
              >
                <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" className="text-green-400">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.25em] uppercase font-sans text-green-500 mb-1">{t('whatsapp')}</p>
                  <p className="font-sans text-sm group-hover:text-green-300 transition-colors" style={{ color: 'var(--text)' }}>
                    Scrivici su WhatsApp
                  </p>
                </div>
              </motion.a>
            </ScrollReveal>

            {/* Social */}
            <ScrollReveal delay={0.4}>
              <div className="p-6 glass gold-border rounded-2xl">
                <p className="text-[10px] tracking-[0.25em] uppercase font-sans text-gold-500 mb-5">{t('social')}</p>
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
                      className="flex items-center gap-2 px-4 py-2.5 border border-gold-500/20 rounded-lg text-xs tracking-widest uppercase font-sans text-gold-500 hover:border-gold-400 hover:text-gold-300 transition-all"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      <Icon size={14} />
                      {label}
                    </motion.a>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right: Map */}
          <ScrollReveal delay={0.15}>
            <div className="rounded-2xl overflow-hidden gold-border h-full min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2774.0!2d11.35!3d46.49!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDbCsDI5JzI0LjAiTiAxMcKwMjEnMDAuMCJF!5e0!3m2!1sit!2sit!4v1000000000000!5m2!1sit!2sit"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(92%) hue-rotate(180deg) saturate(0.4) brightness(0.9)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="WUNDERBAR Location"
              />
            </div>
          </ScrollReveal>
        </div>

        {/* Opening Hours */}
        <ScrollReveal className="mt-16">
          <div className="glass gold-border rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <Clock size={18} className="text-gold-400" />
              <h2 className="font-display text-2xl text-gold-gradient">{t('title')}</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { period: 'Lun – Ven', hours: '12:00–14:30 / 18:00–01:00' },
                { period: 'Sabato',    hours: '12:00–15:00 / 18:00–02:00' },
                { period: 'Domenica', hours: '18:00–01:00' },
              ].map((d) => (
                <div key={d.period} className="p-4 bg-white/[0.03] rounded-xl border border-gold-500/10">
                  <p className="text-[10px] tracking-widest uppercase font-sans text-gold-500 mb-1.5">{d.period}</p>
                  <p className="text-sm font-sans" style={{ color: 'var(--text)' }}>{d.hours}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
