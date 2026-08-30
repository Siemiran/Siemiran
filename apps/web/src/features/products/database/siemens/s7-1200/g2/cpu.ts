export type SiemensS71200G2Lifecycle =
  "active" | "phase-out" | "spare-part" | "discontinued";

export interface SiemensS71200G2CPUProduct {
  id: string;
  mlfb: string;

  brandId: "siemens";
  categoryId: "PLC";
  familyId: "S7-1200";
  seriesId: "S7-1200 G2";
  productTypeId: "CPU";
  variantId: string;

  title: string;
  description: string;

  lifecycle: SiemensS71200G2Lifecycle;

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

export const siemensS71200G2CPU: SiemensS71200G2CPUProduct[] = [
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
];
