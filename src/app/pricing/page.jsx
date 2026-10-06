import PricingHero from "@/components/pricing/hero";
import PricingFaq from "@/components/pricing/faq";
import PricingTabs from "@/components/pricing/pricing-tabs";

export const metadata = {
  title: "Pricing Plans - Choose Your Perfect Geographical Data Solution",
  description: "Flexible pricing plans for CSC Database services. Free Community tier, Supporter, Professional, and Business plans. API access, database exports, and premium support options available.",
  keywords: ["pricing", "plans", "API pricing", "database pricing", "geographical data pricing", "developer pricing", "enterprise solutions"],
  alternates: {
    canonical: "/pricing/",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/pricing.jpg"],
  },
  openGraph: {
    images: [{ url: "/og/pricing.jpg", width: 1200, height: 630 }],
    title: "CSC Database Pricing - Flexible Plans for Every Need",
    description: "Choose from free Community to Business plans. Find the perfect plan for your geographical data needs.",
    type: "website",
  },
};

export default function Pricing() {
  return (
    <>
      <PricingHero />
      <PricingTabs />
      <PricingFaq />
    </>
  );
}
