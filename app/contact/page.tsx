import Page from "@/components/Page";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";
export const metadata = { title: "Contact" };
export default function Contact() {
  return (
    <Page title="Have a technology challenge?" intro="Tell us what you are trying to solve.">
      <div className="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <a className="card font-semibold" href={site.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp<br /><span className="font-normal text-slate-600">{site.phone}</span></a>
        <a className="card font-semibold" href={`tel:${site.phoneIntl}`}>Phone<br /><span className="font-normal text-slate-600">{site.phone}</span></a>
        {site.email && <a className="card font-semibold" href={`mailto:${site.email}`}>Email<br /><span className="font-normal text-slate-600">{site.email}</span></a>}
        <div className="card"><b>Location</b><br /><span className="text-slate-600">{site.locality}, {site.region}, {site.country}</span><br /><span className="text-slate-600">Contact: {site.contactPerson}</span></div>
      </div>
      <ContactForm />
    </Page>
  );
}
