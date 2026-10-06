import HeroUpdateTool from "@/components/product/update-tool/hero";
import UpdateToolFlow from "@/components/product/update-tool/flow";
import JsonLd from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata = {
  title: "Update Tool - Contribute Geographic Data",
  description: "Suggest additions and corrections to the countries, states and cities in the open-source CSC database. Join the community of contributors.",
  keywords: ["update tool", "contribute data", "open source contribution", "geographic data", "community contributions", "data corrections"],
  openGraph: {
    images: [{ url: "/og/update-tool.png", width: 1200, height: 630 }],
    title: "Update Tool - Contribute to Geographic Database",
    description: "Help improve the world's largest open-source geographic database. Join our global community of contributors.",
    url: "https://countrystatecity.in/product/update-tool/",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/update-tool.png"],
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
      <JsonLd data={breadcrumbSchema([{ name: "Update Tool", path: "/product/update-tool/" }])} />
      <HeroUpdateTool />
      <UpdateToolFlow />
    </>
  );
}
