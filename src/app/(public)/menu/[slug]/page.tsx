import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ItemDetailView } from "@/components/features/public/ItemDetailView";
import { getBakeryItemBySlug, getBakeryItems } from "@/lib/bakery-items";

type ItemDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const items = await getBakeryItems();

  return items.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: ItemDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getBakeryItemBySlug(slug);

  if (!item) {
    return {
      title: "Item Not Found | Lilya's Bakery",
    };
  }

  return {
    title: `${item.name} | Lilya's Bakery`,
    description: item.description,
  };
}

export default async function ItemDetailPage({
  params,
}: ItemDetailPageProps) {
  const { slug } = await params;
  const item = await getBakeryItemBySlug(slug);

  if (!item) {
    notFound();
  }

  return <ItemDetailView item={item} />;
}
