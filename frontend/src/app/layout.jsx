import "@/index.css";
import { SiteChrome } from "./site-chrome";
import { SITE_URL } from "@/lib/seo";
import { organizationJsonLd, personJsonLd } from "@/lib/jsonld";
import { sanityFetch } from "@/lib/sanity";
import { SITE_SETTINGS_QUERY, NAVIGATION_QUERY, COMPANIES_QUERY } from "@/lib/queries";

export async function generateMetadata() {
  let siteSettings = null;
  try {
    siteSettings = await sanityFetch(SITE_SETTINGS_QUERY);
  } catch {}

  const title = siteSettings?.seo?.title || "Kailash Group, Legal, Property Investment & Development";
  const description = siteSettings?.seo?.description || "Where legal expertise meets property investment and development, delivering trusted solutions across Australia.";

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: { canonical: SITE_URL },
    openGraph: { title, description, url: SITE_URL, siteName: "Kailash Group" },
  };
}

export default async function RootLayout({ children }) {
  let siteSettings = null;
  let navigation = null;
  let companies = [];
  try {
    const [ss, nav, co] = await Promise.all([
      sanityFetch(SITE_SETTINGS_QUERY),
      sanityFetch(NAVIGATION_QUERY),
      sanityFetch(COMPANIES_QUERY),
    ]);
    siteSettings = ss;
    navigation = nav;
    companies = co || [];
  } catch {}

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
        />
      </head>
      <body className="grain">
        <SiteChrome navigation={navigation} companies={companies}>
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}
