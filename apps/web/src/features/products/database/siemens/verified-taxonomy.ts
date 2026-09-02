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
                {
                  id: "fail-safe",
                  title: "Fail-safe",
                  slug: "fail-safe",
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
            {
              id: "Signal Module",
              title: "Signal Module",
              slug: "signal-module",
              variants: [
                {
                  id: "digital-input",
                  title: "Digital Input",
                  slug: "digital-input",
                },
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
                  id: "fail-safe-input",
                  title: "Fail-safe Input",
                  slug: "fail-safe-input",
                },
                {
                  id: "fail-safe-output",
                  title: "Fail-safe Output",
                  slug: "fail-safe-output",
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
              id: "Signal Board",
              title: "Signal Board",
              slug: "signal-board",
              variants: [
                {
                  id: "sb1221-di4-24vdc",
                  title: "SB 1221 DI4 24 V DC",
                  slug: "sb1221-di4-24vdc",
                },
                {
                  id: "sb1221-di4-5vdc",
                  title: "SB 1221 DI4 5 V DC",
                  slug: "sb1221-di4-5vdc",
                },
                {
                  id: "sb1222-dq4-24vdc",
                  title: "SB 1222 DQ4 24 V DC",
                  slug: "sb1222-dq4-24vdc",
                },
                {
                  id: "sb1222-dq4-5vdc",
                  title: "SB 1222 DQ4 5 V DC",
                  slug: "sb1222-dq4-5vdc",
                },
                {
                  id: "sb1223-di2-do2-standard",
                  title: "SB 1223 DI2 / DQ2 Standard",
                  slug: "sb1223-di2-do2-standard",
                },
                {
                  id: "sb1223-di2-do2-24vdc",
                  title: "SB 1223 DI2 / DQ2 24 V DC",
                  slug: "sb1223-di2-do2-24vdc",
                },
                {
                  id: "sb1223-di2-do2-5vdc",
                  title: "SB 1223 DI2 / DQ2 5 V DC",
                  slug: "sb1223-di2-do2-5vdc",
                },
                {
                  id: "sb1231-ai1",
                  title: "SB 1231 AI1",
                  slug: "sb1231-ai1",
                },
                {
                  id: "sb1231-rtd",
                  title: "SB 1231 RTD AI1",
                  slug: "sb1231-rtd",
                },
                {
                  id: "sb1231-thermocouple",
                  title: "SB 1231 TC AI1",
                  slug: "sb1231-thermocouple",
                },
                {
                  id: "sb1232-ao1",
                  title: "SB 1232 AO1",
                  slug: "sb1232-ao1",
                },
              ],
            },
            {
              id: "Communication Module",
              title: "Communication Module",
              slug: "communication-module",
              variants: [
                {
                  id: "cm1241-rs232",
                  title: "CM 1241 RS232",
                  slug: "cm1241-rs232",
                },
                {
                  id: "cm1241-rs422-485",
                  title: "CM 1241 RS422/485",
                  slug: "cm1241-rs422-485",
                },
                {
                  id: "cm1242-5",
                  title: "CM 1242-5",
                  slug: "cm1242-5",
                },
                {
                  id: "cm1243-2",
                  title: "CM 1243-2",
                  slug: "cm1243-2",
                },
                {
                  id: "cm1243-5",
                  title: "CM 1243-5",
                  slug: "cm1243-5",
                },
                {
                  id: "rf120c",
                  title: "RF120C",
                  slug: "rf120c",
                },
              ],
            },
            {
              id: "Communication Processor",
              title: "Communication Processor",
              slug: "communication-processor",
              variants: [
                {
                  id: "telecontrol-gprs",
                  title: "Telecontrol GPRS",
                  slug: "telecontrol-gprs",
                },
                {
                  id: "industrial-ethernet-telecontrol",
                  title: "Industrial Ethernet Telecontrol",
                  slug: "industrial-ethernet-telecontrol",
                },
                {
                  id: "lte-eu",
                  title: "LTE EU",
                  slug: "lte-eu",
                },
                {
                  id: "lte-us",
                  title: "LTE US",
                  slug: "lte-us",
                },
                {
                  id: "telecontrol-irc",
                  title: "Telecontrol IRC",
                  slug: "telecontrol-irc",
                },
              ],
            },
            {
              id: "Communication Board",
              title: "Communication Board",
              slug: "communication-board",
              variants: [
                {
                  id: "cb1241-rs485",
                  title: "CB 1241 RS485",
                  slug: "cb1241-rs485",
                },
              ],
            },
            {
              id: "Special Module",
              title: "Special Module",
              slug: "special-module",
              variants: [
                {
                  id: "io-link-master",
                  title: "IO-Link Master",
                  slug: "io-link-master",
                },
                {
                  id: "condition-monitoring",
                  title: "Condition Monitoring",
                  slug: "condition-monitoring",
                },
                {
                  id: "simulator-1211-1212",
                  title: "SIM 1274 CPU 1211/1212",
                  slug: "simulator-1211-1212",
                },
                {
                  id: "simulator-1214-1215",
                  title: "SIM 1274 CPU 1214/1215",
                  slug: "simulator-1214-1215",
                },
                {
                  id: "simulator-1217",
                  title: "SIM 1274 CPU 1217",
                  slug: "simulator-1217",
                },
                {
                  id: "battery-board",
                  title: "BB 1297 Battery Board",
                  slug: "battery-board",
                },
              ],
            },
            {
              id: "Technology Module",
              title: "Technology Module",
              slug: "technology-module",
              variants: [
                {
                  id: "weighing-wp231",
                  title: "SIWAREX WP231",
                  slug: "weighing-wp231",
                },
                {
                  id: "weighing-wp241",
                  title: "SIWAREX WP241",
                  slug: "weighing-wp241",
                },
                {
                  id: "weighing-wp251",
                  title: "SIWAREX WP251",
                  slug: "weighing-wp251",
                },
              ],
            },
            {
              id: "Network Switch",
              title: "Network Switch",
              slug: "network-switch",
              variants: [
                {
                  id: "csm1277",
                  title: "CSM 1277",
                  slug: "csm1277",
                },
              ],
            },
            {
              id: "Data Decoupling Module",
              title: "Data Decoupling Module",
              slug: "data-decoupling-module",
              variants: [
                {
                  id: "dcm1271",
                  title: "DCM 1271",
                  slug: "dcm1271",
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
            {
              id: "Signal Module",
              title: "Signal Module",
              slug: "signal-module",
              variants: [
                {
                  id: "digital-input",
                  title: "Digital Input",
                  slug: "digital-input",
                },
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
                  id: "programmable-digital-io",
                  title: "Programmable Digital I/O",
                  slug: "programmable-digital-io",
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
          ],
        },
      ],
    },
  ],
} satisfies SiemensVerifiedTaxonomy;
