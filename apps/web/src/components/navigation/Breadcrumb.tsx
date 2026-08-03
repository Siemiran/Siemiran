interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({
  items,
}: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-8 text-sm"
    >
      <ol className="flex flex-wrap items-center gap-2 text-slate-500">
        {items.map((item, index) => (
          <li
            key={item.label}
            className="flex items-center gap-2"
          >
            {item.href ? (
              <a
                href={item.href}
                className="transition hover:text-cyan-600"
              >
                {item.label}
              </a>
            ) : (
              <span className="font-medium text-slate-800">
                {item.label}
              </span>
            )}

            {index !== items.length - 1 && (
              <span>/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}