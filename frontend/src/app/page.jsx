import { HomeClient } from "@/components/HomeClient";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  path: "/",
  title: "Kailash Group | Legal, Property Investment & Development",
  description:
    "Legal counsel, research-led property investment and low-rise development from one Australian group. Serving clients nationwide from Parramatta, NSW.",
});

export default function HomePage() {
  return <HomeClient />;
}
