import { notFound } from "next/navigation";
import { getProductBySlug } from "@/features/products/repository/product.repository";
interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const product = getProductBySlug(slug);
  if (!product) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="aspect-square rounded-2xl bg-slate-100 p-10">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold tracking-wider text-cyan-600 uppercase">
              Siemens
            </p>

            <h1 className="mt-2 text-4xl font-bold">{product.title}</h1>

            <p className="mt-2 font-mono text-slate-500">
              {product.partNumber}
            </p>
          </div>

          <p className="leading-8 text-slate-700">{product.shortDescription}</p>

          <div className="rounded-xl border border-slate-200 p-5">
            <h2 className="mb-4 font-semibold">Specifications</h2>

            <div className="space-y-3">
              {product.specifications &&
                Object.entries(product.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between border-b border-slate-100 pb-2"
                  >
                    <span className="font-medium text-slate-500">{key}</span>

                    <span>{value}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
