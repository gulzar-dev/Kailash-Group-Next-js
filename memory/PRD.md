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

## Backlog / Next
- P1: Individual richer company microsites (projects gallery for Kuber, suburb data for Koala).
- P1: CMS/admin to view enquiries in-app.
- P2: Blog/insights, testimonials carousel, real brand logos & Amit Pall photo.
- P2: Replace demo owner email with confirmed inbox; add reCAPTCHA on form.
