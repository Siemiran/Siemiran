import ProductCard from "@/features/products/components/ProductCard";
import { createProductListItemViewModels } from "@/features/products/copy/product-copy.public.server";
import { getFeaturedProducts } from "@/features/products/repository/product.repository";
import type { AppLocale } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface FeaturedProductsProps {
  readonly locale: AppLocale;
}

export default function FeaturedProducts({ locale }: FeaturedProductsProps) {
  const t = useTranslations("Home");
  const featured = createProductListItemViewModels(
    getFeaturedProducts(),
    locale
  );

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12">
        <h2 className="text-3xl font-bold">{t("featuredTitle")}</h2>
        <p className="mt-2 text-slate-600">{t("featuredDescription")}</p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {featured.map((item) => (
          <ProductCard key={item.product.id} item={item} />
        ))}
      </div>
    </section>
  );
}
