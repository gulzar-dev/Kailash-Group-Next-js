// Shared SEO metadata builder, canonicals and OG tags always derive from NEXT_PUBLIC_SITE_URL
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;

export function buildMetadata({ path, title, description }) {
  if (!SITE_URL) {
    return { title, description, openGraph: { title, description, siteName: "Kailash Group" } };
  }
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Kailash Group",
    },
  };
}
