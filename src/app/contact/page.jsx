import Contact from "@/components/contact";
import ContactHero from "@/components/contact-hero";

export const metadata = {
  title: "Contact Us - Get Support & Connect with Our Team",
  description: "Need help with CSC Database? Contact our support team for API assistance, technical support, partnerships, and general inquiries. We're here to help!",
  keywords: ["contact", "support", "help", "technical support", "API help", "partnerships", "CSC support"],
  openGraph: {
    title: "Contact CSC Database - Support & Assistance",
    description: "Get expert help with geographical data APIs, technical support, and partnership opportunities.",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <Contact />
    </>
  );
}
