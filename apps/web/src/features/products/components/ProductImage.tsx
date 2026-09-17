import Image from "next/image";

import type { ProductListItemViewModel } from "@/features/products/copy/product-copy.public-types";

interface ProductImageProps {
  item: ProductListItemViewModel;
}

export default function ProductImage({ item }: ProductImageProps) {
  const { product } = item;
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
