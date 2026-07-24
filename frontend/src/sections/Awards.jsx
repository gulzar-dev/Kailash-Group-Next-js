import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { AWARDS } from "../lib/data";

export const Awards = () => (
  <section id="awards" data-testid="awards-section" className="relative z-10 bg-white py-20 md:py-28 overflow-hidden">
    <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
      <Reveal className="max-w-2xl mb-10">
        <h2 className="font-display font-semibold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#0A2540] leading-[1.02]">
          Recognised for <span className="italic font-accent text-champagne">excellence.</span>
        </h2>
      </Reveal>
    </div>

    {/* Horizontal scrolling timeline */}
    <div className="relative">
      <div className="flex gap-6 overflow-x-auto px-6 sm:px-12 pb-8 snap-x [scrollbar-width:none] [-ms-overflow-style:none]" style={{ scrollbarWidth: "none" }} data-testid="awards-track">
        {AWARDS.map((a, i) => (
          <motion.div
            key={i}
            data-testid={`award-${i}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="snap-start shrink-0 w-[300px] relative rounded-2xl border border-[#D9E1EC] bg-[#F5F8FC] p-8 overflow-hidden group"
          >
            {/* champagne glow */}
            <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-champagne/15 blur-3xl group-hover:bg-champagne/30 transition-colors duration-500" />
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-[#0A2540] flex items-center justify-center mb-8 shadow-[0_10px_30px_rgba(184,145,47,0.3)]">
                <Trophy className="text-champagne" size={24} strokeWidth={1.5} />
              </div>
              <div className="font-display text-5xl text-[#0A2540]">{a.year}</div>
              <h3 className="mt-4 font-medium text-lg text-[#0A2540] leading-snug">{a.title}</h3>
              <p className="mt-2 text-sm text-[#5B6B7F] font-light">{a.org}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
    <div className="max-w-[1400px] mx-auto px-6 sm:px-12 mt-4">
      <span className="text-xs text-[#94A3B8]">← Scroll to explore the full timeline</span>
    </div>
  </section>
);
