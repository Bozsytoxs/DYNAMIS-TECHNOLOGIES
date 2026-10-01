import Link from "next/link";
import Page from "@/components/Page";
import { site } from "@/lib/site";
export const metadata = { title: "Community" };
export default function Community() {
  return (
    <Page title="The Dynamis Community" intro="Learn. Connect. Build. Innovate. People interested in technology, engineering, innovation, learning and problem solving.">
      <ul className="mb-6 list-disc pl-5 text-slate-600"><li>Upcoming events</li><li>Community challenges</li><li>Learning opportunities</li><li>Announcements</li><li>Member projects</li></ul>
      <div className="flex flex-wrap gap-3">
        <a href={site.whatsappCommunity} target="_blank" rel="noopener noreferrer" className="btn">Join the WhatsApp Community</a>
        <Link href="/d3s" className="btn-o">Attend D3S</Link>
      </div>
    </Page>
  );
}
