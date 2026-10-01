import Link from "next/link";
import Page, { Empty } from "@/components/Page";
import { getPosts } from "@/lib/content";
export const metadata = { title: "Blog & Insights" };
export default async function Blog() {
  const posts = [...(await getPosts())].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <Page title="Blog & Insights" intro="Technology, networking, cybersecurity, AI, engineering, IoT, business technology, technology in Nigeria and tutorials.">
      {posts.length === 0 ? <Empty>The first articles are being written.</Empty> : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="card block overflow-hidden !p-0">
            {p.image && <img src={p.image} alt={p.imageAlt || ""} loading="lazy" className="aspect-video w-full object-cover" />}
            <div className="p-5"><p className="text-sm text-slate-600">{p.category} · {p.date} · {p.readMins} min read</p><h2 className="font-bold">{p.title}</h2>{p.summary && <p className="text-slate-600">{p.summary}</p>}</div>
          </Link>))}</div>)}
    </Page>
  );
}
