import type { Product } from "@/features/products/types/product.types";

interface ProductImageProps {
  product: Product;
}

export default function ProductImage({ product }: ProductImageProps) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-50">
      <img
        src={product.image}
        alt={product.title}
        loading="lazy"
        className="h-full w-full object-contain p-6 transition duration-300 group-hover:scale-105"
      />
    </div>
  );
}
