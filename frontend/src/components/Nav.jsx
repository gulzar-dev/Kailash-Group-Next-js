import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { COMPANIES } from "../lib/data";

const links = [
  { label: "Companies", to: "#companies" },
  { label: "Services", to: "#services" },
  { label: "About", to: "#about" },
  { label: "Awards", to: "#awards" },
  { label: "Community", to: "#community" },
];

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToHash = (hash) => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate("/" + hash);
    } else {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    }
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
        <Link to="/" data-testid="nav-logo" className="flex items-center gap-2 group">
          <span className="font-display text-xl tracking-tight text-[#0A2540]">Kailash</span>
          <span className="w-1.5 h-1.5 rounded-full bg-champagne group-hover:scale-150 transition-transform" />
          <span className="font-accent text-lg text-[#5B6B7F] italic">Group</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {links.map((l) => (
            <button
              key={l.label}
              data-testid={`nav-${l.label.toLowerCase()}`}
              onClick={() => goToHash(l.to)}
              className="link-underline text-sm tracking-wide text-[#334155] hover:text-[#0A2540]"
            >
              {l.label}
            </button>
          ))}
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
                onClick={() => goToHash(l.to)}
                className="text-left text-lg font-display text-[#0A2540]"
              >
                {l.label}
              </button>
            ))}
            <div className="h-px gold-line my-2" />
            {COMPANIES.map((c) => (
              <Link key={c.slug} to={`/company/${c.slug}`} onClick={() => setOpen(false)} className="text-sm text-[#5B6B7F]">
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
