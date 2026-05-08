import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { caseStudies } from "@/data/caseStudies";

export const runtime = "nodejs";

const LEAD_TO = process.env.LEAD_NOTIFICATION_TO || "salman@yonovo.com";
const LEAD_FROM = process.env.LEAD_NOTIFICATION_FROM || "Yonovo Leads <onboarding@resend.dev>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Body = {
  name?: string;
  email?: string;
  company?: string;
  slug?: string;
  companyName?: string;
};

export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const company = (body.company || "").trim();
  const slug = (body.slug || "").trim();
  const companyName = (body.companyName || "").trim();

  if (!name || !email || !company) {
    return NextResponse.json({ error: "Name, email, and company are required." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (!slug || !caseStudies[slug]) {
    return NextResponse.json({ error: "Unknown case study." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[case-study-download] RESEND_API_KEY missing — lead not emailed:", {
      slug,
      name,
      email,
      company,
    });
    return NextResponse.json({ ok: true, emailed: false });
  }

  try {
    const resend = new Resend(apiKey);
    const subject = `Case study download: ${companyName || slug} — ${name} (${company})`;
    const html = `
      <h2 style="font-family:system-ui,sans-serif;margin:0 0 12px">New case study download</h2>
      <p style="font-family:system-ui,sans-serif;margin:0 0 16px;color:#52525B">
        Someone just downloaded the <strong>${escapeHtml(companyName || slug)}</strong> case study.
      </p>
      <table style="font-family:system-ui,sans-serif;font-size:14px;border-collapse:collapse">
        <tr><td style="padding:6px 12px 6px 0;color:#52525B">Name</td><td style="padding:6px 0">${escapeHtml(name)}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#52525B">Email</td><td style="padding:6px 0"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#52525B">Company</td><td style="padding:6px 0">${escapeHtml(company)}</td></tr>
        <tr><td style="padding:6px 12px 6px 0;color:#52525B">Case study</td><td style="padding:6px 0">${escapeHtml(slug)}</td></tr>
      </table>
    `;
    await resend.emails.send({
      from: LEAD_FROM,
      to: LEAD_TO,
      replyTo: email,
      subject,
      html,
    });
    return NextResponse.json({ ok: true, emailed: true });
  } catch (err) {
    console.error("[case-study-download] Resend error:", err);
    return NextResponse.json({ ok: true, emailed: false });
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
