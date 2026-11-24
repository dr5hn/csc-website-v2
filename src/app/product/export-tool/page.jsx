import ExportWorkbench from "@/components/product/export-tool/workbench";
import JsonLd from "@/components/json-ld";
import { EXPORT_DESCRIPTION, breadcrumbSchema } from "@/lib/seo";

export const metadata = {
  title: "Export Country, State, County, City & Postcode Data",
  description: EXPORT_DESCRIPTION,
  keywords: ["export tool", "data export", "geographic data download", "custom dataset", "county data download", "postcode data download", "CSV export", "JSON export", "Excel export", "PostgreSQL export", "GeoJSON", "SQL export", "translation locale", "multi-country filter"],
  openGraph: {
    images: [{ url: "/og/export-tool.png", width: 1200, height: 630 }],
    title: "Export Tool - Custom Geographic Data Downloads",
    description: EXPORT_DESCRIPTION,
    url: "https://countrystatecity.in/product/export-tool/",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/export-tool.png"],
    title: "Export Tool - Custom Geographic Data Downloads",
    description: EXPORT_DESCRIPTION,
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
