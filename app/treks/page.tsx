import { TrekCatalogue } from "@/components/treks/TrekCatalogue";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { treks } from "@/data/treks";

export const metadata = { title: "Treks" };

export default function TreksPage() {
  return <main className="trek-listing-page"><div className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20"><div className="max-w-2xl"><SectionHeading eyebrow="TREKPHILLIC TREKS" title="Find Your Trail" description="Explore Himalayan treks from peaceful valley walks to high-altitude adventures." /></div><div className="mt-10"><TrekCatalogue treks={treks} /></div><section className="mt-16 flex flex-col justify-between gap-6 rounded-3xl bg-forest px-6 py-8 text-white sm:flex-row sm:items-center sm:px-8"><div><h2 className="text-2xl font-semibold tracking-[-0.03em]">Not sure which trek is right for you?</h2><p className="mt-2 max-w-xl text-sm leading-6 text-white/75">Tell us your dates, group size and what kind of experience you&apos;re looking for.</p></div><a className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-black transition-colors hover:bg-sage" href="/enquiry">Plan My Trek <span aria-hidden="true" className="ml-2">→</span></a></section></div></main>;
}