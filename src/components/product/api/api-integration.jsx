"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { CopyIcon, CheckIcon } from "lucide-react";
import PHPIcon from "@/icons/PHPIcon";
import PythonIcon from "@/icons/PythonIcon";
import JavaScriptIcon from "@/icons/JavaScriptIcon";

const EXAMPLES = {
  javascript: {
    title: "JavaScript",
    icon: JavaScriptIcon,
    code: `// Get all countries
fetch('https://api.countrystatecity.in/v1/countries', {
  headers: {
    'X-CSCAPI-KEY': 'your-api-key'
  }
})
.then(response => response.json())
.then(countries => {
  console.log(countries);
});

// Get states in a country
fetch('https://api.countrystatecity.in/v1/countries/IN/states', {
  headers: {
    'X-CSCAPI-KEY': 'your-api-key'
  }
})
.then(response => response.json())
.then(states => {
  console.log(states);
});`,
  },
  python: {
    title: "Python",
    icon: PythonIcon,
    code: `import requests

# Get all countries
headers = {
    'X-CSCAPI-KEY': 'your-api-key'
}

response = requests.get(
    'https://api.countrystatecity.in/v1/countries',
    headers=headers
)
countries = response.json()
print(countries)

# Get states in a country
response = requests.get(
    'https://api.countrystatecity.in/v1/countries/IN/states',
    headers=headers
)
states = response.json()
print(states)`,
  },
  php: {
    title: "PHP",
    icon: PHPIcon,
    code: `<?php
$headers = [
    'X-CSCAPI-KEY: your-api-key'
];

// Get all countries
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.countrystatecity.in/v1/countries');
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$countries = json_decode(curl_exec($ch));
curl_close($ch);

print_r($countries);
?>`,
  },
};

function sanitizeCommands(raw) {
  if (!raw) return "";
  const text = raw.replace(/\/\*[\s\S]*?\*\//g, "");
  const lines = text.split("\n").map((l) => l.replace(/\r/g, ""));
  const cleanLine = (l) => {
    let s = l;
    s = s.replace(/^\s*(?:PS\s*>\s*|$$venv$$\s*\$\s*|\$\s*|>\s*)/, "");
    if (/^\s*#/.test(s) || /^\s*\/\//.test(s)) return "";
    if (!/^https?:\/\//.test(s) && s.includes(" # ")) {
      s = s.split(" # ")[0];
    }
    return s.trim();
  };
  const isCommand = (s) => /^(fetch|requests|curl)\b/.test(s);
  const output = [];
  let cont = "";
  for (const rawLine of lines) {
    const s = cleanLine(rawLine);
    if (!s) continue;
    const endsWithBackslash = /\\\s*$/.test(s);
    const withoutBackslash = s.replace(/\\\s*$/, "").trim();
    if (cont) {
      cont += " " + withoutBackslash;
      if (!endsWithBackslash) {
        if (isCommand(cont)) output.push(cont);
        cont = "";
      }
      continue;
    }
    if (endsWithBackslash) {
      cont = withoutBackslash;
      continue;
    }
    if (isCommand(s)) output.push(s);
  }
  if (cont && isCommand(cont)) output.push(cont);
  return output.join("\n").trim();
}

export default function EasyIntegration() {
  const [active, setActive] = useState("javascript");
  const code = useMemo(() => EXAMPLES[active].code, [active]);
  const copyText = useMemo(() => sanitizeCommands(code), [code]);

  return (
    <section className="relative container mx-auto px-4">
      {/* Header */}
      <div className="text-center">
        <div
          className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 ring-1 ring-light shadow-sm"
          aria-label="Setup"
        >
          <span
            className="h-1.5 w-1.5 rounded-full bg-green"
            aria-hidden="true"
          />
          <span className="text-[11px] font-semibold tracking-wider uppercase text-darkgray">
            Integration
          </span>
        </div>

        <h2 className="mt-4 text-4xl md:text-5xl font-bold">
          <span className="bg-gradient-to-r from-blue to-green bg-clip-text text-transparent">
            Easy Integration
          </span>
        </h2>
        <p className="mt-2 max-w-prose mx-auto text-darkgray">
          Get started in minutes with our simple RESTful API.
        </p>
      </div>

      {/* Tabs + Code */}
      <div className="mt-8 rounded-2xl bg-white/70 backdrop-blur-sm border border-light/60 shadow-[0_1px_0_rgba(15,23,42,0.04),0_8px_24px_rgba(2,6,23,0.06)] overflow-hidden">
        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Code examples"
          className="flex flex-wrap items-center gap-2 border-b border-light/60 bg-white/80 p-2"
        >
          {Object.keys(EXAMPLES).map((key, i) => {
            const k = key;
            const isActive = active === k;
            const isBlue = i % 2 === 0;
            const Icon = EXAMPLES[k].icon;
            return (
              <button
                key={k}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${k}`}
                id={`tab-${k}`}
                onClick={() => setActive(k)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold transition-colors focus:outline-none",
                  isActive
                    ? isBlue
                      ? "bg-blue/10 text-blue ring-1 ring-blue"
                      : "bg-green/10 text-green ring-1 ring-green"
                    : "text-darkgray hover:bg-white"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4",
                    isActive
                      ? isBlue
                        ? "text-blue"
                        : "text-green"
                      : "text-darkgray"
                  )}
                  aria-hidden="true"
                />
                {EXAMPLES[k].title}
              </button>
            );
          })}
        </div>

        {/* Code panel */}
        <div
          id={`panel-${active}`}
          role="tabpanel"
          aria-labelledby={`tab-${active}`}
          className="relative"
        >
          <CopyButton text={copyText} />
          <pre className="m-0 overflow-x-auto p-4 md:p-6 text-sm leading-6 text-white bg-dark">
            <code>{code}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      // no-op
    }
  }

  return (
    <div className="absolute right-3 top-3 z-10">
      <button
        onClick={handleCopy}
        className={cn(
          "inline-flex items-center gap-2 rounded-md border px-2.5 py-1.5 text-xs font-semibold shadow-sm transition-colors",
          "border-light/60 bg-white/90 text-dark hover:bg-white",
          copied
            ? "ring-2 ring-green"
            : "focus:outline-none focus:ring-2 focus:ring-blue"
        )}
        aria-live="polite"
        aria-label={copied ? "Copied" : "Copy code"}
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
