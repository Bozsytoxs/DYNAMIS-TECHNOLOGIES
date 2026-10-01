"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { nav } from "@/lib/content";
export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-10 border-b border-slate-300 bg-paper">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2 font-extrabold tracking-wide"><Image src="/mark.png" alt="" width={36} height={36} priority />DYNAMIS TECHNOLOGIES</Link>
        <button className="rounded border px-3 py-2 lg:hidden" aria-expanded={open} aria-controls="nav" onClick={() => setOpen(!open)}>Menu</button>
        <nav id="nav" aria-label="Main" className={`${open ? "block" : "hidden"} absolute left-0 right-0 top-16 bg-paper p-5 lg:static lg:block lg:p-0`}>
          <ul className="flex flex-col gap-3 lg:flex-row lg:gap-5">
            {nav.map((n) => (<li key={n}><Link href={`/${n}`} onClick={() => setOpen(false)} className="font-semibold capitalize text-slate-600 hover:text-ink">{n === "d3s" ? "D3S" : n}</Link></li>))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
