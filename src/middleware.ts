import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['it', 'en', 'de', 'fr'],
  defaultLocale: 'it',
  localeDetection: true,
})

export const config = {
  matcher: ['/((?!api|_next|_vercel|admin|.*\\..*).*)'],
}
