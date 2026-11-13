import Link from "next/link";

import Tag from "@/components/ui/tag";

const CODE = {
  npm: {
    off: "import { getStatesOfCountry, getCitiesOfState }\n  from '@countrystatecity/countries';\n\nconst states = await getStatesOfCountry('IN');\nconst cities = await getCitiesOfState('IN', 'MH');",
    live: "import { createCSCClient } from '@countrystatecity/sdk';\n\nconst csc = createCSCClient({ apiKey: process.env.CSC_API_KEY });\nconst { data: states } = await csc.states.list({ country: 'IN' });\nconst hits = await csc.search.fuzzy({ query: 'bangalor', type: 'city' });",
  },
  py: {
    off: 'from countrystatecity_countries import (\n    get_states_of_country, get_cities_of_state)\n\nstates = get_states_of_country("IN")\ncities = get_cities_of_state("IN", "MH")',
    live: 'from countrystatecity import CountryStateCity\n\ncsc = CountryStateCity()   # reads CSC_API_KEY\nstates = csc.get_states_of_country("IN")\nhits = csc.fuzzy_search("bangalor", entity="city")',
  },
};

// The code follows the registry tab in the Packages section above (`py` is its state).
export default function OfflineLive({ py }) {
  const lang = py ? "py" : "npm";

  return (
    <section className="mb-[clamp(56px,7vw,104px)] border-y border-hair bg-mist">
      <div className="wrap flex flex-col gap-8 py-[clamp(56px,7vw,104px)]">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div className="flex max-w-[680px] flex-col gap-3.5">
            <div className="eyebrow">Offline or live</div>
            <h2 className="display-2 m-0">Prototype offline. Go live when you ship.</h2>
          </div>
          <p className="m-0 max-w-[420px] text-[17px] leading-[1.55] text-ink-2">
            Bundled data packages provide versioned snapshots for prototypes, offline use and local joins.
            Use the hosted API for its currently served data, search on eligible plans and support.
            Snapshots and API data can differ by release.
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-3">
          <div className="flex flex-col overflow-hidden rounded-3xl border border-line bg-white">
            <div className="flex items-center justify-between gap-2.5 border-b border-hair px-5 py-4">
              <span className="font-cal text-[22px]">Offline package</span>
              <Tag>no key · no network</Tag>
            </div>
            <pre className="m-0 overflow-x-auto whitespace-pre px-5 py-4 font-mono text-[13px] leading-[1.65] text-ink-code">{CODE[lang].off}</pre>
          </div>
          <div className="flex flex-col overflow-hidden rounded-3xl border-[1.5px] border-blue bg-white">
            <div className="flex items-center justify-between gap-2.5 border-b border-hair px-5 py-4">
              <span className="font-cal text-[22px]">Live API client</span>
              <Tag tone="live">API key · plan quotas</Tag>
            </div>
            <pre className="m-0 overflow-x-auto whitespace-pre px-5 py-4 font-mono text-[13px] leading-[1.65] text-ink-code">{CODE[lang].live}</pre>
            <p className="m-0 border-t border-hair px-5 py-4 text-sm leading-relaxed text-ink-2">
              Community includes the state-list call with 100 requests per day and 3,000 per month; both limits apply.
              The fuzzy-search call requires Supporter or higher.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2.5 text-[15px]">
          <a href="https://docs.countrystatecity.in/api/sdks/typescript" target="_blank" rel="noopener noreferrer" className="text-blue hover:text-blue-deep hover:underline">JavaScript API SDK guide</a>
          <a href="https://docs.countrystatecity.in/api/sdks/python" target="_blank" rel="noopener noreferrer" className="text-blue hover:text-blue-deep hover:underline">Python API SDK guide</a>
          <Link href="/pricing" className="text-blue hover:text-blue-deep hover:underline">Compare plans</Link>
        </div>
      </div>
    </section>
  );
}
