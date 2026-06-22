'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import ScrollReveal from '@/components/ui/ScrollReveal'

const stats = [
  { value: 6,    suffix: '+', label: 'Anni di Eccellenza',    labelEn: 'Years of Excellence'  },
  { value: 50,   suffix: '+', label: 'Cocktail Esclusivi',    labelEn: 'Exclusive Cocktails'   },
  { value: 120,  suffix: '+', label: 'Ricette Artigianali',   labelEn: 'Artisan Recipes'        },
  { value: 5000, suffix: '+', label: 'Ospiti Soddisfatti',    labelEn: 'Happy Guests'          },
]

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const duration = 1800
    const start = performance.now()
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, value])

  return (
    <span ref={ref} className="font-display text-5xl lg:text-6xl font-bold text-gold-gradient tabular-nums">
      {display.toLocaleString()}{suffix}
    </span>
  )
}

export default function StatsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(201,168,76,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <ScrollReveal className="text-center mb-16">
          <div className="gold-divider mb-6" />
          <h2 className="font-display text-4xl lg:text-5xl font-light text-gold-gradient tracking-wide">
            Il Nostro Impegno
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.1} className="text-center">
              <div className="glass rounded-2xl p-8 gold-border h-full flex flex-col items-center justify-center gap-3">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                <p className="text-[10px] tracking-[0.25em] uppercase font-sans" style={{ color: 'var(--text-muted)' }}>
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
