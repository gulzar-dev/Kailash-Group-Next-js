"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { COMPANIES } from "@/lib/data";

const links = [
  { label: "Companies", to: "#companies", isDropdown: true },
  { label: "Services", to: "#services" },
  { label: "About", to: "/about", isPage: true },
  { label: "Awards", to: "/awards", isPage: true },
  { label: "Community", to: "#community" },
];

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToHash = (link) => {
    const target = typeof link === "string" ? { to: link } : link;
    setOpen(false);
    if (target.isPage) {
      router.push(target.to);
      return;
    }
    const hash = target.to;
    if (pathname !== "/") {
      router.push("/" + hash);
    } else {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const openDrop = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdown(true);
  };
  const closeDropSoon = () => {
    closeTimer.current = setTimeout(() => setDropdown(false), 150);
  };

  return (
    <motion.header
      data-testid="site-nav"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-[background,box-shadow,padding] duration-500 ${
        scrolled ? "glass py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-12 flex items-center justify-between">
        <Link href="/" data-testid="nav-logo" className="flex items-center group">
          <img src="/logo-header.png" alt="Kailash Group" className="h-10 sm:h-12 w-auto transition-transform group-hover:scale-[1.03]" />
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {links.map((l) =>
            l.isDropdown ? (
              <div
                key={l.label}
                className="relative"
                onMouseEnter={openDrop}
                onMouseLeave={closeDropSoon}
              >
                <button
                  data-testid={`nav-${l.label.toLowerCase()}`}
                  className="link-underline inline-flex items-center gap-1 text-sm tracking-wide text-[#334155] hover:text-[#0A2540]"
                  onClick={() => setDropdown((v) => !v)}
                >
                  {l.label} <ChevronDown size={14} className={`transition-transform ${dropdown ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {dropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-4 min-w-[280px] glass rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(10,37,64,0.12)]"
                    >
                      {COMPANIES.map((c) => (
                        <Link
                          key={c.slug}
                          href={`/company/${c.slug}`}
                          onClick={() => setDropdown(false)}
                          data-testid={`nav-company-${c.slug}`}
                          className="block px-5 py-4 hover:bg-white/50 transition-colors border-b border-black/5 last:border-0"
                        >
                          <div className="font-display font-semibold text-[#0A2540] text-sm">{c.name}</div>
                          <div className="text-xs text-[#5B6B7F] mt-0.5">{c.tagline}</div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button
                key={l.label}
                data-testid={`nav-${l.label.toLowerCase()}`}
                onClick={() => goToHash(l)}
                className="link-underline text-sm tracking-wide text-[#334155] hover:text-[#0A2540]"
              >
                {l.label}
              </button>
            )
          )}
        </nav>

        <button
          data-testid="nav-contact-btn"
          onClick={() => goToHash("#contact")}
          className="hidden lg:inline-flex btn-gold px-6 py-2.5 text-sm"
        >
          Contact Us
        </button>

        <button
          data-testid="nav-mobile-toggle"
          className="lg:hidden text-[#0A2540]"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="lg:hidden glass mt-3 mx-6 rounded-2xl overflow-hidden"
        >
          <div className="flex flex-col p-6 gap-4">
            {links.map((l) => (
              <button
                key={l.label}
                onClick={() => l.isDropdown ? null : goToHash(l)}
                className="text-left text-lg font-display text-[#0A2540]"
              >
                {l.label}
              </button>
            ))}
            <div className="h-px gold-line my-2" />
            {COMPANIES.map((c) => (
              <Link key={c.slug} href={`/company/${c.slug}`} onClick={() => setOpen(false)} className="text-sm text-[#5B6B7F]">
                {c.name}
              </Link>
            ))}
            <button onClick={() => goToHash("#contact")} className="btn-gold px-6 py-3 text-sm mt-2">
              Contact Us
            </button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};
