export interface TourCategory {
  slug: string;
  name: string;
  description: string;
  href: string;
  visual: "uttarakhand" | "himachal" | "custom";
}

export const tourCategories: TourCategory[] = [
  {
    slug: "uttarakhand-tours",
    name: "Uttarakhand Tours",
    description: "Discover Himalayan towns, valleys, temples and scenic mountain roads.",
    href: "/tours",
    visual: "uttarakhand",
  },
  {
    slug: "himachal-tours",
    name: "Himachal Tours",
    description: "Explore mountain landscapes, valleys and memorable road journeys.",
    href: "/tours",
    visual: "himachal",
  },
  {
    slug: "custom-mountain-tours",
    name: "Custom Mountain Tours",
    description: "Have your own plan? Tell us where you want to go and we'll help shape the journey.",
    href: "/tours",
    visual: "custom",
  },
];
