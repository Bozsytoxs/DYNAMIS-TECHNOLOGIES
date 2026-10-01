import { site } from "@/lib/site";
export default function WhatsAppButton() {
  return <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Chat with Dynamis on WhatsApp" className="fixed bottom-4 right-4 z-10 rounded-full bg-[#25D366] px-5 py-3 font-semibold text-white shadow-lg">WhatsApp us</a>;
}
