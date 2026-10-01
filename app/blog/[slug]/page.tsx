import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Page from "@/components/Page";
import { getPosts } from "@/lib/content";
import { site } from "@/lib/site";
type P = { params: { slug: string } };
export async function generateStaticParams() { return (await getPosts()).map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: P): Promise<Metadata> {
  const p = (await getPosts()).find((x) => x.slug === params.slug);
  if (!p) return {};
  return { title: p.title, description: p.summary, openGraph: { title: p.title, description: p.summary, type: "article", images: [p.image || "/og.png"] } };
}
// Article text: blank line = new paragraph, "## " = heading, ![alt](/uploads/file.jpg) = image.
function Body({ text }: { text: string }) {
  return <>{text.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean).map((b, i) => {
    const im = /^!\[(.*)\]\((\/uploads\/[\w.-]+)\)$/.exec(b);
    if (im) return <img key={i} src={im[2]} alt={im[1]} loading="lazy" className="my-6 w-full rounded-lg" />;
    if (b.startsWith("## ")) return <h2 key={i} className="mt-8 text-2xl font-bold">{b.slice(3)}</h2>;
    return <p key={i} className="my-4 whitespace-pre-line">{b}</p>;
  })}</>;
}
export default async function Post({ params }: P) {
  const all = await getPosts();
  const p = all.find((x) => x.slug === params.slug);
  if (!p) notFound();
  const url = `${site.url}/blog/${p.slug}`, q = encodeURIComponent;
  const related = all.filter((x) => x.slug !== p.slug && x.category === p.category).slice(0, 3);
  const ld = { "@context": "https://schema.org", "@type": "Article", headline: p.title, author: { "@type": "Person", name: p.author }, datePublished: p.date, ...(p.image && { image: `${site.url}${p.image}` }), publisher: { "@type": "Organization", name: site.name } };
  return (
    <Page title={p.title}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <article className="max-w-prose">
        <p className="mb-4 text-slate-600">{p.category} · {p.author} · {p.date} · {p.readMins} min read</p>
        {p.image && <img src={p.image} alt={p.imageAlt || ""} className="mb-6 w-full rounded-lg" />}
        <Body text={p.body} />
        <p className="mt-8 font-semibold">Share:{" "}
          <a className="underline" href={`https://wa.me/?text=${q(p.title + " " + url)}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>{" · "}
          <a className="underline" href={`https://www.facebook.com/sharer/sharer.php?u=${q(url)}`} target="_blank" rel="noopener noreferrer">Facebook</a>{" · "}
          <a className="underline" href={`https://twitter.com/intent/tweet?url=${q(url)}&text=${q(p.title)}`} target="_blank" rel="noopener noreferrer">X</a></p>
      </article>
      {related.length > 0 && <><h2 className="mb-3 mt-12 text-2xl font-bold">Related articles</h2><ul className="grid gap-2">{related.map((r) => <li key={r.slug}><Link className="underline" href={`/blog/${r.slug}`}>{r.title}</Link></li>)}</ul></>}
    </Page>
  );
}
