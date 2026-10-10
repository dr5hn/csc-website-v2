// The official @countrystatecity npm packages, as published on the registry.
//
// Names and descriptions were checked against https://registry.npmjs.org on
// 11 Oct 2026. Versions are deliberately left out: they move faster than this
// page does, and a stale version number reads as an abandoned project.

export const NPM_PACKAGES = [
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
      "The official command-line client: search the data, explore the hierarchy and generate request code.",
  },
];

export const NPM_FAQS = [
  {
    q: "Which package should I install first?",
    a: "@countrystatecity/countries. It carries countries, states and cities together, which is what an address form needs. Add the smaller packages only when you want dial codes, currencies, timezones or postcodes.",
  },
  {
    q: "Do the packages need an API key?",
    a: "No. The data ships inside the package and resolves locally, so there is no network call and nothing to authenticate. A key is only needed for the hosted API.",
  },
  {
    q: "How do the packages relate to the API?",
    a: "They are built from the same dataset. The packages give you a snapshot that updates when you upgrade; the API gives you the current data on every request, plus search, autocomplete and nearby lookups.",
  },
  {
    q: "Is the data open source?",
    a: "Yes. The underlying dataset is the countries-states-cities-database project on GitHub, and the packages are published from it.",
  },
  {
    q: "What about bundle size?",
    a: "Install only the slice you use. A phone input needs @countrystatecity/phonecodes, not the full city list, and @countrystatecity/countries-browser keeps the data out of your bundle entirely by loading it from a CDN.",
  },
];
