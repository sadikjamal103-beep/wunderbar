import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin — WUNDERBAR',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body style={{ background: '#08070A', color: '#F5F0E8', margin: 0, fontFamily: 'Inter, system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
