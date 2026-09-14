// LinkedIn post data source for the "From the founder" home page section.
// Swap getLinkedInPosts() for a CMS or database call — every other file only
// depends on this function's return shape, so nothing else needs to change.

export type LinkedInPost = {
  id: string;
  date: string; // ISO 8601, e.g. "2025-11-05"
  excerpt: string;
  tag: string;
  reactions: number;
  permalink: string;
  image?: string;
};

export const LINKEDIN_PROFILE_URL = "https://au.linkedin.com/in/amit-pall-a0236710";

const POSTS: LinkedInPost[] = [
  {
    id: "koala-invest-local-business-award-2025-11",
    date: "2025-11-05",
    excerpt:
      "Honoured to see Koala Invest recognised again at the Local Business Awards. Awards are lovely, but the trust of every family who invests with us matters more. Grateful.",
    tag: "Recognition",
    reactions: 471,
    permalink: LINKEDIN_PROFILE_URL,
  },
  {
    id: "kuber-projects-propertyguru-award-2025-09",
    date: "2025-09-10",
    excerpt:
      "Best Investment Housing Development at the PropertyGuru Asia Property Awards, thank you to our Kuber Projects team, partners and every homeowner backing our vision for better Australian communities.",
    tag: "Kuber Projects",
    reactions: 935,
    permalink: LINKEDIN_PROFILE_URL,
  },
  {
    id: "twenty-years-reflection-2025-08",
    date: "2025-08-12",
    excerpt:
      "Twenty years ago I opened a small law office in Parramatta. Today Kailash Group is a family of three companies. The lesson? Purpose compounds faster than capital.",
    tag: "Reflection",
    reactions: 1504,
    permalink: LINKEDIN_PROFILE_URL,
  },
];

// TODO(cms): replace the static POSTS array above with a CMS or database call, e.g.
//   const rows = await db.collection("linkedin_posts").find().sort({ date: -1 }).toArray();
// Keep the resolved value shaped as LinkedInPost[] and this function async —
// nothing that calls getLinkedInPosts() needs to change.
export async function getLinkedInPosts(): Promise<LinkedInPost[]> {
  return [...POSTS].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
