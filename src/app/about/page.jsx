import AboutIntro from "@/components/about-intro";
import InnovationValues from "@/components/innovation";
import MissionValues from "@/components/mission-values";
import SocialProof from "@/components/social-proof";
// import Stats from "@/components/stats";
import Timeline from "@/components/timeline";

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
