"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
// No analytics or tracking is loaded. If you add any later, load it only when consent === "accepted".
export default function CookieNotice() {
  const [show, setShow] = useState(false);
  useEffect(() => { try { setShow(!localStorage.getItem("dynamis-consent")); } catch { setShow(true); } }, []);
  const set = (v: string) => { try { localStorage.setItem("dynamis-consent", v); } catch {} setShow(false); };
  if (!show) return null;
  return (
    <div role="dialog" aria-label="Cookie notice" className="fixed inset-x-3 bottom-3 z-20 mx-auto max-w-xl rounded-xl border border-slate-300 bg-white p-4 shadow-lg">
      <p className="text-sm">This site uses only essential storage (for example, your learning progress). Read our <Link href="/legal/cookies" className="underline">cookie policy</Link>.</p>
      <div className="mt-3 flex gap-2"><button className="btn !px-4 !py-2" onClick={() => set("accepted")}>Accept</button><button className="btn-o !px-4 !py-2" onClick={() => set("essential")}>Essential only</button></div>
    </div>
  );
}
