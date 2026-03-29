import Image from "next/image";
import Link from "next/link";
import type { BakeryItem } from "@/types/bakery-item";

type BakeryItemCardProps = {
  item: BakeryItem;
};

export function BakeryItemCard({ item }: BakeryItemCardProps) {
  const image = item.images[0];

  return (
    <Link
      href={`/menu/${item.slug}`}
      className="group block cursor-pointer rounded-[28px] bg-background/90 shadow-soft ring-1 ring-secondary/10 transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_-28px_rgb(107_79_58_/_0.35),0_18px_32px_-26px_rgb(43_43_43_/_0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
    >
      <article className="overflow-hidden rounded-[28px]">
        <div className="relative aspect-[4/5] overflow-hidden bg-section">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          />
          <div className="absolute inset-x-5 top-5 flex items-start justify-between gap-3">
            <span className="rounded-full bg-background/88 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-secondary backdrop-blur-sm">
              Fresh Daily
            </span>
            <span className="rounded-full bg-background/82 px-3 py-2 text-[11px] font-medium text-muted backdrop-blur-sm">
              Bakery Item
            </span>
          </div>
        </div>

        <div className="space-y-4 p-6 md:p-7">
          <div className="space-y-3">
            <h2 className="text-[1.75rem] leading-tight text-secondary transition-colors duration-200 group-hover:text-primary">
              {item.name}
            </h2>
            <p className="text-sm leading-7 text-muted md:text-[15px]">
              {item.description}
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm font-medium text-secondary">
            <span>View details</span>
            <span
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1"
            >
              {"->"}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
