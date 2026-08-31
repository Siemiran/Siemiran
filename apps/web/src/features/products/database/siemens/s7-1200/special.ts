export type SiemensS71200SpecialLifecycle =
  "active" | "phase-out" | "spare-part" | "discontinued";

export interface SiemensS71200SpecialModule {
  id: string;
  mlfb: string;

  brandId: "siemens";
  categoryId: "PLC";
  familyId: "S7-1200";
  seriesId: "S7-1200";

  productTypeId: "Special Module" | "Technology Module";
  variantId: string;

  title: string;
  description: string;

  lifecycle: SiemensS71200SpecialLifecycle;

  specifications: {
    function?: string;
    channels?: number;
    digitalInputs?: number;
    digitalOutputs?: number;
    analogInputs?: number;
    analogOutputs?: number;
    supplyVoltage?: string;
    interfaces?: string[];
    connector?: string;
    compatibility?: string;
    mounting?: string;
    diagnostics?: string;
    ioLinkPorts?: number;
    encoderInputs?: number;
    memoryBackup?: string;
  };

  source: string;
}

export const s71200SpecialModules: SiemensS71200SpecialModule[] = [
  // --------------------------------------------------
  // S7-1200 — SM 1278 — 4x IO-Link Master
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-sm1278-4bd32-0xb0",
    mlfb: "6ES7278-4BD32-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",

    productTypeId: "Special Module",
    variantId: "io-link-master",

    title: "SIMATIC S7-1200 SM 1278 4x IO-Link Master",

    description:
      "SIMATIC S7-1200 SM 1278 4x IO-Link Master for connecting up to four IO-Link devices according to IO-Link Specification V1.1.",

    lifecycle: "phase-out",

    specifications: {
      function: "IO-Link master",
      ioLinkPorts: 4,
      supplyVoltage: "24 V DC",
      diagnostics: "Diagnostic messages and status information",
      mounting: "S7-1200 expansion module",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/Catalog/Product/6ES7278-4BD32-0XB0",
  },

  // --------------------------------------------------
  // SIPLUS S7-1200 — SM 1278 — 4x IO-Link Master
  // --------------------------------------------------

  {
    id: "siemens-siplus-s7-1200-sm1278-4bd32-2xb0",
    mlfb: "6AG1278-4BD32-2XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",

    productTypeId: "Special Module",
    variantId: "io-link-master",

    title: "SIPLUS S7-1200 SM 1278 4x IO-Link Master",

    description:
      "SIPLUS S7-1200 SM 1278 4x IO-Link Master based on 6ES7278-4BD32-0XB0, with conformal coating and extended environmental conditions.",

    lifecycle: "active",

    specifications: {
      function: "IO-Link master",
      ioLinkPorts: 4,
      supplyVoltage: "24 V DC",
      diagnostics: "Diagnostic messages and status information",
      mounting: "S7-1200 expansion module",
    },

    source:
      "https://mall.industry.siemens.com/mall/my/EN/Catalog/Product/?mlfb=6AG1278-4BD32-2XB0",
  },

  {
    id: "siemens-siplus-s7-1200-sm1278-4bd32-4xb0",
    mlfb: "6AG1278-4BD32-4XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",

    productTypeId: "Special Module",
    variantId: "io-link-master",

    title: "SIPLUS S7-1200 SM 1278 4x IO-Link Master",

    description:
      "SIPLUS S7-1200 SM 1278 4x IO-Link Master based on 6ES7278-4BD32-0XB0, with conformal coating and extended environmental conditions.",

    lifecycle: "active",

    specifications: {
      function: "IO-Link master",
      ioLinkPorts: 4,
      supplyVoltage: "24 V DC",
      diagnostics: "Diagnostic messages and status information",
      mounting: "S7-1200 expansion module",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product/6AG1278-4BD32-4XB0",
  },

  // --------------------------------------------------
  // SIPLUS CMS1200 — SM 1281 — Condition Monitoring
  // --------------------------------------------------

  {
    id: "siemens-siplus-cms1200-sm1281-1aa10-0aa0",
    mlfb: "6AT8007-1AA10-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",

    productTypeId: "Special Module",
    variantId: "condition-monitoring",

    title: "SIPLUS CMS1200 SM 1281 Condition Monitoring",

    description:
      "SIPLUS CMS1200 SM 1281 condition monitoring module for SIMATIC S7-1200 with four IEPE vibration channels and one digital input for rotational speed acquisition.",

    lifecycle: "active",

    specifications: {
      function: "Condition monitoring",
      channels: 4,
      digitalInputs: 1,
      interfaces: ["IEPE vibration inputs"],
      diagnostics: "Condition monitoring diagnostics",
      mounting: "S7-1200 expansion module",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/powertecownsy/Catalog/Product?SiepCountryCode=OE&mlfb=6AT8007-1AA10-0AA0",
  },

  // --------------------------------------------------
  // S7-1200 — SIM 1274 — Simulator Modules
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-sim1274-1xf30-0xa0",
    mlfb: "6ES7274-1XF30-0XA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",

    productTypeId: "Special Module",
    variantId: "simulator-1211-1212",

    title: "SIMATIC S7-1200 SIM 1274 Simulator",

    description:
      "SIM 1274 simulator module for CPU 1211/1212 with eight input switches for 24 V DC digital inputs.",

    lifecycle: "active",

    specifications: {
      function: "CPU I/O simulation",
      digitalInputs: 8,
      supplyVoltage: "24 V DC",
      compatibility: "CPU 1211C / CPU 1212C",
      mounting: "CPU front connection",
    },

    source:
      "https://mall.industry.siemens.com/goos/catalog/Pages/mmpdata.ashx?MLFB1=6ES7274-1XF30-0XA0&lang=en",
  },

  {
    id: "siemens-s7-1200-sim1274-1xh30-0xa0",
    mlfb: "6ES7274-1XH30-0XA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",

    productTypeId: "Special Module",
    variantId: "simulator-1214-1215",

    title: "SIMATIC S7-1200 SIM 1274 Simulator",

    description:
      "SIM 1274 simulator module for CPU 1214/1215 with fourteen input switches for 24 V DC digital inputs.",

    lifecycle: "active",

    specifications: {
      function: "CPU I/O simulation",
      digitalInputs: 14,
      supplyVoltage: "24 V DC",
      compatibility: "CPU 1214C / CPU 1215C",
      mounting: "CPU front connection",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7274-1XH30-0XA0",
  },

  {
    id: "siemens-s7-1200-sim1274-1xk30-0xa0",
    mlfb: "6ES7274-1XK30-0XA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",

    productTypeId: "Special Module",
    variantId: "simulator-1217",

    title: "SIMATIC S7-1200 SIM 1274 Simulator",

    description:
      "SIM 1274 simulator module for CPU 1217C with fourteen input switches including ten 24 V DC inputs and four differential technology inputs.",

    lifecycle: "active",

    specifications: {
      function: "CPU I/O simulation",
      digitalInputs: 14,
      supplyVoltage: "24 V DC",
      compatibility: "CPU 1217C",
      mounting: "CPU front connection",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7274-1XK30-0XA0",
  },

  // --------------------------------------------------
  // S7-1200 — BB 1297 — Battery Board
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-bb1297-0ax30-0xa0",
    mlfb: "6ES7297-0AX30-0XA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",

    productTypeId: "Special Module",
    variantId: "battery-board",

    title: "SIMATIC S7-1200 BB 1297 Battery Board",

    description:
      "SIMATIC S7-1200 BB 1297 battery board for long-term buffering of the real-time clock, pluggable into the signal board receptacle of S7-12xx CPUs with firmware 3.0 or higher. CR1025 battery not included.",

    lifecycle: "active",

    specifications: {
      function: "Real-time clock backup",
      memoryBackup: "Long-term real-time clock buffering",
      diagnostics: "Maintenance LED signals battery replacement",
      mounting: "CPU signal board slot",
    },

    source:
      "https://docs.tia.siemens.cloud/r/simatic_s7_1200_manual_collection_enus_20/technical-specifications/bb-1297-battery-board/bb-1297-battery-board?contentId=omUOmfYT0bc2EaOb8UD4dA",
  },

  // --------------------------------------------------
  // S7-1200 — SIWAREX WP231 — Weighing Module
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-siwarex-wp231-4960-2aa01",
    mlfb: "7MH4960-2AA01",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",

    productTypeId: "Technology Module",
    variantId: "weighing-wp231",

    title: "SIMATIC S7-1200 SIWAREX WP231",

    description:
      "SIWAREX WP231 single-channel weighing module for platform and hopper scales with analog load cells or strain gauges, including legal-for-trade applications.",

    lifecycle: "active",

    specifications: {
      function: "Weighing electronics",
      channels: 1,
      digitalInputs: 4,
      digitalOutputs: 4,
      analogOutputs: 1,
      interfaces: ["RS485", "Ethernet"],
      connector: "Load-cell interface",
      diagnostics: "Detailed load-cell diagnostics",
      compatibility: "SIMATIC S7-1200 or standalone operation",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/en/Catalog/Product/7MH4960-2AA01",
  },

  // --------------------------------------------------
  // S7-1200 — SIWAREX WP241 — Weighing Module
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-siwarex-wp241-4960-4aa01",
    mlfb: "7MH4960-4AA01",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",

    productTypeId: "Technology Module",
    variantId: "weighing-wp241",

    title: "SIMATIC S7-1200 SIWAREX WP241",

    description:
      "SIWAREX WP241 single-channel weighing module for conveyor belt scales and solids flowmeters with analog load cells or strain gauges.",

    lifecycle: "active",

    specifications: {
      function: "Weighing electronics",
      channels: 1,
      digitalInputs: 4,
      digitalOutputs: 4,
      analogOutputs: 1,
      interfaces: ["RS485", "Ethernet"],
      connector: "Load-cell interface",
      diagnostics: "Detailed load-cell diagnostics",
      compatibility: "SIMATIC S7-1200 or standalone operation",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=7MH4960-4AA01",
  },

  // --------------------------------------------------
  // S7-1200 — SIWAREX WP251 — Weighing Module
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-siwarex-wp251-4960-6aa01",
    mlfb: "7MH4960-6AA01",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",

    productTypeId: "Technology Module",
    variantId: "weighing-wp251",

    title: "SIMATIC S7-1200 SIWAREX WP251",

    description:
      "SIWAREX WP251 single-channel weighing module for automatic dosing, filling, checkweighing and totalizing scales with analog load cells or strain gauges.",

    lifecycle: "active",

    specifications: {
      function: "Weighing and dosing",
      channels: 1,
      digitalInputs: 4,
      digitalOutputs: 4,
      analogOutputs: 1,
      interfaces: ["RS485", "Ethernet"],
      connector: "Load-cell interface",
      diagnostics: "Detailed load-cell diagnostics",
      compatibility: "SIMATIC S7-1200 or standalone operation",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/internationalenergytechnikltd/Catalog/Product?SiepCountryCode=OE&mlfb=7MH4960-6AA01",
  },
];
