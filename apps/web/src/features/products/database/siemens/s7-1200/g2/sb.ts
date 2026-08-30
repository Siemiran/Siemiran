export type SiemensS71200G2SBLifecycle =
  "active" | "phase-out" | "spare-part" | "discontinued";

export interface SiemensS71200G2SignalBoard {
  id: string;
  mlfb: string;

  brandId: "siemens";
  categoryId: "PLC";
  familyId: "S7-1200";
  seriesId: "S7-1200 G2";

  productTypeId: "Signal Board";
  variantId: string;

  title: string;
  description: string;

  lifecycle: SiemensS71200G2SBLifecycle;

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

export const s71200G2SignalBoards: SiemensS71200G2SignalBoard[] = [
  {
    id: "siemens-s7-1200-g2-sb1221-di8-24vdc",
    mlfb: "6ES7221-3BF50-0XB0",
    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200 G2",
    productTypeId: "Signal Board",
    variantId: "sb1221-di8-24vdc",

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
  {
    id: "siemens-s7-1200-g2-sb1222-dq8-24vdc",
    mlfb: "6ES7222-5BF50-0XB0",
    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200 G2",
    productTypeId: "Signal Board",
    variantId: "sb1222-dq8-24vdc",

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
  {
    id: "siemens-s7-1200-g2-sb1223-di4-dq4-24vdc",
    mlfb: "6ES7223-7BF50-0XB0",
    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200 G2",
    productTypeId: "Signal Board",
    variantId: "sb1223-di4-dq4-24vdc",

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
  {
    id: "siemens-s7-1200-g2-sb1223-di4-dq4-5vdc",
    mlfb: "6ES7223-7AF50-0XB0",
    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200 G2",
    productTypeId: "Signal Board",
    variantId: "sb1223-di4-dq4-5vdc",

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
  {
    id: "siemens-s7-1200-g2-sb1231-ai4",
    mlfb: "6ES7231-4HD50-0XB0",
    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200 G2",
    productTypeId: "Signal Board",
    variantId: "sb1231-ai4",

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
  {
    id: "siemens-s7-1200-g2-sb1231-rtd-ai2",
    mlfb: "6ES7231-5PB50-0XB0",
    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200 G2",
    productTypeId: "Signal Board",
    variantId: "sb1231-rtd-ai2",

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
  {
    id: "siemens-s7-1200-g2-sb1231-tc-ai4",
    mlfb: "6ES7231-5QD50-0XB0",
    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200 G2",
    productTypeId: "Signal Board",
    variantId: "sb1231-tc-ai4",

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
  {
    id: "siemens-s7-1200-g2-sb1232-ao4",
    mlfb: "6ES7232-4HD50-0XB0",
    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200 G2",
    productTypeId: "Signal Board",
    variantId: "sb1232-ao4",

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
  {
    id: "siemens-s7-1200-g2-sb1233-ai2-ao2",
    mlfb: "6ES7233-4HD50-0XB0",
    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200 G2",
    productTypeId: "Signal Board",
    variantId: "sb1233-ai2-ao2",

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
