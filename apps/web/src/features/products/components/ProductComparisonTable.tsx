import type { Product } from "@/features/products/types/product.types";
import { useTranslations } from "next-intl";

interface Props {
  products: Product[];
}

interface ComparisonRow {
  label: string;
  getValue: (product: Product) => string;
}

function normalizeValue(value: string) {
  return value.trim().toLowerCase();
}

function getSpecificationKeys(products: Product[]) {
  const keys = new Set<string>();

  products.forEach((product) => {
    Object.keys(product.specifications ?? {}).forEach((key) => {
      keys.add(key);
    });
  });

  return Array.from(keys).sort((a, b) => a.localeCompare(b));
}

function getSpecificationValue(product: Product, key: string) {
  return product.specifications?.[key] ?? "—";
}

function getArrayValue(value?: string[]) {
  if (!value || value.length === 0) {
    return "—";
  }

  return value.join(", ");
}

function hasDifferentValues(values: string[]) {
  const comparableValues = values.filter((value) => value !== "—");

  if (comparableValues.length <= 1) {
    return false;
  }

  return new Set(comparableValues).size > 1;
}

export default function ProductComparisonTable({ products }: Props) {
  const t = useTranslations("Comparison");
  const productT = useTranslations("Product");

  if (products.length === 0) {
    return null;
  }

  const specificationKeys = getSpecificationKeys(products);
  const baseRows: ComparisonRow[] = [
    {
      label: productT("partNumber"),
      getValue: (product) => product.partNumber,
    },
    {
      label: productT("manufacturerPartNumber"),
      getValue: (product) => product.manufacturerPartNumber ?? "—",
    },
    {
      label: productT("ean"),
      getValue: (product) => product.ean ?? "—",
    },
    {
      label: t("brand"),
      getValue: (product) => product.brandId,
    },
    {
      label: productT("category"),
      getValue: (product) => product.categoryId,
    },
    {
      label: productT("family"),
      getValue: (product) => product.familyId,
    },
    {
      label: productT("series"),
      getValue: (product) => product.seriesId ?? "—",
    },
    {
      label: productT("productType"),
      getValue: (product) => product.productTypeId ?? "—",
    },
    {
      label: t("lifecycle"),
      getValue: (product) =>
        product.lifecycle ? productT(product.lifecycle) : "—",
    },
    {
      label: t("availability"),
      getValue: (product) => {
        if (product.inStock === undefined) return "—";
        return product.inStock ? productT("inStock") : t("outOfStock");
      },
    },
    {
      label: t("featured"),
      getValue: (product) => {
        if (product.featured === undefined) return "—";
        return product.featured ? t("yes") : t("no");
      },
    },
    { label: t("tags"), getValue: (product) => getArrayValue(product.tags) },
    {
      label: t("compatibility"),
      getValue: (product) => getArrayValue(product.compatibility),
    },
    {
      label: productT("accessories"),
      getValue: (product) => getArrayValue(product.accessories),
    },
    {
      label: t("relatedProducts"),
      getValue: (product) => getArrayValue(product.relatedProducts),
    },
    {
      label: productT("replacementProduct"),
      getValue: (product) => product.replacementProduct ?? "—",
    },
  ];

  const rows: ComparisonRow[] = [
    ...baseRows,
    ...specificationKeys.map((key): ComparisonRow => ({
      label: key,
      getValue: (product) => getSpecificationValue(product, key),
    })),
  ];

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr className="bg-slate-50">
            <th
              scope="col"
              className="sticky start-0 z-10 min-w-52 border-e border-b border-slate-200 bg-slate-50 px-4 py-4 text-start font-semibold text-slate-700"
            >
              {t("specification")}
            </th>

            {products.map((product) => (
              <th
                key={product.id}
                scope="col"
                className="min-w-64 border-b border-slate-200 px-4 py-4 text-start align-top"
              >
                <div className="font-semibold text-slate-900">
                  <bdi dir="ltr">{product.title}</bdi>
                </div>

                <div className="mt-1 text-xs font-normal text-slate-500">
                  <bdi dir="ltr">{product.partNumber}</bdi>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, rowIndex) => {
            const values = products.map((product) => row.getValue(product));

            const normalizedValues = values.map(normalizeValue);

            const different = hasDifferentValues(normalizedValues);

            return (
              <tr
                key={row.label}
                className={rowIndex % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
              >
                <th
                  scope="row"
                  className="sticky start-0 z-1 min-w-52 border-e border-b border-slate-200 bg-inherit px-4 py-3 text-start font-medium text-slate-600"
                >
                  {row.label}
                </th>

                {values.map((value, index) => {
                  const isMissing = value === "—";

                  const isDifferent = different && !isMissing;

                  return (
                    <td
                      key={`${products[index].id}-${row.label}`}
                      className={[
                        "min-w-64 border-b border-slate-200 px-4 py-3 align-top",
                        isDifferent
                          ? "bg-amber-50 font-semibold text-amber-900"
                          : "text-slate-700",
                        isMissing ? "text-slate-400" : "",
                      ].join(" ")}
                    >
                      <bdi
                        dir="auto"
                        className="wrap-break-words whitespace-pre-wrap"
                      >
                        {value}
                      </bdi>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
