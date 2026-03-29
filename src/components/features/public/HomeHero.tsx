import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { heroImage } from "@/lib/home-content";
import { BrandLogo } from "@/components/ui/public/BrandLogo";

export function HomeHero() {
  return (
    <Section
      className="pt-4 md:pt-6 lg:pt-8"
      containerClassName="space-y-6"
    >
      <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
        <div className="order-2 space-y-5 lg:order-1 lg:pr-8">
          <BrandLogo className="items-start text-left" />
          <div className="space-y-5">
            <h1 className="max-w-xl text-balance text-secondary">
              A warm bakery experience built around texture, aroma, and quiet indulgence.
            </h1>
            <p className="max-w-xl text-base text-muted md:text-lg">
              Small-batch pastries and cakes designed to feel generous, refined,
              and deeply comforting from the first look to the last bite.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/menu"
              className="inline-flex h-12 items-center justify-center rounded-full bg-secondary px-6 text-sm font-medium text-background shadow-soft transition-colors hover:bg-secondary/92"
            >
              Explore the menu
            </Link>
            <a
              href="#about"
              className="inline-flex h-12 items-center justify-center rounded-full border border-secondary/15 bg-background px-6 text-sm font-medium text-secondary transition-colors hover:bg-section"
            >
              Our story
            </a>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative overflow-hidden rounded-[32px] bg-section shadow-soft ring-1 ring-secondary/10">
            <div className="absolute inset-x-6 top-6 z-10 flex items-center justify-between">
              <span className="rounded-full bg-background/88 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-secondary backdrop-blur-sm">
                Freshly baked
              </span>
              <span className="rounded-full bg-background/82 px-4 py-2 text-xs font-medium text-muted backdrop-blur-sm">
                Daily selection
              </span>
            </div>
            <div className="relative aspect-[4/5] sm:aspect-[16/14] lg:aspect-[5/6]">
              <Image
                src={heroImage}
                alt="A curated arrangement of pastries and cakes for Lilya's Bakery"
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 55vw, 100vw"
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
