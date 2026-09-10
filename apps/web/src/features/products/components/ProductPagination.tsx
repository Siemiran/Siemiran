"use client";

import { useTranslations } from "next-intl";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function ProductPagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  const t = useTranslations("Products");

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label={t("pagination")}
      className="mt-10 flex items-center justify-center gap-2"
    >
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {t("previous")}
      </button>

      <span className="px-3 text-sm text-slate-600">
        {t("page", { current: currentPage, total: totalPages })}
      </span>

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {t("next")}
      </button>
    </nav>
  );
}
