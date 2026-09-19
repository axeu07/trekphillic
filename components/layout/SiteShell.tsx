import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";

export function SiteShell({ children }: { children: ReactNode }) {
  return <><Navbar /><div className="flex-1">{children}</div><Footer /></>;
}