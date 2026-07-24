import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Scale, Building2, LineChart } from "lucide-react";
import { MaskLines } from "../components/Reveal";
import { IMAGES } from "../lib/data";

const floatIcons = [
  { Icon: Scale, label: "Legal", x: "8%", y: "26%", d: 0 },
  { Icon: LineChart, label: "Investment", x: "82%", y: "34%", d: 0.6 },
  { Icon: Building2, label: "Development", x: "72%", y: "72%", d: 1.2 },
];

export const Hero = ({ onExplore, onContact }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} data-testid="hero-section" className="relative min-h-screen overflow-hidden">
      {/* Parallax background */}
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0 -z-10">
        <img src={IMAGES.hero} alt="Australian skyline" className="w-full h-[120%] object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/60 to-white" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/70 to-transparent" />
      </motion.div>

      {/* Floating glass icons */}
      {floatIcons.map(({ Icon, label, x, y, d }, i) => (
        <motion.div
          key={label}
          className="absolute hidden md:flex flex-col items-center gap-2"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1, y: [0, -16, 0] }}
          transition={{
            opacity: { delay: 1 + i * 0.2, duration: 0.8 },
            scale: { delay: 1 + i * 0.2, duration: 0.8 },
            y: { duration: 5 + d, repeat: Infinity, ease: "easeInOut", delay: d },
          }}
        >
          <div className="glass w-20 h-20 rounded-2xl flex items-center justify-center shadow-[0_20px_50px_rgba(184,145,47,0.18)]">
            <Icon className="text-champagne" size={30} strokeWidth={1.4} />
          </div>
          <span className="overline text-[0.6rem]">{label}</span>
        </motion.div>
      ))}

      <motion.div
        style={{ y: textY, opacity: fade }}
        className="max-w-[1400px] mx-auto px-6 sm:px-12 pt-44 md:pt-52 pb-24 relative z-10"
      >
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="overline mb-8"
        >
          Legal · Investment · Development — Australia
        </motion.div>

        <h1 className="font-display font-light text-5xl sm:text-6xl lg:text-[5.5rem] leading-[0.98] tracking-tight text-[#111] max-w-5xl">
          <MaskLines delay={0.4} lines={["Transforming Your", "Real Estate Vision"]} />
          <span className="reveal-mask block">
            <motion.span
              className="block italic font-accent text-champagne"
              initial={{ y: "110%" }} animate={{ y: "0%" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.76 }}
            >
              Into Value.
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9 }}
          className="mt-8 max-w-xl text-lg text-[#4a4a4a] font-light leading-relaxed"
        >
          Where legal expertise meets property investment and development,
          delivering trusted solutions across Australia.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.9 }}
          className="mt-12 flex flex-col sm:flex-row gap-4"
        >
          <button data-testid="hero-explore-btn" onClick={onExplore} className="btn-gold px-8 py-4 text-sm inline-flex items-center justify-center gap-2 group">
            Explore Our Companies
            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
          <button data-testid="hero-contact-btn" onClick={onContact} className="btn-ghost px-8 py-4 text-sm">
            Contact Us
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};
