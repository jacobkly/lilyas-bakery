import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
};

export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <div
      className={cn(
        "inline-flex h-[110px] overflow-hidden md:h-[126px] lg:h-[138px]",
        className,
      )}
    >
      <Image
        src="/brand/lilyas-bakery-logo.svg"
        alt="Lilya's Bakery logo"
        priority
        width={438}
        height={270}
        className="-ml-2 -mt-9 h-auto w-[190px] max-w-none md:-mt-10 md:w-[230px] lg:-mt-11 lg:w-[260px]"
      />
    </div>
  );
}
