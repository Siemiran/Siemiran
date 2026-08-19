export type SiemensS71200SBLifecycle =
  "active" | "phase-out" | "spare-part" | "discontinued";

export interface SiemensS71200SignalBoard {
  id: string;
  mlfb: string;

  brandId: "siemens";
  categoryId: "PLC";
  familyId: "S7-1200";
  seriesId: "S7-1200";

  productTypeId: "Signal Board";
  variantId: string;

  title: string;
  description: string;

  lifecycle: SiemensS71200SBLifecycle;

  specifications: {
    function?: string;
    digitalInputs?: number;
    digitalOutputs?: number;
    analogInputs?: number;
    analogOutputs?: number;
    inputVoltage?: string;
    outputVoltage?: string;
    signalType?: string;
    resolution?: string;
    maximumFrequency?: string;
    interfaces?: string[];
    supplyVoltage?: string;
    terminalConnection?: string;
    diagnostics?: string;
    mounting?: string;
  };

  source: string;
}

export const s71200SignalBoards: SiemensS71200SignalBoard[] = [
  // --------------------------------------------------
  // S7-1200 — SB 1221 — 4 DI 24 V DC, 200 kHz
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-sb1221-di4-24vdc-200khz-3bd30-0xb0",
    mlfb: "6ES7221-3BD30-0XB0",
    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Board",
    variantId: "sb1221-di4-24vdc",

    title: "SIMATIC S7-1200 SB 1221 4 DI 24 V DC",
    description:
      "SIMATIC S7-1200 Signal Board SB 1221 with 4 digital inputs, 24 V DC, 200 kHz maximum input frequency.",

    lifecycle: "active",

    specifications: {
      function: "Digital input",
      digitalInputs: 4,
      inputVoltage: "24 V DC",
      maximumFrequency: "200 kHz",
      supplyVoltage: "5 V DC from CPU",
      diagnostics: "Status LED",
      mounting: "CPU signal board slot",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7221-3BD30-0XB0",
  },

  // --------------------------------------------------
  // S7-1200 — SB 1221 — 4 DI 5 V DC, 200 kHz
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-sb1221-di4-5vdc-200khz-3ad30-0xb0",
    mlfb: "6ES7221-3AD30-0XB0",
    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Board",
    variantId: "sb1221-di4-5vdc",

    title: "SIMATIC S7-1200 SB 1221 4 DI 5 V DC",
    description:
      "SIMATIC S7-1200 Signal Board SB 1221 with 4 digital inputs, 5 V DC, 200 kHz maximum input frequency.",

    lifecycle: "active",

    specifications: {
      function: "Digital input",
      digitalInputs: 4,
      inputVoltage: "5 V DC",
      maximumFrequency: "200 kHz",
      supplyVoltage: "5 V DC from CPU",
      diagnostics: "Status LED",
      mounting: "CPU signal board slot",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7221-3AD30-0XB0",
  },

  // --------------------------------------------------
  // S7-1200 — SB 1222 — 4 DQ 24 V DC, 200 kHz
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-sb1222-dq4-24vdc-200khz-1bd30-0xb0",
    mlfb: "6ES7222-1BD30-0XB0",
    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Board",
    variantId: "sb1222-dq4-24vdc",

    title: "SIMATIC S7-1200 SB 1222 4 DQ 24 V DC",
    description:
      "SIMATIC S7-1200 Signal Board SB 1222 with 4 digital outputs, 24 V DC, 200 kHz maximum output frequency.",

    lifecycle: "active",

    specifications: {
      function: "Digital output",
      digitalOutputs: 4,
      outputVoltage: "24 V DC",
      maximumFrequency: "200 kHz",
      supplyVoltage: "5 V DC from CPU",
      diagnostics: "Status LED",
      mounting: "CPU signal board slot",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7222-1BD30-0XB0",
  },

  // --------------------------------------------------
  // S7-1200 — SB 1222 — 4 DQ 5 V DC, 200 kHz
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-sb1222-dq4-5vdc-200khz-1ad30-0xb0",
    mlfb: "6ES7222-1AD30-0XB0",
    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Board",
    variantId: "sb1222-dq4-5vdc",

    title: "SIMATIC S7-1200 SB 1222 4 DQ 5 V DC",
    description:
      "SIMATIC S7-1200 Signal Board SB 1222 with 4 digital outputs, 5 V DC, 200 kHz maximum output frequency.",

    lifecycle: "active",

    specifications: {
      function: "Digital output",
      digitalOutputs: 4,
      outputVoltage: "5 V DC",
      maximumFrequency: "200 kHz",
      supplyVoltage: "5 V DC from CPU",
      diagnostics: "Status LED",
      mounting: "CPU signal board slot",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7222-1AD30-0XB0",
  },

  // --------------------------------------------------
  // S7-1200 — SB 1223 — 2 DI / 2 DO
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-sb1223-di2-do2-0bd30-0xb0",
    mlfb: "6ES7223-0BD30-0XB0",
    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Board",
    variantId: "sb1223-di2-do2-standard",

    title: "SIMATIC S7-1200 SB 1223 2 DI / 2 DO",
    description:
      "SIMATIC S7-1200 Signal Board SB 1223 with 2 digital inputs and 2 digital outputs.",

    lifecycle: "active",

    specifications: {
      function: "Digital input/output",
      digitalInputs: 2,
      digitalOutputs: 2,
      inputVoltage: "24 V DC",
      outputVoltage: "24 V DC",
      supplyVoltage: "5 V DC from CPU",
      diagnostics: "Status LED",
      mounting: "CPU signal board slot",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7223-0BD30-0XB0",
  },

  // --------------------------------------------------
  // S7-1200 — SB 1223 — 2 DI / 2 DO 24 V DC, 200 kHz
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-sb1223-di2-do2-24vdc-200khz-3bd30-0xb0",
    mlfb: "6ES7223-3BD30-0XB0",
    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Board",
    variantId: "sb1223-di2-do2-24vdc",

    title: "SIMATIC S7-1200 SB 1223 2 DI / 2 DQ 24 V DC",
    description:
      "SIMATIC S7-1200 Signal Board SB 1223 with 2 digital inputs and 2 digital outputs, 24 V DC, 200 kHz.",

    lifecycle: "active",

    specifications: {
      function: "Digital input/output",
      digitalInputs: 2,
      digitalOutputs: 2,
      inputVoltage: "24 V DC",
      outputVoltage: "24 V DC",
      maximumFrequency: "200 kHz",
      supplyVoltage: "5 V DC from CPU",
      diagnostics: "Status LED",
      mounting: "CPU signal board slot",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7223-3BD30-0XB0",
  },

  // --------------------------------------------------
  // S7-1200 — SB 1223 — 2 DI / 2 DO 5 V DC, 200 kHz
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-sb1223-di2-do2-5vdc-200khz-3ad30-0xb0",
    mlfb: "6ES7223-3AD30-0XB0",
    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Board",
    variantId: "sb1223-di2-do2-5vdc",

    title: "SIMATIC S7-1200 SB 1223 2 DI / 2 DQ 5 V DC",
    description:
      "SIMATIC S7-1200 Signal Board SB 1223 with 2 digital inputs and 2 digital outputs, 5 V DC, 200 kHz.",

    lifecycle: "active",

    specifications: {
      function: "Digital input/output",
      digitalInputs: 2,
      digitalOutputs: 2,
      inputVoltage: "5 V DC",
      outputVoltage: "5 V DC",
      maximumFrequency: "200 kHz",
      supplyVoltage: "5 V DC from CPU",
      diagnostics: "Status LED",
      mounting: "CPU signal board slot",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7223-3AD30-0XB0",
  },

  // --------------------------------------------------
  // S7-1200 — SB 1231 — 1 AI
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-sb1231-ai1-4ha30-0xb0",
    mlfb: "6ES7231-4HA30-0XB0",
    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Board",
    variantId: "sb1231-ai1",

    title: "SIMATIC S7-1200 SB 1231 1 AI",
    description:
      "SIMATIC S7-1200 Signal Board SB 1231 with 1 analog input and 12-bit resolution.",

    lifecycle: "active",

    specifications: {
      function: "Analog input",
      analogInputs: 1,
      signalType: "Voltage / current",
      resolution: "12 bit",
      supplyVoltage: "5 V DC from CPU",
      diagnostics: "Status LED",
      mounting: "CPU signal board slot",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7231-4HA30-0XB0",
  },

  // --------------------------------------------------
  // S7-1200 — SB 1231 — 1 AI RTD
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-sb1231-ai1-rtd-5pa30-0xb0",
    mlfb: "6ES7231-5PA30-0XB0",
    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Board",
    variantId: "sb1231-rtd",

    title: "SIMATIC S7-1200 SB 1231 RTD",
    description:
      "SIMATIC S7-1200 Signal Board SB 1231 RTD with 1 RTD analog input and 16-bit resolution.",

    lifecycle: "active",

    specifications: {
      function: "RTD analog input",
      analogInputs: 1,
      signalType: "RTD",
      resolution: "16 bit",
      supplyVoltage: "5 V DC from CPU",
      diagnostics: "Status LED",
      mounting: "CPU signal board slot",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7231-5PA30-0XB0",
  },

  // --------------------------------------------------
  // S7-1200 — SB 1231 — 1 AI Thermocouple
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-sb1231-ai1-tc-5qa30-0xb0",
    mlfb: "6ES7231-5QA30-0XB0",
    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Board",
    variantId: "sb1231-thermocouple",

    title: "SIMATIC S7-1200 SB 1231 TC 1 AI",
    description:
      "SIMATIC S7-1200 Signal Board SB 1231 thermocouple input with 1 analog input and 16-bit resolution.",

    lifecycle: "active",

    specifications: {
      function: "Thermocouple analog input",
      analogInputs: 1,
      signalType: "Thermocouple",
      resolution: "16 bit",
      supplyVoltage: "5 V DC from CPU",
      diagnostics: "Status LED",
      mounting: "CPU signal board slot",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7231-5QA30-0XB0",
  },

  // --------------------------------------------------
  // S7-1200 — SB 1232 — 1 AO
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-sb1232-ao1-4ha30-0xb0",
    mlfb: "6ES7232-4HA30-0XB0",
    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Board",
    variantId: "sb1232-ao1",

    title: "SIMATIC S7-1200 SB 1232 1 AO",
    description:
      "SIMATIC S7-1200 Signal Board SB 1232 with 1 analog output and 12-bit resolution.",

    lifecycle: "active",

    specifications: {
      function: "Analog output",
      analogOutputs: 1,
      signalType: "Voltage / current",
      resolution: "12 bit",
      supplyVoltage: "5 V DC from CPU",
      diagnostics: "Status LED",
      mounting: "CPU signal board slot",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7232-4HA30-0XB0",
  },

  // --------------------------------------------------
  // SIPLUS S7-1200 — SB 1221 — 4 DI 5 V DC
  // --------------------------------------------------

  {
    id: "siemens-siplus-s7-1200-sb1221-di4-5vdc-3ad30-5xb0",
    mlfb: "6AG1221-3AD30-5XB0",
    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Board",
    variantId: "siplus-sb1221-di4-5vdc",

    title: "SIPLUS S7-1200 SB 1221 4 DI 5 V DC",
    description:
      "SIPLUS S7-1200 SB 1221 with 4 digital inputs, 5 V DC, based on the corresponding SIMATIC signal board with conformal coating and extended environmental conditions.",

    lifecycle: "active",

    specifications: {
      function: "Digital input",
      digitalInputs: 4,
      inputVoltage: "5 V DC",
      maximumFrequency: "200 kHz",
      supplyVoltage: "5 V DC from CPU",
      diagnostics: "Status LED",
      mounting: "CPU signal board slot",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1221-3AD30-5XB0",
  },

  // --------------------------------------------------
  // SIPLUS S7-1200 — SB 1221 — 4 DI 24 V DC
  // --------------------------------------------------

  {
    id: "siemens-siplus-s7-1200-sb1221-di4-24vdc-3bd30-5xb0",
    mlfb: "6AG1221-3BD30-5XB0",
    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Board",
    variantId: "siplus-sb1221-di4-24vdc",

    title: "SIPLUS S7-1200 SB 1221 4 DI 24 V DC",
    description:
      "SIPLUS S7-1200 SB 1221 with 4 digital inputs, 24 V DC, based on the corresponding SIMATIC signal board with conformal coating and extended environmental conditions.",

    lifecycle: "active",

    specifications: {
      function: "Digital input",
      digitalInputs: 4,
      inputVoltage: "24 V DC",
      maximumFrequency: "200 kHz",
      supplyVoltage: "5 V DC from CPU",
      diagnostics: "Status LED",
      mounting: "CPU signal board slot",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1221-3BD30-5XB0",
  },

  // --------------------------------------------------
  // SIPLUS S7-1200 — SB 1222 — 4 DQ 5 V DC
  // --------------------------------------------------

  {
    id: "siemens-siplus-s7-1200-sb1222-dq4-5vdc-1ad30-5xb0",
    mlfb: "6AG1222-1AD30-5XB0",
    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Board",
    variantId: "siplus-sb1222-dq4-5vdc",

    title: "SIPLUS S7-1200 SB 1222 4 DQ 5 V DC",
    description:
      "SIPLUS S7-1200 SB 1222 with 4 digital outputs, 5 V DC, 200 kHz.",

    lifecycle: "active",

    specifications: {
      function: "Digital output",
      digitalOutputs: 4,
      outputVoltage: "5 V DC",
      maximumFrequency: "200 kHz",
      supplyVoltage: "5 V DC from CPU",
      diagnostics: "Status LED",
      mounting: "CPU signal board slot",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1222-1AD30-5XB0",
  },

  // --------------------------------------------------
  // SIPLUS S7-1200 — SB 1222 — 4 DQ 24 V DC
  // --------------------------------------------------

  {
    id: "siemens-siplus-s7-1200-sb1222-dq4-24vdc-1bd30-5xb0",
    mlfb: "6AG1222-1BD30-5XB0",
    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Board",
    variantId: "siplus-sb1222-dq4-24vdc",

    title: "SIPLUS S7-1200 SB 1222 4 DQ 24 V DC",
    description:
      "SIPLUS S7-1200 SB 1222 with 4 digital outputs, 24 V DC, 200 kHz.",

    lifecycle: "active",

    specifications: {
      function: "Digital output",
      digitalOutputs: 4,
      outputVoltage: "24 V DC",
      maximumFrequency: "200 kHz",
      supplyVoltage: "5 V DC from CPU",
      diagnostics: "Status LED",
      mounting: "CPU signal board slot",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1222-1BD30-5XB0",
  },

  // --------------------------------------------------
  // SIPLUS S7-1200 — SB 1223 — 2 DI / 2 DQ RAIL
  // --------------------------------------------------

  {
    id: "siemens-siplus-s7-1200-sb1223-di2-dq2-rail-0bd30-1xb0",
    mlfb: "6AG2223-0BD30-1XB0",
    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Board",
    variantId: "siplus-sb1223-rail",

    title: "SIPLUS S7-1200 SB 1223 2 DI / 2 DQ RAIL",
    description:
      "SIPLUS S7-1200 SB 1223 railway variant with 2 digital inputs and 2 digital outputs.",

    lifecycle: "active",

    specifications: {
      function: "Digital input/output",
      digitalInputs: 2,
      digitalOutputs: 2,
      inputVoltage: "24 V DC",
      outputVoltage: "24 V DC",
      supplyVoltage: "5 V DC from CPU",
      diagnostics: "Status LED",
      mounting: "CPU signal board slot",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG2223-0BD30-1XB0",
  },

  // --------------------------------------------------
  // SIPLUS S7-1200 — SB 1223 — 2 DI / 2 DQ 24 V DC
  // --------------------------------------------------

  {
    id: "siemens-siplus-s7-1200-sb1223-di2-dq2-24vdc-0bd30-4xb0",
    mlfb: "6AG1223-0BD30-4XB0",
    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Board",
    variantId: "siplus-sb1223-24vdc-extreme",

    title: "SIPLUS S7-1200 SB 1223 2 DI / 2 DQ 24 V DC",
    description:
      "SIPLUS S7-1200 SB 1223 with 2 digital inputs and 2 digital outputs, 24 V DC.",

    lifecycle: "active",

    specifications: {
      function: "Digital input/output",
      digitalInputs: 2,
      digitalOutputs: 2,
      inputVoltage: "24 V DC",
      outputVoltage: "24 V DC",
      supplyVoltage: "5 V DC from CPU",
      diagnostics: "Status LED",
      mounting: "CPU signal board slot",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1223-0BD30-4XB0",
  },

  // --------------------------------------------------
  // SIPLUS S7-1200 — SB 1223 — 2 DI / 2 DQ 24 V DC
  // --------------------------------------------------

  {
    id: "siemens-siplus-s7-1200-sb1223-di2-dq2-24vdc-0bd30-5xb0",
    mlfb: "6AG1223-0BD30-5XB0",
    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Board",
    variantId: "siplus-sb1223-24vdc",

    title: "SIPLUS S7-1200 SB 1223 2 DI / 2 DQ 24 V DC",
    description:
      "SIPLUS S7-1200 SB 1223 with 2 digital inputs and 2 digital outputs, 24 V DC.",

    lifecycle: "active",

    specifications: {
      function: "Digital input/output",
      digitalInputs: 2,
      digitalOutputs: 2,
      inputVoltage: "24 V DC",
      outputVoltage: "24 V DC",
      supplyVoltage: "5 V DC from CPU",
      diagnostics: "Status LED",
      mounting: "CPU signal board slot",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1223-0BD30-5XB0",
  },

  // --------------------------------------------------
  // SIPLUS S7-1200 — SB 1223 — 2 DI / 2 DQ 5 V DC
  // --------------------------------------------------

  {
    id: "siemens-siplus-s7-1200-sb1223-di2-dq2-5vdc-3ad30-5xb0",
    mlfb: "6AG1223-3AD30-5XB0",
    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Board",
    variantId: "siplus-sb1223-5vdc",

    title: "SIPLUS S7-1200 SB 1223 2 DI / 2 DQ 5 V DC",
    description:
      "SIPLUS S7-1200 SB 1223 with 2 digital inputs and 2 digital outputs, 5 V DC, 200 kHz.",

    lifecycle: "active",

    specifications: {
      function: "Digital input/output",
      digitalInputs: 2,
      digitalOutputs: 2,
      inputVoltage: "5 V DC",
      outputVoltage: "5 V DC",
      maximumFrequency: "200 kHz",
      supplyVoltage: "5 V DC from CPU",
      diagnostics: "Status LED",
      mounting: "CPU signal board slot",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1223-3AD30-5XB0",
  },

  // --------------------------------------------------
  // SIPLUS S7-1200 — SB 1223 — 2 DI / 2 DQ 24 V DC
  // --------------------------------------------------

  {
    id: "siemens-siplus-s7-1200-sb1223-di2-dq2-24vdc-3bd30-5xb0",
    mlfb: "6AG1223-3BD30-5XB0",
    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Board",
    variantId: "siplus-sb1223-24vdc-highspeed",

    title: "SIPLUS S7-1200 SB 1223 2 DI / 2 DQ 24 V DC",
    description:
      "SIPLUS S7-1200 SB 1223 with 2 digital inputs and 2 digital outputs, 24 V DC, 200 kHz.",

    lifecycle: "active",

    specifications: {
      function: "Digital input/output",
      digitalInputs: 2,
      digitalOutputs: 2,
      inputVoltage: "24 V DC",
      outputVoltage: "24 V DC",
      maximumFrequency: "200 kHz",
      supplyVoltage: "5 V DC from CPU",
      diagnostics: "Status LED",
      mounting: "CPU signal board slot",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1223-3BD30-5XB0",
  },

  // --------------------------------------------------
  // SIPLUS S7-1200 — SB 1231 — 1 AI RTD
  // --------------------------------------------------

  {
    id: "siemens-siplus-s7-1200-sb1231-ai1-rtd-5pa30-5xb0",
    mlfb: "6AG1231-5PA30-5XB0",
    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Board",
    variantId: "siplus-sb1231-rtd",

    title: "SIPLUS S7-1200 SB 1231 1 AI RTD",
    description:
      "SIPLUS S7-1200 SB 1231 RTD signal board with 1 RTD analog input and 16-bit resolution.",

    lifecycle: "active",

    specifications: {
      function: "RTD analog input",
      analogInputs: 1,
      signalType: "RTD",
      resolution: "16 bit",
      supplyVoltage: "5 V DC from CPU",
      diagnostics: "Status LED",
      mounting: "CPU signal board slot",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1231-5PA30-5XB0",
  },

  // --------------------------------------------------
  // SIPLUS S7-1200 — SB 1232 — 1 AQ
  // --------------------------------------------------

  {
    id: "siemens-siplus-s7-1200-sb1232-ao1-4ha30-4xb0",
    mlfb: "6AG1232-4HA30-4XB0",
    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Board",
    variantId: "siplus-sb1232-ao1",

    title: "SIPLUS S7-1200 SB 1232 1 AQ",
    description:
      "SIPLUS S7-1200 SB 1232 signal board with 1 analog output and 12-bit resolution.",

    lifecycle: "active",

    specifications: {
      function: "Analog output",
      analogOutputs: 1,
      signalType: "Voltage / current",
      resolution: "12 bit",
      supplyVoltage: "5 V DC from CPU",
      diagnostics: "Status LED",
      mounting: "CPU signal board slot",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1232-4HA30-4XB0",
  },

  // --------------------------------------------------
  // SIPLUS S7-1200 — SB 1232 — 1 AQ
  // --------------------------------------------------

  {
    id: "siemens-siplus-s7-1200-sb1232-ao1-4ha30-5xb0",
    mlfb: "6AG1232-4HA30-5XB0",
    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Board",
    variantId: "siplus-sb1232-ao1-extended",

    title: "SIPLUS S7-1200 SB 1232 1 AQ",
    description:
      "SIPLUS S7-1200 SB 1232 signal board with 1 analog output and 12-bit resolution.",

    lifecycle: "active",

    specifications: {
      function: "Analog output",
      analogOutputs: 1,
      signalType: "Voltage / current",
      resolution: "12 bit",
      supplyVoltage: "5 V DC from CPU",
      diagnostics: "Status LED",
      mounting: "CPU signal board slot",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1232-4HA30-5XB0",
  },
  // --------------------------------------------------
  // S7-1200 G2 — SIMATIC S7-1200 G2 SB 1221 8 DI 24 V DC
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-g2-sb1221-di8-24vdc",
    mlfb: "6ES7221-3BF50-0XB0",
    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Board",
    variantId: "g2-sb1221-di8-24vdc",

    title: "SIMATIC S7-1200 G2 SB 1221 8 DI 24 V DC",
    description:
      "SIMATIC S7-1200 G2 Signal Board SB 1221 with 8 digital inputs, 24 V DC, 100 kHz.",

    lifecycle: "active",

    specifications: {
      function: "Digital input",
      digitalInputs: 8,
      inputVoltage: "24 V DC",
      maximumFrequency: "100 kHz",
      diagnostics: "Status LED",
      mounting: "CPU signal board slot",
    },

    source:
      "https://mall.industry.siemens.com/goos/catalog/Pages/mmpdata.ashx?MLFB1=6ES7221-3BF50-0XB0&lang=en",
  },
  // --------------------------------------------------
  // S7-1200 G2 — SIMATIC S7-1200 G2 SB 1222 8 DQ 24 V DC
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-g2-sb1222-dq8-24vdc",
    mlfb: "6ES7222-5BF50-0XB0",
    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Board",
    variantId: "g2-sb1222-dq8-24vdc",

    title: "SIMATIC S7-1200 G2 SB 1222 8 DQ 24 V DC",
    description:
      "SIMATIC S7-1200 G2 Signal Board SB 1222 with 8 digital outputs, 24 V DC, 100 kHz.",

    lifecycle: "active",

    specifications: {
      function: "Digital output",
      digitalOutputs: 8,
      outputVoltage: "24 V DC",
      maximumFrequency: "100 kHz",
      diagnostics: "Status LED",
      mounting: "CPU signal board slot",
    },

    source:
      "https://mall.industry.siemens.com/goos/catalog/Pages/mmpdata.ashx?MLFB1=6ES7222-5BF50-0XB0&lang=en",
  },
  // --------------------------------------------------
  // S7-1200 G2 — SIMATIC S7-1200 G2 SB 1223 4 DI / 4 DQ 24 V DC
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-g2-sb1223-di4-dq4-24vdc",
    mlfb: "6ES7223-7BF50-0XB0",
    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Board",
    variantId: "g2-sb1223-di4-dq4-24vdc",

    title: "SIMATIC S7-1200 G2 SB 1223 4 DI / 4 DQ 24 V DC",
    description:
      "SIMATIC S7-1200 G2 Signal Board SB 1223 with 4 digital inputs and 4 digital outputs, 24 V DC, 100 kHz.",

    lifecycle: "active",

    specifications: {
      function: "Digital input/output",
      digitalInputs: 4,
      digitalOutputs: 4,
      inputVoltage: "24 V DC",
      outputVoltage: "24 V DC",
      maximumFrequency: "100 kHz",
      diagnostics: "Status LED",
      mounting: "CPU signal board slot",
    },

    source:
      "https://mall.industry.siemens.com/goos/catalog/Pages/mmpdata.ashx?MLFB1=6ES7223-7BF50-0XB0&lang=en",
  },
  // --------------------------------------------------
  // S7-1200 G2 — SIMATIC S7-1200 G2 SB 1223 4 DI / 4 DQ 5 V DC
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-g2-sb1223-di4-dq4-5vdc",
    mlfb: "6ES7223-7AF50-0XB0",
    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Board",
    variantId: "g2-sb1223-di4-dq4-5vdc",

    title: "SIMATIC S7-1200 G2 SB 1223 4 DI / 4 DQ 5 V DC",
    description:
      "SIMATIC S7-1200 G2 Signal Board SB 1223 with 4 digital inputs and 4 digital outputs, 5 V DC, 200 kHz.",

    lifecycle: "active",

    specifications: {
      function: "Digital input/output",
      digitalInputs: 4,
      digitalOutputs: 4,
      inputVoltage: "5 V DC",
      outputVoltage: "5 V DC",
      maximumFrequency: "200 kHz",
      diagnostics: "Status LED",
      mounting: "CPU signal board slot",
    },

    source:
      "https://mall.industry.siemens.com/goos/catalog/Pages/mmpdata.ashx?MLFB1=6ES7223-7AF50-0XB0&lang=en",
  },
  // --------------------------------------------------
  // S7-1200 G2 — SIMATIC S7-1200 G2 SB 1231 4 AI
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-g2-sb1231-ai4",
    mlfb: "6ES7231-4HD50-0XB0",
    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Board",
    variantId: "g2-sb1231-ai4",

    title: "SIMATIC S7-1200 G2 SB 1231 4 AI",
    description:
      "SIMATIC S7-1200 G2 Signal Board SB 1231 with 4 analog inputs and 14-bit ADC resolution.",

    lifecycle: "active",

    specifications: {
      function: "Analog input",
      analogInputs: 4,
      signalType: "Voltage / current",
      resolution: "14 bit",
      diagnostics: "Status LED",
      mounting: "CPU signal board slot",
    },

    source:
      "https://mall.industry.siemens.com/goos/catalog/Pages/mmpdata.ashx?MLFB1=6ES7231-4HD50-0XB0&lang=en",
  },
  // --------------------------------------------------
  // S7-1200 G2 — SIMATIC S7-1200 G2 SB 1231 RTD 2 AI
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-g2-sb1231-rtd-ai2",
    mlfb: "6ES7231-5PB50-0XB0",
    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Board",
    variantId: "g2-sb1231-rtd-ai2",

    title: "SIMATIC S7-1200 G2 SB 1231 RTD 2 AI",
    description:
      "SIMATIC S7-1200 G2 Signal Board SB 1231 RTD with 2 RTD analog inputs for Pt100 and Pt1000 sensors.",

    lifecycle: "active",

    specifications: {
      function: "RTD analog input",
      analogInputs: 2,
      signalType: "RTD",
      diagnostics: "Status LED",
      mounting: "CPU signal board slot",
    },

    source:
      "https://mall.industry.siemens.com/goos/catalog/Pages/mmpdata.ashx?MLFB1=6ES7231-5PB50-0XB0&lang=en",
  },
  // --------------------------------------------------
  // S7-1200 G2 — SIMATIC S7-1200 G2 SB 1231 TC 4 AI
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-g2-sb1231-tc-ai4",
    mlfb: "6ES7231-5QD50-0XB0",
    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Board",
    variantId: "g2-sb1231-tc-ai4",

    title: "SIMATIC S7-1200 G2 SB 1231 TC 4 AI",
    description:
      "SIMATIC S7-1200 G2 Signal Board SB 1231 TC with 4 thermocouple analog inputs.",

    lifecycle: "active",

    specifications: {
      function: "Thermocouple analog input",
      analogInputs: 4,
      signalType: "Thermocouple",
      diagnostics: "Status LED",
      mounting: "CPU signal board slot",
    },

    source:
      "https://mall.industry.siemens.com/goos/catalog/Pages/mmpdata.ashx?MLFB1=6ES7231-5QD50-0XB0&lang=en",
  },
  // --------------------------------------------------
  // S7-1200 G2 — SIMATIC S7-1200 G2 SB 1232 4 AO
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-g2-sb1232-ao4",
    mlfb: "6ES7232-4HD50-0XB0",
    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Board",
    variantId: "g2-sb1232-ao4",

    title: "SIMATIC S7-1200 G2 SB 1232 4 AO",
    description:
      "SIMATIC S7-1200 G2 Signal Board SB 1232 with 4 analog outputs and 14-bit DAC resolution.",

    lifecycle: "active",

    specifications: {
      function: "Analog output",
      analogOutputs: 4,
      signalType: "Voltage / current",
      resolution: "14 bit",
      diagnostics: "Status LED",
      mounting: "CPU signal board slot",
    },

    source:
      "https://mall.industry.siemens.com/goos/catalog/Pages/mmpdata.ashx?MLFB1=6ES7232-4HD50-0XB0&lang=en",
  },
  // --------------------------------------------------
  // S7-1200 G2 — SIMATIC S7-1200 G2 SB 1233 2 AI / 2 AO
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-g2-sb1233-ai2-ao2",
    mlfb: "6ES7233-4HD50-0XB0",
    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Board",
    variantId: "g2-sb1233-ai2-ao2",

    title: "SIMATIC S7-1200 G2 SB 1233 2 AI / 2 AO",
    description:
      "SIMATIC S7-1200 G2 Signal Board SB 1233 with 2 analog inputs and 2 analog outputs, both with 14-bit resolution.",

    lifecycle: "active",

    specifications: {
      function: "Analog input/output",
      analogInputs: 2,
      analogOutputs: 2,
      signalType: "Voltage / current",
      resolution: "14 bit",
      diagnostics: "Status LED",
      mounting: "CPU signal board slot",
    },

    source:
      "https://mall.industry.siemens.com/goos/catalog/Pages/mmpdata.ashx?MLFB1=6ES7233-4HD50-0XB0&lang=en",
  },
];
