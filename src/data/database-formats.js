// Published release assets per format. `group` drives the filter tabs.
export const DATABASE_FORMATS = [
  { name: "JSON", asset: "json-countries+states+cities.json.gz", popular: true, group: "Web", use: "Apps and APIs" },
  { name: "MySQL", asset: "sql-world.sql.gz", popular: true, group: "SQL", use: "Import dump" },
  { name: "PostgreSQL", asset: "psql-world.sql.gz", popular: false, group: "SQL", use: "Import dump" },
  { name: "SQLite", asset: "sqlite-world.sqlite3.gz", popular: false, group: "SQL", use: "Single file" },
  { name: "SQL Server", asset: "sqlserver-world.sql.gz", popular: false, group: "SQL", use: "Import dump" },
  { name: "MongoDB", asset: "mongodb-world-mongodb-dump.tar.gz", popular: true, group: "NoSQL", use: "mongoimport" },
  { name: "CSV", asset: "csv-cities.csv.gz", popular: true, group: "Analysis", use: "Spreadsheets" },
  { name: "Parquet", asset: "parquet-cities.parquet.gz", popular: false, group: "Analysis", use: "Columnar" },
  { name: "XML", asset: "xml-cities.xml.gz", popular: false, group: "Web", use: "Legacy systems" },
  { name: "YAML", asset: "yml-cities.yml.gz", popular: false, group: "Web", use: "Config" },
  { name: "GeoJSON", asset: "geojson-cities.geojson.gz", popular: false, group: "Web", use: "Maps" },
  { name: "TOON", asset: "toon-cities.toon.gz", popular: false, group: "Web", use: "Token-oriented notation" },
];

export const FORMAT_FILTERS = ["All", "SQL", "Web", "Analysis", "NoSQL"];
