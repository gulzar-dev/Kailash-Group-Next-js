"use client";

import { useRouter } from "next/navigation";
import Tilt from "react-parallax-tilt";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { SERVICES } from "../lib/data";

export const Services = () => {
  const router = useRouter();
  return (
    <section id="services" data-testid="services-section" className="relative z-10 bg-white py-20 md:py-28">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
          <Reveal className="max-w-2xl">
            <h2 className="font-display font-semibold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#0A2540] leading-[1.1]">
              Expertise, <span className="italic font-accent text-champagne">end to end.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="max-w-sm text-[#475569] font-light">
              From the first legal consultation to the handover of keys, every stage handled with precision and care.
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.12}>
              <Tilt
                glareEnable
                glareMaxOpacity={0.15}
                glareColor="#d4af37"
                glarePosition="all"
                tiltMaxAngleX={6}
                tiltMaxAngleY={6}
                transitionSpeed={1200}
                className="h-full"
              >
                <button
                  type="button"
                  onClick={() => router.push(`/company/${s.slug}`)}
                  data-testid={`service-card-${i}`}
                  className="group relative h-[460px] w-full rounded-2xl overflow-hidden border border-[#D9E1EC] bg-white text-left cursor-pointer"
                >
                  <div className="absolute inset-0">
                    <img src={s.image} alt={s.title} className="w-full h-full object-cover opacity-95 group-hover:scale-105 transition-transform duration-[1200ms]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/92 via-[#0A2540]/35 to-transparent" />
                  </div>
                  <div className="relative h-full flex flex-col justify-end p-8 text-white">
                    <div className="flex items-start justify-between">
                      <h3 className="font-display font-semibold text-2xl leading-tight max-w-[80%]">{s.title}</h3>
                      <span className="w-10 h-10 rounded-full bg-white/15 border border-white/30 flex items-center justify-center backdrop-blur-md group-hover:bg-champagne group-hover:border-champagne transition-colors">
                        <ArrowUpRight size={16} className="text-white" />
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-white/75 font-light max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                      {s.desc}
                    </p>
                  </div>
                </button>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
