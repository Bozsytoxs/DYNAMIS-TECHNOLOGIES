import Page from "@/components/Page";
import PathProgress from "@/components/PathProgress";
import { getPaths, getTips } from "@/lib/content";
export const metadata = { title: "Learn" };
export default async function Learn() {
  const [paths, tips] = await Promise.all([getPaths(), getTips()]);
  return (
    <Page title="Dynamis Learn" intro="Technology explained simply, taught in order: Foundation, Beginner, Intermediate, Advanced, Practical Project.">
      {paths.map((p) => (
        <section key={p.slug} className="mb-10"><h2 className="text-2xl font-bold">{p.title}</h2><p className="mb-3 text-slate-600">{p.summary}</p>
          {p.steps.length > 0 && <PathProgress slug={p.slug} steps={p.steps} />}</section>
      ))}
      <h2 className="text-2xl font-bold">Dynamis Tech Tip</h2>
      {tips.map((t) => (<div key={t.number} className="card mt-3"><p className="text-sm font-semibold">Tech Tip #{String(t.number).padStart(3, "0")}</p><h3 className="font-bold">{t.title}</h3><p className="text-slate-600">{t.summary}</p>{t.next && <p className="mt-2 font-semibold">Next: {t.next}</p>}</div>))}
    </Page>
  );
}
