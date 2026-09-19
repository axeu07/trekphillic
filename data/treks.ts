import type { Trek } from "@/types";

export type TrekCategory = "weekend" | "valley" | "winter" | "high-altitude";

export interface TrekListing extends Trek {
	category: TrekCategory;
}

export const treks: TrekListing[] = [
	{ slug: "chandrashila", name: "Chandrashila Trek", category: "weekend" },
	{ slug: "tungnath", name: "Tungnath Trek", category: "high-altitude" },
	{ slug: "valley-of-flowers", name: "Valley of Flowers Trek", category: "valley" },
	{ slug: "hampta-pass", name: "Hampta Pass Trek", category: "high-altitude" },
	{ slug: "winter-treks", name: "Winter Treks", category: "winter" },
];