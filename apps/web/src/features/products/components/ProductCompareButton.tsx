"use client";

import type { ProductListItemViewModel } from "../copy/product-copy.public-types";
import { useTranslations } from "next-intl";

interface Props {
  item: ProductListItemViewModel;
  selected: boolean;
  disabled: boolean;
  onAdd: (productId: string) => void;
  onRemove: (productId: string) => void;
}

export default function ProductCompareButton({
  item,
  selected,
  disabled,
  onAdd,
  onRemove,
}: Props) {
  const t = useTranslations("Comparison");
  const { product } = item;

  function handleClick() {
    if (selected) {
      onRemove(product.id);
      return;
    }

    if (!disabled) {
      onAdd(product.id);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={!selected && disabled}
      aria-pressed={selected}
      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {selected ? t("removeButton") : t("compare")}
    </button>
  );
}
