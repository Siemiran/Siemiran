import { setRequestLocale } from "next-intl/server";

import BannerStrip from "@/components/sections/BannerStrip";
import Hero from "@/components/sections/Hero";
import Pillars from "@/components/sections/Pillars";
import FeaturedProducts from "@/features/products/sections/FeaturedProducts";

interface HomePageProps {
  params: Promise<{ locale: "fa" | "en" }>;
}

export default async function Home({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <BannerStrip />
      <FeaturedProducts />
      <Pillars />
    </>
  );
}
