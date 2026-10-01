"use client";
export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  return (<section className="mx-auto max-w-6xl px-5 pt-16"><h1 className="mb-3 text-4xl font-extrabold">Something went wrong</h1><p className="mb-6 text-slate-600">Please try again. If it keeps happening, contact us.</p><button className="btn" onClick={reset}>Try again</button></section>);
}
