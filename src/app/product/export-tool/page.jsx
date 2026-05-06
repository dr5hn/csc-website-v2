import CtaExportTool from "@/components/product/export-tool/cta";
import ExportPreview from "@/components/product/export-tool/export-formats";
import Features from "@/components/product/export-tool/features";
import HeroExportTool from "@/components/product/export-tool/hero";
import HowTheProcessWorks from "@/components/product/export-tool/how-the-process-works";
import ExportToolPricingSection from "@/components/product/export-tool/pricing";
import UseCases from "@/components/product/export-tool/usecases";
import WhyChoose from "@/components/product/export-tool/why-choose";

export const metadata = {
  title: "Export Tool - Custom Geographic Data Downloads",
  description: "Export custom geographic datasets in 13 formats — JSON, CSV, Excel, Markdown, XML, YAML, NDJSON, SQL, PostgreSQL, SQL Server, SQLite3, MongoDB, GeoJSON. Filter by region, subregion, or up to 10 countries; translate names to 200+ locales; bundle flag images. Pay once, use forever.",
  keywords: ["export tool", "data export", "geographic data download", "custom dataset", "CSV export", "JSON export", "Excel export", "PostgreSQL export", "GeoJSON", "SQL export", "translation locale", "multi-country filter"],
  openGraph: {
    title: "Export Tool - Custom Geographic Data Downloads",
    description: "13 export formats including JSON, CSV, Excel, PostgreSQL, GeoJSON. Filter by region or up to 10 countries, translate to 200+ locales, bundle flag images.",
    url: "https://countrystatecity.in/product/export-tool/",
  },
  twitter: {
    title: "Export Tool - Custom Geographic Data Downloads",
    description: "13 export formats including JSON, CSV, Excel, PostgreSQL, GeoJSON. Filter by region or up to 10 countries, translate to 200+ locales, bundle flag images.",
  },
  alternates: {
    canonical: "/product/export-tool/",
  },
};

export default function Page() {
  return (
    <>
      <HeroExportTool />
      <WhyChoose />
      <HowTheProcessWorks />
      <Features />
      <ExportPreview />
      <UseCases />
      <ExportToolPricingSection />
      <CtaExportTool />
    </>
  );
}
