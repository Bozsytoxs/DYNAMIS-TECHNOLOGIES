import crypto from "crypto";
const secret = () => process.env.ADMIN_SECRET || "";
const sign = (v: string) => crypto.createHmac("sha256", secret()).update(v).digest("hex");
export const makeToken = () => { const exp = String(Date.now() + 8 * 3600e3); return `${exp}.${sign(exp)}`; };
export function isAuthed(req: Request) {
  if (!secret()) return false;
  const m = /(?:^|; )adm=([^;]+)/.exec(req.headers.get("cookie") || "");
  if (!m) return false;
  const [exp, sig] = m[1].split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  const a = Buffer.from(sig), b = Buffer.from(sign(exp));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
export function checkPassword(p: string) {
  const want = process.env.ADMIN_PASSWORD;
  if (!want) return false;
  const h = (s: string) => crypto.createHash("sha256").update(s).digest();
  return crypto.timingSafeEqual(h(p), h(want));
}
