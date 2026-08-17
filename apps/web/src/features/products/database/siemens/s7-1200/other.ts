export type SiemensS71200OtherLifecycle =
  "active" | "phase-out" | "spare-part" | "discontinued";

export interface SiemensS71200OtherModule {
  id: string;
  mlfb: string;

  brandId: "siemens";
  categoryId: "PLC";
  familyId: "S7-1200";
  seriesId: "S7-1200";

  productTypeId: "Other Module";
  variantId: string;

  title: string;
  description: string;

  lifecycle: SiemensS71200OtherLifecycle;

  specifications: {
    function?: string;
    interfaces?: string[];
    ports?: number;
    transmissionRate?: string;
    supplyVoltage?: string;
    connector?: string;
    diagnostics?: string;
    mounting?: string;
    compatibility?: string;
    channels?: number;
  };

  source: string;
}

export const s71200OtherModules: SiemensS71200OtherModule[] = [
  // --------------------------------------------------
  // S7-1200 — CSM 1277 — Compact Switch Module
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-csm1277-1aa10-0aa0",
    mlfb: "6GK7277-1AA10-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",

    productTypeId: "Other Module",
    variantId: "csm1277",

    title: "SIMATIC S7-1200 CSM 1277 Compact Switch Module",

    description:
      "SIMATIC CSM 1277 unmanaged compact switch module for connecting an S7-1200 and up to three further nodes to Industrial Ethernet with 10/100 Mbit/s.",

    lifecycle: "active",

    specifications: {
      function: "Industrial Ethernet unmanaged switch",
      interfaces: ["Industrial Ethernet"],
      ports: 4,
      transmissionRate: "10/100 Mbit/s",
      supplyVoltage: "24 V DC",
      connector: "4 x RJ45",
      diagnostics: "LED diagnostics",
      mounting: "S7-1200 module / DIN rail or panel",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6GK7277-1AA10-0AA0",
  },

  // --------------------------------------------------
  // SIPLUS NET — CSM 1277 — Extended Temperature
  // --------------------------------------------------

  {
    id: "siemens-siplus-net-s7-1200-csm1277-1aa10-2aa0",
    mlfb: "6AG1277-1AA10-2AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",

    productTypeId: "Other Module",
    variantId: "siplus-csm1277-40-70c",

    title: "SIPLUS NET CSM 1277",

    description:
      "SIPLUS NET CSM 1277 based on 6GK7277-1AA10-0AA0 with conformal coating and extended temperature range of -40 to +70 °C.",

    lifecycle: "active",

    specifications: {
      function: "Industrial Ethernet unmanaged switch",
      interfaces: ["Industrial Ethernet"],
      ports: 4,
      transmissionRate: "10/100 Mbit/s",
      supplyVoltage: "24 V DC",
      connector: "4 x RJ45",
      diagnostics: "LED diagnostics",
      mounting: "DIN rail or panel",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1277-1AA10-2AA0",
  },

  // --------------------------------------------------
  // SIPLUS NET — CSM 1277 — 0...+60 °C
  // --------------------------------------------------

  {
    id: "siemens-siplus-net-s7-1200-csm1277-1aa10-4aa0",
    mlfb: "6AG1277-1AA10-4AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",

    productTypeId: "Other Module",
    variantId: "siplus-csm1277-0-60c",

    title: "SIPLUS NET CSM 1277",

    description:
      "SIPLUS NET CSM 1277 based on 6GK7277-1AA10-0AA0 with conformal coating and an extended operating temperature range of 0 to +60 °C.",

    lifecycle: "active",

    specifications: {
      function: "Industrial Ethernet unmanaged switch",
      interfaces: ["Industrial Ethernet"],
      ports: 4,
      transmissionRate: "10/100 Mbit/s",
      supplyVoltage: "24 V DC",
      connector: "4 x RJ45",
      diagnostics: "LED diagnostics",
      mounting: "DIN rail or panel",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1277-1AA10-4AA0",
  },

  // --------------------------------------------------
  // S7-1200 — DCM 1271 — AS-i Data Decoupling Module
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-dcm1271-1aa30-0aa0",
    mlfb: "3RK7271-1AA30-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",

    productTypeId: "Other Module",
    variantId: "dcm1271",

    title: "SIMATIC S7-1200 DCM 1271",

    description:
      "SIMATIC S7-1200 DCM 1271 data decoupling module for the AS-Interface master CM 1243-2, with 24/30 V DC input and one AS-Interface output rated at 4 A.",

    lifecycle: "active",

    specifications: {
      function: "AS-Interface data and power decoupling",
      interfaces: ["AS-Interface"],
      supplyVoltage: "24/30 V DC",
      diagnostics:
        "Integrated overload protection, ground-fault detection and signaling contact",
      mounting: "DIN rail",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/internationalenergytechnikltd/Catalog/Product?SiepCountryCode=OE&mlfb=3RK7271-1AA30-0AA0",
  },

  // --------------------------------------------------
  // S7-1200 — RF120C — RFID / Code Reading Communications Module
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-rf120c-0la00",
    mlfb: "6GT2002-0LA00",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",

    productTypeId: "Other Module",
    variantId: "rf120c",

    title: "SIMATIC S7-1200 RF120C",

    description:
      "SIMATIC RF120C communications module for connecting Siemens RFID and code-reading systems directly to an S7-1200 via a point-to-point connection.",

    lifecycle: "active",

    specifications: {
      function: "RFID and code-reading communication",
      interfaces: ["RS422", "RS232", "Reader point-to-point interface"],
      compatibility:
        "SIMATIC S7-1200; 1 reader per RF120C; up to three RF120C modules can be connected to the left of the CPU",
      mounting: "S7-1200 expansion module",
    },

    source:
      "https://docs.tia.siemens.cloud/r/simatic_s7_1200_manual_collection_enus_20/technical-specifications/companion-products/rf120c-communications-module",
  },
];
