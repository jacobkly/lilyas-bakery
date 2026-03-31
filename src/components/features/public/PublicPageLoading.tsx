import { Section } from "@/components/layout/Section";
import { SkeletonBlock } from "@/components/ui/shared/SkeletonBlock";

export function PublicPageLoading() {
  return (
    <>
      <Section className="pt-8 md:pt-10 lg:pt-12" containerClassName="space-y-8">
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-12">
          <div className="order-2 space-y-6 lg:order-1 lg:pr-10">
            <div className="space-y-4">
              <SkeletonBlock className="h-6 w-28 rounded-full" />
              <SkeletonBlock className="h-16 max-w-xl rounded-[28px]" />
              <SkeletonBlock className="h-16 max-w-lg rounded-[28px]" />
              <SkeletonBlock className="h-6 max-w-xl rounded-full" />
              <SkeletonBlock className="h-6 max-w-lg rounded-full" />
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <SkeletonBlock className="h-12 w-40 rounded-full" />
              <SkeletonBlock className="h-12 w-36 rounded-full" />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="rounded-[32px] bg-section/60 p-2 ring-1 ring-secondary/8">
              <SkeletonBlock className="aspect-[4/5] w-full rounded-[28px] sm:aspect-[16/14] lg:aspect-[5/6]" />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="section" containerClassName="space-y-9 md:space-y-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="max-w-2xl space-y-4">
            <SkeletonBlock className="h-4 w-32 rounded-full" />
            <SkeletonBlock className="h-12 max-w-xl rounded-[24px]" />
            <SkeletonBlock className="h-6 max-w-2xl rounded-full" />
          </div>
          <SkeletonBlock className="h-5 w-28 rounded-full" />
        </div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 md:gap-9 lg:grid-cols-3 lg:gap-10">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="rounded-[28px] bg-background/92 p-2 shadow-soft ring-1 ring-secondary/8"
            >
              <SkeletonBlock className="aspect-[4/5] w-full rounded-[24px]" />
              <div className="space-y-4 p-4 md:p-5">
                <SkeletonBlock className="h-8 w-3/4 rounded-[20px]" />
                <SkeletonBlock className="h-5 w-full rounded-full" />
                <SkeletonBlock className="h-5 w-4/5 rounded-full" />
                <SkeletonBlock className="h-5 w-28 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
