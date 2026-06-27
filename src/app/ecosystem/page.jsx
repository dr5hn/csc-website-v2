import EcosystemHero from "@/components/ecosystem-hero";
import EcosystemChannels from "@/components/ecosystem-channels";
import EcosystemPackages from "@/components/ecosystem-packages";
import Stats from "@/components/stats";
import CTA from "@/components/cta";
import ScrollTracker from "@/components/scroll-tracker";
import MmslSlimBanner from "@/components/mmsl-slim-banner";

export const metadata = {
  title: "Ecosystem — CountryStateCity",
  description:
    "The CountryStateCity platform spans GitHub, REST API, NPM, PyPI, CLI, and bulk exports — one source of truth for country, state, and city data.",
  alternates: {
    canonical: "/ecosystem",
  },
  openGraph: {
    title: "CountryStateCity Ecosystem",
    description:
      "One platform. Every channel. GitHub, API, NPM, PyPI, CLI, and export tool — all from the same source of truth.",
    url: "https://countrystatecity.in/ecosystem",
    type: "website",
  },
};

export default function EcosystemPage() {
  return (
    <>
      <ScrollTracker pageName="Ecosystem" />
      <EcosystemHero />
      <MmslSlimBanner />
      <EcosystemChannels />
      <Stats />
      <EcosystemPackages />
      <CTA href="/product/api" />
    </>
  );
}
