import Hero from "@/components/sections/Hero";
import BannerStrip from "@/components/sections/BannerStrip";
import Pillars from "@/components/sections/Pillars";

import FeaturedProducts from "@/features/products/sections/FeaturedProducts";

export default function Home() {
  return (
    <>
      <Hero />

      <BannerStrip />

      <FeaturedProducts />

      <Pillars />
    </>
  );
}
