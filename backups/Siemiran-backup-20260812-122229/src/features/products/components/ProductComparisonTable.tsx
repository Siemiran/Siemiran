import type { Product } from "@/features/products/types/product.types";

interface Props {
  products: Product[];
}

export default function ProductComparisonTable({ products }: Props) {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-3 text-left font-semibold text-slate-700">
              Specification
            </th>

            {products.map((product) => (
              <th
                key={product.id}
                className="min-w-56 px-4 py-3 text-left font-semibold text-slate-900"
              >
                {product.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200 bg-white">
          <tr>
            <td className="px-4 py-3 font-medium text-slate-600">Brand</td>

            {products.map((product) => (
              <td key={product.id} className="px-4 py-3 text-slate-700">
                {product.brandId}
              </td>
            ))}
          </tr>

          <tr>
            <td className="px-4 py-3 font-medium text-slate-600">Category</td>

            {products.map((product) => (
              <td key={product.id} className="px-4 py-3 text-slate-700">
                {product.categoryId}
              </td>
            ))}
          </tr>

          <tr>
            <td className="px-4 py-3 font-medium text-slate-600">Family</td>

            {products.map((product) => (
              <td key={product.id} className="px-4 py-3 text-slate-700">
                {product.familyId}
              </td>
            ))}
          </tr>

          <tr>
            <td className="px-4 py-3 font-medium text-slate-600">Series</td>

            {products.map((product) => (
              <td key={product.id} className="px-4 py-3 text-slate-700">
                {product.seriesId}
              </td>
            ))}
          </tr>

          <tr>
            <td className="px-4 py-3 font-medium text-slate-600">
              Product Type
            </td>

            {products.map((product) => (
              <td key={product.id} className="px-4 py-3 text-slate-700">
                {product.productTypeId}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
