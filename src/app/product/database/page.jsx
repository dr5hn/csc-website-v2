import ChooseYourFormat from "@/components/product/database/choose-your-format";
import DatabaseCTA from "@/components/product/database/cta";
import DatabaseSetup from "@/components/product/database/database-setup";
import ProductDatabaseHero from "@/components/product/database/hero";
import WhyChooseUs from "@/components/product/database/why-choose-us";

export const metadata = {
  title: "Geographic Database - 250+ Countries, 5000+ States, 150K+ Cities",
  description: "Access the world's most comprehensive open-source geographic database. Download complete datasets of countries, states, and cities in JSON, CSV, SQL, XML, and YAML formats. Free for commercial use under MIT license.",
  keywords: ["geographic database", "countries database", "states database", "cities database", "location data", "open source", "CSV", "JSON", "SQL", "XML", "YAML"],
  openGraph: {
    title: "Geographic Database - Complete World Location Data",
    description: "Download the world's most comprehensive geographic database with 250+ countries, 5000+ states, and 150K+ cities. Multiple formats available.",
    url: "https://countrystatecity.in/product/database/",
  },
  twitter: {
    title: "Geographic Database - Complete World Location Data",
    description: "Download the world's most comprehensive geographic database with 250+ countries, 5000+ states, and 150K+ cities.",
  },
  alternates: {
    canonical: "/product/database/",
  },
};

export default function Page() {
  return (
    <>
      <ProductDatabaseHero />
      <WhyChooseUs />
      <ChooseYourFormat />
      <DatabaseSetup />
      <DatabaseCTA />
    </>
  );
}
