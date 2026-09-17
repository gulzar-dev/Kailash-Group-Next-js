/**
 * Seed script: Migrates hardcoded content to Sanity CMS
 *
 * Usage:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=xxx npx tsx sanity/seed.ts
 *
 * Requires:
 *   - Sanity project created
 *   - .env.local with NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET
 *   - SANITY_AUTH_TOKEN (create a token with editor permissions at sanity.io/manage)
 */

import {createClient} from '@sanity/client'
import {nanoid} from 'nanoid'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_AUTH_TOKEN!

if (!projectId || !token) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_AUTH_TOKEN')
  process.exit(1)
}

const client = createClient({projectId, dataset, apiVersion: '2025-01-20', token})

// Helper to upload remote image to Sanity assets
async function uploadImage(url: string): Promise<any> {
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    const buffer = Buffer.from(await res.arrayBuffer())
    const asset = await client.assets.upload('image', buffer, {
      filename: url.split('/').pop()?.split('?')[0] || `${nanoid()}.jpg`,
    })
    return {_type: 'image', asset: {_ref: asset._id, _type: 'sanity.imageAsset'}}
  } catch (e) {
    console.warn(`Failed to upload image: ${url}`, e)
    return null
  }
}

// Helper to create portable text from plain string
function toPortableText(text: string): any[] {
  return [{_type: 'block', _key: nanoid(), style: 'normal', children: [{_type: 'span', _key: nanoid(), text}]}]
}

async function seed() {
  console.log('Starting seed...')

  // 1. Site Settings
  console.log('Seeding siteSettings...')
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteName: 'Kailash Group',
    siteUrl: 'https://kailashgroup.com.au',
    phone: '02 9633 4233',
    phoneIntl: '+61 2 9633 4233',
    email: 'amit@kailashgroup.com.au',
    address: 'Suite 1, Level 2, 60 Phillip Street, Parramatta NSW 2150, Australia',
    addressParts: {
      streetAddress: 'Suite 1, Level 2, 60 Phillip Street',
      addressLocality: 'Parramatta',
      addressRegion: 'NSW',
      postalCode: '2150',
      addressCountry: 'AU',
    },
    mapUrl: 'https://maps.app.goo.gl/U8qqMxhN64TUYtFm9',
    mapEmbed: 'https://www.google.com/maps?q=60+Phillip+Street+Parramatta+NSW+2150&output=embed',
    logoHeader: {_type: 'image', asset: {_ref: 'image-logoHeader', _type: 'sanity.imageAsset'}},
    logoFooter: {_type: 'image', asset: {_ref: 'image-logoFooter', _type: 'sanity.imageAsset'}},
    socialLinks: [
      {label: 'LinkedIn', url: 'https://au.linkedin.com/in/amit-pall-a0236710'},
      {label: 'Kailash Lawyers', url: 'https://www.kailash.com.au/'},
      {label: 'Koala Invest', url: 'https://koalainvest.com.au/'},
      {label: 'Kuber Projects', url: 'https://kuberprojects.com.au/'},
    ],
    footerTagline: 'Where legal expertise meets property investment and development, delivering trusted solutions across Australia.',
  })

  // 2. Navigation
  console.log('Seeding navigation...')
  await client.createOrReplace({
    _id: 'navigation',
    _type: 'navigation',
    items: [
      {label: 'Companies', href: '#companies', isDropdown: true, children: [], sortOrder: 1},
      {label: 'Services', href: '#services', isDropdown: false, children: [], sortOrder: 2},
      {label: 'About', href: '/about', isDropdown: false, children: [], sortOrder: 3},
      {label: 'Awards', href: '/awards', isDropdown: false, children: [], sortOrder: 4},
      {label: 'Community', href: '#community', isDropdown: false, children: [], sortOrder: 5},
    ],
    ctaText: 'Contact Us',
    ctaLink: '#contact',
  })

  // 3. Hero
  console.log('Seeding hero...')
  await client.createOrReplace({
    _id: 'hero',
    _type: 'hero',
    heading1: 'Built on Expertise.',
    heading2: 'Driven by Purpose.',
    subtitle: 'We bring legal, property investment and development across Australia into one connected group, creating lasting value for people and communities nationwide.',
    cta1Text: 'Explore Our Companies',
    cta1Link: '#companies',
    cta2Text: 'Contact Us',
    cta2Link: '#contact',
    imageAlt: 'Australian skyline',
  })

  // 4. Companies
  console.log('Seeding companies...')
  const companies = [
    {
      slug: 'kailash-lawyers',
      name: 'Kailash Lawyers & Consultants',
      short: 'Legal',
      tagline: 'Trusted legal counsel across Australia.',
      intro: 'A Parramatta-based law firm founded by Amit Pall, delivering clear, principled legal advice with a personal touch.',
      practice: ['Property Law & Conveyancing', 'Family Law', 'Immigration Law', 'Business & Commercial Law', 'Pro Bono Services'],
      body: 'Kailash Lawyers & Consultants brings clarity to complexity. Whether you are buying a home, protecting a family, migrating to Australia or building a business, our team combines rigorous legal expertise with genuine care, serving clients across Australia. We are also proud to offer pro bono support to those who need it most.',
      accent: '#0A2540',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1400&q=80',
      website: 'https://www.kailash.com.au/',
      seo: {title: 'Property & Family Lawyers Australia | Kailash Lawyers & Consultants', description: 'Australian law firm led by Amit Pall. Property and conveyancing, family, immigration and commercial law, with pro bono support.'},
    },
    {
      slug: 'koala-invest',
      name: 'Koala Invest',
      short: 'Real Estate',
      tagline: 'Research-led property investment.',
      intro: 'A licensed real estate research and advisory firm focused on residential property investment for long-term wealth.',
      practice: ['Investment Strategy', 'Market & Suburb Research', 'Portfolio Advisory', 'Buyer Representation'],
      body: 'Koala Invest guides everyday Australians toward financial success through data-driven property investment. With offices in Parramatta, NSW and Gurgaon, India, we pair rigorous research with a genuine commitment to community, adopting a koala for every client who joins the Koala Invest family.',
      accent: '#1E4E8C',
      image: '/services-koala.png',
      website: 'https://koalainvest.com.au/',
      seo: {title: 'Property Investment Advisory Australia | Koala Invest', description: 'Licensed, research-led residential property advisory. Suburb research, portfolio strategy and buyer representation across Australia.'},
    },
    {
      slug: 'kuber-projects',
      name: 'Kuber Projects',
      short: 'Develop',
      tagline: 'Turning vision into Australian homes.',
      intro: 'An end-to-end property development company specialising in low-rise density projects with strong investor returns.',
      practice: ['Site Acquisition', 'Feasibility & Design', 'Project Delivery', 'Investor Returns'],
      body: 'Kuber Projects delivers considered, high-quality residential developments from concept to completion. Our end-to-end approach to low-rise density projects is built to maximise ROI for investors while creating homes and communities Australians are proud to live in.',
      accent: '#C6A15B',
      image: '/services-kuber.png',
      website: 'https://kuberprojects.com.au/',
      seo: {title: 'Low-Rise Property Developer Australia | Kuber Projects', description: 'End-to-end delivery of low-rise residential developments, from site acquisition and feasibility through to handover and investor returns.'},
    },
  ]

  for (const company of companies) {
    const image = company.image.startsWith('http') ? await uploadImage(company.image) : null
    await client.createOrReplace({
      _id: `company-${company.slug}`,
      _type: 'company',
      slug: company.slug,
      name: company.name,
      short: company.short,
      tagline: company.tagline,
      intro: company.intro,
      practice: company.practice,
      body: toPortableText(company.body),
      accent: company.accent,
      image: image || company.image,
      website: company.website,
      seo: company.seo,
    })
  }

  // 5. Services
  console.log('Seeding services...')
  const services = [
    {slug: 'kailash-lawyers', title: 'Legal Services', desc: 'Property, family, immigration and commercial law, plus pro bono support, principled counsel with a personal touch.', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1400&q=80', companySlug: 'kailash-lawyers'},
    {slug: 'koala-invest', title: 'Real Estate Investment Solutions', desc: 'Research-led advisory that turns market data into resilient, long-term property portfolios.', image: '/services-koala.png', companySlug: 'koala-invest'},
    {slug: 'kuber-projects', title: 'Property Development', desc: 'End-to-end delivery of low-rise density projects engineered for quality and return.', image: '/services-kuber.png', companySlug: 'kuber-projects'},
  ]

  for (const service of services) {
    const image = service.image.startsWith('http') ? await uploadImage(service.image) : null
    await client.createOrReplace({
      _id: `service-${service.slug}`,
      _type: 'service',
      slug: service.slug,
      title: service.title,
      desc: service.desc,
      image: image || service.image,
      company: {_type: 'reference', _ref: `company-${service.companySlug}`},
    })
  }

  // 6. Timeline
  console.log('Seeding timeline...')
  const timeline = [
    {year: '2005', title: 'The Foundation', desc: 'Amit Pall begins building a practice grounded in integrity and client care.', sortOrder: 1},
    {year: '2012', title: 'Kailash Lawyers & Consultants', desc: 'A full-service law firm established in the heart of Parramatta.', sortOrder: 2},
    {year: '2018', title: 'Koala Invest', desc: 'Research-led property investment advisory launched to guide Australian investors.', sortOrder: 3},
    {year: '2021', title: 'Kuber Projects', desc: 'Property development arm formed to deliver low-rise residential communities.', sortOrder: 4},
    {year: '2025', title: 'An Integrated Group', desc: 'Legal, investment and development unite under the Kailash Group brand.', sortOrder: 5},
  ]

  for (const entry of timeline) {
    await client.createOrReplace({
      _id: `timeline-${entry.year}`,
      _type: 'timelineEntry',
      year: entry.year,
      title: entry.title,
      desc: entry.desc,
      sortOrder: entry.sortOrder,
    })
  }

  // 7. Awards
  console.log('Seeding awards...')
  const awards = [
    {year: '2025', title: 'Best Breakthrough Developer', org: 'PropertyGuru Asia Property Awards', sentence: 'Kuber Projects won Best Breakthrough Developer at the PropertyGuru Asia Property Awards in 2025.'},
    {year: '2025', title: 'Best Housing Development (WA)', org: 'PropertyGuru Asia Property Awards', sentence: 'Kuber Projects won Best Housing Development (Western Australia) at the PropertyGuru Asia Property Awards in 2025.'},
    {year: '2025', title: 'Best Investment Housing Development', org: 'PropertyGuru Asia Property Awards', sentence: 'Kuber Projects won Best Investment Housing Development at the PropertyGuru Asia Property Awards in 2025.'},
    {year: '2023', title: 'Small Business Champion', org: 'Australian Professionals SBC Awards', sentence: 'Kailash Group was recognised as a Small Business Champion at the Australian Professionals Small Business Champion Awards in 2023.'},
    {year: '2022', title: 'NSW Volunteer of the Year', org: 'NSW Government', sentence: 'Kailash Lawyers & Consultants received NSW Volunteer of the Year from the NSW Government in 2022.'},
    {year: '2022', title: 'Local Business Awards', org: 'Finalist & Winner', sentence: 'Kailash Group was a finalist and winner at the Local Business Awards in 2022.'},
    {year: '2021', title: 'Local Business Awards', org: 'Finalist', sentence: 'Kailash Group was a finalist at the Local Business Awards in 2021.'},
  ]

  for (let i = 0; i < awards.length; i++) {
    await client.createOrReplace({
      _id: `award-${i + 1}`,
      _type: 'award',
      ...awards[i],
    })
  }

  // 8. FAQ Items
  console.log('Seeding faqItems...')
  const faqs = [
    {question: 'What does Kailash Group do?', answer: 'Kailash Group is an Australian company group operating three businesses: Kailash Lawyers & Consultants (legal services), Koala Invest (property investment advisory) and Kuber Projects (property development). Together they offer legal counsel, research-led property investment and low-rise residential development to clients across Australia.'},
    {question: 'Which companies are part of Kailash Group?', answer: 'Kailash Group is made up of three companies: Kailash Lawyers & Consultants, Koala Invest and Kuber Projects. Each operates in a distinct discipline, law, property investment and property development, under the same group.'},
    {question: 'Where does Kailash Group operate?', answer: 'Kailash Group serves clients across Australia. Its head office is in Parramatta, NSW, with Koala Invest also maintaining an office in Gurgaon, India.'},
    {question: 'Who founded Kailash Group?', answer: 'Kailash Group was founded by Amit Pall, who serves as Founder & Principal. Amit Pall began his legal practice in 2005 and established Kailash Lawyers & Consultants in 2012, the first of the group\'s three companies.'},
    {question: 'What awards has Kailash Group won?', answer: 'Kuber Projects won Best Breakthrough Developer, Best Housing Development (Western Australia) and Best Investment Housing Development at the 2025 PropertyGuru Asia Property Awards. Kailash Lawyers & Consultants has also received NSW Volunteer of the Year (2022) and recognition at the Australian Small Business Champion Awards (2023).'},
    {question: 'Does Kailash Lawyers offer pro bono services?', answer: 'Yes, Kailash Lawyers & Consultants offers pro bono legal support to clients who need it most. This sits alongside its property, family, immigration and commercial law services.'},
  ]

  for (let i = 0; i < faqs.length; i++) {
    await client.createOrReplace({
      _id: `faqItem-${i + 1}`,
      _type: 'faqItem',
      question: faqs[i].question,
      answer: toPortableText(faqs[i].answer),
    })
  }

  // 9. Community Partners
  console.log('Seeding communityPartners...')
  const communityImages = [
    'https://images.unsplash.com/photo-1610616649366-93774a4ee9d4?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1400&q=80',
    'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=1400&q=80',
  ]
  const community = [
    {title: 'Koala Conservation Australia', desc: 'When you join Koala Invest, we donate to Koala Conservation Australia on your behalf to support our native wildlife.', tag: 'Wildlife'},
    {title: 'Art of Living', desc: 'A proud supporter of the Art of Living Foundation, operating in 180 countries toward a stress-free, violence-free society.', tag: 'Wellbeing'},
    {title: 'AASHA Foundation', desc: 'A major sponsor of AASHA (Wentworthville), supporting the wellbeing of senior citizens from culturally diverse communities.', tag: 'Community'},
  ]

  for (let i = 0; i < community.length; i++) {
    const image = await uploadImage(communityImages[i])
    await client.createOrReplace({
      _id: `community-${i + 1}`,
      _type: 'communityPartner',
      title: community[i].title,
      desc: community[i].desc,
      image,
      tag: community[i].tag,
    })
  }

  // 10. LinkedIn Posts
  console.log('Seeding linkedinPosts...')
  const posts = [
    {postId: 'koala-invest-local-business-award-2025-11', date: '2025-11-05', excerpt: 'Honoured to see Koala Invest recognised again at the Local Business Awards. Awards are lovely, but the trust of every family who invests with us matters more. Grateful.', tag: 'Recognition', reactions: 471, permalink: 'https://au.linkedin.com/in/amit-pall-a0236710'},
    {postId: 'kuber-projects-propertyguru-award-2025-09', date: '2025-09-10', excerpt: 'Best Investment Housing Development at the PropertyGuru Asia Property Awards, thank you to our Kuber Projects team, partners and every homeowner backing our vision for better Australian communities.', tag: 'Kuber Projects', reactions: 935, permalink: 'https://au.linkedin.com/in/amit-pall-a0236710'},
    {postId: 'twenty-years-reflection-2025-08', date: '2025-08-12', excerpt: 'Twenty years ago I opened a small law office in Parramatta. Today Kailash Group is a family of three companies. The lesson? Purpose compounds faster than capital.', tag: 'Reflection', reactions: 1504, permalink: 'https://au.linkedin.com/in/amit-pall-a0236710'},
  ]

  for (const post of posts) {
    await client.createOrReplace({
      _id: `linkedin-${post.postId}`,
      _type: 'linkedinPost',
      ...post,
    })
  }

  // 11. Homepage Section Singletons
  console.log('Seeding homepage sections...')

  await client.createOrReplace({
    _id: 'aboutSection',
    _type: 'aboutSection',
    heading: 'Nearly 20 years of trusted leadership.',
    chapters: [
      {number: '01', title: 'A principled foundation', description: 'Two decades of leadership under Amit Pall, built on integrity, trust and an unwavering commitment to clients.'},
      {number: '02', title: 'Integrated expertise', description: 'Legal counsel, investment research and property development, three disciplines, one accountable team.'},
      {number: '03', title: 'Australian at heart', description: 'Rooted in Parramatta, serving clients across Australia.'},
    ],
    portraitAlt: 'Amit Pall',
    nameLabel: 'Amit Pall',
    titleLabel: 'Founder & Principal',
  })

  await client.createOrReplace({
    _id: 'ecosystemSection',
    _type: 'ecosystemSection',
    heading: 'One group, three specialisms.',
    subheading: 'Three companies orbit a single vision, connected by the Kailash Group brand, each an expert in its own right.',
    ctaText: 'Discover',
    logoAlt: 'Kailash Group',
  })

  await client.createOrReplace({
    _id: 'servicesSection',
    _type: 'servicesSection',
    heading: 'Expertise, end to end.',
    subheading: 'From the first legal consultation to the handover of keys, every stage handled with precision and care.',
  })

  await client.createOrReplace({
    _id: 'communitySection',
    _type: 'communitySection',
    heading: 'Giving back, naturally.',
  })

  await client.createOrReplace({
    _id: 'faqSection',
    _type: 'faqSection',
    heading: 'Frequently asked.',
  })

  await client.createOrReplace({
    _id: 'contactSection',
    _type: 'contactSection',
    heading: 'Reach out to us.',
    formLabels: {
      nameLabel: 'Full name *',
      emailLabel: 'Email address *',
      phoneLabel: 'Phone',
      areaLabel: 'Area of interest',
      messageLabel: 'How can we help? *',
    },
    submitText: 'Send Enquiry',
    loadingText: 'Sending...',
    successMessage: 'Thank you — your enquiry has been received. We\'ll be in touch shortly.',
    errorMessage: 'Something went wrong. Please call us on 02 9633 4233.',
    contactCards: [
      {label: 'Call', icon: 'phone'},
      {label: 'Email', icon: 'mail'},
      {label: 'Visit', icon: 'mapPin'},
    ],
  })

  await client.createOrReplace({
    _id: 'marqueeSection',
    _type: 'marqueeSection',
    items: [
      'Award-Winning Group',
      'Recognised Since 2021',
      'Local Business Award Winner',
      'Australian Small Business Champion Finalist',
      'PropertyGuru Asia Property Awards Winner 2025',
      'Best Investment Housing Development',
      'Best Housing Development – WA',
    ],
  })

  // 12. Email Templates
  console.log('Seeding emailTemplates...')
  await client.createOrReplace({
    _id: 'emailTemplate',
    _type: 'emailTemplate',
    enquiryNotification: {
      subject: 'We\'ve received your enquiry — Kailash Group',
      header: 'New Website Enquiry',
      body: 'You\'ve received a new enquiry from the website.',
    },
    enquiryConfirmation: {
      subject: 'Thank you for contacting Kailash Group',
      header: 'Thank you, {{name}}',
      body: 'We\'ve received your enquiry and a member of our team will be in touch shortly.\n\nAt Kailash Group, legal expertise meets property investment and development, delivering trusted solutions across Australia.',
      footer: 'Warm regards,\nKailash Group\nSuite 1, Level 2, 60 Phillip Street, Parramatta NSW 2150 · 02 9633 4233',
    },
    rateLimitMessage: 'Too many enquiries from this address. Please try again later or call 02 9633 4233.',
    invalidRequestMessage: 'Invalid request body.',
    invalidSubmissionMessage: 'Invalid submission.',
    errorMessage: 'Something went wrong sending your enquiry. Please call us on 02 9633 4233.',
  })

  // 13. LLMs Content
  console.log('Seeding llmsContent...')
  await client.createOrReplace({
    _id: 'llmsContent',
    _type: 'llmsContent',
    introText: 'Kailash Group is an Australian company group operating three businesses: legal services, property investment advisory and property development. Head office: Suite 1, Level 2, 60 Phillip Street, Parramatta NSW 2150. Areas served: Australia-wide.',
    founderText: 'Amit Pall, Founder & Principal of Kailash Group.',
    companies: [
      {name: 'Kailash Lawyers & Consultants', what: 'An Australian law firm providing property and conveyancing, family, immigration and commercial law services. Founded by Amit Pall in 2012.', services: ['Property Law & Conveyancing', 'Family Law', 'Immigration Law', 'Business & Commercial Law', 'Pro Bono Services'], website: 'https://www.kailash.com.au/'},
      {name: 'Koala Invest', what: 'A licensed real estate research and advisory firm focused on residential property investment for long-term wealth.', services: ['Investment Strategy', 'Market & Suburb Research', 'Portfolio Advisory', 'Buyer Representation'], website: 'https://koalainvest.com.au/'},
      {name: 'Kuber Projects', what: 'An end-to-end property development company specialising in low-rise density projects with strong investor returns.', services: ['Site Acquisition', 'Feasibility & Design', 'Project Delivery', 'Investor Returns'], website: 'https://kuberprojects.com.au/'},
    ],
  })

  console.log('Seed complete!')
}

seed().catch(console.error)
