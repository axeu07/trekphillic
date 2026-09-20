import type { Trek } from "@/types/trek";

export function TrekIntelligence({ trek }: { trek: Trek }) {
  const details = [["Altitude", trek.altitude], ["Distance", trek.distance], ["Duration", trek.duration], ["Difficulty", trek.difficulty], ["Best season", trek.bestSeason]];
  return <section aria-label="Trek intelligence" className="border-b border-foreground/15 bg-surface"><div className="mx-auto grid max-w-7xl gap-0 px-6 sm:grid-cols-2 lg:grid-cols-5 lg:px-10">{details.map(([label, value]) => <div className="border-l border-foreground/15 py-6 pl-4 first:border-l-0 sm:pl-6 lg:py-8" key={label}><p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-foreground/55">{label}</p><p className="mt-2 text-lg font-semibold capitalize tracking-[-0.03em] text-forest-deep">{value}</p></div>)}</div></section>;
}