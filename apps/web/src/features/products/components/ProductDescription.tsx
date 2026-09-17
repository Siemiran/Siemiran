import { ProductCopyBlock } from "@/features/products/copy/ProductCopyText";
import type { ResolvedProductCopy } from "@/features/products/copy/product-copy.types";
import { useTranslations } from "next-intl";

interface ProductDescriptionProps {
  copy: Readonly<ResolvedProductCopy>;
}

export default function ProductDescription({ copy }: ProductDescriptionProps) {
  const t = useTranslations("Product");

  if (copy.description.length === 0) {
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

      <ProductCopyBlock
        copy={copy}
        field="description"
        className="mt-4"
        paragraphClassName="text-sm leading-7 whitespace-pre-line text-slate-600"
      />
    </section>
  );
}
