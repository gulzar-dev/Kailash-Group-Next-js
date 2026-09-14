const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
const SITE_HOST = SITE_URL ? new URL(SITE_URL).host : null;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  // Allow the Emergent preview proxy to talk to the Next dev server
  allowedDevOrigins: [
    "kailash-immersive.preview.emergentagent.com",
    "*.preview.emergentagent.com",
  ],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/about.html", destination: "/#about", permanent: true },
      { source: "/company.html", destination: "/#companies", permanent: true },
      { source: "/award.html", destination: "/#awards", permanent: true },
      { source: "/contact.html", destination: "/#contact", permanent: true },
      { source: "/privacy-policy.html", destination: "/legal/privacy", permanent: true },
      { source: "/disclaimer.html", destination: "/legal/disclaimer", permanent: true },
    ];
  },
  async headers() {
    // Block indexing on any host that does not match NEXT_PUBLIC_SITE_URL (preview/staging safety net)
    if (!SITE_HOST) return [];
    const escapedHost = SITE_HOST.replace(/\./g, "\\.");
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: `^(?!${escapedHost}$).*$` }],
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },
};

module.exports = nextConfig;
