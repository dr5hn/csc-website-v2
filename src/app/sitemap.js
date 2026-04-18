export const dynamic = "force-static";

const BASE_URL = "https://countrystatecity.in";

const ROUTES = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/ecosystem", priority: 0.9, changeFrequency: "weekly" },
  { path: "/product/api", priority: 0.9, changeFrequency: "weekly" },
  { path: "/product/export-tool", priority: 0.9, changeFrequency: "weekly" },
  { path: "/product/database", priority: 0.8, changeFrequency: "weekly" },
  { path: "/product/update-tool", priority: 0.7, changeFrequency: "weekly" },
  { path: "/pricing", priority: 0.9, changeFrequency: "weekly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/faqs", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.5, changeFrequency: "monthly" },
];

export default function sitemap() {
  const lastModified = new Date();

  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
