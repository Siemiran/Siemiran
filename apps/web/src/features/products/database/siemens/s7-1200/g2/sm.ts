export type SiemensS71200G2SMLifecycle =
  "active" | "phase-out" | "spare-part" | "discontinued";

export interface SiemensS71200G2SignalModule {
  id: string;
  mlfb: string;

  brandId: "siemens";
  categoryId: "PLC";
  familyId: "S7-1200";
  seriesId: "S7-1200 G2";

  productTypeId: "Signal Module";
  variantId: string;

  title: string;
  description: string;

  lifecycle: SiemensS71200G2SMLifecycle;

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

export const siemensS71200G2SM: SiemensS71200G2SignalModule[] = [
  {
    id: "siemens-s7-1200-g2-sm1222-16do",
    mlfb: "6ES7222-5BH50-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200 G2",
    productTypeId: "Signal Module",
    variantId: "digital-output",

    title: "SIMATIC S7-1200 G2 SM 1222 16 DO 24 V DC",

    description:
      "SIMATIC S7-1200 G2 SM 1222 digital output module with 16 digital outputs, 24 V DC, 0.5 A sourcing transistor.",

    lifecycle: "active",

    specifications: {
      digitalOutputs: 16,
      outputVoltage: "24 V DC",
      outputCurrent: "0.5 A",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7222-5BH50-0XB0",
  },
  {
    id: "siemens-s7-1200-g2-sm1222-16relay",
    mlfb: "6ES7222-5HH50-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200 G2",
    productTypeId: "Signal Module",
    variantId: "digital-output",

    title: "SIMATIC S7-1200 G2 SM 1222 16 DO Relay",

    description:
      "SIMATIC S7-1200 G2 SM 1222 digital output module with 16 relay outputs, 2 A.",

    lifecycle: "active",

    specifications: {
      digitalOutputs: 16,
      outputCurrent: "2 A",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7222-5HH50-0XB0",
  },
  {
    id: "siemens-s7-1200-g2-sm1223-8di8do",
    mlfb: "6ES7223-5BH50-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200 G2",
    productTypeId: "Signal Module",
    variantId: "digital-io",

    title: "SIMATIC S7-1200 G2 SM 1223 8 DI / 8 DO",

    description:
      "SIMATIC S7-1200 G2 SM 1223 digital I/O module with 8 digital inputs and 8 digital outputs, 24 V DC, 0.5 A sourcing transistor.",

    lifecycle: "active",

    specifications: {
      digitalInputs: 8,
      digitalOutputs: 8,
      inputVoltage: "24 V DC",
      outputVoltage: "24 V DC",
      outputCurrent: "0.5 A",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7223-5BH50-0XB0",
  },
  {
    id: "siemens-s7-1200-g2-sm1223-8di8relay",
    mlfb: "6ES7223-5PH50-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200 G2",
    productTypeId: "Signal Module",
    variantId: "digital-io",

    title: "SIMATIC S7-1200 G2 SM 1223 8 DI / 8 DO Relay",

    description:
      "SIMATIC S7-1200 G2 SM 1223 digital I/O module with 8 digital inputs and 8 relay outputs, 2 A.",

    lifecycle: "active",

    specifications: {
      digitalInputs: 8,
      digitalOutputs: 8,
      inputVoltage: "24 V DC",
      outputCurrent: "2 A",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7223-5PH50-0XB0",
  },
  {
    id: "siemens-s7-1200-g2-sm1231-8ai",
    mlfb: "6ES7231-4HF50-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200 G2",
    productTypeId: "Signal Module",
    variantId: "analog-input",

    title: "SIMATIC S7-1200 G2 SM 1231 8 AI",

    description:
      "SIMATIC S7-1200 G2 SM 1231 analog input module with 8 differential AI, 14-bit ADC, ±10 V/±5 V/±2.5 V or 0-20 mA/4-20 mA.",

    lifecycle: "active",

    specifications: {
      analogInputs: 8,
      supplyVoltage: "24 V DC",
      interfaces: ["Backplane bus"],
      resolution: "14-bit ADC",
      signalRanges: ["±10 V", "±5 V", "±2.5 V", "0-20 mA", "4-20 mA"],
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7231-4HF50-0XB0",
  },
  {
    id: "siemens-s7-1200-g2-sm1231-5QF500XB0",
    mlfb: "6ES7231-5QF50-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200 G2",
    productTypeId: "Signal Module",
    variantId: "analog-input",

    title: "SIMATIC S7-1200 G2 SM 1231 8 AI thermocouples",

    description:
      "SIMATIC S7-1200 G2 SM 1231 thermocouple module with 8 AI thermocouples.",

    lifecycle: "active",

    specifications: {
      analogInputs: 8,
      supplyVoltage: "24 V DC",
      interfaces: ["Backplane bus"],
      measurementType: ["Thermocouple"],
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7231-5QF50-0XB0",
  },
  {
    id: "siemens-s7-1200-g2-sm1231-4ai-rtd",
    mlfb: "6ES7231-5PD50-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200 G2",
    productTypeId: "Signal Module",
    variantId: "analog-input",

    title: "SIMATIC S7-1200 G2 SM 1231 RTD 4 AI",

    description:
      "SIMATIC S7-1200 G2 SM 1231 RTD analog input module with 4 AI for Pt100 and Pt1000 resistance temperature detectors.",

    lifecycle: "active",

    specifications: {
      analogInputs: 4,
      supplyVoltage: "24 V DC",
      interfaces: ["Backplane bus"],
      measurementType: ["RTD"],
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7231-5PD50-0XB0",
  },
  {
    id: "siemens-s7-1200-g2-sm1232-8ao",
    mlfb: "6ES7232-4HF50-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200 G2",
    productTypeId: "Signal Module",
    variantId: "analog-output",

    title: "SIMATIC S7-1200 G2 SM 1232 8 AO",

    description:
      "SIMATIC S7-1200 G2 SM 1232 analog output module with 8 analog outputs, 14-bit DAC, and ±10 V, 0-20 mA or 4-20 mA output ranges.",

    lifecycle: "active",

    specifications: {
      analogOutputs: 8,
      supplyVoltage: "24 V DC",
      interfaces: ["Backplane bus"],
      resolution: "14-bit DAC",
      signalRanges: ["±10 V", "0-20 mA", "4-20 mA"],
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7232-4HF50-0XB0",
  },
  {
    id: "siemens-s7-1200-g2-sm1233-4ai4ao",
    mlfb: "6ES7233-4HF50-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200 G2",
    productTypeId: "Signal Module",
    variantId: "analog-io",

    title: "SIMATIC S7-1200 G2 SM 1233 4 AI / 4 AO",

    description:
      "SIMATIC S7-1200 G2 SM 1233 analog input/output module with 4 analog inputs and 4 analog outputs, 14-bit resolution.",

    lifecycle: "active",

    specifications: {
      analogInputs: 4,
      analogOutputs: 4,
      supplyVoltage: "24 V DC",
      interfaces: ["Backplane bus"],
      resolution: "14-bit ADC / 14-bit DAC",
      signalRanges: ["±10 V", "±5 V", "±2.5 V", "0-20 mA", "4-20 mA"],
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7233-4HF50-0XB0",
  },
];
