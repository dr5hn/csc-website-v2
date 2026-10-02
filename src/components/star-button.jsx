"use client";

import CtaLink from "@/components/cta-link";
import { useRepoStars } from "@/hooks/use-repo-stars";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const REPO_URL = "https://github.com/dr5hn/countries-states-cities-database";

/** Pill link to the database repo with a live star count. */
export default function StarButton({ location, label = "★ Star", variant = "field", size = "lg", className }) {
  const { label: count } = useRepoStars();

  return (
    <CtaLink
      href={REPO_URL}
      location={location}
      track="github"
      className={cn(buttonVariants({ variant, size }), className)}
    >
      <span>{label}</span>
      <span className="font-mono text-blue">{count}</span>
    </CtaLink>
  );
}
