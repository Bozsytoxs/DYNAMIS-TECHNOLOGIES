import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/admin";
const { GITHUB_REPO: repo, GITHUB_TOKEN: token, GITHUB_BRANCH } = process.env;
const err = (e: string, s: number) => NextResponse.json({ error: e }, { status: s });
export async function POST(req: Request) {
  if (!isAuthed(req)) return err("Not signed in.", 401);
  if (!repo || !token) return err("GitHub is not configured on the server.", 500);
  const f = (await req.formData().catch(() => null))?.get("file");
  if (!(f instanceof File)) return err("No file.", 400);
  if (f.size > 2_500_000) return err("Image too large (max 2.5 MB).", 413);
  const buf = Buffer.from(await f.arrayBuffer());
  const is = (a: number[], o = 0) => a.every((v, i) => buf[o + i] === v);
  const ext = is([0xff, 0xd8, 0xff]) ? "jpg" : is([0x89, 0x50, 0x4e, 0x47]) ? "png" : is([0x52, 0x49, 0x46, 0x46]) && is([0x57, 0x45, 0x42, 0x50], 8) ? "webp" : null;
  if (!ext) return err("Only JPEG, PNG or WebP images.", 415);
  const name = `${Date.now()}-${Math.random().toString(36).slice(2, 6)}.${ext}`;
  const r = await fetch(`https://api.github.com/repos/${repo}/contents/public/uploads/${name}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "User-Agent": "dynamis-admin" },
    body: JSON.stringify({ message: `Upload ${name} via admin`, content: buf.toString("base64"), branch: GITHUB_BRANCH || "main" }),
  });
  if (!r.ok) return err("Could not save image to GitHub.", 502);
  return NextResponse.json({ url: `/uploads/${name}` });
}
