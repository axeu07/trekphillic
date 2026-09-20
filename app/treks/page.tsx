import { TrekCatalogue } from "@/components/treks/TrekCatalogue";
import { getPublishedTreks } from "@/lib/treks/repository";

export const metadata = { title: "Treks" };

export default async function TreksPage() {
  const treks = await getPublishedTreks();
  return <main className="trek-listing-page"><div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24"><header className="grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end"><div><p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">Explore the Himalayas</p><h1 className="mt-5 max-w-3xl font-[family-name:var(--font-poppins)] text-5xl font-semibold leading-[0.98] tracking-[-0.06em] text-forest-deep sm:text-7xl">Find a trail that stays with you.</h1></div><div className="lg:pb-1"><p className="max-w-md text-base leading-7 text-foreground/70">A considered collection of Himalayan walks, high passes, and quiet seasonal escapes.</p><p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-foreground/55"><span className="text-2xl tracking-[-0.04em] text-forest-deep">{treks.length}</span> published trails</p></div></header><div className="mt-16"><TrekCatalogue treks={treks} /></div></div></main>;
}