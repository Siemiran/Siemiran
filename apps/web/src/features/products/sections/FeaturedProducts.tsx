import ProductCard from "@/features/products/components/ProductCard";
import { useProducts } from "@/features/products/hooks/useProducts";

export default function FeaturedProducts() {
  const t = useTranslations("Home");
  const { featured } = useProducts();

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12">
        <h2 className="text-3xl font-bold">{t("featuredTitle")}</h2>
        <p className="mt-2 text-slate-600">
          {t("featuredDescription")}
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
import { useTranslations } from "next-intl";
