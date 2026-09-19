import Image from "next/image";
import Link from "next/link";
import type { TrekListing } from "@/data/treks";

export function TrekCard({ trek, index }: { trek: TrekListing; index: number }) {
  return (
    <article className="trek-listing-card group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-white/85 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="trek-listing-image">
        {trek.image ? (
          <Image
            alt=""
            className="object-cover transition duration-500 group-hover:scale-105"
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            src={trek.image}
          />
        ) : (
          <div aria-hidden="true" className={`trek-placeholder trek-placeholder-${(index % 4) + 1}`} />
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h2 className="text-xl font-semibold tracking-[-0.03em] text-forest-deep">{trek.name}</h2>
        {trek.summary ? <p className="mt-2 text-sm leading-6 text-foreground/70">{trek.summary}</p> : null}
        {trek.region ? <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-teal">{trek.region}</p> : null}
        <Link className="mt-5 inline-flex items-center gap-2 self-start text-sm font-semibold text-teal transition-colors hover:text-forest" href={`/treks/${trek.slug}`}>
          View Trek <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}
