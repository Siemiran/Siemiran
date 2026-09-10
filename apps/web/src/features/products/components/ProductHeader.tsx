import type { Product } from "@/features/products/types/product.types";
import { useTranslations } from "next-intl";

interface ProductHeaderProps {
  product: Product;
}

export default function ProductHeader({ product }: ProductHeaderProps) {
  const t = useTranslations("Product");
  const lifecycleLabel = product.lifecycle ? t(product.lifecycle) : null;

  return (
    <header className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-md bg-cyan-50 px-2.5 py-1 text-xs font-semibold tracking-wide text-cyan-700 uppercase">
          <bdi dir="ltr">{product.brandId}</bdi>
        </span>

        {lifecycleLabel && (
          <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
            {lifecycleLabel}
          </span>
        )}

        {product.inStock !== undefined && (
          <span
            className={
              product.inStock
                ? "rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700"
                : "rounded-md bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700"
            }
          >
            {product.inStock ? t("inStock") : t("unavailable")}
          </span>
        )}
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          <bdi dir="ltr">{product.title}</bdi>
        </h1>

        <p
          dir="auto"
          className="mt-3 max-w-3xl text-base leading-7 text-slate-600"
        >
          {product.shortDescription}
        </p>
      </div>

      <div className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-medium tracking-wide text-slate-500 uppercase">
            {t("partNumber")}
          </dt>

          <dd className="mt-1 font-mono text-sm font-semibold text-slate-900">
            <bdi dir="ltr">{product.partNumber}</bdi>
          </dd>
        </div>

        {product.manufacturerPartNumber && (
          <div>
            <dt className="text-xs font-medium tracking-wide text-slate-500 uppercase">
              {t("manufacturerPartNumber")}
            </dt>

            <dd className="mt-1 font-mono text-sm font-semibold text-slate-900">
              <bdi dir="ltr">{product.manufacturerPartNumber}</bdi>
            </dd>
          </div>
        )}

        {product.ean && (
          <div>
            <dt className="text-xs font-medium tracking-wide text-slate-500 uppercase">
              {t("ean")}
            </dt>

            <dd className="mt-1 font-mono text-sm text-slate-700">
              <bdi dir="ltr">{product.ean}</bdi>
            </dd>
          </div>
        )}

        <div>
          <dt className="text-xs font-medium tracking-wide text-slate-500 uppercase">
            {t("category")}
          </dt>

          <dd className="mt-1 text-sm font-medium text-slate-900">
            <bdi dir="ltr">{product.categoryId}</bdi>
          </dd>
        </div>

        <div>
          <dt className="text-xs font-medium tracking-wide text-slate-500 uppercase">
            {t("family")}
          </dt>

          <dd className="mt-1 text-sm font-medium text-slate-900">
            <bdi dir="ltr">{product.familyId}</bdi>
          </dd>
        </div>

        {product.seriesId && (
          <div>
            <dt className="text-xs font-medium tracking-wide text-slate-500 uppercase">
              {t("series")}
            </dt>

            <dd className="mt-1 text-sm font-medium text-slate-900">
              <bdi dir="ltr">{product.seriesId}</bdi>
            </dd>
          </div>
        )}

        {product.productTypeId && (
          <div>
            <dt className="text-xs font-medium tracking-wide text-slate-500 uppercase">
              {t("productType")}
            </dt>

            <dd className="mt-1 text-sm font-medium text-slate-900">
              <bdi dir="ltr">{product.productTypeId}</bdi>
            </dd>
          </div>
        )}
      </div>
    </header>
  );
}
