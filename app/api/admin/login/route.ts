import { NextResponse } from "next/server";
import { checkPassword, makeToken } from "@/lib/admin";
const tries = new Map<string, { n: number; t: number }>(); // basic brute-force limit (per server instance)
export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "x", now = Date.now();
  const t = tries.get(ip);
  if (t && now - t.t < 15 * 60e3 && t.n >= 5) return NextResponse.json({ error: "Too many attempts. Try again in 15 minutes." }, { status: 429 });
  let pw = ""; try { pw = String((await req.json()).password ?? ""); } catch {}
  if (!checkPassword(pw)) { tries.set(ip, { n: t && now - t.t < 15 * 60e3 ? t.n + 1 : 1, t: t && now - t.t < 15 * 60e3 ? t.t : now }); return NextResponse.json({ error: "Wrong password." }, { status: 401 }); }
  tries.delete(ip);
  const res = NextResponse.json({ ok: true });
  res.cookies.set("adm", makeToken(), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 8 * 3600 });
  return res;
}
