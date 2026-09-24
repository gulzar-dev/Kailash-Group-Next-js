import "@/index.css";
import { SiteChrome } from "./site-chrome";
import { SITE_URL } from "@/lib/seo";
import { organizationJsonLd, personJsonLd } from "@/lib/jsonld";

export const metadata = {
  ...(SITE_URL ? { metadataBase: new URL(SITE_URL) } : {}),
  title: "Kailash Group, Legal, Property Investment & Development",
  description:
    "Where legal expertise meets property investment and development, delivering trusted solutions across Australia.",
};

export default function RootLayout({ children }) {
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
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
