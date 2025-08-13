import CTA from "@/components/cta";
import HeroSection from "@/components/hero";
import Products from "@/components/products";
import Stats from "@/components/stats";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Stats />
      <Products />
      <CTA />
    </>
  );
}
