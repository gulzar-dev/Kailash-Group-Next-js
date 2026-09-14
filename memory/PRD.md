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

## Backlog / Next
- P1: Individual richer company microsites (projects gallery for Kuber, suburb data for Koala).
- P1: CMS/admin to view enquiries in-app.
- P2: Blog/insights, testimonials carousel, real brand logos & Amit Pall photo.
- P2: Replace demo owner email with confirmed inbox; add reCAPTCHA on form.
