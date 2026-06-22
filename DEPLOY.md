# WUNDERBAR — Deployment Guide

## Prerequisites

Install **Node.js 20+** from https://nodejs.org/en/download

---

## 1. Install & Run Locally

```bash
cd wunderbar
npm install --legacy-peer-deps
npm run dev
```

Open http://localhost:3000 — it auto-redirects to /it (Italian default).

Routes:
- /it  /en  /de  /fr          → Home
- /it/menu                    → Digital Menu + QR Code
- /it/gallery                 → Photo Gallery
- /it/about                   → Story & Team
- /it/contact                 → Contact + Map
- /it/reservation             → Booking Form
- /admin                      → Admin Panel (password: wunderbar2024)

---

## 2. Production Build

```bash
npm run build
npm start
```

---

## 3. Deploy to Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

Or push to GitHub and connect at vercel.com/new

Environment variables (create in Vercel dashboard):
- NEXT_PUBLIC_SITE_URL=https://wunderbarweb.it
- NEXT_PUBLIC_WHATSAPP=+390000000000  ← replace with real number
- NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX     ← Google Analytics (optional)

---

## 4. Custom Domain

In Vercel → Settings → Domains → Add wunderbarweb.it
Update DNS at your registrar:
  A     @    76.76.21.21
  CNAME www  cname.vercel-dns.com

---

## 5. Personalizzazione

### Aggiornare il menu
Edit: src/lib/menuData.ts

### Aggiornare le traduzioni
Edit: messages/it.json | en.json | de.json | fr.json

### Cambiare l'indirizzo (update in 3 places)
- src/components/layout/Footer.tsx
- src/components/home/MapSection.tsx
- src/components/ui/StructuredData.tsx

### Sostituire il numero WhatsApp
Search & replace: 390000000000 → your number (no spaces, no +)

### Aggiornare Google Maps embed
Replace the iframe src URLs in:
- src/components/home/MapSection.tsx
- src/app/[locale]/contact/page.tsx

Get embed code from: maps.google.com → Share → Embed a map

### Cambiare la password admin
Edit: src/app/admin/page.tsx → ADMIN_PASSWORD constant
(For production, implement proper auth with NextAuth or Clerk)

---

## 6. QR Menu System

Each table gets a QR code linking to:
https://wunderbarweb.it/it/menu

Or table-specific:
https://wunderbarweb.it/it/menu?table=5

Print QR codes at: qr.io or qrmonkey.com
Use https://wunderbarweb.it/it/menu as the URL.

The menu page has a built-in QR generator (click "Menu QR" button).

---

## 7. PWA — App mobile

The site is already PWA-ready. Users can install it from:
- Chrome Android → "Aggiungi alla schermata home"
- Safari iPhone → Condividi → "Aggiungi a Home"

Icons (replace in public/icons/):
- icon-192x192.png
- icon-512x512.png

---

## 8. SEO Checklist

- [ ] Replace "verification-token" in layout.tsx with Google Search Console token
- [ ] Upload og-image.jpg to public/ (1200×630px, shows on social sharing)
- [ ] Update sitemap.xml dates after launch
- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Analytics (add GA_ID env var)
- [ ] Verify Google My Business listing matches site data

---

## 9. Performance Tips

- Replace Unsplash images with real restaurant photos (WebP format)
- Use Cloudinary or Vercel Image Optimization for gallery
- Add a real CDN for videos if needed

---

## Stack Summary

| Layer       | Technology                  |
|-------------|----------------------------|
| Framework   | Next.js 15 (App Router)    |
| Language    | TypeScript                 |
| Styling     | Tailwind CSS               |
| 3D          | Three.js + R3F + Drei      |
| Animations  | Framer Motion + GSAP       |
| Scroll      | Lenis Smooth Scroll        |
| i18n        | next-intl (IT/EN/DE/FR)   |
| QR Code     | react-qr-code              |
| Icons       | Lucide React               |
| Deploy      | Vercel                     |

---

## File Structure

```
wunderbar/
├── messages/           ← Translations (IT/EN/DE/FR)
├── public/             ← Static assets
│   ├── manifest.json   ← PWA manifest
│   ├── robots.txt
│   └── sitemap.xml
└── src/
    ├── app/
    │   ├── layout.tsx         ← Root layout + SEO
    │   ├── globals.css        ← Global styles
    │   ├── [locale]/          ← i18n routes
    │   │   ├── layout.tsx
    │   │   ├── page.tsx       ← Home
    │   │   ├── menu/          ← Digital menu + QR
    │   │   ├── gallery/       ← Photo gallery
    │   │   ├── about/         ← Story + team
    │   │   ├── contact/       ← Contact + map
    │   │   └── reservation/   ← Booking form
    │   └── admin/             ← Admin panel
    ├── components/
    │   ├── 3d/                ← Three.js 3D scene
    │   ├── home/              ← Homepage sections
    │   ├── layout/            ← Nav + Footer
    │   ├── menu/              ← Menu cards
    │   └── ui/                ← Reusable UI
    ├── i18n/                  ← i18n config
    ├── lib/                   ← Menu data + utils
    ├── middleware.ts           ← Locale routing
    └── types/                 ← TypeScript types
```
