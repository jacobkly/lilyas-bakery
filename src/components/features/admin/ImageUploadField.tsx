"use client";

import Image from "next/image";
import { Input } from "@/components/ui/admin/input";
import { Label } from "@/components/ui/admin/label";
import { Button } from "@/components/ui/admin/button";
import { cn } from "@/lib/utils";

type ImageUploadFieldProps = {
  label: string;
  multiple?: boolean;
  currentUrls?: string[];
  onRemoveCurrentUrl?: (url: string) => void;
  onFilesChange: (files: File[]) => void;
  variant?: "main" | "gallery";
};

export function ImageUploadField({
  label,
  multiple = false,
  currentUrls = [],
  onRemoveCurrentUrl,
  onFilesChange,
  variant = "gallery",
}: ImageUploadFieldProps) {
  const isMain = variant === "main";

  return (
    <div className="space-y-4">
      <Label>{label}</Label>
      <Input
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={(event) => {
          onFilesChange(Array.from(event.target.files ?? []));
        }}
      />
      {currentUrls.length > 0 ? (
        <div
          className={cn(
            isMain ? "grid grid-cols-1" : "grid grid-cols-2 gap-4",
          )}
        >
          {currentUrls.map((url) => (
            <div
              key={url}
              className={cn(
                "space-y-3 rounded-[20px] border border-secondary/10 bg-section/50 p-3",
                isMain && "p-4",
              )}
            >
              <div
                className={cn(
                  "relative overflow-hidden rounded-2xl bg-background",
                  isMain ? "aspect-square" : "aspect-square",
                )}
              >
                <Image
                  src={url}
                  alt="Uploaded bakery item"
                  fill
                  className="object-cover"
                  sizes={isMain ? "(min-width: 1024px) 360px, 100vw" : "160px"}
                />
              </div>
              {onRemoveCurrentUrl ? (
                <Button
                  type="button"
                  variant="ghost"
                  className={cn(
                    "h-auto px-0 py-0 text-xs text-muted hover:bg-transparent hover:text-foreground",
                    isMain ? "justify-start" : "justify-start",
                  )}
                  onClick={() => onRemoveCurrentUrl(url)}
                >
                  Remove
                </Button>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
