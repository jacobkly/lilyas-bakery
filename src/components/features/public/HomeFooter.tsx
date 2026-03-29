import { Section } from "@/components/layout/Section";

export function HomeFooter() {
  return (
    <Section tone="section" className="pb-12 md:pb-16 lg:pb-20">
      <div className="grid gap-8 rounded-[28px] bg-background p-8 shadow-soft ring-1 ring-secondary/10 md:grid-cols-[1.2fr_0.8fr] md:items-end md:p-10">
        <div className="space-y-4">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-primary">
            Contact
          </p>
          <h2 className="max-w-lg text-balance text-secondary">
            Stop in for the morning selection or reach out for what&apos;s baking next.
          </h2>
          <p className="max-w-xl text-base text-muted md:text-lg">
            123 Bakery Street, Seattle, WA
            <br />
            hello@lilyasbakery.com
            <br />
            (206) 555-0186
          </p>
        </div>

        <div className="space-y-3 text-sm text-muted md:text-right">
          <p>Tuesday to Sunday</p>
          <p>7:00 AM to 3:00 PM</p>
          <p className="pt-2 text-secondary">Fresh pastries. Small batches. Warm mornings.</p>
        </div>
      </div>
    </Section>
  );
}
