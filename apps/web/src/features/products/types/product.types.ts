export interface Product {
  // Identity
  id: string;
  slug: string;

  // Main
  title: string;
  shortDescription: string;
  description?: string;

  // Classification
  category: string;
  subCategory?: string;
  brand: string;

  // Siemens
  partNumber: string;
  series?: string;

  // Pricing
  price?: number;
  currency?: "IRR" | "USD";
  stock?: "in-stock" | "out-of-stock" | "inquiry";

  // Media
  image: string;
  gallery?: string[];

  // Technical
  specifications?: Record<string, string>;

  // Documents
  datasheet?: string;
  catalog?: string;

  // SEO
  metaTitle?: string;
  metaDescription?: string;

  // Status
  featured?: boolean;
  published?: boolean;
}
