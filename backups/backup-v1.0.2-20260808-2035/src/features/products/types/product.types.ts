import type { ProductDownload } from "./download.types";

export interface Product {
  // ---------- Identity ----------
  id: string;
  slug: string;

  title: string;
  shortDescription: string;
  description?: string;

  // ---------- Taxonomy ----------
  brandId: string;
  categoryId: string;
  familyId: string;
  seriesId?: string;
  productTypeId?: string;

  // ---------- Manufacturer ----------
  partNumber: string;
  manufacturerPartNumber?: string;
  ean?: string;

  // ---------- Media ----------
  images: [string, ...string[]];

  // ---------- Technical ----------
  specifications?: Record<string, string>;

  // ---------- Downloads ----------
  downloads: ProductDownload[];

  // ---------- Relations ----------
  compatibility?: string[];
  accessories?: string[];
  relatedProducts?: string[];
  replacementProduct?: string;

  // ---------- Classification ----------
  tags?: string[];

  lifecycle?: "active" | "legacy" | "discontinued";

  // ---------- Commercial ----------
  inStock?: boolean;
  featured?: boolean;

  // ---------- SEO ----------
  seoTitle?: string;
  seoDescription?: string;

  // ---------- External ----------
  siemensUrl?: string;
}