import AboutIntro from "@/components/about-intro";
import InnovationValues from "@/components/innovation";
import MissionValues from "@/components/mission-values";
import SocialProof from "@/components/social-proof";
// import Stats from "@/components/stats";
import Timeline from "@/components/timeline";

export const metadata = {
  title: "About Us - Our Mission to Democratize Geographical Data",
  description: "Learn about CSC Database's mission to provide accurate, comprehensive geographical data to developers worldwide. Discover our values, timeline, and commitment to open-source development.",
  keywords: ["about CSC", "geographical data mission", "open source database", "developer tools", "data democratization"],
  openGraph: {
    title: "About CSC Database - Our Story & Mission",
    description: "Discover how CSC Database is revolutionizing access to geographical data for developers worldwide.",
    type: "website",
  },
};

export default function About() {
  return (
    <>
      <AboutIntro />
      <MissionValues />
      <Timeline />
      <InnovationValues />
      {/* <Stats /> */}
      <SocialProof />
    </>
  );
}
