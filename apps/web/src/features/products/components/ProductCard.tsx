export default function ProductCard() {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Product Image */}
      <div className="relative aspect-square bg-slate-100">
        <div className="absolute top-4 left-4 rounded-full bg-cyan-600 px-3 py-1 text-xs font-semibold text-white">
          PLC
        </div>

        <div className="absolute top-4 right-4 rounded-full bg-emerald-500 px-3 py-1 text-xs font-semibold text-white">
          In Stock
        </div>

        <div className="flex h-full items-center justify-center text-slate-400">
          Product Image
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-3 p-5">
        <p className="text-sm font-semibold tracking-wide text-cyan-600 uppercase">
          Siemens
        </p>

        <h3 className="line-clamp-2 text-lg font-bold text-slate-900">
          CPU 1214C DC/DC/DC
        </h3>

        <p className="text-sm font-medium text-slate-500">6ES7214-1AG40-0XB0</p>

        <p className="line-clamp-2 text-sm leading-6 text-slate-600">
          Compact PLC designed for small and medium industrial automation
          applications.
        </p>
      </div>

      {/* Actions */}
      <div className="flex border-t border-slate-100">
        <button className="flex-1 py-3 text-sm font-semibold transition hover:bg-slate-50">
          Datasheet
        </button>

        <button className="flex-1 border-x border-slate-100 py-3 text-sm font-semibold transition hover:bg-slate-50">
          Compare
        </button>

        <button className="flex-1 py-3 text-sm font-semibold text-cyan-600 transition hover:bg-cyan-50">
          Inquiry
        </button>
      </div>
    </article>
  );
}
