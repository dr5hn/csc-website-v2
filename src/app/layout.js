import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CookieConsent from "@/components/cookie-consent";
import DocsAssistant from "@/components/docs-assistant";
import JsonLd from "@/components/json-ld";
import { websiteSchema } from "@/lib/seo";
import { STAT_DESCRIPTIONS } from "@/lib/stats";
import { Cal_Sans, Geist, Geist_Mono } from "next/font/google";

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

// Geist's latin subset has no arrows, so those glyphs fall through to the fallback list. The
// design is built against system-ui there (a short arrow), not next/font's Arial-metric fallback.
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["system-ui", "-apple-system", "sans-serif"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["ui-monospace", "Menlo", "monospace"],
});

export const metadata = {
  title: {
    default: "Countries, States & Cities API and Database | CSC Database",
    template: "%s | CSC Database"
  },
  description: `${STAT_DESCRIPTIONS.fullCoverage} via REST API, free database downloads and offline packages. Free API tier available.`,
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
    title: 'Countries, States & Cities API and Database',
    description: `${STAT_DESCRIPTIONS.fullCoverage} via REST API, free database downloads and offline packages. Free API tier available.`,
    siteName: 'CSC Database',
    images: [
      {
        url: '/og/home.png',
        width: 1200,
        height: 630,
        alt: 'CSC - Countries States Cities Database',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Countries, States & Cities API and Database',
    description: `${STAT_DESCRIPTIONS.fullCoverage} via REST API, free database downloads and offline packages. Free API tier available.`,
    images: ['/og/home.png'],
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
      { url: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
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
    "logo": "https://countrystatecity.in/web-app-manifest-512x512.png",
    "description": `Open geographic database and API covering ${STAT_DESCRIPTIONS.fullCoverage}`,
    "foundingDate": "2018",
    "sameAs": [
      "https://github.com/dr5hn/countries-states-cities-database"
    ]
  };

  return (
    <html lang="en" className={`${calSans.variable} ${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Hide the announcement bar before first paint if it was dismissed (interaction spec 6). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem('csc-promo-hidden')==='1')document.documentElement.dataset.promoHidden='1'}catch(e){}`,
          }}
        />
        <JsonLd data={jsonLd} />
        <JsonLd data={websiteSchema()} />
      </head>
      <body className="bg-white font-sans text-ink antialiased">
        <Header />
        <main id="main-content" role="main">
          {children}
        </main>
        <Footer />
        <DocsAssistant />
        <CookieConsent />
      </body>
    </html>
  );
}