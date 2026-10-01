import { NextResponse } from "next/server";
const email = /^\S+@\S+\.\S+$/;
export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try { b = await req.json(); } catch { return NextResponse.json({ error: "Invalid request." }, { status: 400 }); }
  if (b.website) return NextResponse.json({ ok: true }); // bot caught by honeypot
  const s = (k: string, max = 2000) => String(b[k] ?? "").trim().slice(0, max);
  const name = s("name", 120), mail = s("email", 200), message = s("message");
  if (!name || !email.test(mail) || message.length < 5) return NextResponse.json({ error: "Enter your name, a valid email and a message." }, { status: 422 });
  // TODO: deliver via an email provider (Resend, Postmark) or store in a database. Add rate limiting before launch.
  console.log("contact", { name, mail, service: s("service", 60), phone: s("phone", 40), organization: s("organization", 120), message });
  return NextResponse.json({ ok: true });
}
