"use client";

import Marquee from "react-fast-marquee";

const items = [
  "Award-Winning Group",
  "Recognised Since 2021",
  "Local Business Award Winner",
  "Australian Small Business Champion Finalist",
  "PropertyGuru Asia Property Awards Winner 2025",
  "Best Investment Housing Development",
  "Best Housing Development \u2013 WA",
];

export const ValueMarquee = () => (
  <section data-testid="value-marquee" className="py-8 bg-[#0A2540] relative z-10 overflow-hidden">
    <Marquee speed={45} gradient={false} autoFill pauseOnHover>
      {items.map((w, i) => (
        <div key={i} className="flex items-center">
          <img
            src="/award-feather.png"
            alt=""
            aria-hidden
            className="h-7 w-auto mx-8 opacity-90"
          />
          <span className="font-display font-medium text-lg sm:text-xl tracking-wide text-white uppercase">
            {w}
          </span>
        </div>
      ))}
    </Marquee>
  </section>
);
