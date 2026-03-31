"use client";

import { useState } from "react";
import { BakeryItemPreviewModal } from "@/components/features/public/BakeryItemPreviewModal";
import { BakeryItemCard } from "@/components/ui/public/BakeryItemCard";
import { Section } from "@/components/layout/Section";
import type { BakeryItem } from "@/types/bakery-item";

type MenuGridProps = {
  items: BakeryItem[];
};

export function MenuGrid({ items }: MenuGridProps) {
  const [selectedItem, setSelectedItem] = useState<BakeryItem | null>(null);

  return (
    <>
      <main className="pb-24">
        <Section
          className="pt-12 md:pt-16 lg:pt-[4.5rem]"
          containerClassName="space-y-9 md:space-y-10"
        >
          <div className="max-w-3xl space-y-4">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-primary">
              The Menu
            </p>
            <h1 className="max-w-2xl text-balance text-secondary">
              Bakes made to feel warm, generous, and quietly refined.
            </h1>
            <p className="max-w-2xl text-base text-muted md:text-lg">
              A curated collection of pastries, cakes, and seasonal bakes designed
              around texture, aroma, and simple ingredients handled well.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 md:gap-9 lg:grid-cols-3 lg:gap-10">
            {items.map((item) => (
              <BakeryItemCard
                key={item.slug}
                item={item}
                onClick={setSelectedItem}
              />
            ))}
          </div>
        </Section>
      </main>

      <BakeryItemPreviewModal
        key={selectedItem?.id ?? "menu-preview-empty"}
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </>
  );
}
