import Tilt from "react-parallax-tilt";
import { Reveal } from "../components/Reveal";
import { SERVICES } from "../lib/data";

export const Services = () => (
  <section id="services" data-testid="services-section" className="relative z-10 bg-white py-28 md:py-40">
    <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
        <Reveal className="max-w-2xl">
          <h2 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#0A2540] leading-[1.02]">
            Expertise, <span className="italic font-accent text-champagne">end to end.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="max-w-sm text-[#475569] font-light">
            From the first legal consultation to the handover of keys — every stage
            handled with precision and care.
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
              <div
                data-testid={`service-card-${i}`}
                className="group relative h-[460px] rounded-2xl overflow-hidden border border-[#D9E1EC] bg-white"
              >
                <div className="absolute inset-0">
                  <img src={s.image} alt={s.title} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-[1.2s]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/90 via-[#0A2540]/30 to-transparent" />
                </div>
                <div className="relative h-full flex flex-col justify-between p-8 text-white">
                  <span className="font-accent italic text-champagne text-2xl">{s.n}</span>
                  <div>
                    <h3 className="font-display text-2xl leading-tight">{s.title}</h3>
                    <p className="mt-3 text-sm text-white/70 font-light max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </div>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
