# Kailash Group — Website

Marketing site and lead-generation forms for Kailash Group (legal services, property
investment advisory and property development, operating across Australia from Parramatta,
NSW). This document is for the developer deploying this repo to production.

## Stack

- **Next.js 15** (App Router, `src/app`), React 19.
- **Tailwind CSS** for styling, **Framer Motion** + **Lenis** for animation/smooth scroll.
- **Zod** for server-side validation, **Resend** for transactional email.
- No database. No CMS (LinkedIn post content is a static TypeScript file — see below).
- A legacy FastAPI service lives in `../backend` (Python, MongoDB). **It is not used by the
  current frontend** — the enquiry form and LinkedIn posts are served by this Next.js app's
  own API routes (`src/app/api/enquiry`, `src/app/api/linkedin-posts`). You do not need to
  deploy `../backend` for this site to work. It's kept in the repo only in case some other
  part of the org still calls it directly.

## Local setup

```bash
cd frontend
yarn install
cp .env.example .env.local   # fill in real values, see table below
yarn start                   # next dev -p 3000 -H 0.0.0.0
```

Open `http://localhost:3000`.

`.env.local` is git-ignored and always overrides `.env` — use it for your own local secrets
instead of editing `.env`.

## Environment variables

All variables are read via `process.env` — there are no hardcoded fallbacks anywhere in the
codebase, so a missing variable fails fast (either the app won't build/start, or the
specific feature that depends on it will error).

| Variable | Used for | What breaks if it's missing |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical domain for all metadata (`<link rel="canonical">`, Open Graph `url`), `app/sitemap.js`, `app/robots.js`, `app/llms.txt`, all JSON-LD `url` fields, and the noindex-guard host check in `next.config.js`. | `layout.jsx`'s `metadataBase = new URL(SITE_URL)` **throws at build/start time** if this is unset or not a valid URL — the whole app fails to boot. Must be set to `https://kailashgroup.com.au` in production. |
| `RESEND_API_KEY` | Authenticates the Resend SDK in `src/app/api/enquiry/route.ts`. | `src/instrumentation.ts` throws on server startup if this is unset, naming the variable in the error — the whole app refuses to start. This is intentional: a missing key should be impossible to miss on a VPS. |
| `LEAD_NOTIFICATION_EMAIL` | The inbox that receives every enquiry-form submission (`to:` on the owner email). | Enquiry emails have nowhere to go — Resend will reject the send (invalid/empty recipient) and the form shows its "please call us" fallback error instead of succeeding. |
| `TRANSACTIONAL_FROM_EMAIL` | The `from:` address for both the owner-notification and the enquirer-confirmation emails. Must be verified in your Resend account (or use Resend's sandbox address `onboarding@resend.dev`, which only delivers to your own Resend account email). | Same failure mode as above — Resend rejects the send, form shows the fallback error. |
| `NEXT_PUBLIC_BACKEND_URL`, `REACT_APP_BACKEND_URL` | **Legacy, unused.** Left over from an earlier build that called the FastAPI backend directly. Nothing in `src/` reads these anymore (the enquiry form now posts to the relative path `/api/enquiry`). | Nothing — safe to delete once you're comfortable, kept for now so nothing that might still reference them elsewhere breaks. |
| `WDS_SOCKET_PORT`, `ENABLE_HEALTH_CHECK` | **Legacy, unused.** Left over from the original Create React App scaffold (`craco.config.js`, `webpack-dev-server`). Next.js's own dev server doesn't read either. | Nothing. Safe to remove. |

## Build and run

```bash
yarn build     # next build
yarn start:prod # next start -p 3000 -H 0.0.0.0
```

**This is not a static export.** There is no `output: 'export'` in `next.config.js`, and
there must not be one added — `/api/enquiry` and `/api/linkedin-posts` are server-side
Route Handlers that run Node code (Resend SDK calls, in-memory rate limiting, `zod`
validation) on every request. A static export would silently drop these routes. Always run
`next build` followed by `next start` on a persistent Node process — never `next export` or
a static file host.

## Recommended VPS setup

1. **Node.js LTS** (Node 20 or 22). Check `node -v` before anything else — Next.js 15
   requires Node ≥ 18.18, but stick to an LTS release for stability.
2. **Install `sharp`** on the server: `npm install sharp` (or `yarn add sharp`) inside the
   project. Next.js's built-in image optimisation (`next/image`, used indirectly by the
   `images.remotePatterns` config) uses `sharp` in production when it's available and falls
   back to a slower, unoptimised path without it. It's an optional dependency, so it's easy
   to forget — install it explicitly on the VPS.
3. **Process manager** — keep the Node process alive across reboots and crashes. Either:
   - **pm2**: `pm2 start "yarn start:prod" --name kailash-group` then `pm2 save` and
     `pm2 startup` to survive reboots; or
   - **systemd unit**, e.g. `/etc/systemd/system/kailash-group.service`:
     ```ini
     [Unit]
     Description=Kailash Group Next.js site
     After=network.target

     [Service]
     WorkingDirectory=/var/www/kailash-group/frontend
     ExecStart=/usr/bin/yarn start:prod
     Restart=always
     Environment=NODE_ENV=production
     EnvironmentFile=/var/www/kailash-group/frontend/.env

     [Install]
     WantedBy=multi-user.target
     ```
     Then `systemctl enable --now kailash-group`.
4. **nginx reverse proxy** — proxy the public domain to the Next.js port (3000 by default):
   ```nginx
   server {
     listen 80;
     server_name kailashgroup.com.au www.kailashgroup.com.au;

     location / {
       proxy_pass http://127.0.0.1:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection "upgrade";
       proxy_set_header Host $host;
       proxy_set_header X-Real-IP $remote_addr;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_set_header X-Forwarded-Proto $scheme;
     }
   }
   ```
   `X-Forwarded-For` matters: the enquiry form's rate limiter
   (`src/app/api/enquiry/route.ts`) reads `x-forwarded-for` to identify the caller's IP.
   Without it, every request looks like it comes from the same address (nginx's own IP)
   and the 5-per-hour limit is shared across all real visitors.
5. **TLS via Let's Encrypt** — `certbot --nginx -d kailashgroup.com.au -d www.kailashgroup.com.au`
   (or your preferred ACME client). Renewals are automatic with certbot's default systemd
   timer; just confirm `certbot renew --dry-run` succeeds once after setup.

### Do not duplicate the redirects in nginx

`next.config.js` already defines seven permanent (308) redirects for the old `.html` URLs:

```
/index.html          -> /
/about.html           -> /#about
/company.html         -> /#companies
/award.html           -> /#awards
/contact.html         -> /#contact
/privacy-policy.html  -> /legal/privacy
/disclaimer.html      -> /legal/disclaimer
```

These are handled entirely inside Next.js. **Do not also add `rewrite`/`return 301` rules
for these paths in the nginx config** — nginx runs in front of Next.js, so if it intercepts
these paths first, Next's redirect logic never runs, and the two configs can silently drift
out of sync over time. Let every request pass through to Next.js and let `next.config.js`
be the single source of truth for these routes.

## The noindex safety header — do not remove

`next.config.js`'s `headers()` function adds `X-Robots-Tag: noindex` to every response **on
any host that does not exactly match `NEXT_PUBLIC_SITE_URL`**:

```js
const SITE_HOST = new URL(process.env.NEXT_PUBLIC_SITE_URL).host;
// ...has: [{ type: "host", value: `^(?!${escapedHost}$).*$` }]
```

This means if the same build is ever reachable through another hostname — a staging
subdomain, a bare server IP, a CDN preview URL, a misconfigured DNS entry — that hostname is
automatically blocked from search indexing, while `kailashgroup.com.au` itself is left
untouched (no noindex header there). This prevents duplicate-content penalties and
accidental indexing of non-production copies of the site.

**Keep this logic in place.** If you ever change domains, update `NEXT_PUBLIC_SITE_URL` —
don't remove or bypass the header check.

## Post-launch SEO checklist

Once DNS points at the VPS and the site is live on `https://kailashgroup.com.au`:

- [ ] Verify the domain in **Google Search Console** (DNS TXT record or HTML file method).
- [ ] Submit `https://kailashgroup.com.au/sitemap.xml` in Search Console.
- [ ] Confirm all seven legacy redirects return **308**, e.g.:
      `curl -I https://kailashgroup.com.au/about.html` → `HTTP/1.1 308` with
      `Location: /#about`.
- [ ] Test the enquiry form end to end on the live domain (`/#contact`) and confirm:
      - the success message appears inline,
      - the lead email actually arrives at `LEAD_NOTIFICATION_EMAIL`,
      - the confirmation email arrives at the test address used, and
      - replying to the lead email reaches the enquirer (reply-to is set to their address).
- [ ] Validate structured data with Google's **Rich Results Test**
      (https://search.google.com/test/rich-results) against the homepage (Organization,
      Person, FAQPage) and against `/company/kailash-lawyers` (LegalService).
- [ ] Spot-check `https://kailashgroup.com.au/robots.txt` and `https://kailashgroup.com.au/llms.txt`
      load correctly and are not returning the noindex header (only non-production hosts
      should get that header).

## Editing LinkedIn post content

LinkedIn posts shown in the homepage "From the founder" section are **not** pulled live
from LinkedIn — they're a small static data file:

```
frontend/src/data/linkedin-posts.ts
```

Each post is `{ id, date, excerpt, tag, reactions, permalink, image? }`. The homepage
always shows the 3 most recent by `date`. This same file backs the public
`GET /api/linkedin-posts` JSON endpoint (`src/app/api/linkedin-posts/route.ts`), so both the
page and the API stay in sync automatically.

**To swap this for a CMS or database later:** replace the body of the exported
`getLinkedInPosts()` function in `linkedin-posts.ts` with a fetch/query call that resolves to
the same `LinkedInPost[]` shape. Nothing else needs to change — the homepage section and the
API route both just call `getLinkedInPosts()` and don't care where the data comes from.
