"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogClose = DialogPrimitive.Close;

export function DialogContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" />
      <DialogPrimitive.Content className="fixed inset-0 z-50 overflow-y-auto focus:outline-none">
        <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 sm:py-16">
          <div
            className={cn(
              "relative w-full max-w-2xl rounded-2xl bg-background shadow-xl",
              className,
            )}
          >
            {children}
          </div>
        </div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}

export function DialogHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("space-y-2", className)}>{children}</div>;
}

export function DialogTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <DialogPrimitive.Title className={cn("text-2xl text-secondary", className)}>
      {children}
    </DialogPrimitive.Title>
  );
}

export function DialogDescription({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <DialogPrimitive.Description
      className={cn("text-sm text-muted", className)}
    >
      {children}
    </DialogPrimitive.Description>
  );
}
