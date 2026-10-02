import Tag from "@/components/ui/tag";

const FEATURES = [
  { t: "Typo-tolerant search", d: '"Banglore" finds Bengaluru. Ranked matches across countries, states and cities.', ep: "GET /v1/search/fuzzy", plan: "Supporter+" },
  { t: "Autocomplete", d: "Ranked, labelled suggestions as the user types. Built for search boxes.", ep: "GET /v1/search/autocomplete", plan: "Supporter+" },
  { t: "Nearby search", d: "Places near a coordinate, sorted by distance.", ep: "GET /v1/search/nearby", plan: "Supporter+" },
  { t: "Shape your response", d: "Return only the fields you need, sorted the way you want.", ep: "?fields=name,iso2 · ?sort=name", plan: "Starter+" },
  { t: "Phone, currency, ISO", d: "Dial codes, currencies and ISO lookups without a second dataset.", ep: "GET /v1/countries/IN", plan: "Starter+" },
  { t: "GraphQL", d: "Ask for a country, its states and their fields in a single query.", ep: "POST /v1/graphql", plan: "Professional+" },
  { t: "Data change feed", d: "Sync a local copy by pulling only what changed since your last fetch.", ep: "GET /v1/changes", plan: "Professional+" },
  { t: "Origin whitelisting", d: "Lock your key to up to 25 domains or IPs so it is safe in the browser.", ep: "3 · 10 · 25 origins", plan: "Supporter+" },
];

export default function ApiFeatures() {
  return (
    <section className="border-y border-hair bg-mist">
      <div className="wrap flex flex-col gap-9 py-[clamp(56px,7vw,104px)]">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <h2 className="display-2 m-0 max-w-[640px]">More than a list of countries.</h2>
          <p className="m-0 max-w-[420px] text-[17px] leading-[1.55] text-ink-2">
            The helpers you&apos;d otherwise build yourself, on the same endpoint and the same key.
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,290px),1fr))] gap-3">
          {FEATURES.map((f) => (
            <div key={f.t} className="flex flex-col gap-2.5 rounded-[20px] border border-line bg-white p-[22px]">
              <div className="flex items-center justify-between gap-2">
                <span className="font-cal text-[22px]">{f.t}</span>
                <Tag className="text-[11.5px]">{f.plan}</Tag>
              </div>
              <span className="text-[15px] leading-normal text-ink-2">{f.d}</span>
              <span className="mt-auto font-mono text-[12.5px] text-blue">{f.ep}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
