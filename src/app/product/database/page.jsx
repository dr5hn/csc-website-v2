import CtaLink from "@/components/cta-link";
import DatabaseFormats from "@/components/product/database/formats";
import DatabaseHero from "@/components/product/database/hero";
import DatabaseSchema from "@/components/product/database/schema";
import DatabaseSetup from "@/components/product/database/setup";
import { REPO_URL } from "@/components/star-button";
import { buttonVariants } from "@/components/ui/button";
import CtaPanel from "@/components/ui/cta-panel";
import { TEXT_STATS } from "@/lib/stats";

export const metadata = {
  title: `Geographic Database - ${TEXT_STATS.countries} Countries, ${TEXT_STATS.states} States, ${TEXT_STATS.cities} Cities`,
  description:
    "Access the world's most comprehensive open-source geographic database. Available via NPM, PyPI, and CLI. Download complete datasets in JSON, CSV, SQL, XML, and YAML formats. ODbL licensed for data, MIT for packages.",
  keywords: [
    "geographic database",
    "countries database",
    "states database",
    "cities database",
    "location data",
    "open source",
    "CSV",
    "JSON",
    "SQL",
    "XML",
    "YAML",
    "npm",
    "pypi",
    "cli",
    "countrystatecity",
  ],
  openGraph: {
    images: [{ url: "/og/database.jpg", width: 1200, height: 630 }],
    title: "Geographic Database - Complete World Location Data",
    description:
      `Download the world's most comprehensive geographic database with ${TEXT_STATS.countries} countries, ${TEXT_STATS.states} states, and ${TEXT_STATS.cities} cities. Available via NPM, PyPI, and CLI.`,
    url: "https://countrystatecity.in/product/database/",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/database.jpg"],
    title: "Geographic Database - Complete World Location Data",
    description:
      `Download the world's most comprehensive geographic database with ${TEXT_STATS.countries} countries, ${TEXT_STATS.states} states, and ${TEXT_STATS.cities} cities. Available via NPM, PyPI, and CLI.`,
  },
  alternates: {
    canonical: "/product/database/",
  },
};

export default function Page() {
  return (
    <>
      <DatabaseHero />
      <DatabaseSchema />
      <DatabaseFormats />
      <DatabaseSetup />
      <CtaPanel
        tone="live"
        title="Rather not host it yourself?"
        actions={
          <>
            <CtaLink href="/product/api" location="database_bottom" className={buttonVariants({ variant: "ink" })}>
              See the API →
            </CtaLink>
            <CtaLink href={REPO_URL} location="database_bottom_contribute" track="github" className={buttonVariants({ variant: "white" })}>
              Contribute a fix
            </CtaLink>
          </>
        }
      >
        The same records as a live API, with search and a change feed. 3,000 free requests a month.
      </CtaPanel>
    </>
  );
}
