import { supabase } from "@/lib/supabase/client";
import type { BakeryItemRow, Database } from "@/types/database";

const BAKERY_IMAGES_BUCKET = "bakery-images";

export type BakeryItemFormValues = {
  name: string;
  description: string;
  ingredients: string[];
  allergens: string[];
};

type BakeryItemsInsert = Database["public"]["Tables"]["bakery_items"]["Insert"];
type BakeryItemsUpdate = Database["public"]["Tables"]["bakery_items"]["Update"];

export async function listBakeryItems() {
  return supabase
    .from("bakery_items")
    .select(
      "id, name, description, main_image_url, additional_image_urls, ingredients, allergens, created_at, updated_at",
    )
    .order("created_at", { ascending: false });
}

export async function uploadBakeryImage(file: File) {
  const extension = file.name.split(".").pop() ?? "jpg";
  const filePath = `items/${crypto.randomUUID()}.${extension}`;
  const { data, error } = await supabase.storage
    .from(BAKERY_IMAGES_BUCKET)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw new Error(error.message);
  }

  const { data: publicUrlData } = supabase.storage
    .from(BAKERY_IMAGES_BUCKET)
    .getPublicUrl(data.path);

  return publicUrlData.publicUrl;
}

async function uploadImages(files: File[]) {
  return Promise.all(files.map((file) => uploadBakeryImage(file)));
}

function buildInsertPayload(
  values: BakeryItemFormValues,
  mainImageUrl: string,
  additionalImageUrls: string[],
): BakeryItemsInsert {
  return {
    name: values.name,
    description: values.description,
    main_image_url: mainImageUrl,
    additional_image_urls: additionalImageUrls,
    ingredients: values.ingredients,
    allergens: values.allergens,
  };
}

function buildUpdatePayload(
  values: BakeryItemFormValues,
  mainImageUrl: string,
  additionalImageUrls: string[],
): BakeryItemsUpdate {
  return {
    name: values.name,
    description: values.description,
    main_image_url: mainImageUrl,
    additional_image_urls: additionalImageUrls,
    ingredients: values.ingredients,
    allergens: values.allergens,
  };
}

export async function createBakeryItem(input: {
  values: BakeryItemFormValues;
  mainImageFile: File;
  additionalImageFiles: File[];
}) {
  const mainImageUrl = await uploadBakeryImage(input.mainImageFile);
  const additionalImageUrls = await uploadImages(input.additionalImageFiles);

  return supabase
    .from("bakery_items")
    .insert(buildInsertPayload(input.values, mainImageUrl, additionalImageUrls))
    .select()
    .single();
}

export async function updateBakeryItem(input: {
  id: string;
  values: BakeryItemFormValues;
  currentMainImageUrl: string;
  mainImageFile?: File | null;
  currentAdditionalImageUrls: string[];
  additionalImageFiles: File[];
}) {
  const mainImageUrl = input.mainImageFile
    ? await uploadBakeryImage(input.mainImageFile)
    : input.currentMainImageUrl;
  const newAdditionalImageUrls = await uploadImages(input.additionalImageFiles);
  const additionalImageUrls = [
    ...input.currentAdditionalImageUrls,
    ...newAdditionalImageUrls,
  ];

  return supabase
    .from("bakery_items")
    .update(buildUpdatePayload(input.values, mainImageUrl, additionalImageUrls))
    .eq("id", input.id)
    .select()
    .single();
}

export async function deleteBakeryItem(id: string) {
  return supabase.from("bakery_items").delete().eq("id", id);
}

export function mapRowToAdminItem(row: BakeryItemRow) {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    mainImageUrl: row.main_image_url,
    additionalImageUrls: row.additional_image_urls ?? [],
    ingredients: row.ingredients ?? [],
    allergens: row.allergens ?? [],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
