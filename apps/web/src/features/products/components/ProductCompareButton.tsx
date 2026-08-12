"use client";

import type { Product } from "../types/product.types";

interface Props {
  product: Product;
  selected: boolean;
  disabled: boolean;
  onAdd: (product: Product) => void;
  onRemove: (productId: string) => void;
}

export default function ProductCompareButton({
  product,
  selected,
  disabled,
  onAdd,
  onRemove,
}: Props) {
  function handleClick() {
    if (selected) {
      onRemove(product.id);
      return;
    }

    if (!disabled) {
      onAdd(product);
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
      {selected ? "Remove from comparison" : "Compare"}
    </button>
  );
}
