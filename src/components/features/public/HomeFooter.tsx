import Image from "next/image";
import { Section } from "@/components/layout/Section";

export function HomeFooter() {
  return (
    <Section
      id="contact"
      tone="section"
      className="pb-12 md:pb-16 lg:pb-20"
    >
      <div className="grid gap-10 rounded-[28px] bg-background p-8 shadow-soft ring-1 ring-secondary/10 md:min-h-[340px] md:grid-cols-[1.2fr_0.8fr] md:items-stretch md:gap-12 md:p-12">
        <div className="space-y-5">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-primary">
            Contact
          </p>
          <h2 className="max-w-lg text-balance text-secondary">
            Reach out to discover what’s baking next or to place your order.
          </h2>
          <p className="max-w-xl text-base text-muted md:text-lg">
            123 Bakery Street, Seattle, WA
            <br />
            hello@lilyasbakery.com
            <br />
            (206) 555-0186
          </p>
        </div>

        <div className="flex flex-col items-start text-sm text-muted md:items-end">
          <Image
            src="/brand/lilyas-bakery-logo.svg"
            alt="Lilyas Bakery logo"
            width={438}
            height={270}
            className="h-[68px] w-auto"
          />

          <div className="mt-12 space-y-3 md:mt-auto md:pt-12 md:text-right">
            <p>Tuesday to Sunday</p>
            <p>7:00 AM to 3:00 PM</p>
            <p className="pt-2 text-secondary">Fresh pastries. Small batches. Warm mornings.</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
