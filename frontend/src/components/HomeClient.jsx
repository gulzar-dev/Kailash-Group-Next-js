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
import { FAQ } from "@/sections/FAQ";
import { Contact } from "@/sections/Contact";
import { Footer } from "@/components/Footer";

export function HomeClient({
  siteSettings,
  navigation,
  hero,
  companies = [],
  services = [],
  about,
  ecosystem,
  servicesSection,
  communitySection,
  faqSection,
  contactSection,
  marquee,
  timeline = [],
  faqs = [],
  community = [],
  awards = [],
  linkedinPosts = [],
}) {
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
      <Hero
        data={hero}
        onExplore={() => scrollTo("#companies")}
        onContact={() => scrollTo("#contact")}
      />
      <ValueMarquee data={marquee} />
      <Ecosystem data={ecosystem} companies={companies} />
      <Services data={servicesSection} services={services} />
      <About data={about} timeline={timeline} />
      <Awards awards={awards} />
      <LinkedInPosts posts={linkedinPosts} />
      <Community data={communitySection} partners={community} />
      <FAQ data={faqSection} items={faqs} />
      <Contact data={contactSection} siteSettings={siteSettings} />
      <Footer siteSettings={siteSettings} companies={companies} />
    </main>
  );
}
