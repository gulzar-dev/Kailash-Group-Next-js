"use client";

import { Linkedin, Heart, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { LINKEDIN_PROFILE_URL } from "@/data/linkedin-posts";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const formatDate = (iso) => {
  const [y, m] = iso.split("-");
  return `${MONTHS[Number(m) - 1]} ${y}`;
};

export const LinkedInPosts = ({ posts = [] }) => {
  if (!posts.length) return null;

  return (
    <section id="linkedin" data-testid="linkedin-section" className="relative z-10 bg-white py-20 md:py-24">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <Reveal className="max-w-2xl">
            <h2 className="font-display font-semibold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#0A2540] leading-[1.1]">
              From the <span className="italic font-accent text-champagne">founder.</span>
            </h2>
            <p className="mt-4 text-lg text-[#475569] font-light">
              Recent posts and reflections from Amit Pall on LinkedIn.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <a
              href={LINKEDIN_PROFILE_URL}
              target="_blank"
              rel="noreferrer"
              data-testid="linkedin-follow-btn"
              className="inline-flex items-center gap-2 btn-ghost px-6 py-3 text-sm"
            >
              <Linkedin size={16} /> Follow on LinkedIn
            </a>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1}>
              <a
                href={p.permalink}
                target="_blank"
                rel="noreferrer"
                data-testid={`linkedin-post-${i}`}
                className="group relative flex flex-col h-full rounded-2xl border border-[#D9E1EC] bg-white p-7 hover:-translate-y-1 transition-transform duration-500 overflow-hidden"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-full bg-[#0A2540] flex items-center justify-center overflow-hidden shrink-0">
                    <img src="/amit-pall.jpeg" alt="Amit Pall" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="font-display font-semibold text-sm text-[#0A2540]">Amit Pall</div>
                    <div className="text-xs text-[#5B6B7F]">Founder & CEO · Kailash Group</div>
                  </div>
                  <Linkedin size={16} className="text-[#0A66C2]" />
                </div>

                <div className="text-xs text-[#94A3B8] mb-3">{formatDate(p.date)}</div>
                <p className="text-[#334155] leading-relaxed flex-1 font-light">
                  {p.excerpt}
                </p>

                <div className="mt-6 pt-5 border-t border-black/5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-[#5B6B7F]">
                    <Heart size={13} />
                    <span>{p.reactions}</span>
                  </div>
                  <ArrowUpRight size={16} className="text-champagne opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <span className="absolute top-6 right-6 text-[10px] uppercase tracking-widest text-champagne font-semibold">
                  {p.tag}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
