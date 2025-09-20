import CTA from "@/components/cta";
import EasyIntegration from "@/components/product/api/api-integration";
import HeroApi from "@/components/product/api/hero";
import ApiPricingSection from "@/components/product/api/pricing";
import WhyChooseOurApi from "@/components/product/api/why-choose-our-api";

import { STAT_DESCRIPTIONS, TEXT_STATS } from "@/lib/stats";

export const metadata = {
  title: "REST & GraphQL API - Lightning Fast Geographical Data Access",
  description: `Access accurate geographical data from ${STAT_DESCRIPTIONS.fullCoverageAlt} via REST and GraphQL APIs. ${STAT_DESCRIPTIONS.slaPromise}.`,
  keywords: ["REST API", "GraphQL API", "geographical data API", "countries API", "states API", "cities API", "location data", "developer API"],
  openGraph: {
    title: "CSC Database API - Fast & Reliable Geographical Data Access",
    description: "Power your applications with lightning-fast access to comprehensive geographical data via REST and GraphQL APIs.",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <HeroApi />
      <WhyChooseOurApi />
      <EasyIntegration />
      <ApiPricingSection />
      <CTA href="https://forms.gle/ckZ8Gub6jS9sUihJA" target="_blank" />
    </>
  );
}
