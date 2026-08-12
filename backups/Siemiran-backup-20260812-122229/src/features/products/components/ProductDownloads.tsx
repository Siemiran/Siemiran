import type { ProductDownload } from "../types/download.types";

interface Props {
  downloads: ProductDownload[];
}

const icons: Record<ProductDownload["type"], string> = {
  datasheet: "📄",
  manual: "📘",
  firmware: "💾",
  certificate: "✅",
  software: "🧩",
  cad: "📐",
};

export default function ProductDownloads({ downloads }: Props) {
  if (downloads.length === 0) {
    return null;
  }

  return (
    <section className="mt-14">
      <h2 className="mb-6 text-3xl font-bold text-slate-900">Downloads</h2>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {downloads.map((download) => (
          <a
            key={download.id}
            href={download.file}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between border-b border-slate-200 p-6 transition last:border-b-0 hover:bg-slate-50"
          >
            <div className="flex items-center gap-5">
              <div className="text-3xl">{icons[download.type]}</div>

              <div>
                <div className="font-semibold text-slate-900">
                  {download.title}
                </div>

                <div className="mt-1 text-sm text-slate-500">
                  {download.language} • {download.size}
                </div>
              </div>
            </div>

            <span className="font-medium text-cyan-600">Download →</span>
          </a>
        ))}
      </div>
    </section>
  );
}
