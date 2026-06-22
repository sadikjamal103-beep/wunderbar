import type { Metadata } from 'next'
import Hero from '@/components/home/Hero'
import StatsSection from '@/components/home/StatsSection'
import TestimonialsSection from '@/components/home/TestimonialsSection'
import OpeningHours from '@/components/home/OpeningHours'
import MapSection from '@/components/home/MapSection'
import FeaturedSection from '@/components/home/FeaturedSection'

export const metadata: Metadata = {
  title: 'WUNDERBAR — Restaurant • Pizzeria • Cocktail Bar',
  description:
    'Benvenuto al Wunderbar — Un\'esperienza gastronomica unica nel cuore d\'Italia. Pizze artigianali, cocktail d\'autore e cucina mediterranea di qualità.',
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsSection />
      <FeaturedSection />
      <TestimonialsSection />
      <OpeningHours />
      <MapSection />
    </>
  )
}
