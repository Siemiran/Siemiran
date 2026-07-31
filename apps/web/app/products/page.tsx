import { products } from "@/features/products/data/products";
import ProductCard from "@/features/products/components/ProductCard";

export default function ProductsPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-20">
      <div className="mb-12">
        <p className="mb-2 text-sm font-semibold tracking-wider text-cyan-600 uppercase">
          Siemens
        </p>

        <h1 className="text-5xl font-bold text-slate-900">Products</h1>

        <p className="mt-4 max-w-3xl text-slate-600">
          Browse our industrial automation catalog.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
