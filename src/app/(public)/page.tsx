import { HomeAbout } from "@/components/features/public/HomeAbout";
import { HomeFeaturedItems } from "@/components/features/public/HomeFeaturedItems";
import { HomeFooter } from "@/components/features/public/HomeFooter";
import { HomeHero } from "@/components/features/public/HomeHero";
import { getBakeryItems } from "@/lib/bakery-items";

export default async function HomePage() {
  const items = await getBakeryItems();
  const featuredItems = items.slice(0, 3);

  return (
    <>
      <HomeHero />
      <HomeFeaturedItems items={featuredItems} />
      <HomeAbout />
      <HomeFooter />
    </>
  );
}
