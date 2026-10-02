import Link from "next/link";

import CodePanel from "@/components/ui/code-panel";

const BASE = "https://api.countrystatecity.in";

const TABS = [
  { label: "cURL", code: `curl "${BASE}/v1/countries/IN/states" \\\n  -H "X-CSCAPI-KEY: $API_KEY"` },
  { label: "JavaScript", code: `const res = await fetch(\n  "${BASE}/v1/countries/IN/states",\n  { headers: { "X-CSCAPI-KEY": API_KEY } }\n);\nconst states = await res.json();` },
  { label: "Python", code: `import requests\n\nstates = requests.get(\n  "${BASE}/v1/countries/IN/states",\n  headers={"X-CSCAPI-KEY": API_KEY},\n).json()` },
  { label: "PHP", code: `$ch = curl_init("${BASE}/v1/countries/IN/states");\ncurl_setopt($ch, CURLOPT_HTTPHEADER, ["X-CSCAPI-KEY: $apiKey"]);\ncurl_setopt($ch, CURLOPT_RETURNTRANSFER, true);\n$states = json_decode(curl_exec($ch), true);` },
  { label: "GraphQL", code: `curl -X POST "${BASE}/v1/graphql" \\\n  -H "X-CSCAPI-KEY: $API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{"query":"{ country(iso2:\\"IN\\") { name states { name iso2 } } }"}'` },
];

export default function ApiIntegration() {
  return (
    <section className="wrap-flush grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-center gap-[clamp(28px,5vw,64px)] py-[clamp(56px,7vw,104px)]">
      <div className="flex flex-col gap-3.5 px-2">
        <div className="eyebrow">Integration</div>
        <h2 className="display-2 m-0">Your first request in a minute.</h2>
        <p className="m-0 text-[17px] leading-[1.55] text-ink-2">
          One header for auth. Every snippet below is copy-paste ready: swap in your key and run it.
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2.5 pt-1.5 text-[15px]">
          <a href="https://playground.countrystatecity.in/" target="_blank" rel="noopener noreferrer" className="text-blue hover:text-blue-deep hover:underline">Open the playground</a>
          <Link href="/ecosystem" className="text-blue hover:text-blue-deep hover:underline">SDKs for npm and PyPI</Link>
        </div>
      </div>
      <CodePanel tabs={TABS} minHeight="min-h-[190px]" />
    </section>
  );
}
