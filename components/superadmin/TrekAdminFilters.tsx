"use client";

export type TrekAdminStatus = "all" | "published" | "draft";
export type TrekAdminFeatured = "all" | "featured" | "not-featured";

export interface TrekAdminFilterValues {
  search: string;
  status: TrekAdminStatus;
  featured: TrekAdminFeatured;
}

interface TrekAdminFiltersProps {
  values: TrekAdminFilterValues;
  onChange: (values: TrekAdminFilterValues) => void;
  onClear: () => void;
}

export function TrekAdminFilters({ values, onChange, onClear }: TrekAdminFiltersProps) {
  return <section aria-label="Filter treks" className="border-b border-foreground/15 py-5"><div className="grid gap-4 lg:grid-cols-[minmax(18rem,1fr)_12rem_12rem_auto] lg:items-end"><label className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/55">Search<input className="mt-2 min-h-11 w-full border-b border-foreground/30 bg-transparent px-0 text-sm normal-case tracking-normal text-foreground outline-none placeholder:text-foreground/45 focus:border-forest" onChange={(event) => onChange({ ...values, search: event.target.value })} placeholder="Search by name or location" type="search" value={values.search} /></label><label className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/55">Status<select className="mt-2 min-h-11 w-full border-b border-foreground/30 bg-transparent text-sm normal-case tracking-normal text-foreground outline-none focus:border-forest" onChange={(event) => onChange({ ...values, status: event.target.value as TrekAdminStatus })} value={values.status}><option value="all">All</option><option value="published">Published</option><option value="draft">Draft</option></select></label><label className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/55">Featured<select className="mt-2 min-h-11 w-full border-b border-foreground/30 bg-transparent text-sm normal-case tracking-normal text-foreground outline-none focus:border-forest" onChange={(event) => onChange({ ...values, featured: event.target.value as TrekAdminFeatured })} value={values.featured}><option value="all">All</option><option value="featured">Featured</option><option value="not-featured">Not featured</option></select></label><button className="min-h-11 text-left text-sm font-semibold text-teal underline decoration-teal/40 underline-offset-4 transition-colors hover:text-forest lg:text-right" onClick={onClear} type="button">Reset filters</button></div></section>;
}