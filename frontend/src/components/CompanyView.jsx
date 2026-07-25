"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { Footer } from "@/components/Footer";
import { MaskLines, Reveal } from "@/components/Reveal";
import { COMPANIES } from "@/lib/data";

export function CompanyView({ slug }) {
  const router = useRouter();
  const company = COMPANIES.find((c) => c.slug === slug);
  const others = COMPANIES.filter((c) => c.slug !== slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!company) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="font-display text-3xl">Company not found</p>
        <Link href="/" className="btn-gold px-6 py-3 text-sm">Back home</Link>
      </div>
    );
  }

  return (
    <main data-testid="company-page">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={company.image} alt={company.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-[#0A2540]/30" />
        </div>
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 pb-20 w-full">
          <button data-testid="company-back" onClick={() => router.push("/")} className="inline-flex items-center gap-2 text-sm text-[#0A2540] mb-10 link-underline">
            <ArrowLeft size={16} /> Kailash Group
          </button>
          <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl tracking-tight text-[#0A2540] leading-[0.98] max-w-4xl">
            <MaskLines lines={[company.name]} />
          </h1>
          <p className="mt-6 font-accent italic text-2xl text-champagne">{company.tagline}</p>
        </div>
      </section>

      {/* Intro + practice */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 grid lg:grid-cols-2 gap-16">
          <Reveal>
            <p className="font-display text-2xl sm:text-3xl font-light text-[#0A2540] leading-snug">{company.intro}</p>
            <p className="mt-8 text-lg text-[#475569] font-light leading-relaxed">{company.body}</p>
            <Link href="/#contact" className="mt-10 inline-flex btn-gold px-8 py-4 text-sm items-center gap-2">
              Enquire Now <ArrowUpRight size={18} />
            </Link>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="glass rounded-3xl p-8 sm:p-10">
              <h3 className="font-display text-2xl text-[#0A2540] mb-6">What we do</h3>
              <ul className="space-y-4">
                {company.practice.map((p) => (
                  <li key={p} className="flex items-center gap-4 py-3 border-b border-black/5 last:border-0">
                    <span className="w-8 h-8 rounded-full bg-champagne/15 flex items-center justify-center shrink-0">
                      <Check size={15} className="text-champagne" />
                    </span>
                    <span className="text-[#0A2540]">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Other companies */}
      <section className="bg-[#F5F8FC] py-16 md:py-20">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
          <h2 className="font-display text-3xl text-[#0A2540] mb-10">Explore the Group</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {others.map((o) => (
              <motion.button
                key={o.slug}
                whileHover={{ y: -6 }}
                onClick={() => router.push(`/company/${o.slug}`)}
                data-testid={`related-${o.slug}`}
                className="text-left rounded-2xl border border-[#D9E1EC] bg-white p-8 flex items-center justify-between group"
              >
                <div>
                  <div className="font-display text-2xl text-[#0A2540]">{o.name}</div>
                  <p className="mt-2 text-sm text-[#5B6B7F]">{o.tagline}</p>
                </div>
                <ArrowUpRight className="text-champagne group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
