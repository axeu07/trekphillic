"use client";

import { useState } from "react";
import { TrekCard } from "@/components/treks/TrekCard";
import { type TrekCategory, type TrekListing } from "@/data/treks";

const filterOptions: Array<{ label: string; value: "all" | TrekCategory }> = [
  { label: "All", value: "all" },
  { label: "Weekend", value: "weekend" },
  { label: "Valley", value: "valley" },
  { label: "Winter", value: "winter" },
  { label: "High Altitude", value: "high-altitude" },
];

export function TrekCatalogue({ treks }: { treks: TrekListing[] }) {
  const [activeCategory, setActiveCategory] = useState<"all" | TrekCategory>("all");
  const [search, setSearch] = useState("");
  const normalizedSearch = search.trim().toLowerCase();
  const filteredTreks = treks.filter((trek) => {
    const matchesCategory = activeCategory === "all" || trek.category === activeCategory;
    const matchesSearch = !normalizedSearch || `${trek.name} ${trek.region ?? ""} ${trek.summary ?? ""}`.toLowerCase().includes(normalizedSearch);
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <section aria-label="Discover treks" className="trek-discovery-panel rounded-3xl border border-white/70 bg-white/65 p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter treks by type">
            {filterOptions.map((option) => (
              <button
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${activeCategory === option.value ? "border-forest bg-forest text-white" : "border-border bg-white/60 text-foreground/75 hover:border-teal hover:text-forest"}`}
                key={option.value}
                onClick={() => setActiveCategory(option.value)}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>
          <label className="flex min-h-11 items-center rounded-xl border border-border bg-white/70 px-3 text-sm text-foreground/60 lg:w-72" htmlFor="trek-search">
            <span aria-hidden="true" className="mr-2 text-teal">⌕</span>
            <span className="sr-only">Search treks</span>
            <input className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-foreground/50" id="trek-search" onChange={(event) => setSearch(event.target.value)} placeholder="Search treks..." type="search" value={search} />
          </label>
        </div>
      </section>
      <div aria-live="polite" className="mt-8">
        {filteredTreks.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTreks.map((trek, index) => <TrekCard index={index} key={trek.slug} trek={trek} />)}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-teal/40 bg-white/55 p-10 text-center">
            <p className="font-semibold text-forest-deep">No treks match that search.</p>
            <p className="mt-2 text-sm text-foreground/65">Try another name or choose a different filter.</p>
          </div>
        )}
      </div>
    </>
  );
}
