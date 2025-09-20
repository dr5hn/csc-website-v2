import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { STAT_DESCRIPTIONS } from "@/lib/stats";

export const metadata = {
  title: {
    default: "CSC - Countries States Cities Database | World's Most Comprehensive Geographical Data",
    template: "%s | CSC Database"
  },
  description: `Access accurate geographical data from ${STAT_DESCRIPTIONS.fullCoverage}. ${STAT_DESCRIPTIONS.developerTrust}. Get started for free.`,
  keywords: ["countries", "states", "cities", "geographical database", "API", "location data", "world data", "country data", "REST API", "GraphQL", "CSV", "JSON", "SQL"],
  authors: [{ name: "CSC Team" }],
  creator: "CSC Database",
  publisher: "CSC Database",
  metadataBase: new URL('https://countrystatecity.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://countrystatecity.in',
    title: 'CSC - World\'s Most Comprehensive Geographical Database',
    description: `Power your applications with accurate data from ${STAT_DESCRIPTIONS.fullCoverage}. Trusted by developers worldwide.`,
    siteName: 'CSC Database',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CSC - Countries States Cities Database',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CSC - World\'s Most Comprehensive Geographical Database',
    description: `Access accurate data from ${STAT_DESCRIPTIONS.fullCoverage}. Get started for free.`,
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CSC Database",
    "alternateName": "Countries States Cities Database",
    "url": "https://countrystatecity.in",
    "logo": "https://countrystatecity.in/logo.png",
    "description": `World's most comprehensive geographical database providing data for ${STAT_DESCRIPTIONS.fullCoverage}`,
    "foundingDate": "2019",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-XXX-XXX-XXXX",
      "contactType": "customer service",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://github.com/dr5hn/countries-states-cities-database"
    ],
    "offers": [
      {
        "@type": "Offer",
        "name": "API Access",
        "description": "REST and GraphQL API access to geographical data",
        "category": "API Service"
      },
      {
        "@type": "Offer", 
        "name": "Database Export",
        "description": "Download geographical data in multiple formats",
        "category": "Data Service"
      }
    ],
    "audience": {
      "@type": "Audience",
      "audienceType": "Developers, Businesses, Data Analysts"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased font-cal">
        <Header />
        <main id="main-content" className="mt-16" role="main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}