import type { Trek } from "@/types/trek";
import { mockTrekRepository } from "@/lib/treks/mock-repository";
import { firestoreTrekRepository } from "@/lib/treks/firestore-repository";

export interface TrekRepository {
  getTreks(): Promise<Trek[]>;
  getTrekBySlug(slug: string): Promise<Trek | undefined>;
  getPublishedTreks(): Promise<Trek[]>;
  getFeaturedTreks(): Promise<Trek[]>;
}

export async function getTreks() {
  return trekRepository.getTreks();
}

export async function getTrekBySlug(slug: string) {
  return trekRepository.getTrekBySlug(slug);
}

export async function getPublishedTreks() {
  return trekRepository.getPublishedTreks();
}

export async function getFeaturedTreks() {
  return trekRepository.getFeaturedTreks();
}

export const trekRepository: TrekRepository = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  ? firestoreTrekRepository
  : mockTrekRepository;