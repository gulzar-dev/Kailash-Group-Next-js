// Runs once when the Next.js server instance starts (dev and prod, Node runtime).
// This is the standard, non-Vercel-specific place to validate required env vars.
export function register() {
  if (!process.env.RESEND_API_KEY) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(
        "Missing required environment variable RESEND_API_KEY. Set it in .env " +
        "before starting the server (see .env.example) — the enquiry form cannot send email without it."
      );
    }
    console.warn(
      "[instrumentation] RESEND_API_KEY not set — enquiry form will not send email in development."
    );
  }
}
