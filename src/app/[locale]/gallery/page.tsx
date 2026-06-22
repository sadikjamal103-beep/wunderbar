'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { X, ZoomIn, Instagram } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

type GalleryCategory = 'all' | 'food' | 'drinks' | 'ambience' | 'events'

const galleryItems = [
  { id: '1', src: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=800&q=80', alt: 'Cocktail Negroni', category: 'drinks', span: 'col-span-1 row-span-2' },
  { id: '2', src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80', alt: 'Pizza Margherita', category: 'food', span: 'col-span-1 row-span-1' },
  { id: '3', src: 'https://images.unsplash.com/photo-1560624052-449f5ddf0c31?w=800&q=80', alt: 'Ambiente del locale', category: 'ambience', span: 'col-span-1 row-span-1' },
  { id: '4', src: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80', alt: 'Cocktail Bar', category: 'drinks', span: 'col-span-2 row-span-1' },
  { id: '5', src: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800&q=80', alt: 'Piatto di pasta', category: 'food', span: 'col-span-1 row-span-1' },
  { id: '6', src: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80', alt: 'Aperitivo', category: 'drinks', span: 'col-span-1 row-span-1' },
  { id: '7', src: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=80', alt: 'Serata al Wunderbar', category: 'events', span: 'col-span-1 row-span-2' },
  { id: '8', src: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80', alt: 'Insalata fresca', category: 'food', span: 'col-span-1 row-span-1' },
  { id: '9', src: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80', alt: 'Cocktail Spritz', category: 'drinks', span: 'col-span-1 row-span-1' },
  { id: '10', src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80', alt: 'Atmosfera serale', category: 'ambience', span: 'col-span-2 row-span-1' },
  { id: '11', src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', alt: 'Cena romantica', category: 'ambience', span: 'col-span-1 row-span-1' },
  { id: '12', src: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&q=80', alt: 'Dessert tiramisù', category: 'food', span: 'col-span-1 row-span-1' },
]

export default function GalleryPage() {
  const t = useTranslations('gallery')
  const [filter, setFilter] = useState<GalleryCategory>('all')
  const [lightbox, setLightbox] = useState<string | null>(null)

  const categories: Array<{ id: GalleryCategory; label: string }> = [
    { id: 'all',      label: t('all') },
    { id: 'food',     label: t('food') },
    { id: 'drinks',   label: t('drinks') },
    { id: 'ambience', label: t('ambience') },
    { id: 'events',   label: t('events') },
  ]

  const filtered = filter === 'all' ? galleryItems : galleryItems.filter(i => i.category === filter)
  const lightboxItem = galleryItems.find(i => i.id === lightbox)

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
            <p className="font-serif text-lg font-light" style={{ color: 'var(--text-muted)' }}>
              {t('subtitle')}
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Filter tabs */}
        <ScrollReveal className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setFilter(cat.id)}
              className={`px-5 py-2.5 rounded-full text-[11px] tracking-widest uppercase font-sans transition-all ${
                filter === cat.id
                  ? 'bg-gold-gradient text-dark-500 shadow-[0_0_20px_rgba(201,168,76,0.2)]'
                  : 'border border-gold-500/20 hover:border-gold-500/50 hover:text-gold-400'
              }`}
              style={filter !== cat.id ? { color: 'var(--text-muted)' } : undefined}
            >
              {cat.label}
            </motion.button>
          ))}
        </ScrollReveal>

        {/* Masonry grid */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[220px]">
          <AnimatePresence>
            {filtered.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.04 }}
                className={`group relative overflow-hidden rounded-2xl cursor-pointer ${item.span}`}
                onClick={() => setLightbox(item.id)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-dark-500/0 group-hover:bg-dark-500/40 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-10 h-10 rounded-full bg-gold-500/20 backdrop-blur-sm border border-gold-400/40 flex items-center justify-center">
                    <ZoomIn size={18} className="text-gold-300" />
                  </div>
                </div>
                <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-gold-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Instagram CTA */}
        <ScrollReveal className="text-center mt-16">
          <div className="glass gold-border rounded-2xl p-10 max-w-lg mx-auto">
            <Instagram size={32} className="text-gold-500 mx-auto mb-4" />
            <h3 className="font-display text-2xl text-gold-gradient mb-2">Seguici su Instagram</h3>
            <p className="text-sm font-sans mb-6" style={{ color: 'var(--text-muted)' }}>
              Scopri i nostri ultimi momenti, cocktail e piatti del giorno
            </p>
            <motion.a
              href="https://instagram.com/wunderbar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gold-gradient text-dark-500 text-[11px] tracking-widest uppercase font-sans font-semibold rounded-lg"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              @wunderbar
            </motion.a>
          </div>
        </ScrollReveal>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-dark-500/95 backdrop-blur-xl p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.button
              className="absolute top-6 right-6 w-10 h-10 rounded-full glass border border-gold-500/30 flex items-center justify-center text-gold-400"
              whileHover={{ scale: 1.1 }}
              onClick={() => setLightbox(null)}
            >
              <X size={18} />
            </motion.button>
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="max-w-5xl max-h-[85vh] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lightboxItem.src.replace('w=800', 'w=1400')}
                alt={lightboxItem.alt}
                className="w-full h-full object-contain"
              />
            </motion.div>
            <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs font-sans tracking-widest uppercase text-gold-600">
              {lightboxItem.alt}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
