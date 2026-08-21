import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 text-center px-6">
      <p className="font-display text-6xl font-bold text-[#0A2540]">404</p>
      <p className="text-[#475569] max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link href="/" className="btn-gold px-6 py-3 text-sm">
        Back to Kailash Group
      </Link>
    </div>
  );
}
