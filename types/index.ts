export type Category = "trek" | "tour" | "vehicle";

export type { Trek, TrekDifficulty } from "./trek";

export interface TourPackage {
  slug: string;
  name: string;
  region?: string;
  duration?: string;
  image?: string;
  summary?: string;
}

export interface Vehicle {
  slug: string;
  name: string;
  capacity?: number;
  image?: string;
  summary?: string;
}

export interface Enquiry {
  name: string;
  phone: string;
  email?: string;
  category: Category;
  interest?: string;
  message?: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  location?: string;
  image?: string;
}