import PricingHero from "@/components/pricing/hero";
import PricingFaq from "@/components/pricing/faq";
import PricingTabs from "@/components/pricing/pricing-tabs";
import JsonLd from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata = {
  title: "Pricing - Country State City API Plans",
  description: "Compare Community, Starter, Supporter, Professional and Business API plans, from free access to higher limits. Export credits are pay once.",
  keywords: ["pricing", "plans", "API pricing", "database pricing", "geographical data pricing", "developer pricing", "enterprise solutions"],
  alternates: {
    canonical: "/pricing/",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/pricing.png"],
  },
  openGraph: {
    images: [{ url: "/og/pricing.png", width: 1200, height: 630 }],
    title: "CSC Database Pricing - Flexible Plans for Every Need",
    description: "Choose from free Community to Business plans. Find the perfect plan for your geographical data needs.",
    type: "website",
  },
};

export default function Pricing() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Pricing", path: "/pricing/" }])} />
      <PricingHero />
      <PricingTabs />
      <PricingFaq />
    </>
  );
}
