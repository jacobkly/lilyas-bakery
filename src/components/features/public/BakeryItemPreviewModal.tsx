"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { BakeryItem } from "@/types/bakery-item";
import { cn } from "@/lib/utils";
import { SkeletonBlock } from "@/components/ui/shared/SkeletonBlock";

type BakeryItemPreviewModalProps = {
  item: BakeryItem | null;
  onClose: () => void;
};

function formatAllergens(allergens: string[]) {
  if (allergens.length === 0) {
    return "No listed allergens.";
  }

  return `Contains ${allergens.join(", ")}.`;
}

export function BakeryItemPreviewModal({
  item,
  onClose,
}: BakeryItemPreviewModalProps) {
  const [isEntered, setIsEntered] = useState(false);
  const [isTextReady, setIsTextReady] = useState(false);
  const [isMainImageLoaded, setIsMainImageLoaded] = useState(false);

  useEffect(() => {
    if (!item) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      setIsEntered(true);
    });
    const textTimer = window.setTimeout(() => {
      setIsTextReady(true);
    }, 180);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(textTimer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      setIsEntered(false);
    };
  }, [item, onClose]);

  if (!item) {
    return null;
  }

  const [mainImage, ...additionalImages] = item.images;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-end justify-center bg-[rgb(43_43_43_/_0.24)] px-4 py-4 backdrop-blur-sm transition-opacity duration-200 ease-out sm:items-center sm:px-6 sm:py-8",
        isEntered ? "opacity-100" : "opacity-0",
      )}
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="bakery-item-preview-title"
        className={cn(
          "relative flex max-h-[88vh] w-full max-w-[800px] flex-col overflow-hidden rounded-[32px] bg-[#FFF8F2] shadow-[0_30px_90px_-40px_rgb(43_43_43_/_0.26),0_20px_38px_-28px_rgb(107_79_58_/_0.2)] transition-all duration-[240ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          isEntered
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-1 scale-[0.98] opacity-0",
        )}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="px-5 pt-5 sm:px-6 sm:pt-6">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] bg-section">
            <button
              type="button"
              aria-label="Close item preview"
              onClick={onClose}
              className="absolute right-3 top-3 z-10 inline-flex size-9 items-center justify-center rounded-full bg-background/88 text-base text-secondary shadow-[0_10px_24px_-18px_rgb(43_43_43_/_0.24)] backdrop-blur-sm transition-colors duration-200 ease-out hover:bg-background sm:right-4 sm:top-4"
            >
              <span aria-hidden="true">x</span>
            </button>

            <Image
              src={mainImage.src}
              alt={mainImage.alt}
              fill
              priority
              className={cn(
                "object-cover transition-opacity duration-300 ease-out",
                isMainImageLoaded ? "opacity-100" : "opacity-0",
              )}
              onLoad={() => setIsMainImageLoaded(true)}
              sizes="(min-width: 768px) 760px, 100vw"
            />
            {!isMainImageLoaded ? (
              <SkeletonBlock className="absolute inset-0 rounded-[24px]" />
            ) : null}
          </div>
        </div>

        <div className="overflow-y-auto px-5 pb-8 pt-4 sm:px-6 sm:pb-10 sm:pt-5">
          {isTextReady ? (
            <div className="space-y-4 sm:space-y-5">
              <h2
                id="bakery-item-preview-title"
                className="max-w-xl text-balance text-[2rem] leading-tight text-secondary sm:text-[2.35rem]"
              >
                {item.name}
              </h2>
              <p className="max-w-2xl text-base leading-7 text-muted sm:text-lg">
                {item.description}
              </p>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-5">
              <SkeletonBlock className="h-12 w-3/4 rounded-[24px]" />
              <SkeletonBlock className="h-5 w-full rounded-full" />
              <SkeletonBlock className="h-5 w-4/5 rounded-full" />
            </div>
          )}

          {additionalImages.length > 0 ? (
            <div className="mt-8 grid grid-cols-2 gap-3.5 sm:mt-9 sm:grid-cols-3 sm:gap-4">
              {additionalImages.map((image) => (
                <div
                  key={image.alt}
                  className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-section"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 640px) 180px, 45vw"
                  />
                </div>
              ))}
            </div>
          ) : null}

          <div className="mt-9 space-y-7 sm:mt-10 sm:space-y-8">
            <section className="space-y-3">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">
                Ingredients
              </p>
              {isTextReady ? (
                <p className="text-base leading-7 text-secondary/88 sm:text-[1.02rem]">
                  {item.ingredients.length > 0
                    ? item.ingredients.join(", ")
                    : "Ingredient details coming soon."}
                </p>
              ) : (
                <div className="space-y-2">
                  <SkeletonBlock className="h-5 w-full rounded-full" />
                  <SkeletonBlock className="h-5 w-2/3 rounded-full" />
                </div>
              )}
            </section>

            <section className="space-y-3">
              <p className="text-sm font-medium uppercase tracking-[0.22em] text-primary">
                Allergens
              </p>
              {isTextReady ? (
                <p className="text-base leading-7 text-secondary/88 sm:text-[1.02rem]">
                  {formatAllergens(item.allergens)}
                </p>
              ) : (
                <div className="space-y-2">
                  <SkeletonBlock className="h-5 w-5/6 rounded-full" />
                  <SkeletonBlock className="h-5 w-1/2 rounded-full" />
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
