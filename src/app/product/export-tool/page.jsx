import CtaExportTool from "@/components/product/export-tool/cta";
import ExportPreview from "@/components/product/export-tool/export-formats";
import Features from "@/components/product/export-tool/features";
import HeroExportTool from "@/components/product/export-tool/hero";
import HowTheProcessWorks from "@/components/product/export-tool/how-the-process-works";
import ExportToolPricingSection from "@/components/product/export-tool/pricing";
import UseCases from "@/components/product/export-tool/usecases";
import WhyChoose from "@/components/product/export-tool/why-choose";

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
