export type TrekDifficulty = "easy" | "moderate" | "challenging";

export interface TrekItineraryDay {
  day: number;
  title: string;
  description: string;
  distance: string;
  overnight: string;
}

export interface TrekStory {
  heading: string;
  paragraphs: string[];
}

export interface TrekExperience {
  title: string;
  description: string;
  image: string;
}

export interface TrekEssential {
  label: string;
  detail: string;
}

export interface Trek {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  location: string;
  state: string;
  altitude: string;
  distance: string;
  duration: string;
  difficulty: TrekDifficulty;
  bestSeason: string;
  startingPoint: string;
  endingPoint: string;
  coverImage: string;
  gallery: string[];
  story: TrekStory;
  highlights?: string[];
  itinerary: TrekItineraryDay[];
  experience: TrekExperience[];
  essentials: TrekEssential[];
  whatToCarry?: string[];
  tags: string[];
  featured: boolean;
  published: boolean;
  seoTitle?: string;
  seoDescription?: string;
  region?: string;
  season?: string;
  image?: string;
  summary?: string;
}