import Link from "next/link";
import Page, { Empty } from "@/components/Page";
import { getEvents } from "@/lib/content";
export const metadata = { title: "D3S: Dynamis Spark Saturday Session" };
export default async function D3S() {
  const events = await getEvents();
  const up = events.filter((e) => e.status === "upcoming"), past = events.filter((e) => e.status === "past");
  return (
    <Page title="D3S: Dynamis Spark Saturday Session" intro="Where Ideas Spark, Skills Grow & Innovation Comes Alive. Our weekly technology learning and community session.">
      <h2 className="mb-3 text-2xl font-bold">Upcoming</h2>
      {up.map((e) => (<div key={e.code} className="card max-w-2xl"><h3 className="font-bold">{e.code}: {e.title}</h3><ul className="mt-2 text-slate-600"><li>Date and time: {e.date ?? "to be announced"}</li><li>Speaker: {e.speaker ?? "to be announced"}</li><li>Who should attend: {e.audience ?? "to be added"}</li></ul><Link href="/contact" className="btn mt-4">Attend D3S</Link></div>))}
      <h2 className="mb-3 mt-10 text-2xl font-bold">Previous sessions</h2>
      {past.length ? past.map((e) => <div key={e.code} className="card">{e.code}: {e.title}</div>) : <Empty>Recordings and resources will appear here after the first session.</Empty>}
    </Page>
  );
}
