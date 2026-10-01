import { notFound } from "next/navigation";
import Page from "@/components/Page";
import { site, legalPages } from "@/lib/site";
// TEMPLATE TEXT: have a Nigerian lawyer review all of this before launch.
const c = `${site.contactPerson}, ${site.phone}${site.email ? ", " + site.email : ""}`;
const docs: Record<string, { title: string; body: string[] }> = {
  privacy: { title: "Privacy policy", body: [
    `${site.name} ("we") is based in ${site.locality}, ${site.region}, ${site.country}. This policy explains how we handle personal data, in line with the Nigeria Data Protection Act 2023.`,
    "What we collect: the details you submit through our contact form (name, email, phone, organization, service needed and message). We do not run advertising trackers.",
    "Why: to reply to your request and provide the service you ask about. We do not sell your data.",
    "How long: we keep enquiries only as long as needed to handle them and meet legal obligations.",
    "Your rights: you may ask to access, correct or delete your data, or object to its use, and you may complain to the Nigeria Data Protection Commission.",
    `Contact for privacy requests: ${c}.`] },
  terms: { title: "Terms of use", body: [
    `This website is operated by ${site.name}. By using it you accept these terms.`,
    "Content is provided for general information and learning. Services are agreed separately in writing and are not guaranteed by anything on this site.",
    "Our content, name and branding belong to Dynamis Technologies unless stated. Do not copy it without permission.",
    "Do not misuse the site, attempt to break its security, or submit unlawful content.",
    "We may update the site and these terms. Nigerian law governs these terms.",
    `Questions: ${c}.`] },
  cookies: { title: "Cookie policy", body: [
    "We use only essential browser storage: your cookie choice and your saved learning progress. This stays on your device.",
    "We do not currently use analytics or advertising cookies. If that changes, we will ask for your consent first and update this page.",
    "You can clear this data any time in your browser settings."] },
  accessibility: { title: "Accessibility statement", body: [
    "We aim to make this site usable by everyone, following WCAG 2.2 AA: semantic structure, keyboard navigation, visible focus, readable contrast and responsive layouts.",
    "Accessibility is checked as the site grows, and some content may not yet meet every guideline.",
    `If you hit a barrier, tell us and we will fix it or give you the information another way: ${c}.`] },
};
export function generateStaticParams() { return legalPages.map((slug) => ({ slug })); }
export default function Legal({ params }: { params: { slug: string } }) {
  const d = docs[params.slug];
  if (!d) notFound();
  return (<Page title={d.title} intro="Last updated: October 2026."><div className="max-w-prose space-y-4">{d.body.map((t) => <p key={t}>{t}</p>)}</div></Page>);
}
