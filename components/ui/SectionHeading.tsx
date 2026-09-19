export function SectionHeading({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-teal">{eyebrow}</p> : null}
      <h2 className="text-3xl font-semibold tracking-[-0.03em] text-forest-deep sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-foreground/70">{description}</p> : null}
    </div>
  );
}