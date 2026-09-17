"use client";

import { Reveal } from "@/components/Reveal";
import { FAQS } from "@/lib/data";
import { faqPageJsonLd } from "@/lib/jsonld";

export const FAQ = ({ data, items: itemsProp, ...props }) => {
  const items = itemsProp || FAQS;
  return (
  <section id="faq" data-testid="faq-section" className="relative z-10 bg-[#F5F8FC] py-20 md:py-28">
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(items)) }}
    />
    <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
      <Reveal className="max-w-2xl mb-12">
        <h2 className="font-display font-semibold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#0A2540] leading-[1.1]">
          {data?.heading || "Frequently "}<span className="italic font-accent text-champagne">{data?.headingAccent || "asked."}</span>
        </h2>
      </Reveal>

      <div className="max-w-3xl space-y-4" data-testid="faq-list">
        {items.map((f, i) => (
          <Reveal key={f.q} delay={i * 0.06}>
            <details
              data-testid={`faq-item-${i}`}
              className="group rounded-2xl border border-[#D9E1EC] bg-white px-6 py-5 [&::-webkit-details-marker]:hidden"
            >
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-display font-medium text-lg text-[#0A2540]">
                {f.q}
                <span className="shrink-0 text-champagne text-2xl leading-none transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-[#475569] font-light leading-relaxed">{f.a}</p>
            </details>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
  );
};
