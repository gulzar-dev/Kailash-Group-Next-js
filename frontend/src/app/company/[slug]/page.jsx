import { COMPANIES } from "@/lib/data";
import { CompanyView } from "@/components/CompanyView";
import { buildMetadata } from "@/lib/seo";
import { legalServiceJsonLd } from "@/lib/jsonld";

const SEO = {
  "kailash-lawyers": {
    title: "Property & Commercial Lawyers Australia | Kailash Lawyers & Consultants",
    description:
      "Australian law firm led by Amit Pall. Property, conveyancing and commercial law, with pro bono support.",
  },
  "koala-invest": {
    title: "Property Investment Advisory Australia | Koala Invest",
    description:
      "Licensed, research-led residential property advisory. Suburb research, portfolio strategy and buyer representation across Australia.",
  },
  "kuber-projects": {
    title: "Low-Rise Property Developer Australia | Kuber Projects",
    description:
      "End-to-end delivery of low-rise residential developments, from site acquisition and feasibility through to handover and investor returns.",
  },
};

export function generateStaticParams() {
  return COMPANIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const company = COMPANIES.find((c) => c.slug === slug);
  const seo = SEO[slug] || { title: company ? company.name : "Kailash Group", description: company?.intro };
  return buildMetadata({ path: `/company/${slug}`, ...seo });
}

export default async function CompanyPage({ params }) {
  const { slug } = await params;
  return (
    <>
      {slug === "kailash-lawyers" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceJsonLd()) }}
        />
      )}
      <CompanyView slug={slug} />
    </>
  );
}
