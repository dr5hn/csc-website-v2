import DataSection from "@/components/home/data-section";
import EcosystemTeaser from "@/components/home/ecosystem-teaser";
import HomeHero from "@/components/home/hero";
import PricingPanel from "@/components/home/pricing-panel";
import Testimonials from "@/components/home/testimonials";
import ScrollTracker from "@/components/scroll-tracker";

export default function Home() {
  return (
    <>
      <ScrollTracker pageName="Home" />
      <HomeHero />
      <EcosystemTeaser />
      <DataSection />
      <Testimonials />
      <PricingPanel />
    </>
  );
}
