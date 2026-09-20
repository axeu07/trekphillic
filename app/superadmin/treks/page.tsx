import type { Metadata } from "next";
import { TrekAdminHeader } from "@/components/superadmin/TrekAdminHeader";
import { TrekAdminList } from "@/components/superadmin/TrekAdminList";
import { getTreks } from "@/lib/treks/repository";

export const metadata: Metadata = { title: "Manage Treks" };

export default async function SuperAdminTreksPage() {
  const treks = await getTreks();
  return <main className="min-h-screen bg-background"><div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16"><TrekAdminHeader /><div className="mt-8"><TrekAdminList treks={treks} /></div></div></main>;
}