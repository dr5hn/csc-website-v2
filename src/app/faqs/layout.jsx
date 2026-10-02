import { FAQS } from "@/data/faqs";

export const metadata = {
  title: "Frequently Asked Questions - CSC Database Help Center",
  description: "Find answers to common questions about CSC Database API, pricing, data accuracy, usage limits, and technical implementation. Get help fast!",
  keywords: ["FAQ", "help", "questions", "API help", "database questions", "technical help", "support", "troubleshooting"],
  twitter: {
    card: "summary_large_image",
    images: ["/og/faqs.jpg"],
  },
  openGraph: {
    images: [{ url: "/og/faqs.jpg", width: 1200, height: 630 }],
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
