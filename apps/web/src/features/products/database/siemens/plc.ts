export type SiemensPLCLifecycle =
  "active" | "phase-out" | "spare-part" | "discontinued";

export interface SiemensPLCProduct {
  id: string;
  mlfb: string;

  brandId: "siemens";
  categoryId: "PLC";
  familyId: string;
  seriesId: string;
  productTypeId: string;

  variantId: string;

  title: string;
  description: string;

  lifecycle: SiemensPLCLifecycle;

  specifications: {
    workMemory?: string;
    interfaces?: string[];
    supplyVoltage?: string;
    digitalInputs?: number;
    digitalOutputs?: number;
    analogInputs?: number;
    analogOutputs?: number;
    highSpeedCounters?: string;
    memoryCard?: string;
  };

  source: string;
}

export const siemensPLC: SiemensPLCProduct[] = [
  // --------------------------------------------------
  // S7-300 — Standard CPU
  // --------------------------------------------------

  {
    id: "siemens-s7-300-cpu-312-1ae14-0ab0",
    mlfb: "6ES7312-1AE14-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "CPU",
    variantId: "standard",

    title: "SIMATIC S7-300 CPU 312",

    description:
      "SIMATIC S7-300 CPU 312 central processing unit with MPI interface and integrated 24 V DC power supply.",

    lifecycle: "spare-part",

    specifications: {
      workMemory: "32 KB",
      interfaces: ["MPI"],
      supplyVoltage: "24 V DC",
      memoryCard: "Micro Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product/6ES73121AE140AB0",
  },

  {
    id: "siemens-s7-300-cpu-314-1ag14-0ab0",
    mlfb: "6ES7314-1AG14-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "CPU",
    variantId: "standard",

    title: "SIMATIC S7-300 CPU 314",

    description:
      "SIMATIC S7-300 CPU 314 central processing unit with MPI interface and integrated 24 V DC power supply.",

    lifecycle: "spare-part",

    specifications: {
      workMemory: "128 KB",
      interfaces: ["MPI"],
      supplyVoltage: "24 V DC",
      memoryCard: "Micro Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/fescomelsaownuy/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7314-1AG14-0AB0",
  },

  {
    id: "siemens-s7-300-cpu-315-2dp-2ah14-0ab0",
    mlfb: "6ES7315-2AH14-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "CPU",
    variantId: "standard",

    title: "SIMATIC S7-300 CPU 315-2 DP",

    description:
      "SIMATIC S7-300 CPU 315-2 DP central processing unit with MPI and PROFIBUS DP interface.",

    lifecycle: "spare-part",

    specifications: {
      workMemory: "256 KB",
      interfaces: ["MPI", "PROFIBUS DP"],
      supplyVoltage: "24 V DC",
      memoryCard: "Micro Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7315-2AH14-0AB0",
  },

  {
    id: "siemens-s7-300-cpu-315-2pn-dp-2eh14-0ab0",
    mlfb: "6ES7315-2EH14-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "CPU",
    variantId: "standard",

    title: "SIMATIC S7-300 CPU 315-2 PN/DP",

    description:
      "SIMATIC S7-300 CPU 315-2 PN/DP central processing unit with MPI/DP and Ethernet PROFINET interfaces.",

    lifecycle: "spare-part",

    specifications: {
      workMemory: "384 KB",
      interfaces: ["MPI/DP", "PROFINET"],
      supplyVoltage: "24 V DC",
      memoryCard: "Micro Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/goos/catalog/Pages/mmpdata.ashx?MLFB1=6ES7315-2EH14-0AB0&lang=en",
  },

  {
    id: "siemens-s7-300-cpu-317-2pn-dp-2ek14-0ab0",
    mlfb: "6ES7317-2EK14-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "CPU",
    variantId: "standard",

    title: "SIMATIC S7-300 CPU 317-2 PN/DP",

    description:
      "SIMATIC S7-300 CPU 317-2 PN/DP central processing unit with MPI/DP and Ethernet PROFINET interfaces.",

    lifecycle: "phase-out",

    specifications: {
      workMemory: "1 MB",
      interfaces: ["MPI/DP", "PROFINET"],
      supplyVoltage: "24 V DC",
      memoryCard: "Micro Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/goos/catalog/Pages/mmpdata.ashx?MLFB1=6ES7317-2EK14-0AB0&lang=en",
  },

  {
    id: "siemens-s7-300-cpu-319-3pn-dp-3el01-0ab0",
    mlfb: "6ES7318-3EL01-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "CPU",
    variantId: "standard",

    title: "SIMATIC S7-300 CPU 319-3 PN/DP",

    description:
      "SIMATIC S7-300 CPU 319-3 PN/DP central processing unit with MPI/DP, DP and Ethernet PROFINET interfaces.",

    lifecycle: "spare-part",

    specifications: {
      workMemory: "2 MB",
      interfaces: ["MPI/DP", "PROFIBUS DP", "PROFINET"],
      supplyVoltage: "24 V DC",
      memoryCard: "Micro Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7318-3EL01-0AB0",
  },

  // --------------------------------------------------
  // S7-300 — Compact CPU
  // --------------------------------------------------

  {
    id: "siemens-s7-300-cpu-314c-2dp-6ch04-0ab0",
    mlfb: "6ES7314-6CH04-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "CPU",
    variantId: "compact",

    title: "SIMATIC S7-300 CPU 314C-2 DP",

    description:
      "SIMATIC S7-300 compact CPU 314C-2 DP with integrated digital and analog I/O and PROFIBUS DP.",

    lifecycle: "spare-part",

    specifications: {
      workMemory: "192 KB",
      interfaces: ["MPI", "PROFIBUS DP"],
      supplyVoltage: "24 V DC",
      digitalInputs: 24,
      digitalOutputs: 16,
      analogInputs: 4,
      analogOutputs: 2,
      highSpeedCounters: "4 × 60 kHz",
      memoryCard: "Micro Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/WW/Catalog/Product/6ES73146CH040AB0",
  },

  {
    id: "siemens-s7-300-cpu-314c-2pn-dp-6eh04-0ab0",
    mlfb: "6ES7314-6EH04-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "CPU",
    variantId: "compact",

    title: "SIMATIC S7-300 CPU 314C-2 PN/DP",

    description:
      "SIMATIC S7-300 compact CPU 314C-2 PN/DP with integrated digital and analog I/O, PROFIBUS DP and PROFINET.",

    lifecycle: "spare-part",

    specifications: {
      workMemory: "192 KB",
      interfaces: ["MPI/DP", "PROFINET"],
      supplyVoltage: "24 V DC",
      digitalInputs: 24,
      digitalOutputs: 16,
      analogInputs: 4,
      analogOutputs: 2,
      highSpeedCounters: "4 × 60 kHz",
      memoryCard: "Micro Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/EN/Catalog/Product/6ES73146EH040AB0",
  },

  // --------------------------------------------------
  // S7-300 — SIPLUS
  // --------------------------------------------------

  {
    id: "siemens-siplus-s7-300-cpu-315-2pn-dp-6ag1315-2eh14-7ab0",
    mlfb: "6AG1315-2EH14-7AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "CPU",
    variantId: "siplus",

    title: "SIPLUS S7-300 CPU 315-2 PN/DP",

    description:
      "SIPLUS S7-300 CPU 315-2 PN/DP based on the SIMATIC CPU 315-2 PN/DP with conformal coating and extended temperature range.",

    lifecycle: "spare-part",

    specifications: {
      workMemory: "384 KB",
      interfaces: ["MPI/DP", "PROFINET"],
      supplyVoltage: "24 V DC",
      memoryCard: "Micro Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/agprepresentacionessasownco/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1315-2EH14-7AB0",
  },

  {
    id: "siemens-siplus-s7-300-cpu-314c-2pn-dp-6ag1314-6eh04-7ab0",
    mlfb: "6AG1314-6EH04-7AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "CPU",
    variantId: "siplus",

    title: "SIPLUS S7-300 CPU 314C-2 PN/DP",

    description:
      "SIPLUS S7-300 CPU 314C-2 PN/DP based on the SIMATIC compact CPU with conformal coating and extended temperature range.",

    lifecycle: "phase-out",

    specifications: {
      workMemory: "192 KB",
      interfaces: ["MPI/DP", "PROFINET"],
      supplyVoltage: "24 V DC",
      digitalInputs: 24,
      digitalOutputs: 16,
      analogInputs: 4,
      analogOutputs: 2,
      highSpeedCounters: "4 × 60 kHz",
      memoryCard: "Micro Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/ww/Catalog/Product/?mlfb=6AG1314-6EH04-7AB0",
  },
];
