"use client";

import { useState } from "react";

import CopyButton from "@/components/ui/copy-button";
import OfflineLive from "@/components/ecosystem/offline-live";
import Segmented from "@/components/ui/segmented";
import { NPM_PACKAGES, PYPI_PACKAGES } from "@/data/ecosystem-channels";
import { cn } from "@/lib/utils";

const KIND_STYLE = {
  Live: "bg-blue text-white",
  Tool: "bg-live-bg text-live-ink",
  Offline: "bg-field text-ink-3",
};

const REGISTRIES = [
  { value: "npm", label: "npm · 10 packages" },
  { value: "py", label: "PyPI · 8 packages" },
];

export default function EcosystemPackages() {
  const [registry, setRegistry] = useState("npm");
  const py = registry === "py";
  const packages = py ? PYPI_PACKAGES : NPM_PACKAGES;

  return (
    <>
    <section className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-start gap-[clamp(28px,5vw,64px)] py-[clamp(56px,7vw,104px)]">
      <div className="flex flex-col gap-3.5">
        <div className="eyebrow">Packages</div>
        <h2 className="display-2 m-0">Install it the way you work.</h2>
        <p className="m-0 text-[17px] leading-[1.55] text-ink-2">
          Typed, versioned and synced from the database every week. Offline snapshots need no key and no network. All packages are
          ODbL-1.0.
        </p>
        <Segmented label="Registry" items={REGISTRIES} value={registry} onChange={setRegistry} className="self-start" />
        <div className="text-sm text-ink-3">
          {py ? "Python 3.8–3.12 · typed, mypy --strict" : "Node.js and browser · TypeScript types included"}
        </div>
      </div>
      <div className="overflow-hidden rounded-3xl border border-line">
        {packages.map((p, i) => (
          <div key={p.name} className={cn("flex flex-wrap items-center gap-x-3.5 gap-y-2.5 px-4 py-3.5", i > 0 && "border-t border-hair")}>
            <span className={cn("w-[58px] shrink-0 rounded-full px-[9px] py-1 text-center font-mono text-xs", KIND_STYLE[p.kind])}>{p.kind}</span>
            <div className="flex min-w-0 flex-[1_1_240px] flex-col gap-0.5">
              <span className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                <span className="text-[15px] font-semibold">{p.name}</span>
                <span className="text-[13px] text-ink-3">{p.desc}</span>
              </span>
              <span className="truncate font-mono text-[13px] text-ink-code">{p.cmd}</span>
            </div>
            <CopyButton text={p.cmd} className="py-2" />
          </div>
        ))}
      </div>
    </section>
    <OfflineLive py={py} />
    </>
  );
}
