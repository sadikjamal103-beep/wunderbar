'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, Users, User, Phone, Mail, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

const timeSlots = [
  '12:00', '12:30', '13:00', '13:30', '14:00',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00',
]

const guestOptions = [1,2,3,4,5,6,7,8,9,10]

interface FormState {
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: string
  message: string
}

export default function ReservationPage() {
  const t = useTranslations('reservation')
  const [form, setForm] = useState<FormState>({
    name: '', email: '', phone: '', date: '', time: '', guests: '2', message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const minDate = new Date().toISOString().split('T')[0]

  function update(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    // Simulate API call — replace with your backend endpoint
    await new Promise((r) => setTimeout(r, 1500))
    setStatus('success')
  }

  const whatsappMessage = encodeURIComponent(
    `Ciao Wunderbar! Vorrei prenotare un tavolo per ${form.guests} persone il ${form.date} alle ${form.time}. Nome: ${form.name}. Telefono: ${form.phone}.`
  )
  const whatsappUrl = `https://wa.me/390000000000?text=${whatsappMessage}`

  const inputClass = `w-full px-4 py-3.5 rounded-xl border text-sm font-sans focus:outline-none transition-all duration-200 focus:border-gold-400`
  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    borderColor: 'rgba(201,168,76,0.2)',
    color: 'var(--text)',
  }

  return (
    <div className="min-h-screen pt-28 pb-24">
      {/* Header */}
      <div className="relative py-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,76,0.08)_0%,transparent_70%)] pointer-events-none" />
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

      <div className="max-w-3xl mx-auto px-6 lg:px-12">
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass gold-border rounded-3xl p-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              >
                <CheckCircle size={60} className="text-gold-400 mx-auto mb-6" />
              </motion.div>
              <h2 className="font-display text-3xl text-gold-gradient mb-3">{t('success')}</h2>
              <p className="text-sm font-sans" style={{ color: 'var(--text-muted)' }}>
                Conferma a: {form.email}
              </p>
              <motion.button
                onClick={() => setStatus('idle')}
                className="mt-8 px-8 py-3 border border-gold-500/40 text-gold-400 text-[11px] tracking-widest uppercase font-sans rounded-lg hover:bg-gold-500/8 transition-all"
                whileHover={{ scale: 1.02 }}
              >
                Nuova prenotazione
              </motion.button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="glass gold-border rounded-3xl p-8 lg:p-12 space-y-6"
            >
              {/* Row 1: Name */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase font-sans text-gold-500">
                  <User size={12} /> {t('name')}
                </label>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  placeholder="Mario Rossi"
                  className={inputClass}
                  style={inputStyle}
                />
              </div>

              {/* Row 2: Email + Phone */}
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase font-sans text-gold-500">
                    <Mail size={12} /> {t('email')}
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                    placeholder="mario@email.it"
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase font-sans text-gold-500">
                    <Phone size={12} /> {t('phone')}
                  </label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    placeholder="+39 333 000 0000"
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Row 3: Date + Time + Guests */}
              <div className="grid sm:grid-cols-3 gap-5">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase font-sans text-gold-500">
                    <Calendar size={12} /> {t('date')}
                  </label>
                  <input
                    required
                    type="date"
                    value={form.date}
                    min={minDate}
                    onChange={(e) => update('date', e.target.value)}
                    className={inputClass}
                    style={{ ...inputStyle, colorScheme: 'dark' }}
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase font-sans text-gold-500">
                    <Clock size={12} /> {t('time')}
                  </label>
                  <select
                    required
                    value={form.time}
                    onChange={(e) => update('time', e.target.value)}
                    className={inputClass}
                    style={{ ...inputStyle, colorScheme: 'dark' }}
                  >
                    <option value="">--:--</option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase font-sans text-gold-500">
                    <Users size={12} /> {t('guests')}
                  </label>
                  <select
                    value={form.guests}
                    onChange={(e) => update('guests', e.target.value)}
                    className={inputClass}
                    style={{ ...inputStyle, colorScheme: 'dark' }}
                  >
                    {guestOptions.map((n) => (
                      <option key={n} value={n}>{n} {n === 1 ? 'ospite' : 'ospiti'}</option>
                    ))}
                    <option value="11">10+ ospiti</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-[10px] tracking-[0.25em] uppercase font-sans text-gold-500">
                  <MessageSquare size={12} /> {t('message')}
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                  placeholder="Allergie, occasioni speciali, richieste di posto..."
                  className={inputClass}
                  style={{ ...inputStyle, resize: 'none' }}
                />
              </div>

              {/* Error */}
              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle size={16} />
                  {t('error')}
                </div>
              )}

              {/* Submit buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  className="flex-1 py-4 bg-gold-gradient text-dark-500 text-[11px] tracking-[0.25em] uppercase font-sans font-semibold rounded-xl shadow-[0_0_30px_rgba(201,168,76,0.2)] hover:shadow-[0_0_50px_rgba(201,168,76,0.4)] transition-all disabled:opacity-60"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {status === 'loading' ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                        ⏳
                      </motion.span>
                      Invio in corso...
                    </span>
                  ) : t('submit')}
                </motion.button>

                <motion.a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-4 border border-green-600/50 text-green-400 text-[11px] tracking-[0.2em] uppercase font-sans rounded-xl hover:bg-green-600/10 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {t('whatsapp')}
                </motion.a>
              </div>

              <p className="text-[10px] font-sans text-center" style={{ color: 'var(--text-muted)' }}>
                Riceverai una conferma via email/SMS entro 2 ore dall&apos;invio.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
