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
          id: "S7-1200",
          title: "S7-1200",
          slug: "s7-1200",
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
            {
              id: "Power Module",
              title: "Power Module",
              slug: "power-module",
              variants: [
                {
                  id: "pm-1207",
                  title: "PM 1207",
                  slug: "pm-1207",
                },
              ],
            },
          ],
        },
        {
          id: "S7-1200 G2",
          title: "S7-1200 G2",
          slug: "s7-1200-g2",
          productTypes: [
            {
              id: "Power Module",
              title: "Power Module",
              slug: "power-module",
              variants: [
                {
                  id: "pm-1207",
                  title: "PM 1207",
                  slug: "pm-1207",
                },
                {
                  id: "pm-1207-ex",
                  title: "PM 1207 EX",
                  slug: "pm-1207-ex",
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
                  id: "fail-safe",
                  title: "Fail-safe",
                  slug: "fail-safe",
                },
                {
                  id: "technology",
                  title: "Technology",
                  slug: "technology",
                },
                {
                  id: "siplus",
                  title: "SIPLUS",
                  slug: "siplus",
                },
              ],
            },
            {
              id: "Power Supply",
              title: "Power Supply",
              slug: "power-supply",
              variants: [
                {
                  id: "ps-305",
                  title: "PS 305",
                  slug: "ps-305",
                },
                {
                  id: "ps-307",
                  title: "PS 307",
                  slug: "ps-307",
                },
                {
                  id: "ps-307-outdoor",
                  title: "PS 307 Outdoor",
                  slug: "ps-307-outdoor",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
} satisfies SiemensVerifiedTaxonomy;
