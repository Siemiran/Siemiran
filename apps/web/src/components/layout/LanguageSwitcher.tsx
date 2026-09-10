"use client";

import { useLocale, useTranslations } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import type { AppLocale } from "@/i18n/routing";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("LanguageSwitcher");
  const nextLocale: AppLocale = locale === "fa" ? "en" : "fa";

  function switchLanguage() {
    router.replace(`${pathname}${window.location.search}`, {
      locale: nextLocale,
    });
  }

  return (
    <button
      type="button"
      onClick={switchLanguage}
      aria-label={`${t("label")}: ${t("switchTo")}`}
      lang={nextLocale}
      dir={nextLocale === "fa" ? "rtl" : "ltr"}
      className="inline-flex h-10 items-center justify-center rounded-xl border border-slate-200 px-3 text-sm font-semibold transition hover:border-cyan-500 hover:text-cyan-600 focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      {t("switchTo")}
    </button>
  );
}
