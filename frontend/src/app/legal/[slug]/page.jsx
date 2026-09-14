import { LegalView } from "@/components/LegalView";
import { buildMetadata } from "@/lib/seo";

const TITLES = {
  privacy: "Privacy Policy",
  disclaimer: "Disclaimer",
};

const SEO = {
  privacy: {
    title: "Privacy Policy | Kailash Group",
    description:
      "How Kailash Group collects, uses, stores and protects personal information under the Privacy Act 1988 and the Australian Privacy Principles.",
  },
  disclaimer: {
    title: "Disclaimer | Kailash Group",
    description:
      "Terms governing the use of this website and the information published by Kailash Group and its associated businesses.",
  },
};

export function generateStaticParams() {
  return Object.keys(TITLES).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const seo = SEO[slug] || { title: `${TITLES[slug] ?? "Legal"}, Kailash Group`, description: "" };
  return buildMetadata({ path: `/legal/${slug}`, ...seo });
}

export default async function LegalPage({ params }) {
  const { slug } = await params;
  return <LegalView slug={slug} />;
}
