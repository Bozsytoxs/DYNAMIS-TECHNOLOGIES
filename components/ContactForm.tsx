"use client";
import { useState } from "react";
const options = ["Networking", "Fibre", "Wi-Fi", "Starlink", "Web Development", "AI", "Cybersecurity", "CCTV", "Solar", "Electrical", "IoT", "Technical Installation", "Other"];
export default function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [msg, setMsg] = useState("");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error || "Something went wrong.");
      setState("ok");
      (e.target as HTMLFormElement).reset();
    } catch (err) { setMsg((err as Error).message); setState("error"); }
  }
  const f = "mt-1 w-full rounded-lg border border-slate-300 bg-white p-3";
  return (
    <form onSubmit={submit} className="grid max-w-xl gap-4">
      <label>Name<input name="name" required className={f} autoComplete="name" /></label>
      <label>Email<input name="email" type="email" required className={f} autoComplete="email" /></label>
      <label>Phone<input name="phone" type="tel" className={f} autoComplete="tel" /></label>
      <label>Organization<input name="organization" className={f} autoComplete="organization" /></label>
      <label>What do you need help with?<select name="service" className={f}>{options.map((o) => <option key={o}>{o}</option>)}</select></label>
      <label>Message<textarea name="message" rows={4} required className={f} /></label>
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden /> {/* honeypot */}
      <button className="btn" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send Request"}</button>
      {state === "ok" && <p role="status" className="font-semibold text-teal">Request received. We will get back to you.</p>}
      {state === "error" && <p role="alert" className="font-semibold text-red-700">{msg}</p>}
    </form>
  );
}
