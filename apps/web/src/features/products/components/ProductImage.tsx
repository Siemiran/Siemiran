import Image from "next/image";

import type { Product } from "@/features/products/types/product.types";

interface ProductImageProps {
  product: Product;
}

export default function ProductImage({ product }: ProductImageProps) {
  return (
    <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-50">
      <Image
        src={product.images[0]}
        alt={product.title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-contain p-6 transition duration-300 group-hover:scale-105"
      />
    </div>
  );
}
