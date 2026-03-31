"use client";

import { useState } from "react";
import Link from "next/link";
import { BakeryItemPreviewModal } from "@/components/features/public/BakeryItemPreviewModal";
import { Section } from "@/components/layout/Section";
import { BakeryItemCard } from "@/components/ui/public/BakeryItemCard";
import type { BakeryItem } from "@/types/bakery-item";

type HomeFeaturedItemsProps = {
  items: BakeryItem[];
};

export function HomeFeaturedItems({ items }: HomeFeaturedItemsProps) {
  const [selectedItem, setSelectedItem] = useState<BakeryItem | null>(null);

  return (
    <>
      <Section tone="section" containerClassName="space-y-9 md:space-y-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="max-w-2xl space-y-5">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-primary">
              Featured Items
            </p>
            <h2 className="max-w-xl text-balance text-secondary">
              Signature bakes with a soft, modern presence.
            </h2>
            <p className="text-base text-muted md:text-lg">
              Image-first selections that capture the bakery&apos;s balance of warmth,
              craft, and restraint.
            </p>
          </div>
          <Link
            href="/menu"
            className="text-sm font-medium text-secondary transition-colors hover:text-primary"
          >
            View full menu
          </Link>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 md:gap-9 lg:grid-cols-3 lg:gap-10">
            {items.map((item) => (
              <BakeryItemCard
                key={item.id}
                item={item}
                onClick={setSelectedItem}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-[28px] bg-background/88 p-8 shadow-soft ring-1 ring-secondary/10 md:p-10">
            <p className="text-base text-muted md:text-lg">
              The next round of bakes is being prepared now. Check back soon for the
              latest menu selections.
            </p>
          </div>
        )}
      </Section>

      <BakeryItemPreviewModal
        key={selectedItem?.id ?? "home-preview-empty"}
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </>
  );
}
