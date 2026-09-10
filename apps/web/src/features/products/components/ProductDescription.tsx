import type { Product } from "@/features/products/types/product.types";
import { useTranslations } from "next-intl";

interface ProductDescriptionProps {
  description?: Product["description"];
}

export default function ProductDescription({
  description,
}: ProductDescriptionProps) {
  const t = useTranslations("Product");

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
        {t("description")}
      </h2>

      <p
        dir="ltr"
        className="mt-4 text-sm leading-7 whitespace-pre-line text-slate-600"
      >
        {description}
      </p>
    </section>
  );
}
