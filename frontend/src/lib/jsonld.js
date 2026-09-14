// JSON-LD structured data builders, all URLs sourced from env, NAP sourced from data.js
import { CONTACT } from "./data";
import { SITE_URL } from "./seo";

const LINKEDIN_URL = "https://au.linkedin.com/in/amit-pall-a0236710";

const ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: CONTACT.addressParts.streetAddress,
  addressLocality: CONTACT.addressParts.addressLocality,
  addressRegion: CONTACT.addressParts.addressRegion,
  postalCode: CONTACT.addressParts.postalCode,
  addressCountry: CONTACT.addressParts.addressCountry,
};

export const organizationJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Kailash Group",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-header.png`,
  founder: { "@type": "Person", name: "Amit Pall" },
  address: ADDRESS,
  telephone: CONTACT.phoneIntl,
  email: CONTACT.email,
  areaServed: "AU",
  sameAs: [
    "https://www.kailash.com.au/",
    "https://koalainvest.com.au/",
    "https://kuberprojects.com.au/",
    LINKEDIN_URL,
  ],
});

export const personJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Amit Pall",
  jobTitle: "Founder & Principal",
  worksFor: { "@type": "Organization", name: "Kailash Group", url: SITE_URL },
  sameAs: [LINKEDIN_URL],
});

export const legalServiceJsonLd = () => ({
  "@context": "https://schema.org",
  "@type": "LegalService",
  name: "Kailash Lawyers & Consultants",
  address: ADDRESS,
  parentOrganization: { "@type": "Organization", name: "Kailash Group", url: SITE_URL },
  areaServed: "AU",
  sameAs: ["https://www.kailash.com.au/", CONTACT.mapUrl],
});
