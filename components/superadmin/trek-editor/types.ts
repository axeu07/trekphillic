import type { Trek, TrekDifficulty, TrekEssential, TrekExperience, TrekItineraryDay } from "@/types/trek";
import type { UploadedImage } from "@/lib/media/upload";

export type TrekEditorMode = "create" | "edit";
export type TrekEditorStatus = "draft" | "published";

export interface TrekEditorState {
  name: string;
  slug: string;
  shortDescription: string;
  location: string;
  state: string;
  startingPoint: string;
  endingPoint: string;
  duration: string;
  price: string;
  distance: string;
  altitude: string;
  difficulty: TrekDifficulty;
  bestSeason: string;
  storyHeading: string;
  storyParagraphs: string;
  highlights: string[];
  experience: TrekExperience[];
  itinerary: TrekItineraryDay[];
  essentials: TrekEssential[];
  whatToCarry: string[];
  coverImage: string;
  gallery: string[];
  status: TrekEditorStatus;
  featured: boolean;
  seoTitle: string;
  seoDescription: string;
}

export type TrekEditorErrors = Partial<Record<keyof TrekEditorState | "form", string>>;

export interface TrekEditorProps {
  mode: TrekEditorMode;
  initialData?: Trek;
  onSave?: (trek: Trek) => Promise<void> | void;
}

export type PendingImageUpload = () => Promise<UploadedImage | UploadedImage[]>;