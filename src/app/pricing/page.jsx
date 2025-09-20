import FAQs from "@/components/faq";
import PricingSection from "@/components/pricing";
import PricingCTA from "@/components/pricing-cta";
import PricingHero from "@/components/pricing-hero";

export const metadata = {
  title: "Pricing Plans - Choose Your Perfect Geographical Data Solution",
  description: "Flexible pricing plans for CSC Database services. From free tier to enterprise solutions. API access, database exports, and premium support options available.",
  keywords: ["pricing", "plans", "API pricing", "database pricing", "geographical data pricing", "developer pricing", "enterprise solutions"],
  openGraph: {
    title: "CSC Database Pricing - Flexible Plans for Every Need",
    description: "Choose from free tier to enterprise solutions. Find the perfect plan for your geographical data needs.",
    type: "website",
  },
};

export default function Pricing() {
  return (
    <>
      <PricingHero />
      <PricingSection />
      <FAQs />
      <PricingCTA />
    </>
  );
}
