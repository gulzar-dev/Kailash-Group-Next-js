"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Linkedin, Mail } from "lucide-react";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { TIMELINE } from "@/lib/data";

const TEAM = [
  {
    name: "Amit Pall",
    role: "CEO & Founder",
    initials: "AP",
    image: "/amit-pall.jpeg",
    bio: "Nearly two decades of leadership across legal services, property investment and development. Amit founded Kailash Group on a simple conviction: expertise is a means, and purpose is the destination.",
    color: "#0A2540",
  },
  {
    name: "Dhawal Amlani",
    role: "Chief Financial Officer",
    initials: "DA",
    image: "/dhawal-amlani.jpeg",
    bio: "Steward of the Group's financial discipline, architecting resilient capital structures across our legal, investment and development businesses.",
    color: "#1E4E8C",
  },
  {
    name: "Sumeet Gupta",
    role: "Business Consultant",
    initials: "SG",
    image: "/sumeet-gupta.jpeg",
    bio: "Strategic advisor helping the Group scale with rigour, from operational excellence to market intelligence across Australia and beyond.",
    color: "#C6A15B",
  },
];

const values = [
  { n: "01", t: "Integrity above all", d: "Every recommendation, contract and project is answerable to the client's long-term interest, never the short-term win." },
  { n: "02", t: "Expertise that connects", d: "Legal, investment and development under one roof means the right specialist is never more than one conversation away." },
  { n: "03", t: "Purpose beyond profit", d: "We measure success not only in value created but in the koalas protected, the elders supported and the communities strengthened." },
];

const Avatar = ({ person }) => {
  if (person.image) {
    return (
      <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl border border-[#D9E1EC]">
        <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
      </div>
    );
  }
  return (
    <div className="aspect-[4/5] w-full rounded-2xl border border-[#D9E1EC] flex items-center justify-center" style={{ background: `${person.color}12` }}>
      <div className="w-40 h-40 rounded-full flex items-center justify-center font-display font-semibold text-5xl text-white" style={{ background: person.color }}>
        {person.initials}
      </div>
    </div>
  );
};

export function AboutView() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main data-testid="about-page">
      {/* Banner + values */}
      <section className="bg-white pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 grid lg:grid-cols-12 gap-10 items-center">
          <Reveal className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden border border-[#D9E1EC] aspect-[4/5] lg:aspect-[4/4.6] shadow-[0_30px_80px_rgba(10,37,64,0.12)]">
              <img src="/about-banner.webp" alt="Kailash Group team" className="w-full h-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.15} className="lg:col-span-6">
            <div className="text-[11px] tracking-[0.28em] uppercase text-champagne font-semibold mb-4">
              Our team
            </div>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#0A2540] leading-[1.15]">
              One Group. Three specialisms. <span className="italic font-accent text-champagne">One shared standard.</span>
            </h2>
            <div className="mt-10 space-y-8">
              {values.map((v) => (
                <div key={v.n} className="flex gap-6">
                  <span className="font-accent italic text-4xl text-champagne shrink-0 leading-none pt-1">{v.n}</span>
                  <div>
                    <h3 className="font-display font-semibold text-2xl text-[#0A2540]">{v.t}</h3>
                    <p className="mt-2 text-[#475569] font-light leading-relaxed">{v.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-[#F5F8FC] py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
          <Reveal className="max-w-2xl mb-14">
            <h2 className="font-display font-semibold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#0A2540] leading-[1.1]">
              Leadership <span className="italic font-accent text-champagne">team.</span>
            </h2>
            <p className="mt-6 text-lg text-[#475569] font-light">
              Advisors, operators and builders, united by a shared standard of care.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            {TEAM.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 220, damping: 22 }}
                  data-testid={`team-${p.initials.toLowerCase()}`}
                  className="bg-white rounded-3xl overflow-hidden border border-[#D9E1EC] h-full flex flex-col"
                >
                  <div className="p-4">
                    <Avatar person={p} />
                  </div>
                  <div className="px-7 pb-7 pt-1 flex-1 flex flex-col">
                    <div className="font-display font-semibold text-2xl text-[#0A2540]">{p.name}</div>
                    <div className="mt-1 text-sm text-champagne font-medium tracking-wide uppercase">{p.role}</div>
                    <p className="mt-4 text-[#475569] font-light leading-relaxed flex-1">{p.bio}</p>
                    <div className="mt-6 flex gap-3">
                      <span className="w-9 h-9 rounded-full border border-[#D9E1EC] flex items-center justify-center text-[#0A2540] hover:bg-[#0A2540] hover:text-white transition-colors cursor-pointer">
                        <Linkedin size={15} />
                      </span>
                      <span className="w-9 h-9 rounded-full border border-[#D9E1EC] flex items-center justify-center text-[#0A2540] hover:bg-[#0A2540] hover:text-white transition-colors cursor-pointer">
                        <Mail size={15} />
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Journey timeline */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
          <Reveal className="mb-14">
            <h2 className="font-display font-semibold text-4xl sm:text-5xl tracking-tight text-[#0A2540] leading-[1.1]">
              The <span className="italic font-accent text-champagne">journey.</span>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-5 gap-8">
            {TIMELINE.map((t, i) => (
              <div key={t.year} className="relative">
                {i < TIMELINE.length - 1 && (
                  <div className="hidden md:block absolute top-[7px] left-1/2 w-full h-px bg-[#D9E1EC] z-0" />
                )}
                <Reveal delay={i * 0.08}>
                  <div className="w-3.5 h-3.5 rounded-full bg-champagne border-2 border-white ring-2 ring-champagne/25 relative z-10 mb-6" />
                  <div className="font-display font-semibold text-3xl text-[#0A2540]">{t.year}</div>
                  <div className="mt-2 font-medium text-sm text-[#0A2540]">{t.title}</div>
                  <p className="mt-2 text-sm text-[#5B6B7F] font-light">{t.desc}</p>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - navy band, gold button (matches Awards CTA) */}
      <section className="bg-[#0A2540] py-16 md:py-20 text-white" data-testid="about-cta">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl leading-[1.15]">
              Ready to work with a team that means it?
            </h2>
            <p className="mt-3 text-white/60 font-light">
              Start a conversation with our advisors today.
            </p>
          </div>
          <Link href="/#contact" data-testid="about-get-in-touch" className="inline-flex px-8 py-4 text-sm items-center gap-2 bg-champagne text-[#0A2540] rounded-[10px] font-medium hover:bg-white transition-colors">
            Get in Touch <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
