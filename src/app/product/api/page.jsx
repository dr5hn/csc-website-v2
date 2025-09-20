import CTA from "@/components/cta";
import EasyIntegration from "@/components/product/api/api-integration";
import HeroApi from "@/components/product/api/hero";
import ApiPricingSection from "@/components/product/api/pricing";
import WhyChooseOurApi from "@/components/product/api/why-choose-our-api";

export const metadata = {
  title: "REST & GraphQL API - Lightning Fast Geographical Data Access",
  description: "Access accurate geographical data from 250+ countries, 5,000+ states, and 151,000+ cities via REST and GraphQL APIs. Sub-200ms response times, 99.9% uptime SLA.",
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
      <CTA />
    </>
  );
}
