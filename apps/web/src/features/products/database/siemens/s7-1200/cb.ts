export type SiemensS71200CBLifecycle =
  "active" | "phase-out" | "spare-part" | "discontinued";

export interface SiemensS71200CommunicationBoard {
  id: string;
  mlfb: string;

  brandId: "siemens";
  categoryId: "PLC";
  familyId: "S7-1200";
  seriesId: "S7-1200";

  productTypeId: "Communication Board";
  variantId: string;

  title: string;
  description: string;

  lifecycle: SiemensS71200CBLifecycle;

  specifications: {
    function?: string;
    interface?: string;
    interfaces?: string[];
    protocols?: string[];
    transmissionRate?: string;
    terminals?: string;
    mounting?: string;
    diagnostics?: string;
    supplyVoltage?: string;
    compatibility?: string;
  };

  source: string;
}

export const s71200CommunicationBoards: SiemensS71200CommunicationBoard[] = [
  // --------------------------------------------------
  // S7-1200 — CB 1241 — RS485
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-cb1241-rs485-1ch30-1xb0",
    mlfb: "6ES7241-1CH30-1XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",

    productTypeId: "Communication Board",
    variantId: "cb1241-rs485",

    title: "SIMATIC S7-1200 CB 1241 RS485",

    description:
      "SIMATIC S7-1200 Communication Board CB 1241 with an RS485 serial interface for point-to-point communication.",

    lifecycle: "active",

    specifications: {
      function: "Serial communication",
      interface: "RS485",
      interfaces: ["RS485"],
      protocols: ["Freeport", "ASCII", "Modbus RTU"],
      terminals: "Screw-type terminals",
      mounting: "CPU communication board slot",
      diagnostics: "Status LED",
      supplyVoltage: "5 V DC from CPU",
      compatibility: "S7-1200 CPUs",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7241-1CH30-1XB0",
  },

  // --------------------------------------------------
  // SIPLUS S7-1200 — CB 1241 — RS485
  // --------------------------------------------------

  {
    id: "siemens-siplus-s7-1200-cb1241-rs485-1ch30-5xb1",
    mlfb: "6AG1241-1CH30-5XB1",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",

    productTypeId: "Communication Board",
    variantId: "cb1241-rs485",

    title: "SIPLUS S7-1200 CB 1241 RS485",

    description:
      "SIPLUS S7-1200 CB 1241 RS485 based on the SIMATIC CB 1241, with conformal coating and extended environmental conditions.",

    lifecycle: "active",

    specifications: {
      function: "Serial communication",
      interface: "RS485",
      interfaces: ["RS485"],
      protocols: ["Freeport", "ASCII", "Modbus RTU"],
      terminals: "Screw-type terminals",
      mounting: "CPU communication board slot",
      diagnostics: "Status LED",
      supplyVoltage: "5 V DC from CPU",
      compatibility: "S7-1200 CPUs",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1241-1CH30-5XB1",
  },

  // --------------------------------------------------
  // SIPLUS extreme RAIL — CB 1241 — RS485 T1 RAIL
  // --------------------------------------------------

  {
    id: "siemens-siplus-s7-1200-cb1241-rs485-t1-rail-1ch30-1xb0",
    mlfb: "6AG2241-1CH30-1XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",

    productTypeId: "Communication Board",
    variantId: "cb1241-rs485",

    title: "SIPLUS S7-1200 CB 1241 RS485 T1 RAIL",

    description:
      "SIPLUS extreme RAIL S7-1200 CB 1241 communication board with RS485 interface for railway applications.",

    lifecycle: "active",

    specifications: {
      function: "Serial communication",
      interface: "RS485",
      interfaces: ["RS485"],
      protocols: ["Freeport", "ASCII", "Modbus RTU"],
      terminals: "Screw-type terminals",
      mounting: "CPU communication board slot",
      diagnostics: "Status LED",
      supplyVoltage: "5 V DC from CPU",
      compatibility: "S7-1200 CPUs",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG2241-1CH30-1XB0",
  },
];
