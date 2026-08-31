export type SiemensS71200SMLifecycle =
  "active" | "phase-out" | "spare-part" | "discontinued";

export interface SiemensS71200SignalModule {
  id: string;
  mlfb: string;

  brandId: "siemens";
  categoryId: "PLC";
  familyId: "S7-1200";
  seriesId: "S7-1200";

  productTypeId: "Signal Module";
  variantId: string;

  title: string;
  description: string;

  lifecycle: SiemensS71200SMLifecycle;

  specifications: {
    digitalInputs?: number;
    digitalOutputs?: number;
    analogInputs?: number;
    analogOutputs?: number;

    inputVoltage?: string;
    outputVoltage?: string;
    supplyVoltage?: string;

    inputCurrent?: string;
    outputCurrent?: string;

    resolution?: string;
    signalRanges?: string[];
    measurementType?: string[];

    interfaces?: string[];
    terminalConnection?: string;
    diagnostics?: string;
    interrupts?: string;
    isochronousMode?: boolean;

    failSafe?: boolean;
  };

  source: string;
}

export const siemensS71200SM: SiemensS71200SignalModule[] = [
  // --------------------------------------------------
  // S7-1200 — DIGITAL INPUT
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-sm1221-8",
    mlfb: "6ES7221-1BF32-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Module",
    variantId: "digital-input",

    title: "SIMATIC S7-1200 SM 1221 8 DI 24 V DC",

    description:
      "SIMATIC S7-1200 SM 1221 digital input module with 8 digital inputs, 24 V DC.",

    lifecycle: "active",

    specifications: {
      digitalInputs: 8,
      inputVoltage: "24 V DC",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/tstcloud/Api/Catalog/ExportInformation?catalogItemId=S7_1200&lang=en",
  },
  {
    id: "siemens-s7-1200-sm1221-16",
    mlfb: "6ES7221-1BH32-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Module",
    variantId: "digital-input",

    title: "SIMATIC S7-1200 SM 1221 16 DI 24 V DC",

    description:
      "SIMATIC S7-1200 SM 1221 digital input module with 16 digital inputs, 24 V DC.",

    lifecycle: "active",

    specifications: {
      digitalInputs: 16,
      inputVoltage: "24 V DC",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/tstcloud/Api/Catalog/ExportInformation?catalogItemId=S7_1200&lang=en",
  },

  // --------------------------------------------------
  // S7-1200 — DIGITAL OUTPUT
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-sm1222-1HF320XB0",
    mlfb: "6ES7222-1HF32-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Module",
    variantId: "digital-output",

    title: "SIMATIC S7-1200 SM 1222 8 DO relay",

    description:
      "SIMATIC S7-1200 SM 1222 digital output module with 8 digital outputs, relay.",

    lifecycle: "active",

    specifications: {
      digitalOutputs: 8,
      outputVoltage: "5-250 V AC/DC",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/tstcloud/Api/Catalog/ExportInformation?catalogItemId=S7_1200&lang=en",
  },
  {
    id: "siemens-s7-1200-sm1222-1XF320XB0",
    mlfb: "6ES7222-1XF32-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Module",
    variantId: "digital-output",

    title: "SIMATIC S7-1200 SM 1222 8 DO changeover relay",

    description:
      "SIMATIC S7-1200 SM 1222 digital output module with 8 digital outputs, changeover relay.",

    lifecycle: "active",

    specifications: {
      digitalOutputs: 8,
      outputVoltage: "5-250 V AC/DC",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/tstcloud/Api/Catalog/ExportInformation?catalogItemId=S7_1200&lang=en",
  },
  {
    id: "siemens-s7-1200-sm1222-1HH320XB0",
    mlfb: "6ES7222-1HH32-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Module",
    variantId: "digital-output",

    title: "SIMATIC S7-1200 SM 1222 16 DO relay",

    description:
      "SIMATIC S7-1200 SM 1222 digital output module with 16 digital outputs, relay.",

    lifecycle: "active",

    specifications: {
      digitalOutputs: 16,
      outputVoltage: "5-250 V AC/DC",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/tstcloud/Api/Catalog/ExportInformation?catalogItemId=S7_1200&lang=en",
  },
  {
    id: "siemens-s7-1200-sm1222-1BF320XB0",
    mlfb: "6ES7222-1BF32-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Module",
    variantId: "digital-output",

    title: "SIMATIC S7-1200 SM 1222 8 DO 24 V DC transistor",

    description:
      "SIMATIC S7-1200 SM 1222 digital output module with 8 digital outputs, 24 V DC transistor.",

    lifecycle: "active",

    specifications: {
      digitalOutputs: 8,
      outputVoltage: "24 V DC",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/tstcloud/Api/Catalog/ExportInformation?catalogItemId=S7_1200&lang=en",
  },
  {
    id: "siemens-s7-1200-sm1222-1BH320XB0",
    mlfb: "6ES7222-1BH32-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Module",
    variantId: "digital-output",

    title: "SIMATIC S7-1200 SM 1222 16 DO 24 V DC transistor",

    description:
      "SIMATIC S7-1200 SM 1222 digital output module with 16 digital outputs, 24 V DC transistor.",

    lifecycle: "active",

    specifications: {
      digitalOutputs: 16,
      outputVoltage: "24 V DC",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/tstcloud/Api/Catalog/ExportInformation?catalogItemId=S7_1200&lang=en",
  },
  {
    id: "siemens-s7-1200-sm1222-1BH321XB0",
    mlfb: "6ES7222-1BH32-1XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Module",
    variantId: "digital-output",

    title: "SIMATIC S7-1200 SM 1222 16 DO 24 V DC sinking transistor",

    description:
      "SIMATIC S7-1200 SM 1222 digital output module with 16 digital outputs, 24 V DC sinking transistor.",

    lifecycle: "active",

    specifications: {
      digitalOutputs: 16,
      outputVoltage: "24 V DC",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/tstcloud/Api/Catalog/ExportInformation?catalogItemId=S7_1200&lang=en",
  },

  // --------------------------------------------------
  // S7-1200 — DIGITAL IO
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-sm1223-1BH320XB0",
    mlfb: "6ES7223-1BH32-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Module",
    variantId: "digital-io",

    title: "SIMATIC S7-1200 SM 1223 8 DI / 8 DO",

    description:
      "SIMATIC S7-1200 SM 1223 digital I/O module with 8 digital inputs and 8 digital outputs, 24 V DC transistor.",

    lifecycle: "active",

    specifications: {
      digitalInputs: 8,
      digitalOutputs: 8,
      inputVoltage: "24 V DC",
      outputVoltage: "24 V DC",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/tstcloud/Api/Catalog/ExportInformation?catalogItemId=S7_1200&lang=en",
  },
  {
    id: "siemens-s7-1200-sm1223-1BL320XB0",
    mlfb: "6ES7223-1BL32-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Module",
    variantId: "digital-io",

    title: "SIMATIC S7-1200 SM 1223 16 DI / 16 DO",

    description:
      "SIMATIC S7-1200 SM 1223 digital I/O module with 16 digital inputs and 16 digital outputs, 24 V DC transistor.",

    lifecycle: "active",

    specifications: {
      digitalInputs: 16,
      digitalOutputs: 16,
      inputVoltage: "24 V DC",
      outputVoltage: "24 V DC",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/tstcloud/Api/Catalog/ExportInformation?catalogItemId=S7_1200&lang=en",
  },
  {
    id: "siemens-s7-1200-sm1223-1PH320XB0",
    mlfb: "6ES7223-1PH32-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Module",
    variantId: "digital-io",

    title: "SIMATIC S7-1200 SM 1223 8 DI / 8 DO",

    description:
      "SIMATIC S7-1200 SM 1223 digital I/O module with 8 digital inputs and 8 digital outputs, 24 V DC relay.",

    lifecycle: "active",

    specifications: {
      digitalInputs: 8,
      digitalOutputs: 8,
      inputVoltage: "24 V DC",
      outputVoltage: "relay",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/tstcloud/Api/Catalog/ExportInformation?catalogItemId=S7_1200&lang=en",
  },
  {
    id: "siemens-s7-1200-sm1223-1PL320XB0",
    mlfb: "6ES7223-1PL32-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Module",
    variantId: "digital-io",

    title: "SIMATIC S7-1200 SM 1223 16 DI / 16 DO",

    description:
      "SIMATIC S7-1200 SM 1223 digital I/O module with 16 digital inputs and 16 digital outputs, 24 V DC relay.",

    lifecycle: "active",

    specifications: {
      digitalInputs: 16,
      digitalOutputs: 16,
      inputVoltage: "24 V DC",
      outputVoltage: "relay",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/tstcloud/Api/Catalog/ExportInformation?catalogItemId=S7_1200&lang=en",
  },
  {
    id: "siemens-s7-1200-sm1223-1QH320XB0",
    mlfb: "6ES7223-1QH32-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Module",
    variantId: "digital-io",

    title: "SIMATIC S7-1200 SM 1223 8 DI / 8 DO",

    description:
      "SIMATIC S7-1200 SM 1223 digital I/O module with 8 digital inputs and 8 digital outputs, 120/230 V AC inputs, relay outputs.",

    lifecycle: "active",

    specifications: {
      digitalInputs: 8,
      digitalOutputs: 8,
      inputVoltage: "120/230 V AC",
      outputVoltage: "relay",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/tstcloud/Api/Catalog/ExportInformation?catalogItemId=S7_1200&lang=en",
  },
  {
    id: "siemens-s7-1200-sm1223-1BL321XB0",
    mlfb: "6ES7223-1BL32-1XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Module",
    variantId: "digital-io",

    title: "SIMATIC S7-1200 SM 1223 16 DI / 16 DO",

    description:
      "SIMATIC S7-1200 SM 1223 digital I/O module with 16 digital inputs and 16 digital outputs, 24 V DC sinking transistor.",

    lifecycle: "active",

    specifications: {
      digitalInputs: 16,
      digitalOutputs: 16,
      inputVoltage: "24 V DC",
      outputVoltage: "24 V DC",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/tstcloud/Api/Catalog/ExportInformation?catalogItemId=S7_1200&lang=en",
  },

  // --------------------------------------------------
  // S7-1200 — FAIL SAFE INPUT
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-sm1226-fdi16",
    mlfb: "6ES7226-6BA32-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Module",
    variantId: "fail-safe-input",

    title: "SIMATIC S7-1200 SM 1226 F-DI 16x 24 V DC",

    description:
      "SIMATIC S7-1200 fail-safe digital input module SM 1226 with 16 F-DI, 24 V DC.",

    lifecycle: "active",

    specifications: {
      digitalInputs: 16,
      inputVoltage: "24 V DC",
      interfaces: ["Backplane bus"],
      diagnostics: "Fail-safe diagnostics",
    },

    source:
      "https://mall.industry.siemens.com/tstcloud/Api/Catalog/ExportInformation?catalogItemId=S7_1200&lang=en",
  },

  // --------------------------------------------------
  // S7-1200 — FAIL SAFE OUTPUT
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-sm1226-fdq4",
    mlfb: "6ES7226-6DA32-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Module",
    variantId: "fail-safe-output",

    title: "SIMATIC S7-1200 SM 1226 F-DQ 4x 24 V DC",

    description:
      "SIMATIC S7-1200 fail-safe digital output module SM 1226 with 4 F-DQ, 24 V DC.",

    lifecycle: "active",

    specifications: {
      digitalOutputs: 4,
      outputVoltage: "24 V DC",
      interfaces: ["Backplane bus"],
      diagnostics: "Fail-safe diagnostics",
    },

    source:
      "https://mall.industry.siemens.com/tstcloud/Api/Catalog/ExportInformation?catalogItemId=S7_1200&lang=en",
  },
  {
    id: "siemens-s7-1200-sm1226-fdq2-relay",
    mlfb: "6ES7226-6RA32-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Module",
    variantId: "fail-safe-output",

    title: "SIMATIC S7-1200 SM 1226 F-DQ 2x Relay",

    description:
      "SIMATIC S7-1200 fail-safe digital output module SM 1226 with 2 relay F-DQ outputs.",

    lifecycle: "active",

    specifications: {
      digitalOutputs: 2,
      interfaces: ["Backplane bus"],
      diagnostics: "Fail-safe diagnostics",
    },

    source:
      "https://mall.industry.siemens.com/tstcloud/Api/Catalog/ExportInformation?catalogItemId=S7_1200&lang=en",
  },

  // --------------------------------------------------
  // S7-1200 — ANALOG INPUT
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-sm1231-4HD320XB0",
    mlfb: "6ES7231-4HD32-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Module",
    variantId: "analog-input",

    title:
      "SIMATIC S7-1200 SM 1231 4 AI, ±10 V / ±5 V / ±2.5 V / 0-20 mA / 4-20 mA",

    description:
      "SIMATIC S7-1200 SM 1231 analog input module, 4 AI, ±10 V / ±5 V / ±2.5 V / 0-20 mA / 4-20 mA.",

    lifecycle: "active",

    specifications: {
      analogInputs: 4,
      inputVoltage: "24 V DC",
      interfaces: ["Backplane bus"],
      signalRanges: ["Analog input ranges per variant"],
    },

    source:
      "https://mall.industry.siemens.com/tstcloud/Api/Catalog/ExportInformation?catalogItemId=S7_1200&lang=en",
  },
  {
    id: "siemens-s7-1200-sm1231-4HF320XB0",
    mlfb: "6ES7231-4HF32-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Module",
    variantId: "analog-input",

    title:
      "SIMATIC S7-1200 SM 1231 8 AI, ±10 V / ±5 V / ±2.5 V / 0-20 mA / 4-20 mA",

    description:
      "SIMATIC S7-1200 SM 1231 analog input module, 8 AI, ±10 V / ±5 V / ±2.5 V / 0-20 mA / 4-20 mA.",

    lifecycle: "active",

    specifications: {
      analogInputs: 8,
      inputVoltage: "24 V DC",
      interfaces: ["Backplane bus"],
      signalRanges: ["Analog input ranges per variant"],
    },

    source:
      "https://mall.industry.siemens.com/tstcloud/Api/Catalog/ExportInformation?catalogItemId=S7_1200&lang=en",
  },
  {
    id: "siemens-s7-1200-sm1231-5ND320XB0",
    mlfb: "6ES7231-5ND32-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Module",
    variantId: "analog-input",

    title: "SIMATIC S7-1200 SM 1231 4 AI, 16-bit",

    description: "SIMATIC S7-1200 SM 1231 analog input module, 4 AI, 16-bit.",

    lifecycle: "active",

    specifications: {
      analogInputs: 4,
      inputVoltage: "24 V DC",
      interfaces: ["Backplane bus"],
      signalRanges: ["Analog input ranges per variant"],
    },

    source:
      "https://mall.industry.siemens.com/tstcloud/Api/Catalog/ExportInformation?catalogItemId=S7_1200&lang=en",
  },
  {
    id: "siemens-s7-1200-sm1231-5PD320XB0",
    mlfb: "6ES7231-5PD32-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Module",
    variantId: "analog-input",

    title: "SIMATIC S7-1200 SM 1231 4 AI RTD",

    description: "SIMATIC S7-1200 SM 1231 analog input module, 4 AI RTD.",

    lifecycle: "active",

    specifications: {
      analogInputs: 4,
      inputVoltage: "24 V DC",
      interfaces: ["Backplane bus"],
      signalRanges: ["Analog input ranges per variant"],
    },

    source:
      "https://mall.industry.siemens.com/tstcloud/Api/Catalog/ExportInformation?catalogItemId=S7_1200&lang=en",
  },
  {
    id: "siemens-s7-1200-sm1231-5QF320XB0",
    mlfb: "6ES7231-5QF32-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Module",
    variantId: "analog-input",

    title: "SIMATIC S7-1200 SM 1231 8 AI thermocouples",

    description:
      "SIMATIC S7-1200 SM 1231 analog input module, 8 AI thermocouples.",

    lifecycle: "active",

    specifications: {
      analogInputs: 8,
      inputVoltage: "24 V DC",
      interfaces: ["Backplane bus"],
      signalRanges: ["Analog input ranges per variant"],
    },

    source:
      "https://mall.industry.siemens.com/tstcloud/Api/Catalog/ExportInformation?catalogItemId=S7_1200&lang=en",
  },

  // --------------------------------------------------
  // S7-1200 — ANALOG OUTPUT
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-sm1232-4HB320XB0",
    mlfb: "6ES7232-4HB32-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Module",
    variantId: "analog-output",

    title: "SIMATIC S7-1200 SM 1232 2 AO",

    description:
      "SIMATIC S7-1200 SM 1232 analog output module with 2 AO; ±10 V and 0(4)-20 mA ranges.",

    lifecycle: "active",

    specifications: {
      analogOutputs: 2,
      supplyVoltage: "24 V DC",
      interfaces: ["Backplane bus"],
      resolution: "14-bit voltage / 13-bit current",
    },

    source:
      "https://mall.industry.siemens.com/tstcloud/Api/Catalog/ExportInformation?catalogItemId=S7_1200&lang=en",
  },
  {
    id: "siemens-s7-1200-sm1232-4HD320XB0",
    mlfb: "6ES7232-4HD32-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Module",
    variantId: "analog-output",

    title: "SIMATIC S7-1200 SM 1232 4 AO",

    description:
      "SIMATIC S7-1200 SM 1232 analog output module with 4 AO; ±10 V and 0(4)-20 mA ranges.",

    lifecycle: "active",

    specifications: {
      analogOutputs: 4,
      supplyVoltage: "24 V DC",
      interfaces: ["Backplane bus"],
      resolution: "14-bit voltage / 13-bit current",
    },

    source:
      "https://mall.industry.siemens.com/tstcloud/Api/Catalog/ExportInformation?catalogItemId=S7_1200&lang=en",
  },

  // --------------------------------------------------
  // S7-1200 — ANALOG IO
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-sm1234-4HE300XB0",
    mlfb: "6ES7234-4HE30-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Module",
    variantId: "analog-io",

    title: "SIMATIC S7-1200 SM 1234 4 AI / 2 AO",

    description:
      "SIMATIC S7-1200 SM 1234 analog I/O module with 4 analog inputs and 2 analog outputs.",

    lifecycle: "spare-part",

    specifications: {
      analogInputs: 4,
      analogOutputs: 2,
      supplyVoltage: "24 V DC",
      interfaces: ["Backplane bus"],
      resolution: "14-bit voltage / 13-bit current",
    },

    source:
      "https://mall.industry.siemens.com/tstcloud/Api/Catalog/ExportInformation?catalogItemId=S7_1200&lang=en",
  },
  {
    id: "siemens-s7-1200-sm1234-4HE320XB0",
    mlfb: "6ES7234-4HE32-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Module",
    variantId: "analog-io",

    title: "SIMATIC S7-1200 SM 1234 4 AI / 2 AO",

    description:
      "SIMATIC S7-1200 SM 1234 analog I/O module with 4 analog inputs and 2 analog outputs.",

    lifecycle: "active",

    specifications: {
      analogInputs: 4,
      analogOutputs: 2,
      supplyVoltage: "24 V DC",
      interfaces: ["Backplane bus"],
      resolution: "14-bit voltage / 13-bit current",
    },

    source:
      "https://mall.industry.siemens.com/tstcloud/Api/Catalog/ExportInformation?catalogItemId=S7_1200&lang=en",
  },

  // --------------------------------------------------
  // S7-1200 — SIPLUS DIGITAL INPUT
  // --------------------------------------------------

  {
    id: "siemens-6ag12211bf324xb0",
    mlfb: "6AG1221-1BF32-4XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Module",
    variantId: "digital-input",

    title: "SIPLUS S7-1200 SM 1221 8DI",

    description:
      "SIPLUS S7-1200 SM 1221 8DI with conformal coating and extended environmental conditions.",

    lifecycle: "active",

    specifications: {
      digitalInputs: 8,
      inputVoltage: "24 V DC",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/tstcloud/Api/Catalog/ExportInformation?catalogItemId=S7_1200&lang=en",
  },
  {
    id: "siemens-6ag12211bh324xb0",
    mlfb: "6AG1221-1BH32-4XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Module",
    variantId: "digital-input",

    title: "SIPLUS S7-1200 SM 1221 16DI",

    description:
      "SIPLUS S7-1200 SM 1221 16DI with conformal coating and extended environmental conditions.",

    lifecycle: "active",

    specifications: {
      digitalInputs: 16,
      inputVoltage: "24 V DC",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/tstcloud/Api/Catalog/ExportInformation?catalogItemId=S7_1200&lang=en",
  },

  // --------------------------------------------------
  // S7-1200 — SIPLUS DIGITAL OUTPUT
  // --------------------------------------------------

  {
    id: "siemens-6ag12221bf324xb0",
    mlfb: "6AG1222-1BF32-4XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Module",
    variantId: "digital-output",

    title: "SIPLUS S7-1200 SM 1222 8DQ",

    description:
      "SIPLUS S7-1200 SM 1222 8DQ with conformal coating and extended environmental conditions.",

    lifecycle: "active",

    specifications: {
      digitalOutputs: 8,
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/tstcloud/Api/Catalog/ExportInformation?catalogItemId=S7_1200&lang=en",
  },
  {
    id: "siemens-6ag12221bh324xb0",
    mlfb: "6AG1222-1BH32-4XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Module",
    variantId: "digital-output",

    title: "SIPLUS S7-1200 SM 1222 16DQ",

    description:
      "SIPLUS S7-1200 SM 1222 16DQ with conformal coating and extended environmental conditions.",

    lifecycle: "active",

    specifications: {
      digitalOutputs: 16,
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/tstcloud/Api/Catalog/ExportInformation?catalogItemId=S7_1200&lang=en",
  },
  {
    id: "siemens-6ag12221hf324xb0",
    mlfb: "6AG1222-1HF32-4XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Module",
    variantId: "digital-output",

    title: "SIPLUS S7-1200 SM 1222 8DQ RLY",

    description:
      "SIPLUS S7-1200 SM 1222 8DQ RLY with conformal coating and extended environmental conditions.",

    lifecycle: "active",

    specifications: {
      digitalOutputs: 8,
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/tstcloud/Api/Catalog/ExportInformation?catalogItemId=S7_1200&lang=en",
  },
  {
    id: "siemens-6ag12221hh324xb0",
    mlfb: "6AG1222-1HH32-4XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Module",
    variantId: "digital-output",

    title: "SIPLUS S7-1200 SM 1222 16DQ RLY",

    description:
      "SIPLUS S7-1200 SM 1222 16DQ RLY with conformal coating and extended environmental conditions.",

    lifecycle: "active",

    specifications: {
      digitalOutputs: 16,
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/tstcloud/Api/Catalog/ExportInformation?catalogItemId=S7_1200&lang=en",
  },
  {
    id: "siemens-6ag12221xf324xb0",
    mlfb: "6AG1222-1XF32-4XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Module",
    variantId: "digital-output",

    title: "SIPLUS S7-1200 SM 1222 8DQ RLY",

    description:
      "SIPLUS S7-1200 SM 1222 8DQ RLY with conformal coating and extended environmental conditions.",

    lifecycle: "active",

    specifications: {
      digitalOutputs: 8,
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/tstcloud/Api/Catalog/ExportInformation?catalogItemId=S7_1200&lang=en",
  },

  // --------------------------------------------------
  // S7-1200 — SIPLUS DIGITAL IO
  // --------------------------------------------------

  {
    id: "siemens-6ag12231bh324xb0",
    mlfb: "6AG1223-1BH32-4XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Module",
    variantId: "digital-io",

    title: "SIPLUS S7-1200 SM 1223 8DI/8DQ",

    description:
      "SIPLUS S7-1200 SM 1223 8DI/8DQ with conformal coating and extended environmental conditions.",

    lifecycle: "active",

    specifications: {
      digitalInputs: 8,
      digitalOutputs: 8,
      inputVoltage: "24 V DC",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/tstcloud/Api/Catalog/ExportInformation?catalogItemId=S7_1200&lang=en",
  },
  {
    id: "siemens-6ag12231bl324xb0",
    mlfb: "6AG1223-1BL32-4XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Module",
    variantId: "digital-io",

    title: "SIPLUS S7-1200 SM 1223 16DI/16DQ",

    description:
      "SIPLUS S7-1200 SM 1223 16DI/16DQ with conformal coating and extended environmental conditions.",

    lifecycle: "active",

    specifications: {
      digitalInputs: 16,
      digitalOutputs: 16,
      inputVoltage: "24 V DC",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/tstcloud/Api/Catalog/ExportInformation?catalogItemId=S7_1200&lang=en",
  },
  {
    id: "siemens-6ag12231ph324xb0",
    mlfb: "6AG1223-1PH32-4XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Module",
    variantId: "digital-io",

    title: "SIPLUS S7-1200 SM 1223 8DI/8DQ RLY",

    description:
      "SIPLUS S7-1200 SM 1223 8DI/8DQ RLY with conformal coating and extended environmental conditions.",

    lifecycle: "active",

    specifications: {
      digitalInputs: 8,
      digitalOutputs: 8,
      inputVoltage: "24 V DC",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/tstcloud/Api/Catalog/ExportInformation?catalogItemId=S7_1200&lang=en",
  },
  {
    id: "siemens-6ag12231pl324xb0",
    mlfb: "6AG1223-1PL32-4XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Module",
    variantId: "digital-io",

    title: "SIPLUS S7-1200 SM 1223 16DI/16DQ RLY",

    description:
      "SIPLUS S7-1200 SM 1223 16DI/16DQ RLY with conformal coating and extended environmental conditions.",

    lifecycle: "active",

    specifications: {
      digitalInputs: 16,
      digitalOutputs: 16,
      inputVoltage: "24 V DC",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/tstcloud/Api/Catalog/ExportInformation?catalogItemId=S7_1200&lang=en",
  },
  {
    id: "siemens-6ag12231qh324xb0",
    mlfb: "6AG1223-1QH32-4XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "Signal Module",
    variantId: "digital-io",

    title: "SIPLUS S7-1200 SM 1223 8DI AC/8DQ RLY",

    description:
      "SIPLUS S7-1200 SM 1223 8DI AC/8DQ RLY with conformal coating and extended environmental conditions.",

    lifecycle: "active",

    specifications: {
      digitalInputs: 8,
      digitalOutputs: 8,
      inputVoltage: "120/230 V AC",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/mall/en/ww/Catalog/Product/6AG1223-1QH32-4XB0",
  },
];
