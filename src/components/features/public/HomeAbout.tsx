import Image from "next/image";
import { Section } from "@/components/layout/Section";

export function HomeAbout() {
  return (
    <Section id="about" containerClassName="space-y-10">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12">
        <div className="relative overflow-hidden rounded-[32px] bg-section shadow-soft ring-1 ring-secondary/10">
          <div className="relative aspect-[4/3] md:aspect-square lg:aspect-[4/5]">
            <Image
              src="/images/contact-owner.jpg"
              alt="The bakery owner in a warm portrait"
              fill
              className="object-cover object-[center_22%]"
              sizes="(min-width: 1024px) 42vw, 100vw"
            />
          </div>
        </div>

        <div className="space-y-6 lg:pl-10">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-primary">
            About
          </p>
          <h2 className="max-w-xl text-balance text-secondary">
            A bakery shaped by calm mornings, careful ingredients, and simple craft.
          </h2>
          <div className="max-w-2xl space-y-5 text-base text-muted md:text-lg">
            <p>
              Lilya&apos;s Bakery is inspired by Ukrainian and Eastern European baking,
              where everyday pastry is made with care and meant to be shared. We focus on
              small-batch bakes with gentle textures, layered flavor, and a visual language
              that feels warm and unforced.
            </p>
            <p>
              The result is a collection that feels quietly premium: pastries rooted in
              tradition, ingredients that stay legible, and a bakery rhythm guided by
              softness, patience, and time-honored recipes.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
