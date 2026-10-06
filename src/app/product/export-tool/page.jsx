import ExportWorkbench from "@/components/product/export-tool/workbench";
import JsonLd from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata = {
  title: "Export Country, State & City Data",
  description: "Export country, state and city data in 13 formats, including JSON, CSV, Excel, SQL and GeoJSON. Filter by region, translate names. Pay once.",
  keywords: ["export tool", "data export", "geographic data download", "custom dataset", "CSV export", "JSON export", "Excel export", "PostgreSQL export", "GeoJSON", "SQL export", "translation locale", "multi-country filter"],
  openGraph: {
    images: [{ url: "/og/export-tool.png", width: 1200, height: 630 }],
    title: "Export Tool - Custom Geographic Data Downloads",
    description: "13 export formats including JSON, CSV, Excel, PostgreSQL, GeoJSON. Filter by region or up to 10 countries, translate names, bundle flag images.",
    url: "https://countrystatecity.in/product/export-tool/",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/export-tool.png"],
    title: "Export Tool - Custom Geographic Data Downloads",
    description: "13 export formats including JSON, CSV, Excel, PostgreSQL, GeoJSON. Filter by region or up to 10 countries, translate names, bundle flag images.",
  },
  alternates: {
    canonical: "/product/export-tool/",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Export Tool", path: "/product/export-tool/" }])} />
      <ExportWorkbench />
    </>
  );
}
