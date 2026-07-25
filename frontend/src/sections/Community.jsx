"use client";

import { motion } from "framer-motion";
import { Reveal } from "../components/Reveal";
import { COMMUNITY } from "../lib/data";

export const Community = () => (
  <section id="community" data-testid="community-section" className="relative z-10 bg-[#EEF2F7] py-20 md:py-28 overflow-hidden">
    <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
        <Reveal className="max-w-2xl">
          <h2 className="font-display font-semibold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#0A2540] leading-[1.02]">
            Giving back, <span className="italic font-accent text-champagne">naturally.</span>
          </h2>
        </Reveal>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {COMMUNITY.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.12}>
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              data-testid={`community-card-${i}`}
              className="rounded-2xl overflow-hidden bg-white border border-[#D9E1EC] h-full"
            >
              <div className="relative h-56 overflow-hidden">
                <img src={c.image} alt={c.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1.2s]" />
                <span className="absolute top-4 left-4 glass rounded-full px-3 py-1 text-xs font-medium text-[#0A2540]">{c.tag}</span>
              </div>
              <div className="p-7">
                <h3 className="font-display text-2xl text-[#0A2540]">{c.title}</h3>
                <p className="mt-3 text-[#475569] font-light leading-relaxed">{c.desc}</p>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);