import { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "../sections/Hero";
import { ValueMarquee } from "../sections/ValueMarquee";
import { Ecosystem } from "../sections/Ecosystem";
import { Services } from "../sections/Services";
import { About } from "../sections/About";
import { Awards } from "../sections/Awards";
import { Community } from "../sections/Community";
import { Contact } from "../sections/Contact";
import { Footer } from "../components/Footer";

export default function Home() {
  const location = useLocation();
  const scrollTo = useCallback((id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => scrollTo(location.hash), 300);
    }
  }, [location.hash, scrollTo]);

  return (
    <main data-testid="home-page">
      <Hero onExplore={() => scrollTo("#companies")} onContact={() => scrollTo("#contact")} />
      <ValueMarquee />
      <Ecosystem />
      <Services />
      <About />
      <Awards />
      <Community />
      <Contact />
      <Footer />
    </main>
  );
}
