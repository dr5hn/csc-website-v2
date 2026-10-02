import ExportWorkbench from "@/components/product/export-tool/workbench";

export const metadata = {
  title: "Export Tool - Custom Geographic Data Downloads",
  description: "Export custom geographic datasets in 13 formats — JSON, CSV, Excel, Markdown, XML, YAML, NDJSON, SQL, PostgreSQL, SQL Server, SQLite3, MongoDB, GeoJSON. Filter by region, subregion, or up to 10 countries; translate names to 200+ locales; bundle flag images. Pay once, use forever.",
  keywords: ["export tool", "data export", "geographic data download", "custom dataset", "CSV export", "JSON export", "Excel export", "PostgreSQL export", "GeoJSON", "SQL export", "translation locale", "multi-country filter"],
  openGraph: {
    images: [{ url: "/og/export-tool.jpg", width: 1200, height: 630 }],
    title: "Export Tool - Custom Geographic Data Downloads",
    description: "13 export formats including JSON, CSV, Excel, PostgreSQL, GeoJSON. Filter by region or up to 10 countries, translate to 200+ locales, bundle flag images.",
    url: "https://countrystatecity.in/product/export-tool/",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/export-tool.jpg"],
    title: "Export Tool - Custom Geographic Data Downloads",
    description: "13 export formats including JSON, CSV, Excel, PostgreSQL, GeoJSON. Filter by region or up to 10 countries, translate to 200+ locales, bundle flag images.",
  },
  alternates: {
    canonical: "/product/export-tool/",
  },
};

export default function Page() {
  return <ExportWorkbench />;
}
