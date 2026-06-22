'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

const testimonials = [
  {
    id: '1',
    name: 'Marco Brunetti',
    text: 'Un\'esperienza indimenticabile. I cocktail signature di Wunderbar sono tra i migliori che abbia mai assaggiato. Ambiente elegante, servizio impeccabile.',
    rating: 5,
    date: '2024-11',
    city: 'Milano',
  },
  {
    id: '2',
    name: 'Sarah M.',
    text: 'The pizza here is absolutely divine. The truffle and burrata combination is a masterpiece. We visit every time we\'re in the area.',
    rating: 5,
    date: '2024-10',
    city: 'London',
  },
  {
    id: '3',
    name: 'Klaus Weber',
    text: 'Ausgezeichnete Qualität bei Speisen und Getränken. Das Personal ist sehr freundlich und aufmerksam. Die Atmosphäre ist einzigartig.',
    rating: 5,
    date: '2024-10',
    city: 'München',
  },
  {
    id: '4',
    name: 'Sophie Laurent',
    text: 'Magnifique endroit! Les cocktails signature sont créatifs et délicieux. La Burrata était parfaite. Nous reviendrons définitivement!',
    rating: 5,
    date: '2024-09',
    city: 'Paris',
  },
  {
    id: '5',
    name: 'Luca Ferretti',
    text: 'La pizza al tartufo con prosciutto crudo è semplicemente celestiale. Il Wunderbar Special cocktail è diventato il mio preferito. Assolutamente da provare.',
    rating: 5,
    date: '2024-09',
    city: 'Roma',
  },
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [auto, setAuto] = useState(true)

  useEffect(() => {
    if (!auto) return
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [auto])

  const t = testimonials[current]

  return (
    <section className="py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark-400" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(201,168,76,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <ScrollReveal>
          <div className="gold-divider mb-6" />
          <h2 className="font-display text-4xl lg:text-5xl font-light text-gold-gradient tracking-wide mb-16">
            Cosa Dicono di Noi
          </h2>
        </ScrollReveal>

        {/* Quote */}
        <div className="relative min-h-[240px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="px-4"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} className="text-gold-400 fill-gold-400" />
                ))}
              </div>

              {/* Quote mark */}
              <div className="font-display text-8xl text-gold-500/20 leading-none mb-2 -mt-6 select-none">"</div>

              <blockquote className="font-serif text-xl lg:text-2xl font-light italic leading-relaxed -mt-8" style={{ color: 'var(--text)' }}>
                {t.text}
              </blockquote>

              <div className="mt-8 flex flex-col items-center gap-1">
                <cite className="not-italic font-sans font-medium text-gold-400 text-sm tracking-widest uppercase">
                  {t.name}
                </cite>
                <span className="text-xs font-sans" style={{ color: 'var(--text-muted)' }}>{t.city}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { setCurrent(i); setAuto(false) }}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === current ? 'w-8 bg-gold-400' : 'w-2 bg-gold-700'
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* Google Reviews link */}
        <motion.a
          href="https://maps.app.goo.gl/PSSB4ycYm1rUsEJG7"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-10 text-[10px] tracking-[0.2em] uppercase font-sans transition-colors hover:text-gold-400"
          style={{ color: 'var(--text-muted)' }}
          whileHover={{ scale: 1.02 }}
        >
          <span>Leggi le recensioni su Google</span>
          <span className="text-gold-500">→</span>
        </motion.a>
      </div>
    </section>
  )
}
