import { EnquiryForm } from "@/components/enquiry/EnquiryForm";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = { title: "Send an Enquiry" };

export default function EnquiryPage() {
  return <main className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-10"><SectionHeading eyebrow="Start a conversation" title="Tell us where you want to go." description="Share a few details and the TrekPhillic team can follow up by phone or WhatsApp. This form is an enquiry, not an instant booking." /><div className="rounded-3xl border border-border bg-surface p-6 shadow-sm sm:p-8"><EnquiryForm /></div></main>;
}