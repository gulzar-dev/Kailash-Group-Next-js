import Link from "next/link";
import { CONTACT, COMPANIES } from "@/lib/data";

export const Footer = () => (
  <footer data-testid="site-footer" className="bg-[#0A2540] text-white pt-24 pb-10 relative z-10">
    <div className="max-w-[1400px] mx-auto px-6 sm:px-12">
      <div className="grid md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-2xl tracking-[0.14em] uppercase">Kailash</span>
            <span className="w-1.5 h-1.5 rounded-full bg-champagne" />
            <span className="font-display font-bold text-2xl tracking-[0.14em] uppercase">Group</span>
          </div>
          <p className="mt-6 max-w-md text-white/60 font-light leading-relaxed">
            Where legal expertise meets property investment and development — delivering
            trusted solutions across Australia.
          </p>
        </div>
        <div className="md:col-span-3">
          <div className="text-sm font-semibold text-white mb-5">Companies</div>
          <ul className="space-y-3">
            {COMPANIES.map((c) => (
              <li key={c.slug}>
                <Link href={`/company/${c.slug}`} className="text-white/70 hover:text-champagne transition-colors">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-4">
          <div className="text-sm font-semibold text-white mb-5">Contact</div>
          <ul className="space-y-3 text-white/70">
            <li><a href={`tel:${CONTACT.phone}`} className="hover:text-champagne transition-colors">{CONTACT.phone}</a></li>
            <li><a href={`mailto:${CONTACT.email}`} className="hover:text-champagne transition-colors">{CONTACT.email}</a></li>
            <li className="text-white/50 font-light">{CONTACT.address}</li>
          </ul>
        </div>
      </div>
      <div className="pt-8 flex flex-col sm:flex-row justify-between gap-4 text-sm text-white/40">
        <span>© {new Date().getFullYear()} Kailash Group. All rights reserved.</span>
        <span className="font-accent italic">Trust · Expertise · Innovation</span>
      </div>
    </div>
  </footer>
);
