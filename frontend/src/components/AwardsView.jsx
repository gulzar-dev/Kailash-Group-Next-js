"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Award, Trophy, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Footer } from "@/components/Footer";
import { MaskLines, Reveal } from "@/components/Reveal";

const COMPANY_AWARDS = [
  {
    key: "koala-invest",
    name: "Koala Invest",
    color: "#1E4E8C",
    items: [
      { year: "2021", title: "Local Business Awards" },
      { year: "2022", title: "Local Business Awards" },
      { year: "2023", title: "Australian Professionals Small Business Champion Awards" },
      { year: "2023", title: "Australian Professionals Small Business Champion Awards" },
      { year: "2025", title: "Local Business Awards" },
      { year: "2025", title: "Parramatta Local Business Awards", note: "Finalist" },
    ],
  },
  {
    key: "kailash-lawyers",
    name: "Kailash Lawyers & Consultants",
    color: "#0A2540",
    items: [
      { year: "2021", title: "Local Business Awards" },
      { year: "2022", title: "NSW Volunteer of the Year" },
      { year: "2022", title: "Local Business Awards" },
      { year: "2023", title: "Australian Professionals Small Business Champion Awards" },
      { year: "2023", title: "Australian Professionals Small Business Champion Awards" },
      { year: "2025", title: "Australian Professionals Small Business Champion Awards" },
    ],
    highlights: [
      { year: "2021", title: "Parramatta Local Business Awards", tag: "Winner" },
      { year: "2022", title: "Parramatta Local Business Awards — Outstanding Professional Services", tag: "Finalist" },
      { year: "2023", title: "Australian Small Business Champion Awards — Legal Services", tag: "Finalist" },
    ],
  },
  {
    key: "kuber-projects",
    name: "Kuber Projects",
    color: "#C6A15B",
    items: [
      { year: "2025", title: "The PropertyGuru Asia Property Awards (Australia)" },
    ],
  },
];

export function AwardsView() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <main data-testid="awards-page">
      {/* Hero with group photo */}
      <section className="relative min-h-[85vh] flex items-end overflow-hidden bg-[#0A2540]">
        <div className="absolute inset-0 -z-0">
          <img
            src="/awards-group.webp"
            alt="Kailash Group team at the Australian Professionals Small Business Champion Awards 2025"
            className="w-full h-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540] via-[#0A2540]/70 to-[#0A2540]/20" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-12 pb-20 pt-40 w-full text-white">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/80 mb-10 link-underline">
            <ArrowLeft size={16} /> Kailash Group
          </Link>
          <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.98] max-w-4xl">
            <MaskLines lines={["Awards &"]} />
            <span className="reveal-mask block">
              <motion.span
                className="block italic font-accent text-champagne"
                initial={{ y: "110%" }} animate={{ y: "0%" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
              >
                Recognition.
              </motion.span>
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/70 font-light leading-relaxed">
            Nearly two decades of trust, expertise and community — recognised by
            juries, peers and the industries we serve across Australia.
          </p>
        </div>
      </section>

      {/* Companies + awards */}
      <section className="bg-white py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 space-y-20">
          {COMPANY_AWARDS.map((co, idx) => (
            <Reveal key={co.key}>
              <div className="grid lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-4">
                  <span className="inline-block w-14 h-1 mb-6" style={{ background: co.color }} />
                  <h2 className="font-display font-semibold text-3xl sm:text-4xl text-[#0A2540] leading-tight">
                    {co.name}
                  </h2>
                  <p className="mt-4 text-sm text-[#5B6B7F] font-light">
                    {co.items.length} recognition{co.items.length !== 1 ? "s" : ""} to date
                  </p>
                </div>

                <div className="lg:col-span-8 grid sm:grid-cols-2 gap-4">
                  {co.items.map((a, i) => (
                    <motion.div
                      key={`${co.key}-${i}`}
                      whileHover={{ y: -4 }}
                      className="rounded-2xl border border-[#D9E1EC] p-6 bg-[#F5F8FC] flex gap-4 items-start"
                    >
                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: `${co.color}18` }}
                      >
                        <Trophy size={18} style={{ color: co.color }} />
                      </div>
                      <div>
                        <div className="font-display font-semibold text-2xl text-[#0A2540] leading-none">
                          {a.year}
                        </div>
                        <div className="mt-2 text-sm text-[#334155] leading-snug">{a.title}</div>
                        {a.note && (
                          <span className="mt-2 inline-block text-[10px] tracking-widest uppercase text-champagne font-semibold">
                            {a.note}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {co.highlights && (
                <div className="mt-10 rounded-3xl border border-champagne/30 bg-gradient-to-br from-champagne/5 via-white to-white p-8 sm:p-10">
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles size={18} className="text-champagne" />
                    <span className="font-display font-semibold text-[#0A2540] text-sm uppercase tracking-widest">
                      Specifically identified
                    </span>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    {co.highlights.map((h, i) => (
                      <div key={i} className="border-l-2 border-champagne pl-5">
                        <div className="font-display font-semibold text-3xl text-[#0A2540]">{h.year}</div>
                        <div className="mt-2 text-sm text-[#334155] leading-snug">{h.title}</div>
                        <span className="mt-3 inline-block text-[10px] tracking-widest uppercase text-champagne font-semibold">
                          {h.tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </section>

      {/* Certificate of Appreciation */}
      <section className="bg-[#F5F8FC] py-20 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
          <Reveal className="mb-10">
            <h2 className="font-display font-semibold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#0A2540] leading-[1.05]">
              Other <span className="italic font-accent text-champagne">recognition.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <motion.div
              whileHover={{ y: -4 }}
              className="rounded-3xl bg-white border border-[#D9E1EC] p-8 sm:p-12 flex flex-col md:flex-row gap-8 items-start"
              data-testid="certificate-appreciation"
            >
              <div className="w-16 h-16 rounded-full bg-champagne/15 flex items-center justify-center shrink-0">
                <Award size={26} className="text-champagne" />
              </div>
              <div>
                <div className="text-xs tracking-widest uppercase text-champagne font-semibold mb-3">
                  Certificate of Appreciation
                </div>
                <p className="font-display text-xl sm:text-2xl text-[#0A2540] font-light leading-snug max-w-3xl">
                  Presented to <span className="font-semibold">Kailash Group of Companies</span> for
                  valuable sponsorship of <em className="font-accent">Woh Lamhe Musical</em>,
                  presented by <span className="font-semibold">Bandeesh Group</span> in support of
                  Sri Om Foundation.
                </p>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0A2540] py-16 md:py-20 text-white">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl">Work with an award-winning team.</h2>
            <p className="mt-3 text-white/60 font-light">Legal counsel, investment research, and property development — under one roof.</p>
          </div>
          <Link href="/#contact" className="inline-flex px-8 py-4 text-sm items-center gap-2 bg-champagne text-[#0A2540] rounded-[10px] font-medium hover:bg-white transition-colors">
            Reach out to us
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
