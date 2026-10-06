// Export Tool credit maths and sample previews. Costs mirror the Export Tool's own pricing
// (see src/data/export-pricing.js); the preview rows are real records, shown for illustration.

import { LOCATION_SAMPLES } from "../data/location-samples.js";

export const TYPE_COST = { countries: 1, states: 3, cities: 4 };

export const FORMAT_GROUPS = [
  ["Tabular", [["CSV", 3], ["Excel", 4], ["Markdown", 3]]],
  ["Structured", [["JSON", 2], ["NDJSON", 2], ["XML", 2], ["YAML", 2]]],
  ["Database", [["SQL", 4], ["PostgreSQL", 5], ["SQL Server", 5], ["SQLite3", 5], ["MongoDB", 3]]],
  ["Geospatial", [["GeoJSON", 4]]],
];

export const PERSONAS = [
  { label: "Frontend", problem: "You need a country → state dropdown without shipping the full database.", solution: "Countries + States as JSON, name and iso2 only.", types: { countries: true, states: true, cities: false }, format: "JSON" },
  { label: "Mobile", problem: "You want an offline list that fits in the app bundle.", solution: "Cities for one country as NDJSON.", types: { countries: false, states: false, cities: true }, format: "NDJSON" },
  { label: "DBA", problem: "You need a clean seed for a new PostgreSQL database.", solution: "Countries, States and Cities as a PostgreSQL dump.", types: { countries: true, states: true, cities: true }, format: "PostgreSQL" },
  { label: "Data", problem: "You want city names in a notebook, without a parsing script.", solution: "Cities as CSV.", types: { countries: false, states: false, cities: true }, format: "CSV" },
];

const ROWS = {
  countries: [{"id": 101, "name": "India", "iso2": "IN", "capital": "New Delhi", "currency": "INR", "latitude": "20.00000000", "longitude": "77.00000000"}, {"id": 102, "name": "Indonesia", "iso2": "ID", "capital": "Jakarta", "currency": "IDR", "latitude": "-5.00000000", "longitude": "120.00000000"}],
  states: [{"id": 4008, "name": "Maharashtra", "iso2": "MH", "country_code": "IN", "latitude": "18.90683560", "longitude": "75.67415790"}, {"id": 4026, "name": "Karnataka", "iso2": "KA", "country_code": "IN", "latitude": "14.52038960", "longitude": "75.72235210"}],
  cities: LOCATION_SAMPLES[0].st[0].ci.slice(0, 2).map(([name, id, latitude, longitude]) => ({ id, name, state_code: "MH", country_code: "IN", latitude: latitude.toFixed(8), longitude: longitude.toFixed(8) })),
};

const FILE_EXT = { CSV: "csv", Excel: "xlsx", Markdown: "md", JSON: "json", NDJSON: "ndjson", XML: "xml", YAML: "yaml", SQL: "sql", PostgreSQL: "sql", "SQL Server": "sql", SQLite3: "sqlite", MongoDB: "json", GeoJSON: "geojson" };
const SINGLE_FILE = ["JSON", "NDJSON", "XML", "YAML", "GeoJSON"];

export const formatCost = (format) => FORMAT_GROUPS.flatMap(([, list]) => list).find(([name]) => name === format)?.[1] ?? 0;

export const selectedKeys = (types) => ["countries", "states", "cities"].filter((k) => types[k]);

/** Total credits for a selection; 0 when no data type is picked. */
export function totalCredits(types, format) {
  const keys = selectedKeys(types);
  if (!keys.length) return 0;
  return keys.reduce((sum, k) => sum + TYPE_COST[k], 0) + formatCost(format);
}

/** Describe the files produced by the selected formats and data types. */
export function fileName(types, format) {
  const keys = selectedKeys(types);
  const ext = FILE_EXT[format];
  return keys.length > 1 && !SINGLE_FILE.includes(format) ? `${keys.length} files · .${ext}` : `${keys.join("-") || "export"}.${ext}`;
}

/** Text preview of the first rows in the chosen format. */
export function buildPreview(types, format, translations) {
  const keys = selectedKeys(types);
  if (!keys.length) return "// Pick at least one data type";

  const recs = keys.flatMap((k) =>
    ROWS[k].map((r) => ({
      _t: k,
      ...r,
      ...(translations && k !== "cities" ? { translations: { fr: r.name === "India" ? "Inde" : r.name === "Indonesia" ? "Indonésie" : r.name, de: r.name === "India" ? "Indien" : r.name === "Indonesia" ? "Indonesien" : r.name } } : {}),
    }))
  );
  const strip = ({ _t, ...rest }) => rest;
  const first = ROWS[keys[0]];
  const cols = Object.keys(first[0]);

  if (format === "CSV") {
    return keys.map((k) => {
      const c = Object.keys(ROWS[k][0]);
      return `# ${k}.csv\n${c.join(",")}\n${ROWS[k].map((r) => c.map((x) => r[x]).join(",")).join("\n")}`;
    }).join("\n\n");
  }
  if (format === "Markdown" || format === "Excel") {
    return `| ${cols.join(" | ")} |\n|${cols.map(() => "---").join("|")}|\n${first.map((r) => `| ${cols.map((x) => r[x]).join(" | ")} |`).join("\n")}${format === "Excel" ? `\n\n// Sheet "${keys[0]}" in ${keys[0]}.xlsx` : ""}`;
  }
  if (format === "NDJSON") return recs.map((r) => JSON.stringify(strip(r))).join("\n");
  if (format === "YAML") {
    return keys.map((k) => `${k}:\n${ROWS[k].map((r) => Object.entries(r).map(([a, b], i) => `${i ? "    " : "  - "}${a}: ${b}`).join("\n")).join("\n")}`).join("\n");
  }
  if (format === "XML") {
    const tag = { countries: "country", states: "state", cities: "city" };
    return `<?xml version="1.0"?>\n<data>\n${recs.map((r) => `  <${tag[r._t]}>\n${Object.entries(strip(r)).filter(([, v]) => typeof v !== "object").map(([a, b]) => `    <${a}>${b}</${a}>`).join("\n")}\n  </${tag[r._t]}>`).join("\n")}\n</data>`;
  }
  if (["SQL", "PostgreSQL", "SQL Server", "SQLite3"].includes(format)) {
    const q = format === "SQL Server" ? ["[", "]"] : format === "SQL" ? ["`", "`"] : ['"', '"'];
    return keys.map((k) => {
      const c = Object.keys(ROWS[k][0]);
      return `INSERT INTO ${q[0]}${k}${q[1]} (${c.join(", ")}) VALUES\n${ROWS[k].map((r) => `  (${c.map((x) => (Number.isNaN(Number(r[x])) ? `'${r[x]}'` : r[x])).join(", ")})`).join(",\n")};`;
    }).join("\n\n");
  }
  if (format === "MongoDB") return first.map((r) => JSON.stringify(r, (_, value) => Number.isInteger(value) ? { $numberInt: String(value) } : value)).join("\n");
  if (format === "GeoJSON") {
    return JSON.stringify({ type: "FeatureCollection", features: recs.slice(0, 2).map((r) => ({ type: "Feature", geometry: { type: "Point", coordinates: [Number(r.longitude), Number(r.latitude)] }, properties: { id: r.id, name: r.name } })) }, null, 2);
  }
  const out = {};
  keys.forEach((k) => {
    out[k] = recs.filter((r) => r._t === k).map(strip);
  });
  return JSON.stringify(out, null, 2);
}
