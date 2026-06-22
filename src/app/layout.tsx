import type { Metadata } from 'next'
import { Inter, Playfair_Display, Cormorant_Garamond } from 'next/font/google'
import StructuredData from '@/components/ui/StructuredData'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://wunderbarweb.it'),
  title: {
    default: 'WUNDERBAR — Restaurant • Pizzeria • Cocktail Bar',
    template: '%s | WUNDERBAR',
  },
  description:
    'WUNDERBAR — Ristorante, Pizzeria e Cocktail Bar. Un\'esperienza gastronomica unica tra sapori italiani autentici e cocktail d\'autore.',
  keywords: ['ristorante', 'pizzeria', 'cocktail bar', 'wunderbar', 'ristorante italiano', 'restaurant'],
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    alternateLocale: ['en_US', 'de_DE', 'fr_FR'],
    url: 'https://wunderbarweb.it',
    siteName: 'WUNDERBAR',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'WUNDERBAR Restaurant' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@wunderbarweb',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  verification: { google: 'verification-token' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#08070A" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${inter.variable} ${playfair.variable} ${cormorant.variable} noise`}>
        <StructuredData />
        {children}
      </body>
    </html>
  )
}
