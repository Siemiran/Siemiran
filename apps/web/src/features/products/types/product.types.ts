export interface Product {
  id: string;

  slug: string;

  title: string;

  shortDescription: string;

  description?: string;

  brandId: string;

  categoryId: string;

  familyId: string;

  seriesId?: string;

  partNumber: string;

  image: string;

  gallery?: string[];

  specifications?: Record<string, string>;

  documents?: {
    datasheet?: string;
    manual?: string;
    catalog?: string;
  };

  compatibility?: string[];

  accessories?: string[];

  tags?: string[];

  lifecycle?: "active" | "legacy" | "discontinued";
}
