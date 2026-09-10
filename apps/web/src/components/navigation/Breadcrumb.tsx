import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

interface BreadcrumbItem {
  label: string;
  href?: string;
  technical?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const t = useTranslations("Product");

  return (
    <nav aria-label={t("breadcrumb")} className="mb-8 text-sm">
      <ol className="flex flex-wrap items-center gap-2 text-slate-500">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className="transition hover:text-cyan-600">
                {item.technical ? <bdi dir="ltr">{item.label}</bdi> : item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-slate-800">
                {item.technical ? <bdi dir="ltr">{item.label}</bdi> : item.label}
              </span>
            )}

            {index < items.length - 1 && <span aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
