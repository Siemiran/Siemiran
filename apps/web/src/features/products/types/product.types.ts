import type { ProductDownload } from "./download.types";
export interface Product {
  downloads: ProductDownload[];
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
  images: string[];
  gallery?: string[];

  // ---------- Technical ----------
  specifications?: Record<string, string>;

  // ---------- Documents ----------
  documents?: {
    datasheet?: string;
    manual?: string;
    catalog?: string;
    firmware?: string;
    cad?: string;
    certificates?: string;
  };

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
