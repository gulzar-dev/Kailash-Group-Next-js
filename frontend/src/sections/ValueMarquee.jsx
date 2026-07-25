"use client";

import Marquee from "react-fast-marquee";

const words = ["Integrity", "Excellence", "Trust", "Innovation", "Expertise", "Community"];

export const ValueMarquee = () => (
  <section data-testid="value-marquee" className="py-10 bg-[#0A2540] relative z-10 overflow-hidden">
    <Marquee speed={40} gradient={false} autoFill>
      {words.map((w, i) => (
        <div key={i} className="flex items-center">
          <span className="font-display italic text-4xl sm:text-6xl text-white/90 mx-8">{w}</span>
          <span className="w-2 h-2 rounded-full bg-champagne mx-8" />
        </div>
      ))}
    </Marquee>
  </section>
);