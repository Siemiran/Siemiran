import type { Product } from "@/features/products/types/product.types";

interface ProductMetaProps {
  product: Product;
}

export default function ProductMeta({ product }: ProductMetaProps) {
  return (
    <div className="space-y-3 p-5">
      <p className="text-sm font-semibold tracking-wide text-cyan-600 uppercase">
        <bdi dir="ltr">{product.brandId}</bdi>
      </p>

      <h3 className="line-clamp-2 text-lg font-bold text-slate-900">
        <bdi dir="ltr">{product.title}</bdi>
      </h3>

      <p className="font-mono text-sm font-medium text-slate-500">
        <bdi dir="ltr">{product.partNumber}</bdi>
      </p>

      <p dir="ltr" className="line-clamp-2 text-sm leading-6 text-slate-600">
        {product.shortDescription}
      </p>

      <div className="flex flex-wrap gap-2 pt-2">
        {product.tags?.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600"
          >
            <bdi dir="ltr">{tag}</bdi>
          </span>
        ))}
      </div>
    </div>
  );
}
