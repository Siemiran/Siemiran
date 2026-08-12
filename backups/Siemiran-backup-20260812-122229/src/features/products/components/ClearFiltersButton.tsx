"use client";

interface Props {
  onClick: () => void;
}

export default function ClearFiltersButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium transition hover:bg-slate-100"
    >
      Clear Filters
    </button>
  );
}
