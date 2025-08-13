import CommunitySection from "@/components/community";
import CTA from "@/components/cta";
import HeroSection from "@/components/hero";
import Products from "@/components/products";
import SkipTheHassle from "@/components/skip-the-hassle";
import Stats from "@/components/stats";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Stats />
      <Products />
      <SkipTheHassle />
      <CTA />
      <CommunitySection />
    </>
  );
}
