import { LegalView } from "@/components/LegalView";

const TITLES = {
  privacy: "Privacy Policy",
  disclaimer: "Disclaimer",
  acknowledgement: "Acknowledgement of Country",
};

export function generateStaticParams() {
  return Object.keys(TITLES).map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return { title: `${TITLES[slug] ?? "Legal"} — Kailash Group` };
}

export default async function LegalPage({ params }) {
  const { slug } = await params;
  return <LegalView slug={slug} />;
}
