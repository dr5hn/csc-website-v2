import snapshot from "../../public/adoption-stats.json";

const SOURCES = [
  { key: "npm", title: "npm downloads", href: "https://github.com/npm/registry/blob/main/docs/download-counts.md", source: "npm downloads API" },
  { key: "pypi", title: "PyPI downloads", href: "https://pypistats.org/", source: "PyPI Stats · known mirrors excluded" },
  { key: "github", title: "GitHub release downloads", href: "https://github.com/dr5hn/countries-states-cities-database/releases", source: "GitHub database releases" },
];

/** Stable UTC dates keep server-rendered statistics identical during hydration. */
function dateLabel(value) {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(value));
}

/** Source-linked adoption counts are baked into HTML and refreshed by the daily build. */
export default function AdoptionStats() {
  return (
    <section aria-labelledby="adoption-heading" className="border-t border-hair">
      <div className="wrap flex flex-col gap-5 py-8">
        <h2 id="adoption-heading" className="m-0 font-cal text-[26px] font-normal">Downloads across the ecosystem.</h2>
        <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-5">
          {SOURCES.map(({ key, title, href, source }) => {
            const metric = snapshot[key];
            return (
              <div key={key} className="flex min-w-0 flex-col gap-1.5">
                <dt className="text-[15px] text-ink-2">{title}</dt>
                <dd className="m-0 font-cal text-[clamp(32px,4vw,44px)] leading-tight tabular-nums text-ink">{metric.downloads.toLocaleString("en-US")}</dd>
                <dd className="m-0 text-sm leading-normal text-ink-3">
                  {key === "github" ? "Lifetime · published data-file assets" : `${metric.packages.length} official packages · 30 days`}
                  {key !== "github" && <span className="block">{dateLabel(metric.start)} – {dateLabel(metric.end)}</span>}
                </dd>
                <dd className="m-0 text-sm leading-normal text-ink-3">
                  Updated <time dateTime={metric.updatedAt}>{dateLabel(metric.updatedAt)}</time>
                  <a href={href} className="mt-1 block text-blue hover:underline">{source} ↗</a>
                </dd>
              </div>
            );
          })}
        </dl>
        <details className="text-sm leading-normal text-ink-3">
          <summary className="w-fit cursor-pointer text-blue hover:underline">Sources and counting method</summary>
          <p className="mb-0 max-w-[900px]">
            Downloads count file transfers, including repeat installs and automation; they are not unique developers.
            Package totals use the displayed UTC dates, with a short allowance for reporting lag.
            GitHub totals include data files from all published database releases, including prereleases, and exclude checksums,
            notices, migration archives, source archives, Git clones and raw-file traffic.
            Updates are scheduled daily with catch-up attempts; provider outages retain the last successful values and their update dates.{" "}
            <a href="/adoption-stats.json" className="text-blue hover:underline">View the counts and package breakdown →</a>
          </p>
        </details>
      </div>
    </section>
  );
}
