import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return <footer className="border-t border-border bg-forest-deep text-white"><div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 py-10 sm:flex-row sm:items-end sm:justify-between lg:px-10"><div><Link className="text-xl font-bold tracking-[-0.04em]" href="/">{siteConfig.name}</Link><p className="mt-2 text-sm text-white/65">{siteConfig.tagline}</p></div><Link className="text-sm font-semibold text-white/85 hover:text-white" href="/contact">Talk to us</Link></div></footer>;
}