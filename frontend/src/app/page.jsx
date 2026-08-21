"use client";

import { useCallback, useEffect } from "react";
import { Hero } from "@/sections/Hero";
import { ValueMarquee } from "@/sections/ValueMarquee";
import { Ecosystem } from "@/sections/Ecosystem";
import { Services } from "@/sections/Services";
import { About } from "@/sections/About";
import { Awards } from "@/sections/Awards";
import { LinkedInPosts } from "@/sections/LinkedInPosts";
import { Community } from "@/sections/Community";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  const scrollTo = useCallback((id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash;
      setTimeout(() => scrollTo(hash), 400);
    }
  }, [scrollTo]);

  return (
    <main data-testid="home-page">
      <Hero onExplore={() => scrollTo("#companies")} onContact={() => scrollTo("#contact")} />
      <ValueMarquee />
      <Ecosystem />
      <Services />
      <About />
      <Awards />
      <LinkedInPosts />
      <Community />
      <Contact />
      <Footer />
    </main>
  );
}
