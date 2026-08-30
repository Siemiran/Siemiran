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
              id: "CPU",
              title: "CPU",
              slug: "cpu",
              variants: [
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
              ],
            },
            {
              id: "Signal Board",
              title: "Signal Board",
              slug: "signal-board",
              variants: [
                {
                  id: "sb1221-di8-24vdc",
                  title: "SB 1221 DI8 24 V DC",
                  slug: "sb1221-di8-24vdc",
                },
                {
                  id: "sb1222-dq8-24vdc",
                  title: "SB 1222 DQ8 24 V DC",
                  slug: "sb1222-dq8-24vdc",
                },
                {
                  id: "sb1223-di4-dq4-24vdc",
                  title: "SB 1223 DI4 / DQ4 24 V DC",
                  slug: "sb1223-di4-dq4-24vdc",
                },
                {
                  id: "sb1223-di4-dq4-5vdc",
                  title: "SB 1223 DI4 / DQ4 5 V DC",
                  slug: "sb1223-di4-dq4-5vdc",
                },
                {
                  id: "sb1231-ai4",
                  title: "SB 1231 AI4",
                  slug: "sb1231-ai4",
                },
                {
                  id: "sb1231-rtd-ai2",
                  title: "SB 1231 RTD AI2",
                  slug: "sb1231-rtd-ai2",
                },
                {
                  id: "sb1231-tc-ai4",
                  title: "SB 1231 TC AI4",
                  slug: "sb1231-tc-ai4",
                },
                {
                  id: "sb1232-ao4",
                  title: "SB 1232 AO4",
                  slug: "sb1232-ao4",
                },
                {
                  id: "sb1233-ai2-ao2",
                  title: "SB 1233 AI2 / AO2",
                  slug: "sb1233-ai2-ao2",
                },
              ],
            },
            {
              id: "Signal Module",
              title: "Signal Module",
              slug: "signal-module",
              variants: [
                {
                  id: "digital-output",
                  title: "Digital Output",
                  slug: "digital-output",
                },
                {
                  id: "digital-io",
                  title: "Digital I/O",
                  slug: "digital-io",
                },
                {
                  id: "analog-input",
                  title: "Analog Input",
                  slug: "analog-input",
                },
                {
                  id: "analog-output",
                  title: "Analog Output",
                  slug: "analog-output",
                },
                {
                  id: "analog-io",
                  title: "Analog I/O",
                  slug: "analog-io",
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
