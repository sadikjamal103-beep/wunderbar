'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { Menu, X, Globe } from 'lucide-react'

const locales = [
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'en', label: 'English',  flag: '🇬🇧' },
  { code: 'de', label: 'Deutsch',  flag: '🇩🇪' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
]

export default function Navigation() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1])
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1])

  const links = [
    { href: `/${locale}`,              label: t('home') },
    { href: `/${locale}/menu`,         label: t('menu') },
    { href: `/${locale}/gallery`,      label: t('gallery') },
    { href: `/${locale}/about`,        label: t('about') },
    { href: `/${locale}/contact`,      label: t('contact') },
  ]

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  function switchLocale(newLocale: string) {
    // Replace locale in path
    const segments = pathname.split('/')
    segments[1] = newLocale
    window.location.href = segments.join('/')
    setLangOpen(false)
  }

  const isActive = (href: string) => pathname === href

  return (
    <>
      <motion.header
        className="fixed top-0 inset-x-0 z-50 px-6 lg:px-12"
        style={{ paddingTop: '20px', paddingBottom: '16px' }}
      >
        {/* Blur background */}
        <motion.div
          className="absolute inset-0 glass-dark"
          style={{ opacity: bgOpacity }}
        />
        <motion.div
          className="absolute bottom-0 inset-x-0 h-px bg-gold-500/20"
          style={{ opacity: borderOpacity }}
        />

        <nav className="relative flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <Link href={`/${locale}`} className="group flex flex-col leading-none select-none">
            <span className="font-display text-2xl font-bold tracking-[0.25em] text-gold-gradient uppercase">
              WUNDERBAR
            </span>
            <span className="text-[9px] tracking-[0.4em] text-gold-600 uppercase font-sans">
              Restaurant · Pizzeria · Cocktail Bar
            </span>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative text-[11px] tracking-[0.2em] uppercase font-sans transition-colors duration-200 group ${
                    isActive(link.href)
                      ? 'text-gold-400'
                      : 'text-text-muted hover:text-gold-300'
                  }`}
                  style={{ color: isActive(link.href) ? undefined : 'var(--text-muted)' }}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-gold-500 transition-all duration-300 ${
                      isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side — lang + reserve */}
          <div className="flex items-center gap-4">
            {/* Lang switcher */}
            <div ref={langRef} className="relative hidden lg:block">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 text-[11px] tracking-widest uppercase font-sans text-text-muted hover:text-gold-300 transition-colors"
                style={{ color: 'var(--text-muted)' }}
              >
                <Globe size={13} />
                <span>{locales.find(l => l.code === locale)?.flag}</span>
                <span>{locale.toUpperCase()}</span>
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-8 glass-dark rounded-lg overflow-hidden border border-gold-500/20 min-w-[140px]"
                  >
                    {locales.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => switchLocale(l.code)}
                        className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-[11px] tracking-wider uppercase font-sans transition-colors ${
                          l.code === locale
                            ? 'text-gold-400 bg-gold-500/10'
                            : 'text-text-muted hover:text-gold-300 hover:bg-white/5'
                        }`}
                        style={{ color: l.code !== locale ? 'var(--text-muted)' : undefined }}
                      >
                        <span>{l.flag}</span>
                        <span>{l.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Reserve CTA */}
            <Link
              href={`/${locale}/reservation`}
              className="hidden lg:inline-flex items-center gap-2 px-6 py-2.5 border border-gold-500/60 text-gold-400 text-[11px] tracking-[0.2em] uppercase font-sans transition-all duration-300 hover:bg-gold-500/10 hover:border-gold-400"
            >
              {t('reserve')}
            </Link>

            {/* Mobile hamburger */}
            <motion.button
              className="lg:hidden text-gold-400 p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-40 glass-dark flex flex-col justify-center px-10"
          >
            <button
              className="absolute top-6 right-6 text-gold-400"
              onClick={() => setMobileOpen(false)}
            >
              <X size={24} />
            </button>

            <nav className="space-y-8">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 + 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block font-display text-4xl font-light text-gold-gradient"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: links.length * 0.07 + 0.1 }}
              >
                <Link
                  href={`/${locale}/reservation`}
                  onClick={() => setMobileOpen(false)}
                  className="block font-display text-4xl font-light text-gold-gradient"
                >
                  {t('reserve')}
                </Link>
              </motion.div>
            </nav>

            {/* Mobile lang switcher */}
            <div className="flex gap-4 mt-16">
              {locales.map((l) => (
                <button
                  key={l.code}
                  onClick={() => switchLocale(l.code)}
                  className={`text-sm font-sans tracking-widest uppercase transition-colors ${
                    l.code === locale ? 'text-gold-400' : 'text-text-muted'
                  }`}
                  style={{ color: l.code !== locale ? 'var(--text-muted)' : undefined }}
                >
                  {l.flag} {l.code.toUpperCase()}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
