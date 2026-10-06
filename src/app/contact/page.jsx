import SupportLinks from "@/components/support/support-links";
import SupportRouter from "@/components/support/support-router";
import JsonLd from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata = {
  title: "Contact CSC Database Support",
  description: "Contact the CSC Database team for API help, technical support, partnerships and general questions. Find the right support channel for your plan.",
  keywords: ["contact", "support", "help", "technical support", "API help", "partnerships", "CSC support"],
  alternates: {
    canonical: "/contact/",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/support.png"],
  },
  openGraph: {
    images: [{ url: "/og/support.png", width: 1200, height: 630 }],
    title: "Contact CSC Database - Support & Assistance",
    description: "Get expert help with geographical data APIs, technical support, and partnership opportunities.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Contact", path: "/contact/" }])} />
      <SupportRouter />
      <SupportLinks />
    </>
  );
}
