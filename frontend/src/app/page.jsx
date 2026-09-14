import { HomeClient } from "@/components/HomeClient";
import { buildMetadata } from "@/lib/seo";
import { getLinkedInPosts } from "@/data/linkedin-posts";

export const metadata = buildMetadata({
  path: "/",
  title: "Kailash Group | Legal, Property Investment & Development",
  description:
    "Legal counsel, research-led property investment and low-rise development from one Australian group. Serving clients nationwide from Parramatta, NSW.",
});

export default async function HomePage() {
  let linkedinPosts = [];
  try {
    linkedinPosts = (await getLinkedInPosts()).slice(0, 3);
  } catch (err) {
    console.error(JSON.stringify({ event: "linkedin_posts_fetch_failed", error: String(err) }));
  }
  return <HomeClient linkedinPosts={linkedinPosts} />;
}
