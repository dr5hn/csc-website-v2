import { AboutCta, AboutFounder, AboutIntro, AboutValues } from "@/components/about/content";
import AboutTimeline from "@/components/about/timeline";

export const metadata = {
  title: "About Us - Our Mission to Democratize Geographical Data",
  description: "Learn about CSC Database's mission to provide accurate, comprehensive geographical data to developers worldwide. Discover our values, timeline, and commitment to open-source development.",
  keywords: ["about CSC", "geographical data mission", "open source database", "developer tools", "data democratization"],
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
      <AboutIntro />
      <AboutTimeline />
      <AboutFounder />
      <AboutValues />
      <AboutCta />
    </>
  );
}
