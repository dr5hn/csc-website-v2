import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { TEXT_STATS, STAT_DESCRIPTIONS } from "@/lib/stats";
import { Cal_Sans } from "next/font/google";

const calSans = Cal_Sans({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-cal-loaded",
  display: "swap",
  // Cal Sans isn't in Next.js's font-metrics DB, so it can't synthesize a
  // size-adjusted fallback (hence the "Failed to find font override values"
  // warning). Opt out of that and supply an explicit fallback chain instead.
  adjustFontFallback: false,
  fallback: ["system-ui", "arial", "sans-serif"],
});

export const metadata = {
  title: {
    default: "Country State City API - World's Most Comprehensive Geographic Database for Developers",
    template: "%s | CSC Database"
  },
  description: `Access ${TEXT_STATS.countries} countries, ${TEXT_STATS.states} states & ${TEXT_STATS.cities} cities via fast REST API. Trusted by ${TEXT_STATS.developers} developers with ${TEXT_STATS.uptime} uptime. Free tier available - start building today!`,
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
    title: 'Country State City API - World\'s Most Comprehensive Geographic Database for Developers',
    description: `Access ${TEXT_STATS.countries} countries, ${TEXT_STATS.states} states & ${TEXT_STATS.cities} cities via fast REST API. Trusted by ${TEXT_STATS.developers} developers with ${TEXT_STATS.uptime} uptime.`,
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
    title: 'Country State City API - World\'s Most Comprehensive Geographic Database for Developers',
    description: `Access ${TEXT_STATS.countries} countries, ${TEXT_STATS.states} states & ${TEXT_STATS.cities} cities via fast REST API. Trusted by ${TEXT_STATS.developers} developers with ${TEXT_STATS.uptime} uptime.`,
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
    "foundingDate": "2018",
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
    <html lang="en" className={calSans.variable}>
      <head>
        {/* Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=G-XPF0QLDXVS`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XPF0QLDXVS');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased font-cal">
        <Header />
        <main id="main-content" className="mt-[7rem]" role="main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}