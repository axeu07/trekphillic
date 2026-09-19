export function Badge({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-teal">{children}</span>;
}