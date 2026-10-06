import CtaLink from "@/components/cta-link";

const SOURCES = [
  ["Database · since 2018", "The original open dataset, its contributions and versioned releases.", "https://github.com/dr5hn/countries-states-cities-database"],
  ["Hosted API", "REST endpoints, API clients and plan-specific capabilities.", "https://docs.countrystatecity.in/api/introduction"],
  ["JavaScript packages", "Offline snapshots, TypeScript types and package release history.", "https://github.com/dr5hn/countrystatecity-npm"],
  ["Python packages", "Offline data packages and the Python API client.", "https://github.com/dr5hn/countrystatecity-pypi"],
];

/** Present verifiable project history without estimated star milestones. */
export default function AboutTimeline() {
  return (
    <section className="wrap-flush flex flex-col gap-5 pb-[clamp(56px,7vw,104px)]">
      <h2 className="display-2 m-0">Explore the project history.</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-3">
        {SOURCES.map(([title, description, href]) => (
          <CtaLink key={title} href={href} location="about_history" className="flex flex-col gap-2 rounded-[22px] bg-field p-6 text-ink hover:underline">
            <span className="font-cal text-[22px]">{title} →</span>
            <span className="text-base leading-normal text-ink-2">{description}</span>
          </CtaLink>
        ))}
      </div>
    </section>
  );
}
