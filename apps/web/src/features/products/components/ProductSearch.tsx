"use client";

import { Search } from "lucide-react";
import { useTranslations } from "next-intl";

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ProductSearch({
  value,
  onChange,
}: ProductSearchProps) {
  const t = useTranslations("Products");

  return (
    <div className="relative w-full">
      <Search
        className="absolute start-3 top-1/2 -translate-y-1/2 text-slate-400"
        size={18}
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t("search")}
        className="
          w-full
          rounded-xl
          border
          border-slate-300
          bg-white
          py-3
          ps-10
          pe-4
          text-sm
          outline-none
          transition
          focus:border-cyan-600
          focus:ring-2
          focus:ring-cyan-200
        "
      />
    </div>
  );
}
