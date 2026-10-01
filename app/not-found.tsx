import Link from "next/link";
import Page from "@/components/Page";
export default function NotFound() { return (<Page title="Page not found" intro="That page does not exist or has moved."><Link href="/" className="btn">Back home</Link></Page>); }
