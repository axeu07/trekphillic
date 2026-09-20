import type { ReactNode } from "react";

export function EditorSection({ eyebrow, title, children }: { eyebrow: string; title: string; children: ReactNode }) {
  return <section className="border-b border-foreground/15 pb-10 pt-10 first:pt-0"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">{eyebrow}</p><h2 className="mt-2 font-[family-name:var(--font-poppins)] text-2xl font-semibold tracking-[-0.05em] text-forest-deep">{title}</h2><div className="mt-6">{children}</div></section>;
}

export function FieldError({ message }: { message?: string }) {
  return message ? <p className="mt-1 text-xs text-[#8a4d1e]">{message}</p> : null;
}

export function TextField({ label, value, onChange, error, required = false, placeholder, type = "text" }: { label: string; value: string; onChange: (value: string) => void; error?: string; required?: boolean; placeholder?: string; type?: "text" | "url" }) {
  return <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-foreground/60">{label}{required ? <span aria-hidden="true" className="ml-1 text-sunrise">*</span> : null}<input className={`mt-2 min-h-11 w-full border bg-background px-3 text-sm normal-case tracking-normal text-foreground outline-none placeholder:text-foreground/40 focus:border-forest ${error ? "border-sunrise" : "border-border"}`} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} type={type} value={value} /> <FieldError message={error} /></label>;
}

export function TextAreaField({ label, value, onChange, error, required = false, placeholder, rows = 4 }: { label: string; value: string; onChange: (value: string) => void; error?: string; required?: boolean; placeholder?: string; rows?: number }) {
  return <label className="block text-xs font-semibold uppercase tracking-[0.14em] text-foreground/60">{label}{required ? <span aria-hidden="true" className="ml-1 text-sunrise">*</span> : null}<textarea className={`mt-2 w-full resize-y border bg-background px-3 py-3 text-sm normal-case leading-6 tracking-normal text-foreground outline-none placeholder:text-foreground/40 focus:border-forest ${error ? "border-sunrise" : "border-border"}`} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} rows={rows} value={value} /> <FieldError message={error} /></label>;
}