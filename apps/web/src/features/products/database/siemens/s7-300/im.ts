export type SiemensS7300IMLifecycle =
  "active" | "phase-out" | "spare-part" | "discontinued";

export interface SiemensS7300InterfaceModule {
  id: string;
  mlfb: string;

  brandId: "siemens";
  categoryId: "PLC";
  familyId: "S7-300";
  seriesId: "S7-300";

  productTypeId: "Interface Module";
  variantId: string;

  title: string;
  description: string;

  lifecycle: SiemensS7300IMLifecycle;

  specifications: {
    function?: string;
    rackConfiguration?: string;
    expansionRacks?: number;
    channels?: number;
    supplyVoltage?: string;
    interfaces?: string[];
    connectingCable?: string;
    digitalInputs?: number;
    digitalOutputs?: number;
    analogOutputs?: number;
    encoderSupply?: string;
    diagnostics?: string;
  };

  source: string;
}

export const s7300IM: SiemensS7300InterfaceModule[] = [
  // --------------------------------------------------
  // S7-300 — IM 360 — Sender Interface Module
  // --------------------------------------------------

  {
    id: "siemens-s7-300-im360-3aa01-0aa0",
    mlfb: "6ES7360-3AA01-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Interface Module",
    variantId: "rack-sender",

    title: "SIMATIC S7-300 IM 360 Interface Module",

    description:
      "SIMATIC S7-300 IM 360 interface module for connection of the central rack to a maximum of three expansion racks with C-bus.",

    lifecycle: "spare-part",

    specifications: {
      function: "Expansion rack connection",
      rackConfiguration: "Central rack; sender interface module",
      expansionRacks: 3,
      interfaces: ["Backplane bus", "C-bus"],
      diagnostics: "Status and diagnostic indicators",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/en/Catalog/Product/6ES7360-3AA01-0AA0",
  },

  // --------------------------------------------------
  // S7-300 — IM 361 — Receiver Interface Module
  // --------------------------------------------------

  {
    id: "siemens-s7-300-im361-3ca01-0aa0",
    mlfb: "6ES7361-3CA01-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Interface Module",
    variantId: "rack-receiver",

    title: "SIMATIC S7-300 IM 361 Interface Module",

    description:
      "SIMATIC S7-300 IM 361 interface module for connection of an expansion rack to the central rack via IM 360, with 24 V DC supply and C-bus.",

    lifecycle: "spare-part",

    specifications: {
      function: "Expansion rack connection",
      rackConfiguration: "Expansion rack; receiver interface module",
      supplyVoltage: "24 V DC",
      interfaces: ["Backplane bus", "C-bus"],
      connectingCable:
        "IM 360/IM 361 connecting cables: 1 m, 2.5 m, 5 m or 10 m",
      diagnostics: "Status and diagnostic indicators",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/de/Catalog/Product/6ES7361-3CA01-0AA0",
  },

  // --------------------------------------------------
  // S7-300 — IM 365 — Two-Rack Interface Module
  // --------------------------------------------------

  {
    id: "siemens-s7-300-im365-0ba01-0aa0",
    mlfb: "6ES7365-0BA01-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Interface Module",
    variantId: "rack-interface",

    title: "SIMATIC S7-300 IM 365 Interface Module",

    description:
      "SIMATIC S7-300 IM 365 interface module for connecting one expansion rack to the central rack without C-bus, supplied as two modules with a 1 m connecting cable.",

    lifecycle: "spare-part",

    specifications: {
      function: "Expansion rack connection",
      rackConfiguration: "Two-rack configuration",
      expansionRacks: 1,
      interfaces: ["Backplane bus"],
      connectingCable: "1 m permanently connected cable",
      diagnostics: "Status and diagnostic indicators",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/ru/Catalog/Product/6ES73650BA010AA0",
  },

  // --------------------------------------------------
  // S7-300 — IM 365 — Extended Temperature Range
  // --------------------------------------------------

  {
    id: "siemens-s7-300-im365-0ba81-0aa0",
    mlfb: "6ES7365-0BA81-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Interface Module",
    variantId: "rack-interface",

    title: "SIMATIC S7-300 IM 365 Extended Temperature Range",

    description:
      "SIMATIC S7-300 IM 365 interface module for extended temperature range applications, connecting one expansion rack to the central rack with a permanently connected 1 m cable.",

    lifecycle: "discontinued",

    specifications: {
      function: "Expansion rack connection",
      rackConfiguration: "Two-rack configuration",
      expansionRacks: 1,
      interfaces: ["Backplane bus"],
      connectingCable: "1 m permanently connected cable",
      diagnostics: "Status and diagnostic indicators",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/109474938/FBSI_1103_en.pdf",
  },

  // --------------------------------------------------
  // SIPLUS S7-300 — IM 365 — Interface Module
  // --------------------------------------------------

  {
    id: "siemens-siplus-s7-300-im365-0ba01-2aa0",
    mlfb: "6AG1365-0BA01-2AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Interface Module",
    variantId: "rack-interface",

    title: "SIPLUS S7-300 IM 365",

    description:
      "SIPLUS S7-300 IM 365 based on 6ES7365-0BA01-0AA0 with conformal coating and extended environmental temperature range, for connection of one expansion rack without communications bus, supplied as two modules with a 1 m connecting cable.",

    lifecycle: "spare-part",

    specifications: {
      function: "Expansion rack connection",
      rackConfiguration: "Two-rack configuration",
      expansionRacks: 1,
      interfaces: ["Backplane bus"],
      connectingCable: "1 m connecting cable",
      diagnostics: "Status and diagnostic indicators",
    },

    source:
      "https://mall.industry.siemens.com/mall/sa/EN/Catalog/Product/?mlfb=6AG1365-0BA01-2AA0",
  },

  // --------------------------------------------------
  // S7-300 — IM 174 — Motion Control Interface Module
  // --------------------------------------------------

  {
    id: "siemens-s7-300-im174-0aa10-0aa0",
    mlfb: "6ES7174-0AA10-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Interface Module",
    variantId: "motion-control",

    title: "SIMATIC S7-300 IM 174",

    description:
      "SIMATIC S7-300 IM 174 interface module for connecting analog and stepper drives to isochronous PROFIBUS Motion Control systems, with four channels.",

    lifecycle: "spare-part",

    specifications: {
      function: "Motion control interface",
      rackConfiguration: "Distributed PROFIBUS interface module",
      channels: 4,
      supplyVoltage: "24 V DC",
      interfaces: [
        "Isochronous PROFIBUS",
        "Analog drive interfaces",
        "Stepper drive interfaces",
        "SSI encoder",
      ],
      digitalInputs: 10,
      digitalOutputs: 8,
      analogOutputs: 4,
      encoderSupply: "5 V DC / 24 V DC",
      diagnostics: "Status and diagnostic indicators",
    },

    source:
      "https://mall.industry.siemens.com/goos/catalog/Pages/mmpdata.ashx?MLFB1=6ES7174-0AA10-0AA0&lang=en",
  },

  // --------------------------------------------------
  // S7-300 — IM 178-4 — Distributed Motion Control Interface
  // --------------------------------------------------

  {
    id: "siemens-s7-300-im178-4-0ab00-0xa0",
    mlfb: "6ES7178-4AB00-0XA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Interface Module",
    variantId: "distributed-motion-control",

    title: "SIMATIC S7-300 IM 178-4",

    description:
      "SIMATIC IM 178-4 distributed interface module for position detection with incremental or SSI encoders and control of analog drives over PROFIBUS DP.",

    lifecycle: "discontinued",

    specifications: {
      function: "Distributed motion control interface",
      channels: 2,
      supplyVoltage: "24 V DC",
      interfaces: [
        "PROFIBUS DP",
        "Analog drive interfaces",
        "SSI encoder",
        "Incremental encoder",
      ],
      digitalInputs: 6,
      digitalOutputs: 6,
      analogOutputs: 2,
      diagnostics: "Status and diagnostic indicators",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/1117389/IM1784_e.pdf",
  },
];
