import { HomeClient } from "@/components/HomeClient";
import { sanityFetch } from "@/lib/sanity";
import {
  HOMEPAGE_QUERY,
  LINKEDIN_POSTS_QUERY,
  SEO_QUERY,
} from "@/lib/queries";

export async function generateMetadata() {
  const seo = await sanityFetch(SEO_QUERY, { page: "/" });
  return {
    title: seo?.title || "Kailash Group | Legal, Property Investment & Development",
    description:
      seo?.description ||
      "Legal counsel, research-led property investment and low-rise development from one Australian group. Serving clients nationwide from Parramatta, NSW.",
    alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "https://kailashgroup.com.au"}/` },
    openGraph: {
      title: seo?.title || "Kailash Group | Legal, Property Investment & Development",
      description:
        seo?.description ||
        "Legal counsel, research-led property investment and low-rise development from one Australian group.",
      url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://kailashgroup.com.au"}/`,
      siteName: "Kailash Group",
    },
  };
}

export default async function HomePage() {
  const data = await sanityFetch(HOMEPAGE_QUERY);

  return (
    <HomeClient
      siteSettings={data?.siteSettings}
      navigation={data?.navigation}
      hero={data?.hero}
      companies={data?.companies}
      services={data?.services}
      about={data?.about}
      ecosystem={data?.ecosystem}
      servicesSection={data?.servicesSection}
      communitySection={data?.communitySection}
      faqSection={data?.faqSection}
      contactSection={data?.contactSection}
      marquee={data?.marquee}
      timeline={data?.timeline}
      faqs={data?.faqs}
      community={data?.community}
      awards={data?.awards}
      linkedinPosts={data?.linkedinPosts?.slice(0, 3)}
    />
  );
}
