import type { Product } from "@/features/products/types/product.types";
import { useTranslations } from "next-intl";

interface ProductBadgeProps {
  product: Product;
}

export default function ProductBadge({ product }: ProductBadgeProps) {
  const t = useTranslations("Product");

  return (
    <div className="absolute top-4 start-4 flex flex-col gap-2">
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
