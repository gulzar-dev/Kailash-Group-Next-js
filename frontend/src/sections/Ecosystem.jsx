import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { COMPANIES } from "../lib/data";

// Orbital hub: three companies orbit the Kailash Group logo (desktop),
// graceful grid on mobile.
export const Ecosystem = () => {
  const navigate = useNavigate();
  const radius = 230;

  return (
    <section id="companies" data-testid="ecosystem-section" className="relative z-10 bg-[#F5F8FC] py-20 md:py-28 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
        <Reveal className="max-w-2xl mb-12">
          <h2 className="font-display font-semibold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#0A2540] leading-[1.02]">
            One group,<br /><span className="italic font-accent text-champagne">three specialisms.</span>
          </h2>
          <p className="mt-6 text-lg text-[#475569] font-light">
            Three companies orbit a single vision — connected by the Kailash Group brand,
            each an expert in its own right.
          </p>
        </Reveal>

        {/* Desktop orbital */}
        <div className="hidden lg:flex justify-center">
          <div className="relative" style={{ width: 620, height: 620 }}>
            {/* orbit rings */}
            <div className="absolute inset-0 rounded-full border border-champagne/20" />
            <div className="absolute rounded-full border border-black/5" style={{ inset: 90 }} />
            {/* rotating container */}
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
              {COMPANIES.map((c, i) => {
                const angle = (i / COMPANIES.length) * Math.PI * 2 - Math.PI / 2;
                const cx = 310 + radius * Math.cos(angle) - 90;
                const cy = 310 + radius * Math.sin(angle) - 90;
                return (
                  <motion.button
                    key={c.slug}
                    data-testid={`orbit-${c.slug}`}
                    onClick={() => navigate(`/company/${c.slug}`)}
                    className="absolute w-[180px] group text-left"
                    style={{ left: cx, top: cy }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    whileHover={{ scale: 1.06 }}
                  >
                    <div className="glass rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.06)] group-hover:shadow-[0_30px_70px_rgba(184,145,47,0.2)] transition-shadow">
                      <div className="overline text-[0.6rem] mb-2">{c.short}</div>
                      <div className="font-display text-lg leading-tight text-[#0A2540]">{c.name}</div>
                      <div className="mt-3 inline-flex items-center gap-1 text-xs text-champagne">
                        Discover <ArrowUpRight size={14} />
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
            {/* center logo */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-40 h-40 rounded-full bg-[#0A2540] flex flex-col items-center justify-center text-white shadow-[0_20px_60px_rgba(17,17,17,0.3)]">
                <span className="font-display text-2xl">Kailash</span>
                <span className="w-1.5 h-1.5 rounded-full bg-champagne my-1" />
                <span className="font-accent italic text-white/60">Group</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile / tablet grid */}
        <div className="lg:hidden grid sm:grid-cols-3 gap-5">
          {COMPANIES.map((c) => (
            <Reveal key={c.slug}>
              <button
                data-testid={`orbit-mobile-${c.slug}`}
                onClick={() => navigate(`/company/${c.slug}`)}
                className="glass rounded-2xl p-6 text-left w-full h-full"
              >
                <div className="overline text-[0.6rem] mb-2">{c.short}</div>
                <div className="font-display text-xl text-[#0A2540]">{c.name}</div>
                <p className="mt-2 text-sm text-[#5B6B7F]">{c.tagline}</p>
                <div className="mt-4 inline-flex items-center gap-1 text-xs text-champagne">
                  Discover <ArrowUpRight size={14} />
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
