'use client'

import { motion } from 'framer-motion'
import { Leaf, Flame, Wheat, Star, Sparkles } from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import type { MenuItem } from '@/types'

interface MenuCardProps {
  item: MenuItem
  locale: string
}

export default function MenuCard({ item, locale }: MenuCardProps) {
  const name = (() => {
    const map: Record<string, string | undefined> = {
      en: item.nameEn, de: item.nameDe, fr: item.nameFr, it: item.nameIt,
    }
    return map[locale] || item.name
  })()

  const description = (() => {
    const map: Record<string, string | undefined> = {
      en: item.descriptionEn, de: item.descriptionDe, fr: item.descriptionFr, it: item.descriptionIt,
    }
    return map[locale] || item.description
  })()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group relative glass rounded-2xl p-6 gold-border cursor-default overflow-hidden"
    >
      {/* Gradient hover glow */}
      <div className="absolute inset-0 bg-gold-gradient opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 rounded-2xl" />

      {/* Badges */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {item.isNew && (
          <span className="inline-flex items-center gap-1 text-[9px] tracking-widest uppercase px-2 py-1 bg-gold-500/15 text-gold-400 rounded-full font-sans">
            <Sparkles size={9} /> New
          </span>
        )}
        {item.isSignature && (
          <span className="inline-flex items-center gap-1 text-[9px] tracking-widest uppercase px-2 py-1 bg-purple-500/15 text-purple-300 rounded-full font-sans">
            <Star size={9} /> Signature
          </span>
        )}
        {item.isVegetarian && (
          <span className="inline-flex items-center gap-1 text-[9px] tracking-widest uppercase px-2 py-1 bg-emerald-500/12 text-emerald-400 rounded-full font-sans">
            <Leaf size={9} /> Veg
          </span>
        )}
        {item.isSpicy && (
          <span className="inline-flex items-center gap-1 text-[9px] tracking-widest uppercase px-2 py-1 bg-red-500/12 text-red-400 rounded-full font-sans">
            <Flame size={9} /> Spicy
          </span>
        )}
        {item.isGlutenFree && (
          <span className="inline-flex items-center gap-1 text-[9px] tracking-widest uppercase px-2 py-1 bg-blue-500/12 text-blue-400 rounded-full font-sans">
            <Wheat size={9} /> GF
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-lg font-medium tracking-wide leading-tight mb-2 group-hover:text-gold-300 transition-colors" style={{ color: 'var(--text)' }}>
            {name}
          </h3>
          <p className="text-sm font-sans leading-relaxed line-clamp-2" style={{ color: 'var(--text-muted)' }}>
            {description}
          </p>

          {/* Alcohol badge */}
          {item.alcohol && (
            <p className="text-[10px] font-sans mt-2 tracking-wider" style={{ color: 'var(--text-muted)' }}>
              {item.alcohol}% vol
            </p>
          )}
        </div>

        {/* Price */}
        <div className="shrink-0 text-right">
          <span className="font-display text-xl font-medium text-gold-400">
            {formatPrice(item.price, locale)}
          </span>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  )
}
