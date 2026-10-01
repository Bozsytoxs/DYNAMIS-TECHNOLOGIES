export default function Page({ title, intro, children }: { title: string; intro?: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16">
      <h1 className="mb-3 text-4xl font-extrabold tracking-tight">{title}</h1>
      {intro && <p className="mb-8 max-w-prose text-lg text-slate-600">{intro}</p>}
      {children}
    </section>
  );
}
export const Empty = ({ children }: { children: React.ReactNode }) => (<div className="rounded-xl border border-dashed border-slate-400 p-5 text-slate-600">{children}</div>);
