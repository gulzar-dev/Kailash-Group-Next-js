import { COMPANIES } from "@/lib/data";
import { SITE_URL } from "@/lib/seo";

export default function sitemap() {
  const lastModified = new Date();

  const staticRoutes = ["", "/about", "/awards", "/legal/privacy", "/legal/disclaimer"].map(
    (path) => ({ url: `${SITE_URL}${path}`, lastModified })
  );

  const companyRoutes = COMPANIES.map((c) => ({
    url: `${SITE_URL}/company/${c.slug}`,
    lastModified,
  }));

  return [...staticRoutes, ...companyRoutes];
}
