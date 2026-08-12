import type { Product } from "@/features/products/types/product.types";

interface ProductDescriptionProps {
  description?: Product["description"];
}

export default function ProductDescription({
  description,
}: ProductDescriptionProps) {
  if (!description?.trim()) {
    return null;
  }

  return (
    <section
      aria-labelledby="product-description-title"
      className="rounded-xl border border-slate-200 bg-white p-6"
    >
      <h2
        id="product-description-title"
        className="text-xl font-bold text-slate-900"
      >
        Product Description
      </h2>

      <p className="mt-4 text-sm leading-7 whitespace-pre-line text-slate-600">
        {description}
      </p>
    </section>
  );
}
