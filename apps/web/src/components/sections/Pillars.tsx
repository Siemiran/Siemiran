import { useTranslations } from "next-intl";

export default function Pillars() {
  const t = useTranslations("Home");
  const items = [
    {
      title: t("automationTitle"),
      desc: t("automationDescription"),
    },
    {
      title: t("electricalTitle"),
      desc: t("electricalDescription"),
    },
    {
      title: t("instrumentationTitle"),
      desc: t("instrumentationDescription"),
    },
  ];

  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-14 text-center">
          <h2 className="text-4xl font-bold text-slate-900">
            {t("expertiseTitle")}
          </h2>

          <p className="mt-4 text-slate-500">
            {t("expertiseDescription")}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {" "}
          {items.map((item) => (
            <div
              key={item.title}
              className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-cyan-300 hover:shadow-2xl"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-sky-600 text-3xl text-white shadow-lg">
                ⚙️
              </div>

              <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>

              <p className="mt-3 text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
