// Compressed (.gz) download sizes per format, from release v3.2-export.12 (refresh when sizes move). `group` drives the filter tabs.
export const DATABASE_FORMATS = [
  { name: "JSON", size: "24MB", popular: true, group: "Web", use: "Apps and APIs" },
  { name: "MySQL", size: "30MB", popular: true, group: "SQL", use: "Import dump" },
  { name: "PostgreSQL", size: "30MB", popular: false, group: "SQL", use: "Import dump" },
  { name: "SQLite", size: "55MB", popular: false, group: "SQL", use: "Single file" },
  { name: "SQL Server", size: "32MB", popular: false, group: "SQL", use: "Import dump" },
  { name: "MongoDB", size: "43MB", popular: true, group: "NoSQL", use: "mongoimport" },
  { name: "CSV", size: "5MB", popular: true, group: "Analysis", use: "Spreadsheets" },
  { name: "Parquet", size: "28MB", popular: false, group: "Analysis", use: "Columnar" },
  { name: "XML", size: "24MB", popular: false, group: "Web", use: "Legacy systems" },
  { name: "YAML", size: "23MB", popular: false, group: "Web", use: "Config" },
  { name: "GeoJSON", size: "24MB", popular: false, group: "Web", use: "Maps" },
  { name: "TOON", size: "20MB", popular: false, group: "Web", use: "LLM-optimised, ~40% fewer tokens" },
];

export const FORMAT_FILTERS = ["All", "SQL", "Web", "Analysis", "NoSQL"];
