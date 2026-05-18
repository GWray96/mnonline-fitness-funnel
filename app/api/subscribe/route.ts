import { NextRequest, NextResponse } from "next/server";
import { EMAIL_RE } from "../../_lib/email";

const GHL_WEBHOOK_URL =
  process.env.GHL_WEBHOOK_URL ??
  "https://services.leadconnectorhq.com/hooks/cKCRO6TbecmrUL2ZT57Y/webhook-trigger/97b0a2f5-2c47-42f2-a762-8294cdce1e87";

type SubscribeBody = {
  email?: string;
  firstName?: string;
  // Honeypot: real users never fill this hidden field.
  company?: string;
};

export async function POST(request: NextRequest) {
  let body: SubscribeBody;
  try {
    body = (await request.json()) as SubscribeBody;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Silently accept bots so they do not retry, but never forward.
  if (body.company && body.company.trim() !== "") {
    return NextResponse.json({ success: true });
  }

  const email = body.email?.trim().toLowerCase() ?? "";
  const firstName = body.firstName?.trim().slice(0, 80) ?? "";

  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const payload = {
    email,
    firstName: firstName || undefined,
    source: "Newsletter",
    tags: ["newsletter", "weekly-tips", "lead-magnet"],
  };

  try {
    const res = await fetch(GHL_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("GHL webhook error:", res.status, text);
      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("GHL subscribe error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
