export interface Product {
  id: string;

  slug: string;

  title: string;

  partNumber: string;

  category: string;

  image: string;

  shortDescription: string;

  description?: string;

  specifications?: Record<string, string>;

  downloads?: {
    title: string;
    url: string;
  }[];

  relatedProducts?: string[];
}
