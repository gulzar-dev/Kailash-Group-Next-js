// Central content data for Kailash Group, sourced from kailashgroup.com.au

export const CONTACT = {
  phone: "02 9633 4233",
  phoneIntl: "+61 2 9633 4233",
  email: "info@kailashgroup.com.au",
  address: "Suite 1, Level 2, 60 Phillip Street, Parramatta NSW 2150, Australia",
  addressParts: {
    streetAddress: "Suite 1, Level 2, 60 Phillip Street",
    addressLocality: "Parramatta",
    addressRegion: "NSW",
    postalCode: "2150",
    addressCountry: "AU",
  },
  mapUrl: "https://maps.app.goo.gl/U8qqMxhN64TUYtFm9",
  mapEmbed:
    "https://www.google.com/maps?q=60+Phillip+Street+Parramatta+NSW+2150&output=embed",
};

const IMG = {
  legal: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1400&q=80",
  invest: "/services-koala.png",
  develop: "/services-kuber.png",
  apartment: "/services-koala.png",
  housing: "/services-kuber.png",
};

export const COMPANIES = [
  {
    slug: "kailash-lawyers",
    name: "Kailash Lawyers & Consultants",
    short: "Legal",
    tagline: "Trusted legal counsel across Australia.",
    intro:
      "A Parramatta-based law firm founded by Amit Pall, delivering clear, principled legal advice with a personal touch.",
    practice: [
      "Property Law & Conveyancing",
      "Business & Commercial Law",
      "Pro Bono Services",
    ],
    body:
      "Kailash Lawyers & Consultants brings clarity to complexity. Whether you are buying a home or building a business, our team combines rigorous legal expertise with genuine care, serving clients across Australia. We are also proud to offer pro bono support to those who need it most.",
    accent: "#0A2540",
    image: IMG.legal,
    website: "https://www.kailash.com.au/",
  },
  {
    slug: "koala-invest",
    name: "Koala Invest",
    short: "Real Estate",
    tagline: "Research-led property investment.",
    intro:
      "A licensed real estate research and advisory firm focused on residential property investment for long-term wealth.",
    practice: [
      "Investment Strategy",
      "Market & Suburb Research",
      "Portfolio Advisory",
      "Buyer Representation",
    ],
    body:
      "Koala Invest guides everyday Australians toward financial success through data-driven property investment. With offices in Parramatta, NSW and Gurgaon, India, we pair rigorous research with a genuine commitment to community, adopting a koala for every client who joins the Koala Invest family.",
    accent: "#1E4E8C",
    image: IMG.apartment,
    website: "https://koalainvest.com.au/",
  },
  {
    slug: "kuber-projects",
    name: "Kuber Projects",
    short: "Develop",
    tagline: "Turning vision into Australian homes.",
    intro:
      "An end-to-end property development company specialising in low-rise density projects with strong investor returns.",
    practice: [
      "Site Acquisition",
      "Feasibility & Design",
      "Project Delivery",
      "Investor Returns",
    ],
    body:
      "Kuber Projects delivers considered, high-quality residential developments from concept to completion. Our end-to-end approach to low-rise density projects is built to maximise ROI for investors while creating homes and communities Australians are proud to live in.",
    accent: "#C6A15B",
    image: IMG.housing,
    website: "https://kuberprojects.com.au/",
  },
];

export const SERVICES = [
  {
    slug: "kailash-lawyers",
    title: "Legal Services",
    desc: "Property, conveyancing and commercial law, plus pro bono support, principled counsel with a personal touch.",
    image: IMG.legal,
  },
  {
    slug: "koala-invest",
    title: "Real Estate Investment Solutions",
    desc: "Research-led advisory that turns market data into resilient, long-term property portfolios.",
    image: IMG.invest,
  },
  {
    slug: "kuber-projects",
    title: "Property Development",
    desc: "End-to-end delivery of low-rise density projects engineered for quality and return.",
    image: IMG.develop,
  },
];

export const TIMELINE = [
  { year: "2005", title: "The Foundation", desc: "Amit Pall begins building a practice grounded in integrity and client care." },
  { year: "2012", title: "Kailash Lawyers & Consultants", desc: "A full-service law firm established in the heart of Parramatta." },
  { year: "2018", title: "Koala Invest", desc: "Research-led property investment advisory launched to guide Australian investors." },
  { year: "2021", title: "Kuber Projects", desc: "Property development arm formed to deliver low-rise residential communities." },
  { year: "2025", title: "An Integrated Group", desc: "Legal, investment and development unite under the Kailash Group brand." },
];

export const AWARDS = [
  {
    year: "2025",
    title: "Best Breakthrough Developer",
    org: "PropertyGuru Asia Property Awards",
    sentence:
      "Kuber Projects won Best Breakthrough Developer at the PropertyGuru Asia Property Awards in 2025.",
  },
  {
    year: "2025",
    title: "Best Housing Development (WA)",
    org: "PropertyGuru Asia Property Awards",
    sentence:
      "Kuber Projects won Best Housing Development (Western Australia) at the PropertyGuru Asia Property Awards in 2025.",
  },
  {
    year: "2025",
    title: "Best Investment Housing Development",
    org: "PropertyGuru Asia Property Awards",
    sentence:
      "Kuber Projects won Best Investment Housing Development at the PropertyGuru Asia Property Awards in 2025.",
  },
  {
    year: "2023",
    title: "Small Business Champion",
    org: "Australian Professionals SBC Awards",
    sentence:
      "Kailash Group was recognised as a Small Business Champion at the Australian Professionals Small Business Champion Awards in 2023.",
  },
  {
    year: "2022",
    title: "NSW Volunteer of the Year",
    org: "NSW Government",
    sentence:
      "Kailash Lawyers & Consultants received NSW Volunteer of the Year from the NSW Government in 2022.",
  },
  {
    year: "2022",
    title: "Local Business Awards",
    org: "Finalist & Winner",
    sentence: "Kailash Group was a finalist and winner at the Local Business Awards in 2022.",
  },
  {
    year: "2021",
    title: "Local Business Awards",
    org: "Finalist",
    sentence: "Kailash Group was a finalist at the Local Business Awards in 2021.",
  },
];

export const FAQS = [
  {
    q: "What does Kailash Group do?",
    a: "Kailash Group is an Australian company group operating three businesses: Kailash Lawyers & Consultants (legal services), Koala Invest (property investment advisory) and Kuber Projects (property development). Together they offer legal counsel, research-led property investment and low-rise residential development to clients across Australia.",
  },
  {
    q: "Which companies are part of Kailash Group?",
    a: "Kailash Group is made up of three companies: Kailash Lawyers & Consultants, Koala Invest and Kuber Projects. Each operates in a distinct discipline, law, property investment and property development, under the same group.",
  },
  {
    q: "Where does Kailash Group operate?",
    a: "Kailash Group serves clients across Australia. Its head office is in Parramatta, NSW, with Koala Invest also maintaining an office in Gurgaon, India.",
  },
  {
    q: "Who founded Kailash Group?",
    a: "Kailash Group was founded by Amit Pall, who serves as Founder & Principal. Amit Pall began his legal practice in 2005 and established Kailash Lawyers & Consultants in 2012, the first of the group's three companies.",
  },
  {
    q: "What awards has Kailash Group won?",
    a: "Kuber Projects won Best Breakthrough Developer, Best Housing Development (Western Australia) and Best Investment Housing Development at the 2025 PropertyGuru Asia Property Awards. Kailash Lawyers & Consultants has also received NSW Volunteer of the Year (2022) and recognition at the Australian Small Business Champion Awards (2023).",
  },
  {
    q: "Does Kailash Lawyers offer pro bono services?",
    a: "Yes, Kailash Lawyers & Consultants offers pro bono legal support to clients who need it most. This sits alongside its property, conveyancing and commercial law services.",
  },
];

export const COMMUNITY = [
  {
    title: "Koala Conservation Australia",
    desc: "When you join Koala Invest, we donate to Koala Conservation Australia on your behalf to support our native wildlife.",
    image: "https://images.unsplash.com/photo-1610616649366-93774a4ee9d4?auto=format&fit=crop&w=1400&q=80",
    tag: "Wildlife",
  },
  {
    title: "Art of Living",
    desc: "A proud supporter of the Art of Living Foundation, operating in 180 countries toward a stress-free, violence-free society.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1400&q=80",
    tag: "Wellbeing",
  },
  {
    title: "AASHA Foundation",
    desc: "A major sponsor of AASHA (Wentworthville), supporting the wellbeing of senior citizens from culturally diverse communities.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1400&q=80",
    tag: "Community",
  },
];

export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=1920&q=80",
  portrait: "/amit-pall.jpeg",
  trophy: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=1000&q=80",
};
