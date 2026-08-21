// Central content data for Kailash Group, sourced from kailashgroup.com.au

export const CONTACT = {
  phone: "02 9633 4233",
  email: "amit@kailashgroup.com.au",
  address: "60 Phillip Street, Parramatta, NSW 2150, Australia",
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
      "Family Law",
      "Immigration Law",
      "Business & Commercial Law",
    ],
    body:
      "Kailash Lawyers & Consultants brings clarity to complexity. Whether you are buying a home, protecting a family, migrating to Australia or building a business, our team combines rigorous legal expertise with genuine care, serving clients across NSW, Queensland and Western Australia.",
    accent: "#0A2540",
    image: IMG.legal,
    website: "https://www.kailash.com.au/",
  },
  {
    slug: "koala-invest",
    name: "Koala Invest",
    short: "Invest",
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
    desc: "Property, family, immigration and commercial law, principled counsel with a personal touch.",
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
  { year: "2025", title: "Best Breakthrough Developer", org: "PropertyGuru Asia Property Awards" },
  { year: "2025", title: "Best Housing Development (WA)", org: "PropertyGuru Asia Property Awards" },
  { year: "2025", title: "Best Investment Housing Development", org: "PropertyGuru Asia Property Awards" },
  { year: "2023", title: "Small Business Champion", org: "Australian Professionals SBC Awards" },
  { year: "2022", title: "NSW Volunteer of the Year", org: "NSW Government" },
  { year: "2022", title: "Local Business Awards", org: "Finalist & Winner" },
  { year: "2021", title: "Local Business Awards", org: "Finalist" },
];

export const COMMUNITY = [
  {
    title: "Koala Conservation Australia",
    desc: "For every client who joins the Koala Invest family, we adopt a koala in their name, protecting an emblem of our natural heritage.",
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
