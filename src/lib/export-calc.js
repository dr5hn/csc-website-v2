// Export Tool credit maths and sample previews. Costs mirror the Export Tool's own pricing
// (see csc-export-tool/src/config/pricing.js). Preview rows are illustrative.

import { LOCATION_SAMPLES } from "../data/location-samples.js";

export const DATASETS = {
  countries: { name: "Countries", credits: 1 },
  states: { name: "States / Regions", credits: 3 },
  counties: { name: "Counties / Districts", credits: 3 },
  cities: { name: "Cities", credits: 4 },
  postcodes: { name: "Postcodes", credits: 5 },
};

export const FORMAT_GROUPS = [
  ["Tabular", [["CSV", 3], ["Excel", 4], ["Markdown", 3]]],
  ["Structured", [["JSON", 2], ["NDJSON", 2], ["XML", 2], ["YAML", 2]]],
  ["Database", [["SQL", 4], ["PostgreSQL", 5], ["SQL Server", 5], ["SQLite3", 5], ["MongoDB", 3]]],
  ["Geospatial", [["GeoJSON", 4]]],
];

export const PERSONAS = [
  { label: "Frontend", problem: "You need a country → state dropdown without shipping the full database.", solution: "Countries + States as JSON, with codes and parent-country links.", types: { countries: true, states: true, cities: false }, format: "JSON" },
  { label: "Mobile", problem: "You want an offline list that fits in the app bundle.", solution: "Cities for one country as NDJSON.", types: { countries: false, states: false, cities: true }, format: "NDJSON" },
  { label: "DBA", problem: "You need a clean seed for a new PostgreSQL database.", solution: "Countries, States and Cities as a PostgreSQL dump.", types: { countries: true, states: true, cities: true }, format: "PostgreSQL" },
  { label: "Data", problem: "You want to explore postal coverage in a notebook.", solution: "Postcodes as CSV, with locality names and city IDs where available.", types: { postcodes: true }, format: "CSV" },
];

const ROWS = {
  countries: [{"id": 101, "name": "India", "iso2": "IN", "capital": "New Delhi", "currency": "INR", "latitude": "20.00000000", "longitude": "77.00000000"}, {"id": 102, "name": "Indonesia", "iso2": "ID", "capital": "Jakarta", "currency": "IDR", "latitude": "-5.00000000", "longitude": "120.00000000"}],
  states: [{"id": 4008, "name": "Maharashtra", "iso2": "MH", "country_code": "IN", "latitude": "18.90683560", "longitude": "75.67415790"}, {"id": 4026, "name": "Karnataka", "iso2": "KA", "country_code": "IN", "latitude": "14.52038960", "longitude": "75.72235210"}],
  counties: [{ name: "Suffolk County", country_code: "US", state_code: "MA", latitude: "42.35000000", longitude: "-71.07000000" }],
  postcodes: [{ code: "02108", country_code: "US", state_code: "MA", locality_name: "Boston", latitude: "42.35700000", longitude: "-71.06400000" }],
  cities: LOCATION_SAMPLES[0].st[0].ci.slice(0, 2).map(([name, id, latitude, longitude]) => ({ id, name, state_code: "MH", country_code: "IN", latitude: latitude.toFixed(8), longitude: longitude.toFixed(8) })),
};

const FILE_EXT = { CSV: "csv", Markdown: "md", JSON: "json", NDJSON: "ndjson", XML: "xml", YAML: "yml", MongoDB: "json", GeoJSON: "geojson" };
const SQL_FORMATS = ["SQL", "PostgreSQL", "SQL Server", "SQLite3"];

export const formatCost = (format) => FORMAT_GROUPS.flatMap(([, list]) => list).find(([name]) => name === format)?.[1] ?? 0;
export const selectedKeys = (types) => Object.keys(DATASETS).filter((key) => types[key]);

/** GeoJSON requires latitude and longitude, both in the premium tier. */
export const requiredFieldCost = (format, datasetCount) => format === "GeoJSON" ? 3 * datasetCount : 0;

/** Total credits before field tiers and other options. */
export function totalCredits(types, format) {
  const keys = selectedKeys(types);
  if (!keys.length) return 0;
  return keys.reduce((sum, key) => sum + DATASETS[key].credits, 0) + formatCost(format) + requiredFieldCost(format, keys.length);
}

/** Render a short example of one data file or Excel worksheet. */
function previewDataset(key, format) {
  const rows = ROWS[key];
  const columns = Object.keys(rows[0]);
  if (format === "CSV") {
    const quote = (value) => `"${String(value).replaceAll('"', '""')}"`;
    return [columns.map(quote).join(","), ...rows.map((row) => columns.map((column) => quote(row[column])).join(","))].join("\n");
  }
  if (format === "Markdown" || format === "Excel") {
    return [
      `| ${columns.join(" | ")} |`,
      `| ${columns.map(() => "---").join(" | ")} |`,
      ...rows.map((row) => `| ${columns.map((column) => row[column]).join(" | ")} |`),
    ].join("\n");
  }
  if (format === "NDJSON") return rows.map((row) => JSON.stringify(row)).join("\n");
  if (format === "YAML") {
    return rows.map((row) => Object.entries(row).map(([column, value], i) => `${i ? "  " : "- "}${column}: ${JSON.stringify(value)}`).join("\n")).join("\n");
  }
  if (format === "XML") {
    const items = rows.map((row) => `  <record>\n${Object.entries(row).map(([column, value]) => `    <${column}>${value}</${column}>`).join("\n")}\n  </record>`).join("\n");
    return `<?xml version="1.0" encoding="UTF-8"?>\n<${key}>\n${items}\n</${key}>`;
  }
  if (SQL_FORMATS.includes(format)) {
    const [open, close] = format === "SQL Server" ? ["[", "]"] : format === "SQL" ? ["`", "`"] : ['"', '"'];
    const values = rows.map((row) => `  (${columns.map((column) => typeof row[column] === "string" ? `'${row[column].replaceAll("'", "''")}'` : row[column]).join(", ")})`);
    return `INSERT INTO ${open}${key}${close} (${columns.join(", ")}) VALUES\n${values.join(",\n")};`;
  }
  if (format === "MongoDB") {
    return rows.map((row) => JSON.stringify(row, (_, value) => Number.isInteger(value) ? { $numberInt: String(value) } : value)).join("\n");
  }
  if (format === "GeoJSON") {
    const features = rows.map(({ longitude, latitude, ...properties }) => ({
      type: "Feature",
      geometry: { type: "Point", coordinates: [Number(longitude), Number(latitude)] },
      properties,
    }));
    return JSON.stringify({ type: "FeatureCollection", features }, null, 2);
  }
  return JSON.stringify(rows, null, 2);
}

/** Describe the data entries in the ZIP and give sample contents. */
export function buildPreview(types, format) {
  const keys = selectedKeys(types);
  if (SQL_FORMATS.includes(format) && keys.length) {
    return [{ file: "export.sql", text: keys.map((key) => previewDataset(key, format)).join("\n\n") }];
  }
  if (format === "Excel" && keys.length) {
    return [{
      file: "workbook.xlsx",
      text: keys.map((key) => `Sheet: ${key[0].toUpperCase() + key.slice(1)}\n${previewDataset(key, format)}`).join("\n\n"),
    }];
  }
  return keys.map((key) => ({ file: `${key}.${FILE_EXT[format]}`, text: previewDataset(key, format) }));
}
