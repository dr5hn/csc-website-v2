export const dynamic = "force-static";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://countrystatecity.in/sitemap.xml",
    host: "https://countrystatecity.in",
  };
}
