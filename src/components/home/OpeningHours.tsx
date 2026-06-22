'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

const days = [
  { key: 'Lunedì',    hours: '12:00–14:30 / 18:00–01:00', closed: false },
  { key: 'Martedì',   hours: '12:00–14:30 / 18:00–01:00', closed: false },
  { key: 'Mercoledì', hours: '12:00–14:30 / 18:00–01:00', closed: false },
  { key: 'Giovedì',   hours: '12:00–14:30 / 18:00–01:00', closed: false },
  { key: 'Venerdì',   hours: '12:00–14:30 / 18:00–02:00', closed: false },
  { key: 'Sabato',    hours: '12:00–15:00 / 18:00–02:00', closed: false },
  { key: 'Domenica',  hours: '18:00–01:00',                closed: false },
]

function isCurrentDay(day: string) {
  const current = new Date().getDay()
  const map: Record<string, number> = {
    'Domenica': 0, 'Lunedì': 1, 'Martedì': 2, 'Mercoledì': 3,
    'Giovedì': 4, 'Venerdì': 5, 'Sabato': 6,
  }
  return map[day] === current
}

export default function OpeningHours() {
  const t = useTranslations('opening')

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(201,168,76,0.05)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text */}
          <ScrollReveal>
            <div className="gold-divider mb-6 mx-0" style={{ margin: '0 0 24px 0' }} />
            <h2 className="font-display text-4xl lg:text-5xl font-light text-gold-gradient tracking-wide mb-6">
              {t('title')}
            </h2>
            <p className="font-serif text-lg font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Siamo aperti quasi ogni giorno per pranzo e cena.
              La cucina rimane aperta fino a mezzanotte,
              il bar fino a tarda notte.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <Clock size={18} className="text-gold-500" />
              <p className="text-sm font-sans text-gold-400">
                {t('kitchen_close')} 23:30
              </p>
            </div>

            <motion.div
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 border border-gold-500/40 text-gold-400 text-[11px] tracking-[0.2em] uppercase font-sans cursor-pointer hover:border-gold-400 hover:bg-gold-500/8 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <a href="tel:+390471000000">Chiama per Prenotare</a>
            </motion.div>
          </ScrollReveal>

          {/* Right: Schedule */}
          <ScrollReveal delay={0.15}>
            <div className="glass rounded-2xl p-6 lg:p-8 gold-border">
              <ul className="divide-y divide-gold-500/10">
                {days.map((d, i) => {
                  const isCurrent = isCurrentDay(d.key)
                  return (
                    <motion.li
                      key={d.key}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      viewport={{ once: true }}
                      className={`flex items-center justify-between py-3.5 gap-4 ${
                        isCurrent ? 'text-gold-300' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {isCurrent && (
                          <span className="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0 animate-pulse" />
                        )}
                        <span className={`font-sans text-sm font-medium tracking-wide ${
                          isCurrent ? 'text-gold-300' : ''
                        }`} style={{ color: isCurrent ? undefined : 'var(--text)' }}>
                          {d.key}
                        </span>
                        {isCurrent && (
                          <span className="text-[9px] tracking-widest uppercase font-sans px-2 py-0.5 bg-gold-500/15 text-gold-500 rounded-full">
                            Oggi
                          </span>
                        )}
                      </div>
                      <span className="font-sans text-sm tabular-nums" style={{ color: isCurrent ? '#C9A84C' : 'var(--text-muted)' }}>
                        {d.closed ? t('closed') : d.hours}
                      </span>
                    </motion.li>
                  )
                })}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
