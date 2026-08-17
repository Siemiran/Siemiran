export type SiemensS71200CPLifecycle =
  "active" | "phase-out" | "spare-part" | "discontinued";

export interface SiemensS71200CommunicationProcessor {
  id: string;
  mlfb: string;

  brandId: "siemens";
  categoryId: "PLC";
  familyId: "S7-1200";
  seriesId: "S7-1200";

  productTypeId: "Communication Processor";
  variantId: string;

  title: string;
  description: string;

  lifecycle: SiemensS71200CPLifecycle;

  specifications: {
    interface?: string;
    interfaces?: string[];
    supplyVoltage?: string;
    transmissionRate?: string;
    protocols?: string[];
    connector?: string;
    antennaInterface?: string;
    diagnostics?: string;
    security?: string[];
    wirelessTechnology?: string[];
    mounting?: string;
  };

  source: string;
}

export const s71200CP: SiemensS71200CommunicationProcessor[] = [
  // --------------------------------------------------
  // S7-1200 — CP 1242-7 — GSM/GPRS Telecontrol
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-cp1242-7-7kx31-0xe0",
    mlfb: "6GK7242-7KX31-0XE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",

    productTypeId: "Communication Processor",
    variantId: "telecontrol-gprs",

    title: "SIMATIC S7-1200 CP 1242-7 V2",

    description:
      "SIMATIC S7-1200 communications processor CP 1242-7 V2 for connecting an S7-1200 to GSM/GPRS networks, including SMS and web-server access to the CPU.",

    lifecycle: "spare-part",

    specifications: {
      interface: "GSM/GPRS",
      interfaces: ["GSM", "GPRS"],
      transmissionRate: "GPRS up to 86 kbit/s downlink / 43 kbit/s uplink",
      protocols: ["GPRS", "SMS", "Telecontrol"],
      connector: "3-pole terminal block",
      antennaInterface: "SMA, 50 ohm",
      diagnostics: "Status and diagnostic LEDs",
      wirelessTechnology: ["GSM", "GPRS"],
      mounting: "DIN rail / panel mounting",
    },

    source:
      "https://mall.industry.siemens.com/goos/catalog/Pages/mmpdata.ashx?MLFB1=6GK7242-7KX31-0XE0&lang=en",
  },

  // --------------------------------------------------
  // S7-1200 — CP 1243-1 — Industrial Ethernet / Telecontrol
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-cp1243-1-1bx30-0xe0",
    mlfb: "6GK7243-1BX30-0XE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",

    productTypeId: "Communication Processor",
    variantId: "industrial-ethernet-telecontrol",

    title: "SIMATIC S7-1200 CP 1243-1",

    description:
      "SIMATIC S7-1200 communications processor CP 1243-1 providing an additional Industrial Ethernet interface and secure connection to control centers via DNP3, IEC 60870 and TeleControl Basic protocols.",

    lifecycle: "active",

    specifications: {
      interface: "Industrial Ethernet",
      interfaces: ["PROFINET/Ethernet"],
      supplyVoltage: "24 V DC",
      protocols: ["DNP3", "IEC 60870", "TeleControl Basic"],
      connector: "RJ45",
      diagnostics: "Status and diagnostic LEDs",
      security: ["Firewall", "VPN"],
      mounting: "DIN rail / panel mounting",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6GK7243-1BX30-0XE0",
  },

  // --------------------------------------------------
  // S7-1200 — CP 1243-7 — LTE EU
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-cp1243-7-lte-eu-7kx30-0xe0",
    mlfb: "6GK7243-7KX30-0XE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",

    productTypeId: "Communication Processor",
    variantId: "lte-eu",

    title: "SIMATIC S7-1200 CP 1243-7 LTE EU",

    description:
      "SIMATIC S7-1200 communications processor CP 1243-7 LTE EU for connecting an S7-1200 to LTE mobile networks in the European frequency range.",

    lifecycle: "active",

    specifications: {
      interface: "LTE",
      interfaces: ["LTE", "UMTS", "GSM/GPRS"],
      supplyVoltage: "24 V DC",
      protocols: ["IP", "TCP/IP", "UDP", "SMS"],
      connector: "SMA antenna connector",
      antennaInterface: "SMA, 50 ohm",
      diagnostics: "Status and diagnostic LEDs",
      wirelessTechnology: ["LTE", "UMTS", "GSM/GPRS"],
      mounting: "DIN rail / panel mounting",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product/6GK7243-7KX30-0XE0",
  },

  // --------------------------------------------------
  // S7-1200 — CP 1243-7 — LTE US
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-cp1243-7-lte-us-7sx30-0xe0",
    mlfb: "6GK7243-7SX30-0XE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",

    productTypeId: "Communication Processor",
    variantId: "lte-us",

    title: "SIMATIC S7-1200 CP 1243-7 LTE US",

    description:
      "SIMATIC S7-1200 communications processor CP 1243-7 LTE US for connecting an S7-1200 to LTE mobile networks in the US frequency range.",

    lifecycle: "active",

    specifications: {
      interface: "LTE",
      interfaces: ["LTE", "UMTS", "GSM/GPRS"],
      supplyVoltage: "24 V DC",
      protocols: ["IP", "TCP/IP", "UDP", "SMS"],
      connector: "SMA antenna connector",
      antennaInterface: "SMA, 50 ohm",
      diagnostics: "Status and diagnostic LEDs",
      wirelessTechnology: ["LTE", "UMTS", "GSM/GPRS"],
      mounting: "DIN rail / panel mounting",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product/6GK7243-7SX30-0XE0",
  },

  // --------------------------------------------------
  // S7-1200 — CP 1243-8 IRC — Telecontrol
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-cp1243-8-irc-8rx30-0xe0",
    mlfb: "6GK7243-8RX30-0XE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",

    productTypeId: "Communication Processor",
    variantId: "telecontrol-irc",

    title: "SIMATIC S7-1200 CP 1243-8 IRC",

    description:
      "SIMATIC S7-1200 communications processor CP 1243-8 IRC for Professional TeleControl systems and SINAUT ST7, supporting DNP3 and IEC 60870-5 telecontrol communication and WAN connections.",

    lifecycle: "active",

    specifications: {
      interface: "Industrial Ethernet",
      interfaces: ["Ethernet", "WAN"],
      supplyVoltage: "24 V DC",
      protocols: ["SINAUT ST7", "DNP3", "IEC 60870-5"],
      connector: "RJ45",
      diagnostics: "Status and diagnostic LEDs",
      security: ["Firewall", "VPN"],
      mounting: "DIN rail / panel mounting",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product/6GK7243-8RX30-0XE0",
  },

  // --------------------------------------------------
  // SIPLUS S7-1200 — CP 1243-1
  // --------------------------------------------------

  {
    id: "siemens-siplus-s7-1200-cp1243-1-1bx30-2ax0",
    mlfb: "6AG1243-1BX30-2AX0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",

    productTypeId: "Communication Processor",
    variantId: "siplus-industrial-ethernet-telecontrol",

    title: "SIPLUS S7-1200 CP 1243-1",

    description:
      "SIPLUS S7-1200 CP 1243-1 based on 6GK7243-1BX30-0XE0, with conformal coating and extended environmental temperature range, providing Industrial Ethernet and secure telecontrol communication.",

    lifecycle: "active",

    specifications: {
      interface: "Industrial Ethernet",
      interfaces: ["PROFINET/Ethernet"],
      supplyVoltage: "24 V DC",
      protocols: ["DNP3", "IEC 60870", "TeleControl Basic"],
      connector: "RJ45",
      diagnostics: "Status and diagnostic LEDs",
      security: ["Firewall", "VPN"],
      mounting: "DIN rail / panel mounting",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/us/Catalog/Product/6AG1243-1BX30-2AX0",
  },

  // --------------------------------------------------
  // SIPLUS extreme RAIL — CP 1243-1 T1
  // --------------------------------------------------

  {
    id: "siemens-siplus-s7-1200-cp1243-1-t1-rail-1bx30-1xe0",
    mlfb: "6AG2243-1BX30-1XE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",

    productTypeId: "Communication Processor",
    variantId: "siplus-rail-telecontrol",

    title: "SIPLUS S7-1200 CP 1243-1 T1 RAIL",

    description:
      "SIPLUS extreme RAIL CP 1243-1 T1 for S7-1200 railway applications, providing secure Industrial Ethernet and telecontrol connectivity under extended environmental conditions.",

    lifecycle: "active",

    specifications: {
      interface: "Industrial Ethernet",
      interfaces: ["PROFINET/Ethernet"],
      supplyVoltage: "24 V DC",
      protocols: ["DNP3", "IEC 60870", "TeleControl Basic"],
      connector: "RJ45",
      diagnostics: "Status and diagnostic LEDs",
      security: ["Firewall", "VPN"],
      mounting: "SIPLUS extreme RAIL",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oms/Catalog/Products/10303025",
  },
];
