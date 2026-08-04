import type { Product } from "../types/product.types";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

export default function RelatedProducts({ products }: Props) {
  if (products.length === 0) return null;

  return (
    <section className="mt-20">
      <h2 className="mb-8 text-3xl font-bold text-slate-900">
        Related Products
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
