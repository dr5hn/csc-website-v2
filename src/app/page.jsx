import DataSection from "@/components/home/data-section";
import EcosystemTeaser from "@/components/home/ecosystem-teaser";
import HomeHero from "@/components/home/hero";
import PricingPanel from "@/components/home/pricing-panel";
import Testimonials from "@/components/home/testimonials";
import ScrollTracker from "@/components/scroll-tracker";
import { STAT_DESCRIPTIONS } from "@/lib/stats";

export const metadata = {
  title: { absolute: "Countries, States & Cities API and Database | CSC Database" },
  description: `${STAT_DESCRIPTIONS.fullCoverage} as a REST API, downloads and NPM/PyPI packages. Free tier available.`,
};

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
