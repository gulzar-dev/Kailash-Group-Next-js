"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { MaskLines } from "../components/Reveal";
import { IMAGES } from "../lib/data";

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

      {/* Hero content */}
      <motion.div
        style={{ y: textY, opacity: fade }}
        className="max-w-[1400px] mx-auto px-6 sm:px-12 pt-32 md:pt-40 pb-16 relative z-10"
      >
        <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-[5.5rem] leading-[0.98] tracking-tight text-[#0A2540] max-w-5xl mt-4">
          <MaskLines delay={0.4} lines={["Built on Expertise."]} />
          <span className="reveal-mask block">
            <motion.span
              className="block italic font-accent text-champagne"
              initial={{ y: "110%" }} animate={{ y: "0%" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.76 }}
            >
              Driven by Purpose.
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9 }}
          className="mt-8 max-w-xl text-lg text-[#475569] font-light leading-relaxed"
        >
          Bringing together expertise across law, property and development
          to create lasting value for people and communities.
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