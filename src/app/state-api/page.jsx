import ApiLanding from "@/components/api-landing";
import CtaLink from "@/components/cta-link";
import JsonLd from "@/components/json-ld";
import { buttonVariants } from "@/components/ui/button";
import CtaPanel from "@/components/ui/cta-panel";
import { STATE_API } from "@/lib/api-landing-pages";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";

export const metadata = {
  title: STATE_API.metaTitle,
  description: STATE_API.metaDescription,
  keywords: STATE_API.keywords,
  alternates: {
    canonical: "/state-api/",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/api.png"],
  },
  openGraph: {
    images: [{ url: "/og/api.png", width: 1200, height: 630 }],
    title: STATE_API.metaTitle,
    description: STATE_API.metaDescription,
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "State API", path: "/state-api/" }])} />
      <JsonLd data={faqSchema(STATE_API.faqs)} />
      <ApiLanding page={STATE_API} />
      <CtaPanel
        title="Free up to 3,000 requests a month."
        actions={
          <>
            <CtaLink
              href="https://app.countrystatecity.in?utm_source=website&utm_medium=cta&utm_content=state-api_bottom"
              location="state-api_bottom"
              track="api"
              className={buttonVariants()}
            >
              Get free API key →
            </CtaLink>
            <CtaLink href="/pricing" location="state-api_bottom_plans" className={buttonVariants({ variant: "white" })}>
              Compare plans
            </CtaLink>
          </>
        }
      >
        Paid plans from $5 add higher limits. Supporter adds fuzzy search; Professional adds GraphQL and the change feed.
      </CtaPanel>
    </>
  );
}
