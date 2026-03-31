import "server-only";
import { cache } from "react";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import type { BakeryItem } from "@/types/bakery-item";
import type { BakeryItemRow } from "@/types/database";

function slugifyItemName(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function mapBakeryItem(row: BakeryItemRow): BakeryItem {
  const additionalImages = row.additional_image_urls ?? [];

  return {
    id: row.id,
    slug: slugifyItemName(row.name),
    name: row.name,
    description: row.description,
    ingredients: row.ingredients ?? [],
    allergens: row.allergens ?? [],
    images: [
      {
        src: row.main_image_url,
        alt: `${row.name} main image`,
      },
      ...additionalImages.map((src, index) => ({
        src,
        alt: `${row.name} gallery image ${index + 1}`,
      })),
    ],
  };
}

export const getBakeryItems = cache(async () => {
  const supabase = createServerSupabaseClient();
  const { data, error } = await supabase
    .from("bakery_items")
    .select(
      "id, name, description, main_image_url, additional_image_urls, ingredients, allergens, created_at, updated_at",
    )
    .order("name", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch bakery items: ${error.message}`);
  }

  return data.map(mapBakeryItem);
});
