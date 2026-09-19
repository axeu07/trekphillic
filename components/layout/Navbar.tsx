"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  const [hasScrolledPastHero, setHasScrolledPastHero] = useState(false);
  const pathname = usePathname();
  const showHomeControl = hasScrolledPastHero || pathname !== "/";

  useEffect(() => {
    const updateScrollState = () => setHasScrolledPastHero(window.scrollY > 24);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  return <header className="sticky top-0 z-20 border-b border-border bg-surface-muted">
    <nav aria-label="Main navigation" className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 lg:px-10">
      <div className="flex items-center gap-3"><Link aria-label="TrekPhillic home" className="inline-flex items-center gap-3" href="/">
        <Image alt="TrekPhillic mountain mark" className="h-12 w-auto object-contain md:h-14" height={200} priority src="/images/logo/trekhillic_logo (2).png" width={200} />
        <span className="font-poppins text-xl font-semibold tracking-[-0.04em] md:text-2xl"><span className="text-forest">Trek</span><span className="text-forest-deep">Phillic</span></span>
      </Link>{showHomeControl ? <Link aria-label="Back to home" className="inline-flex size-9 items-center justify-center rounded-full border border-forest/25 text-forest transition-colors hover:border-forest hover:bg-white" href="/#hero" title="Back to home"><svg aria-hidden="true" fill="none" height="17" viewBox="0 0 24 24" width="17"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></svg></Link> : null}</div><div className="hidden items-center gap-7 md:flex">{siteConfig.navigation.map((item) => <Link className="text-sm font-medium text-foreground/75 transition-colors hover:text-forest" href={item.href} key={item.href}>{item.label}</Link>)}<Link className="rounded-full bg-sunrise px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#c47b3f]" href="/enquiry">Send Enquiry</Link></div>
      <MobileMenu />
    </nav>
  </header>;
}