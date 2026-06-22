'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, LayoutDashboard, UtensilsCrossed, Image, Calendar, Settings, Plus, Edit2, Trash2, Eye, TrendingUp, Users, ShoppingBag, Star } from 'lucide-react'
import { menuItems as defaultMenu, menuCategories } from '@/lib/menuData'
import { formatPrice } from '@/lib/utils'
import type { MenuItem } from '@/types'

const ADMIN_PASSWORD = 'wunderbar2024'

type AdminTab = 'dashboard' | 'menu' | 'gallery' | 'reservations' | 'settings'

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState('')
  const [error, setError] = useState(false)

  function tryLogin(e: React.FormEvent) {
    e.preventDefault()
    if (pw === ADMIN_PASSWORD) { onLogin() }
    else { setError(true); setTimeout(() => setError(false), 2000) }
  }

  return (
    <div className="min-h-screen bg-dark-500 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass rounded-3xl p-10 border border-gold-500/20"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mx-auto mb-6">
            <Lock size={28} className="text-gold-400" />
          </div>
          <h1 className="font-display text-3xl font-bold text-gold-gradient mb-1">WUNDERBAR</h1>
          <p className="text-xs tracking-[0.3em] uppercase font-sans" style={{ color: 'var(--text-muted)' }}>Admin Panel</p>
        </div>

        <form onSubmit={tryLogin} className="space-y-4">
          <div>
            <label className="text-[10px] tracking-widest uppercase font-sans text-gold-500 block mb-2">Password</label>
            <input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className={`w-full px-4 py-3.5 rounded-xl border text-sm font-sans focus:outline-none transition-all ${
                error ? 'border-red-500' : 'border-gold-500/20 focus:border-gold-400'
              }`}
              style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--text)', colorScheme: 'dark' }}
              placeholder="••••••••••"
              autoFocus
            />
            {error && <p className="text-red-400 text-xs mt-2">Password errata</p>}
          </div>
          <motion.button
            type="submit"
            className="w-full py-3.5 bg-gold-gradient text-dark-500 text-[11px] tracking-widest uppercase font-sans font-semibold rounded-xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Accedi
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [tab, setTab] = useState<AdminTab>('dashboard')
  const [menuData, setMenuData] = useState<MenuItem[]>(defaultMenu)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem('wb_admin')
    if (stored === '1') setLoggedIn(true)
  }, [])

  function handleLogin() {
    setLoggedIn(true)
    sessionStorage.setItem('wb_admin', '1')
  }

  function deleteItem(id: string) {
    if (confirm('Eliminare questo elemento?')) {
      setMenuData((prev) => prev.filter(i => i.id !== id))
    }
  }

  if (!loggedIn) return <LoginScreen onLogin={handleLogin} />

  const sidebar: Array<{ id: AdminTab; icon: React.ElementType; label: string }> = [
    { id: 'dashboard',    icon: LayoutDashboard,   label: 'Dashboard' },
    { id: 'menu',         icon: UtensilsCrossed,   label: 'Menu' },
    { id: 'gallery',      icon: Image,              label: 'Galleria' },
    { id: 'reservations', icon: Calendar,           label: 'Prenotazioni' },
    { id: 'settings',     icon: Settings,           label: 'Impostazioni' },
  ]

  const dashStats = [
    { icon: TrendingUp, label: 'Visite oggi',    value: '342',  change: '+12%' },
    { icon: Users,      label: 'Prenotazioni',   value: '18',   change: '+5%'  },
    { icon: ShoppingBag,label: 'Voci menu',      value: String(menuData.length), change: '' },
    { icon: Star,       label: 'Rating medio',   value: '4.9',  change: '★★★★★' },
  ]

  return (
    <div className="min-h-screen bg-dark-500 flex" style={{ fontFamily: 'var(--font-inter)' }}>
      {/* Sidebar */}
      <aside className="w-60 shrink-0 border-r border-gold-500/10 flex flex-col py-8 px-4 gap-1">
        <div className="mb-8 px-2">
          <p className="font-display text-xl font-bold text-gold-gradient">WUNDERBAR</p>
          <p className="text-[9px] tracking-widest uppercase font-sans mt-0.5" style={{ color: 'var(--text-muted)' }}>Admin Panel</p>
        </div>
        {sidebar.map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-sans text-left transition-all ${
              tab === id
                ? 'bg-gold-500/10 text-gold-400 border border-gold-500/20'
                : 'text-text-muted hover:text-gold-300 hover:bg-white/5'
            }`}
            style={{ color: tab !== id ? 'var(--text-muted)' : undefined }}
          >
            <Icon size={17} />
            {label}
          </button>
        ))}
        <div className="mt-auto">
          <button
            onClick={() => { setLoggedIn(false); sessionStorage.removeItem('wb_admin') }}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-sans w-full rounded-lg hover:bg-white/5 transition-colors"
            style={{ color: 'var(--text-muted)' }}
          >
            <Lock size={13} /> Disconnetti
          </button>
          <a
            href="/it"
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-sans w-full rounded-lg hover:bg-white/5 transition-colors mt-1"
            style={{ color: 'var(--text-muted)' }}
          >
            <Eye size={13} /> Vedi sito
          </a>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto p-8">
        <AnimatePresence mode="wait">
          {tab === 'dashboard' && (
            <motion.div key="dashboard" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <h2 className="font-display text-3xl text-gold-gradient mb-8">Dashboard</h2>
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
                {dashStats.map((s) => (
                  <div key={s.label} className="glass rounded-2xl p-6 border border-gold-500/10">
                    <div className="flex items-center justify-between mb-4">
                      <s.icon size={18} className="text-gold-400" />
                      {s.change && <span className="text-[10px] tracking-wide text-emerald-400 font-sans">{s.change}</span>}
                    </div>
                    <p className="font-display text-3xl font-bold text-gold-gradient">{s.value}</p>
                    <p className="text-xs font-sans mt-1" style={{ color: 'var(--text-muted)' }}>{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="glass rounded-2xl p-6 border border-gold-500/10">
                <h3 className="font-display text-xl text-gold-300 mb-4">Azioni Rapide</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { label: 'Aggiungi voce menu', action: () => setTab('menu') },
                    { label: 'Carica foto',        action: () => setTab('gallery') },
                    { label: 'Prenotazioni',       action: () => setTab('reservations') },
                  ].map((btn) => (
                    <button
                      key={btn.label}
                      onClick={btn.action}
                      className="py-3 border border-gold-500/20 text-gold-400 text-xs tracking-widest uppercase font-sans rounded-xl hover:bg-gold-500/8 transition-all"
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {tab === 'menu' && (
            <motion.div key="menu" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-display text-3xl text-gold-gradient">Gestione Menu</h2>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-gold-gradient text-dark-500 text-xs tracking-widest uppercase font-sans font-semibold rounded-xl">
                  <Plus size={15} /> Aggiungi voce
                </button>
              </div>

              <div className="space-y-3">
                {menuCategories.filter(c => c.id !== 'all').map((cat) => {
                  const items = menuData.filter(i => i.category === cat.id)
                  if (items.length === 0) return null
                  return (
                    <details key={cat.id} className="glass rounded-2xl border border-gold-500/10 overflow-hidden">
                      <summary className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-white/5 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{cat.icon}</span>
                          <span className="font-sans text-sm font-medium" style={{ color: 'var(--text)' }}>{cat.label}</span>
                          <span className="text-[10px] bg-gold-500/10 text-gold-500 px-2 py-0.5 rounded-full font-sans">{items.length}</span>
                        </div>
                      </summary>
                      <div className="px-4 pb-4 space-y-2">
                        {items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between bg-white/[0.03] rounded-xl px-5 py-3">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-sans font-medium" style={{ color: 'var(--text)' }}>{item.name}</p>
                              <p className="text-xs font-sans truncate" style={{ color: 'var(--text-muted)' }}>{item.description}</p>
                            </div>
                            <div className="flex items-center gap-4 ml-4">
                              <span className="font-display text-base text-gold-400">{formatPrice(item.price)}</span>
                              <button
                                className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 hover:bg-blue-500/20 transition-colors"
                                onClick={() => setEditingItem(item)}
                              >
                                <Edit2 size={13} />
                              </button>
                              <button
                                className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-colors"
                                onClick={() => deleteItem(item.id)}
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </details>
                  )
                })}
              </div>
            </motion.div>
          )}

          {tab === 'gallery' && (
            <motion.div key="gallery" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <h2 className="font-display text-3xl text-gold-gradient mb-8">Gestione Galleria</h2>
              <div className="glass rounded-2xl border border-gold-500/10 p-10 text-center">
                <Image size={48} className="text-gold-400/40 mx-auto mb-4" />
                <p className="text-sm font-sans mb-6" style={{ color: 'var(--text-muted)' }}>
                  Carica nuove foto dalla tua libreria
                </p>
                <label className="inline-flex items-center gap-2 px-6 py-3 border border-gold-500/40 text-gold-400 text-xs tracking-widest uppercase font-sans rounded-xl cursor-pointer hover:bg-gold-500/8 transition-all">
                  <Plus size={14} /> Carica Immagine
                  <input type="file" className="hidden" accept="image/*" multiple />
                </label>
              </div>
            </motion.div>
          )}

          {tab === 'reservations' && (
            <motion.div key="reservations" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <h2 className="font-display text-3xl text-gold-gradient mb-8">Prenotazioni</h2>
              <div className="glass rounded-2xl border border-gold-500/10 overflow-hidden">
                <div className="p-6 border-b border-gold-500/10">
                  <p className="text-sm font-sans" style={{ color: 'var(--text-muted)' }}>
                    Le prenotazioni vengono salvate nel tuo database. Collega un backend (Supabase / Firebase / API) per gestirle qui.
                  </p>
                </div>
                {[
                  { name: 'Marco Rossi',   guests: 4, date: '2024-12-25', time: '20:00', status: 'confirmed' },
                  { name: 'Laura Bianchi', guests: 2, date: '2024-12-24', time: '19:30', status: 'pending'   },
                  { name: 'Klaus Weber',   guests: 6, date: '2024-12-26', time: '19:00', status: 'confirmed' },
                ].map((r, i) => (
                  <div key={i} className="flex items-center gap-4 px-6 py-4 border-b border-gold-500/5 hover:bg-white/[0.02] transition-colors">
                    <div className="flex-1">
                      <p className="text-sm font-sans font-medium" style={{ color: 'var(--text)' }}>{r.name}</p>
                      <p className="text-xs font-sans" style={{ color: 'var(--text-muted)' }}>{r.date} alle {r.time} · {r.guests} ospiti</p>
                    </div>
                    <span className={`text-[10px] tracking-widest uppercase font-sans px-3 py-1 rounded-full ${
                      r.status === 'confirmed' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-amber-500/15 text-amber-400'
                    }`}>
                      {r.status === 'confirmed' ? 'Confermata' : 'In attesa'}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {tab === 'settings' && (
            <motion.div key="settings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <h2 className="font-display text-3xl text-gold-gradient mb-8">Impostazioni</h2>
              <div className="space-y-6 max-w-2xl">
                {[
                  { label: 'Nome ristorante', value: 'WUNDERBAR' },
                  { label: 'Telefono',        value: '+39 0471 000 000' },
                  { label: 'Email',           value: 'info@wunderbarweb.it' },
                  { label: 'Indirizzo',       value: 'Via Roma 1, 39100 Bolzano BZ' },
                  { label: 'WhatsApp',        value: '+39 000 000 0000' },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="text-[10px] tracking-widest uppercase font-sans text-gold-500 block mb-2">{field.label}</label>
                    <input
                      defaultValue={field.value}
                      className="w-full px-4 py-3.5 rounded-xl border border-gold-500/20 text-sm font-sans focus:outline-none focus:border-gold-400 transition-all"
                      style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--text)', colorScheme: 'dark' }}
                    />
                  </div>
                ))}
                <button className="px-8 py-3.5 bg-gold-gradient text-dark-500 text-[11px] tracking-widest uppercase font-sans font-semibold rounded-xl">
                  Salva Impostazioni
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Edit Modal */}
      <AnimatePresence>
        {editingItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-dark-500/90 backdrop-blur-md p-4"
            onClick={() => setEditingItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md glass rounded-2xl p-8 border border-gold-500/20"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-display text-xl text-gold-gradient mb-6">Modifica voce</h3>
              <div className="space-y-4">
                {[
                  { label: 'Nome',        field: 'name' as keyof MenuItem,        type: 'text' },
                  { label: 'Descrizione', field: 'description' as keyof MenuItem, type: 'text' },
                  { label: 'Prezzo (€)',  field: 'price' as keyof MenuItem,       type: 'number' },
                ].map(({ label, field, type }) => (
                  <div key={label}>
                    <label className="text-[10px] tracking-widest uppercase font-sans text-gold-500 block mb-1.5">{label}</label>
                    <input
                      type={type}
                      defaultValue={String(editingItem[field] ?? '')}
                      className="w-full px-4 py-3 rounded-xl border border-gold-500/20 text-sm font-sans focus:outline-none focus:border-gold-400 transition-all"
                      style={{ background: 'rgba(255,255,255,0.04)', color: 'var(--text)', colorScheme: 'dark' }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setEditingItem(null)}
                  className="flex-1 py-3 bg-gold-gradient text-dark-500 text-xs tracking-widest uppercase font-sans font-semibold rounded-xl"
                >
                  Salva
                </button>
                <button
                  onClick={() => setEditingItem(null)}
                  className="px-5 py-3 border border-gold-500/20 text-gold-600 text-xs tracking-widest uppercase font-sans rounded-xl hover:bg-white/5 transition-all"
                >
                  Annulla
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
