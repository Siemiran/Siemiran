import type { Product } from "@/features/products/types/product.types";

interface ProductHeaderProps {
  product: Product;
}

function getLifecycleLabel(lifecycle?: Product["lifecycle"]) {
  switch (lifecycle) {
    case "active":
      return "Active";
    case "legacy":
      return "Legacy";
    case "discontinued":
      return "Discontinued";
    default:
      return null;
  }
}

export default function ProductHeader({ product }: ProductHeaderProps) {
  const lifecycleLabel = getLifecycleLabel(product.lifecycle);

  return (
    <header className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-md bg-cyan-50 px-2.5 py-1 text-xs font-semibold tracking-wide text-cyan-700 uppercase">
          {product.brandId}
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
            {product.inStock ? "In stock" : "Currently unavailable"}
          </span>
        )}
      </div>

      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
          {product.title}
        </h1>

        <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
          {product.shortDescription}
        </p>
      </div>

      <div className="grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-medium tracking-wide text-slate-500 uppercase">
            Part Number
          </dt>

          <dd className="mt-1 font-mono text-sm font-semibold text-slate-900">
            {product.partNumber}
          </dd>
        </div>

        {product.manufacturerPartNumber && (
          <div>
            <dt className="text-xs font-medium tracking-wide text-slate-500 uppercase">
              Manufacturer Part Number
            </dt>

            <dd className="mt-1 font-mono text-sm font-semibold text-slate-900">
              {product.manufacturerPartNumber}
            </dd>
          </div>
        )}

        {product.ean && (
          <div>
            <dt className="text-xs font-medium tracking-wide text-slate-500 uppercase">
              EAN
            </dt>

            <dd className="mt-1 font-mono text-sm text-slate-700">
              {product.ean}
            </dd>
          </div>
        )}

        <div>
          <dt className="text-xs font-medium tracking-wide text-slate-500 uppercase">
            Category
          </dt>

          <dd className="mt-1 text-sm font-medium text-slate-900">
            {product.categoryId}
          </dd>
        </div>

        <div>
          <dt className="text-xs font-medium tracking-wide text-slate-500 uppercase">
            Family
          </dt>

          <dd className="mt-1 text-sm font-medium text-slate-900">
            {product.familyId}
          </dd>
        </div>

        {product.seriesId && (
          <div>
            <dt className="text-xs font-medium tracking-wide text-slate-500 uppercase">
              Series
            </dt>

            <dd className="mt-1 text-sm font-medium text-slate-900">
              {product.seriesId}
            </dd>
          </div>
        )}

        {product.productTypeId && (
          <div>
            <dt className="text-xs font-medium tracking-wide text-slate-500 uppercase">
              Product Type
            </dt>

            <dd className="mt-1 text-sm font-medium text-slate-900">
              {product.productTypeId}
            </dd>
          </div>
        )}
      </div>
    </header>
  );
}
