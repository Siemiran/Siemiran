import type { ProductListItemViewModel } from "../copy/product-copy.public-types";
import ProductCard from "./ProductCard";
import { useTranslations } from "next-intl";

interface Props {
  items: readonly ProductListItemViewModel[];
}

export default function RelatedProducts({ items }: Props) {
  const t = useTranslations("Comparison");

  if (items.length === 0) return null;

  return (
    <section className="mt-20">
      <h2 className="mb-8 text-3xl font-bold text-slate-900">
        {t("relatedProducts")}
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <ProductCard key={item.product.id} item={item} />
        ))}
      </div>
    </section>
  );
}
