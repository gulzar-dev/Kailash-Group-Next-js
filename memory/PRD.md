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

## Backlog / Next
- P1: Individual richer company microsites (projects gallery for Kuber, suburb data for Koala).
- P1: CMS/admin to view enquiries in-app.
- P2: Blog/insights, testimonials carousel, real brand logos & Amit Pall photo.
- P2: Replace demo owner email with confirmed inbox; add reCAPTCHA on form.
