import { NextResponse } from "next/server";
import { getLinkedInPosts } from "@/data/linkedin-posts";

// GET /api/linkedin-posts
// Response shape: LinkedInPost[] (see src/data/linkedin-posts.ts for the type):
//   [{ id, date (ISO string), excerpt, tag, reactions, permalink, image? }, ...]
//
// TODO(cms): getLinkedInPosts() currently reads a static in-memory array.
// Swap its internals for a CMS or database call — this route needs no changes
// as long as the resolved shape stays the same.
export async function GET() {
  try {
    const posts = await getLinkedInPosts();
    return NextResponse.json(posts);
  } catch (err) {
    console.error(JSON.stringify({ event: "linkedin_posts_fetch_failed", error: String(err) }));
    return NextResponse.json([]);
  }
}
