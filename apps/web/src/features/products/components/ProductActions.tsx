import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import type { ProductListItemViewModel } from "@/features/products/copy/product-copy.public-types";

interface ProductActionsProps {
  item: ProductListItemViewModel;
}

export default function ProductActions({ item }: ProductActionsProps) {
  const t = useTranslations("Products");
  const { product } = item;
  const datasheet = product.downloads.find(
    (download) => download.type === "datasheet"
  );

  return (
    <div className="flex border-t border-slate-100">
      {datasheet ? (
        <a
          href={datasheet.file}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 text-center text-sm font-semibold transition hover:bg-slate-50"
        >
          {t("datasheet")}
        </a>
      ) : (
        <span
          aria-disabled="true"
          className="flex-1 cursor-not-allowed py-3 text-center text-sm font-semibold text-slate-400"
        >
          {t("datasheet")}
        </span>
      )}

      <Link
        href={`/products/${product.slug}`}
        className="flex-1 border-x border-slate-100 py-3 text-center text-sm font-semibold transition hover:bg-slate-50"
      >
        {t("details")}
      </Link>

      <button
        type="button"
        className="flex-1 py-3 text-sm font-semibold text-cyan-600 transition hover:bg-cyan-50"
      >
        {t("inquiry")}
      </button>
    </div>
  );
}
