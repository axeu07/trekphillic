import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TrekCTA } from "@/components/treks/TrekCTA";
import { TrekEssentials } from "@/components/treks/TrekEssentials";
import { TrekExperience } from "@/components/treks/TrekExperience";
import { TrekGallery } from "@/components/treks/TrekGallery";
import { TrekHero } from "@/components/treks/TrekHero";
import { TrekIntelligence } from "@/components/treks/TrekIntelligence";
import { TrekRoute } from "@/components/treks/TrekRoute";
import { TrekStory } from "@/components/treks/TrekStory";
import { getPublishedTreks, getTrekBySlug } from "@/lib/treks/repository";

export async function generateStaticParams() {
  const treks = await getPublishedTreks();
  return treks.map((trek) => ({ slug: trek.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const trek = await getTrekBySlug(slug);
  return { title: trek?.seoTitle ?? trek?.name ?? "Trek not found", description: trek?.seoDescription ?? trek?.shortDescription };
}

export default async function TrekDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const trek = await getTrekBySlug(slug);

  if (!trek) notFound();

  return <main><TrekHero trek={trek} /><TrekIntelligence trek={trek} /><TrekRoute trek={trek} /><TrekStory trek={trek} /><TrekExperience trek={trek} /><TrekEssentials trek={trek} /><TrekGallery trek={trek} /><TrekCTA /></main>;
}