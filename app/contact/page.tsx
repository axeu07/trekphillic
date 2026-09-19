import Link from "next/link";
import { RouteIntro } from "@/components/ui/RouteIntro";

export const metadata = { title: "Contact" };

export default function ContactPage() {
  return <div><RouteIntro title="Let's talk about the journey" description="Contact details will be added when supplied by the TrekPhillic team." /><div className="mx-auto w-full max-w-6xl px-6 pb-20 lg:px-10"><Link className="text-sm font-semibold text-teal underline underline-offset-4" href="/enquiry">Send an enquiry</Link></div></div>;
}