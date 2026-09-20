"use client";

import { useState } from "react";
import type { Trek } from "@/types/trek";
import { FeaturedTrek } from "@/components/treks/FeaturedTrek";
import { TrekFilters, type TrekFilterValues } from "@/components/treks/TrekFilters";
import { TrekGrid } from "@/components/treks/TrekGrid";

const initialFilters: TrekFilterValues = { search: "", location: "all", difficulty: "all", duration: "all" };

function durationInDays(duration: string) {
  return Number.parseInt(duration, 10);
}

export function TrekCatalogue({ treks }: { treks: Trek[] }) {
  const [filters, setFilters] = useState(initialFilters);
  const publishedTreks = treks.filter((trek) => trek.published);
  const featuredTrek = publishedTreks.find((trek) => trek.featured) ?? publishedTreks[0];
  const normalizedSearch = filters.search.trim().toLowerCase();
  const filteredTreks = publishedTreks.filter((trek) => {
    const searchable = `${trek.name} ${trek.shortDescription} ${trek.location} ${trek.state} ${trek.tags.join(" ")}`.toLowerCase();
    const days = durationInDays(trek.duration);
    return (!normalizedSearch || searchable.includes(normalizedSearch)) && (filters.location === "all" || trek.location === filters.location) && (filters.difficulty === "all" || trek.difficulty === filters.difficulty) && (filters.duration === "all" || (filters.duration === "short" ? days <= 3 : days >= 4));
  });

  return (
    <>
      {featuredTrek ? <FeaturedTrek trek={featuredTrek} /> : null}
      <div className="mt-16"><TrekFilters locations={[...new Set(publishedTreks.map((trek) => trek.location))]} onChange={setFilters} onClear={() => setFilters(initialFilters)} values={filters} /><div className="mt-8 flex items-baseline justify-between gap-4"><h2 className="font-[family-name:var(--font-poppins)] text-2xl font-semibold tracking-[-0.05em] text-forest-deep">All trails</h2><p aria-live="polite" className="text-xs uppercase tracking-[0.14em] text-foreground/55">{filteredTreks.length} {filteredTreks.length === 1 ? "trail" : "trails"}</p></div><div className="mt-7"><TrekGrid treks={filteredTreks} /></div></div>
    </>
  );
}
