export interface Brand {
  id: string;
  name: string;
  slug: string;
  country?: string;
}

export interface Category {
  id: string;
  title: string;
  slug: string;
}

export interface Family {
  id: string;
  title: string;
  slug: string;

  brandId: string;
  categoryId: string;
}

export interface Series {
  id: string;
  title: string;
  slug: string;

  familyId: string;
}

export interface ProductReference {
  brandId: string;

  categoryId: string;

  familyId: string;

  seriesId?: string;
}
