"use client";

import type { TrekDifficulty } from "@/types/trek";

export interface TrekFilterValues { search: string; location: string; difficulty: "all" | TrekDifficulty; duration: "all" | "short" | "long"; }
interface TrekFiltersProps { values: TrekFilterValues; locations: string[]; onChange: (values: TrekFilterValues) => void; onClear: () => void; }

export function TrekFilters({ values, locations, onChange, onClear }: TrekFiltersProps) {
  return <section aria-label="Filter treks" className="border-y border-foreground/15 py-5"><div className="grid gap-3 lg:grid-cols-[minmax(15rem,1.5fr)_1fr_1fr_1fr_auto] lg:items-end">
    <label className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/60">Search<input className="mt-2 min-h-11 w-full border-b border-foreground/35 bg-transparent px-0 text-base normal-case tracking-normal outline-none placeholder:text-foreground/45 focus:border-forest" onChange={(event) => onChange({ ...values, search: event.target.value })} placeholder="Find a trail" type="search" value={values.search} /></label>
    <label className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/60">Region<select className="mt-2 min-h-11 w-full border-b border-foreground/35 bg-transparent text-sm tracking-normal outline-none focus:border-forest" onChange={(event) => onChange({ ...values, location: event.target.value })} value={values.location}><option value="all">All regions</option>{locations.map((location) => <option key={location} value={location}>{location}</option>)}</select></label>
    <label className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/60">Difficulty<select className="mt-2 min-h-11 w-full border-b border-foreground/35 bg-transparent text-sm tracking-normal outline-none focus:border-forest" onChange={(event) => onChange({ ...values, difficulty: event.target.value as TrekFilterValues["difficulty"] })} value={values.difficulty}><option value="all">Any level</option><option value="easy">Easy</option><option value="moderate">Moderate</option><option value="challenging">Challenging</option></select></label>
    <label className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/60">Duration<select className="mt-2 min-h-11 w-full border-b border-foreground/35 bg-transparent text-sm tracking-normal outline-none focus:border-forest" onChange={(event) => onChange({ ...values, duration: event.target.value as TrekFilterValues["duration"] })} value={values.duration}><option value="all">Any length</option><option value="short">1-3 days</option><option value="long">4+ days</option></select></label>
    <button className="min-h-11 px-1 text-left text-sm font-semibold text-teal underline decoration-teal/40 underline-offset-4 transition-colors hover:text-forest lg:text-right" onClick={onClear} type="button">Clear filters</button>
  </div></section>;
}