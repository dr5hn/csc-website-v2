// Content for the per-resource API landing pages (/country-api, /state-api, /city-api).
//
// Each entry describes one resource of the Country State City API. Endpoints,
// field names and example values are taken from the published OpenAPI spec
// (https://raw.githubusercontent.com/dr5hn/csc-swagger-playground/main/config.json,
// version 2.4.1) so the pages cannot drift into describing fields that do not
// exist. When the spec gains or renames a field, update it here too.

export const API_BASE_URL = "https://api.countrystatecity.in/v1";
export const API_KEY_HEADER = "X-CSCAPI-KEY";

/**
 * Builds the curl example shown on a landing page.
 *
 * @param {string} path - Endpoint path relative to the API base URL.
 * @returns {string} A runnable curl command with the auth header in place.
 */
export function curlExample(path) {
  return `curl --location '${API_BASE_URL}${path}' \\\n  --header '${API_KEY_HEADER}: YOUR_API_KEY'`;
}

export const COUNTRY_API = {
  slug: "country-api",
  resource: "Country",
  eyebrow: "Country API",
  headline: "Every country, in one endpoint.",
  summary:
    "A REST endpoint for every sovereign state and dependent territory, with ISO 3166-1 codes, dial codes, currencies, capitals, regions and coordinates. Plain JSON over REST or GraphQL, and the free tier needs no card.",
  count: "250",
  countLabel: "countries and territories",
  fieldCount: 31,
  metaTitle: "Country API: 250 Countries with ISO Codes",
  metaDescription:
    "Free country API returning 250 countries with ISO2, ISO3, numeric codes, dial codes, currencies, capitals, flags and coordinates. 31 fields per country, JSON over REST and GraphQL.",
  keywords: [
    "country api",
    "countries api",
    "country api free",
    "country list api",
    "iso country code api",
    "country code api",
  ],
  endpoints: [
    { method: "GET", path: "/countries", description: "Every country, newest data first" },
    { method: "GET", path: "/countries/{ciso}", description: "One country by ISO2 code or numeric id" },
    { method: "GET", path: "/iso/country", description: "Look a country up by any ISO code" },
    { method: "GET", path: "/iso/country/convert", description: "Convert between ISO2, ISO3 and numeric" },
    { method: "GET", path: "/subregions/{id}/countries", description: "Countries within a UN subregion" },
  ],
  sampleRequest: curlExample("/countries/IN"),
  sampleResponse: `{
  "id": 101,
  "name": "India",
  "iso2": "IN",
  "iso3": "IND",
  "numeric_code": "356",
  "phonecode": "91",
  "capital": "New Delhi",
  "currency": "INR",
  "currency_name": "Indian rupee",
  "currency_symbol": "₹",
  "tld": ".in",
  "nationality": "Indian",
  "native": "भारत",
  "region": "Asia",
  "subregion": "Southern Asia",
  "latitude": "20.00000000",
  "longitude": "77.00000000",
  "emoji": "🇮🇳",
  "wikiDataId": "Q668"
}`,
  fields: [
    { name: "id", note: "Stable numeric identifier" },
    { name: "name", note: "English name" },
    { name: "iso2", note: "ISO 3166-1 alpha-2" },
    { name: "iso3", note: "ISO 3166-1 alpha-3" },
    { name: "numeric_code", note: "ISO 3166-1 numeric" },
    { name: "phonecode", note: "International dial code" },
    { name: "capital", note: "Capital city" },
    { name: "currency", note: "ISO 4217 code" },
    { name: "currency_name", note: "Currency in words" },
    { name: "currency_symbol", note: "Display symbol" },
    { name: "tld", note: "Country-code top-level domain" },
    { name: "nationality", note: "Demonym" },
    { name: "native", note: "Name in the local script" },
    { name: "region", note: "UN region" },
    { name: "subregion", note: "UN subregion" },
    { name: "timezones", note: "Every zone the country spans" },
    { name: "latitude", note: "Centroid latitude" },
    { name: "longitude", note: "Centroid longitude" },
    { name: "emoji", note: "Flag emoji" },
    { name: "emojiU", note: "Flag emoji code points" },
    { name: "population", note: "Latest published figure" },
    { name: "gdp", note: "Latest published figure" },
    { name: "area_sq_km", note: "Land area" },
    { name: "postal_code_format", note: "Expected postcode shape" },
    { name: "postal_code_regex", note: "Validation pattern" },
    { name: "translations", note: "Name in other languages" },
    { name: "wikiDataId", note: "Wikidata item" },
  ],
  useCases: [
    "Country dropdowns in a signup or checkout form, with flags and dial codes already attached.",
    "Validating a shipping address against the right postcode pattern before you call a carrier.",
    "Converting between ISO2, ISO3 and numeric codes when two systems disagree.",
    "Routing or pricing by UN region and subregion rather than by a hand-kept list.",
  ],
  faqs: [
    {
      q: "Is the country API free?",
      a: "Yes. The free tier covers 3,000 requests a month and needs only an API key, no card. Paid plans start at $5 and raise the limit; the data and the fields are identical on every tier.",
    },
    {
      q: "How many countries does it return?",
      a: "250 entries, covering the 193 UN member states plus observer states, dependent territories and special administrative regions. Each carries its own ISO 3166-1 codes.",
    },
    {
      q: "Can I get the data offline instead of over HTTP?",
      a: "Yes. The same dataset is published as SQL, JSON, CSV, XML and more through the export tool and the open-source database, so you can ship it inside your application.",
    },
    {
      q: "How often does the country data change?",
      a: "Country-level fields change rarely, but currencies, capitals and dial codes do move. Changes are published through the /changes feed so you can diff rather than re-import.",
    },
  ],
};

export const STATE_API = {
  slug: "state-api",
  resource: "State",
  eyebrow: "State API",
  headline: "The layer most country datasets skip.",
  summary:
    "First-level administrative divisions for all 250 countries, with ISO 3166-2 codes, the official division type and the parent country. The piece most country-only datasets leave out.",
  count: "5,308",
  countLabel: "states and regions",
  fieldCount: 19,
  metaTitle: "State API: 5,308 States with ISO 3166-2 Codes",
  metaDescription:
    "State API returning 5,308 states, provinces, regions and territories across 250 countries, each with ISO 3166-2 codes, division type, parent country and coordinates.",
  keywords: [
    "state api",
    "states api",
    "province api",
    "iso 3166-2 api",
    "state list api",
    "administrative divisions api",
  ],
  endpoints: [
    { method: "GET", path: "/states", description: "Every state in the world, one call" },
    { method: "GET", path: "/countries/{ciso}/states", description: "States belonging to one country" },
    { method: "GET", path: "/countries/{ciso}/states/{siso}", description: "One state in full" },
    { method: "GET", path: "/iso/state", description: "Look a state up by its ISO 3166-2 code" },
    { method: "GET", path: "/timezone/{ciso}/{siso}", description: "Timezone for a given state" },
  ],
  sampleRequest: curlExample("/countries/IN/states/MH"),
  sampleResponse: `{
  "id": 4008,
  "name": "Maharashtra",
  "iso2": "MH",
  "iso3166_2": "IN-MH",
  "country_code": "IN",
  "type": "state",
  "level": 1,
  "latitude": "19.75147980",
  "longitude": "75.71388840",
  "timezone": "Asia/Kolkata",
  "wikiDataId": "Q1191"
}`,
  fields: [
    { name: "id", note: "Stable numeric identifier" },
    { name: "name", note: "English name" },
    { name: "iso2", note: "Subdivision part of the ISO code" },
    { name: "iso3166_2", note: "Full ISO 3166-2 code" },
    { name: "country_id", note: "Parent country id" },
    { name: "country_code", note: "Parent country ISO2" },
    { name: "type", note: "state, province, region, canton and so on" },
    { name: "level", note: "Depth in the official hierarchy" },
    { name: "parent_id", note: "Parent division, where one exists" },
    { name: "fips_code", note: "FIPS 10-4 code" },
    { name: "native", note: "Name in the local script" },
    { name: "latitude", note: "Centroid latitude" },
    { name: "longitude", note: "Centroid longitude" },
    { name: "timezone", note: "IANA zone" },
    { name: "population", note: "Latest published figure" },
    { name: "translations", note: "Name in other languages" },
    { name: "wikiDataId", note: "Wikidata item" },
  ],
  useCases: [
    "The second dropdown in a country, state and city address form, filtered by the country already chosen.",
    "Tax and shipping rules that differ by state, keyed on ISO 3166-2 rather than on a free-text name.",
    "Sales territories and reporting regions built on official divisions instead of an internal spreadsheet.",
    "Normalising inbound addresses where one system writes \"Maharashtra\" and another writes \"MH\".",
  ],
  faqs: [
    {
      q: "Which countries have state data?",
      a: "All 250. Coverage is the country's own first-level divisions, so the count varies from one (for small territories) to several hundred, and the type field says what they are called locally.",
    },
    {
      q: "Do you return ISO 3166-2 codes?",
      a: "Yes, in the iso3166_2 field, alongside the bare subdivision code in iso2. Use iso3166_2 when you need a globally unique value.",
    },
    {
      q: "What does the type field contain?",
      a: "The official name of the division: state, province, region, canton, prefecture, emirate and so on. It comes from the country's own statistical authority, not from a translation.",
    },
    {
      q: "Can I fetch every state in one request?",
      a: "Yes, GET /states returns them all. For a country-by-country load, GET /countries/{ciso}/states is smaller and usually what a dropdown wants.",
    },
  ],
};

export const CITY_API = {
  slug: "city-api",
  resource: "City",
  eyebrow: "City API",
  headline: "153,765 cities, each with a point on the map.",
  summary:
    "Cities, towns and settlements worldwide, each with its parent state and country, coordinates, IANA timezone and native name. Includes nearby search and autocomplete, so you can build a real location picker rather than a long select box.",
  count: "153,765",
  countLabel: "cities and settlements",
  fieldCount: 19,
  metaTitle: "City API: 153,765 Cities with Coordinates",
  metaDescription:
    "City API returning 153,765 cities and towns with latitude, longitude, IANA timezone, parent state and country, native names and translations. Includes nearby search and autocomplete.",
  keywords: [
    "city api",
    "cities api",
    "city apis",
    "city database api",
    "city autocomplete api",
    "nearby cities api",
  ],
  endpoints: [
    { method: "GET", path: "/countries/{ciso}/cities", description: "Every city in a country" },
    { method: "GET", path: "/countries/{ciso}/states/{siso}/cities", description: "Cities within one state" },
    { method: "GET", path: "/search/autocomplete", description: "Type-ahead for a location picker" },
    { method: "GET", path: "/search/nearby", description: "Cities near a latitude and longitude" },
    { method: "GET", path: "/timezone/{ciso}/{siso}/{city_id}", description: "Timezone for a given city" },
  ],
  sampleRequest: curlExample("/countries/IN/states/MH/cities"),
  sampleResponse: `{
  "id": 57606,
  "name": "Mumbai",
  "native": "मुंबई",
  "kind": "settlement",
  "state_code": "MH",
  "country_code": "IN",
  "latitude": "19.07283000",
  "longitude": "72.88261000",
  "timezone": "Asia/Kolkata",
  "wikiDataId": "Q1156"
}`,
  fields: [
    { name: "id", note: "Stable numeric identifier" },
    { name: "name", note: "English name" },
    { name: "native", note: "Name in the local script" },
    { name: "kind", note: "settlement, county or administrative unit" },
    { name: "type", note: "city, town, village and so on" },
    { name: "level", note: "Depth in the official hierarchy" },
    { name: "parent_id", note: "Containing division, where one exists" },
    { name: "state_id", note: "Parent state id" },
    { name: "state_code", note: "Parent state code" },
    { name: "country_id", note: "Parent country id" },
    { name: "country_code", note: "Parent country ISO2" },
    { name: "latitude", note: "Point latitude" },
    { name: "longitude", note: "Point longitude" },
    { name: "timezone", note: "IANA zone" },
    { name: "population", note: "Latest published figure" },
    { name: "translations", note: "Name in other languages" },
    { name: "wikiDataId", note: "Wikidata item" },
  ],
  useCases: [
    "The third dropdown in an address form, or a type-ahead that replaces all three.",
    "Showing the right local time for a user without asking them to pick a timezone.",
    "Finding the nearest serviceable city to a dropped pin, through /search/nearby.",
    "Seeding a store locator or coverage map with real coordinates rather than geocoding every row.",
  ],
  faqs: [
    {
      q: "How many cities does the API cover?",
      a: "153,765 cities, towns and settlements across 250 countries. Each one carries its parent state and country, so you never have to guess which Springfield you have.",
    },
    {
      q: "Is there an autocomplete endpoint?",
      a: "Yes. GET /search/autocomplete is built for type-ahead and returns ranked matches across countries, states and cities in one response.",
    },
    {
      q: "Do cities come with coordinates and timezones?",
      a: "Yes, latitude and longitude on every record and an IANA timezone such as Asia/Kolkata, which is what date libraries expect.",
    },
    {
      q: "Can I find cities near a point?",
      a: "Yes, GET /search/nearby takes a latitude, a longitude and a radius, and returns the cities inside it ordered by distance.",
    },
  ],
};

export const API_LANDING_PAGES = [COUNTRY_API, STATE_API, CITY_API];
