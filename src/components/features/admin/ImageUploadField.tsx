"use client";

import Image from "next/image";
import { Input } from "@/components/ui/admin/input";
import { Label } from "@/components/ui/admin/label";
import { Button } from "@/components/ui/admin/button";

type ImageUploadFieldProps = {
  label: string;
  multiple?: boolean;
  currentUrls?: string[];
  onRemoveCurrentUrl?: (url: string) => void;
  onFilesChange: (files: File[]) => void;
};

export function ImageUploadField({
  label,
  multiple = false,
  currentUrls = [],
  onRemoveCurrentUrl,
  onFilesChange,
}: ImageUploadFieldProps) {
  return (
    <div className="space-y-3">
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
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {currentUrls.map((url) => (
            <div
              key={url}
              className="space-y-2 rounded-lg border border-secondary/10 bg-section/50 p-3"
            >
              <div className="relative aspect-square overflow-hidden rounded-md bg-background">
                <Image
                  src={url}
                  alt="Uploaded bakery item"
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </div>
              {onRemoveCurrentUrl ? (
                <Button
                  type="button"
                  variant="ghost"
                  className="h-8 w-full"
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
