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
  description: "Export custom geographic datasets in your preferred format. Choose specific countries, states, or cities and download in JSON, CSV, SQL, XML, or YAML. Pay once, use forever.",
  keywords: ["export tool", "data export", "geographic data download", "custom dataset", "CSV export", "JSON export", "SQL export"],
  openGraph: {
    title: "Export Tool - Custom Geographic Data Downloads",
    description: "Export custom geographic datasets in your preferred format. Choose specific regions and download in multiple formats.",
    url: "https://countrystatecity.in/product/export-tool/",
  },
  twitter: {
    title: "Export Tool - Custom Geographic Data Downloads",
    description: "Export custom geographic datasets in your preferred format. Choose specific regions and download in multiple formats.",
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
