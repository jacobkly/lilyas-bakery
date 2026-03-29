export type BakeryItemImage = {
  src: string;
  alt: string;
};

export type BakeryItem = {
  id: string;
  slug: string;
  name: string;
  description: string;
  ingredients: string[];
  allergens: string[];
  images: BakeryItemImage[];
};
