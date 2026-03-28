import ChooseYourFormat from "@/components/product/database/choose-your-format";
import CLICallout from "@/components/product/database/cli-callout";
import DatabaseCTA from "@/components/product/database/cta";
import DatabaseSetup from "@/components/product/database/database-setup";
import ProductDatabaseHero from "@/components/product/database/hero";
import WhyChooseUs from "@/components/product/database/why-choose-us";

export const metadata = {
  title: "Geographic Database - 250+ Countries, 5000+ States, 150K+ Cities",
  description:
    "Access the world's most comprehensive open-source geographic database. Available via NPM, PyPI, and CLI. Download complete datasets in JSON, CSV, SQL, XML, and YAML formats. ODbL licensed for data, MIT for packages.",
  keywords: [
    "geographic database",
    "countries database",
    "states database",
    "cities database",
    "location data",
    "open source",
    "CSV",
    "JSON",
    "SQL",
    "XML",
    "YAML",
    "npm",
    "pypi",
    "cli",
    "countrystatecity",
  ],
  openGraph: {
    title: "Geographic Database - Complete World Location Data",
    description:
      "Download the world's most comprehensive geographic database with 250+ countries, 5000+ states, and 150K+ cities. Available via NPM, PyPI, and CLI.",
    url: "https://countrystatecity.in/product/database/",
  },
  twitter: {
    title: "Geographic Database - Complete World Location Data",
    description:
      "Download the world's most comprehensive geographic database with 250+ countries, 5000+ states, and 150K+ cities. Available via NPM, PyPI, and CLI.",
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
      <CLICallout />
      <DatabaseCTA />
    </>
  );
}
