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
};

module.exports = nextConfig;
