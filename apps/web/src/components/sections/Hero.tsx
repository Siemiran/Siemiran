export default function Hero() {
  const brands = [
  "Siemens",
  "ABB",
  "Schneider",
  "Endress+Hauser",
];
    return (
<section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-white via-slate-50 to-white">      <div className="absolute inset-0 opacity-30">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,156,222,.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,156,222,.08) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

<div className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-6 py-16 lg:px-8"><div className="grid w-full items-center gap-16 lg:grid-cols-[1.1fr_.9fr]">
          {/* Text */}
          <div className="flex flex-col justify-center">

            <span className="mb-4 text-sm font-medium tracking-widest text-cyan-500 uppercase">
              Industrial Automation · Instrumentation · Control
            </span>

<h1 className="max-w-3xl text-5xl font-extrabold leading-[1.1] tracking-tight text-slate-900 lg:text-7xl">              Every link in your
              <span className="text-[#00B8D9]"> automation </span>
              chain
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-9 text-slate-600">
              Siemiran supplies industrial automation, low and medium voltage
electrical equipment, and precision instrumentation from
Siemens, ABB, Schneider Electric, Endress+Hauser and Emerson
for projects where reliability is critical.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="rounded-xl bg-[#009CDE] px-8 py-4 font-semibold text-white transition hover:bg-[#0087c2]">
                Browse Products
              </button>

              <button className="rounded-xl border border-slate-300 px-8 py-4 font-semibold transition hover:bg-slate-100">
                Request Quote
              </button>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
  {brands.map((brand) => (
    <div
      key={brand}
      className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition hover:border-cyan-400 hover:shadow-md"
    >
      {brand}
    </div>
  ))}
</div>
          </div>

          {/* Right Side Placeholder */}
          <div className="flex items-center justify-center">

            <div className="flex h-[420px] w-[420px] items-center justify-center rounded-3xl border border-cyan-100 bg-gradient-to-br from-cyan-50 to-white shadow-xl">

              <span className="text-2xl font-bold text-cyan-600">
<div className="relative mx-auto flex h-[460px] w-full max-w-[460px] items-center justify-center">
<div className="absolute h-[420px] w-[420px] rounded-full bg-gradient-to-br from-cyan-200/70 via-sky-100/50 to-transparent blur-3xl" />
<div className="relative flex h-[380px] w-[380px] items-center justify-center rounded-[32px] border border-cyan-100 bg-white shadow-[0_25px_80px_rgba(0,0,0,.12)]">
    <div className="text-center">

<div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-cyan-500 to-sky-600 text-5xl text-white shadow-xl">
  ⚙️
</div>
      <h3 className="text-2xl font-bold text-slate-800">
        Siemens PLC
      </h3>

      <p className="mt-3 text-slate-500">
        S7-1200 • S7-1500
      </p>

    </div>

  </div>

</div>
              </span>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}