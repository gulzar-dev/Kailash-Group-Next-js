// GROQ queries for all Sanity data

export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  siteName,
  siteUrl,
  phone,
  phoneIntl,
  email,
  address,
  addressParts,
  mapUrl,
  mapEmbed,
  logoHeader,
  logoFooter,
  socialLinks,
  footerTagline
}`

export const NAVIGATION_QUERY = `*[_type == "navigation"][0]{
  items[]{
    label,
    href,
    isDropdown,
    children[]{label, href},
    sortOrder
  } | order(sortOrder asc),
  ctaText,
  ctaLink
}`

export const HERO_QUERY = `*[_type == "hero"][0]{
  heading1,
  heading2,
  subtitle,
  cta1Text,
  cta1Link,
  cta2Text,
  cta2Link,
  backgroundImage,
  imageAlt
}`

export const COMPANIES_QUERY = `*[_type == "company"] | order(_createdAt asc){
  slug,
  name,
  short,
  tagline,
  intro,
  practice,
  body,
  accent,
  image,
  website,
  seo
}`

export const COMPANY_BY_SLUG_QUERY = `*[_type == "company" && slug == $slug][0]{
  slug,
  name,
  short,
  tagline,
  intro,
  practice,
  body,
  accent,
  image,
  website,
  seo
}`

export const SERVICES_QUERY = `*[_type == "service"] | order(_createdAt asc){
  slug,
  title,
  desc,
  image,
  company->{
    slug,
    name,
    short
  }
}`

export const ABOUT_SECTION_QUERY = `*[_type == "aboutSection"][0]{
  heading,
  chapters[]{number, title, description},
  portraitImage,
  portraitAlt,
  nameLabel,
  titleLabel
}`

export const ECOSYSTEM_SECTION_QUERY = `*[_type == "ecosystemSection"][0]{
  heading,
  subheading,
  ctaText,
  logoImage,
  logoAlt
}`

export const SERVICES_SECTION_QUERY = `*[_type == "servicesSection"][0]{
  heading,
  subheading
}`

export const COMMUNITY_SECTION_QUERY = `*[_type == "communitySection"][0]{
  heading
}`

export const FAQ_SECTION_QUERY = `*[_type == "faqSection"][0]{
  heading
}`

export const CONTACT_SECTION_QUERY = `*[_type == "contactSection"][0]{
  heading,
  formLabels,
  submitText,
  loadingText,
  successMessage,
  errorMessage,
  contactCards
}`

export const MARQUEE_SECTION_QUERY = `*[_type == "marqueeSection"][0]{
  items
}`

export const TIMELINE_QUERY = `*[_type == "timelineEntry"] | order(sortOrder asc){
  year,
  title,
  desc
}`

export const FAQ_ITEMS_QUERY = `*[_type == "faqItem"]{
  question,
  answer
}`

export const COMMUNITY_PARTNERS_QUERY = `*[_type == "communityPartner"]{
  title,
  desc,
  image,
  tag
}`

export const AWARDS_QUERY = `*[_type == "award"]{
  year,
  title,
  org,
  sentence
}`

export const LINKEDIN_POSTS_QUERY = `*[_type == "linkedinPost"] | order(date desc){
  postId,
  date,
  excerpt,
  tag,
  reactions,
  permalink,
  image
}`

export const EMAIL_TEMPLATES_QUERY = `*[_type == "emailTemplate"][0]{
  enquiryNotification,
  enquiryConfirmation,
  rateLimitMessage,
  invalidRequestMessage,
  invalidSubmissionMessage,
  errorMessage
}`

export const LLM_CONTENT_QUERY = `*[_type == "llmsContent"][0]{
  introText,
  founderText,
  companies[]{name, what, services, website}
}`

export const SEO_QUERY = `*[_type == "seoMetadata" && page == $page][0]{
  title,
  description,
  ogImage
}`

// Combined homepage query for efficient data fetching
export const HOMEPAGE_QUERY = `{
  "siteSettings": ${SITE_SETTINGS_QUERY},
  "navigation": ${NAVIGATION_QUERY},
  "hero": ${HERO_QUERY},
  "companies": ${COMPANIES_QUERY},
  "services": ${SERVICES_QUERY},
  "about": ${ABOUT_SECTION_QUERY},
  "ecosystem": ${ECOSYSTEM_SECTION_QUERY},
  "servicesSection": ${SERVICES_SECTION_QUERY},
  "communitySection": ${COMMUNITY_SECTION_QUERY},
  "faqSection": ${FAQ_SECTION_QUERY},
  "contactSection": ${CONTACT_SECTION_QUERY},
  "marquee": ${MARQUEE_SECTION_QUERY},
  "timeline": ${TIMELINE_QUERY},
  "faqs": ${FAQ_ITEMS_QUERY},
  "community": ${COMMUNITY_PARTNERS_QUERY},
  "awards": ${AWARDS_QUERY},
  "linkedinPosts": ${LINKEDIN_POSTS_QUERY}
}`
