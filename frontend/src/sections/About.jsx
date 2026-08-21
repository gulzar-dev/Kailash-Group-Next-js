"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "../components/Reveal";
import { TIMELINE, IMAGES } from "../lib/data";

const chapters = [
  { n: "01", t: "A principled foundation", d: "Two decades of leadership under Amit Pall, built on integrity, trust and an unwavering commitment to clients." },
  { n: "02", t: "Integrated expertise", d: "Legal counsel, investment research and property development — three disciplines, one accountable team." },
  { n: "03", t: "Australian at heart", d: "Rooted in Parramatta, serving clients across NSW, Queensland and Western Australia." },
];

export const About = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="about" data-testid="about-section" className="relative z-10 bg-[#F5F8FC] py-20 md:py-28 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Portrait with clipped frame + spotlight */}
          <Reveal className="relative order-2 lg:order-1">
            <div ref={ref} className="relative rounded-2xl overflow-hidden aspect-[4/5] border border-[#D9E1EC] shadow-[0_30px_80px_rgba(0,0,0,0.1)]">
              <motion.img style={{ y }} src={IMAGES.portrait} alt="Amit Pall" className="w-full h-[116%] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/40 to-transparent" />
              <div className="absolute bottom-6 left-6 glass rounded-xl px-5 py-4">
                <div className="font-display text-lg text-[#0A2540]">Amit Pall</div>
                <div className="text-xs text-[#5B6B7F] tracking-wide">Founder & Principal</div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-champagne/10 blur-2xl -z-0" />
          </Reveal>

          <div className="order-1 lg:order-2">
            <h2 className="font-display font-semibold text-4xl sm:text-5xl tracking-tight text-[#0A2540] leading-[1.05]">
              Nearly <span className="italic font-accent text-champagne">20 years</span> of trusted leadership.
            </h2>
            <div className="mt-10 space-y-8">
              {chapters.map((c, i) => (
                <Reveal key={c.n} delay={i * 0.1} className="flex gap-6">
                  <span className="font-accent italic text-2xl text-champagne shrink-0">{c.n}</span>
                  <div>
                    <h3 className="font-display text-xl text-[#0A2540]">{c.t}</h3>
                    <p className="mt-2 text-[#475569] font-light">{c.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-20">
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
      </div>
    </section>
  );
};