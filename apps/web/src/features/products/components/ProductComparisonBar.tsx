"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

import type { Product } from "../types/product.types";

interface Props {
  products: Product[];
  maxProducts: number;
  onRemove: (productId: string) => void;
  onClear: () => void;
}

export default function ProductComparisonBar({
  products,
  maxProducts,
  onRemove,
  onClear,
}: Props) {
  const t = useTranslations("Comparison");

  if (products.length === 0) {
    return null;
  }

  return (
    <aside
      aria-label={t("regionLabel")}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4">
        <div className="min-w-0 flex-1">
          <div className="mb-2 text-sm font-semibold text-slate-900">
            {t("compareProductsLower")}
          </div>

          <div className="flex flex-wrap gap-2">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700"
              >
                <span className="max-w-48 truncate">
                  <bdi dir="ltr">{product.title}</bdi>
                </span>

                <button
                  type="button"
                  onClick={() => onRemove(product.id)}
                  aria-label={t("remove", { product: product.title })}
                  className="font-bold text-slate-500 transition hover:text-slate-900"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden text-sm text-slate-500 sm:block">
          {products.length}/{maxProducts}
        </div>

        <button
          type="button"
          onClick={onClear}
          className="shrink-0 rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          {t("clear")}
        </button>

        <Link
          href="/products/compare"
          className="shrink-0 rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
        >
          {t("compare")}
        </Link>
      </div>
    </aside>
  );
}
