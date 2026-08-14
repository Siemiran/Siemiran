export interface SiemensVerifiedVariant {
  id: string;
  title: string;
  slug: string;
}

export interface SiemensVerifiedProductType {
  id: string;
  title: string;
  slug: string;
  variants: readonly SiemensVerifiedVariant[];
}

export interface SiemensVerifiedSeries {
  id: string;
  title: string;
  slug: string;
  productTypes: readonly SiemensVerifiedProductType[];
}

export interface SiemensVerifiedFamily {
  id: string;
  title: string;
  slug: string;
  series: readonly SiemensVerifiedSeries[];
}

export interface SiemensVerifiedTaxonomy {
  PLC: readonly SiemensVerifiedFamily[];
}

export const siemensVerifiedTaxonomy = {
  PLC: [
    {
      id: "S7-1200",
      title: "SIMATIC S7-1200",
      slug: "s7-1200",
      series: [
        {
          id: "CPU",
          title: "CPU",
          slug: "cpu",
          productTypes: [
            {
              id: "CPU",
              title: "CPU",
              slug: "cpu",
              variants: [
                {
                  id: "compact",
                  title: "Compact",
                  slug: "compact",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "S7-300",
      title: "SIMATIC S7-300",
      slug: "s7-300",
      series: [
        {
          id: "S7-300",
          title: "S7-300",
          slug: "s7-300",
          productTypes: [
            {
              id: "CPU",
              title: "CPU",
              slug: "cpu",
              variants: [
                {
                  id: "standard",
                  title: "Standard",
                  slug: "standard",
                },
                {
                  id: "compact",
                  title: "Compact",
                  slug: "compact",
                },
                {
                  id: "siplus",
                  title: "SIPLUS",
                  slug: "siplus",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
} satisfies SiemensVerifiedTaxonomy;
