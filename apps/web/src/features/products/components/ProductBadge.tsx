import type { ProductListItemViewModel } from "@/features/products/copy/product-copy.public-types";
import { useTranslations } from "next-intl";

interface ProductBadgeProps {
  item: ProductListItemViewModel;
}

export default function ProductBadge({ item }: ProductBadgeProps) {
  const t = useTranslations("Product");
  const { product } = item;

  return (
    <div className="absolute start-4 top-4 flex flex-col gap-2">
      <span className="rounded-md bg-cyan-600 px-3 py-1 text-xs font-semibold text-white">
        <bdi dir="ltr">{product.familyId}</bdi>
      </span>

      {product.lifecycle === "legacy" && (
        <span className="rounded-md bg-amber-500 px-3 py-1 text-xs font-semibold text-white">
          {t("legacy")}
        </span>
      )}

      {product.lifecycle === "discontinued" && (
        <span className="rounded-md bg-red-600 px-3 py-1 text-xs font-semibold text-white">
          {t("discontinued")}
        </span>
      )}

      {product.featured && (
        <span className="rounded-md bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
          {t("featured")}
        </span>
      )}
    </div>
  );
}
