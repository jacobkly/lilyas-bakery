import { SkeletonBlock } from "@/components/ui/shared/SkeletonBlock";

export function AdminPageLoading() {
  return (
    <div className="min-h-screen bg-[#f7efe7]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-8 md:px-8 md:py-10">
        <div className="rounded-xl border border-secondary/10 bg-background p-6 shadow-soft md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <SkeletonBlock className="h-4 w-36 rounded-full" />
              <SkeletonBlock className="h-10 w-72 rounded-[24px]" />
              <SkeletonBlock className="h-5 w-80 rounded-full" />
            </div>
            <div className="flex gap-3">
              <SkeletonBlock className="h-10 w-36 rounded-md" />
              <SkeletonBlock className="h-10 w-28 rounded-md" />
            </div>
          </div>
        </div>

        <section className="rounded-xl border border-secondary/10 bg-background shadow-soft">
          <div className="border-b border-secondary/10 px-6 py-5 md:px-8">
            <SkeletonBlock className="h-7 w-40 rounded-[18px]" />
          </div>
          <div className="divide-y divide-secondary/10">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="grid gap-5 px-6 py-6 md:grid-cols-[96px_minmax(0,1fr)_auto] md:items-center md:px-8"
              >
                <SkeletonBlock className="h-[96px] w-[96px] rounded-lg" />
                <div className="space-y-3">
                  <SkeletonBlock className="h-7 w-44 rounded-[18px]" />
                  <SkeletonBlock className="h-5 w-full max-w-2xl rounded-full" />
                  <SkeletonBlock className="h-5 w-3/4 max-w-xl rounded-full" />
                </div>
                <div className="flex gap-2">
                  <SkeletonBlock className="h-10 w-20 rounded-md" />
                  <SkeletonBlock className="h-10 w-24 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
