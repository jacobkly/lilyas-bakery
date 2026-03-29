import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { heroImage } from "@/lib/home-content";

export function HomeAbout() {
  return (
    <Section id="about" containerClassName="space-y-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative overflow-hidden rounded-[32px] bg-section shadow-soft ring-1 ring-secondary/10">
          <div className="relative aspect-[4/3]">
            <Image
              src={heroImage}
              alt="Bakery counter and morning pastries"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 42vw, 100vw"
            />
          </div>
        </div>

        <div className="space-y-5 lg:pl-8">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-primary">
            About
          </p>
          <h2 className="max-w-xl text-balance text-secondary">
            A bakery shaped by calm mornings, careful ingredients, and simple craft.
          </h2>
          <div className="max-w-2xl space-y-4 text-base text-muted md:text-lg">
            <p>
              Lilya&apos;s Bakery is built around the idea that everyday pastry can
              still feel special. We focus on small-batch bakes with gentle
              textures, layered flavor, and a visual language that feels warm and
              unforced.
            </p>
            <p>
              The result is a collection that feels quietly premium: pastries with
              room to breathe, ingredients that stay legible, and a bakery rhythm
              rooted in softness rather than excess.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
