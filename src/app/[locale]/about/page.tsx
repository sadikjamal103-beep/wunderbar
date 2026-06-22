'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Award, Heart, Leaf, Users } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

const team = [
  { name: 'Marco Rossi',      role: 'Executive Chef',      emoji: '👨‍🍳' },
  { name: 'Elena Bianchi',    role: 'Head Bartender',      emoji: '🍸' },
  { name: 'Luca Ferrari',     role: 'Sommelier',           emoji: '🍷' },
  { name: 'Anna Marini',      role: 'Restaurant Manager',  emoji: '✨' },
]

const values = [
  { icon: Heart,  title: 'Passione',    text: 'Ogni piatto viene preparato con amore e dedizione, come se fosse per un ospite di famiglia.' },
  { icon: Leaf,   title: 'Qualità',     text: 'Utilizziamo solo ingredienti freschi, selezionati da fornitori locali fidati.' },
  { icon: Award,  title: 'Eccellenza',  text: 'Ci impegniamo a superare le aspettative in ogni aspetto, dal piatto al servizio.' },
  { icon: Users,  title: 'Ospitalità', text: 'Il calore dell\'accoglienza italiana è la nostra firma più preziosa.' },
]

export default function AboutPage() {
  const t = useTranslations('about')

  return (
    <div className="min-h-screen pt-28 pb-24">
      {/* Hero */}
      <div className="relative py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,76,0.08)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <ScrollReveal>
            <div className="gold-divider mb-6" />
            <h1 className="font-display text-5xl lg:text-7xl font-light text-gold-gradient tracking-wide mb-4">
              {t('title')}
            </h1>
            <p className="font-serif text-lg lg:text-xl font-light" style={{ color: 'var(--text-muted)' }}>
              {t('subtitle')}
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Story */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="space-y-6">
                <div className="gold-divider mb-4 mx-0" style={{ margin: '0 0 16px 0' }} />
                <h2 className="font-display text-4xl lg:text-5xl font-light text-gold-gradient leading-tight">
                  {t('story_title')}
                </h2>
                <p className="font-serif text-lg font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {t('story_body')}
                </p>
                <p className="font-serif text-lg font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  Dalla piccola pizzeria di quartiere al raffinato ristorante e cocktail bar che siamo oggi,
                  il nostro percorso è stato guidato da un unico principio: la qualità senza compromessi.
                  Ogni anno aggiungiamo nuove esperienze al nostro menu, mantenendo sempre viva la tradizione.
                </p>
                <div className="pt-4 flex gap-10">
                  {[['2018', 'Fondazione'], ['6+', 'Anni'], ['★★★★★', 'Google']].map(([val, lbl]) => (
                    <div key={lbl}>
                      <p className="font-display text-3xl font-bold text-gold-gradient">{val}</p>
                      <p className="text-[10px] tracking-widest uppercase font-sans mt-1" style={{ color: 'var(--text-muted)' }}>{lbl}</p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="relative rounded-3xl overflow-hidden h-80 lg:h-[520px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80"
                  alt="Wunderbar interior"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-500/80 to-transparent" />
                <div className="absolute inset-0 ring-1 ring-gold-500/20 rounded-3xl" />

                {/* Floating quote */}
                <div className="absolute bottom-8 left-8 right-8 glass-dark rounded-xl p-5">
                  <p className="font-serif text-sm italic leading-relaxed text-gold-200">
                    "La cucina è arte, il cocktail è poesia — al Wunderbar, ogni sera è un capolavoro."
                  </p>
                  <p className="text-[10px] tracking-widest uppercase font-sans text-gold-500 mt-2">— Marco Rossi, Executive Chef</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-dark-400" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(201,168,76,0.04)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal className="text-center mb-14">
            <div className="gold-divider mb-6" />
            <h2 className="font-display text-4xl lg:text-5xl font-light text-gold-gradient tracking-wide">
              {t('philosophy_title')}
            </h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.1}>
                <div className="glass gold-border rounded-2xl p-7 h-full text-center group hover:border-gold-400/40 transition-colors">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center mx-auto mb-5"
                  >
                    <v.icon size={22} className="text-gold-400" />
                  </motion.div>
                  <h3 className="font-display text-xl font-medium text-gold-300 mb-3">{v.title}</h3>
                  <p className="text-sm font-sans leading-relaxed" style={{ color: 'var(--text-muted)' }}>{v.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <ScrollReveal className="text-center mb-14">
            <div className="gold-divider mb-6" />
            <h2 className="font-display text-4xl lg:text-5xl font-light text-gold-gradient tracking-wide">
              {t('team_title')}
            </h2>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="glass gold-border rounded-2xl p-8 text-center group"
                >
                  <div className="text-5xl mb-5 group-hover:animate-float inline-block">{member.emoji}</div>
                  <h3 className="font-display text-lg font-medium mb-1" style={{ color: 'var(--text)' }}>{member.name}</h3>
                  <p className="text-[11px] tracking-widest uppercase font-sans text-gold-500">{member.role}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
