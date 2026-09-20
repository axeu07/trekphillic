"use client";

import { useState } from "react";
import { TrekAdminCard } from "@/components/superadmin/TrekAdminCard";
import { TrekAdminFilters, type TrekAdminFilterValues } from "@/components/superadmin/TrekAdminFilters";
import type { Trek } from "@/types/trek";

const initialFilters: TrekAdminFilterValues = { search: "", status: "all", featured: "all" };

export function TrekAdminList({ treks }: { treks: Trek[] }) {
  const [filters, setFilters] = useState(initialFilters);
  const normalizedSearch = filters.search.trim().toLowerCase();
  const filteredTreks = treks.filter((trek) => {
    const matchesSearch = !normalizedSearch || `${trek.name} ${trek.location}`.toLowerCase().includes(normalizedSearch);
    const matchesStatus = filters.status === "all" || (filters.status === "published" ? trek.published : !trek.published);
    const matchesFeatured = filters.featured === "all" || (filters.featured === "featured" ? trek.featured : !trek.featured);
    return matchesSearch && matchesStatus && matchesFeatured;
  });

  return <><TrekAdminFilters onChange={setFilters} onClear={() => setFilters(initialFilters)} values={filters} /><div className="mt-3 flex items-baseline justify-between gap-4"><p className="text-xs font-semibold uppercase tracking-[0.15em] text-foreground/50">{filteredTreks.length} {filteredTreks.length === 1 ? "journey" : "journeys"}</p><p className="text-xs text-foreground/45">{treks.length} total records</p></div><div aria-live="polite" className="mt-2">{filteredTreks.length ? filteredTreks.map((trek) => <TrekAdminCard key={trek.id} trek={trek} />) : <div className="border border-dashed border-teal/40 px-6 py-16 text-center"><p className="font-semibold text-forest-deep">No journeys found</p><button className="mt-4 text-sm font-semibold text-teal underline underline-offset-4" onClick={() => setFilters(initialFilters)} type="button">Reset filters</button></div>}</div></>;
}