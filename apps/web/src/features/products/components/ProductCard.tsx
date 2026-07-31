import type { Product } from "@/features/products/types/product.types";

import ProductActions from "./ProductActions";
import ProductBadge from "./ProductBadge";
import ProductImage from "./ProductImage";
import ProductMeta from "./ProductMeta";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative">
        <ProductImage product={product} />

        <ProductBadge product={product} />
      </div>

      <ProductMeta product={product} />

      <ProductActions product={product} />
    </article>
  );
}
