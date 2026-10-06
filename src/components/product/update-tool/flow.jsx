import CtaLink from "@/components/cta-link";
import RecentMerges from "@/components/product/update-tool/recent-merges";
import { REPO_URL } from "@/components/star-button";

const STEPS = [
  ["01", "Submit a change", "Edit a record or add a missing place, with a source. Takes about a minute."],
  ["02", "Community review", "Maintainers and reviewers check it against the source and nearby records."],
  ["03", "Approve and merge", "Approved changes are merged into the canonical database on GitHub."],
  ["04", "Ships everywhere", "Frequent releases update the API, the downloads and every package."],
];

const WAYS = [
  { t: "Submit a correction", d: "Wrong name, code, coordinates or timezone.", cta: "Start →", href: "https://manager.countrystatecity.in/", track: "update" },
  { t: "Add missing data", d: "A city, district or translation that isn't there yet.", cta: "Start →", href: "https://manager.countrystatecity.in/", track: "update" },
  { t: "Report an issue", d: "Not sure of the fix? Open an issue on GitHub.", cta: "Open issue →", href: `${REPO_URL}/issues`, track: "github" },
  { t: "Review submissions", d: "Help check other people's changes.", cta: "Coming soon" },
];

export default function UpdateToolFlow() {
  return (
    <>
      <section id="flow" className="scroll-mt-28 border-y border-hair bg-mist">
        <div className="wrap flex flex-col gap-8 py-[clamp(56px,7vw,104px)]">
          <h2 className="display-2 m-0 max-w-[720px]">From suggestion to release in four steps.</h2>
          <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-3 p-0">
            {STEPS.map(([n, t, d]) => (
              <li key={n} className="flex flex-col gap-2.5 rounded-[22px] border border-line bg-white p-[22px]">
                <span className="font-mono text-[13px] text-blue">{n}</span>
                <span className="font-cal text-[22px]">{t}</span>
                <span className="text-[15px] leading-normal text-ink-2">{d}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap-flush grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-start gap-3 py-[clamp(56px,7vw,104px)]">
        <RecentMerges />
        <div className="flex flex-col gap-3">
          {WAYS.map((w) => {
            const inner = (
              <>
                <div className="flex min-w-0 flex-col gap-[3px]">
                  <span className="text-base font-semibold">{w.t}</span>
                  <span className="text-sm text-ink-2">{w.d}</span>
                </div>
                <span className={`whitespace-nowrap text-sm font-semibold ${w.href ? "text-blue" : "text-ink-3"}`}>{w.cta}</span>
              </>
            );
            const box = "flex flex-wrap items-center justify-between gap-3.5 rounded-[20px] border border-line px-5 py-[18px]";
            return w.href ? (
              <CtaLink key={w.t} href={w.href} location={`update_way_${w.t.toLowerCase().replace(/\s+/g, "_")}`} track={w.track} className={`${box} text-ink no-underline hover:border-blue hover:text-ink hover:no-underline`}>
                {inner}
              </CtaLink>
            ) : (
              <div key={w.t} className={`${box} opacity-60`}>{inner}</div>
            );
          })}
          <div className="flex flex-col gap-1 rounded-[20px] border-[1.5px] border-dashed border-edge px-5 py-[18px]">
            <span className="text-base font-semibold">Contributor leaderboard</span>
            <span className="text-sm text-ink-3">Coming soon: a ranking of top contributors by merged changes.</span>
          </div>
        </div>
      </section>
    </>
  );
}
