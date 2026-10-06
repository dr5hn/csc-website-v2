"use client";

import Link from "next/link";

import CtaLink from "@/components/cta-link";
import SectionHead from "@/components/ui/section-head";
import Tag from "@/components/ui/tag";
import { REPO_URL } from "@/components/star-button";
import { useRepoStars } from "@/hooks/use-repo-stars";

const CHANNELS = [
  { name: "REST API", tag: "Hosted", desc: "Countries, states and cities over HTTPS with an API key.", cmd: "GET /v1/countries", href: "/product/api" },
  { name: "GraphQL", tag: "Hosted", desc: "Ask for a country, its states and their fields in one query.", cmd: "POST /v1/graphql", href: "/product/api" },
  { name: "npm", tag: "10 packages", desc: "An official API SDK, a CLI and eight offline data packages.", cmd: "npm i @countrystatecity/sdk", href: "https://www.npmjs.com/org/countrystatecity" },
  { name: "PyPI", tag: "8 packages", desc: "A typed sync + async API client, plus offline data packages.", cmd: "pip install countrystatecity-api", href: "https://pypi.org/org/countrystatecity/" },
  { name: "CLI", tag: "Tool", desc: "Search, explore and generate dropdowns or seeds from your terminal.", cmd: "csc search states --country IN", href: "https://www.npmjs.com/package/@countrystatecity/cli" },
  { name: "Export Tool", tag: "Files", desc: "Pick data, fields and format. 5 free credits to start.", cmd: "13 formats · CSV to GeoJSON", href: "/product/export-tool" },
  { name: "Update Tool", tag: "Community", desc: "Suggest corrections that ship in the next release.", cmd: "Submit a change →", href: "/product/update-tool" },
  { name: "Playground", tag: "Docs", desc: "Try any endpoint in the browser before writing code.", cmd: "Open playground →", href: "https://playground.countrystatecity.in/" },
  { name: "GitHub", tag: "Open data", desc: "Raw data files, releases and issues. ODbL-1.0.", cmd: "stars", href: REPO_URL },
];

export default function EcosystemTeaser() {
  const { label: stars } = useRepoStars();

  return (
    <section id="ecosystem" className="border-y border-hair bg-mist">
      <div className="wrap section-y flex flex-col gap-10">
        <SectionHead eyebrow="Ecosystem" title="One dataset. Use it however you build.">
          <p className="m-0">
            Same records, same IDs, in every channel. Switch from the API to a package or a file without remapping anything.
          </p>
          <Link href="/ecosystem" className="text-[15px] font-semibold text-blue hover:text-blue-deep hover:underline">
            Explore the ecosystem →
          </Link>
        </SectionHead>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] gap-3">
          {CHANNELS.map((channel) => (
            <CtaLink
              key={channel.name}
              href={channel.href}
              location={`home_channel_${channel.name.toLowerCase().replace(/\s+/g, "_")}`}
              className="flex flex-col gap-2.5 rounded-[20px] border border-line bg-white p-[22px] text-ink no-underline transition duration-200 hover:-translate-y-0.5 hover:border-blue hover:text-ink hover:no-underline"
            >
              <div className="flex items-center justify-between">
                <div className="font-cal text-[22px]">{channel.name}</div>
                <Tag>{channel.tag}</Tag>
              </div>
              <div className="text-[15px] leading-normal text-ink-2">{channel.desc}</div>
              <div className="mt-auto font-mono text-[13px] text-blue">{channel.cmd === "stars" ? `★ ${stars}` : channel.cmd}</div>
            </CtaLink>
          ))}
        </div>
      </div>
    </section>
  );
}
