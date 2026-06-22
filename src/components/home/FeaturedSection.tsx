'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { ArrowRight } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

const features = [
  {
    title: 'Cocktail Bar',
    subtitle: '50+ ricette esclusive',
    description: 'Dal classico Negroni ai nostri Signature cocktail creati dallo chef bartender. Ogni drink è un\'opera d\'arte.',
    gradient: 'from-amber-900/40 to-transparent',
    accent: '#C9A84C',
    emoji: '🍸',
    href: 'menu',
    stat: '50+',
    statLabel: 'cocktails',
  },
  {
    title: 'Pizzeria',
    subtitle: 'Impasto a lunga lievitazione',
    description: 'Farina di grano antico, pomodoro San Marzano DOP, Fior di Latte fresco. La pizza come tradizione vuole.',
    gradient: 'from-red-900/30 to-transparent',
    accent: '#E86A40',
    emoji: '🍕',
    href: 'menu',
    stat: '15+',
    statLabel: 'pizze',
  },
  {
    title: 'Ristorante',
    subtitle: 'Cucina mediterranea',
    description: 'Pesce fresco del giorno, carni selezionate, pasta fatta in casa. L\'autentica cucina italiana reinterpretata.',
    gradient: 'from-blue-900/30 to-transparent',
    accent: '#6B9FCC',
    emoji: '🐟',
    href: 'menu',
    stat: '40+',
    statLabel: 'piatti',
  },
]

export default function FeaturedSection() {
  const locale = useLocale()

  return (
    <section className="py-28 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(201,168,76,0.04)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <ScrollReveal className="text-center mb-16">
          <div className="gold-divider mb-6" />
          <h2 className="font-display text-4xl lg:text-5xl font-light text-gold-gradient tracking-wide mb-4">
            Un Mondo di Sapori
          </h2>
          <p className="font-serif text-lg text-center max-w-xl mx-auto font-light" style={{ color: 'var(--text-muted)' }}>
            Tre anime, un'unica passione per l'eccellenza
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <ScrollReveal key={f.title} delay={i * 0.12}>
              <motion.div
                whileHover={{ scale: 1.02, y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="group relative rounded-3xl overflow-hidden glass gold-border h-full"
              >
                {/* Gradient bg */}
                <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative p-8 flex flex-col gap-5 h-full min-h-[320px]">
                  {/* Emoji */}
                  <span className="text-5xl">{f.emoji}</span>

                  {/* Stat */}
                  <div>
                    <p className="font-display text-4xl font-bold" style={{ color: f.accent }}>
                      {f.stat}
                    </p>
                    <p className="text-[10px] tracking-widest uppercase font-sans" style={{ color: 'var(--text-muted)' }}>
                      {f.statLabel}
                    </p>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-display text-2xl font-semibold tracking-wide mb-1" style={{ color: 'var(--text)' }}>
                      {f.title}
                    </h3>
                    <p className="text-xs tracking-widest uppercase font-sans mb-3" style={{ color: f.accent }}>
                      {f.subtitle}
                    </p>
                    <p className="text-sm font-sans leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      {f.description}
                    </p>
                  </div>

                  <Link
                    href={`/${locale}/${f.href}`}
                    className="inline-flex items-center gap-2 text-[11px] tracking-widest uppercase font-sans transition-colors hover:text-gold-300"
                    style={{ color: f.accent }}
                  >
                    Scopri
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
