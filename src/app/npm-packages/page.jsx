import NpmPackagesLanding from "@/components/npm-packages-landing";
import CtaLink from "@/components/cta-link";
import JsonLd from "@/components/json-ld";
import { buttonVariants } from "@/components/ui/button";
import CtaPanel from "@/components/ui/cta-panel";
import { NPM_FAQS } from "@/lib/npm-packages";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";

export const metadata = {
  title: "npm Packages for Country, State & City Data",
  description:
    "Nine official @countrystatecity npm packages: countries, states and cities, timezones, currencies, dial codes, postcodes, GeoJSON and translations. Offline, no API key.",
  keywords: [
    "country state city npm",
    "country-state-city npm",
    "npm country state city",
    "countries states cities npm package",
    "city data npm",
  ],
  alternates: {
    canonical: "/npm-packages/",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/api.png"],
  },
  openGraph: {
    images: [{ url: "/og/api.png", width: 1200, height: 630 }],
    title: "Official npm packages for country, state and city data",
    description:
      "Nine packages under the @countrystatecity scope, published from the same dataset the API serves.",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "npm Packages", path: "/npm-packages/" }])} />
      <JsonLd data={faqSchema(NPM_FAQS)} />
      <NpmPackagesLanding />
      <CtaPanel
        title="Need live data instead of a snapshot?"
        actions={
          <>
            <CtaLink
              href="https://app.countrystatecity.in?utm_source=website&utm_medium=cta&utm_content=npm-packages_bottom"
              location="npm-packages_bottom"
              track="api"
              className={buttonVariants()}
            >
              Get free API key →
            </CtaLink>
            <CtaLink href="/product/database" location="npm-packages_bottom_db" className={buttonVariants({ variant: "white" })}>
              Download the database
            </CtaLink>
          </>
        }
      >
        The API serves the same dataset over REST and GraphQL, with fuzzy search, autocomplete and a change feed.
      </CtaPanel>
    </>
  );
}
