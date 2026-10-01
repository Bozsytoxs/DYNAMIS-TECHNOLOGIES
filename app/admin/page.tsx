"use client";
import { useState } from "react";
import { schema } from "@/lib/schema";
type Item = Record<string, unknown>;
const J = { "Content-Type": "application/json" };
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60);
async function shrink(file: File): Promise<Blob> { // phone photos are resized to 1600px so they upload quickly
  const img = await createImageBitmap(file), sc = Math.min(1, 1600 / Math.max(img.width, img.height));
  const c = document.createElement("canvas"); c.width = Math.round(img.width * sc); c.height = Math.round(img.height * sc);
  c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
  return new Promise((res, rej) => c.toBlob((b) => (b ? res(b) : rej(new Error("Could not read image"))), "image/jpeg", 0.82));
}
async function upload(file: File): Promise<string> {
  const fd = new FormData(); fd.append("file", await shrink(file), "photo.jpg");
  const r = await fetch("/api/admin/upload", { method: "POST", body: fd }), j = await r.json();
  if (!r.ok) throw new Error(j.error);
  return j.url as string;
}
export default function Admin() {
  const [authed, setAuthed] = useState(false), [pw, setPw] = useState(""), [col, setCol] = useState("events");
  const [items, setItems] = useState<Item[]>([]), [sha, setSha] = useState(""), [msg, setMsg] = useState("");
  async function load(c: string) {
    setMsg("Loading…"); setCol(c);
    const r = await fetch(`/api/admin/content?c=${c}`), j = await r.json();
    if (r.status === 401) { setAuthed(false); setMsg("Please sign in."); return; }
    if (!r.ok) { setMsg(j.error); return; }
    setItems(j.items); setSha(j.sha); setMsg("");
  }
  async function login(e: React.FormEvent) {
    e.preventDefault();
    const r = await fetch("/api/admin/login", { method: "POST", headers: J, body: JSON.stringify({ password: pw }) });
    if (!r.ok) { setMsg((await r.json()).error); return; }
    setAuthed(true); setPw(""); load(col);
  }
  async function save() {
    setMsg("Publishing…");
    const seen = new Set<string>();
    const out = col === "posts" || col === "projects" ? items.map((x) => { const b = String(x.slug || slugify(String(x.title || "item"))) || "item"; let s = b, n = 2; while (seen.has(s)) s = `${b}-${n++}`; seen.add(s); return { ...x, slug: s }; }) : items;
    const r = await fetch(`/api/admin/content?c=${col}`, { method: "PUT", headers: J, body: JSON.stringify({ items: out, sha }) }), j = await r.json();
    if (!r.ok) { setMsg(j.error); return; }
    setItems(out); setSha(j.sha); setMsg("Saved. The live site updates in a few minutes.");
  }
  async function pick(i: number, k: string, file?: File, append = false) {
    if (!file) return;
    setMsg("Uploading image…");
    try { const u = await upload(file); set(i, k, append ? `${String(items[i][k] ?? "")}\n\n![${String(items[i].title ?? "Image")}](${u})\n\n` : u); setMsg("Image uploaded. Press Publish changes to save."); }
    catch (e) { setMsg((e as Error).message); }
  }
  const set = (i: number, k: string, v: unknown) => setItems(items.map((x, n) => (n === i ? { ...x, [k]: v } : x)));
  const f = "mt-1 w-full rounded-lg border border-slate-300 bg-white p-2";
  if (!authed) return (
    <section className="mx-auto max-w-sm px-5 pt-16"><h1 className="mb-4 text-3xl font-extrabold">Admin sign in</h1>
      <form onSubmit={login} className="grid gap-3"><label>Password<input type="password" value={pw} onChange={(e) => setPw(e.target.value)} className={f} autoComplete="current-password" /></label><button className="btn">Sign in</button></form>
      {msg && <p role="alert" className="mt-3 font-semibold text-red-700">{msg}</p>}</section>
  );
  return (
    <section className="mx-auto max-w-3xl px-5 pt-10">
      <h1 className="mb-4 text-3xl font-extrabold">Manage content</h1>
      <div className="mb-6 flex flex-wrap gap-2">{Object.entries(schema).map(([k, v]) => (<button key={k} onClick={() => load(k)} className={k === col ? "btn" : "btn-o"}>{v.label}</button>))}</div>
      {items.map((it, i) => (
        <div key={i} className="card mb-4 grid gap-3">
          {schema[col].fields.map((fd) => (
            <label key={fd.k}>{fd.label}
              {fd.type === "image" ? <span className="mt-1 block"><input type="file" accept="image/*" onChange={(e) => pick(i, fd.k, e.target.files?.[0])} /><small className="block text-slate-600">{String(it[fd.k] ?? "")}</small></span> : fd.type === "textarea" ? <textarea rows={fd.k === "body" ? 12 : 4} className={f} value={String(it[fd.k] ?? "")} onChange={(e) => set(i, fd.k, e.target.value)} />
                : fd.type === "select" ? <select className={f} value={String(it[fd.k] ?? "")} onChange={(e) => set(i, fd.k, e.target.value)}><option value="" />{fd.options!.map((o) => <option key={o}>{o}</option>)}</select>
                : <input className={f} type={fd.type === "number" ? "number" : "text"} value={fd.type === "list" ? ((it[fd.k] as string[]) ?? []).join(", ") : String(it[fd.k] ?? "")}
                    onChange={(e) => set(i, fd.k, fd.type === "number" ? Number(e.target.value) : fd.type === "list" ? e.target.value.split(",").map((s) => s.trim()).filter(Boolean) : e.target.value)} />}
            {fd.k === "body" && <span className="mt-2 block text-sm">Add a picture inside the article: <input type="file" accept="image/*" onChange={(e) => pick(i, "body", e.target.files?.[0], true)} /></span>}
            </label>))}
          <button className="btn-o w-fit" onClick={() => confirm("Delete this entry?") && setItems(items.filter((_, n) => n !== i))}>Delete</button>
        </div>))}
      <div className="sticky bottom-3 flex flex-wrap items-center gap-3 rounded-xl border bg-white p-3"><button className="btn-o" onClick={() => setItems([...items, {}])}>Add new</button><button className="btn" onClick={save}>Publish changes</button><span role="status" className="text-sm font-semibold">{msg}</span></div>
    </section>
  );
}
