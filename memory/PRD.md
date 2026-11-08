# Kailash Group — Premium 3D Corporate Website

## Problem Statement
Premium, immersive corporate website for Kailash Group (Australian professional services:
Legal Services, Real Estate Investment, Property Development). Awwwards-level, light/white
luxury theme with champagne gold accents, glassmorphism, framer-motion + lenis smooth scroll,
pseudo-3D parallax and an orbital company hub.

## User Choices
- Theme: LIGHT / white (user override of original dark brief) + champagne gold accents.
- 3D: lighter CSS/parallax pseudo-3D (framer-motion + lenis), no heavy WebGL.
- Contact form: store in Mongo + send email notifications (Emergent-managed Resend).
- Map: Google Maps embed (Parramatta NSW).
- Logos: text-based.

## Architecture
- Backend: FastAPI + MongoDB. Routes under /api. Resend email via Emergent proxy.
  - POST /api/enquiries (stores + emails owner & auto-reply to enquirer), GET /api/enquiries.
  - Env: EMERGENT_EMAIL_KEY, EMAIL_FROM_NAME="Kailash Group", OWNER_EMAIL=amit@kailashgroup.com.au
- Frontend: React 19 + Tailwind + framer-motion + lenis + react-parallax-tilt + react-fast-marquee.
  - Fonts: Playfair Display (display), Outfit (body), Cormorant Garamond (accent).
  - Pages: Home (/), Company (/company/:slug — kailash-lawyers, koala-invest, kuber-projects).
  - Sections: Hero (parallax + masked reveal + floating glass icons), ValueMarquee,
    Ecosystem (orbital hub), Services (tilt cards), About (timeline + portrait), Awards
    (horizontal trophy timeline), Community (cards + animated koala), Contact (glass form + map).
  - Content sourced from kailashgroup.com.au (real awards, community, contact details).

## Implemented (2026-07-24) — MVP complete & verified
- Full single-page site + 3 company detail pages.
- Contact enquiry form -> Mongo + owner/client emails (verified, no errors).
- All sections verified via screenshots; light luxury theme cohesive.

## Stack Migration (2026-07-25) — CRA -> Next.js
- Frontend migrated from React CRA (CRACO) to Next.js 15 App Router (`src/app`).
  - layout.jsx + site-chrome.jsx (client: Lenis + Nav + sonner Toaster), app/page.jsx (Home),
    app/company/[slug]/page.jsx -> components/CompanyView.jsx.
  - React Router replaced by next/link + next/navigation (usePathname/useRouter).
  - Interactive components marked "use client" (framer-motion, lenis, tilt, forms).
  - Client env: NEXT_PUBLIC_BACKEND_URL (kept REACT_APP_BACKEND_URL). Contact uses it.
  - package.json scripts: start=`next dev -p 3000 -H 0.0.0.0`, build=`next build`.
  - Old CRA files removed (src/index.js, App.js, App.css, src/pages/*). craco.config.js/react-scripts
    remain in repo but unused.
- FastAPI backend UNCHANGED (separate service on :8001). Verified: home, company routing,
  and contact form -> FastAPI -> Resend email all working post-migration.
- NOTE: non-default stack — Emergent one-click deploy support may be limited for Next.js.

## Updates (2026-08-14)
- About page Leadership team: removed Dhawal Amlani and Sumeet Gupta; only Amit Pall remains
  (single centered card, `components/AboutView.jsx`).
- Community section: Koala Conservation Australia description updated to "When you join
  Koala Invest, we donate to Koala Conservation Australia on your behalf to support our
  native wildlife." (`lib/data.js`).
- Verified via screenshot.
- Added LinkedIn (https://www.linkedin.com/in/amit-pall-a0236710/) and mailto
  (amit@kailashgroup.com.au) links to Amit Pall's contact icons on About page.

## SEO / Technical Hardening (2026-08-14)
- Route-level metadata added per page (canonical/openGraph built from NEXT_PUBLIC_SITE_URL):
  `/`, `/company/kailash-lawyers`, `/company/koala-invest`, `/company/kuber-projects`,
  `/legal/privacy`, `/legal/disclaimer`. Helper: `lib/seo.js` (`buildMetadata`).
  Home page split into server `app/page.jsx` (metadata) + client `components/HomeClient.jsx`
  (Next.js disallows metadata export from "use client" files).
- JSON-LD: `lib/jsonld.js` — Organization + Person in root layout `<head>`; LegalService
  (Kailash Lawyers & Consultants, with the Google Maps sameAs) injected only on
  `/company/kailash-lawyers`. NAP centralised in `lib/data.js` `CONTACT` (address, addressParts,
  phoneIntl, mapUrl).
- `app/sitemap.js` + `app/robots.js` (plain JS, project has no TypeScript setup) — both read
  `NEXT_PUBLIC_SITE_URL`.
- `next.config.js`: 308 redirects for legacy `.html` routes; `X-Robots-Tag: noindex` header
  applied whenever request Host != `NEXT_PUBLIC_SITE_URL` host (works on any host, not
  Vercel-specific — verified via curl with different Host headers).
- Hero sub-headline converted to `<h2>` containing "legal, property investment and
  development across Australia"; copy rewritten to surface all 3 services + national
  footprint near the top of the page (h1 unchanged).
- Footer/contact NAP corrected to "Suite 1, Level 2, 60 Phillip Street, Parramatta NSW 2150,
  Australia"; Contact "Visit" link now points to the real Google Maps place; LinkedIn
  "Follow" link points to https://au.linkedin.com/in/amit-pall-a0236710; privacy page
  contact block now sources email/phone/address from `CONTACT` (removed stray info@ email).
- `.env.example` added for frontend and backend (placeholders + one-line comments);
  `.gitignore` hardened (`.env`, `.env.*.local`).
- Added `NEXT_PUBLIC_SITE_URL=https://kailashgroup.com.au` to frontend `.env` (drives
  canonicals/schema; also means the current preview host correctly gets noindex).
- No Vercel-specific APIs; standard `next build`/`next start`, no static export.
- `/about` main heading ("One Group. Three specialisms...") changed h2 -> h1 (same classes,
  no visual change); every route now has exactly one h1.

## New Features (2026-08-14) — LinkedIn section (data-driven) + Enquiry form (Resend)
- Frontend now supports TypeScript (added `typescript@5`, `@types/node`, `@types/react`,
  `@types/react-dom`; `tsconfig.json` created, `jsconfig.json` left in place unused).
  IMPORTANT: pin `typescript@^5` — `^6`/latest installs TS7 native compiler which Next 15.5
  does not support ("Failed to compile").
- `src/data/linkedin-posts.ts` — typed `LinkedInPost[]`, `getLinkedInPosts()` async getter
  (TODO comment marks where to swap in a CMS/DB call). Seeded with the original 3 posts;
  `reactions` = sum of old likes+comments+reposts; permalinks = LinkedIn profile URL.
- `src/app/api/linkedin-posts/route.ts` — GET, returns the same shape as JSON, documented.
- Home page (`app/page.jsx`, server component) calls `getLinkedInPosts()` server-side,
  passes top-3 as a prop through `HomeClient` -> `LinkedInPosts` (still "use client" for
  the Reveal/motion wrapper, but data is embedded in the server-rendered HTML — not
  fetched client-side, not lazy). Section returns `null` (hides entirely) if the array is
  empty or the source throws.
- `src/app/api/enquiry/route.ts` — new Resend-based enquiry endpoint (Node runtime):
  zod validation (name/email/message required, phone optional, company restricted to the
  3 company names + "General" or blank), honeypot field (`website`), in-memory per-IP rate
  limit (5/hour, comment notes moving to Redis if ever multi-instance), owner email
  (reply-to = enquirer) + confirmation email to enquirer via Resend, structured JSON
  console.log per submission, Sydney-time timestamp + submitting page in the owner email.
  Reads `RESEND_API_KEY`, `LEAD_NOTIFICATION_EMAIL`, `TRANSACTIONAL_FROM_EMAIL` from env —
  NOTE: Resend Node SDK resolves `{ data, error }` instead of throwing on API-level
  failures; route checks `.error` explicitly.
- `src/instrumentation.ts` — `register()` throws a clear error naming `RESEND_API_KEY` if
  missing, so the whole server fails to start on the VPS if it's unset (verified: crashes
  cleanly when unset, restored placeholder value afterwards so the preview stays up).
- `sections/Contact.jsx` — posts to relative `/api/enquiry` (same-origin, no more
  `NEXT_PUBLIC_BACKEND_URL` for this form); added hidden honeypot input, inline
  success/error message under the submit button, `window.dataLayer.push({event:
  "enquiry_submitted"})` on success (GA4-ready, no GA snippet installed yet).
- `.env` / `.env.example` — added `RESEND_API_KEY` (placeholder — user hasn't signed up
  yet), `LEAD_NOTIFICATION_EMAIL=amit@kailashgroup.com.au`, `TRANSACTIONAL_FROM_EMAIL=
  onboarding@resend.dev` (Resend's test sender, only delivers to the account owner's own
  verified email until a domain is verified — user chose this for now).
- KNOWN PLATFORM QUIRK (this preview only): the Emergent ingress routes ALL `/api/*`
  requests on the public preview domain to the legacy FastAPI service on :8001, never to
  Next.js on :3000. So `/api/enquiry` and `/api/linkedin-posts` are unreachable through the
  public browser URL here — verified this is ingress-level (curl to a nonexistent /api/*
  path returns FastAPI's `{"detail":"Not Found"}`). Both routes were verified directly via
  curl to `localhost:3000` inside the container (bypasses ingress) and work correctly;
  the LinkedIn section itself is unaffected (SSR calls the data function directly, no HTTP
  hop). On the real VPS deploy target (`next start`, no such ingress split) both routes
  will work through the public form exactly as coded. FastAPI's old `/api/enquiries` route
  (Emergent-managed email) still exists in `backend/server.py`, untouched, now unused by
  the frontend — safe to remove later if this Next.js-only path is confirmed as the
  permanent architecture.
- User has not yet created a Resend account/API key; `RESEND_API_KEY` is a placeholder.
  Real lead emails will not send until the user replaces it with a real key.

## AI Search / LLM Optimisation (2026-08-14)
- `src/app/robots.js` extended (not replaced) — added explicit allow rules for GPTBot,
  OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended, alongside the existing `*` rule.
- `src/app/llms.txt/route.js` — new, serves plain-text factual company profile at
  `/llms.txt` (Content-Type text/plain), built from `lib/data.js` (COMPANIES-derived facts,
  CONTACT, AWARDS) and `NEXT_PUBLIC_SITE_URL`. No marketing language by design (separate
  from the persuasive `body`/`intro` copy used in the UI).
- `src/sections/FAQ.jsx` — new homepage section (native `<details>/<summary>`, always in
  DOM/server-rendered HTML regardless of open/closed state), FAQPage JSON-LD embedded
  inline. 6 seed Q&As added to `lib/data.js` (`FAQS`), each answer's first sentence directly
  answers the question. Inserted in `HomeClient.jsx` between Community and Contact.
- `lib/data.js` `AWARDS` entries now carry a `sentence` field (single statement with award
  name + category + awarding body + year, correct company attribution cross-referenced from
  `AwardsView.jsx`'s per-company breakdown). Used in: visually-hidden (`sr-only`) text inside
  each award card on `sections/Awards.jsx` and `components/AwardsView.jsx` (zero visual
  change, fully extractable in server-rendered HTML), `llms.txt`, and the Organization
  JSON-LD `award` property (`lib/jsonld.js`) — schema.org's standard repeatable Text
  property for awards on Organization.
- `lib/jsonld.js` — added `faqPageJsonLd()`; `organizationJsonLd()` now includes `award: [...]`.
- Entity naming fix: company page meta title for kailash-lawyers now uses the full
  "Kailash Lawyers & Consultants" (was abbreviated "Kailash Lawyers"). Audited whole
  codebase for other variants — none found (the one FAQ question using "Kailash Lawyers"
  was seeded verbatim per this task's exact wording; its answer uses the full name).
- Everything above verified server-rendered via curl (llms.txt, robots.txt, FAQPage schema
  + question text + award schema all present in raw HTML) and via screenshot (FAQ open/closed,
  matches site design, no visual regressions).

## Deployment Documentation (2026-08-14)
- `README.md` (rewritten, was stale CRA boilerplate) and `CONTENT.md` (new) added at
  `frontend/` root for the developer who deploys this repo to the VPS.
- README covers: stack, local setup, full env var table (including which 4 vars are
  legacy/unused — `NEXT_PUBLIC_BACKEND_URL`, `REACT_APP_BACKEND_URL`, `WDS_SOCKET_PORT`,
  `ENABLE_HEALTH_CHECK`), build/run (`next build` + `next start`, explicitly not a static
  export), VPS setup (Node LTS, `sharp`, pm2/systemd, nginx reverse proxy sample config,
  Let's Encrypt), the 308 redirect list + warning not to duplicate in nginx, how/why the
  noindex-on-wrong-host header must stay, a post-launch SEO checklist, and how to edit/swap
  LinkedIn post content.
- CONTENT.md covers non-developer content edits with file paths: LinkedIn posts
  (`src/data/linkedin-posts.ts`), awards (`lib/data.js` AWARDS + AwardsView.jsx
  COMPANY_AWARDS), FAQ answers (`lib/data.js` FAQS), NAP (`lib/data.js` CONTACT), company
  descriptions/services (`lib/data.js` COMPANIES + llms.txt route's COMPANY_FACTS), and page
  title/description locations.
- Documentation only — no code changes in this pass.

- About page leadership card (Amit Pall) changed from vertical to sideways/horizontal
  layout on desktop (photo left, details right) for a more balanced look; stacks vertically
  on mobile (`components/AboutView.jsx`).

## Content Updates (2026-09-23)
- Company contact email changed sitewide to `info@kailashgroup.com.au` (was
  `amit@kailashgroup.com.au`): `lib/data.js` CONTACT.email (flows through footer, contact
  section, privacy page, Organization JSON-LD, llms.txt), plus `.env`
  `LEAD_NOTIFICATION_EMAIL` (receiving) and `TRANSACTIONAL_FROM_EMAIL` (sending). Amit
  Pall's personal mailto icon on the About page leadership card intentionally left as
  `amit@kailashgroup.com.au` (personal, not the general company inbox).
  CAVEAT: `TRANSACTIONAL_FROM_EMAIL=info@kailashgroup.com.au` requires the
  kailashgroup.com.au domain to be verified in Resend before real sends will work — user
  still hasn't signed up for Resend (`RESEND_API_KEY` is still a placeholder), so this is a
  no-op today but is set correctly for when they do.
- `sections/Contact.jsx` — email now rendered in its own full-width card so it always
  displays on one line (was cramped in a 3-column grid with `break-words`).
- `data/linkedin-posts.ts` — reduced all 3 seeded posts' `reactions` into the 50–100 range
  (68 / 92 / 84, was 471 / 935 / 1504).
- Kailash Lawyers & Consultants no longer handles Family Law or Immigration Law — removed
  from `lib/data.js` (COMPANIES practice list, body copy, SERVICES desc, FAQS pro-bono
  answer), `app/company/[slug]/page.jsx` SEO title+description (title also dropped
  "Family Lawyers"), and `app/llms.txt/route.js` COMPANY_FACTS. Remaining practice areas:
  Property Law & Conveyancing, Business & Commercial Law, Pro Bono Services.
- All verified via curl (no family/immigration mentions remain, new email present
  everywhere expected, reactions updated) and a screenshot of the Contact section.

## Bug Fix (2026-09-23) — Vercel build failure
- Root cause: `src/app/layout.jsx` had `metadataBase: new URL(SITE_URL)` unconditionally.
  On Vercel, `NEXT_PUBLIC_SITE_URL` wasn't configured in the project's dashboard env vars
  (this app's local `.env` has no effect on Vercel), so `new URL(undefined)` threw during
  `next build`'s page-data collection for `/_not-found`, crashing the ENTIRE production
  build (`Failed to collect configuration for /_not-found` / `Invalid URL`).
- Fix: `layout.jsx` now only sets `metadataBase` when `SITE_URL` is truthy
  (`...(SITE_URL ? { metadataBase: new URL(SITE_URL) } : {})`). `lib/seo.js`
  `buildMetadata()` similarly guarded to avoid `"undefined/path"` canonical/OG URLs when
  `SITE_URL` is missing (returns metadata without `alternates.canonical`/OG `url` instead).
- Verified: reproduced locally (`mv .env .env.bak && yarn build` -> confirmed crash before
  fix, confirmed success after), then `testing_agent` ran full regression (build with/without
  env var, all pages/sitemap/robots/llms.txt/FAQ/LinkedIn/Contact/enquiry-form) — 100% pass,
  no issues found.
- ACTION NEEDED FROM USER: this code fix stops the Vercel build from crashing, but for
  correct absolute canonical/OG URLs on the live Vercel deployment, they still must add
  `NEXT_PUBLIC_SITE_URL=https://kailashgroup.com.au` in Vercel Project Settings →
  Environment Variables (this repo's `.env` file is not read by Vercel).

## Content Overhaul (2026-10-12)
- "Legal Counsel" -> "Legal Advisor" sitewide (About pillar 02, /awards CTA, homepage meta
  description). One FAQ answer ("What does Kailash Group do?") intentionally keeps
  lowercase "legal counsel" per user's exact dictated text.
- Removed Services section subtext line ("From the first legal consultation...").
- Legal Services card desc updated to lead with Pro Bono Services.
- TIMELINE (`lib/data.js`, drives both /about and anywhere else it's used) years changed:
  Kailash Lawyers & Consultants 2011, Koala Invest 2015, Kuber Projects 2019, "An
  Integrated Group" 2019 (2005 "The Foundation" unchanged). Fixed duplicate-React-key
  warning from the two 2019 entries (`AboutView.jsx` key now `${year}-${index}`).
- REMOVED the entire LinkedIn "From the founder" feature: deleted `sections/LinkedInPosts.jsx`,
  `data/linkedin-posts.ts`, `app/api/linkedin-posts/` route. Replaced with new
  `sections/FounderQuote.jsx` — single horizontal card, Amit's photo + italic one-line
  quote on business values, server-rendered.
- FAQS updated: "Who founded..." now says 2011 (keeps 2005); "What does Kailash Group
  do?" replaced with user's exact text (mentions "Residential & Commercial development");
  "What awards..." no longer mentions the removed Small Business Champion award.
- AWARDS (`lib/data.js`) trimmed from 7 to 4 — removed the 3 generic "Kailash Group"
  entries (Small Business Champion 2023, Local Business Awards 2022/2021); kept 3x Kuber
  Projects PropertyGuru 2025 + Kailash Lawyers & Consultants NSW Volunteer of the Year 2022.
  This list feeds the homepage Awards section, Organization JSON-LD `award` property, and
  llms.txt — all three automatically reflect the trim.
- `/awards` page: removed the entire "Kailash Group" Certificate of Appreciation section
  (Bandeesh Group / Woh Lamhe Musical sponsorship text) completely. Per-company award
  breakdowns (unaffected) still legitimately include their own Small Business Champion
  entries — reviewed, still accurate, left as-is.
- `/company/kailash-lawyers`: new tagline "Trusted Legal Advisory across Australia.", new
  intro/body copy, practice list reordered to Pro Bono Services, Property Law &
  Conveyancing, Business & Commercial Law. `llms.txt` COMPANY_FACTS synced to match.
- Community "Giving back, naturally" section: removed AASHA Foundation card, replaced with
  a new Pro Bono Services card + uploaded image (`public/pro-bono-giving-back.webp`).
- Verified via `testing_agent` (iteration_3.json) — 100% pass, 2 minor findings (duplicate
  React key, since fixed; alt text reviewed as still accurate, left unchanged).

## Content Updates Round 2 (2026-10-12)
- `sections/FounderQuote.jsx` — added heading "Founder's philosophy." above the quote card.
- Community "Koala Conservation Australia" card: title changed to "Supporting Native
  Wildlife", desc to "We're committed to supporting native wildlife and contributing to
  its protection and preservation." (`lib/data.js` COMMUNITY).
- `lib/data.js` TIMELINE: removed the 2005 "The Foundation" entry, now starts at 2011
  (4 entries total). Grid changed `md:grid-cols-5` -> `md:grid-cols-4` in both
  `sections/About.jsx` (homepage) and `components/AboutView.jsx` (/about page); also fixed
  a pre-existing duplicate-key warning in About.jsx's TIMELINE.map (key now `${year}-${i}`,
  matching the earlier AboutView.jsx fix).
- `/awards` page: added `image` field to Kailash Lawyers & Consultants' 5 COMPANY_AWARDS
  items (`components/AwardsView.jsx`), images downloaded to `public/awards/`. Card layout
  changed to image-on-top (fixed-height container, `object-contain`, white background —
  handles both portrait and landscape certificates cleanly) + year/title/note below.
  Corrected the 2025 entry's note from "Recognition" to "Finalist" and title to include
  "Legal Services" per the actual certificate image provided.
  Cards WITHOUT an `image` field (Koala Invest, Kuber Projects — images not yet provided)
  still render the original icon+text layout, conditionally.
- PENDING FROM USER: they said they'll attach 5 more images for Koala Invest and 3 for
  Kuber Projects in follow-up messages (platform limits 5 image attachments per message).
  When received, add `image` field to the matching `COMPANY_AWARDS` items for those two
  companies (same pattern as Kailash Lawyers) — no other code changes needed, the card
  layout already supports it conditionally.
- Verified via curl (new copy present) and screenshots (founder quote title, Koala card,
  awards page images render well-aligned for both orientations).

## Content Updates Round 3 (2026-10-12)
- Rotated `public/awards/kailash-lawyers-2021-local-business-winner.webp` 90° to vertical
  (matches certificate's actual portrait orientation) — verified renders correctly on
  `/awards`, no card layout breakage.
- Koala Invest `COMPANY_AWARDS` (`components/AwardsView.jsx`) updated from 5 generic
  "Recognition" placeholder entries to 5 real Finalist certificates with images, downloaded
  to `public/awards/koala-invest-*`: 2021 Parramatta City Local Business Awards, 2022
  Parramatta Local Business Awards, 2023 Australian Small Business Champion Awards, 2025
  Parramatta Local Business Awards, 2026 Parramatta Local Business Awards (new award year).
  All verified rendering correctly (EXIF-rotated source JPEGs honored by browser).
- User explicitly declined: replacing already-integrated Kailash Lawyers award images with
  re-uploaded near-duplicates; adding the new vertical white Kailash Group logo anywhere;
  re-adding the Pro Bono image (already in place).
- Verified via screenshot (all 5 Koala Invest cards + Kailash 2021 rotated card render
  correctly, Kuber Projects section unchanged/still pending).

## Content Updates Round 4 (2026-10-12)
- Rotated `public/awards/koala-invest-2023-sbc-finalist.webp` 90° CW to portrait (certificate
  text was sideways landscape scan) — verified renders correctly, matches other Koala cards.
- Added Kuber Projects' 3 PropertyGuru award images (Best Breakthrough Developer, Best
  Housing Development Mandurah, Best Investment Housing Development Golden Bay), saved to
  `public/awards/kuber-projects-*.webp`. Since user said these are vertical, borderless, titled
  below: added `borderless: true` flag on the `kuber-projects` COMPANY_AWARDS entry
  (`components/AwardsView.jsx`) and a new conditional JSX branch — 3-col grid, no
  border/background box, rounded image with shadow, year/title/note plain text below (vs.
  the bordered box+fixed-height-image style used for Kailash Lawyers/Koala Invest).
  Verified via screenshot — all 3 cards render cleanly, text legible.
- All 3 company award sections now fully populated with real images (15 total award images).

## Content Updates Round 5 (2026-10-12)
- Applied the Kuber Projects borderless card style sitewide to Kailash Lawyers & Koala
  Invest too (`components/AwardsView.jsx`) — removed the old bordered/fixed-height-box
  variant entirely, now one unified template: rounded shadowed image (no border/background
  box) + year/title/note plain text below, grid `sm:grid-cols-2 lg:grid-cols-3 items-start`.
  `items-start` (not stretch) lets each card size to its own image's natural aspect ratio,
  so landscape and portrait certificates sit cleanly side-by-side without being cropped or
  forced to a uniform height — verified via screenshot across all 3 company sections (13
  mixed-orientation images total).

## Content Updates Round 6 (2026-10-12)
- Koala Invest award order (`components/AwardsView.jsx`) changed to 2021, 2025, 2026, 2022,
  2023 — moves 2025/2026 up into row 1 (fills it completely: 3/3) instead of leaving them
  stranded on a mostly-empty row 2. Row 2 now only has 2022/2023. Purely a display-order
  change, no data/content changes. Verified via screenshot.

## Legal Pages Rewrite (2026-10-27)
- Replaced `components/LegalView.jsx` PRIVACY_SECTIONS and DISCLAIMER_SECTIONS entirely with
  content from user-supplied docx files ("Privacy Policy - Kailash Group.docx", "Disclaimer -
  Kailash Group.docx"), extracted via `extract_file_tool` and transcribed faithfully (intro
  entities section + numbered sections matching the docs' internal cross-references, e.g.
  Privacy §12 Contact Details, §6/§7 refs; Disclaimer §13 Contact details).
  - Added `ENTITIES` (3 legal entity names + ACNs: Koala Investment Property Pty Ltd ACN 603
    793 308, Kailash Lawyers Pty Ltd ACN 604 582 550, Kuber Investment Group Pty Ltd ACN 602
    779 199) and `CONTACT_BLOCKS` (4 per-entity contact lines: Group/Lawyers/Koala/Kuber,
    each with phone/street/mailing address) — reused across both docs' Contact sections.
  - `CONTACT.mailingAddress` ("PO Box 1220, Parramatta NSW 2124") added to `lib/data.js`
    (doc specifies it, wasn't previously tracked). Doc left per-entity phone blank except
    Legal (02 9633 4233) — used the one existing site-wide `CONTACT.phone` for all 4 blocks
    rather than showing blank fields publicly (judgment call, noted here for visibility).
  - `CONTENT` now carries a static `lastUpdated` per doc (Privacy: "13 October 2026",
    Disclaimer: "13 August 2026") instead of the previous dynamic `new Date().getFullYear()`
    — page now shows `doc.lastUpdated`.
- Verified both `/legal/privacy` and `/legal/disclaimer` return 200 and render the new
  content correctly via screenshot (entities list, numbered sections, contact blocks).

## Homepage Awards Section Update (2026-10-29)
- Replaced the homepage "Recognised for excellence." horizontal scrolling award cards
  (`sections/Awards.jsx`) with a single showcase image (`public/awards-showcase.png`,
  user-supplied composite photo of all trophies/certificates). Section title/heading
  unchanged; removed `AWARDS` data import, `Trophy` icon and the scroll-track markup
  (AWARDS data itself untouched in `lib/data.js`, still used by `/awards` page, llms.txt,
  and Organization JSON-LD). Verified via screenshot.

## Homepage Awards Section Update (2026-10-29)
- Replaced the homepage "Recognised for excellence." horizontal scrolling award cards
  (`sections/Awards.jsx`) with a single showcase image (`public/awards-showcase.png`,
  user-supplied composite photo of all trophies/certificates). Section title/heading
  unchanged; removed `AWARDS` data import, `Trophy` icon and the scroll-track markup
  (AWARDS data itself untouched in `lib/data.js`, still used by `/awards` page, llms.txt,
  and Organization JSON-LD). Verified via screenshot.
- Heading forced to one line + left-aligned (`whitespace-nowrap`, removed `max-w-2xl` wrap
  constraint, responsive sizing `text-2xl sm:text-5xl lg:text-6xl` so it fits without
  horizontal overflow on mobile). Verified on both desktop and 390px mobile viewport.

## Image Replacements (2026-11-08)
- Homepage "Recognised for excellence." showcase image (`sections/Awards.jsx` ->
  `public/awards-showcase.png`) replaced with user's new trophy/certificate still-life photo.
- `/awards` hero banner (`components/AwardsView.jsx` -> was `public/awards-group.webp`)
  replaced with user's new team celebration photo at PropertyGuru Asia Property Awards;
  saved as `public/awards-group.jpg` (source was actually a JPEG despite the old .webp
  filename/extension — renamed to match true format so the browser's content-type/decoder
  matches the bytes, avoiding a broken-image risk). Reference in AwardsView.jsx updated to
  `/awards-group.jpg`.
- Verified via screenshot — both pages render the new images correctly.

## Image Correction (2026-11-08)
- Reverted homepage "Recognised for excellence." section image back to the original trophy
  podium photo (`public/awards-showcase.png` restored from "Awards_Showcase.png" source) —
  previous turn had mistakenly overwritten it with the wrong asset.
- Homepage Hero banner (`sections/Hero.jsx`, `lib/data.js` `IMAGES.hero`) replaced: was an
  Unsplash Australian skyline stock photo, now `/hero-awards.png` (user's "Homepage awards.png"
  trophy still-life, this is what the user meant by "homepage banner"). Alt text updated to
  match. `/awards` page hero banner (`public/awards-group.jpg`, the team celebration photo)
  unchanged from the prior turn.
- Verified via screenshot — Hero shows the new trophy image with existing gradient/text
  readable, Awards section back to original image.

## Image Positioning Fix (2026-11-08)
- `/awards` hero banner image (`components/AwardsView.jsx`, `public/awards-group.jpg`) had
  faces cropped at the top due to default `object-cover` centering. Fixed with
  `objectPosition: "center 25%"` (shifts the visible crop up/down so faces are fully shown).
  Verified via screenshot.

## Image Adjustments (2026-11-08, follow-up)
- `/awards` hero banner `objectPosition` adjusted further from "center 25%" to "center 10%"
  per user request to drag the image down more — team faces + "SUB-ZERO/WOLF/HLB" sponsor
  logos now fully visible at top.
- Homepage Hero banner reverted back to the original Unsplash Sydney Opera House skyline
  image (`lib/data.js` `IMAGES.hero` back to the Unsplash URL, `sections/Hero.jsx` alt text
  back to "Australian skyline") — undoing the "Homepage awards.png" swap from two turns ago
  per explicit user request.
- Verified via screenshot — both pages correct.

## About Page — Team Restructure (2026-11-08)
- "Our team" banner image (`public/about-banner.webp`) replaced with user's new 8-person
  group photo; aspect ratio changed from portrait (`aspect-[4/5] lg:aspect-[4/4.6]`) to
  landscape (`aspect-[8/5]`) per "little horizontal layout" request.
- Single "Leadership team" section (previously just Amit Pall) split into two distinct
  sections in `components/AboutView.jsx`:
  - `SENIOR_TEAM` (5 people: Amit Pall, Sumeet Gupta, CA Parvesh Goyal, Siddharth Aggarwal,
    Kunal Roy) — larger, more prominent treatment: `bg-[#F5F8FC]` section, h2-size heading,
    3-col grid, bordered white cards with square photo-on-top + name/role, Amit's existing
    LinkedIn/email icons preserved (conditionally rendered — only shown if present on the
    person object).
  - `EXECUTIVE_TEAM` (4 people: Victoria Soldatova, Himanshu Kushwaha, Anshika Garg, Hema
    Rawat) — compact/secondary treatment directly below: white section, smaller h3 heading,
    4-col grid of minimal cards with small circular avatar + name/role only, no border/photo
    card chrome — visually distinct and lower-weight vs. Senior section per request.
  - `Avatar` component now defaults to 1:1 (`aspect-square`) placeholders (colored circle +
    initials) since user will attach real 1:1 photos for each person later — just swap the
    `image` field per person in `SENIOR_TEAM`/`EXECUTIVE_TEAM` when received (same pattern as
    Amit Pall's `/amit-pall.jpeg`).
- Verified via screenshot — group photo horizontal, Senior cards large/prominent, Executive
  cards compact/distinct.

## About Page Polish (2026-11-08, follow-up)
- "Our team" banner/text balance fixed: image aspect changed `aspect-[8/5]` -> `aspect-[4/3]`
  (taller, still horizontal), h1 and value-list typography/spacing reduced (text-2xl/3xl/4xl,
  tighter `space-y-5`/`gap-5`) so left image and right text column read as balanced.
- "Senior Leadership team." heading reduced (`text-4xl/5xl/6xl` -> `text-2xl/3xl/4xl`) +
  `whitespace-nowrap` to keep it on one line.
- Removed LinkedIn/email icons from Amit Pall's Senior card entirely (data fields + JSX
  block + now-unused `Linkedin`/`Mail` icon imports removed from `AboutView.jsx`).
- Executive Leadership cards enlarged: avatar `w-20 h-20` -> `w-28 h-28`, card padding
  `p-5` -> `p-8` with `min-h-[220px]`, name/role text sizes bumped slightly.
- Kunal Roy's role updated: "Marketing Head" -> "Head of Marketing".
- Real 1:1 photos added for all 5 Senior Leadership members (`public/sumeet-gupta.webp`,
  `parvesh-goyal.webp`, `siddharth-aggarwal.webp`, `kunal-roy.webp`; Amit Pall's photo also
  refreshed to the new headshot, renamed `amit-pall.jpeg` -> `amit-pall.webp` to match true
  file format — updated 3 references: `AboutView.jsx`, `FounderQuote.jsx`, `lib/data.js`
  `IMAGES.portrait`). Executive Leadership still uses initials placeholders (no photos
  provided yet for those 4).
- Verified via screenshot — all 5 Senior cards show real photos, layout balanced, Executive
  cards larger.

## About Page Polish (2026-11-08, follow-up 2)
- Executive Leadership team now uses real photos for all 4 (`public/victoria-soldatova.webp`,
  `himanshu-kushwaha.webp`, `anshika-garg.webp`, `hema-rawat.webp`).
- Executive cards enlarged significantly on desktop (avatar `w-28/h-28` -> `sm:w-36/h-36`,
  card `min-h-[220px]` -> `sm:min-h-[300px]`, padding `p-8` -> `sm:p-10`), kept responsive
  smaller sizing on mobile (`w-16/h-16`, `min-h-[200px]`) so all 4 stay in one grid-cols-4
  row at every breakpoint without overflow (verified at 390px mobile).
- Gap between "Senior Leadership team." heading and its subtitle tightened (`mt-6` -> `mt-2`).
- Verified via screenshot on desktop and mobile.

## About Page Polish (2026-11-08, follow-up 3)
- Executive Leadership cards significantly enlarged on desktop to balance visually against
  Senior cards: avatar `sm:w-36/h-36` -> `sm:w-44/h-44`, card `sm:min-h-[300px]` ->
  `sm:min-h-[360px]`, name font `sm:text-lg` -> `sm:text-xl` (matches Senior card name size),
  role font `sm:text-xs` -> `sm:text-sm` uppercase (matches Senior). Mobile sizing tuned down
  (`w-14/h-14` avatar, `p-3` card padding) to keep all 4 fitting in one row at 390px without
  clipping (previous larger mobile avatar size caused the 4th card to overflow/clip —
  caught and fixed via screenshot before finishing).
- Verified via screenshot on desktop (1920px) and mobile (390px) — no overflow, balanced
  with Senior section.

## Award Addition (2026-11-08)
- Added a 6th Kailash Lawyers award: 2026 "Certificate of Excellence" (Winner) — NSW
  Parliament certificate awarded to Amit Pall, image `public/awards/kailash-lawyers-2026-certificate-excellence.jpg`.
  Recognition count on `/awards` is computed dynamically from array length (`AwardsView.jsx`
  line ~108), so no separate count update needed. Verified via screenshot.

## About Page Polish (2026-11-08, follow-up 4)
- Executive Leadership role/designation text style now matches Senior Leadership exactly:
  `text-[#5B6B7F]` -> `text-champagne font-medium` (was missing font-weight + wrong color).
  Verified via screenshot.

## Image Replacement (2026-11-08, follow-up 5)
- Homepage "Recognised for excellence." showcase image replaced with user's new composite
  trophy/certificate render (`public/awards-showcase.jpg`, was `.png`; renamed to match true
  JPEG format of the new source file; `sections/Awards.jsx` reference updated). Verified via
  screenshot.

## Image Replacement (2026-11-08, follow-up 6)
- `/awards` hero banner image replaced with user's new black-and-white celebratory
  PropertyGuru Asia Property Awards photo (`public/awards-group.png`, was `.jpg` — removed
  old file, `AwardsView.jsx` reference updated). `objectPosition` reset to "center 20%" for
  this new composition's framing. Verified via screenshot — faces fully visible, no cropping.

## Backlog / Next
- P1: Individual richer company microsites (projects gallery for Kuber, suburb data for Koala).
- P1: CMS/admin to view enquiries in-app.
- P2: Blog/insights, testimonials carousel, real brand logos & Amit Pall photo.
- P2: Replace demo owner email with confirmed inbox; add reCAPTCHA on form.
