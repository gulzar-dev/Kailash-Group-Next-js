import { COMPANIES } from "@/lib/data";
import { CompanyView } from "@/components/CompanyView";

export function generateStaticParams() {
  return COMPANIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const company = COMPANIES.find((c) => c.slug === slug);
  return {
    title: company ? `${company.name}, Kailash Group` : "Kailash Group",
    description: company?.intro,
  };
}

export default async function CompanyPage({ params }) {
  const { slug } = await params;
  return <CompanyView slug={slug} />;
}
