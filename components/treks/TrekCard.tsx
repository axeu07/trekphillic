import Image from "next/image";
import Link from "next/link";
import type { Trek } from "@/types/trek";

export function TrekCard({ trek }: { trek: Trek }) {
  return (
    <article className="group flex h-full flex-col border-b border-foreground/15 pb-6">
      <Link className="trek-listing-image block overflow-hidden" href={`/treks/${trek.slug}`}>
        <Image alt={trek.name} className="object-cover transition duration-700 group-hover:scale-105" fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" src={trek.coverImage} />
        <span className="absolute bottom-3 left-3 bg-background/90 px-2 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-forest-deep">{trek.difficulty}</span>
      </Link>
      <div className="flex flex-1 flex-col pt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal">{trek.location}, {trek.state}</p>
        <h2 className="mt-2 font-[family-name:var(--font-poppins)] text-2xl font-semibold tracking-[-0.05em] text-forest-deep">{trek.name}</h2>
        <p className="mt-3 text-sm leading-6 text-foreground/70">{trek.shortDescription}</p>
        <div className="mt-5 flex gap-5 text-xs uppercase tracking-[0.1em] text-foreground/55"><span>{trek.duration}</span><span>{trek.altitude}</span></div>
        <Link className="mt-5 inline-flex items-center gap-2 self-start text-sm font-semibold text-teal transition-colors hover:text-forest" href={`/treks/${trek.slug}`}>View trek <span aria-hidden="true">↗</span></Link>
      </div>
    </article>
  );
}
