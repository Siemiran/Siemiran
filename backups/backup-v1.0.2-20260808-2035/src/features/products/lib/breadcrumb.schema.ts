export interface BreadcrumbItem {
  label: string;
  href: string;
}

export function createBreadcrumbSchema(
  items: BreadcrumbItem[],
  siteUrl = "https://siemiran.com"
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",

    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${siteUrl}${item.href}`,
    })),
  };
}
