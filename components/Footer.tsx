import Link from "next/link";
import Image from "next/image";
import { nav } from "@/lib/content";
import { site, legalPages } from "@/lib/site";
export default function Footer() {
  return (
    <footer className="border-t-4 border-t-amber bg-white px-5 py-12">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
        <div><Image src="/logo.png" alt="Dynamis Technologies" width={200} height={133} className="mb-2 h-auto w-48" /><p className="text-slate-600">{site.tagline}</p>
          <address className="mt-3 not-italic text-slate-600">{site.contactPerson}<br />{site.locality}, {site.region}, {site.country}<br /><a href={`tel:${site.phoneIntl}`}>{site.phone}</a>{site.email && <><br /><a href={`mailto:${site.email}`}>{site.email}</a></>}</address></div>
        <nav aria-label="Footer"><ul className="grid gap-1"><li><Link href="/">Home</Link></li>{nav.map((n) => (<li key={n}><Link href={`/${n}`} className="capitalize">{n}</Link></li>))}</ul></nav>
        <nav aria-label="Legal"><ul className="grid gap-1">{legalPages.map((l) => (<li key={l}><Link href={`/legal/${l}`} className="capitalize">{l === "terms" ? "Terms of use" : l === "privacy" ? "Privacy policy" : l === "cookies" ? "Cookie policy" : "Accessibility"}</Link></li>))}</ul>
          <p className="mt-3 text-sm text-slate-600">Find us on social media: {site.socialName}</p>
          {Object.entries(site.social).length > 0 && <ul className="mt-3 flex gap-3">{Object.entries(site.social).map(([k, v]) => (<li key={k}><a href={v} rel="noopener noreferrer" target="_blank">{k}</a></li>))}</ul>}</nav>
      </div>
      <p className="mx-auto mt-8 max-w-6xl text-sm text-slate-600">© 2026 Dynamis Technologies. All rights reserved.{site.cacNumber && ` Registered in Nigeria: ${site.cacNumber}.`}</p>
    </footer>
  );
}
