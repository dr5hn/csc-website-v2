// The nine channels, grouped by what a visitor is trying to do. `tag: "stars"` is replaced
// by the live GitHub star count where it is rendered.
export const CHANNEL_GROUPS = [
  ["Build", "Put the data inside your product."],
  ["Data", "Get the whole dataset, or just the slice you need."],
  ["Explore", "Look around before you commit."],
  ["Community", "Help keep the data accurate."],
];

export const CHANNELS = [
  { name: "Database", group: "Data", tagline: "The canonical source", desc: "The full open dataset on GitHub, in 12 formats. Everything else is built from it.", tag: "stars", cmd: "git clone …/countries-states-cities-database", href: "/product/database" },
  { name: "REST API", group: "Build", tagline: "Tiered, high-availability", desc: "Countries, states, cities, search and more over HTTPS. Free tier included.", tag: "", cmd: "GET /v1/countries", href: "/product/api" },
  { name: "Export Tool", group: "Data", tagline: "Bulk data on demand", desc: "Pick regions and fields, download a clean file. 5 free credits to start.", tag: "13 formats", cmd: "JSON · CSV · SQL · XML…", href: "/product/export-tool" },
  { name: "npm packages", group: "Build", tagline: "JavaScript and TypeScript", desc: "An official API SDK, a CLI, and eight offline data packages for Node and the browser.", tag: "10 packages", cmd: "npm i @countrystatecity/sdk", href: "https://www.npmjs.com/org/countrystatecity" },
  { name: "PyPI packages", group: "Build", tagline: "Python-first ergonomics", desc: "A typed sync + async API client, plus seven offline data packages.", tag: "8 packages", cmd: "pip install countrystatecity-api", href: "https://pypi.org/org/countrystatecity/" },
  { name: "CLI", group: "Build", tagline: "Search, export, scaffold", desc: "Search, explore interactively, and generate React dropdowns or Prisma seeds.", tag: "", cmd: "csc search states --country IN", href: "https://www.npmjs.com/package/@countrystatecity/cli" },
  { name: "Playground", group: "Explore", tagline: "Interactive Swagger UI", desc: "Try every endpoint in the browser before writing code.", tag: "", cmd: "playground.countrystatecity.in", href: "https://playground.countrystatecity.in/" },
  { name: "Live Demo", group: "Explore", tagline: "Browse the dataset", desc: "Explore countries, states and cities without an account.", tag: "", cmd: "demo.countrystatecity.in", href: "https://demo.countrystatecity.in/" },
  { name: "Update Tool", group: "Community", tagline: "Submit & track corrections", desc: "Suggest a fix, follow its review and see it ship in the next release.", tag: "", cmd: "manager.countrystatecity.in", href: "/product/update-tool" },
];

export const NPM_PACKAGES = [
  ["Live", "sdk", "Official REST API client", "npm install @countrystatecity/sdk"],
  ["Tool", "cli", "Search, explore, generate code", "npm install -g @countrystatecity/cli"],
  ["Offline", "countries", "Countries, states, cities · Node", "npm install @countrystatecity/countries"],
  ["Offline", "countries-browser", "Same API, loads via CDN", "npm install @countrystatecity/countries-browser"],
  ["Offline", "timezones", "IANA timezone data", "npm install @countrystatecity/timezones"],
  ["Offline", "currencies", "ISO 4217 currency data", "npm install @countrystatecity/currencies"],
  ["Offline", "translations", "Names in 19 languages", "npm install @countrystatecity/translations"],
  ["Offline", "phonecodes", "Country dial codes", "npm install @countrystatecity/phonecodes"],
  ["Offline", "postalcodes", "844,000+ codes, 125 countries", "npm install @countrystatecity/postalcodes"],
  ["Offline", "geojson", "Point FeatureCollections", "npm install @countrystatecity/geojson"],
].map(([kind, name, desc, cmd]) => ({ kind, name: `@countrystatecity/${name}`, desc, cmd }));

export const PYPI_PACKAGES = [
  ["Live", "countrystatecity-api", "Official API client · sync + async", "pip install countrystatecity-api"],
  ["Offline", "countrystatecity-countries", "Countries, states, cities", "pip install countrystatecity-countries"],
  ["Offline", "countrystatecity-timezones", "IANA timezone data", "pip install countrystatecity-timezones"],
  ["Offline", "countrystatecity-currencies", "Country ↔ currency", "pip install countrystatecity-currencies"],
  ["Offline", "countrystatecity-translations", "Names in 19 languages", "pip install countrystatecity-translations"],
  ["Offline", "countrystatecity-phonecodes", "Dial codes, 250 countries", "pip install countrystatecity-phonecodes"],
  ["Offline", "countrystatecity-regions", "Regions and subregions", "pip install countrystatecity-regions"],
  ["Offline", "countrystatecity-postal-codes", "Postal codes, 125 countries", "pip install countrystatecity-postal-codes"],
].map(([kind, name, desc, cmd]) => ({ kind, name, desc, cmd }));
