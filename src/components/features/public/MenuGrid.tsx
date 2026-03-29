import { BakeryItemCard } from "@/components/ui/public/BakeryItemCard";
import { Section } from "@/components/layout/Section";
import type { BakeryItem } from "@/types/bakery-item";

type MenuGridProps = {
  items: BakeryItem[];
};

export function MenuGrid({ items }: MenuGridProps) {
  return (
    <main className="pb-20">
      <Section
        className="pt-10 md:pt-14 lg:pt-16"
        containerClassName="space-y-12 md:space-y-14"
      >
        <div className="max-w-3xl space-y-5">
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-10">
          {items.map((item) => (
            <BakeryItemCard key={item.slug} item={item} />
          ))}
        </div>
      </Section>
    </main>
  );
}
