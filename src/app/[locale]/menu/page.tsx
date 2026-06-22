'use client'

import { useState, useMemo } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, QrCode } from 'lucide-react'
import MenuCard from '@/components/menu/MenuCard'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { menuItems, menuCategories } from '@/lib/menuData'
import type { MenuCategory } from '@/types'
import dynamic from 'next/dynamic'

const QRCode = dynamic(() => import('react-qr-code'), { ssr: false })

export default function MenuPage() {
  const t = useTranslations('menu')
  const locale = useLocale()
  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'all'>('all')
  const [search, setSearch] = useState('')
  const [showQR, setShowQR] = useState(false)

  const filtered = useMemo(() => {
    let items = menuItems
    if (activeCategory !== 'all') {
      items = items.filter((i) => i.category === activeCategory)
    }
    if (search.trim()) {
      const q = search.toLowerCase()
      items = items.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          (i.nameEn?.toLowerCase().includes(q)) ||
          (i.descriptionEn?.toLowerCase().includes(q))
      )
    }
    return items
  }, [activeCategory, search])

  const menuUrl = typeof window !== 'undefined' ? window.location.href : 'https://wunderbarweb.it/it/menu'

  return (
    <div className="min-h-screen pt-28 pb-24">
      {/* Header */}
      <div className="relative py-16 overflow-hidden">
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

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Search + QR */}
        <ScrollReveal className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-600" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('search')}
              className="w-full pl-11 pr-4 py-3.5 bg-white/4 border border-gold-500/20 rounded-xl text-sm font-sans placeholder:text-text-muted/50 focus:outline-none focus:border-gold-400 transition-colors"
              style={{ color: 'var(--text)', background: 'rgba(255,255,255,0.04)' }}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowQR(!showQR)}
            className="flex items-center gap-2 px-6 py-3.5 border border-gold-500/30 text-gold-400 text-[11px] tracking-widest uppercase font-sans rounded-xl hover:bg-gold-500/8 transition-colors"
          >
            <QrCode size={15} />
            {t('qr_title')}
          </motion.button>
        </ScrollReveal>

        {/* QR Panel */}
        <AnimatePresence>
          {showQR && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="glass gold-border rounded-2xl p-8 flex flex-col sm:flex-row items-center gap-8">
                <div className="p-4 bg-white rounded-xl">
                  <QRCode value={menuUrl} size={140} level="H" />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-medium text-gold-gradient mb-2">
                    {t('qr_title')}
                  </h3>
                  <p className="text-sm font-sans" style={{ color: 'var(--text-muted)' }}>
                    {t('qr_subtitle')}
                  </p>
                  <p className="text-xs font-mono mt-3 text-gold-600 break-all">{menuUrl}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category filters */}
        <ScrollReveal className="mb-10">
          <div className="flex flex-wrap gap-2">
            {menuCategories.map((cat) => {
              const isActive = activeCategory === cat.id
              const label = (() => {
                const map: Record<string, string> = {
                  en: cat.labelEn,
                  de: cat.labelDe,
                  fr: cat.labelFr,
                  it: cat.label,
                }
                return map[locale] || cat.label
              })()

              return (
                <motion.button
                  key={cat.id}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setActiveCategory(cat.id as MenuCategory | 'all')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] tracking-widest uppercase font-sans transition-all duration-200 ${
                    isActive
                      ? 'bg-gold-gradient text-dark-500 shadow-[0_0_20px_rgba(201,168,76,0.25)]'
                      : 'border border-gold-500/20 text-text-muted hover:border-gold-500/50 hover:text-gold-400'
                  }`}
                  style={!isActive ? { color: 'var(--text-muted)' } : undefined}
                >
                  <span>{cat.icon}</span>
                  <span>{label}</span>
                </motion.button>
              )
            })}
          </div>
        </ScrollReveal>

        {/* Results count */}
        <p className="text-[11px] tracking-widest uppercase font-sans mb-6" style={{ color: 'var(--text-muted)' }}>
          {filtered.length} {filtered.length === 1 ? 'piatto' : 'piatti'}
        </p>

        {/* Menu grid */}
        <AnimatePresence mode="sync">
          {filtered.length > 0 ? (
            <motion.div
              key="grid"
              layout
              className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5"
            >
              {filtered.map((item) => (
                <MenuCard key={item.id} item={item} locale={locale} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <p className="font-display text-3xl text-gold-500/40 mb-3">✦</p>
              <p className="text-lg font-serif" style={{ color: 'var(--text-muted)' }}>
                {t('no_results')}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Allergens note */}
        <div className="mt-16 pt-8 border-t border-gold-500/10">
          <p className="text-xs font-sans text-center" style={{ color: 'var(--text-muted)' }}>
            I prezzi sono IVA inclusa. Per informazioni sugli allergeni, si prega di consultare il personale.
            Allergen information available on request. Allergene-Informationen auf Anfrage. Informations allergènes sur demande.
          </p>
        </div>
      </div>
    </div>
  )
}
