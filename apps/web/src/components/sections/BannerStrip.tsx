export default function BannerStrip() {
  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-10 px-6 py-5 lg:px-8">

        <span className="text-sm font-semibold tracking-wide text-slate-500">
          <bdi dir="ltr">SIEMENS</bdi>
        </span>

        <span className="text-sm font-semibold tracking-wide text-slate-500">
          <bdi dir="ltr">ABB</bdi>
        </span>

        <span className="text-sm font-semibold tracking-wide text-slate-500">
          <bdi dir="ltr">Schneider</bdi>
        </span>

        <span className="text-sm font-semibold tracking-wide text-slate-500">
          <bdi dir="ltr">Endress+Hauser</bdi>
        </span>

      </div>
    </section>
  );
}
