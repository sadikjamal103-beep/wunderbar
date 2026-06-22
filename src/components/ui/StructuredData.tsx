export default function StructuredData() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Restaurant',
        '@id': 'https://wunderbarweb.it/#restaurant',
        name: 'WUNDERBAR',
        url: 'https://wunderbarweb.it',
        description: 'Restaurant, Pizzeria e Cocktail Bar — Un\'esperienza gastronomica unica.',
        telephone: '+390471000000',
        email: 'info@wunderbarweb.it',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Via Roma 1',
          addressLocality: 'Bolzano',
          addressRegion: 'BZ',
          postalCode: '39100',
          addressCountry: 'IT',
        },
        geo: { '@type': 'GeoCoordinates', latitude: 46.49, longitude: 11.35 },
        openingHoursSpecification: [
          { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday'], opens: '12:00', closes: '01:00' },
          { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Friday','Saturday'], opens: '12:00', closes: '02:00' },
          { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday'], opens: '18:00', closes: '01:00' },
        ],
        servesCuisine: ['Italian', 'Mediterranean', 'Pizza'],
        priceRange: '€€',
        currenciesAccepted: 'EUR',
        paymentAccepted: 'Cash, Credit Card',
        hasMenu: 'https://wunderbarweb.it/it/menu',
        sameAs: [
          'https://instagram.com/wunderbar',
          'https://facebook.com/wunderbar',
          'https://maps.app.goo.gl/PSSB4ycYm1rUsEJG7',
        ],
        image: ['https://wunderbarweb.it/og-image.jpg'],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '127',
          bestRating: '5',
        },
        amenityFeature: [
          { '@type': 'LocationFeatureSpecification', name: 'Cocktail Bar', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Outdoor Seating', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'Reservations', value: true },
          { '@type': 'LocationFeatureSpecification', name: 'WiFi', value: true },
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://wunderbarweb.it/#website',
        url: 'https://wunderbarweb.it',
        name: 'WUNDERBAR',
        inLanguage: ['it', 'en', 'de', 'fr'],
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
