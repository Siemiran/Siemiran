import type { ProductListItemViewModel } from "@/features/products/copy/product-copy.public-types";
import { useTranslations } from "next-intl";

interface Props {
  products: readonly ProductListItemViewModel[];
}

interface ComparisonRow {
  label: string;
  getValue: (item: ProductListItemViewModel) => string;
}

function normalizeValue(value: string) {
  return value.trim().toLowerCase();
}

function getSpecificationKeys(products: readonly ProductListItemViewModel[]) {
  const keys = new Set<string>();

  products.forEach((item) => {
    Object.keys(item.product.specifications ?? {}).forEach((key) => {
      keys.add(key);
    });
  });

  return Array.from(keys).sort((a, b) => a.localeCompare(b));
}

function getSpecificationValue(item: ProductListItemViewModel, key: string) {
  return item.product.specifications?.[key] ?? "—";
}

function getArrayValue(value?: readonly string[]) {
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
      getValue: (item) => item.product.partNumber,
    },
    {
      label: productT("manufacturerPartNumber"),
      getValue: (item) => item.product.manufacturerPartNumber ?? "—",
    },
    {
      label: productT("ean"),
      getValue: (item) => item.product.ean ?? "—",
    },
    {
      label: t("brand"),
      getValue: (item) => item.product.brandId,
    },
    {
      label: productT("category"),
      getValue: (item) => item.product.categoryId,
    },
    {
      label: productT("family"),
      getValue: (item) => item.product.familyId,
    },
    {
      label: productT("series"),
      getValue: (item) => item.product.seriesId ?? "—",
    },
    {
      label: productT("productType"),
      getValue: (item) => item.product.productTypeId ?? "—",
    },
    {
      label: t("lifecycle"),
      getValue: (item) =>
        item.product.lifecycle ? productT(item.product.lifecycle) : "—",
    },
    {
      label: t("availability"),
      getValue: (item) => {
        if (item.product.inStock === undefined) return "—";
        return item.product.inStock ? productT("inStock") : t("outOfStock");
      },
    },
    {
      label: t("featured"),
      getValue: (item) => {
        if (item.product.featured === undefined) return "—";
        return item.product.featured ? t("yes") : t("no");
      },
    },
    {
      label: t("tags"),
      getValue: (item) => getArrayValue(item.product.tags),
    },
    {
      label: t("compatibility"),
      getValue: (item) => getArrayValue(item.product.compatibility),
    },
    {
      label: productT("accessories"),
      getValue: (item) => getArrayValue(item.product.accessories),
    },
    {
      label: t("relatedProducts"),
      getValue: (item) => getArrayValue(item.product.relatedProducts),
    },
    {
      label: productT("replacementProduct"),
      getValue: (item) => item.product.replacementProduct ?? "—",
    },
  ];

  const rows: ComparisonRow[] = [
    ...baseRows,
    ...specificationKeys.map((key): ComparisonRow => ({
      label: key,
      getValue: (item) => getSpecificationValue(item, key),
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

            {products.map((item) => (
              <th
                key={item.product.id}
                scope="col"
                className="min-w-64 border-b border-slate-200 px-4 py-4 text-start align-top"
              >
                <div className="font-semibold text-slate-900">
                  <bdi dir="ltr">{item.product.title}</bdi>
                </div>

                <div className="mt-1 text-xs font-normal text-slate-500">
                  <bdi dir="ltr">{item.product.partNumber}</bdi>
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, rowIndex) => {
            const values = products.map((item) => row.getValue(item));

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
                      key={`${products[index].product.id}-${row.label}`}
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
