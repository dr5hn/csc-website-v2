"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { CopyIcon, CheckIcon, Terminal, ArrowRight } from "lucide-react";
import Link from "next/link";
import PythonIcon from "@/icons/PythonIcon";
import JavaScriptIcon from "@/icons/JavaScriptIcon";

// Monospace stack for code/JSON — independent of the app's display font.
const MONO =
  "ui-monospace, SFMono-Regular, Menlo, Consolas, 'Liberation Mono', monospace";

// One endpoint, shown three ways. Each tab is the same request to the same
// endpoint, so the response panel stays constant across tabs.
const ENDPOINT = "GET /v1/countries/IN/states";

const REQUESTS = {
  curl: {
    title: "cURL",
    icon: Terminal,
    code: `curl https://api.countrystatecity.in/v1/countries/IN/states \\
  -H "X-CSCAPI-KEY: YOUR_API_KEY"`,
  },
  javascript: {
    title: "JavaScript",
    icon: JavaScriptIcon,
    code: `const res = await fetch(
  "https://api.countrystatecity.in/v1/countries/IN/states",
  { headers: { "X-CSCAPI-KEY": "YOUR_API_KEY" } }
);

const states = await res.json();`,
  },
  python: {
    title: "Python",
    icon: PythonIcon,
    code: `import requests

res = requests.get(
    "https://api.countrystatecity.in/v1/countries/IN/states",
    headers={"X-CSCAPI-KEY": "YOUR_API_KEY"},
)
states = res.json()`,
  },
};

// Illustrative response — mirrors the real /states schema (id, name, iso2).
const RESPONSE = `[
  { "id": 4008, "name": "Maharashtra", "iso2": "MH" },
  { "id": 4026, "name": "Karnataka",   "iso2": "KA" },
  { "id": 4035, "name": "Tamil Nadu",  "iso2": "TN" },
  { "id": 4021, "name": "Delhi",       "iso2": "DL" },
  { "id": 4030, "name": "Gujarat",     "iso2": "GJ" }
]`;

export default function ApiShowcase() {
  const [active, setActive] = useState("curl");
  const code = useMemo(() => REQUESTS[active].code, [active]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue/[0.02] to-green/[0.03] py-10 lg:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 ring-1 ring-light shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-green" aria-hidden="true" />
            <span className="text-[11px] font-semibold tracking-wider uppercase text-darkgray">
              Quick start
            </span>
          </div>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-dark">
            See the API{" "}
            <span className="bg-gradient-to-r from-blue to-green bg-clip-text text-transparent">
              in action
            </span>
          </h2>
          <p className="mt-3 text-lg text-darkgray">
            One authenticated request returns clean, structured JSON — countries,
            states, and cities, ready for your app.
          </p>
        </div>

        {/* Request + Response */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch max-w-5xl mx-auto">
          {/* Request */}
          <div className="rounded-2xl bg-white/70 backdrop-blur-sm border border-light/60 shadow-[0_1px_0_rgba(15,23,42,0.04),0_8px_24px_rgba(2,6,23,0.06)] overflow-hidden flex flex-col">
            <div
              role="tablist"
              aria-label="Request examples"
              className="flex flex-wrap items-center gap-2 border-b border-light/60 bg-white/80 p-2"
            >
              {Object.keys(REQUESTS).map((key) => {
                const isActive = active === key;
                const Icon = REQUESTS[key].icon;
                return (
                  <button
                    key={key}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="request-panel"
                    id={`tab-${key}`}
                    onClick={() => setActive(key)}
                    className={cn(
                      "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue",
                      isActive
                        ? "bg-blue/10 text-blue ring-1 ring-blue"
                        : "text-darkgray hover:bg-white"
                    )}
                  >
                    <Icon
                      className={cn("h-4 w-4", isActive ? "text-blue" : "text-darkgray")}
                      aria-hidden="true"
                    />
                    {REQUESTS[key].title}
                  </button>
                );
              })}
            </div>
            <div
              id="request-panel"
              role="tabpanel"
              aria-labelledby={`tab-${active}`}
              className="relative flex-1"
            >
              <CopyButton text={code} label="Copy request" />
              <pre className="m-0 h-full overflow-x-auto p-4 md:p-6 text-sm leading-6 text-white bg-dark" style={{ fontFamily: MONO }}>
                <code>{code}</code>
              </pre>
            </div>
          </div>

          {/* Response */}
          <div className="rounded-2xl bg-white/70 backdrop-blur-sm border border-light/60 shadow-[0_1px_0_rgba(15,23,42,0.04),0_8px_24px_rgba(2,6,23,0.06)] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between gap-2 border-b border-light/60 bg-white/80 p-2 pl-4">
              <span className="text-xs text-darkgray truncate" style={{ fontFamily: MONO }}>{ENDPOINT}</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green/10 px-2.5 py-1 text-xs font-semibold text-green">
                <span className="h-1.5 w-1.5 rounded-full bg-green" aria-hidden="true" />
                200 OK
              </span>
            </div>
            <div className="relative flex-1">
              <CopyButton text={RESPONSE} label="Copy response" />
              <pre className="m-0 h-full overflow-x-auto p-4 md:p-6 text-sm leading-6 text-white bg-dark" style={{ fontFamily: MONO }}>
                <code>{RESPONSE}</code>
              </pre>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="https://docs.countrystatecity.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-semibold text-blue hover:text-blue/80 transition-colors group"
          >
            Read the full docs
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function CopyButton({ text, label = "Copy" }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      // Clipboard unavailable (e.g. insecure context) — fail quietly.
    }
  }

  return (
    <div className="absolute right-3 top-3 z-10">
      <button
        onClick={handleCopy}
        className={cn(
          "inline-flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-xs font-semibold shadow-sm transition-colors",
          "border-light/60 bg-white/90 text-dark hover:bg-white",
          copied ? "ring-2 ring-green" : "focus:outline-none focus:ring-2 focus:ring-blue"
        )}
        aria-live="polite"
        aria-label={copied ? "Copied" : label}
      >
        {copied ? (
          <CheckIcon className="h-4 w-4 text-green" aria-hidden="true" />
        ) : (
          <CopyIcon className="h-4 w-4 text-blue" aria-hidden="true" />
        )}
        <span className={copied ? "text-green" : "text-blue"}>
          {copied ? "Copied" : "Copy"}
        </span>
      </button>
    </div>
  );
}
