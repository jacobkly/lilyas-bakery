import Image from "next/image";
import type { BakeryItem } from "@/types/bakery-item";

type BakeryItemCardProps = {
  item: BakeryItem;
  onClick: (item: BakeryItem) => void;
};

export function BakeryItemCard({ item, onClick }: BakeryItemCardProps) {
  const image = item.images[0];

  return (
    <button
      type="button"
      onClick={() => onClick(item)}
      aria-label={`Open preview for ${item.name}`}
      className="group block w-full cursor-pointer rounded-[28px] bg-background/90 text-left shadow-soft ring-1 ring-secondary/10 transition-transform duration-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)] [@media(hover:hover)]:hover:scale-[1.035] [@media(hover:hover)]:hover:shadow-[0_28px_60px_-32px_rgb(107_79_58_/_0.32),0_20px_36px_-28px_rgb(43_43_43_/_0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 transform-gpu will-change-transform"
    >
      <article className="overflow-hidden rounded-[28px]">
        <div className="relative aspect-[4/5] overflow-hidden bg-section">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          />
        </div>

        <div className="space-y-5 p-6 md:p-7 lg:p-8">
          <div className="space-y-3.5">
            <h2 className="text-[1.75rem] leading-tight text-secondary">
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
              className="transition-transform duration-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)] [@media(hover:hover)]:group-hover:translate-x-0.5"
            >
              {"->"}
            </span>
          </div>
        </div>
      </article>
    </button>
  );
}
