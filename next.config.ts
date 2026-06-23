import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  output: undefined,
  typescript: {
    ignoreBuildErrors: true,
  },
  serverExternalPackages: ['@react-three/fiber', '@react-three/drei', 'three'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'wunderbarweb.it' },
    ],
    loader: 'default',
  },
}

export default withNextIntl(nextConfig)
