"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/site";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
        <button aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-forest/30 text-forest" onClick={() => setOpen(!open)} type="button"><span aria-hidden="true" className="text-xl leading-none">{open ? "×" : "☰"}</span></button>
      {open ? <div className="absolute inset-x-4 top-20 rounded-2xl border border-border bg-surface-muted p-3 text-foreground shadow-lg">
        {siteConfig.navigation.map((item) => <Link className="block rounded-xl px-4 py-3 text-sm font-semibold hover:bg-surface" href={item.href} key={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
        <Link className="mt-2 block rounded-xl bg-sunrise px-4 py-3 text-center text-sm font-semibold text-white" href="/enquiry" onClick={() => setOpen(false)}>Send Enquiry</Link>
      </div> : null}
    </div>
  );
}