import HeroUpdateTool from "@/components/product/update-tool/hero";
import UpdateToolFlow from "@/components/product/update-tool/flow";

export const metadata = {
  title: "Update Tool - Contribute to Geographic Database",
  description: "Help improve the world's largest open-source geographic database. Suggest additions, corrections, and updates to countries, states, and cities data. Join our global community of contributors.",
  keywords: ["update tool", "contribute data", "open source contribution", "geographic data", "community contributions", "data corrections"],
  openGraph: {
    images: [{ url: "/og/update-tool.jpg", width: 1200, height: 630 }],
    title: "Update Tool - Contribute to Geographic Database",
    description: "Help improve the world's largest open-source geographic database. Join our global community of contributors.",
    url: "https://countrystatecity.in/product/update-tool/",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/update-tool.jpg"],
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
      <UpdateToolFlow />
    </>
  );
}
