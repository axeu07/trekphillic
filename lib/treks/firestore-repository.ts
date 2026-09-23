import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { firestore } from "@/lib/firebase";
import { mockAdminTreks } from "@/data/treks";
import type { Trek } from "@/types/trek";
import type { TrekRepository } from "@/lib/treks/repository";

function toTrek(id: string, data: Record<string, unknown>, fallback?: Trek): Trek {
  const trek = { ...fallback, ...data } as Partial<Trek> & { heroImage?: string };
  return {
    id,
    slug: typeof trek.slug === "string" ? trek.slug : id,
    name: typeof trek.name === "string" ? trek.name : fallback?.name ?? id,
    shortDescription: trek.shortDescription ?? trek.summary ?? fallback?.shortDescription ?? "",
    location: trek.location ?? fallback?.location ?? "",
    state: trek.state ?? fallback?.state ?? "",
    altitude: trek.altitude ?? fallback?.altitude ?? "",
    distance: trek.distance ?? fallback?.distance ?? "",
    duration: trek.duration ?? fallback?.duration ?? "",
    price: trek.price ?? fallback?.price,
    difficulty: trek.difficulty ?? fallback?.difficulty ?? "moderate",
    bestSeason: trek.bestSeason ?? fallback?.bestSeason ?? "",
    startingPoint: trek.startingPoint ?? fallback?.startingPoint ?? "",
    endingPoint: trek.endingPoint ?? fallback?.endingPoint ?? "",
    coverImage: trek.heroImage ?? trek.coverImage ?? fallback?.coverImage ?? "",
    gallery: Array.isArray(trek.gallery) ? trek.gallery.filter((item): item is string => typeof item === "string") : fallback?.gallery ?? [],
    media: trek.media ?? fallback?.media,
    story: trek.story ?? fallback?.story ?? { heading: "", paragraphs: [] },
    highlights: trek.highlights ?? fallback?.highlights,
    itinerary: Array.isArray(trek.itinerary) ? trek.itinerary as Trek["itinerary"] : fallback?.itinerary ?? [],
    experience: trek.experience ?? fallback?.experience ?? [],
    essentials: trek.essentials ?? fallback?.essentials ?? [],
    whatToCarry: trek.whatToCarry ?? fallback?.whatToCarry,
    tags: trek.tags ?? fallback?.tags ?? [],
    featured: trek.featured ?? fallback?.featured ?? false,
    published: trek.published ?? fallback?.published ?? true,
    seoTitle: trek.seoTitle ?? fallback?.seoTitle,
    seoDescription: trek.seoDescription ?? fallback?.seoDescription,
    region: trek.region ?? fallback?.region,
    season: trek.season ?? fallback?.season,
    image: trek.image ?? fallback?.image,
    summary: trek.summary ?? fallback?.summary,
  };
}

function fallbackFor(id: string, data: Record<string, unknown>) {
  const slug = typeof data.slug === "string" ? data.slug : id;
  return mockAdminTreks.find((trek) => trek.slug === slug);
}

export const firestoreTrekRepository: TrekRepository = {
  async getTreks() {
    const snapshot = await getDocs(collection(firestore, "treks"));
    return snapshot.docs.map((item) => toTrek(item.id, item.data(), fallbackFor(item.id, item.data())));
  },

  async getTrekBySlug(slug) {
    const snapshot = await getDoc(doc(firestore, "treks", slug));
    if (!snapshot.exists()) return undefined;
    return toTrek(snapshot.id, snapshot.data(), fallbackFor(snapshot.id, snapshot.data()));
  },

  async getPublishedTreks() {
    return (await this.getTreks()).filter((trek) => trek.published);
  },

  async getFeaturedTreks() {
    return (await this.getPublishedTreks()).filter((trek) => trek.featured);
  },
};