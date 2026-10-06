import { AboutCta, AboutFounder, AboutIntro, AboutValues } from "@/components/about/content";
import AboutTimeline from "@/components/about/timeline";
import JsonLd from "@/components/json-ld";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata = {
  title: "About CSC Database - Open Geographic Data",
  description: "CSC Database is an open-source project that gives developers accurate country, state and city data. Read our mission, values and timeline.",
  keywords: ["about CSC", "geographical data mission", "open source database", "developer tools", "data democratization"],
  alternates: {
    canonical: "/about/",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/about.jpg"],
  },
  openGraph: {
    images: [{ url: "/og/about.jpg", width: 1200, height: 630 }],
    title: "About CSC Database - Our Story & Mission",
    description: "Discover how CSC Database is revolutionizing access to geographical data for developers worldwide.",
    type: "website",
  },
};

export default function About() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "About", path: "/about/" }])} />
      <AboutIntro />
      <AboutTimeline />
      <AboutFounder />
      <AboutValues />
      <AboutCta />
    </>
  );
}
