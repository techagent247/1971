import hero from "@/assets/hero.jpg";
import dish1 from "@/assets/dish-1.jpg";
import interior from "@/assets/interior.jpg";
import spices from "@/assets/spices.jpg";

export type GalleryCategory = "Food" | "Restaurant" | "Dining" | "Events" | "Heritage";
export type GalleryImage = { id: string; src: string; alt: string; category: GalleryCategory; placeholder?: boolean };

/** Illustrative images — replace with the restaurant's own photography. */
export const galleryImages: GalleryImage[] = [
  { id: "g1", src: hero, alt: "A spread of Bangladeshi dishes", category: "Food", placeholder: true },
  { id: "g2", src: interior, alt: "Warm dining room with green walls", category: "Restaurant", placeholder: true },
  { id: "g3", src: dish1, alt: "Plated lamb curry with saffron rice", category: "Food", placeholder: true },
  { id: "g4", src: spices, alt: "Bengali spices on a brass plate", category: "Heritage", placeholder: true },
];
