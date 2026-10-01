import Link from "next/link";
import NetworkPattern from "@/components/NetworkPattern";
import { getServices, getPaths, getEvents, getTips } from "@/lib/content";
import { site } from "@/lib/site";
const W = "mx-auto max-w-6xl px-5";
const Eyebrow = ({ children }: { children: React.ReactNode }) => <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-teal">{children}</p>;
export default async function Home() {
  const [services, paths, events, tips] = await Promise.all([getServices(), getPaths(), getEvents(), getTips()]);
  const d3s = events.find((e) => e.status === "upcoming");
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <NetworkPattern className="absolute -right-10 top-0 h-full w-[640px] max-w-full text-white opacity-20" />
        <div className={`${W} relative py-20 md:py-28`}>
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-amber">Technology engineering and innovation · Nigeria</p>
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">Technology That Solves Problems.<br />Skills That Build People.</h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-200">Dynamis Technologies provides practical technology solutions while creating opportunities for people to learn, build, innovate, and grow with technology.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Link href="/services" className="btn-a">Explore Our Services</Link><Link href="/learn" className="btn-w">Start Learning</Link></div>
          <p className="mt-6 text-sm text-slate-300">Based in {site.locality}, {site.region}</p>
        </div>
      </section>
      <section className={`${W} grid gap-4 py-16 md:grid-cols-2`}>
        <div className="card"><Eyebrow>Pillar one</Eyebrow><h2 className="mb-2 text-2xl font-bold">Technology Solutions</h2><p className="mb-3 text-slate-600">Practical technology and technical work for individuals, businesses, schools and organizations.</p><Link href="/services" className="font-semibold text-teal">Explore Services →</Link></div>
        <div className="card"><Eyebrow>Pillar two</Eyebrow><h2 className="mb-2 text-2xl font-bold">Learning &amp; Community</h2><p className="mb-3 text-slate-600">Simple explanations, practical skills and a community of people who want to create with technology.</p><Link href="/learn" className="font-semibold text-teal">Learn With Us →</Link></div>
      </section>
      <section className="bg-white py-16"><div className={W}>
        <Eyebrow>What we do</Eyebrow><h2 className="mb-8 text-3xl font-bold">Technology solutions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{services.map((s) => (<Link key={s.slug} href="/services" className="card border-t-4 border-t-amber"><h3 className="mb-1 font-bold">{s.title}</h3><p className="text-sm text-slate-600">{s.items.slice(0, 3).join(" · ")}</p></Link>))}</div>
        <Link href="/contact" className="btn mt-8">Talk to Dynamis</Link>
      </div></section>
      <section className={`${W} py-16`}>
        <Eyebrow>How it works</Eyebrow><h2 className="mb-8 text-3xl font-bold">From problem to solution</h2>
        <ol className="grid gap-4 md:grid-cols-3">{["Tell us the problem", "We recommend and quote", "We deliver and explain"].map((t, i) => (<li key={t} className="card"><span className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-teal font-bold text-white">{i + 1}</span><h3 className="font-bold">{t}</h3></li>))}</ol>
      </section>
      <section className="bg-ink py-16 text-white"><div className={W}>
        <h2 className="mb-4 text-3xl font-bold">More than a technology company</h2>
        <blockquote className="my-6 border-l-4 border-amber pl-5 text-2xl font-bold">Our business helps us build solutions.<br />Our community helps us build people.</blockquote>
        <p className="max-w-2xl text-slate-200">We are not only building technology solutions. We are building technological capability in people.</p>
      </div></section>
      <section className={`${W} py-16`}>
        <Eyebrow>Dynamis Learn</Eyebrow><h2 className="mb-8 text-3xl font-bold">Learn technology step by step</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{paths.map((p) => (<Link key={p.slug} href="/learn" className="card"><h3 className="font-bold">{p.title}</h3><p className="text-sm text-slate-600">{p.summary}</p></Link>))}</div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {d3s && <div className="card"><Eyebrow>Every Saturday</Eyebrow><h3 className="text-xl font-bold">D3S: Dynamis Spark Saturday Session</h3><p className="mb-2 text-slate-600">Where Ideas Spark, Skills Grow &amp; Innovation Comes Alive.</p><p className="font-semibold">{d3s.code}: {d3s.title}</p><Link href="/d3s" className="btn mt-4">Attend D3S</Link></div>}
          {tips[0] && <div className="card"><Eyebrow>Latest Tech Tip</Eyebrow><h3 className="text-xl font-bold">#{String(tips[0].number).padStart(3, "0")}: {tips[0].title}</h3>{tips[0].next && <p className="text-slate-600">Next: {tips[0].next}</p>}<Link href="/learn" className="btn mt-4">Read Tech Tips</Link></div>}
        </div>
      </section>
      <section className="bg-teal py-16 text-white"><div className={`${W} text-center`}>
        <h2 className="mb-3 text-3xl font-bold">Have a technology challenge?</h2><p className="mb-6">Tell us what you are trying to solve.</p>
        <div className="flex flex-wrap justify-center gap-3"><a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-a">Chat on WhatsApp</a><Link href="/contact" className="btn-w">Send a request</Link></div>
      </div></section>
    </>
  );
}
