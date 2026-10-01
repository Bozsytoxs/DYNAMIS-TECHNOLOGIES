import Page, { Empty } from "@/components/Page";
import { getProjects } from "@/lib/content";
export const metadata = { title: "Projects" };
export default async function Projects() {
  const projects = await getProjects();
  return (
    <Page title="Projects" intro="Every project is labelled honestly: Client, Demo, Experiment or Community.">
      {projects.length === 0 ? <Empty>No projects published yet.</Empty> : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{projects.map((p) => (<article key={p.slug} className="card">{p.image && <img src={p.image} alt={p.title} loading="lazy" className="mb-3 aspect-video w-full rounded-lg object-cover" />}<span className="text-sm font-semibold">{p.kind === "Client" ? "Client project" : p.kind === "Demo" ? "Demo Project" : p.kind}</span><h2 className="font-bold">{p.title}</h2><p className="text-slate-600"><b>Problem:</b> {p.problem}</p><p className="text-slate-600"><b>Solution:</b> {p.solution}</p><p className="text-sm">{p.tech.join(", ")} · {p.status} · {p.date}</p></article>))}</div>
      )}
    </Page>
  );
}
