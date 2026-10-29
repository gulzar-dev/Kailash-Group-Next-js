"use client";

import { motion } from "framer-motion";
import { Reveal } from "../components/Reveal";

export const Awards = () => (
  <section id="awards" data-testid="awards-section" className="relative z-10 bg-white py-20 md:py-28 overflow-hidden">
    <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
      <Reveal className="max-w-2xl mb-10">
        <h2 className="font-display font-semibold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#0A2540] leading-[1.1]">
          Recognised for <span className="italic font-accent text-champagne">excellence.</span>
        </h2>
      </Reveal>

      <motion.div
        data-testid="awards-showcase-image"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(10,37,64,0.12)]"
      >
        <img
          src="/awards-showcase.png"
          alt="Kailash Group's collection of award trophies and certificates, including PropertyGuru Asia Property Awards, Parramatta Local Business Awards and Australian Small Business Champion Awards"
          className="w-full h-auto object-cover"
        />
      </motion.div>
    </div>
  </section>
);