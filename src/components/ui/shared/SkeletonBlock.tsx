import { cn } from "@/lib/utils";

type SkeletonBlockProps = {
  className?: string;
};

export function SkeletonBlock({ className }: SkeletonBlockProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "skeleton-block rounded-2xl bg-section/80",
        className,
      )}
    />
  );
}
