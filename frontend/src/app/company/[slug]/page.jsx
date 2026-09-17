import { sanityFetch } from "@/lib/sanity";
import { COMPANIES_QUERY, COMPANY_BY_SLUG_QUERY, SEO_QUERY } from "@/lib/queries";
import { CompanyView } from "@/components/CompanyView";
import { legalServiceJsonLd } from "@/lib/jsonld";

export async function generateStaticParams() {
  const companies = await sanityFetch(COMPANIES_QUERY);
  return (companies || []).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const company = await sanityFetch(COMPANY_BY_SLUG_QUERY, { slug });
  const seo = await sanityFetch(SEO_QUERY, { page: `/company/${slug}` });
  return {
    title: seo?.title || company?.seo?.title || company?.name || "Kailash Group",
    description: seo?.description || company?.seo?.description || company?.intro || "",
    alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://kailashgroup.com.au"}/company/${slug}` },
    openGraph: {
      title: seo?.title || company?.seo?.title || company?.name || "Kailash Group",
      description: seo?.description || company?.seo?.description || company?.intro || "",
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://kailashgroup.com.au"}/company/${slug}`,
      siteName: "Kailash Group",
    },
  };
}

export default async function CompanyPage({ params }) {
  const { slug } = await params;
  const company = await sanityFetch(COMPANY_BY_SLUG_QUERY, { slug });
  const allCompanies = await sanityFetch(COMPANIES_QUERY);

  return (
    <>
      {slug === "kailash-lawyers" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceJsonLd()) }}
        />
      )}
      <CompanyView slug={slug} company={company} companies={allCompanies || []} />
    </>
  );
}
