export interface Experience {
  slug: string;
  name: string;
  description: string;
  href: string;
  visual: "forest" | "meadow" | "winter" | "altitude" | "road" | "group";
}

export const experiences: Experience[] = [
  {
    slug: "weekend-treks",
    name: "Weekend Treks",
    description: "Short, refreshing trails for a change of pace.",
    href: "/enquiry?interest=weekend-treks",
    visual: "forest",
  },
  {
    slug: "valley-and-meadows",
    name: "Valley & Meadows",
    description: "Open meadows, seasonal colour, and wide horizons.",
    href: "/enquiry?interest=valley-and-meadows",
    visual: "meadow",
  },
  {
    slug: "winter-adventures",
    name: "Winter Adventures",
    description: "Crisp trails and snow-shaped mountain landscapes.",
    href: "/enquiry?interest=winter-adventures",
    visual: "winter",
  },
  {
    slug: "high-altitude-treks",
    name: "High-Altitude Treks",
    description: "Bigger skies for days spent above the tree line.",
    href: "/enquiry?interest=high-altitude-treks",
    visual: "altitude",
  },
  {
    slug: "mountain-road-trips",
    name: "Mountain Road Trips",
    description: "Scenic routes connecting valleys, towns, and trailheads.",
    href: "/enquiry?interest=mountain-road-trips",
    visual: "road",
  },
  {
    slug: "family-and-group-tours",
    name: "Family & Group Tours",
    description: "Shared mountain time with room for every pace.",
    href: "/enquiry?interest=family-and-group-tours",
    visual: "group",
  },
];
