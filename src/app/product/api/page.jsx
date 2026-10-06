import CtaLink from "@/components/cta-link";
import ApiFeatures from "@/components/product/api/features";
import HeroApi from "@/components/product/api/hero";
import ApiIntegration from "@/components/product/api/integration";
import { buttonVariants } from "@/components/ui/button";
import CtaPanel from "@/components/ui/cta-panel";

import { STAT_DESCRIPTIONS } from "@/lib/stats";
import JsonLd from "@/components/json-ld";
import { apiApplicationSchema, breadcrumbSchema } from "@/lib/seo";

export const metadata = {
  title: "Country State City REST & GraphQL API",
  description: `Query ${STAT_DESCRIPTIONS.fullCoverage} over REST or GraphQL. Free API tier, fuzzy search and location autocomplete.`,
  keywords: ["REST API", "GraphQL API", "geographical data API", "countries API", "states API", "cities API", "location data", "developer API"],
  alternates: {
    canonical: "/product/api/",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/api.png"],
  },
  openGraph: {
    images: [{ url: "/og/api.png", width: 1200, height: 630 }],
    title: "CSC Database API - Fast & Reliable Geographical Data Access",
    description: "Power your applications with lightning-fast access to comprehensive geographical data via REST and GraphQL APIs.",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "API", path: "/product/api/" }])} />
      <JsonLd data={apiApplicationSchema()} />
      <HeroApi />
      <ApiFeatures />
      <ApiIntegration />
      <CtaPanel
        title="Free up to 3,000 requests a month."
        actions={
          <>
            <CtaLink
              href="https://app.countrystatecity.in?utm_source=website&utm_medium=cta&utm_content=api_page_bottom"
              location="api_bottom"
              track="api"
              className={buttonVariants()}
            >
              Get free API key →
            </CtaLink>
            <CtaLink href="/pricing" location="api_bottom_plans" className={buttonVariants({ variant: "white" })}>
              Compare plans
            </CtaLink>
          </>
        }
      >
        Paid plans from $5 add higher limits. Supporter adds fuzzy search; Professional adds GraphQL and the change feed.
      </CtaPanel>
    </>
  );
}
