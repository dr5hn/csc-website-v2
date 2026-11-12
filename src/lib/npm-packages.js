// The official @countrystatecity npm packages, as published on the registry.
//
// Distinguish bundled snapshots, CDN-loaded snapshots and authenticated API tools.
// Versions are omitted because they change independently of the marketing site.

export const NPM_PACKAGES = [
  {
    name: "@countrystatecity/sdk",
    description: "The official JavaScript/TypeScript REST API client. Makes network requests and requires a CSC API key; endpoints and quotas follow your API plan.",
  },
  {
    name: "@countrystatecity/countries",
    description:
      "Countries, states and cities with minified builds and iOS/Safari support. The one to start with if you only install a single package.",
  },
  {
    name: "@countrystatecity/countries-browser",
    description:
      "The same data served over the jsDelivr CDN with lazy loading, for pages that should not carry it in the bundle.",
  },
  {
    name: "@countrystatecity/timezones",
    description:
      "Timezone data with conversion helpers, so you can show a user their local time without asking for it.",
  },
  {
    name: "@countrystatecity/currencies",
    description:
      "World currencies with ISO 4217 codes, symbols and the countries that use them.",
  },
  {
    name: "@countrystatecity/phonecodes",
    description:
      "Dial codes mapped to ISO2, with search and formatting helpers for phone inputs.",
  },
  {
    name: "@countrystatecity/postalcodes",
    description:
      "Postal and ZIP codes with locality search and existence-based validation, rather than a regex that guesses.",
  },
  {
    name: "@countrystatecity/geojson",
    description:
      "Countries, states and cities as GeoJSON Point FeatureCollections, loaded over the CDN for maps.",
  },
  {
    name: "@countrystatecity/translations",
    description:
      "Country names in 19 languages, including Arabic, German, French and Spanish.",
  },
  {
    name: "@countrystatecity/cli",
    description:
      "The official API command-line client: authenticate with an API key, search data, explore the hierarchy and generate request code. API-backed commands need a network connection.",
  },
];

export const NPM_FAQS = [
  {
    q: "Which package should I install first?",
    a: "@countrystatecity/countries. It carries countries, states and cities together, which is what an address form needs. Add the smaller packages only when you want dial codes, currencies, timezones or postcodes.",
  },
  {
    q: "Do the packages need an API key?",
    a: "Bundled data packages work locally without an API key. countries-browser and geojson load snapshots from a CDN and need a network connection when loading. The SDK and API-backed CLI commands call the hosted API and require a key; usage follows your plan.",
  },
  {
    q: "How do the packages relate to the API?",
    a: "Data packages provide versioned snapshots of the open database. The SDK and CLI access the hosted API instead. Available fields and endpoints depend on your API plan, and API data and package snapshots can differ by release.",
  },
  {
    q: "Is the data open source?",
    a: "The underlying database and offline data packages use ODbL-1.0. The npm SDK and CLI use MIT. Review the licence of each package and the database attribution and share-alike requirements before use.",
  },
  {
    q: "What about bundle size?",
    a: "Install only the slice you use. A phone input needs @countrystatecity/phonecodes, not the full city list, and @countrystatecity/countries-browser keeps the data out of your bundle entirely by loading it from a CDN.",
  },
];
