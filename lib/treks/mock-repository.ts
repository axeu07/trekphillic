import { mockAdminTreks } from "@/data/treks";
import type { Trek } from "@/types/trek";
import type { TrekRepository } from "@/lib/treks/repository";

export const mockTrekRepository: TrekRepository = {
  async getTreks(): Promise<Trek[]> {
    return mockAdminTreks;
  },
  async getTrekBySlug(slug: string): Promise<Trek | undefined> {
    return mockAdminTreks.find((trek) => trek.slug === slug && trek.published);
  },
  async getPublishedTreks(): Promise<Trek[]> {
    return mockAdminTreks.filter((trek) => trek.published);
  },
  async getFeaturedTreks(): Promise<Trek[]> {
    return mockAdminTreks.filter((trek) => trek.published && trek.featured);
  },
};