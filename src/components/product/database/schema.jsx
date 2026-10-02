import { TEXT_STATS } from "@/lib/stats";

const TYPE_COLOUR = { int: "text-blue", str: "text-ok", dec: "text-[#7a5af0]", fk: "text-live-ink", obj: "text-ink-3" };

const TABLES = [
  { name: "countries", count: TEXT_STATS.countries, head: "bg-blue text-white", fields: [["id", "int"], ["name", "str"], ["iso2 · iso3", "str"], ["phonecode", "str"], ["currency", "str"], ["region_id", "fk → regions"], ["timezones", "obj"]] },
  { name: "states", count: TEXT_STATS.states, head: "bg-field text-ink", fields: [["id", "int"], ["name", "str"], ["iso2", "str"], ["country_id", "fk → countries"], ["type", "str"], ["latitude · longitude", "dec"], ["timezone", "str"]] },
  { name: "cities", count: TEXT_STATS.cities, head: "bg-field text-ink", fields: [["id", "int"], ["name", "str"], ["state_id", "fk → states"], ["country_id", "fk → countries"], ["latitude · longitude", "dec"], ["timezone", "str"], ["wikiDataId", "str"]] },
];

export default function DatabaseSchema() {
  return (
    <section className="border-y border-hair bg-mist">
      <div className="wrap flex flex-col gap-8 py-[clamp(56px,7vw,104px)]">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div className="flex max-w-[640px] flex-col gap-3.5">
            <div className="eyebrow">Schema</div>
            <h2 className="display-2 m-0">Three tables, linked by ID.</h2>
          </div>
          <p className="m-0 max-w-[420px] text-[17px] leading-[1.55] text-ink-2">
            Every city points to its state and country, so joins and dropdowns work the same in every format. Regions and subregions
            sit above countries.
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-3">
          {TABLES.map((t) => (
            <div key={t.name} className="overflow-hidden rounded-[22px] border border-line bg-white">
              <div className={`flex items-center justify-between px-[18px] py-3.5 ${t.head}`}>
                <span className="font-cal text-[22px]">{t.name}</span>
                <span className="font-mono text-xs">{t.count}</span>
              </div>
              <div className="flex flex-col py-1.5">
                {t.fields.map(([k, type]) => (
                  <div key={k} className="flex justify-between gap-2.5 px-[18px] py-[7px] font-mono text-[13px]">
                    <span className="text-ink">{k}</span>
                    <span className={TYPE_COLOUR[type.split(" ")[0]] ?? "text-ink-3"}>{type}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
