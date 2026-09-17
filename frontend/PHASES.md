# Kailash Group — Sanity CMS Integration Phases

## Phase 1: Core Sanity Integration ✅
- Homepage (/) + Company pages (/company/[slug])
- All 9 homepage sections, Nav, Footer, CompanyView
- Sanity client with graceful fallback, sanityFetch(), revalidation API
- Schemas, seed script, GROQ queries
- **Status**: Build passes, ready to test

## Phase 2: Remaining Pages
- /about → Sanity pageContent schema
- /awards → Sanity award schema
- /legal/* → New legalPage schema
- robots.txt / sitemap.xml → Pull from Sanity
- Email enquiry API → Sanity emailTemplate schema

## Phase 3: Sanity Studio Deployment
- Deploy hosted Studio at kailashgroup.sanity.studio
- Configure auth, datasets, CORS
- Test visual editing with Presentation tool

## Phase 4: Vercel Deployment
- Configure Sanity env vars in Vercel
- Set up SANITY_REVALIDATE_SECRET
- Deploy and verify

## Phase 5: Polish & Handoff
- Final QA across all pages
- Document admin workflow for client
- Remove hardcoded data.js imports
- Clean up unused code
