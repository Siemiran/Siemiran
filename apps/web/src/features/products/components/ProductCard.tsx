import type { ProductListItemViewModel } from "@/features/products/copy/product-copy.public-types";

import ProductActions from "./ProductActions";
import ProductBadge from "./ProductBadge";
import ProductCompareButton from "./ProductCompareButton";
import ProductImage from "./ProductImage";
import ProductMeta from "./ProductMeta";

interface ProductCardProps {
  item: ProductListItemViewModel;
  comparisonSelected?: boolean;
  comparisonDisabled?: boolean;
  onAddToComparison?: (productId: string) => void;
  onRemoveFromComparison?: (productId: string) => void;
}

export default function ProductCard({
  item,
  comparisonSelected = false,
  comparisonDisabled = false,
  onAddToComparison,
  onRemoveFromComparison,
}: ProductCardProps) {
  return (
    <article>
      <div>
        <ProductImage item={item} />
        <ProductBadge item={item} />
      </div>

      <ProductMeta item={item} />

      <ProductActions item={item} />

      {onAddToComparison && onRemoveFromComparison && (
        <ProductCompareButton
          item={item}
          selected={comparisonSelected}
          disabled={comparisonDisabled}
          onAdd={onAddToComparison}
          onRemove={onRemoveFromComparison}
        />
      )}
    </article>
  );
}
