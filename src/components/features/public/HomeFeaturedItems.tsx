import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { BakeryItemCard } from "@/components/ui/public/BakeryItemCard";
import { featuredHomeItems } from "@/lib/home-content";

export function HomeFeaturedItems() {
  return (
    <Section tone="section" containerClassName="space-y-12 md:space-y-14">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl space-y-4">
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

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-10">
        {featuredHomeItems.map((item) => (
          <BakeryItemCard key={item.id} item={item} />
        ))}
      </div>
    </Section>
  );
}
