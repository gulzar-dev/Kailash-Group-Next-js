import { motion } from "framer-motion";
import { Reveal } from "../components/Reveal";
import { COMMUNITY } from "../lib/data";

const Koala = () => (
  <motion.svg
    width="120" height="120" viewBox="0 0 120 120" fill="none"
    animate={{ y: [0, -10, 0], rotate: [0, 3, 0] }}
    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    aria-hidden
  >
    <circle cx="30" cy="34" r="16" fill="#b5b5b5" />
    <circle cx="90" cy="34" r="16" fill="#b5b5b5" />
    <circle cx="30" cy="34" r="9" fill="#d8d8d8" />
    <circle cx="90" cy="34" r="9" fill="#d8d8d8" />
    <ellipse cx="60" cy="62" rx="34" ry="32" fill="#9a9a9a" />
    <ellipse cx="60" cy="66" rx="24" ry="22" fill="#c7c7c7" />
    <circle cx="49" cy="58" r="4.5" fill="#2a2a2a" />
    <circle cx="71" cy="58" r="4.5" fill="#2a2a2a" />
    <ellipse cx="60" cy="72" rx="9" ry="7" fill="#2a2a2a" />
  </motion.svg>
);

export const Community = () => (
  <section id="community" data-testid="community-section" className="relative z-10 bg-[#f2efe6] py-28 md:py-40 overflow-hidden">
    <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <Reveal className="max-w-2xl">
          <div className="overline mb-5">Community Impact</div>
          <h2 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#111] leading-[1.02]">
            Giving back, <span className="italic font-accent text-champagne">naturally.</span>
          </h2>
        </Reveal>
        <div className="hidden md:block"><Koala /></div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {COMMUNITY.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.12}>
            <motion.div
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              data-testid={`community-card-${i}`}
              className="rounded-2xl overflow-hidden bg-white border border-[#e6e3da] h-full"
            >
              <div className="relative h-56 overflow-hidden">
                <img src={c.image} alt={c.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1.2s]" />
                <span className="absolute top-4 left-4 glass rounded-full px-3 py-1 text-xs font-medium text-[#111]">{c.tag}</span>
              </div>
              <div className="p-7">
                <h3 className="font-display text-2xl text-[#111]">{c.title}</h3>
                <p className="mt-3 text-[#4a4a4a] font-light leading-relaxed">{c.desc}</p>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
