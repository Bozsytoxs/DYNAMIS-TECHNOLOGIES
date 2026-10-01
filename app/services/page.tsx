import Link from "next/link";
import Page from "@/components/Page";
import { getServices } from "@/lib/content";
export const metadata = { title: "Services" };
export default async function Services() {
  const services = await getServices();
  return (
    <Page title="Services" intro="What we can set up, build and fix.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{services.map((s) => (<div key={s.slug} className="card"><h2 className="font-bold">{s.title}</h2><ul className="mt-2 list-disc pl-5 text-slate-600">{s.items.map((i) => <li key={i}>{i}</li>)}</ul></div>))}</div>
      <h2 className="mt-10 text-2xl font-bold">Need a technology or technical solution?</h2>
      <Link href="/contact" className="btn mt-3">Talk to Dynamis</Link>
    </Page>
  );
}
