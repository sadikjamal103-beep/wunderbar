'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Navigation } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

export default function MapSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-dark-400" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <ScrollReveal className="text-center mb-14">
          <div className="gold-divider mb-6" />
          <h2 className="font-display text-4xl lg:text-5xl font-light text-gold-gradient tracking-wide">
            Dove Siamo
          </h2>
        </ScrollReveal>

        <div className="grid lg:grid-cols-5 gap-8 items-stretch">
          {/* Info card */}
          <ScrollReveal className="lg:col-span-2">
            <div className="glass gold-border rounded-2xl p-8 h-full flex flex-col justify-between gap-8">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center shrink-0">
                    <MapPin size={16} className="text-gold-400" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.25em] uppercase font-sans text-gold-500 mb-1">Indirizzo</p>
                    <p className="text-sm font-sans" style={{ color: 'var(--text)' }}>Via Roma 1<br />39100 Bolzano BZ</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center shrink-0">
                    <Phone size={16} className="text-gold-400" />
                  </div>
                  <div>
                    <p className="text-[10px] tracking-[0.25em] uppercase font-sans text-gold-500 mb-1">Telefono</p>
                    <a href="tel:+390471000000" className="text-sm font-sans hover:text-gold-400 transition-colors" style={{ color: 'var(--text)' }}>
                      +39 0471 000 000
                    </a>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <motion.a
                  href="https://maps.app.goo.gl/PSSB4ycYm1rUsEJG7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 bg-gold-gradient text-dark-500 text-[11px] tracking-[0.2em] uppercase font-sans font-semibold rounded transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Navigation size={14} />
                  Indicazioni Stradali
                </motion.a>

                <motion.a
                  href="https://wa.me/390000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 border border-green-600/50 text-green-400 text-[11px] tracking-[0.2em] uppercase font-sans rounded transition-all hover:bg-green-600/10"
                  whileHover={{ scale: 1.02 }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </motion.a>
              </div>
            </div>
          </ScrollReveal>

          {/* Map embed */}
          <ScrollReveal delay={0.15} className="lg:col-span-3">
            <div className="relative rounded-2xl overflow-hidden gold-border h-80 lg:h-full min-h-[320px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2774.0!2d11.35!3d46.49!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDbCsDI5JzI0LjAiTiAxMcKwMjEnMDAuMCJF!5e0!3m2!1sit!2sit!4v1000000000000!5m2!1sit!2sit"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(92%) hue-rotate(180deg) saturate(0.4) brightness(0.9)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="WUNDERBAR Location"
              />
              {/* Gold overlay border */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-gold-500/20 pointer-events-none" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
