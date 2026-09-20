import { TrekCard } from "@/components/treks/TrekCard";
import type { Trek } from "@/types/trek";

export function TrekGrid({ treks }: { treks: Trek[] }) {
  if (!treks.length) return <div className="border border-dashed border-teal/50 px-6 py-16 text-center"><p className="font-semibold text-forest-deep">No trails found.</p><p className="mt-2 text-sm text-foreground/65">Try widening your search or clearing a filter.</p></div>;
  return <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">{treks.map((trek) => <TrekCard key={trek.id} trek={trek} />)}</div>;
}