import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/admin";
import { schema } from "@/lib/schema";
const { GITHUB_REPO: repo, GITHUB_TOKEN: token, GITHUB_BRANCH } = process.env;
const branch = GITHUB_BRANCH || "main";
const h = { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "User-Agent": "dynamis-admin" };
const url = (c: string) => `https://api.github.com/repos/${repo}/contents/content/${c}.json`;
const err = (error: string, status: number) => NextResponse.json({ error }, { status });
const col = (req: Request) => { const c = new URL(req.url).searchParams.get("c") || ""; return c in schema ? c : null; };
export async function GET(req: Request) {
  if (!isAuthed(req)) return err("Not signed in.", 401);
  const c = col(req); if (!c) return err("Unknown section.", 400);
  if (!repo || !token) return err("GitHub is not configured on the server.", 500);
  const r = await fetch(`${url(c)}?ref=${branch}`, { headers: h, cache: "no-store" });
  if (!r.ok) return err("Could not load from GitHub.", 502);
  const j = await r.json();
  return NextResponse.json({ items: JSON.parse(Buffer.from(j.content, "base64").toString()), sha: j.sha });
}
export async function PUT(req: Request) {
  if (!isAuthed(req)) return err("Not signed in.", 401);
  const c = col(req); if (!c) return err("Unknown section.", 400);
  if (!repo || !token) return err("GitHub is not configured on the server.", 500);
  let b: { items?: unknown; sha?: string } = {}; try { b = await req.json(); } catch {}
  const body = JSON.stringify(b.items, null, 2);
  if (!Array.isArray(b.items) || b.items.length > 500 || body.length > 200000 || !b.sha) return err("Invalid data.", 422);
  const r = await fetch(url(c), { method: "PUT", headers: h, body: JSON.stringify({ message: `Update ${c} via admin`, content: Buffer.from(body).toString("base64"), sha: b.sha, branch }) });
  if (r.status === 409 || r.status === 422) return err("Someone else changed this. Reload and try again.", 409);
  if (!r.ok) return err("Could not save to GitHub.", 502);
  return NextResponse.json({ sha: (await r.json()).content.sha });
}
