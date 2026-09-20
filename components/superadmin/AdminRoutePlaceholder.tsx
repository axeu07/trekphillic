import Link from "next/link";

export function AdminRoutePlaceholder({ title, description }: { title: string; description: string }) {
  return <main className="mx-auto w-full max-w-5xl px-6 py-16 lg:px-10 lg:py-24"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">SuperAdmin / Treks</p><h1 className="mt-4 font-[family-name:var(--font-poppins)] text-4xl font-semibold tracking-[-0.06em] text-forest-deep">{title}</h1><p className="mt-4 max-w-xl text-sm leading-6 text-foreground/65">{description}</p><Link className="mt-8 inline-flex min-h-11 items-center border border-border px-4 text-sm font-semibold text-forest transition-colors hover:border-forest" href="/superadmin/treks">Back to treks</Link></main>;
}