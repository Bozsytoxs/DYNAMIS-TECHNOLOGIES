import Link from "next/link";
import { getServices, getPaths, getEvents, getTips } from "@/lib/content";
export default async function Home() {
  const [services, paths, events, tips] = await Promise.all([getServices(), getPaths(), getEvents(), getTips()]);
  const d3s = events.find((e) => e.status === "upcoming");
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pt-20">
        <h1 className="text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">Technology That Solves Problems.<br />Skills That Build People.</h1>
        <p className="mt-6 max-w-prose text-xl text-slate-600">Dynamis Technologies provides practical technology solutions while creating opportunities for people to learn, build, innovate, and grow with technology.</p>
        <div className="mt-8 flex flex-wrap gap-3"><Link href="/services" className="btn">Explore Our Services</Link><Link href="/learn" className="btn-o">Start Learning</Link></div>
      </section>
      <section className="mx-auto max-w-6xl px-5 pt-20">
        <h2 className="text-3xl font-bold">More than a technology company</h2>
        <blockquote className="my-6 border-l-4 border-amber pl-5 text-2xl font-bold">Our business helps us build solutions.<br />Our community helps us build people.</blockquote>
        <p className="max-w-prose text-slate-600">We are not only building technology solutions. We are building technological capability in people.</p>
      </section>
      <section className="mx-auto max-w-6xl px-5 pt-20">
        <h2 className="mb-6 text-3xl font-bold">Technology solutions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{services.map((s) => (<div key={s.slug} className="card"><h3 className="font-bold">{s.title}</h3><p className="text-sm text-slate-600">{s.items.slice(0, 3).join(", ")}</p></div>))}</div>
        <Link href="/contact" className="btn mt-6">Talk to Dynamis</Link>
      </section>
      <section className="mx-auto max-w-6xl px-5 pt-20">
        <h2 className="mb-6 text-3xl font-bold">Dynamis Learn</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{paths.map((p) => (<div key={p.slug} className="card"><h3 className="font-bold">{p.title}</h3><p className="text-sm text-slate-600">{p.summary}</p></div>))}</div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-4 px-5 pt-20 md:grid-cols-2">
        {d3s && <div className="card"><h2 className="text-2xl font-bold">D3S</h2><p className="mb-2 text-slate-600">Where Ideas Spark, Skills Grow &amp; Innovation Comes Alive.</p><p className="font-semibold">{d3s.code}: {d3s.title}</p><Link href="/d3s" className="btn mt-4">Attend D3S</Link></div>}
        <div className="card"><h2 className="text-2xl font-bold">Latest Tech Tip</h2><p className="font-semibold">Tech Tip #{String(tips[0].number).padStart(3, "0")}: {tips[0].title}</p><p className="text-slate-600">Next: {tips[0].next}</p><Link href="/learn" className="btn mt-4">Read Tech Tips</Link></div>
      </section>
    </>
  );
}
