import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import type { Product } from "@/features/products/types/product.types";

interface ProductRelationsProps {
  compatibility: Product[];
  accessories: Product[];
  replacementProduct?: Product;
}

function ProductList({ title, products }: { title: string; products: Product[] }) {
  if (products.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      <div className="mt-3 divide-y divide-slate-200 rounded-xl border border-slate-200">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="flex items-center justify-between gap-4 p-4 transition hover:bg-slate-50"
          >
            <div className="min-w-0" dir="ltr">
              <p className="truncate text-sm font-semibold text-slate-900">
                <bdi dir="ltr">{product.title}</bdi>
              </p>
              <p className="mt-1 font-mono text-xs text-slate-500">
                <bdi dir="ltr">{product.partNumber}</bdi>
              </p>
            </div>
            <span aria-hidden="true" className="shrink-0 text-slate-400">
              →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function ProductRelations({
  compatibility,
  accessories,
  replacementProduct,
}: ProductRelationsProps) {
  const t = useTranslations("Product");
  const hasRelations =
    compatibility.length > 0 ||
    accessories.length > 0 ||
    Boolean(replacementProduct);

  if (!hasRelations) {
    return null;
  }

  return (
    <section
      aria-labelledby="product-relations-title"
      className="rounded-xl border border-slate-200 bg-slate-50 p-6"
    >
      <div className="mb-6">
        <h2 id="product-relations-title" className="text-xl font-bold text-slate-900">
          {t("relations")}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          {t("relationsDescription")}
        </p>
      </div>

      <div className="space-y-6">
        <ProductList title={t("compatibleProducts")} products={compatibility} />
        <ProductList title={t("accessories")} products={accessories} />

        {replacementProduct && (
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              {t("replacementProduct")}
            </h3>
            <Link
              href={`/products/${replacementProduct.slug}`}
              className="mt-3 block rounded-xl border border-slate-200 bg-white p-4 transition hover:bg-slate-50"
            >
              <p className="text-sm font-semibold text-slate-900">
                <bdi dir="ltr">{replacementProduct.title}</bdi>
              </p>
              <p className="mt-1 font-mono text-xs text-slate-500">
                <bdi dir="ltr">{replacementProduct.partNumber}</bdi>
              </p>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
