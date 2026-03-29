import { HomeAbout } from "@/components/features/public/HomeAbout";
import { HomeFeaturedItems } from "@/components/features/public/HomeFeaturedItems";
import { HomeFooter } from "@/components/features/public/HomeFooter";
import { HomeHero } from "@/components/features/public/HomeHero";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeFeaturedItems />
      <HomeAbout />
      <HomeFooter />
    </>
  );
}
