import "@/index.css";
import { SiteChrome } from "./site-chrome";

export const metadata = {
  title: "Kailash Group, Legal, Property Investment & Development",
  description:
    "Where legal expertise meets property investment and development, delivering trusted solutions across Australia.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="grain">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
