import JsonLd from "@/components/json-ld";
import { FAQS } from "@/data/faqs";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata = {
  title: "FAQs - API, Pricing & Data Questions",
  description: "Answers about the CSC Database API, pricing, data accuracy, usage limits and implementation, from rate limits to licensing.",
  keywords: ["FAQ", "help", "questions", "API help", "database questions", "technical help", "support", "troubleshooting"],
  twitter: {
    card: "summary_large_image",
    images: ["/og/faqs.png"],
  },
  openGraph: {
    images: [{ url: "/og/faqs.png", width: 1200, height: 630 }],
    title: "CSC Database FAQ - Get Your Questions Answered",
    description: "Quick answers to common questions about geographical data API, implementation, and pricing.",
    type: "website",
  },
  alternates: {
    canonical: "/faqs/",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

export default function FAQsLayout({ children }) {
  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema([{ name: "FAQs", path: "/faqs/" }])} />
      {children}
    </>
  );
}
