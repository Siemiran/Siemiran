export type SiemensS71200Lifecycle =
  "active" | "phase-out" | "spare-part" | "discontinued";

export interface SiemensS71200CPUProduct {
  id: string;
  mlfb: string;

  brandId: "siemens";
  categoryId: "PLC";
  familyId: "S7-1200";
  seriesId: "S7-1200" | "S7-1200 G2";
  productTypeId: "CPU";
  variantId: string;

  title: string;
  description: string;

  lifecycle: SiemensS71200Lifecycle;

  specifications: {
    workMemory?: string;
    programDataMemory?: string;
    loadMemory?: string;
    retentiveMemory?: string;
    interfaces?: string[];
    profinetPorts?: number;
    supplyVoltage?: string;
    digitalInputs?: number;
    digitalOutputs?: number;
    analogInputs?: number;
    analogOutputs?: number;
    specialDigitalInputs?: string;
    specialDigitalOutputs?: string;
    memoryCard?: string;
  };

  source: string;
}

export const siemensS71200CPU: SiemensS71200CPUProduct[] = [
  // --------------------------------------------------
  // S7-1200 — Classic Compact CPUs
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-cpu-211-1ae40",
    mlfb: "6ES7211-1AE40-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "compact",

    title: "SIMATIC S7-1200 CPU 1211C DC/DC/DC",

    description:
      "SIMATIC S7-1200 compact CPU 1211C DC/DC/DC. Onboard I/O: 6 digital inputs and 4 digital outputs. 2 analog inputs 0-10 V DC.",

    lifecycle: "active",

    specifications: {
      workMemory: "30 KB",
      programDataMemory: "75 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 1,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 6,
      digitalOutputs: 4,
      analogInputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7211-1AE40-0XB0",
  },

  {
    id: "siemens-s7-1200-cpu-211-1he40",
    mlfb: "6ES7211-1HE40-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "compact",

    title: "SIMATIC S7-1200 CPU 1211C DC/DC/RLY",

    description:
      "SIMATIC S7-1200 compact CPU 1211C DC/DC/RLY. Onboard I/O: 6 digital inputs and 4 digital outputs. 2 analog inputs 0-10 V DC.",

    lifecycle: "active",

    specifications: {
      workMemory: "30 KB",
      programDataMemory: "75 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 1,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 6,
      digitalOutputs: 4,
      analogInputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7211-1HE40-0XB0",
  },

  {
    id: "siemens-s7-1200-cpu-211-1be40",
    mlfb: "6ES7211-1BE40-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "compact",

    title: "SIMATIC S7-1200 CPU 1211C AC/DC/RLY",

    description:
      "SIMATIC S7-1200 compact CPU 1211C AC/DC/RLY. Onboard I/O: 6 digital inputs and 4 digital outputs. 2 analog inputs 0-10 V DC.",

    lifecycle: "active",

    specifications: {
      workMemory: "30 KB",
      programDataMemory: "75 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 1,
      supplyVoltage: "85-264 V AC",
      digitalInputs: 6,
      digitalOutputs: 4,
      analogInputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7211-1BE40-0XB0",
  },

  {
    id: "siemens-s7-1200-cpu-212-1ae40",
    mlfb: "6ES7212-1AE40-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "compact",

    title: "SIMATIC S7-1200 CPU 1212C DC/DC/DC",

    description:
      "SIMATIC S7-1200 compact CPU 1212C DC/DC/DC. Onboard I/O: 8 digital inputs and 6 digital outputs. 2 analog inputs 0-10 V DC.",

    lifecycle: "active",

    specifications: {
      workMemory: "50 KB",
      programDataMemory: "100 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 1,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 8,
      digitalOutputs: 6,
      analogInputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7212-1AE40-0XB0",
  },

  {
    id: "siemens-s7-1200-cpu-212-1he40",
    mlfb: "6ES7212-1HE40-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "compact",

    title: "SIMATIC S7-1200 CPU 1212C DC/DC/RLY",

    description:
      "SIMATIC S7-1200 compact CPU 1212C DC/DC/RLY. Onboard I/O: 8 digital inputs and 6 digital outputs. 2 analog inputs 0-10 V DC.",

    lifecycle: "active",

    specifications: {
      workMemory: "50 KB",
      programDataMemory: "100 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 1,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 8,
      digitalOutputs: 6,
      analogInputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7212-1HE40-0XB0",
  },

  {
    id: "siemens-s7-1200-cpu-212-1be40",
    mlfb: "6ES7212-1BE40-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "compact",

    title: "SIMATIC S7-1200 CPU 1212C AC/DC/RLY",

    description:
      "SIMATIC S7-1200 compact CPU 1212C AC/DC/RLY. Onboard I/O: 8 digital inputs and 6 digital outputs. 2 analog inputs 0-10 V DC.",

    lifecycle: "active",

    specifications: {
      workMemory: "50 KB",
      programDataMemory: "100 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 1,
      supplyVoltage: "85-264 V AC",
      digitalInputs: 8,
      digitalOutputs: 6,
      analogInputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7212-1BE40-0XB0",
  },

  {
    id: "siemens-s7-1200-cpu-214-1ag40",
    mlfb: "6ES7214-1AG40-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "compact",

    title: "SIMATIC S7-1200 CPU 1214C DC/DC/DC",

    description:
      "SIMATIC S7-1200 compact CPU 1214C DC/DC/DC. Onboard I/O: 14 digital inputs and 10 digital outputs. 2 analog inputs 0-10 V DC.",

    lifecycle: "active",

    specifications: {
      workMemory: "75 KB",
      programDataMemory: "150 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 1,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 14,
      digitalOutputs: 10,
      analogInputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7214-1AG40-0XB0",
  },

  {
    id: "siemens-s7-1200-cpu-214-1hg40",
    mlfb: "6ES7214-1HG40-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "compact",

    title: "SIMATIC S7-1200 CPU 1214C DC/DC/RLY",

    description:
      "SIMATIC S7-1200 compact CPU 1214C DC/DC/RLY. Onboard I/O: 14 digital inputs and 10 digital outputs. 2 analog inputs 0-10 V DC.",

    lifecycle: "active",

    specifications: {
      workMemory: "75 KB",
      programDataMemory: "150 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 1,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 14,
      digitalOutputs: 10,
      analogInputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7214-1HG40-0XB0",
  },

  {
    id: "siemens-s7-1200-cpu-214-1bg40",
    mlfb: "6ES7214-1BG40-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "compact",

    title: "SIMATIC S7-1200 CPU 1214C AC/DC/RLY",

    description:
      "SIMATIC S7-1200 compact CPU 1214C AC/DC/RLY. Onboard I/O: 14 digital inputs and 10 digital outputs. 2 analog inputs 0-10 V DC.",

    lifecycle: "active",

    specifications: {
      workMemory: "75 KB",
      programDataMemory: "150 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 1,
      supplyVoltage: "85-264 V AC",
      digitalInputs: 14,
      digitalOutputs: 10,
      analogInputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7214-1BG40-0XB0",
  },

  {
    id: "siemens-s7-1200-cpu-215-1ag40",
    mlfb: "6ES7215-1AG40-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "compact",

    title: "SIMATIC S7-1200 CPU 1215C DC/DC/DC",

    description:
      "SIMATIC S7-1200 compact CPU 1215C DC/DC/DC. Onboard I/O: 14 digital inputs and 10 digital outputs. 2 analog inputs 0-10 V DC. 2 analog outputs 0-20 mA DC. 2 PROFINET ports.",

    lifecycle: "active",

    specifications: {
      workMemory: "100 KB",
      programDataMemory: "200 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 2,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 14,
      digitalOutputs: 10,
      analogInputs: 2,
      analogOutputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7215-1AG40-0XB0",
  },

  {
    id: "siemens-s7-1200-cpu-215-1hg40",
    mlfb: "6ES7215-1HG40-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "compact",

    title: "SIMATIC S7-1200 CPU 1215C DC/DC/RLY",

    description:
      "SIMATIC S7-1200 compact CPU 1215C DC/DC/RLY. Onboard I/O: 14 digital inputs and 10 digital outputs. 2 analog inputs 0-10 V DC. 2 analog outputs 0-20 mA DC. 2 PROFINET ports.",

    lifecycle: "active",

    specifications: {
      workMemory: "100 KB",
      programDataMemory: "200 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 2,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 14,
      digitalOutputs: 10,
      analogInputs: 2,
      analogOutputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7215-1HG40-0XB0",
  },

  {
    id: "siemens-s7-1200-cpu-215-1bg40",
    mlfb: "6ES7215-1BG40-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "compact",

    title: "SIMATIC S7-1200 CPU 1215C AC/DC/RLY",

    description:
      "SIMATIC S7-1200 compact CPU 1215C AC/DC/RLY. Onboard I/O: 14 digital inputs and 10 digital outputs. 2 analog inputs 0-10 V DC. 2 analog outputs 0-20 mA DC. 2 PROFINET ports.",

    lifecycle: "active",

    specifications: {
      workMemory: "100 KB",
      programDataMemory: "200 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 2,
      supplyVoltage: "85-264 V AC",
      digitalInputs: 14,
      digitalOutputs: 10,
      analogInputs: 2,
      analogOutputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7215-1BG40-0XB0",
  },

  {
    id: "siemens-s7-1200-cpu-217-1ag40",
    mlfb: "6ES7217-1AG40-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "compact",

    title: "SIMATIC S7-1200 CPU 1217C DC/DC/DC",

    description:
      "SIMATIC S7-1200 compact CPU 1217C DC/DC/DC. Onboard I/O: 10 digital inputs and 6 digital outputs, plus 4 RS-422/485 inputs and 4 RS-422/485 outputs for technology functions. 2 analog inputs 0-10 V DC and 2 analog outputs 0-20 mA DC. 2 PROFINET ports.",

    lifecycle: "active",

    specifications: {
      workMemory: "125 KB",
      programDataMemory: "250 KB",
      interfaces: ["PROFINET", "RS-422/485"],
      profinetPorts: 2,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 10,
      digitalOutputs: 6,
      analogInputs: 2,
      analogOutputs: 2,
      specialDigitalInputs:
        "4 RS-422/485 inputs integrated for technology functions",
      specialDigitalOutputs:
        "4 RS-422/485 outputs integrated for technology functions",
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7217-1AG40-0XB0",
  },

  // --------------------------------------------------
  // S7-1200 — Fail-safe Compact CPUs
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-cpu-212-1af40",
    mlfb: "6ES7212-1AF40-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "fail-safe",

    title: "SIMATIC S7-1200F CPU 1212FC DC/DC/DC",

    description:
      "SIMATIC S7-1200F compact CPU 1212FC DC/DC/DC. Onboard I/O: 8 digital inputs and 6 digital outputs. 2 analog inputs 0-10 V DC. Fail-safe CPU.",

    lifecycle: "active",

    specifications: {
      programDataMemory: "150 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 1,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 8,
      digitalOutputs: 6,
      analogInputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7212-1AF40-0XB0",
  },

  {
    id: "siemens-s7-1200-cpu-212-1hf40",
    mlfb: "6ES7212-1HF40-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "fail-safe",

    title: "SIMATIC S7-1200F CPU 1212FC DC/DC/RLY",

    description:
      "SIMATIC S7-1200F compact CPU 1212FC DC/DC/RLY. Onboard I/O: 8 digital inputs and 6 digital outputs. 2 analog inputs 0-10 V DC. Fail-safe CPU.",

    lifecycle: "active",

    specifications: {
      programDataMemory: "150 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 1,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 8,
      digitalOutputs: 6,
      analogInputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7212-1HF40-0XB0",
  },

  {
    id: "siemens-s7-1200-cpu-214-1af40",
    mlfb: "6ES7214-1AF40-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "fail-safe",

    title: "SIMATIC S7-1200F CPU 1214FC DC/DC/DC",

    description:
      "SIMATIC S7-1200F compact CPU 1214FC DC/DC/DC. Onboard I/O: 14 digital inputs and 10 digital outputs. 2 analog inputs 0-10 V DC. Fail-safe CPU.",

    lifecycle: "active",

    specifications: {
      programDataMemory: "200 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 1,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 14,
      digitalOutputs: 10,
      analogInputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7214-1AF40-0XB0",
  },

  {
    id: "siemens-s7-1200-cpu-214-1hf40",
    mlfb: "6ES7214-1HF40-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "fail-safe",

    title: "SIMATIC S7-1200F CPU 1214FC DC/DC/RLY",

    description:
      "SIMATIC S7-1200F compact CPU 1214FC DC/DC/RLY. Onboard I/O: 14 digital inputs and 10 digital outputs. 2 analog inputs 0-10 V DC. Fail-safe CPU.",

    lifecycle: "active",

    specifications: {
      programDataMemory: "200 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 1,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 14,
      digitalOutputs: 10,
      analogInputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7214-1HF40-0XB0",
  },

  {
    id: "siemens-s7-1200-cpu-215-1af40",
    mlfb: "6ES7215-1AF40-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "fail-safe",

    title: "SIMATIC S7-1200F CPU 1215FC DC/DC/DC",

    description:
      "SIMATIC S7-1200F compact CPU 1215FC DC/DC/DC. Onboard I/O: 14 digital inputs and 10 digital outputs. 2 analog inputs 0-10 V DC. 2 analog outputs 0-20 mA DC. 2 PROFINET ports. Fail-safe CPU.",

    lifecycle: "active",

    specifications: {
      programDataMemory: "250 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 2,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 14,
      digitalOutputs: 10,
      analogInputs: 2,
      analogOutputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7215-1AF40-0XB0",
  },

  {
    id: "siemens-s7-1200-cpu-215-1hf40",
    mlfb: "6ES7215-1HF40-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "fail-safe",

    title: "SIMATIC S7-1200F CPU 1215FC DC/DC/RLY",

    description:
      "SIMATIC S7-1200F compact CPU 1215FC DC/DC/RLY. Onboard I/O: 14 digital inputs and 10 digital outputs. 2 analog inputs 0-10 V DC. 2 analog outputs 0-20 mA DC. 2 PROFINET ports. Fail-safe CPU.",

    lifecycle: "active",

    specifications: {
      programDataMemory: "250 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 2,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 14,
      digitalOutputs: 10,
      analogInputs: 2,
      analogOutputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7215-1HF40-0XB0",
  },

  // --------------------------------------------------
  // S7-1200 G2 — Compact and Fail-safe CPUs
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-cpu-212-1ag50",
    mlfb: "6ES7212-1AG50-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200 G2",
    productTypeId: "CPU",
    variantId: "compact",

    title: "SIMATIC S7-1200 G2 CPU 1212C DC/DC/DC",

    description:
      "SIMATIC S7-1200 G2 compact CPU 1212C DC/DC/DC. Onboard I/O: 8 digital inputs and 6 digital outputs. G2 CPU; STEP 7 V20 or higher.",

    lifecycle: "active",

    specifications: {
      workMemory: "1,000 KB",
      programDataMemory: "150 KB program / 500 KB data",
      loadMemory: "8 MB",
      retentiveMemory: "20 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 2,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 8,
      digitalOutputs: 6,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7212-1AG50-0XB0",
  },

  {
    id: "siemens-s7-1200-cpu-212-1bg50",
    mlfb: "6ES7212-1BG50-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200 G2",
    productTypeId: "CPU",
    variantId: "compact",

    title: "SIMATIC S7-1200 G2 CPU 1212C AC/DC/RLY",

    description:
      "SIMATIC S7-1200 G2 compact CPU 1212C AC/DC/RLY. Onboard I/O: 8 digital inputs and 6 digital outputs. G2 CPU; STEP 7 V20 or higher.",

    lifecycle: "active",

    specifications: {
      workMemory: "1,000 KB",
      programDataMemory: "150 KB program / 500 KB data",
      loadMemory: "8 MB",
      retentiveMemory: "20 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 2,
      supplyVoltage: "85-264 V AC",
      digitalInputs: 8,
      digitalOutputs: 6,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7212-1BG50-0XB0",
  },

  {
    id: "siemens-s7-1200-cpu-212-1hg50",
    mlfb: "6ES7212-1HG50-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200 G2",
    productTypeId: "CPU",
    variantId: "compact",

    title: "SIMATIC S7-1200 G2 CPU 1212C DC/DC/RLY",

    description:
      "SIMATIC S7-1200 G2 compact CPU 1212C DC/DC/RLY. Onboard I/O: 8 digital inputs and 6 digital outputs. G2 CPU; STEP 7 V20 or higher.",

    lifecycle: "active",

    specifications: {
      workMemory: "1,000 KB",
      programDataMemory: "150 KB program / 500 KB data",
      loadMemory: "8 MB",
      retentiveMemory: "20 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 2,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 8,
      digitalOutputs: 6,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7212-1HG50-0XB0",
  },

  {
    id: "siemens-s7-1200-cpu-214-1ah50",
    mlfb: "6ES7214-1AH50-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200 G2",
    productTypeId: "CPU",
    variantId: "compact",

    title: "SIMATIC S7-1200 G2 CPU 1214C DC/DC/DC",

    description:
      "SIMATIC S7-1200 G2 compact CPU 1214C DC/DC/DC. Onboard I/O: 14 digital inputs and 10 digital outputs. G2 CPU; STEP 7 V20 or higher.",

    lifecycle: "active",

    specifications: {
      workMemory: "1,000 KB",
      programDataMemory: "250 KB program / 750 KB data",
      loadMemory: "8 MB",
      retentiveMemory: "20 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 2,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 14,
      digitalOutputs: 10,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7214-1AH50-0XB0",
  },

  {
    id: "siemens-s7-1200-cpu-214-1bh50",
    mlfb: "6ES7214-1BH50-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200 G2",
    productTypeId: "CPU",
    variantId: "compact",

    title: "SIMATIC S7-1200 G2 CPU 1214C AC/DC/RLY",

    description:
      "SIMATIC S7-1200 G2 compact CPU 1214C AC/DC/RLY. Onboard I/O: 14 digital inputs and 10 digital outputs. G2 CPU; STEP 7 V20 or higher.",

    lifecycle: "active",

    specifications: {
      workMemory: "1,000 KB",
      programDataMemory: "250 KB program / 750 KB data",
      loadMemory: "8 MB",
      retentiveMemory: "20 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 2,
      supplyVoltage: "85-264 V AC",
      digitalInputs: 14,
      digitalOutputs: 10,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7214-1BH50-0XB0",
  },

  {
    id: "siemens-s7-1200-cpu-214-1hh50",
    mlfb: "6ES7214-1HH50-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200 G2",
    productTypeId: "CPU",
    variantId: "compact",

    title: "SIMATIC S7-1200 G2 CPU 1214C DC/DC/RLY",

    description:
      "SIMATIC S7-1200 G2 compact CPU 1214C DC/DC/RLY. Onboard I/O: 14 digital inputs and 10 digital outputs. G2 CPU; STEP 7 V20 or higher.",

    lifecycle: "active",

    specifications: {
      workMemory: "1,000 KB",
      programDataMemory: "250 KB program / 750 KB data",
      loadMemory: "8 MB",
      retentiveMemory: "20 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 2,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 14,
      digitalOutputs: 10,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7214-1HH50-0XB0",
  },

  {
    id: "siemens-s7-1200-cpu-212-1af50",
    mlfb: "6ES7212-1AF50-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200 G2",
    productTypeId: "CPU",
    variantId: "fail-safe",

    title: "SIMATIC S7-1200 G2 failsafe CPU 1212FC DC/DC/DC",

    description:
      "SIMATIC S7-1200 G2 failsafe CPU 1212FC DC/DC/DC. Onboard I/O: 8 digital inputs and 6 digital outputs. G2 CPU; STEP 7 V20 or higher.",

    lifecycle: "active",

    specifications: {
      workMemory: "1,050 KB",
      programDataMemory: "300 KB program / 750 KB data",
      loadMemory: "8 MB",
      retentiveMemory: "20 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 2,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 8,
      digitalOutputs: 6,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7212-1AF50-0XB0",
  },

  {
    id: "siemens-s7-1200-cpu-212-1hf50",
    mlfb: "6ES7212-1HF50-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200 G2",
    productTypeId: "CPU",
    variantId: "fail-safe",

    title: "SIMATIC S7-1200 G2 failsafe CPU 1212FC DC/DC/RLY",

    description:
      "SIMATIC S7-1200 G2 failsafe CPU 1212FC DC/DC/RLY. Onboard I/O: 8 digital inputs and 6 digital outputs. G2 CPU; STEP 7 V20 or higher.",

    lifecycle: "active",

    specifications: {
      workMemory: "1,050 KB",
      programDataMemory: "300 KB program / 750 KB data",
      loadMemory: "8 MB",
      retentiveMemory: "20 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 2,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 8,
      digitalOutputs: 6,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7212-1HF50-0XB0",
  },

  {
    id: "siemens-s7-1200-cpu-214-1af50",
    mlfb: "6ES7214-1AF50-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200 G2",
    productTypeId: "CPU",
    variantId: "fail-safe",

    title: "SIMATIC S7-1200 G2 failsafe CPU 1214FC DC/DC/DC",

    description:
      "SIMATIC S7-1200 G2 failsafe CPU 1214FC DC/DC/DC. Onboard I/O: 14 digital inputs and 10 digital outputs. G2 CPU; STEP 7 V20 or higher.",

    lifecycle: "active",

    specifications: {
      workMemory: "1,050 KB",
      programDataMemory: "300 KB program / 750 KB data",
      loadMemory: "8 MB",
      retentiveMemory: "20 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 2,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 14,
      digitalOutputs: 10,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7214-1AF50-0XB0",
  },

  {
    id: "siemens-s7-1200-cpu-214-1hf50",
    mlfb: "6ES7214-1HF50-0XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200 G2",
    productTypeId: "CPU",
    variantId: "fail-safe",

    title: "SIMATIC S7-1200 G2 failsafe CPU 1214FC DC/DC/RLY",

    description:
      "SIMATIC S7-1200 G2 failsafe CPU 1214FC DC/DC/RLY. Onboard I/O: 14 digital inputs and 10 digital outputs. G2 CPU; STEP 7 V20 or higher.",

    lifecycle: "active",

    specifications: {
      workMemory: "1,050 KB",
      programDataMemory: "300 KB program / 750 KB data",
      loadMemory: "8 MB",
      retentiveMemory: "20 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 2,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 14,
      digitalOutputs: 10,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7214-1HF50-0XB0",
  },

  // --------------------------------------------------
  // SIPLUS S7-1200 — Fail-safe CPUs
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-cpu-siplus-1214-1af40-5xb0",
    mlfb: "6AG1214-1AF40-5XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "siplus-fail-safe",

    title: "SIPLUS S7-1200F CPU 1214FC DC/DC/DC",

    description:
      "SIPLUS S7-1200 fail-safe CPU 1214FC DC/DC/DC based on 6ES7214-1AF40-0XB0 with conformal coating and extended environmental conditions. Onboard I/O: 14 digital inputs, 10 digital outputs and 2 analog inputs 0-10 V DC. ",

    lifecycle: "active",

    specifications: {
      programDataMemory: "125 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 1,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 14,
      digitalOutputs: 10,
      analogInputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1214-1AF40-5XB0",
  },

  {
    id: "siemens-s7-1200-cpu-siplus-1214-1hf40-5xb0",
    mlfb: "6AG1214-1HF40-5XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "siplus-fail-safe",

    title: "SIPLUS S7-1200F CPU 1214FC DC/DC/RLY",

    description:
      "SIPLUS S7-1200 fail-safe CPU 1214FC DC/DC/RLY based on 6ES7214-1HF40-0XB0 with conformal coating and extended environmental conditions. Onboard I/O: 14 digital inputs, 10 relay digital outputs and 2 analog inputs 0-10 V DC.",

    lifecycle: "active",

    specifications: {
      programDataMemory: "125 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 1,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 14,
      digitalOutputs: 10,
      analogInputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1214-1HF40-5XB0",
  },

  {
    id: "siemens-s7-1200-cpu-siplus-1215-1af40-5xb0",
    mlfb: "6AG1215-1AF40-5XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "siplus-fail-safe",

    title: "SIPLUS S7-1200F CPU 1215FC DC/DC/DC",

    description:
      "SIPLUS S7-1200 fail-safe CPU 1215FC DC/DC/DC based on 6ES7215-1AF40-0XB0 with conformal coating and extended environmental conditions. Onboard I/O: 14 digital inputs, 10 digital outputs, 2 analog inputs and 2 analog outputs. 2 PROFINET ports.",

    lifecycle: "active",

    specifications: {
      programDataMemory: "150 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 2,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 14,
      digitalOutputs: 10,
      analogInputs: 2,
      analogOutputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1215-1AF40-5XB0",
  },

  // --------------------------------------------------
  // SIPLUS S7-1200 — Standard CPUs
  // --------------------------------------------------

  {
    id: "siemens-s7-1200-cpu-siplus-1212-1ae40-2xb0",
    mlfb: "6AG1212-1AE40-2XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "siplus",

    title: "SIPLUS S7-1200 CPU 1212C DC/DC/DC",

    description:
      "SIPLUS S7-1200 CPU 1212C DC/DC/DC based on the corresponding SIMATIC S7-1200 CPU, with conformal coating and extended environmental protection. Onboard I/O: 8 digital inputs and 6 digital outputs. 2 analog inputs 0-10 V DC. SIPLUS environmental variant based on the corresponding S7-1200 CPU; environmental code 2XB0.",

    lifecycle: "active",

    specifications: {
      workMemory: "50 KB",
      programDataMemory: "75 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 1,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 8,
      digitalOutputs: 6,
      analogInputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1212-1AE40-2XB0",
  },

  {
    id: "siemens-s7-1200-cpu-siplus-1212-1ae40-4xb0",
    mlfb: "6AG1212-1AE40-4XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "siplus",

    title: "SIPLUS S7-1200 CPU 1212C DC/DC/DC",

    description:
      "SIPLUS S7-1200 CPU 1212C DC/DC/DC based on the corresponding SIMATIC S7-1200 CPU, with conformal coating and extended environmental protection. Onboard I/O: 8 digital inputs and 6 digital outputs. 2 analog inputs 0-10 V DC. SIPLUS environmental variant based on the corresponding S7-1200 CPU; environmental code 4XB0.",

    lifecycle: "active",

    specifications: {
      workMemory: "50 KB",
      programDataMemory: "75 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 1,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 8,
      digitalOutputs: 6,
      analogInputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1212-1AE40-4XB0",
  },

  {
    id: "siemens-s7-1200-cpu-siplus-1212-1be40-2xb0",
    mlfb: "6AG1212-1BE40-2XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "siplus",

    title: "SIPLUS S7-1200 CPU 1212C AC/DC/RLY",

    description:
      "SIPLUS S7-1200 CPU 1212C AC/DC/RLY based on the corresponding SIMATIC S7-1200 CPU, with conformal coating and extended environmental protection. Onboard I/O: 8 digital inputs and 6 digital outputs. 2 analog inputs 0-10 V DC. SIPLUS environmental variant based on the corresponding S7-1200 CPU; environmental code 2XB0.",

    lifecycle: "active",

    specifications: {
      workMemory: "50 KB",
      programDataMemory: "75 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 1,
      supplyVoltage: "85-264 V AC",
      digitalInputs: 8,
      digitalOutputs: 6,
      analogInputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1212-1BE40-2XB0",
  },

  {
    id: "siemens-s7-1200-cpu-siplus-1212-1be40-4xb0",
    mlfb: "6AG1212-1BE40-4XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "siplus",

    title: "SIPLUS S7-1200 CPU 1212C AC/DC/RLY",

    description:
      "SIPLUS S7-1200 CPU 1212C AC/DC/RLY based on the corresponding SIMATIC S7-1200 CPU, with conformal coating and extended environmental protection. Onboard I/O: 8 digital inputs and 6 digital outputs. 2 analog inputs 0-10 V DC. SIPLUS environmental variant based on the corresponding S7-1200 CPU; environmental code 4XB0.",

    lifecycle: "active",

    specifications: {
      workMemory: "50 KB",
      programDataMemory: "75 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 1,
      supplyVoltage: "85-264 V AC",
      digitalInputs: 8,
      digitalOutputs: 6,
      analogInputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1212-1BE40-4XB0",
  },

  {
    id: "siemens-s7-1200-cpu-siplus-1212-1he40-2xb0",
    mlfb: "6AG1212-1HE40-2XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "siplus",

    title: "SIPLUS S7-1200 CPU 1212C DC/DC/RLY",

    description:
      "SIPLUS S7-1200 CPU 1212C DC/DC/RLY based on the corresponding SIMATIC S7-1200 CPU, with conformal coating and extended environmental protection. Onboard I/O: 8 digital inputs and 6 digital outputs. 2 analog inputs 0-10 V DC. SIPLUS environmental variant based on the corresponding S7-1200 CPU; environmental code 2XB0.",

    lifecycle: "active",

    specifications: {
      workMemory: "50 KB",
      programDataMemory: "75 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 1,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 8,
      digitalOutputs: 6,
      analogInputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1212-1HE40-2XB0",
  },

  {
    id: "siemens-s7-1200-cpu-siplus-1212-1he40-4xb0",
    mlfb: "6AG1212-1HE40-4XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "siplus",

    title: "SIPLUS S7-1200 CPU 1212C DC/DC/RLY",

    description:
      "SIPLUS S7-1200 CPU 1212C DC/DC/RLY based on the corresponding SIMATIC S7-1200 CPU, with conformal coating and extended environmental protection. Onboard I/O: 8 digital inputs and 6 digital outputs. 2 analog inputs 0-10 V DC. SIPLUS environmental variant based on the corresponding S7-1200 CPU; environmental code 4XB0.",

    lifecycle: "active",

    specifications: {
      workMemory: "50 KB",
      programDataMemory: "75 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 1,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 8,
      digitalOutputs: 6,
      analogInputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1212-1HE40-4XB0",
  },

  {
    id: "siemens-s7-1200-cpu-siplus-1214-1ag40-2xb0",
    mlfb: "6AG1214-1AG40-2XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "siplus",

    title: "SIPLUS S7-1200 CPU 1214C DC/DC/DC",

    description:
      "SIPLUS S7-1200 CPU 1214C DC/DC/DC based on the corresponding SIMATIC S7-1200 CPU, with conformal coating and extended environmental protection. Onboard I/O: 14 digital inputs and 10 digital outputs. 2 analog inputs 0-10 V DC. SIPLUS environmental variant based on the corresponding S7-1200 CPU; environmental code 2XB0.",

    lifecycle: "active",

    specifications: {
      workMemory: "75 KB",
      programDataMemory: "100 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 1,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 14,
      digitalOutputs: 10,
      analogInputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1214-1AG40-2XB0",
  },

  {
    id: "siemens-s7-1200-cpu-siplus-1214-1ag40-4xb0",
    mlfb: "6AG1214-1AG40-4XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "siplus",

    title: "SIPLUS S7-1200 CPU 1214C DC/DC/DC",

    description:
      "SIPLUS S7-1200 CPU 1214C DC/DC/DC based on the corresponding SIMATIC S7-1200 CPU, with conformal coating and extended environmental protection. Onboard I/O: 14 digital inputs and 10 digital outputs. 2 analog inputs 0-10 V DC. SIPLUS environmental variant based on the corresponding S7-1200 CPU; environmental code 4XB0.",

    lifecycle: "active",

    specifications: {
      workMemory: "75 KB",
      programDataMemory: "100 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 1,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 14,
      digitalOutputs: 10,
      analogInputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1214-1AG40-4XB0",
  },

  {
    id: "siemens-s7-1200-cpu-siplus-1214-1ag40-5xb0",
    mlfb: "6AG1214-1AG40-5XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "siplus",

    title: "SIPLUS S7-1200 CPU 1214C DC/DC/DC",

    description:
      "SIPLUS S7-1200 CPU 1214C DC/DC/DC based on the corresponding SIMATIC S7-1200 CPU, with conformal coating and extended environmental protection. Onboard I/O: 14 digital inputs and 10 digital outputs. 2 analog inputs 0-10 V DC. SIPLUS environmental variant based on the corresponding S7-1200 CPU; environmental code 5XB0.",

    lifecycle: "active",

    specifications: {
      workMemory: "75 KB",
      programDataMemory: "100 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 1,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 14,
      digitalOutputs: 10,
      analogInputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1214-1AG40-5XB0",
  },

  {
    id: "siemens-s7-1200-cpu-siplus-1214-1bg40-2xb0",
    mlfb: "6AG1214-1BG40-2XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "siplus",

    title: "SIPLUS S7-1200 CPU 1214C AC/DC/RLY",

    description:
      "SIPLUS S7-1200 CPU 1214C AC/DC/RLY based on the corresponding SIMATIC S7-1200 CPU, with conformal coating and extended environmental protection. Onboard I/O: 14 digital inputs and 10 digital outputs. 2 analog inputs 0-10 V DC. SIPLUS environmental variant based on the corresponding S7-1200 CPU; environmental code 2XB0.",

    lifecycle: "active",

    specifications: {
      workMemory: "75 KB",
      programDataMemory: "100 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 1,
      supplyVoltage: "85-264 V AC",
      digitalInputs: 14,
      digitalOutputs: 10,
      analogInputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1214-1BG40-2XB0",
  },

  {
    id: "siemens-s7-1200-cpu-siplus-1214-1bg40-4xb0",
    mlfb: "6AG1214-1BG40-4XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "siplus",

    title: "SIPLUS S7-1200 CPU 1214C AC/DC/RLY",

    description:
      "SIPLUS S7-1200 CPU 1214C AC/DC/RLY based on the corresponding SIMATIC S7-1200 CPU, with conformal coating and extended environmental protection. Onboard I/O: 14 digital inputs and 10 digital outputs. 2 analog inputs 0-10 V DC. SIPLUS environmental variant based on the corresponding S7-1200 CPU; environmental code 4XB0.",

    lifecycle: "active",

    specifications: {
      workMemory: "75 KB",
      programDataMemory: "100 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 1,
      supplyVoltage: "85-264 V AC",
      digitalInputs: 14,
      digitalOutputs: 10,
      analogInputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1214-1BG40-4XB0",
  },

  {
    id: "siemens-s7-1200-cpu-siplus-1214-1bg40-5xb0",
    mlfb: "6AG1214-1BG40-5XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "siplus",

    title: "SIPLUS S7-1200 CPU 1214C AC/DC/RLY",

    description:
      "SIPLUS S7-1200 CPU 1214C AC/DC/RLY based on the corresponding SIMATIC S7-1200 CPU, with conformal coating and extended environmental protection. Onboard I/O: 14 digital inputs and 10 digital outputs. 2 analog inputs 0-10 V DC. SIPLUS environmental variant based on the corresponding S7-1200 CPU; environmental code 5XB0.",

    lifecycle: "active",

    specifications: {
      workMemory: "75 KB",
      programDataMemory: "100 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 1,
      supplyVoltage: "85-264 V AC",
      digitalInputs: 14,
      digitalOutputs: 10,
      analogInputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1214-1BG40-5XB0",
  },

  {
    id: "siemens-s7-1200-cpu-siplus-1214-1hg40-2xb0",
    mlfb: "6AG1214-1HG40-2XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "siplus",

    title: "SIPLUS S7-1200 CPU 1214C DC/DC/RLY",

    description:
      "SIPLUS S7-1200 CPU 1214C DC/DC/RLY based on the corresponding SIMATIC S7-1200 CPU, with conformal coating and extended environmental protection. Onboard I/O: 14 digital inputs and 10 digital outputs. 2 analog inputs 0-10 V DC. SIPLUS environmental variant based on the corresponding S7-1200 CPU; environmental code 2XB0.",

    lifecycle: "active",

    specifications: {
      workMemory: "75 KB",
      programDataMemory: "100 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 1,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 14,
      digitalOutputs: 10,
      analogInputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1214-1HG40-2XB0",
  },

  {
    id: "siemens-s7-1200-cpu-siplus-1214-1hg40-4xb0",
    mlfb: "6AG1214-1HG40-4XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "siplus",

    title: "SIPLUS S7-1200 CPU 1214C DC/DC/RLY",

    description:
      "SIPLUS S7-1200 CPU 1214C DC/DC/RLY based on the corresponding SIMATIC S7-1200 CPU, with conformal coating and extended environmental protection. Onboard I/O: 14 digital inputs and 10 digital outputs. 2 analog inputs 0-10 V DC. SIPLUS environmental variant based on the corresponding S7-1200 CPU; environmental code 4XB0.",

    lifecycle: "active",

    specifications: {
      workMemory: "75 KB",
      programDataMemory: "100 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 1,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 14,
      digitalOutputs: 10,
      analogInputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1214-1HG40-4XB0",
  },

  {
    id: "siemens-s7-1200-cpu-siplus-1214-1hg40-5xb0",
    mlfb: "6AG1214-1HG40-5XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "siplus",

    title: "SIPLUS S7-1200 CPU 1214C DC/DC/RLY",

    description:
      "SIPLUS S7-1200 CPU 1214C DC/DC/RLY based on the corresponding SIMATIC S7-1200 CPU, with conformal coating and extended environmental protection. Onboard I/O: 14 digital inputs and 10 digital outputs. 2 analog inputs 0-10 V DC. SIPLUS environmental variant based on the corresponding S7-1200 CPU; environmental code 5XB0.",

    lifecycle: "active",

    specifications: {
      workMemory: "75 KB",
      programDataMemory: "100 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 1,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 14,
      digitalOutputs: 10,
      analogInputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1214-1HG40-5XB0",
  },

  {
    id: "siemens-s7-1200-cpu-siplus-1215-1ag40-2xb0",
    mlfb: "6AG1215-1AG40-2XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "siplus",

    title: "SIPLUS S7-1200 CPU 1215C DC/DC/DC",

    description:
      "SIPLUS S7-1200 CPU 1215C DC/DC/DC based on the corresponding SIMATIC S7-1200 CPU, with conformal coating and extended environmental protection. Onboard I/O: 14 digital inputs and 10 digital outputs. 2 analog inputs 0-10 V DC. 2 analog outputs 0-20 mA DC. 2 PROFINET ports. SIPLUS environmental variant based on the corresponding S7-1200 CPU; environmental code 2XB0.",

    lifecycle: "active",

    specifications: {
      workMemory: "100 KB",
      programDataMemory: "125 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 2,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 14,
      digitalOutputs: 10,
      analogInputs: 2,
      analogOutputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1215-1AG40-2XB0",
  },

  {
    id: "siemens-s7-1200-cpu-siplus-1215-1ag40-4xb0",
    mlfb: "6AG1215-1AG40-4XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "siplus",

    title: "SIPLUS S7-1200 CPU 1215C DC/DC/DC",

    description:
      "SIPLUS S7-1200 CPU 1215C DC/DC/DC based on the corresponding SIMATIC S7-1200 CPU, with conformal coating and extended environmental protection. Onboard I/O: 14 digital inputs and 10 digital outputs. 2 analog inputs 0-10 V DC. 2 analog outputs 0-20 mA DC. 2 PROFINET ports. SIPLUS environmental variant based on the corresponding S7-1200 CPU; environmental code 4XB0.",

    lifecycle: "active",

    specifications: {
      workMemory: "100 KB",
      programDataMemory: "125 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 2,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 14,
      digitalOutputs: 10,
      analogInputs: 2,
      analogOutputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1215-1AG40-4XB0",
  },

  {
    id: "siemens-s7-1200-cpu-siplus-1215-1ag40-5xb0",
    mlfb: "6AG1215-1AG40-5XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "siplus",

    title: "SIPLUS S7-1200 CPU 1215C DC/DC/DC",

    description:
      "SIPLUS S7-1200 CPU 1215C DC/DC/DC based on the corresponding SIMATIC S7-1200 CPU, with conformal coating and extended environmental protection. Onboard I/O: 14 digital inputs and 10 digital outputs. 2 analog inputs 0-10 V DC. 2 analog outputs 0-20 mA DC. 2 PROFINET ports. SIPLUS environmental variant based on the corresponding S7-1200 CPU; environmental code 5XB0.",

    lifecycle: "active",

    specifications: {
      workMemory: "100 KB",
      programDataMemory: "125 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 2,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 14,
      digitalOutputs: 10,
      analogInputs: 2,
      analogOutputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1215-1AG40-5XB0",
  },

  {
    id: "siemens-s7-1200-cpu-siplus-1215-1bg40-2xb0",
    mlfb: "6AG1215-1BG40-2XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "siplus",

    title: "SIPLUS S7-1200 CPU 1215C AC/DC/RLY",

    description:
      "SIPLUS S7-1200 CPU 1215C AC/DC/RLY based on the corresponding SIMATIC S7-1200 CPU, with conformal coating and extended environmental protection. Onboard I/O: 14 digital inputs and 10 digital outputs. 2 analog inputs 0-10 V DC. 2 analog outputs 0-20 mA DC. 2 PROFINET ports. SIPLUS environmental variant based on the corresponding S7-1200 CPU; environmental code 2XB0.",

    lifecycle: "active",

    specifications: {
      workMemory: "100 KB",
      programDataMemory: "125 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 2,
      supplyVoltage: "85-264 V AC",
      digitalInputs: 14,
      digitalOutputs: 10,
      analogInputs: 2,
      analogOutputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1215-1BG40-2XB0",
  },

  {
    id: "siemens-s7-1200-cpu-siplus-1215-1bg40-4xb0",
    mlfb: "6AG1215-1BG40-4XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "siplus",

    title: "SIPLUS S7-1200 CPU 1215C AC/DC/RLY",

    description:
      "SIPLUS S7-1200 CPU 1215C AC/DC/RLY based on the corresponding SIMATIC S7-1200 CPU, with conformal coating and extended environmental protection. Onboard I/O: 14 digital inputs and 10 digital outputs. 2 analog inputs 0-10 V DC. 2 analog outputs 0-20 mA DC. 2 PROFINET ports. SIPLUS environmental variant based on the corresponding S7-1200 CPU; environmental code 4XB0.",

    lifecycle: "active",

    specifications: {
      workMemory: "100 KB",
      programDataMemory: "125 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 2,
      supplyVoltage: "85-264 V AC",
      digitalInputs: 14,
      digitalOutputs: 10,
      analogInputs: 2,
      analogOutputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1215-1BG40-4XB0",
  },

  {
    id: "siemens-s7-1200-cpu-siplus-1215-1bg40-5xb0",
    mlfb: "6AG1215-1BG40-5XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "siplus",

    title: "SIPLUS S7-1200 CPU 1215C AC/DC/RLY",

    description:
      "SIPLUS S7-1200 CPU 1215C AC/DC/RLY based on the corresponding SIMATIC S7-1200 CPU, with conformal coating and extended environmental protection. Onboard I/O: 14 digital inputs and 10 digital outputs. 2 analog inputs 0-10 V DC. 2 analog outputs 0-20 mA DC. 2 PROFINET ports. SIPLUS environmental variant based on the corresponding S7-1200 CPU; environmental code 5XB0.",

    lifecycle: "active",

    specifications: {
      workMemory: "100 KB",
      programDataMemory: "125 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 2,
      supplyVoltage: "85-264 V AC",
      digitalInputs: 14,
      digitalOutputs: 10,
      analogInputs: 2,
      analogOutputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1215-1BG40-5XB0",
  },

  {
    id: "siemens-s7-1200-cpu-siplus-1215-1hg40-2xb0",
    mlfb: "6AG1215-1HG40-2XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "siplus",

    title: "SIPLUS S7-1200 CPU 1215C DC/DC/RLY",

    description:
      "SIPLUS S7-1200 CPU 1215C DC/DC/RLY based on the corresponding SIMATIC S7-1200 CPU, with conformal coating and extended environmental protection. Onboard I/O: 14 digital inputs and 10 digital outputs. 2 analog inputs 0-10 V DC. 2 analog outputs 0-20 mA DC. 2 PROFINET ports. SIPLUS environmental variant based on the corresponding S7-1200 CPU; environmental code 2XB0.",

    lifecycle: "active",

    specifications: {
      workMemory: "100 KB",
      programDataMemory: "125 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 2,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 14,
      digitalOutputs: 10,
      analogInputs: 2,
      analogOutputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1215-1HG40-2XB0",
  },

  {
    id: "siemens-s7-1200-cpu-siplus-1215-1hg40-4xb0",
    mlfb: "6AG1215-1HG40-4XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "siplus",

    title: "SIPLUS S7-1200 CPU 1215C DC/DC/RLY",

    description:
      "SIPLUS S7-1200 CPU 1215C DC/DC/RLY based on the corresponding SIMATIC S7-1200 CPU, with conformal coating and extended environmental protection. Onboard I/O: 14 digital inputs and 10 digital outputs. 2 analog inputs 0-10 V DC. 2 analog outputs 0-20 mA DC. 2 PROFINET ports. SIPLUS environmental variant based on the corresponding S7-1200 CPU; environmental code 4XB0.",

    lifecycle: "active",

    specifications: {
      workMemory: "100 KB",
      programDataMemory: "125 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 2,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 14,
      digitalOutputs: 10,
      analogInputs: 2,
      analogOutputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1215-1HG40-4XB0",
  },

  {
    id: "siemens-s7-1200-cpu-siplus-1215-1hg40-5xb0",
    mlfb: "6AG1215-1HG40-5XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "siplus",

    title: "SIPLUS S7-1200 CPU 1215C DC/DC/RLY",

    description:
      "SIPLUS S7-1200 CPU 1215C DC/DC/RLY based on the corresponding SIMATIC S7-1200 CPU, with conformal coating and extended environmental protection. Onboard I/O: 14 digital inputs and 10 digital outputs. 2 analog inputs 0-10 V DC. 2 analog outputs 0-20 mA DC. 2 PROFINET ports. SIPLUS environmental variant based on the corresponding S7-1200 CPU; environmental code 5XB0.",

    lifecycle: "active",

    specifications: {
      workMemory: "100 KB",
      programDataMemory: "125 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 2,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 14,
      digitalOutputs: 10,
      analogInputs: 2,
      analogOutputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1215-1HG40-5XB0",
  },

  {
    id: "siemens-s7-1200-cpu-siplus-1217-1ag40-2xb0",
    mlfb: "6AG1217-1AG40-2XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "siplus",

    title: "SIPLUS S7-1200 CPU 1217C DC/DC/DC",

    description:
      "SIPLUS S7-1200 CPU 1217C DC/DC/DC based on the corresponding SIMATIC S7-1200 CPU, with conformal coating and extended environmental protection. Onboard I/O: 10 digital inputs and 6 digital outputs. 2 analog inputs 0-10 V DC. 2 analog outputs 0-20 mA DC. 2 PROFINET ports. SIPLUS environmental variant based on CPU 1217C; environmental code 2XB0; 4 RS-422/485 inputs and 4 RS-422/485 outputs integrated for technology functions.",

    lifecycle: "active",

    specifications: {
      workMemory: "125 KB",
      programDataMemory: "150 KB",
      interfaces: ["PROFINET", "RS-422/485"],
      profinetPorts: 2,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 10,
      digitalOutputs: 6,
      analogInputs: 2,
      analogOutputs: 2,
      specialDigitalInputs:
        "4 RS-422/485 inputs integrated for technology functions",
      specialDigitalOutputs:
        "4 RS-422/485 outputs integrated for technology functions",
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1217-1AG40-2XB0",
  },

  {
    id: "siemens-s7-1200-cpu-siplus-1217-1ag40-5xb0",
    mlfb: "6AG1217-1AG40-5XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "siplus",

    title: "SIPLUS S7-1200 CPU 1217C DC/DC/DC",

    description:
      "SIPLUS S7-1200 CPU 1217C DC/DC/DC based on the corresponding SIMATIC S7-1200 CPU, with conformal coating and extended environmental protection. Onboard I/O: 10 digital inputs and 6 digital outputs. 2 analog inputs 0-10 V DC. 2 analog outputs 0-20 mA DC. 2 PROFINET ports. SIPLUS environmental variant based on CPU 1217C; environmental code 5XB0; 4 RS-422/485 inputs and 4 RS-422/485 outputs integrated for technology functions.",

    lifecycle: "active",

    specifications: {
      workMemory: "125 KB",
      programDataMemory: "150 KB",
      interfaces: ["PROFINET", "RS-422/485"],
      profinetPorts: 2,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 10,
      digitalOutputs: 6,
      analogInputs: 2,
      analogOutputs: 2,
      specialDigitalInputs:
        "4 RS-422/485 inputs integrated for technology functions",
      specialDigitalOutputs:
        "4 RS-422/485 outputs integrated for technology functions",
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1217-1AG40-5XB0",
  },

  {
    id: "siemens-s7-1200-cpu-siplus-rail-212-1ae40-1xb0",
    mlfb: "6AG2212-1AE40-1XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "siplus",

    title: "SIPLUS S7-1200 CPU 1212C DC/DC/DC RAIL",

    description:
      "SIPLUS S7-1200 CPU 1212C DC/DC/DC RAIL based on the corresponding SIMATIC S7-1200 CPU, with conformal coating and extended environmental protection. Onboard I/O: 8 digital inputs and 6 digital outputs. 2 analog inputs 0-10 V DC. SIPLUS S7-1200 rail-traffic variant based on CPU 1212C.",

    lifecycle: "active",

    specifications: {
      workMemory: "50 KB",
      programDataMemory: "75 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 1,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 8,
      digitalOutputs: 6,
      analogInputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG2212-1AE40-1XB0",
  },

  {
    id: "siemens-s7-1200-cpu-siplus-rail-214-1ag40-1xb0",
    mlfb: "6AG2214-1AG40-1XB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200",
    productTypeId: "CPU",
    variantId: "siplus",

    title: "SIPLUS S7-1200 CPU 1214C DC/DC/DC RAIL",

    description:
      "SIPLUS S7-1200 CPU 1214C DC/DC/DC RAIL based on the corresponding SIMATIC S7-1200 CPU, with conformal coating and extended environmental protection. Onboard I/O: 14 digital inputs and 10 digital outputs. 2 analog inputs 0-10 V DC. SIPLUS S7-1200 rail-traffic variant based on CPU 1214C.",

    lifecycle: "active",

    specifications: {
      workMemory: "75 KB",
      programDataMemory: "100 KB",
      interfaces: ["PROFINET"],
      profinetPorts: 1,
      supplyVoltage: "20.4-28.8 V DC",
      digitalInputs: 14,
      digitalOutputs: 10,
      analogInputs: 2,
      memoryCard: "SIMATIC Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG2214-1AG40-1XB0",
  },
];
