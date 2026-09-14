import { SITE_URL } from "@/lib/seo";
import { CONTACT, AWARDS } from "@/lib/data";

// Plain-text, factual company description for AI/LLM crawlers (GPTBot, PerplexityBot,
// ClaudeBot, Google-Extended, etc). No marketing language — see llms.txt convention.
const COMPANY_FACTS = [
  {
    name: "Kailash Lawyers & Consultants",
    what: "Law firm founded by Amit Pall, offering property and conveyancing, family, immigration and commercial law, plus pro bono services.",
    services: ["Property Law & Conveyancing", "Family Law", "Immigration Law", "Business & Commercial Law", "Pro Bono Services"],
    website: "https://www.kailash.com.au/",
  },
  {
    name: "Koala Invest",
    what: "Licensed real estate research and advisory firm providing residential property investment strategy, market and suburb research, portfolio advisory and buyer representation.",
    services: ["Investment Strategy", "Market & Suburb Research", "Portfolio Advisory", "Buyer Representation"],
    website: "https://koalainvest.com.au/",
  },
  {
    name: "Kuber Projects",
    what: "Property development company delivering low-rise residential developments, covering site acquisition, feasibility and design, project delivery and investor returns.",
    services: ["Site Acquisition", "Feasibility & Design", "Project Delivery", "Investor Returns"],
    website: "https://kuberprojects.com.au/",
  },
];

function buildLlmsTxt() {
  const lines = [
    "# Kailash Group",
    "",
    `Kailash Group is an Australian company group operating three businesses: legal services, property investment advisory and property development. Head office: ${CONTACT.address}. Areas served: Australia-wide.`,
    "",
    "## Companies",
    "",
  ];

  for (const c of COMPANY_FACTS) {
    lines.push(`### ${c.name}`);
    lines.push(c.what);
    lines.push(`Services: ${c.services.join(", ")}.`);
    lines.push("Areas served: Australia-wide.");
    lines.push(`Website: ${c.website}`);
    lines.push("");
  }

  lines.push("## Founder");
  lines.push("Amit Pall, Founder & Principal of Kailash Group.");
  lines.push("");

  lines.push("## Awards");
  for (const a of AWARDS) {
    lines.push(`- ${a.sentence}`);
  }
  lines.push("");

  lines.push("## Contact");
  lines.push(`Phone: ${CONTACT.phoneIntl}`);
  lines.push(`Email: ${CONTACT.email}`);
  lines.push(`Address: ${CONTACT.address}`);
  lines.push("");

  lines.push("## Links");
  lines.push(`- Kailash Group: ${SITE_URL}`);
  for (const c of COMPANY_FACTS) {
    lines.push(`- ${c.name}: ${c.website}`);
  }
  lines.push("");

  return lines.join("\n");
}

export async function GET() {
  return new Response(buildLlmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
