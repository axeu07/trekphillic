export interface VehicleCategory {
  slug: string;
  name: string;
  description: string;
  href: string;
  visual: "sedan" | "suv" | "tempo" | "bus";
}

export const vehicleCategories: VehicleCategory[] = [
  {
    slug: "sedan",
    name: "Sedan",
    description: "Comfortable option for couples and small families.",
    href: "/enquiry",
    visual: "sedan",
  },
  {
    slug: "suv-7-seater",
    name: "SUV / 7-Seater",
    description: "More space for families and small groups travelling through the mountains.",
    href: "/enquiry",
    visual: "suv",
  },
  {
    slug: "tempo-traveller",
    name: "Tempo Traveller",
    description: "A practical choice for larger groups and group tours.",
    href: "/enquiry",
    visual: "tempo",
  },
  {
    slug: "tourist-bus",
    name: "Tourist Bus",
    description: "Suitable for larger groups and organized journeys.",
    href: "/enquiry",
    visual: "bus",
  },
];
