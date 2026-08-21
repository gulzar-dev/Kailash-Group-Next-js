"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/Footer";

const PRIVACY_SECTIONS = [
  { h: "1. Introduction", p: [
    "Kailash Group respects your privacy and is committed to protecting your personal information.",
    "This Privacy Policy explains how Kailash Group and its associated businesses collect, hold, use, disclose and protect personal information when you interact with us, use our website, make an enquiry or engage with our services.",
    "Kailash Group operates across legal services, property investment and property development through its associated businesses, including Kailash Lawyers & Consultants, Koala Invest and Kuber Projects.",
    "We handle personal information in accordance with applicable Australian privacy laws, including the Privacy Act 1988 (Cth) and, where applicable, the Australian Privacy Principles (APPs).",
  ]},
  { h: "2. Personal Information We May Collect", p: ["The types of personal information we collect depend on how you interact with us and may include:"], l: [
    "Your name", "Email address", "Telephone number", "Residential or postal address",
    "Information submitted through website enquiry or contact forms",
    "Information relating to your property interests or requirements",
    "Information you provide when requesting a consultation or service",
    "Communications and correspondence with our team",
    "Information provided when subscribing to newsletters, updates or marketing communications",
    "Information required to provide legal, property or other professional services",
    "Technical and website usage information",
  ], after: ["Where reasonably necessary for the services being provided, an associated business may collect additional information in accordance with its legal and professional obligations."] },
  { h: "3. How We Collect Personal Information", p: ["We may collect personal information when you:"], l: [
    "Submit an enquiry through our website",
    "Contact us by telephone, email or other communication channels",
    "Request a consultation",
    "Engage one of our businesses or services",
    "Subscribe to newsletters or marketing communications",
    "Attend an event, webinar or consultation",
    "Interact with our advertising or social media",
    "Provide information directly to one of our team members",
    "Are referred to us by a professional adviser, business partner or other third party",
  ], after: ["We may also collect information from publicly available sources or third parties where permitted by law."] },
  { h: "4. Website & Technical Information", p: [
    "When you visit our website, certain technical information may be collected automatically. This may include:",
  ], l: ["Browser type and version", "Device type", "Operating system", "IP address", "Pages visited", "Time and date of visits", "Referring website or source", "General website interaction and usage data"],
    after: ["We may use this information to understand website performance, improve user experience, measure marketing effectiveness and maintain the security and functionality of our website."]
  },
  { h: "5. Cookies & Analytics", p: [
    "Our website may use cookies and similar technologies to improve website functionality, understand how visitors interact with our website and support analytics and marketing activities.",
    "Cookies may collect information about your browser, device, website activity and preferences.",
    "We may use third-party analytics, advertising or marketing platforms to help us understand website traffic and campaign performance.",
    "You can control or disable cookies through your browser settings. Disabling certain cookies may affect the functionality or performance of parts of the website.",
  ]},
  { h: "6. How We Use Your Personal Information", p: ["We may use personal information to:"], l: [
    "Respond to enquiries and requests",
    "Provide information about our businesses, services or opportunities",
    "Arrange consultations or appointments",
    "Deliver services requested by you",
    "Communicate with clients, prospective clients and business partners",
    "Manage customer and client relationships",
    "Maintain internal business and administrative records",
    "Improve our website, services and customer experience",
    "Conduct analytics and measure marketing performance",
    "Send relevant news, updates or marketing communications where permitted",
    "Comply with legal, regulatory and professional obligations",
    "Protect our legal rights and prevent fraud or misuse of our systems",
  ], after: ["We will only use personal information for purposes reasonably connected with the reason it was collected or as otherwise permitted by law."] },
  { h: "7. Marketing Communications", p: [
    "Where permitted by law, we may use your contact information to send you information about services, property opportunities, developments, events, news or other updates that may be relevant to you.",
    "You may opt out of receiving marketing communications at any time by using the unsubscribe option provided in the communication or by contacting us directly.",
    "Opting out of marketing communications will not prevent us from contacting you where communication is necessary in connection with an existing enquiry, transaction, professional engagement or legal obligation.",
  ]},
  { h: "8. Disclosure of Personal Information", p: ["We may disclose personal information where reasonably necessary to:"], l: [
    "Businesses within Kailash Group", "Professional advisers and consultants",
    "Service providers supporting our business operations",
    "Website, hosting and technology providers", "CRM and communication platforms",
    "Marketing, advertising and analytics providers",
    "Property developers, builders or other project partners where relevant to your enquiry",
    "Government agencies, regulators or law enforcement authorities where required by law",
    "Other parties where you have authorised or requested the disclosure",
  ], after: ["We take reasonable steps to ensure that third parties handling personal information on our behalf are subject to appropriate privacy and confidentiality obligations."] },
  { h: "9. Information Shared Across Kailash Group", p: [
    "Where appropriate and permitted by law, information may be shared between businesses associated with Kailash Group where this is reasonably necessary to respond to your enquiry or provide relevant services.",
    "For example, an enquiry may involve property, legal or development-related services provided by different businesses within the Group.",
    "Information will only be shared where there is an appropriate business or service-related purpose and subject to applicable confidentiality, privacy and professional obligations.",
  ]},
  { h: "10. Overseas Disclosure", p: [
    "Some technology, cloud storage, analytics, CRM, communication or other service providers used by Kailash Group may store or process information outside Australia.",
    "Where personal information is disclosed or stored overseas, we take reasonable steps to ensure that it is handled appropriately and in accordance with applicable privacy requirements.",
    "The countries in which information may be processed can vary depending on the service providers used by the Group.",
  ]},
  { h: "11. Data Security", p: [
    "Kailash Group takes reasonable administrative, technical and organisational measures to protect personal information against misuse, interference, loss, unauthorised access, modification or disclosure.",
    "However, no method of transmitting or storing information electronically can be guaranteed to be completely secure.",
  ]},
  { h: "12. Data Retention", p: [
    "We retain personal information for as long as reasonably necessary to fulfil the purpose for which it was collected and to comply with our legal, regulatory, professional and business obligations.",
    "When personal information is no longer reasonably required, we may securely destroy or de-identify it, subject to any applicable record-retention requirements.",
  ]},
  { h: "13. Accessing & Correcting Your Personal Information", p: [
    "You may request access to personal information we hold about you and request that inaccurate, incomplete or outdated information be corrected.",
    "Certain exceptions may apply under Australian law.",
    "We may need to verify your identity before processing an access or correction request.",
  ]},
  { h: "14. Sensitive Information", p: [
    "Certain businesses within Kailash Group may need to collect sensitive information where it is reasonably necessary to provide a particular service.",
    "Where sensitive information is collected, it will be handled in accordance with applicable privacy laws and any additional professional or confidentiality obligations applying to the relevant business.",
  ]},
  { h: "15. Third-Party Websites", p: [
    "Our website may contain links to websites operated by third parties.",
    "Kailash Group is not responsible for the privacy practices, security or content of third-party websites. We encourage users to review the privacy policies of third-party websites before providing personal information.",
  ]},
  { h: "16. Privacy Complaints", p: [
    "If you have a concern or complaint regarding how we have handled your personal information, please contact us using the details below.",
    "We will review your concern and endeavour to respond within a reasonable timeframe.",
    "If you are not satisfied with our response, you may have the right to lodge a complaint with the relevant Australian privacy regulator.",
  ]},
  { h: "17. Changes to This Privacy Policy", p: [
    "Kailash Group may update this Privacy Policy from time to time to reflect changes to our business practices, technology, services or legal requirements.",
    "The latest version will be published on this website.",
  ]},
  { h: "18. Contact Us", p: [
    "For questions, access or correction requests, or privacy-related concerns, please contact:",
    "Kailash Group",
    "Suite 1, Level 2, 60 Phillip Street, Parramatta NSW 2150, Australia",
    "Phone: 02 9633 4233",
    "Email: info@kailashgroup.com.au",
  ]},
];

const DISCLAIMER_SECTIONS = [
  { h: "General Information", p: [
    "The information contained on this website is provided by Kailash Group for general information purposes only. While we endeavour to ensure that the information presented is accurate and current, we make no representation or warranty, express or implied, as to its accuracy, completeness, reliability or suitability.",
    "Information on this website should not be relied upon as a substitute for professional advice appropriate to your individual circumstances.",
  ]},
  { h: "Group Companies", p: [
    "Kailash Group operates across legal services, property investment and property development through its associated businesses, including Kailash Lawyers & Consultants, Koala Invest and Kuber Projects.",
    "The services, obligations and responsibilities of each business are separate and subject to the terms, conditions, professional requirements and regulatory obligations applicable to that business.",
  ]},
  { h: "Financial & Property Investment Information", p: [
    "Any information relating to property, investment opportunities, market conditions, capital growth, rental yields, taxation, finance or potential returns is general information only.",
    "It does not constitute financial, investment, taxation, accounting or other professional advice.",
    "Before making any financial or investment decision, you should consider your individual objectives, financial circumstances and needs and obtain independent advice from appropriately qualified professionals.",
    "Past performance, historical property growth, rental yields or market trends are not guarantees of future performance.",
    "Kailash Group, Koala Invest and their related entities do not guarantee any particular investment return, capital growth, rental income, property value or investment timeframe.",
    "Prospective purchasers and investors should undertake their own investigations and due diligence before making any decision.",
  ]},
  { h: "Legal Information", p: [
    "Any legal information published on this website is general in nature and should not be regarded as legal advice for your specific circumstances.",
    "Accessing or using this website does not, by itself, create a solicitor-client relationship with Kailash Lawyers & Consultants or any other entity within Kailash Group.",
    "You should obtain professional legal advice relevant to your individual circumstances before acting or relying upon legal information contained on this website.",
  ]},
  { h: "Property & Development Information", p: [
    "Information relating to properties, developments, house and land packages, floor plans, specifications, locations, prices, availability, dimensions, inclusions and proposed amenities is indicative only and may change without notice.",
    "Prospective purchasers should rely on the relevant contracts, disclosure documents, plans and specifications provided in connection with a particular property or development.",
    "Property availability and pricing are subject to change and should be independently confirmed before making a decision.",
  ]},
  { h: "Images, Plans & Artist Impressions", p: [
    "Photographs, illustrations, maps, floor plans, renders and artist impressions displayed on this website are provided for illustrative purposes only.",
    "They may depict items, finishes, landscaping, furniture, views, surroundings or other features that are indicative, optional, proposed or not included in the final property.",
    "Dimensions, layouts and specifications may also be subject to change.",
  ]},
  { h: "Market Data & Third-Party Information", p: [
    "Some information presented on this website may be obtained from third-party sources that we consider reliable, including property data providers, government agencies, developers, builders and industry sources.",
    "Kailash Group does not independently guarantee the accuracy, completeness or currency of third-party information.",
    "Users should independently verify information that is material to any decision.",
  ]},
  { h: "Forward-Looking Statements", p: [
    "This website may contain statements regarding anticipated developments, market conditions, infrastructure, property performance, business plans or future opportunities.",
    "Such statements are based on information and expectations available at the time of publication and involve assumptions and uncertainties. Actual outcomes may differ materially, and no guarantee is made that anticipated outcomes will occur.",
  ]},
  { h: "External Links", p: [
    "This website may contain links to third-party websites for convenience or additional information.",
    "Kailash Group does not control these websites and is not responsible for their content, accuracy, availability, security, products, services or privacy practices.",
    "The inclusion of a link does not necessarily constitute an endorsement of the third party or its content.",
    "Access to third-party websites is at the user's own discretion and risk.",
  ]},
  { h: "Blog & Educational Content", p: [
    "Articles, guides, news updates, videos and other educational content published by Kailash Group or its associated businesses are provided for general information purposes only.",
    "Content may refer to external research, publications, legislation, market information or third-party sources and may become outdated as circumstances, markets, regulations or laws change.",
    "Professional advice should be obtained before relying on such information.",
  ]},
  { h: "Limitation of Liability", p: [
    "To the maximum extent permitted by law, Kailash Group and its related entities, directors, employees, contractors and agents exclude liability for any direct or indirect loss, damage, cost or expense arising from or connected with the use of, or reliance upon, information contained on this website.",
    "Nothing in this disclaimer is intended to exclude, restrict or modify any rights or remedies that cannot lawfully be excluded under applicable Australian law.",
  ]},
  { h: "Website Availability & Security", p: [
    "Kailash Group does not warrant that this website will always be available, uninterrupted, secure or free from errors, viruses or other harmful components.",
    "Users are responsible for taking appropriate precautions when accessing or downloading information from this website.",
  ]},
  { h: "Changes to Information", p: [
    "Information contained on this website may be amended, updated or removed at any time without notice.",
    "Users should confirm that information is current before relying upon it.",
  ]},
  { h: "Contact", p: [
    "If you have questions regarding information contained on this website or this disclaimer, please contact Kailash Group through the contact details provided on this website.",
  ]},
];

const CONTENT = {
  privacy: { title: "Privacy Policy", sections: PRIVACY_SECTIONS },
  disclaimer: { title: "Disclaimer", sections: DISCLAIMER_SECTIONS },
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
          <p className="mt-4 text-sm text-[#94A3B8]">Last updated: {new Date().getFullYear()}</p>
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
