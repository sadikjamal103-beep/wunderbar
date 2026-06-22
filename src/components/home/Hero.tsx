'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { ArrowDown, ChevronRight } from 'lucide-react'

const CocktailScene = dynamic(() => import('@/components/3d/CocktailScene'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-transparent" />,
})

const BRAND_LETTERS = 'WUNDERBAR'.split('')

export default function Hero() {
  const t = useTranslations('hero')
  const locale = useLocale()
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef })
  const opacity  = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y        = useTransform(scrollYProgress, [0, 0.5], [0, -80])
  const sceneY   = useTransform(scrollYProgress, [0, 0.6], [0, 120])

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[700px] flex items-center overflow-hidden"
    >
      {/* Deep background gradient */}
      <div className="absolute inset-0 bg-dark-500" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,76,0.08)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_70%,rgba(120,60,200,0.04)_0%,transparent_60%)]" />

      {/* 3D scene — right column on desktop, full-screen on mobile */}
      <motion.div
        className="absolute inset-0 lg:left-auto lg:right-0 lg:w-[60%] opacity-90"
        style={{ y: sceneY }}
      >
        <CocktailScene />
      </motion.div>

      {/* Dark veil over 3D on mobile */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark-500 via-dark-500/80 to-transparent lg:via-dark-500/50 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-dark-500 via-transparent to-dark-500/60 pointer-events-none" />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full"
        style={{ opacity, y }}
      >
        <div className="max-w-xl xl:max-w-2xl">
          {/* Pre-headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="h-px w-12 bg-gold-500 block" />
            <span className="text-[10px] tracking-[0.35em] uppercase font-sans text-gold-500">
              Est. 2018
            </span>
          </motion.div>

          {/* Main brand name — animated letter by letter */}
          <h1 className="font-display font-bold leading-none mb-4 overflow-hidden">
            <div className="flex">
              {BRAND_LETTERS.map((letter, i) => (
                <motion.span
                  key={i}
                  className="text-gold-gradient inline-block"
                  style={{
                    fontSize: 'clamp(3.5rem, 8vw, 8rem)',
                    letterSpacing: '0.18em',
                  }}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.4 + i * 0.06,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="font-serif text-xl lg:text-2xl font-light tracking-[0.12em] mb-10"
            style={{ color: 'var(--text-muted)' }}
          >
            {t('tagline')}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href={`/${locale}/menu`}
              className="group inline-flex items-center gap-2.5 px-8 py-3.5 bg-gold-gradient text-dark-500 text-[11px] tracking-[0.25em] uppercase font-sans font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgba(201,168,76,0.4)] relative overflow-hidden"
            >
              <span className="relative z-10">{t('cta_menu')}</span>
              <ChevronRight size={14} className="relative z-10 transition-transform group-hover:translate-x-1" />
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link
              href={`/${locale}/reservation`}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 border border-gold-500/50 text-gold-400 text-[11px] tracking-[0.25em] uppercase font-sans font-medium transition-all duration-300 hover:border-gold-400 hover:bg-gold-500/8"
            >
              {t('cta_reserve')}
            </Link>
          </motion.div>

          {/* Quick stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="flex gap-8 mt-14 pt-8 border-t border-gold-500/10"
          >
            {[
              { value: '6+', label: 'Anni di Passione' },
              { value: '50+', label: 'Cocktails' },
              { value: '∞',  label: 'Piacere' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-display text-3xl font-bold text-gold-gradient">{value}</p>
                <p className="text-[10px] tracking-widest uppercase font-sans mt-1" style={{ color: 'var(--text-muted)' }}>
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-[9px] tracking-[0.4em] uppercase font-sans text-gold-600">{t('scroll')}</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} className="text-gold-600" />
        </motion.div>
      </motion.div>

      {/* Decorative corner lines */}
      <div className="absolute bottom-0 left-0 w-24 h-24 border-b border-l border-gold-500/10 pointer-events-none" />
      <div className="absolute top-24 right-0 w-24 h-24 border-t border-r border-gold-500/10 pointer-events-none" />
    </section>
  )
}
