import type { Product } from "@/features/products/types/product.types";

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

const baseRows: ComparisonRow[] = [
  {
    label: "Part Number",
    getValue: (product) => product.partNumber,
  },
  {
    label: "Manufacturer Part Number",
    getValue: (product) => product.manufacturerPartNumber ?? "—",
  },
  {
    label: "EAN",
    getValue: (product) => product.ean ?? "—",
  },
  {
    label: "Brand",
    getValue: (product) => product.brandId,
  },
  {
    label: "Category",
    getValue: (product) => product.categoryId,
  },
  {
    label: "Family",
    getValue: (product) => product.familyId,
  },
  {
    label: "Series",
    getValue: (product) => product.seriesId ?? "—",
  },
  {
    label: "Product Type",
    getValue: (product) => product.productTypeId ?? "—",
  },
  {
    label: "Lifecycle",
    getValue: (product) => product.lifecycle ?? "—",
  },
  {
    label: "Availability",
    getValue: (product) => {
      if (product.inStock === undefined) {
        return "—";
      }

      return product.inStock ? "In stock" : "Out of stock";
    },
  },
  {
    label: "Featured",
    getValue: (product) => {
      if (product.featured === undefined) {
        return "—";
      }

      return product.featured ? "Yes" : "No";
    },
  },
  {
    label: "Tags",
    getValue: (product) => getArrayValue(product.tags),
  },
  {
    label: "Compatibility",
    getValue: (product) => getArrayValue(product.compatibility),
  },
  {
    label: "Accessories",
    getValue: (product) => getArrayValue(product.accessories),
  },
  {
    label: "Related Products",
    getValue: (product) => getArrayValue(product.relatedProducts),
  },
  {
    label: "Replacement Product",
    getValue: (product) => product.replacementProduct ?? "—",
  },
];

export default function ProductComparisonTable({ products }: Props) {
  if (products.length === 0) {
    return null;
  }

  const specificationKeys = getSpecificationKeys(products);

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
              className="sticky left-0 z-10 min-w-52 border-r border-b border-slate-200 bg-slate-50 px-4 py-4 text-left font-semibold text-slate-700"
            >
              Specification
            </th>

            {products.map((product) => (
              <th
                key={product.id}
                scope="col"
                className="min-w-64 border-b border-slate-200 px-4 py-4 text-left align-top"
              >
                <div className="font-semibold text-slate-900">
                  {product.title}
                </div>

                <div className="mt-1 text-xs font-normal text-slate-500">
                  {product.partNumber}
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
                  className="sticky left-0 z-1 min-w-52 border-r border-b border-slate-200 bg-inherit px-4 py-3 text-left font-medium text-slate-600"
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
                      <span className="wrap-break-words whitespace-pre-wrap">
                        {value}
                      </span>
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
