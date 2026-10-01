import Page from "@/components/Page";
export const metadata = { title: "About" };
export default function About() {
  return (
    <Page title="About Dynamis" intro="Dynamis Technologies is a Nigerian technology engineering and innovation company focused on practical technology solutions, technical education, and community development.">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="card"><h2 className="font-bold">Our mission</h2><p>To use technology to solve practical problems while developing people with the knowledge and skills to build the future.</p></div>
        <div className="card"><h2 className="font-bold">Our vision</h2><p>To grow into a trusted technology engineering and innovation platform serving individuals, businesses, organizations, and communities across Nigeria and beyond.</p></div>
      </div>
      <p className="mt-8 text-slate-600">We are being built around capability, learning, innovation, reliability, security, service and continuous improvement.</p>
    </Page>
  );
}
