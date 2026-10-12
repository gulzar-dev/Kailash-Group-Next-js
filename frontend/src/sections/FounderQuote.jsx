"use client";

import { Reveal } from "@/components/Reveal";

export const FounderQuote = () => (
  <section id="founder" data-testid="founder-quote-section" className="relative z-10 bg-white py-20 md:py-24">
    <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
      <Reveal>
        <div className="rounded-3xl border border-[#D9E1EC] bg-[#F5F8FC] overflow-hidden flex flex-col sm:flex-row items-center gap-8 sm:gap-10 p-8 sm:p-12">
          <div className="w-28 h-28 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white shadow-[0_15px_40px_rgba(10,37,64,0.15)] shrink-0">
            <img src="/amit-pall.jpeg" alt="Amit Pall" className="w-full h-full object-cover" />
          </div>
          <div className="text-center sm:text-left">
            <p className="font-display italic text-xl sm:text-2xl lg:text-3xl text-[#0A2540] leading-snug">
              &ldquo;Integrity, expertise and purpose, that's the standard we hold ourselves to, every single time.&rdquo;
            </p>
            <div className="mt-4 text-sm text-[#5B6B7F]">
              <span className="font-semibold text-[#0A2540]">Amit Pall</span> — Founder & CEO, Kailash Group
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);
