export type SiemensS71200CMLifecycle =
  "active" | "phase-out" | "spare-part" | "discontinued";

export interface SiemensS71200CommunicationModule {
  id: string;
  mlfb: string;

  brandId: "siemens";
  categoryId: "PLC";
  familyId: "S7-1200";
  seriesId: "S7-1200";

  productTypeId: "Communication Module";
  variantId: string;

  title: string;
  description: string;

  lifecycle: SiemensS71200CMLifecycle;

  specifications: {
    function?: string;
    interface?: string;
    interfaces?: string[];
    protocols?: string[];
    transmissionRate?: string;
    supplyVoltage?: string;
    connector?: string;
    diagnostics?: string;
    mounting?: string;
    role?: string;
  };

  source: string;
}

export const s71200CM: SiemensS71200CommunicationModule[] = [
  // --------------------------------------------------
  // S7-1200 — CM 1241 — RS232
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-cm1241-rs232-1ah32-0xb0",
    mlfb: "6ES7241-1AH32-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",

    productTypeId: "Communication Module",
    variantId: "cm1241-rs232",

    title: "SIMATIC S7-1200 CM 1241 RS232",

    description:
      "SIMATIC S7-1200 CM 1241 communication module with an RS232 serial interface, 9-pole D-sub connector and Freeport support.",

    lifecycle: "active",

    specifications: {
      function: "Serial communication",
      interface: "RS232",
      interfaces: ["RS232"],
      protocols: ["Freeport", "ASCII", "Modbus RTU"],
      supplyVoltage: "24 V DC",
      connector: "9-pole D-sub pin",
      diagnostics: "Status and diagnostic LEDs",
      mounting: "S7-1200 expansion module",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7241-1AH32-0XB0",
  },

  // --------------------------------------------------
  // S7-1200 — CM 1241 — RS422/485
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-cm1241-rs422-485-1ch32-0xb0",
    mlfb: "6ES7241-1CH32-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",

    productTypeId: "Communication Module",
    variantId: "cm1241-rs422-485",

    title: "SIMATIC S7-1200 CM 1241 RS422/485",

    description:
      "SIMATIC S7-1200 CM 1241 communication module with an RS422/485 serial interface, 9-pole D-sub connector and Freeport support.",

    lifecycle: "active",

    specifications: {
      function: "Serial communication",
      interface: "RS422/485",
      interfaces: ["RS422", "RS485"],
      protocols: ["Freeport", "ASCII", "Modbus RTU"],
      supplyVoltage: "24 V DC",
      connector: "9-pole D-sub socket",
      diagnostics: "Status and diagnostic LEDs",
      mounting: "S7-1200 expansion module",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7241-1CH32-0XB0",
  },

  // --------------------------------------------------
  // S7-1200 — CM 1242-5 — PROFIBUS DP Slave
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-cm1242-5-5dx30-0xe0",
    mlfb: "6GK7242-5DX30-0XE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",

    productTypeId: "Communication Module",
    variantId: "cm1242-5",

    title: "SIMATIC S7-1200 CM 1242-5",

    description:
      "SIMATIC S7-1200 CM 1242-5 communication module for connecting an S7-1200 to PROFIBUS as a DP slave.",

    lifecycle: "active",

    specifications: {
      function: "PROFIBUS communication",
      interface: "PROFIBUS DP",
      interfaces: ["PROFIBUS"],
      protocols: ["PROFIBUS DP"],
      transmissionRate: "9.6 kbit/s to 12 Mbit/s",
      supplyVoltage: "24 V DC",
      connector: "9-pin Sub-D socket (RS485)",
      diagnostics: "Status and diagnostic LEDs",
      mounting: "S7-1200 expansion module",
      role: "DP slave",
    },

    source:
      "https://mall.industry.siemens.com/goos/catalog/Pages/mmpdata.ashx?MLFB1=6GK7242-5DX30-0XE0&lang=en",
  },

  // --------------------------------------------------
  // S7-1200 — CM 1243-2 — AS-Interface Master
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-cm1243-2-2aa30-0xb0",
    mlfb: "3RK7243-2AA30-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",

    productTypeId: "Communication Module",
    variantId: "cm1243-2",

    title: "SIMATIC S7-1200 CM 1243-2",

    description:
      "SIMATIC S7-1200 CM 1243-2 communication module serving as an AS-Interface master according to AS-i Specification V3.0.",

    lifecycle: "active",

    specifications: {
      function: "AS-Interface communication",
      interface: "AS-Interface",
      interfaces: ["AS-i"],
      protocols: ["AS-i V3.0"],
      supplyVoltage: "24 V DC",
      diagnostics: "Status and diagnostic LEDs",
      mounting: "S7-1200 expansion module",
      role: "AS-Interface master",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/WW/Catalog/Product/3RK7243-2AA30-0XB0",
  },

  // --------------------------------------------------
  // S7-1200 — CM 1243-5 — PROFIBUS DP Master
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-cm1243-5-5dx30-0xe0",
    mlfb: "6GK7243-5DX30-0XE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",

    productTypeId: "Communication Module",
    variantId: "cm1243-5",

    title: "SIMATIC S7-1200 CM 1243-5",

    description:
      "SIMATIC S7-1200 CM 1243-5 communication module for connecting an S7-1200 to PROFIBUS as a DP master, with PG/OP and S7 communication.",

    lifecycle: "active",

    specifications: {
      function: "PROFIBUS communication",
      interface: "PROFIBUS DP",
      interfaces: ["PROFIBUS"],
      protocols: ["PROFIBUS DP", "PG/OP", "S7 communication"],
      transmissionRate: "9.6 kbit/s to 12 Mbit/s",
      supplyVoltage: "24 V DC",
      connector: "9-pin Sub-D socket (RS485)",
      diagnostics: "Status and diagnostic LEDs",
      mounting: "S7-1200 expansion module",
      role: "DP master",
    },

    source:
      "https://mall.industry.siemens.com/goos/catalog/Pages/mmpdata.ashx?MLFB1=6GK7243-5DX30-0XE0&lang=en",
  },

  // --------------------------------------------------
  // SIPLUS S7-1200 — CM 1241 — RS232
  // --------------------------------------------------

  {
    id: "siemens-siplus-s7-1200-cm1241-rs232-1ah32-4xb0",
    mlfb: "6AG1241-1AH32-4XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",

    productTypeId: "Communication Module",
    variantId: "cm1241-rs232",

    title: "SIPLUS S7-1200 CM 1241 RS232",

    description:
      "SIPLUS S7-1200 CM 1241 based on 6ES7241-1AH32-0XB0, with conformal coating and extended environmental temperature range, RS232 interface and Freeport support.",

    lifecycle: "active",

    specifications: {
      function: "Serial communication",
      interface: "RS232",
      interfaces: ["RS232"],
      protocols: ["Freeport", "ASCII", "Modbus RTU"],
      supplyVoltage: "24 V DC",
      connector: "9-pole D-sub pin",
      diagnostics: "Status and diagnostic LEDs",
      mounting: "S7-1200 expansion module",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product/6AG1241-1AH32-4XB0",
  },

  // --------------------------------------------------
  // SIPLUS S7-1200 — CM 1241 — RS422/485
  // --------------------------------------------------

  {
    id: "siemens-siplus-s7-1200-cm1241-rs422-485-1ch32-4xb0",
    mlfb: "6AG1241-1CH32-4XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",

    productTypeId: "Communication Module",
    variantId: "cm1241-rs422-485",

    title: "SIPLUS S7-1200 CM 1241 RS422/485",

    description:
      "SIPLUS S7-1200 CM 1241 based on 6ES7241-1CH32-0XB0, with conformal coating and extended environmental temperature range, RS422/485 interface and Freeport support.",

    lifecycle: "active",

    specifications: {
      function: "Serial communication",
      interface: "RS422/485",
      interfaces: ["RS422", "RS485"],
      protocols: ["Freeport", "ASCII", "Modbus RTU"],
      supplyVoltage: "24 V DC",
      connector: "9-pole D-sub pin",
      diagnostics: "Status and diagnostic LEDs",
      mounting: "S7-1200 expansion module",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product/6AG1241-1CH32-4XB0",
  },

  // --------------------------------------------------
  // SIPLUS S7-1200 — CM 1242-5
  // --------------------------------------------------

  {
    id: "siemens-siplus-s7-1200-cm1242-5-5dx30-2xe0",
    mlfb: "6AG1242-5DX30-2XE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",

    productTypeId: "Communication Module",
    variantId: "cm1242-5",

    title: "SIPLUS S7-1200 CM 1242-5",

    description:
      "SIPLUS S7-1200 CM 1242-5 based on 6GK7242-5DX30-0XE0, with conformal coating and extended environmental temperature range, for PROFIBUS DP slave operation.",

    lifecycle: "active",

    specifications: {
      function: "PROFIBUS communication",
      interface: "PROFIBUS DP",
      interfaces: ["PROFIBUS"],
      protocols: ["PROFIBUS DP"],
      supplyVoltage: "24 V DC",
      connector: "9-pin Sub-D socket (RS485)",
      diagnostics: "Status and diagnostic LEDs",
      mounting: "S7-1200 expansion module",
      role: "DP slave",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product/6AG1242-5DX30-2XE0",
  },

  // --------------------------------------------------
  // SIPLUS S7-1200 — CM 1243-2
  // --------------------------------------------------

  {
    id: "siemens-siplus-s7-1200-cm1243-2-2aa30-7xb0",
    mlfb: "6AG1243-2AA30-7XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",

    productTypeId: "Communication Module",
    variantId: "cm1243-2",

    title: "SIPLUS S7-1200 CM 1243-2",

    description:
      "SIPLUS S7-1200 CM 1243-2 AS-Interface master based on the corresponding SIMATIC communication module, with conformal coating and extended environmental conditions.",

    lifecycle: "active",

    specifications: {
      function: "AS-Interface communication",
      interface: "AS-Interface",
      interfaces: ["AS-i"],
      protocols: ["AS-i V3.0"],
      supplyVoltage: "24 V DC",
      diagnostics: "Status and diagnostic LEDs",
      mounting: "S7-1200 expansion module",
      role: "AS-Interface master",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1243-2AA30-7XB0",
  },

  // --------------------------------------------------
  // SIPLUS S7-1200 — CM 1243-5
  // --------------------------------------------------

  {
    id: "siemens-siplus-s7-1200-cm1243-5-5dx30-2xe0",
    mlfb: "6AG1243-5DX30-2XE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",

    productTypeId: "Communication Module",
    variantId: "cm1243-5",

    title: "SIPLUS S7-1200 CM 1243-5",

    description:
      "SIPLUS S7-1200 CM 1243-5 based on 6GK7243-5DX30-0XE0, with conformal coating and extended environmental temperature range, for PROFIBUS DP master operation.",

    lifecycle: "active",

    specifications: {
      function: "PROFIBUS communication",
      interface: "PROFIBUS DP",
      interfaces: ["PROFIBUS"],
      protocols: ["PROFIBUS DP", "PG/OP", "S7 communication"],
      supplyVoltage: "24 V DC",
      connector: "9-pin Sub-D socket (RS485)",
      diagnostics: "Status and diagnostic LEDs",
      mounting: "S7-1200 expansion module",
      role: "DP master",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1243-5DX30-2XE0",
  },

  // --------------------------------------------------
  // SIPLUS S7-1200 — CM 1241 — RS232 (-40...+70 °C)
  // --------------------------------------------------

  {
    id: "siemens-siplus-s7-1200-cm1241-rs232-1ah32-2xb0",
    mlfb: "6AG1241-1AH32-2XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",

    productTypeId: "Communication Module",
    variantId: "cm1241-rs232",

    title: "SIPLUS S7-1200 CM 1241 RS232",

    description:
      "SIPLUS S7-1200 CM 1241 RS232 based on 6ES7241-1AH32-0XB0, with conformal coating and extended temperature range of -40 to +70 °C, with start-up from -25 °C.",

    lifecycle: "active",

    specifications: {
      function: "Serial communication",
      interface: "RS232",
      interfaces: ["RS232"],
      protocols: ["Freeport", "ASCII", "Modbus RTU"],
      supplyVoltage: "24 V DC",
      connector: "9-pole D-sub pin",
      diagnostics: "Status and diagnostic LEDs",
      mounting: "S7-1200 expansion module",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1241-1AH32-2XB0",
  },

  // --------------------------------------------------
  // SIPLUS S7-1200 — CM 1241 — RS422/485 (-40...+70 °C)
  // --------------------------------------------------

  {
    id: "siemens-siplus-s7-1200-cm1241-rs422-485-1ch32-2xb0",
    mlfb: "6AG1241-1CH32-2XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",

    productTypeId: "Communication Module",
    variantId: "cm1241-rs422-485",

    title: "SIPLUS S7-1200 CM 1241 RS422/485",

    description:
      "SIPLUS S7-1200 CM 1241 RS422/485 based on 6ES7241-1CH32-0XB0, with conformal coating and extended temperature range of -40 to +70 °C, with start-up from -25 °C.",

    lifecycle: "active",

    specifications: {
      function: "Serial communication",
      interface: "RS422/485",
      interfaces: ["RS422", "RS485"],
      protocols: ["Freeport", "ASCII", "Modbus RTU"],
      supplyVoltage: "24 V DC",
      connector: "9-pole D-sub pin",
      diagnostics: "Status and diagnostic LEDs",
      mounting: "S7-1200 expansion module",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1241-1CH32-2XB0",
  },

  // --------------------------------------------------
  // SIPLUS extreme RAIL — CM 1241 — RS232
  // --------------------------------------------------

  {
    id: "siemens-siplus-s7-1200-cm1241-rs232-rail-1ah32-1xb0",
    mlfb: "6AG2241-1AH32-1XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",

    productTypeId: "Communication Module",
    variantId: "cm1241-rs232",

    title: "SIPLUS S7-1200 CM 1241 RS232 RAIL",

    description:
      "SIPLUS extreme RAIL CM 1241 communication module for S7-1200 with RS232 serial interface for railway applications.",

    lifecycle: "active",

    specifications: {
      function: "Serial communication",
      interface: "RS232",
      interfaces: ["RS232"],
      protocols: ["Freeport", "ASCII", "Modbus RTU"],
      supplyVoltage: "24 V DC",
      diagnostics: "Status and diagnostic LEDs",
      mounting: "SIPLUS extreme RAIL",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oms/Catalog/Products/10303025",
  },

  // --------------------------------------------------
  // SIPLUS extreme RAIL — CM 1241 — RS422/485
  // --------------------------------------------------

  {
    id: "siemens-siplus-s7-1200-cm1241-rs422-485-rail-1ch32-1xb0",
    mlfb: "6AG2241-1CH32-1XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",

    productTypeId: "Communication Module",
    variantId: "cm1241-rs422-485",

    title: "SIPLUS S7-1200 CM 1241 RS422/485 RAIL",

    description:
      "SIPLUS extreme RAIL CM 1241 communication module for S7-1200 with RS422/485 serial interface for railway applications.",

    lifecycle: "active",

    specifications: {
      function: "Serial communication",
      interface: "RS422/485",
      interfaces: ["RS422", "RS485"],
      protocols: ["Freeport", "ASCII", "Modbus RTU"],
      supplyVoltage: "24 V DC",
      diagnostics: "Status and diagnostic LEDs",
      mounting: "SIPLUS extreme RAIL",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oms/Catalog/Products/10303025",
  },

  // --------------------------------------------------
  // SIPLUS extreme RAIL — CM 1242-5
  // --------------------------------------------------

  {
    id: "siemens-siplus-s7-1200-cm1242-5-rail-5dx30-1xe0",
    mlfb: "6AG2242-5DX30-1XE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",

    productTypeId: "Communication Module",
    variantId: "cm1242-5",

    title: "SIPLUS S7-1200 CM 1242-5 RAIL",

    description:
      "SIPLUS extreme RAIL CM 1242-5 communication module for S7-1200 PROFIBUS DP slave operation in railway applications.",

    lifecycle: "active",

    specifications: {
      function: "PROFIBUS communication",
      interface: "PROFIBUS DP",
      interfaces: ["PROFIBUS"],
      protocols: ["PROFIBUS DP"],
      supplyVoltage: "24 V DC",
      connector: "PROFIBUS interface",
      diagnostics: "Status and diagnostic LEDs",
      mounting: "SIPLUS extreme RAIL",
      role: "DP slave",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oms/Catalog/Products/10303097",
  },

  // --------------------------------------------------
  // SIPLUS extreme RAIL — CM 1243-5
  // --------------------------------------------------

  {
    id: "siemens-siplus-s7-1200-cm1243-5-rail-5dx30-1xe0",
    mlfb: "6AG2243-5DX30-1XE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",

    productTypeId: "Communication Module",
    variantId: "cm1243-5",

    title: "SIPLUS S7-1200 CM 1243-5 RAIL",

    description:
      "SIPLUS extreme RAIL CM 1243-5 communication module for S7-1200 PROFIBUS DP master operation in railway applications.",

    lifecycle: "active",

    specifications: {
      function: "PROFIBUS communication",
      interface: "PROFIBUS DP",
      interfaces: ["PROFIBUS"],
      protocols: ["PROFIBUS DP", "PG/OP", "S7 communication"],
      supplyVoltage: "24 V DC",
      connector: "PROFIBUS interface",
      diagnostics: "Status and diagnostic LEDs",
      mounting: "SIPLUS extreme RAIL",
      role: "DP master",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Products/10303098",
  },
];
