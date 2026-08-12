import type { Product } from "@/features/products/types/product.types";

import ProductActions from "./ProductActions";
import ProductBadge from "./ProductBadge";
import ProductCompareButton from "./ProductCompareButton";
import ProductImage from "./ProductImage";
import ProductMeta from "./ProductMeta";

interface ProductCardProps {
  product: Product;
  comparisonSelected?: boolean;
  comparisonDisabled?: boolean;
  onAddToComparison?: (product: Product) => void;
  onRemoveFromComparison?: (productId: string) => void;
}

export default function ProductCard({
  product,
  comparisonSelected = false,
  comparisonDisabled = false,
  onAddToComparison,
  onRemoveFromComparison,
}: ProductCardProps) {
  return (
    <article>
      <div>
        <ProductImage product={product} />
        <ProductBadge product={product} />
      </div>

      <ProductMeta product={product} />

      <ProductActions product={product} />

      {onAddToComparison && onRemoveFromComparison && (
        <ProductCompareButton
          product={product}
          selected={comparisonSelected}
          disabled={comparisonDisabled}
          onAdd={onAddToComparison}
          onRemove={onRemoveFromComparison}
        />
      )}
    </article>
  );
}
