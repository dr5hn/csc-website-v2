import CtaLink from "@/components/cta-link";
import EcosystemChannels from "@/components/ecosystem/channels";
import EcosystemHero from "@/components/ecosystem/hero";
import EcosystemPackages from "@/components/ecosystem/packages";
import ScrollTracker from "@/components/scroll-tracker";
import { buttonVariants } from "@/components/ui/button";
import CtaPanel from "@/components/ui/cta-panel";
import JsonLd from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata = {
  title: "Ecosystem - GitHub, API, NPM, PyPI & CLI",
  description:
    "The CountryStateCity platform spans GitHub, REST API, NPM, PyPI, CLI, and bulk exports — one source of truth for country, state, and city data.",
  alternates: {
    canonical: "/ecosystem/",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/ecosystem.png"],
  },
  openGraph: {
    images: [{ url: "/og/ecosystem.png", width: 1200, height: 630 }],
    title: "CountryStateCity Ecosystem",
    description:
      "One platform. Every channel. GitHub, API, NPM, PyPI, CLI, and export tool — all from the same source of truth.",
    url: "https://countrystatecity.in/ecosystem",
    type: "website",
  },
};

export default function EcosystemPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Ecosystem", path: "/ecosystem/" }])} />
      <ScrollTracker pageName="Ecosystem" />
      <EcosystemHero />
      <EcosystemChannels />
      <EcosystemPackages />
      <CtaPanel
        title="Not sure where to start?"
        actions={
          <>
            <CtaLink
              href="https://app.countrystatecity.in?utm_source=website&utm_medium=cta&utm_content=ecosystem_bottom"
              location="ecosystem_bottom"
              track="api"
              className={buttonVariants()}
            >
              Get free API key →
            </CtaLink>
            <CtaLink href="/pricing" location="ecosystem_bottom_plans" className={buttonVariants({ variant: "white" })}>
              Compare plans
            </CtaLink>
          </>
        }
      >
        Most teams start with the API: 3,000 free requests a month, no card needed.
      </CtaPanel>
    </>
  );
}
