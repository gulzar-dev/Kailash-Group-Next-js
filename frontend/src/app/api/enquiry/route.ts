import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { COMPANIES, CONTACT } from "@/lib/data";

// POST /api/enquiry
// Validates + emails the site's contact form via Resend. Storage-free by design:
// every submission is logged as structured JSON (see console.log below) so
// there's a record even if Resend or an inbox has an issue.
//
// NOTE on rate limiting: `hits` below is an in-memory Map, scoped to this one
// Node process. It resets on every deploy/restart and does NOT share state
// across processes. If this app ever runs as a PM2 cluster or is
// load-balanced across multiple VPS instances, move this to Redis (or another
// shared store) so the 5/hour limit applies globally, not per-instance.
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const hits = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

const AREA_OPTIONS = [...COMPANIES.map((c) => c.name), "General"];

const EnquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Enter a valid email address"),
  phone: z.string().trim().optional().default(""),
  company: z
    .enum(["", ...AREA_OPTIONS])
    .optional()
    .default(""),
  message: z.string().trim().min(1, "Message is required"),
  website: z.string().optional().default(""), // honeypot — real users never see or fill this
  page: z.string().optional().default(""), // which page the form was submitted from
});

function sydneyTimestamp() {
  return new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Sydney",
    dateStyle: "full",
    timeStyle: "long",
  }).format(new Date());
}

function ownerEmailHtml(data, timestamp) {
  const areaLabel = data.company || "General enquiry";
  return `
  <table width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;background:#f6f6f4;padding:32px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #eee">
        <tr><td style="background:#0A2540;padding:28px 32px">
          <div style="color:#C6A15B;font-size:12px;letter-spacing:3px;text-transform:uppercase">Kailash Group</div>
          <div style="color:#ffffff;font-size:22px;margin-top:6px">New Website Enquiry</div>
        </td></tr>
        <tr><td style="padding:28px 32px;color:#222">
          <p style="margin:0 0 16px;color:#555">You've received a new enquiry from the website.</p>
          <table width="100%" cellpadding="8" cellspacing="0" style="font-size:15px">
            <tr><td style="color:#888;width:140px">Name</td><td style="color:#111"><strong>${data.name}</strong></td></tr>
            <tr><td style="color:#888">Email</td><td style="color:#111">${data.email}</td></tr>
            <tr><td style="color:#888">Phone</td><td style="color:#111">${data.phone || "-"}</td></tr>
            <tr><td style="color:#888">Area of interest</td><td style="color:#111">${areaLabel}</td></tr>
            <tr><td style="color:#888;vertical-align:top">Message</td><td style="color:#111">${data.message}</td></tr>
            <tr><td style="color:#888">Submitted</td><td style="color:#111">${timestamp} (Australia/Sydney)</td></tr>
            <tr><td style="color:#888">Page</td><td style="color:#111">${data.page || "-"}</td></tr>
          </table>
        </td></tr>
        <tr><td style="background:#faf7ef;padding:18px 32px;color:#8a7a3a;font-size:12px">
          Reply directly to this email to respond to ${data.name}.
        </td></tr>
      </table>
    </td></tr>
  </table>`;
}

function enquirerEmailHtml(data) {
  return `
  <table width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;background:#f6f6f4;padding:32px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #eee">
        <tr><td style="background:#0A2540;padding:28px 32px">
          <div style="color:#C6A15B;font-size:12px;letter-spacing:3px;text-transform:uppercase">Kailash Group</div>
          <div style="color:#ffffff;font-size:22px;margin-top:6px">Thank you, ${data.name}</div>
        </td></tr>
        <tr><td style="padding:28px 32px;color:#333;font-size:15px;line-height:1.6">
          <p>We've received your enquiry and a member of our team will be in touch shortly.</p>
          <p>At Kailash Group, legal expertise meets property investment and development, delivering trusted solutions across Australia.</p>
          <p style="margin-top:24px;color:#888;font-size:13px">Warm regards,<br/>Kailash Group<br/>${CONTACT.address} &middot; ${CONTACT.phone}</p>
        </td></tr>
      </table>
    </td></tr>
  </table>`;
}

export async function POST(request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  if (isRateLimited(ip)) {
    console.warn(JSON.stringify({ event: "enquiry_rate_limited", ip, at: new Date().toISOString() }));
    return NextResponse.json(
      { error: "Too many enquiries from this address. Please try again later or call 02 9633 4233." },
      { status: 429 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = EnquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Invalid submission." },
      { status: 400 }
    );
  }
  const data = parsed.data;

  // Honeypot: real visitors never see or fill this field, bots often do.
  if (data.website) {
    console.warn(JSON.stringify({ event: "enquiry_honeypot_triggered", ip, at: new Date().toISOString() }));
    // Respond as if it succeeded so the bot gets no signal, but do not send email.
    return NextResponse.json({ ok: true });
  }

  const timestamp = sydneyTimestamp();

  // Log every submission as structured JSON — a record survives even if the
  // email bounces. On the VPS, capture stdout/stderr with the process manager
  // (e.g. `pm2 logs` or `journalctl -u <service>`) to retain these.
  console.log(
    JSON.stringify({
      event: "enquiry_submitted",
      ip,
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.company,
      page: data.page,
      timestamp,
    })
  );

  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = `Kailash Group Website <${process.env.TRANSACTIONAL_FROM_EMAIL}>`;
  const areaLabel = data.company || "General enquiry";

  try {
    const ownerResult = await resend.emails.send({
      from,
      to: [process.env.LEAD_NOTIFICATION_EMAIL],
      replyTo: data.email,
      subject: `New enquiry - ${areaLabel} - ${data.name}`,
      html: ownerEmailHtml(data, timestamp),
    });
    // Resend's SDK resolves with { data, error } instead of throwing on API-level failures.
    if (ownerResult.error) throw ownerResult.error;
  } catch (err) {
    console.error(JSON.stringify({ event: "enquiry_owner_email_failed", ip, error: String(err) }));
    return NextResponse.json(
      { error: "Something went wrong sending your enquiry. Please call us on 02 9633 4233." },
      { status: 502 }
    );
  }

  try {
    const confirmationResult = await resend.emails.send({
      from,
      to: [data.email],
      subject: "We've received your enquiry — Kailash Group",
      html: enquirerEmailHtml(data),
    });
    if (confirmationResult.error) throw confirmationResult.error;
  } catch (err) {
    // Owner already notified; a failed confirmation email should not fail the request.
    console.error(JSON.stringify({ event: "enquiry_confirmation_email_failed", ip, error: String(err) }));
  }

  return NextResponse.json({ ok: true });
}
