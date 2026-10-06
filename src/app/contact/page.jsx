import SupportLinks from "@/components/support/support-links";
import SupportRouter from "@/components/support/support-router";

export const metadata = {
  title: "Contact Us - Get Support & Connect with Our Team",
  description: "Need help with CSC Database? Contact our support team for API assistance, technical support, partnerships, and general inquiries. We're here to help!",
  keywords: ["contact", "support", "help", "technical support", "API help", "partnerships", "CSC support"],
  alternates: {
    canonical: "/contact/",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/support.jpg"],
  },
  openGraph: {
    images: [{ url: "/og/support.jpg", width: 1200, height: 630 }],
    title: "Contact CSC Database - Support & Assistance",
    description: "Get expert help with geographical data APIs, technical support, and partnership opportunities.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <SupportRouter />
      <SupportLinks />
    </>
  );
}
