"use client";

import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createBakeryItem,
  updateBakeryItem,
  type BakeryItemFormValues,
} from "@/lib/admin/bakery-items";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/admin/dialog";
import { Button } from "@/components/ui/admin/button";
import { Input } from "@/components/ui/admin/input";
import { Label } from "@/components/ui/admin/label";
import { Textarea } from "@/components/ui/admin/textarea";
import { TagInput } from "@/components/features/admin/TagInput";
import { ImageUploadField } from "@/components/features/admin/ImageUploadField";

const bakeryItemSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  description: z.string().trim().min(1, "Description is required"),
  ingredients: z.array(z.string()),
  allergens: z.array(z.string()),
});

type BakeryItemSchema = z.infer<typeof bakeryItemSchema>;

export type AdminBakeryItem = {
  id: string;
  name: string;
  description: string;
  mainImageUrl: string;
  additionalImageUrls: string[];
  ingredients: string[];
  allergens: string[];
};

type BakeryItemFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item?: AdminBakeryItem | null;
  onSuccess: () => Promise<void> | void;
};

export function BakeryItemFormDialog({
  open,
  onOpenChange,
  item,
  onSuccess,
}: BakeryItemFormDialogProps) {
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [additionalImageFiles, setAdditionalImageFiles] = useState<File[]>([]);
  const [currentAdditionalUrls, setCurrentAdditionalUrls] = useState<string[]>(
    item?.additionalImageUrls ?? [],
  );
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const isEditing = Boolean(item);

  const defaultValues = useMemo<BakeryItemSchema>(
    () => ({
      name: item?.name ?? "",
      description: item?.description ?? "",
      ingredients: item?.ingredients ?? [],
      allergens: item?.allergens ?? [],
    }),
    [item],
  );

  const form = useForm<BakeryItemSchema>({
    resolver: zodResolver(bakeryItemSchema),
    defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
    setCurrentAdditionalUrls(item?.additionalImageUrls ?? []);
    setMainImageFile(null);
    setAdditionalImageFiles([]);
    setFormError(null);
    setFormSuccess(null);
  }, [defaultValues, form, item, open]);

  async function handleSubmit(values: BakeryItemFormValues) {
    setFormError(null);
    setFormSuccess(null);

    if (!isEditing && !mainImageFile) {
      setFormError("Main image is required.");
      return;
    }

    try {
      if (isEditing && item) {
        const { error } = await updateBakeryItem({
          id: item.id,
          values,
          currentMainImageUrl: item.mainImageUrl,
          mainImageFile,
          currentAdditionalImageUrls: currentAdditionalUrls,
          additionalImageFiles,
        });

        if (error) {
          throw new Error(error.message);
        }

        setFormSuccess("Item updated.");
      } else {
        const { error } = await createBakeryItem({
          values,
          mainImageFile: mainImageFile as File,
          additionalImageFiles,
        });

        if (error) {
          throw new Error(error.message);
        }

        setFormSuccess("Item created.");
      }

      await onSuccess();
      onOpenChange(false);
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Unable to save bakery item.",
      );
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit bakery item" : "Create bakery item"}
          </DialogTitle>
          <DialogDescription>
            Keep the form simple and complete the core content first.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mt-6 space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" {...form.register("name")} />
            {form.formState.errors.name ? (
              <p className="text-sm text-red-700">
                {form.formState.errors.name.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...form.register("description")} />
            {form.formState.errors.description ? (
              <p className="text-sm text-red-700">
                {form.formState.errors.description.message}
              </p>
            ) : null}
          </div>

          <ImageUploadField
            label="Main image"
            currentUrls={item?.mainImageUrl ? [item.mainImageUrl] : []}
            onFilesChange={(files) => setMainImageFile(files[0] ?? null)}
          />

          <ImageUploadField
            label="Additional images"
            multiple
            currentUrls={currentAdditionalUrls}
            onRemoveCurrentUrl={(url) => {
              setCurrentAdditionalUrls((current) =>
                current.filter((itemUrl) => itemUrl !== url),
              );
            }}
            onFilesChange={(files) => setAdditionalImageFiles(files)}
          />

          <TagInput
            label="Ingredients"
            value={form.watch("ingredients")}
            onChange={(value) => form.setValue("ingredients", value)}
            placeholder="Add an ingredient"
          />

          <TagInput
            label="Allergens"
            value={form.watch("allergens")}
            onChange={(value) => form.setValue("allergens", value)}
            placeholder="Add an allergen"
          />

          {formError ? (
            <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
              {formError}
            </p>
          ) : null}
          {formSuccess ? (
            <p className="rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              {formSuccess}
            </p>
          ) : null}

          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting
                ? "Saving..."
                : isEditing
                  ? "Save changes"
                  : "Create item"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
