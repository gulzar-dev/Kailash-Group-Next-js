import { SITE_URL } from "@/lib/seo";

// AI/LLM crawlers explicitly allowed alongside the general "*" rule below,
// so answer engines (ChatGPT, Google AI Mode, Perplexity, Claude) can index this site.
const AI_BOTS = ["GPTBot", "OAI-SearchBot", "PerplexityBot", "ClaudeBot", "Google-Extended"];

export default function robots() {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_BOTS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
