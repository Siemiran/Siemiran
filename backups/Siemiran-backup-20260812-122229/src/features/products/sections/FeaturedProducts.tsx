import ProductCard from "@/features/products/components/ProductCard";
import { useProducts } from "@/features/products/hooks/useProducts";

export default function FeaturedProducts() {
  const { featured } = useProducts();

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12">
        <h2 className="text-3xl font-bold">Featured Products</h2>
        <p className="mt-2 text-slate-600">
          Selected Siemens industrial automation products.
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
