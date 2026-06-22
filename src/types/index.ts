export interface MenuItem {
  id: string
  name: string
  nameIt?: string
  nameEn?: string
  nameDe?: string
  nameFr?: string
  description: string
  descriptionIt?: string
  descriptionEn?: string
  descriptionDe?: string
  descriptionFr?: string
  price: number
  category: MenuCategory
  tags?: string[]
  allergens?: string[]
  image?: string
  isNew?: boolean
  isSignature?: boolean
  isVegetarian?: boolean
  isVegan?: boolean
  isGlutenFree?: boolean
  isSpicy?: boolean
  alcohol?: number
}

export type MenuCategory =
  | 'cocktails'
  | 'signature'
  | 'wines'
  | 'beers'
  | 'soft'
  | 'pizza'
  | 'seafood'
  | 'meat'
  | 'desserts'
  | 'starters'

export interface Testimonial {
  id: string
  name: string
  text: string
  rating: number
  date: string
  avatar?: string
}

export interface GalleryItem {
  id: string
  src: string
  alt: string
  category: 'food' | 'drinks' | 'ambience' | 'events'
  width: number
  height: number
}

export interface Reservation {
  id?: string
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: number
  message?: string
  status?: 'pending' | 'confirmed' | 'cancelled'
  createdAt?: string
}

export interface OpeningHour {
  day: string
  hours: string
  closed?: boolean
}
