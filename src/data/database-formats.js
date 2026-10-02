// Compressed download sizes per format. `group` drives the filter tabs.
export const DATABASE_FORMATS = [
  { name: "JSON", size: "12MB", popular: true, group: "Web", use: "Apps and APIs" },
  { name: "MySQL", size: "8MB", popular: true, group: "SQL", use: "Import dump" },
  { name: "PostgreSQL", size: "8MB", popular: false, group: "SQL", use: "Import dump" },
  { name: "SQLite", size: "7MB", popular: false, group: "SQL", use: "Single file" },
  { name: "SQL Server", size: "7MB", popular: false, group: "SQL", use: "Import dump" },
  { name: "MongoDB", size: "15MB", popular: true, group: "NoSQL", use: "mongoimport" },
  { name: "CSV", size: "6MB", popular: true, group: "Analysis", use: "Spreadsheets" },
  { name: "Parquet", size: "27MB", popular: false, group: "Analysis", use: "Columnar" },
  { name: "XML", size: "25MB", popular: false, group: "Web", use: "Legacy systems" },
  { name: "YAML", size: "18MB", popular: false, group: "Web", use: "Config" },
  { name: "GeoJSON", size: "24MB", popular: false, group: "Web", use: "Maps" },
  { name: "TOON", size: "20MB", popular: false, group: "Web", use: "LLM-optimised, ~40% fewer tokens" },
];

export const FORMAT_FILTERS = ["All", "SQL", "Web", "Analysis", "NoSQL"];
