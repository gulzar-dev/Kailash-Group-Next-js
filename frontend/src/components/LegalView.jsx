"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/Footer";
import { CONTACT } from "@/lib/data";

const ENTITIES = [
  "Koala Investment Property Pty Ltd ACN 603 793 308 T/A Koala Invest (Real Estate Entity)",
  "Kailash Lawyers Pty Ltd ACN 604 582 550 T/A Kailash Lawyers and Consultants (Law Firm Entity)",
  "Kuber Investment Group Pty Ltd ACN 602 779 199 T/A Kuber Projects (Development Entity)",
];

const CONTACT_BLOCKS = [
  `Kailash Group (General) — Phone: ${CONTACT.phone} — Street Address: ${CONTACT.address} — Mailing Address: ${CONTACT.mailingAddress}`,
  `Kailash Lawyers and Consultants (Legal services) — Phone: ${CONTACT.phone} — Street Address: ${CONTACT.address} — Mailing Address: ${CONTACT.mailingAddress}`,
  `Koala Invest (Real estate services) — Phone: ${CONTACT.phone} — Street Address: ${CONTACT.address} — Mailing Address: ${CONTACT.mailingAddress}`,
  `Kuber Projects (Projects / development) — Phone: ${CONTACT.phone} — Street Address: ${CONTACT.address} — Mailing Address: ${CONTACT.mailingAddress}`,
];

const PRIVACY_SECTIONS = [
  { h: "Entities Covered by this Policy",
    p: ["This website (Website) is operated by the Kailash Group, being a group of related entities that may include:"],
    l: ENTITIES,
    after: [
      "References to “Kailash Group”, “we”, “us” or “our” refer to the relevant entity responsible for the content or service described, unless the context requires otherwise. Each entity operates separately and is responsible only for its own handling of personal information.",
      "By accessing or using this Website, you agree to this Privacy Policy.",
    ] },
  { h: "1. Purpose and Scope", p: [
    "This Privacy Policy explains how each Kailash Group entity collects, uses, discloses, and protects your personal information when you use this Website or interact with us.",
    "It applies to all personal information collected by or on behalf of the relevant entity through the Website or in connection with services described on the Website.",
    "Each entity within the Kailash Group is responsible for its own privacy practices and compliance. If you engage with more than one entity, your information may be handled separately by each entity in accordance with this Policy.",
  ]},
  { h: "2. What Personal Information We Collect", p: [
    "The types of personal information we may collect depend on your interaction with the Website and the relevant Kailash Group entity. This may include:",
  ], l: [
    "Contact details: Name, email address, phone number, postal address",
    "Enquiry details: Information you provide in forms, emails, or phone calls",
    "Property interests: Preferences, requirements, or interests in properties or projects",
    "Legal matters: Information relevant to legal enquiries or instructions (Law Firm Entity only)",
    "Employment information: If you apply for a job or submit a CV",
    "Website usage data: IP address, browser type, device information, pages visited, time and date of visits, referring website, and other analytics data",
    "Cookies and tracking technologies: As described in Section 7",
  ], after: ["We do not generally collect sensitive information unless required for a specific purpose (for example, to comply with legal obligations or as part of legal services)."] },
  { h: "3. How We Collect Personal Information", p: ["We may collect personal information in a variety of ways, including:"], l: [
    "Directly from you when you submit an enquiry, register for updates, request information, or otherwise interact with us via the Website, email, phone, or in person",
    "Automatically through your use of the Website (see Section 7)",
    "From third parties, such as your authorised representatives, service providers, or publicly available sources, where permitted by law",
  ], after: ["Each entity collects information relevant to its own services and operations. Information provided to one entity is not automatically shared with other entities, except as described in Section 6."] },
  { h: "4. How We Use Personal Information", p: ["We use personal information for purposes including:"], l: [
    "To respond to your enquiries and provide requested information or services",
    "To process and manage property sales, leasing, or project development matters (Real Estate Entity and Development Entity)",
    "To provide legal services, respond to legal enquiries, or comply with legal obligations (Law Firm Entity)",
    "To send you updates, newsletters, or marketing communications (where permitted)",
    "To improve our Website, services, and user experience",
    "To manage recruitment and employment applications",
    "To comply with legal, regulatory, or professional obligations",
    "For any other purpose disclosed at the time of collection or as required or permitted by law",
  ], after: ["Each entity will only use your personal information for purposes relevant to its own business and in accordance with this Policy."] },
  { h: "5. Disclosure of Personal Information", p: ["We may disclose your personal information:"], l: [
    "To the relevant Kailash Group entity responsible for your enquiry or service",
    "To our employees, contractors, and service providers who assist in operating the Website or providing services (such as IT, marketing, analytics, or administrative support)",
    "To third parties as required by law, regulation, court order, or professional obligations (including to regulators, government authorities, or law enforcement)",
    "To professional advisers (such as lawyers, accountants, or auditors) where necessary",
    "To third parties with your consent or as otherwise permitted by law",
  ], after: ["Each entity will only disclose your information to the extent necessary for its own operations and in accordance with applicable privacy obligations. We do not sell your personal information to third parties."] },
  { h: "6. Separate Operations and Information Handling", p: [
    "Each Kailash Group entity operates separately and is responsible for its own handling of personal information. Information you provide in connection with a specific service or enquiry will be directed to the relevant entity.",
  ], l: [
    "Law Firm Entity: Information provided in connection with legal services or legal enquiries is handled confidentially in accordance with professional obligations and is not shared with other entities except with your consent or as required by law.",
    "Real Estate Entity and Development Entity: Information provided in connection with property, project, or development matters is handled by the relevant entity and is not shared with the Law Firm Entity unless you instruct us to do so or as required by law.",
  ], after: ["If your enquiry or matter involves more than one entity, we will inform you and seek your consent before sharing your information between entities, unless otherwise permitted or required by law."] },
  { h: "7. Cookies, Analytics, and Tracking Technologies", p: [
    "We use cookies and similar technologies to enhance your experience on the Website, analyse usage, and support marketing activities.",
  ], l: [
    "Cookies are small data files stored on your device.",
    "Types of cookies: Essential (for Website functionality), analytics (to understand usage patterns), and marketing (to deliver relevant content)",
    "Managing cookies: You can control or disable cookies through your browser settings, but some Website features may not function properly if cookies are disabled",
    "Analytics: We may use third-party analytics services to collect and analyse Website usage data. These services may collect information such as your IP address, device type, and browsing behaviour",
  ], after: ["For more information about our use of cookies and analytics, please contact us using the details in Section 12."] },
  { h: "8. Direct Marketing", p: [
    "We may use your contact details to send you information about our services, properties, projects, or legal updates that may be of interest to you, in accordance with applicable laws.",
    "You may opt out of receiving marketing communications at any time by following the unsubscribe instructions in our emails or by contacting us using the details in Section 12. We do not use or disclose sensitive information for direct marketing purposes.",
    "Each entity is responsible for its own marketing communications. If you opt out from one entity, you may still receive communications from another entity unless you opt out separately.",
  ]},
  { h: "9. Security of Personal Information", p: [
    "We take reasonable steps to protect your personal information from misuse, interference, loss, unauthorised access, modification, or disclosure. This includes physical, electronic, and procedural safeguards.",
    "However, no data transmission over the internet or electronic storage is completely secure. We cannot guarantee the security of your information and you provide it at your own risk.",
    "If you become aware of any security breach or have concerns about the security of your information, please contact us immediately.",
  ]},
  { h: "10. Access to and Correction of Personal Information", p: [
    "You may request access to or correction of your personal information held by the relevant Kailash Group entity by contacting us using the details in Section 12.",
    "We will respond to your request within a reasonable time and may require you to verify your identity. In some cases, we may refuse access or correction as permitted by law, in which case we will provide reasons.",
  ]},
  { h: "11. Overseas Disclosure", p: [
    "We generally store personal information in Australia. However, some service providers (such as IT or cloud storage providers) may be located overseas or store data outside Australia.",
    "Where we disclose personal information to overseas recipients, we take reasonable steps to ensure that your information is handled in accordance with this Policy and applicable privacy laws.",
  ]},
  { h: "12. Contact Details", p: ["For privacy enquiries, requests, or complaints, please contact the relevant entity:"],
    after: [
      ...CONTACT_BLOCKS,
      "If you are not satisfied with our response to a privacy complaint, you may contact the Office of the Australian Information Commissioner.",
    ] },
  { h: "13. Updates to this Privacy Policy", p: [
    "We may amend this Privacy Policy from time to time by publishing an updated version on this Website. The updated Policy will apply from the date it is published.",
    "Your continued use of the Website after an update constitutes acceptance of the updated Policy.",
  ]},
  { h: "14. Governing Law (New South Wales)", p: [
    "This Privacy Policy is governed by the laws of New South Wales, Australia. You submit to the non-exclusive jurisdiction of the courts of New South Wales and the Commonwealth of Australia.",
  ]},
];

const DISCLAIMER_SECTIONS = [
  { h: "Entities Covered by this Disclaimer",
    p: ["This website (Website) is operated by the Kailash Group, being a group of related entities that may include:"],
    l: ENTITIES,
    after: [
      "References on this Website to “Kailash Group”, “we”, “us” or “our” refer to the relevant entity responsible for the content or service described, unless the context requires otherwise. Each entity trades separately and is responsible only for its own services.",
      "By accessing or using this Website, you agree to this Disclaimer.",
    ] },
  { h: "1. General information only (no advice)", p: [
    "The content on this Website is provided for general information purposes only. It is not intended to be, and must not be relied upon as, professional advice of any kind (including legal, financial, taxation, investment, property, engineering, planning, construction, or other advice).",
    "You should obtain independent professional advice tailored to your circumstances before acting or refraining from acting on the basis of any information on this Website.",
  ]},
  { h: "2. Accuracy, completeness and currency of information", p: [
    "We endeavour to keep information on this Website accurate and up to date, however we do not warrant or represent that the Website content is accurate, complete, reliable, current, suitable, or available at all times.",
    "Information on this Website may change without notice and may include typographical errors, omissions, out-of-date content, or information that is subject to change (including due to market conditions, regulatory changes, third-party updates, or project variations).",
  ]},
  { h: "3. No solicitor–client relationship (Law Firm Entity)", p: [
    "Accessing this Website, viewing legal-related content, downloading materials, subscribing to updates, sending an enquiry, or corresponding with us does not create a solicitor–client relationship with the Law Firm Entity. A solicitor–client relationship will only arise if and when:",
  ], l: [
    "the Law Firm Entity has agreed in writing to act for you;",
    "and you have received a written costs disclosure and/or costs agreement (as applicable);",
    "and any relevant identification, conflict checks, and other onboarding requirements have been completed.",
  ]},
  { h: "4. Legal content and professional conduct limitations (Law Firm Entity)", p: ["Any legal information on this Website is:"], l: [
    "general in nature and not tailored to your specific circumstances;",
    "provided as at the date it is published or last updated;",
    "and not a substitute for obtaining legal advice.",
  ], after: ["To the maximum extent permitted by law, the Law Firm Entity disclaims liability for any loss or damage arising from reliance on legal information on this Website. If you require legal assistance, you should contact the Law Firm Entity directly using the details in Section 13."] },
  { h: "5. Real estate services and licencing (Real Estate Entity)", p: [
    "Where this Website refers to real estate services (including sales, leasing, property management, buyer’s agency, marketing, appraisals, or related services), those services are offered by the Real Estate Entity. Licence information is available on request or where otherwise displayed on this Website.",
    "Nothing on this Website constitutes:",
  ], l: [
    "an offer to sell, lease or otherwise deal in any property;",
    "or a representation that any transaction will proceed on stated terms, or at all.",
  ], after: ["Any services are subject to applicable laws and regulations; agency appointment documentation and required disclosures; and the Real Estate Entity’s acceptance of instructions."] },
  { h: "6. Property listings, marketing material and due diligence", p: [
    "Any property information on this Website (including listings, photographs, plans, measurements, descriptions, specifications, price indications, rental indications, yields, statements of potential, suburb profiles, or other marketing material) is provided for general information only and may have been prepared using information from third parties.",
    "To the maximum extent permitted by law:",
  ], l: [
    "we do not warrant the accuracy or completeness of any property information;",
    "you must make your own enquiries and obtain independent advice;",
    "and you should not rely on statements on this Website as representations about any property.",
  ], after: ["Areas, measurements, locations, and boundaries are approximate and are provided as guides only. Images may be indicative, enhanced, staged, or digitally altered. Unless stated otherwise, inclusions shown in photos may not form part of a sale or lease."] },
  { h: "7. Project development and developer information (Development Entity)", p: [
    "Any information on this Website about project development (including proposed projects, future stages, designs, concepts, timelines, approvals, finishes, materials, amenity, infrastructure, sustainability features, and anticipated outcomes) is indicative only and may be subject to change.",
    "Unless expressly stated in a binding written contract:",
  ], l: [
    "no statement on this Website is a promise or guarantee that a project will proceed, be completed, or be delivered in any particular form or timeframe;",
    "features, finishes, layouts, areas, pricing, and specifications may change;",
    "and images, artist impressions, renders, and diagrams are illustrative only.",
  ], after: ["Any project is subject to matters including (without limitation) planning approvals, authority requirements, builder and consultant availability, supply chain constraints, site conditions, design development, and financing."] },
  { h: "8. Limitation of liability", p: [
    "To the maximum extent permitted by law, each Kailash Group entity excludes all liability (including for negligence) for any loss, damage, cost, or expense (whether direct, indirect, consequential, special, exemplary or otherwise) suffered or incurred by you or any other person arising out of or in connection with:",
  ], l: [
    "your access to, use of, or inability to use this Website;",
    "any reliance on information on this Website;",
    "any errors, omissions, interruptions, delays, or viruses;",
    "any third-party websites, content, products or services linked from this Website;",
    "or any unauthorised access to or use of this Website or any data transmitted.",
  ], after: ["Nothing in this Disclaimer excludes, restricts or modifies any right or remedy that cannot lawfully be excluded, restricted or modified under applicable law. If any term is found unenforceable, it is to be read down or severed to the extent necessary, and the remaining terms continue in full force."] },
  { h: "9. Privacy, data collection and online communications", p: [
    "When you use this Website, we may collect and handle information (including personal information) in accordance with our Privacy Policy and any collection notices displayed at the point of collection.",
    "Without limiting the above:",
  ], l: [
    "we may use cookies and similar technologies for functionality, analytics, and advertising (as described in our Privacy Policy and/or Cookie Notice);",
    "communications via the internet (including email and website enquiries) are not completely secure and may be intercepted, corrupted, delayed or lost;",
    "and you are responsible for protecting your own systems and ensuring you use appropriate cyber-security measures.",
  ], after: ["Where you submit an enquiry, you warrant that the information you provide is accurate and that you are authorised to provide it."] },
  { h: "10. Third-party links and content", p: [
    "This Website may contain links to third-party websites or content. These links are provided for convenience only. We do not control, endorse, approve, or accept responsibility for:",
  ], l: [
    "the content, security, availability, or privacy practices of third-party websites;",
    "or any loss or damage arising from your use of third-party websites or reliance on their content.",
  ], after: ["You access third-party websites entirely at your own risk."] },
  { h: "11. Intellectual property", p: [
    "Unless otherwise indicated, we own or licence all intellectual property rights in this Website and its content (including text, graphics, logos, photographs, videos, designs, and compilations).",
    "You may view this Website and print or download extracts for your personal, non-commercial use only, provided you do not modify the content and you retain all copyright and proprietary notices.",
    "You must not reproduce, distribute, publish, transmit, display, adapt, store, or commercially exploit any part of this Website without our prior written consent, except as permitted by law.",
  ]},
  { h: "12. Acceptable use", p: ["You must not use this Website in any manner that:"], l: [
    "breaches any applicable law;",
    "infringes intellectual property or privacy rights;",
    "is misleading, deceptive, defamatory, abusive, threatening, or otherwise unlawful;",
    "interferes with the operation, security, or availability of the Website;",
    "or introduces malicious code or attempts unauthorised access to systems or data.",
  ], after: ["We may restrict, suspend, or terminate access to this Website at any time without notice."] },
  { h: "13. Contact details", p: ["For enquiries, please contact the relevant entity:"], after: CONTACT_BLOCKS },
  { h: "14. Updates to this Disclaimer", p: [
    "We may amend this Disclaimer from time to time by publishing an updated version on this Website. The updated Disclaimer will apply from the date it is published.",
    "Your continued use of the Website after an update constitutes acceptance of the updated Disclaimer.",
  ]},
  { h: "15. Governing law (New South Wales)", p: [
    "This Disclaimer is governed by the laws of New South Wales, Australia. You submit to the non-exclusive jurisdiction of the courts of New South Wales and the Commonwealth of Australia.",
  ]},
];

const CONTENT = {
  privacy: { title: "Privacy Policy", lastUpdated: "13 October 2026", sections: PRIVACY_SECTIONS },
  disclaimer: { title: "Disclaimer", lastUpdated: "13 August 2026", sections: DISCLAIMER_SECTIONS },
};

export function LegalView({ slug }) {
  const doc = CONTENT[slug];
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!doc) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="font-display text-3xl">Page not found</p>
        <Link href="/" className="btn-gold px-6 py-3 text-sm">Back home</Link>
      </main>
    );
  }

  return (
    <main data-testid={`legal-${slug}`}>
      <section className="bg-gradient-to-b from-[#F5F8FC] to-white pt-40 pb-16">
        <div className="max-w-4xl mx-auto px-6 sm:px-12">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#0A2540] mb-8 link-underline">
            <ArrowLeft size={16} /> Kailash Group
          </Link>
          <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#0A2540] leading-[1.08]">
            {doc.title}
          </h1>
          <p className="mt-4 text-sm text-[#94A3B8]">Last updated: {doc.lastUpdated}</p>
        </div>
      </section>
      <section className="bg-white pb-24">
        <div className="max-w-3xl mx-auto px-6 sm:px-12 space-y-10">
          {doc.sections.map((s, i) => (
            <div key={i} data-testid={`legal-section-${i}`}>
              <h2 className="font-display font-semibold text-2xl text-[#0A2540] mb-4">{s.h}</h2>
              {(s.p || []).map((p, j) => (
                <p key={j} className="text-[#334155] leading-relaxed font-light mb-3">{p}</p>
              ))}
              {s.l && (
                <ul className="list-disc pl-6 space-y-1 text-[#334155] font-light mb-3">
                  {s.l.map((li, j) => <li key={j}>{li}</li>)}
                </ul>
              )}
              {(s.after || []).map((p, j) => (
                <p key={j} className="text-[#334155] leading-relaxed font-light">{p}</p>
              ))}
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
