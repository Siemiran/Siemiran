"use client";

interface Props {
  category: string;
  family: string;
  series: string;
  productType: string;

  onClearCategory: () => void;
  onClearFamily: () => void;
  onClearSeries: () => void;
  onClearProductType: () => void;
}

export default function ActiveFilters({
  category,
  family,
  series,
  productType,

  onClearCategory,
  onClearFamily,
  onClearSeries,
  onClearProductType,
}: Props) {
  const hasFilters =
    category !== "all" ||
    family !== "all" ||
    series !== "all" ||
    productType !== "all";

  if (!hasFilters) return null;

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {category !== "all" && (
        <button
          onClick={onClearCategory}
          className="rounded-full bg-cyan-100 px-3 py-1 text-sm text-cyan-700"
        >
          {category} ✕
        </button>
      )}

      {family !== "all" && (
        <button
          onClick={onClearFamily}
          className="rounded-full bg-cyan-100 px-3 py-1 text-sm text-cyan-700"
        >
          {family} ✕
        </button>
      )}

      {series !== "all" && (
        <button
          onClick={onClearSeries}
          className="rounded-full bg-cyan-100 px-3 py-1 text-sm text-cyan-700"
        >
          {series} ✕
        </button>
      )}

      {productType !== "all" && (
        <button
          onClick={onClearProductType}
          className="rounded-full bg-cyan-100 px-3 py-1 text-sm text-cyan-700"
        >
          {productType} ✕
        </button>
      )}
    </div>
  );
}
