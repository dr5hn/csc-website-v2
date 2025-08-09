"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MessageSquare, Download, SquareTerminal } from "lucide-react";

function IconBadge({ Icon, accent = "blue" }) {
  const styles =
    accent === "green"
      ? {
          wrap: "from-green/10 to-green/5 ring-green/20",
          icon: "text-green",
        }
      : {
          wrap: "from-blue/10 to-blue/5 ring-blue/20",
          icon: "text-blue",
        };

  return (
    <div
      className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${styles.wrap} ring-1`}
    >
      <Icon className={`h-6 w-6 ${styles.icon}`} />
    </div>
  );
}

function ProductCard({
  title,
  description,
  href = "#",
  accent = "blue",
  Icon,
}) {
  return (
    <div className="group relative rounded-2xl border border-light/60 bg-white/70 backdrop-blur-sm shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative p-6 sm:p-7 flex flex-col h-full">
        <div className="mb-4">
          <IconBadge Icon={Icon} accent={accent} />
        </div>

        <h3 className="text-xl font-semibold text-dark mb-2">{title}</h3>
        <p className="text-darkgray leading-relaxed mb-6">{description}</p>

        <div className="mt-auto flex items-center justify-between">
          <Link
            href={href}
            className={`text-sm font-semibold ${
              accent === "green"
                ? "text-green hover:text-green/90"
                : "text-blue hover:text-blue/90"
            }`}
            aria-label={`Learn more about ${title}`}
          >
            Learn more →
          </Link>
          <Button
            variant="outline"
            className="border-light text-dark hover:bg-light/60 bg-transparent"
            asChild
          >
            <Link href={href}>Open</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Products() {
  return (
    <section className="relative bg-gradient-to-br from-white via-light/30 to-blue/5">
      <div className="container mx-auto px-4 py-10 lg:py-20">
        <div className="text-center mb-8">
          <span className="inline-flex items-center rounded-full border border-light px-3 py-1 text-xs font-medium text-darkgray bg-white/70">
            Products
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold text-dark">
            Build with the tools you need
          </h2>
          <p className="mt-3 text-darkgray">
            A focused suite for location data: integrate, manage, and export.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <ProductCard
            title="API Access"
            description="Query countries, states, and cities via fast REST and GraphQL endpoints with rock‑solid accuracy."
            href="/products/api"
            accent="blue"
            Icon={SquareTerminal}
          />

          <ProductCard
            title="Manager"
            description="Submit feedback, report issues, or suggest new data."
            href="/products/manager"
            accent="green"
            Icon={MessageSquare}
          />

          <ProductCard
            title="Export Tool"
            description="Download curated datasets in CSV, JSON, or SQL. Free and paid formats available."
            href="/products/export"
            accent="blue"
            Icon={Download}
          />
        </div>
      </div>
    </section>
  );
}
