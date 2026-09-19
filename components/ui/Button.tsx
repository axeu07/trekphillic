import Link from "next/link";
import type { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & { href?: never; variant?: "primary" | "secondary" };
type LinkButtonProps = ComponentProps<typeof Link> & { href: string; variant?: "primary" | "secondary" };

const styles = {
  primary: "bg-forest text-white hover:bg-forest-deep",
  secondary: "border border-border text-forest hover:border-forest",
};

export function Button({ className = "", variant = "primary", ...props }: ButtonProps) {
  return <button className={`inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition-colors ${styles[variant]} ${className}`} {...props} />;
}

export function LinkButton({ className = "", variant = "primary", ...props }: LinkButtonProps) {
  return <Link className={`inline-flex min-h-11 items-center justify-center rounded-full px-5 text-sm font-semibold transition-colors ${styles[variant]} ${className}`} {...props} />;
}