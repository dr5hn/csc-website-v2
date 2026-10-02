// Illustrative search demo for the API page. It runs in the browser on ten real cities
// and mimics the shape of the hosted endpoints; the page labels the data "illustrative".

export const DEMO_CITIES = [
  ["Bengaluru", "Karnataka, India", 12.9716, 77.5946, "Asia/Kolkata", "+05:30"],
  ["Mumbai", "Maharashtra, India", 19.076, 72.8777, "Asia/Kolkata", "+05:30"],
  ["Pune", "Maharashtra, India", 18.5204, 73.8567, "Asia/Kolkata", "+05:30"],
  ["Mysuru", "Karnataka, India", 12.2958, 76.6394, "Asia/Kolkata", "+05:30"],
  ["Munich", "Bavaria, Germany", 48.1351, 11.582, "Europe/Berlin", "+02:00"],
  ["Nuremberg", "Bavaria, Germany", 49.4521, 11.0767, "Europe/Berlin", "+02:00"],
  ["San Francisco", "California, United States", 37.7749, -122.4194, "America/Los_Angeles", "−07:00"],
  ["Los Angeles", "California, United States", 34.0522, -118.2437, "America/Los_Angeles", "−07:00"],
  ["Sydney", "New South Wales, Australia", -33.8688, 151.2093, "Australia/Sydney", "+10:00"],
  ["São Paulo", "São Paulo, Brazil", -23.5505, -46.6333, "America/Sao_Paulo", "−03:00"],
];

export const DEMOS = [
  { label: "Fuzzy", title: "Typo-tolerant", q: "banglore", tries: ["banglore", "mumbay", "munchen"], plan: "Supporter and up", path: (q) => `/v1/search/fuzzy?q=${encodeURIComponent(q)}` },
  { label: "Autocomplete", title: "Autocomplete", q: "mu", tries: ["mu", "san", "syd"], plan: "Supporter and up", path: (q) => `/v1/search/autocomplete?q=${encodeURIComponent(q)}` },
  { label: "Nearby", title: "Nearby", q: "19.0760, 72.8777", tries: ["19.0760, 72.8777", "48.1351, 11.5820", "37.7749, -122.4194"], plan: "Supporter and up", path: (q) => `/v1/search/nearby?lat=${(q.split(",")[0] || "").trim()}&lng=${(q.split(",")[1] || "").trim()}` },
  { label: "Timezone", title: "Timezone", q: "Munich", tries: ["Munich", "Sydney", "São Paulo"], plan: "All plans", path: (q) => `/v1/cities?name=${encodeURIComponent(q)}&fields=timezone` },
];

const ALIASES = { bangalore: "bengaluru", bombay: "mumbai", munchen: "munich", mumbay: "mumbai" };

const normalise = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

/** Levenshtein edit distance. */
export function distance(a, b) {
  const m = a.length;
  const n = b.length;
  const d = Array.from({ length: m + 1 }, (_, i) => [i]);
  for (let j = 1; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    }
  }
  return d[m][n];
}

const haversineKm = (lat1, lng1, lat2, lng2) => {
  const rad = (x) => (x * Math.PI) / 180;
  const dLat = rad(lat2 - lat1);
  const dLng = rad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLng / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(a));
};

/**
 * @param {number} demo - Index into DEMOS.
 * @param {string} query
 * @returns {{ name: string, sub: string, tag: string, tone: "blue"|"live"|"mist" }[]}
 */
export function runDemo(demo, query) {
  const q = normalise(query.trim());
  if (!q) return [];

  if (demo === 0) {
    return DEMO_CITIES.map((c) => {
      const n = normalise(c[0]);
      const alts = Object.keys(ALIASES).filter((k) => ALIASES[k] === n);
      const dist = Math.min(distance(q, n.slice(0, Math.max(q.length, 3))), ...alts.map((a) => distance(q, a)));
      return { c, n, dist };
    })
      .filter((x) => x.dist <= Math.max(2, Math.floor(q.length / 3)))
      .sort((a, b) => a.dist - b.dist)
      .slice(0, 3)
      .map(({ c, n, dist }) => ({
        name: c[0],
        sub: c[1],
        tag: q === n ? "exact" : `score ${Math.min(0.95, 1 - dist / 10).toFixed(2)}`,
        tone: "blue",
      }));
  }

  if (demo === 1) {
    return DEMO_CITIES.filter((c) => normalise(c[0]).startsWith(q))
      .slice(0, 4)
      .map((c, i) => ({ name: c[0], sub: c[1], tag: `#${i + 1}`, tone: "blue" }));
  }

  if (demo === 2) {
    const parts = q.split(",");
    if (parts.length !== 2 || parts.some((part) => !part.trim())) return [];
    const [lat, lng] = parts.map(Number);
    if (!Number.isFinite(lat) || !Number.isFinite(lng) || Math.abs(lat) > 90 || Math.abs(lng) > 180) return [];
    return DEMO_CITIES.map((c) => ({ c, km: haversineKm(lat, lng, c[2], c[3]) }))
      .sort((a, b) => a.km - b.km)
      .slice(0, 3)
      .map(({ c, km }) => ({ name: c[0], sub: c[1], tag: km < 1 ? "0 km" : `${Math.round(km).toLocaleString("en-US")} km`, tone: "live" }));
  }

  const city = DEMO_CITIES.find((x) => normalise(x[0]) === q);
  if (!city) return [];
  return [
    { name: city[0], sub: city[4], tag: `UTC ${city[5]}`, tone: "blue" },
    { name: "DST-aware", sub: "Offsets follow daylight saving automatically", tag: "IANA", tone: "mist" },
  ];
}
