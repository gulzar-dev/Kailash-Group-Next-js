"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/Footer";

const CONTENT = {
  privacy: {
    title: "Privacy Policy",
    body: [
      "Kailash Group respects your privacy and is committed to protecting the personal information you share with us. This policy explains what we collect, how we use it and the choices you have.",
      "We collect information you voluntarily provide via our enquiry form (name, email, phone, message) and standard analytics data. We use this information solely to respond to your enquiry and improve our services.",
      "We do not sell your data. We share information only with our internal team and trusted service providers required to deliver our services.",
      "You may request access, correction or deletion of your personal information at any time by writing to amit@kailashgroup.com.au.",
    ],
  },
  disclaimer: {
    title: "Disclaimer",
    body: [
      "The information provided on this website is general in nature and does not constitute legal, financial or investment advice. It is provided for information purposes only.",
      "Property investment and development carry risks. Past performance and awards do not guarantee future results. You should obtain independent professional advice before making any decisions based on the information here.",
      "While we take reasonable care to ensure that the information on this website is accurate and up to date, we make no warranties as to its completeness or currency, and accept no liability for any loss arising from reliance on it.",
    ],
  },
  acknowledgement: {
    title: "Acknowledgement of Country",
    body: [
      "Kailash Group acknowledges the Traditional Custodians of the lands on which we live, work and build — the Dharug people of the Parramatta region and the many First Nations peoples across Australia.",
      "We pay our respects to Elders past, present and emerging, and recognise their continuing connection to land, waters and community.",
      "As advisors and developers, we are committed to conducting our work with respect for Country and to supporting reconciliation in the communities we serve.",
    ],
  },
};

export function LegalView({ slug }) {
  const doc = CONTENT[slug];
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!doc) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="font-display text-3xl">Page not found</p>
        <Link href="/" className="btn-gold px-6 py-3 text-sm">Back home</Link>
      </main>
    );
  }

  return (
    <main data-testid={`legal-${slug}`}>
      <section className="bg-gradient-to-b from-[#F5F8FC] to-white pt-40 pb-16">
        <div className="max-w-4xl mx-auto px-6 sm:px-12">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#0A2540] mb-8 link-underline">
            <ArrowLeft size={16} /> Kailash Group
          </Link>
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#0A2540] leading-[1.02]">
            {doc.title}
          </h1>
        </div>
      </section>
      <section className="bg-white pb-24">
        <div className="max-w-3xl mx-auto px-6 sm:px-12 space-y-6">
          {doc.body.map((p, i) => (
            <p key={i} className="text-lg text-[#334155] leading-relaxed font-light">{p}</p>
          ))}
          <p className="text-sm text-[#94A3B8] pt-6">Last updated: {new Date().getFullYear()}</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
