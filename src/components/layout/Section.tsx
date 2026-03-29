import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { Container } from "@/components/layout/Container";

type SectionProps<T extends ElementType = "section"> = {
  as?: T;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  tone?: "background" | "section";
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

export function Section<T extends ElementType = "section">({
  as,
  children,
  className,
  containerClassName,
  tone = "background",
  ...props
}: SectionProps<T>) {
  const Component = as ?? "section";
  const toneClass = tone === "section" ? "bg-section" : "bg-background";
  const classes = ["py-16 md:py-20 lg:py-24", toneClass, className]
    .filter(Boolean)
    .join(" ");

  return (
    <Component className={classes} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </Component>
  );
}
