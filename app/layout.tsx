import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieNotice from "@/components/CookieNotice";
import WhatsAppButton from "@/components/WhatsAppButton";
import { site } from "@/lib/site";
const url = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const description = "Practical technology solutions and technology learning from a Nigerian engineering and innovation company.";
export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: { default: "Dynamis Technologies | Power. Capability. Innovation.", template: "%s | Dynamis Technologies" },
  description,
  openGraph: { title: "Dynamis Technologies", description, type: "website", siteName: "Dynamis Technologies", images: [{ url: "/og.png", width: 1200, height: 630, alt: "Dynamis Technologies" }] },
  twitter: { card: "summary_large_image", title: "Dynamis Technologies", description, images: ["/og.png"] },
};
export const viewport = { colorScheme: "light", themeColor: "#0b1f4a" }; // stops browsers forcing dark mode
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ld = { "@context": "https://schema.org", "@type": "Organization", name: "Dynamis Technologies", slogan: site.tagline, url, logo: `${url}/logo.png`, sameAs: Object.values(site.social), telephone: site.phoneIntl, ...(site.email && { email: site.email }), address: { "@type": "PostalAddress", addressLocality: site.locality, addressRegion: site.region, addressCountry: "NG" } };
  return (
    <html lang="en"><body>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-30 focus:bg-white focus:p-3">Skip to content</a>
      <Header /><main id="main">{children}</main><Footer /><WhatsAppButton /><CookieNotice />
    </body></html>
  );
}
