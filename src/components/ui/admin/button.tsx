import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost" | "destructive";
};

export function Button({
  className,
  variant = "default",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-50",
        variant === "default" && "bg-secondary text-background hover:bg-secondary/90",
        variant === "outline" &&
          "border border-secondary/15 bg-background text-foreground hover:bg-section",
        variant === "ghost" && "text-muted hover:bg-section hover:text-foreground",
        variant === "destructive" &&
          "bg-red-600 text-white hover:bg-red-600/90",
        className,
      )}
      {...props}
    />
  );
}
