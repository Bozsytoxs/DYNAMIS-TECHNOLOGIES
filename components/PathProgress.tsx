"use client";
import { useEffect, useState } from "react";
import type { PathStep } from "@/lib/content";
// Progress is stored in the browser. Swap for a user-account API when auth exists.
export default function PathProgress({ slug, steps }: { slug: string; steps: PathStep[] }) {
  const key = `dynamis-path-${slug}`;
  const [done, setDone] = useState<number[]>([]);
  useEffect(() => { try { setDone(JSON.parse(localStorage.getItem(key) || "[]")); } catch {} }, [key]);
  const toggle = (i: number) => {
    const next = done.includes(i) ? done.filter((x) => x !== i) : [...done, i];
    setDone(next);
    try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
  };
  return (
    <div>
      <div className="my-3 h-2 rounded bg-slate-200" role="progressbar" aria-valuemin={0} aria-valuemax={steps.length} aria-valuenow={done.length} aria-label="Path progress"><div className="h-2 rounded bg-amber" style={{ width: `${(done.length / steps.length) * 100}%` }} /></div>
      <p className="mb-4 text-slate-600">{done.length} of {steps.length} steps done</p>
      <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((s, i) => (<li key={s.title}><label className="card flex cursor-pointer items-center gap-3 py-3"><input type="checkbox" checked={done.includes(i)} onChange={() => toggle(i)} /><span>{i + 1}. {s.title} <span className="text-sm text-slate-500">({s.stage})</span></span></label></li>))}
      </ol>
    </div>
  );
}
