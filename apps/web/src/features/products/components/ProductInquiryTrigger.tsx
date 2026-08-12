"use client";

import { useState } from "react";

import type { Product } from "@/features/products/types/product.types";
import ProductInquiry from "./ProductInquiry";

interface ProductInquiryTriggerProps {
  product: Product;
}

export default function ProductInquiryTrigger({
  product,
}: ProductInquiryTriggerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:outline-none"
      >
        Inquiry
      </button>

      {open && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/50 px-4 py-8">
          <div className="mx-auto flex min-h-full max-w-2xl items-center justify-center">
            <ProductInquiry product={product} onClose={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
