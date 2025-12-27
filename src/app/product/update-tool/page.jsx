import CtaUpdateTool from "@/components/product/update-tool/cta";
import Difference from "@/components/product/update-tool/difference";
import HeroUpdateTool from "@/components/product/update-tool/hero";
import HowItWorks from "@/components/product/update-tool/how-the-process-works";
import WhyContribute from "@/components/product/update-tool/why-contribute";

export const metadata = {
  title: "Update Tool - Contribute to Geographic Database",
  description: "Help improve the world's largest open-source geographic database. Suggest additions, corrections, and updates to countries, states, and cities data. Join our global community of contributors.",
  keywords: ["update tool", "contribute data", "open source contribution", "geographic data", "community contributions", "data corrections"],
  openGraph: {
    title: "Update Tool - Contribute to Geographic Database",
    description: "Help improve the world's largest open-source geographic database. Join our global community of contributors.",
    url: "https://countrystatecity.in/product/update-tool/",
  },
  twitter: {
    title: "Update Tool - Contribute to Geographic Database",
    description: "Help improve the world's largest open-source geographic database. Join our global community of contributors.",
  },
  alternates: {
    canonical: "/product/update-tool/",
  },
};

export default function Page() {
  return (
    <>
      <HeroUpdateTool />
      <WhyContribute />
      <HowItWorks />
      <Difference />
      <CtaUpdateTool />
    </>
  );
}
