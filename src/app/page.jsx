import ApiShowcase from "@/components/api-showcase";
import CommunitySection from "@/components/community";
import CTA from "@/components/cta";
import HeroSection from "@/components/hero";
import Products from "@/components/products";
import SkipTheHassle from "@/components/skip-the-hassle";
import Stats from "@/components/stats";
import { Testimonials } from "@/components/ui/animated-testimonials";
import WhyChooseUs from "@/components/why-choose-us";
import ScrollTracker from "@/components/scroll-tracker";
import MmslSlimBanner from "@/components/mmsl-slim-banner";

export default function Home() {
  return (
    <>
      <ScrollTracker pageName="Home" />
      <HeroSection />
      <MmslSlimBanner />
      <ApiShowcase />
      <Stats />
      <WhyChooseUs />
      <Products />
      <SkipTheHassle />
      <Testimonials />
      <CTA href="/product/api"/>
      <CommunitySection />
    </>
  );
}
