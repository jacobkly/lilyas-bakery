import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import type { BakeryItem } from "@/types/bakery-item";

type ItemDetailViewProps = {
  item: BakeryItem;
};

function DetailCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl bg-section/70 p-6 shadow-soft ring-1 ring-secondary/8 md:p-7">
      <h2 className="text-2xl text-secondary">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export function ItemDetailView({ item }: ItemDetailViewProps) {
  const [mainImage, ...galleryImages] = item.images;

  return (
    <main className="pb-20">
      <Section className="pt-10 md:pt-14 lg:pt-16" containerClassName="space-y-10">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-[28px] bg-section shadow-soft ring-1 ring-secondary/10">
              <div className="absolute inset-x-6 top-6 z-10 flex items-center justify-between">
                <span className="rounded-full bg-background/88 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-secondary backdrop-blur-sm">
                  Signature Bake
                </span>
                <span className="rounded-full bg-background/78 px-4 py-2 text-xs font-medium text-muted backdrop-blur-sm">
                  Handcrafted Daily
                </span>
              </div>
              <div className="relative aspect-[4/5] sm:aspect-[16/14]">
                <Image
                  src={mainImage.src}
                  alt={mainImage.alt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(min-width: 1024px) 58vw, 100vw"
                />
              </div>
            </div>

            {galleryImages.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {galleryImages.map((image) => (
                  <div
                    key={image.alt}
                    className="group relative overflow-hidden rounded-xl bg-section shadow-soft ring-1 ring-secondary/10"
                  >
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        sizes="(min-width: 768px) 30vw, 50vw"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="space-y-6 lg:sticky lg:top-8">
            <div className="rounded-[28px] bg-background/92 p-7 shadow-soft ring-1 ring-secondary/10 md:p-8">
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-primary">
                Baked Fresh Daily
              </p>
              <h1 className="mt-4 max-w-xl text-balance text-secondary">
                {item.name}
              </h1>
              <p className="mt-5 max-w-2xl text-base text-muted md:text-lg">
                {item.description}
              </p>
            </div>

            <DetailCard title="Ingredients">
              <ul className="grid gap-3 text-sm text-muted md:grid-cols-2 md:text-base">
                {item.ingredients.map((ingredient) => (
                  <li
                    key={ingredient}
                    className="rounded-xl bg-background px-4 py-3 shadow-soft ring-1 ring-secondary/8"
                  >
                    {ingredient}
                  </li>
                ))}
              </ul>
            </DetailCard>

            <DetailCard title="Allergens">
              <div className="flex flex-wrap gap-3">
                {item.allergens.length > 0 ? (
                  item.allergens.map((allergen) => (
                    <span
                      key={allergen}
                      className="rounded-full bg-accent/45 px-4 py-2 text-sm font-medium text-secondary ring-1 ring-secondary/10"
                    >
                      {allergen}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-muted">No listed allergens.</p>
                )}
              </div>
            </DetailCard>
          </div>
        </div>
      </Section>

      <Section tone="section">
        <Container className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-background p-6 shadow-soft ring-1 ring-secondary/8">
            <p className="text-sm uppercase tracking-[0.22em] text-primary">
              Texture
            </p>
            <p className="mt-3 text-muted">
              Crisp shell, tender interior, and a buttery finish that stays light.
            </p>
          </div>
          <div className="rounded-xl bg-background p-6 shadow-soft ring-1 ring-secondary/8">
            <p className="text-sm uppercase tracking-[0.22em] text-primary">
              Best With
            </p>
            <p className="mt-3 text-muted">
              Espresso, cappuccino, or a quiet morning with enough time to slow down.
            </p>
          </div>
          <div className="rounded-xl bg-background p-6 shadow-soft ring-1 ring-secondary/8">
            <p className="text-sm uppercase tracking-[0.22em] text-primary">
              Batch Style
            </p>
            <p className="mt-3 text-muted">
              Small-batch production keeps each pastry consistent, fragrant, and delicate.
            </p>
          </div>
        </Container>
      </Section>
    </main>
  );
}
