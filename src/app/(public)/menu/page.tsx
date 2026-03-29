import type { Metadata } from "next";
import { MenuGrid } from "@/components/features/public/MenuGrid";
import { getBakeryItems } from "@/lib/bakery-items";

export const metadata: Metadata = {
  title: "Menu | Lilya's Bakery",
  description:
    "Explore the bakery menu with image-first cards for pastries, cakes, and seasonal bakes.",
};

export default async function MenuPage() {
  const items = await getBakeryItems();
  return <MenuGrid items={items} />;
}
