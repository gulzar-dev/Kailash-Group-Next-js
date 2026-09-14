# Editing Business Content

This file lists every place a **non-developer** might need to update text, numbers or
contact details, without touching any component/layout code. All of these are plain data
files — editing them is safe as long as you keep the same structure (quotes, commas,
brackets) as what's already there.

All paths are relative to `frontend/`.

## LinkedIn posts ("From the founder" section on the homepage)

**File:** `src/data/linkedin-posts.ts`

Each post looks like:

```ts
{
  id: "unique-slug",
  date: "2025-11-05",       // ISO format YYYY-MM-DD, controls sort order
  excerpt: "The post text...",
  tag: "Recognition",        // small label shown on the card
  reactions: 471,             // a single number shown next to the heart icon
  permalink: "https://au.linkedin.com/in/amit-pall-a0236710",
  // image: "/some-image.jpg", // optional, not currently used
},
```

The homepage always shows the **3 most recent** posts by `date`. Add, remove or edit entries
in the `POSTS` array — no other file needs to change.

## Awards

**File:** `src/lib/data.js` — look for `export const AWARDS`

Each award has a visible `year`, `title` and `org` (shown on the Awards cards), plus a
`sentence` field:

```js
{
  year: "2025",
  title: "Best Breakthrough Developer",
  org: "PropertyGuru Asia Property Awards",
  sentence: "Kuber Projects won Best Breakthrough Developer at the PropertyGuru Asia Property Awards in 2025.",
},
```

`sentence` must be a single, complete sentence stating **who won it, the award name, the
awarding body, and the year** — it's used for search/AI-answer extraction (it's invisible on
screen but present in the page's HTML and in the site's structured data), and for
`llms.txt`. Keep it accurate and self-contained even though the visible card only shows the
year/title/org separately.

The dedicated `/awards` page (`src/components/AwardsView.jsx`) has its own, more detailed
per-company award list further down in the same component — look for `COMPANY_AWARDS`.

## FAQ answers (homepage FAQ section)

**File:** `src/lib/data.js` — look for `export const FAQS`

```js
{
  q: "What does Kailash Group do?",
  a: "Kailash Group is an Australian company group operating three businesses...",
},
```

Guidelines when editing or adding questions:
- Keep the **first sentence of the answer a direct answer** to the question (don't bury the
  answer in the second or third sentence) — this is what gets pulled into AI-generated
  answers and Google's featured snippets.
- 2–3 sentences per answer.
- Always use full entity names: "Kailash Group", "Kailash Lawyers & Consultants", "Koala
  Invest", "Kuber Projects", "Amit Pall" — never shortened or abbreviated forms.

## Contact details (NAP — Name, Address, Phone)

**File:** `src/lib/data.js` — look for `export const CONTACT`

```js
export const CONTACT = {
  phone: "02 9633 4233",                 // shown on the site, tel: links
  phoneIntl: "+61 2 9633 4233",          // used in structured data only
  email: "amit@kailashgroup.com.au",
  address: "Suite 1, Level 2, 60 Phillip Street, Parramatta NSW 2150, Australia",
  addressParts: { streetAddress, addressLocality, addressRegion, postalCode, addressCountry },
  mapUrl: "https://maps.app.goo.gl/...",  // "Visit us" link + Google Business Profile
  mapEmbed: "...",                         // embedded map iframe source
};
```

**Important:** if the address, phone or email ever changes, update it **only here**. It
automatically flows through to the footer, the contact section, the privacy page, every
page's structured data (JSON-LD), and `/llms.txt`. Do not hardcode a new address/phone/email
anywhere else in the codebase — search the codebase for the old value first if something
still looks wrong after editing this file.

`addressParts` must stay consistent with `address` (same street, suburb, state, postcode) —
they're two representations of the same address used in different places (one is a display
string, the other is structured for search engines).

## Company descriptions, services and website links

**File:** `src/lib/data.js` — look for `export const COMPANIES`

Each of the three companies (Kailash Lawyers & Consultants, Koala Invest, Kuber Projects)
has its `name`, `slug` (used in the URL `/company/<slug>`), marketing copy (`intro`, `body`),
`practice` (list of services shown on the company page) and `website` (external link).

**Note:** `/llms.txt` (`src/app/llms.txt/route.js`) does **not** reuse this marketing copy —
it has its own plain, factual one-line description per company on purpose (LLM crawlers are
meant to get plain facts, not persuasive marketing language). If a company's core
services change, update **both**: the `practice` list in `src/lib/data.js` and the
`COMPANY_FACTS` list inside `src/app/llms.txt/route.js`.

## Page titles and descriptions (what shows in Google/AI search results)

**Files:**
- Homepage: `src/app/page.jsx`
- Each company page: `src/app/company/[slug]/page.jsx` (look for the `SEO` object)
- Privacy/Disclaimer pages: `src/app/legal/[slug]/page.jsx` (look for the `SEO` object)

Each has a `title` and `description` — these are what appears as the blue link and grey
snippet in search results, so keep them accurate and under ~160 characters for the
description.
