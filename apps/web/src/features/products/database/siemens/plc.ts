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
      "SIMATIC S7-300 CPU 312 central processing unit with MPI, integrated 24 V DC power supply and 32 KB work memory.",

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
      "SIMATIC S7-300 CPU 314 central processing unit with MPI, integrated 24 V DC power supply and 128 KB work memory.",

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
      "SIMATIC S7-300 CPU 315-2 DP central processing unit with MPI, integrated 24 V DC power supply, 256 KB work memory and PROFIBUS DP interface.",

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
      "SIMATIC S7-300 CPU 315-2 PN/DP central processing unit with 384 KB work memory, MPI/DP and Ethernet PROFINET interface with 2-port switch.",

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
    id: "siemens-s7-300-cpu-317-2dp-2ak14-0ab0",
    mlfb: "6ES7317-2AK14-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "CPU",
    variantId: "standard",

    title: "SIMATIC S7-300 CPU 317-2 DP",

    description:
      "SIMATIC S7-300 CPU 317-2 DP central processing unit with 1 MB work memory, MPI/DP and second PROFIBUS DP interface.",

    lifecycle: "phase-out",

    specifications: {
      workMemory: "1 MB",
      interfaces: ["MPI/DP", "PROFIBUS DP"],
      supplyVoltage: "24 V DC",
      memoryCard: "Micro Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product/6ES73172AK140AB0",
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
      "SIMATIC S7-300 CPU 317-2 PN/DP central processing unit with 1 MB work memory, MPI/DP and Ethernet PROFINET interface with 2-port switch.",

    lifecycle: "phase-out",

    specifications: {
      workMemory: "1 MB",
      interfaces: ["MPI/DP", "PROFINET"],
      supplyVoltage: "24 V DC",
      memoryCard: "Micro Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product/6ES73172EK140AB0",
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
      "SIMATIC S7-300 CPU 319-3 PN/DP central processing unit with 2 MB work memory, MPI/DP, second PROFIBUS DP and Ethernet PROFINET interfaces with 2-port switch.",

    lifecycle: "phase-out",

    specifications: {
      workMemory: "2 MB",
      interfaces: ["MPI/DP", "PROFIBUS DP", "PROFINET"],
      supplyVoltage: "24 V DC",
      memoryCard: "Micro Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product/6ES73183EL010AB0",
  },

  // --------------------------------------------------
  // S7-300 — Compact CPU
  // --------------------------------------------------

  {
    id: "siemens-s7-300-cpu-312c-5bf04-0ab0",
    mlfb: "6ES7312-5BF04-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "CPU",
    variantId: "compact",

    title: "SIMATIC S7-300 CPU 312C",

    description:
      "SIMATIC S7-300 CPU 312C compact CPU with MPI, 10 digital inputs, 6 digital outputs, 2 high-speed counters, integrated 24 V DC power supply and 64 KB work memory.",

    lifecycle: "spare-part",

    specifications: {
      workMemory: "64 KB",
      interfaces: ["MPI"],
      supplyVoltage: "24 V DC",
      digitalInputs: 10,
      digitalOutputs: 6,
      highSpeedCounters: "2 × 10 kHz",
      memoryCard: "Micro Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/hu/Catalog/Product/6ES73125BF040AB0",
  },

  {
    id: "siemens-s7-300-cpu-313c-5bg04-0ab0",
    mlfb: "6ES7313-5BG04-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "CPU",
    variantId: "compact",

    title: "SIMATIC S7-300 CPU 313C",

    description:
      "SIMATIC S7-300 CPU 313C compact CPU with MPI, 24 digital inputs, 16 digital outputs, 4 analog inputs, 2 analog outputs, Pt100 input, 3 high-speed counters, integrated 24 V DC power supply and 128 KB work memory.",

    lifecycle: "spare-part",

    specifications: {
      workMemory: "128 KB",
      interfaces: ["MPI"],
      supplyVoltage: "24 V DC",
      digitalInputs: 24,
      digitalOutputs: 16,
      analogInputs: 4,
      analogOutputs: 2,
      highSpeedCounters: "3 × 30 kHz",
      memoryCard: "Micro Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/cn/Catalog/Product/6ES73135BG040AB0",
  },

  {
    id: "siemens-s7-300-cpu-313c-2ptp-6bg04-0ab0",
    mlfb: "6ES7313-6BG04-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "CPU",
    variantId: "compact",

    title: "SIMATIC S7-300 CPU 313C-2 PtP",

    description:
      "SIMATIC S7-300 CPU 313C-2 PtP compact CPU with MPI, integrated RS485 interface, 16 digital inputs, 16 digital outputs, 3 high-speed counters, integrated 24 V DC power supply and 128 KB work memory.",

    lifecycle: "spare-part",

    specifications: {
      workMemory: "128 KB",
      interfaces: ["MPI", "RS485"],
      supplyVoltage: "24 V DC",
      digitalInputs: 16,
      digitalOutputs: 16,
      highSpeedCounters: "3 × 30 kHz",
      memoryCard: "Micro Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/IT/IT/Catalog/Product/?mlfb=6ES7313-6BG04-0AB0",
  },

  {
    id: "siemens-s7-300-cpu-313c-2dp-6cg04-0ab0",
    mlfb: "6ES7313-6CG04-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "CPU",
    variantId: "compact",

    title: "SIMATIC S7-300 CPU 313C-2 DP",

    description:
      "SIMATIC S7-300 CPU 313C-2 DP compact CPU with MPI, integrated PROFIBUS DP interface, 16 digital inputs, 16 digital outputs, 3 high-speed counters, integrated 24 V DC power supply and 128 KB work memory.",

    lifecycle: "spare-part",

    specifications: {
      workMemory: "128 KB",
      interfaces: ["MPI", "PROFIBUS DP"],
      supplyVoltage: "24 V DC",
      digitalInputs: 16,
      digitalOutputs: 16,
      highSpeedCounters: "3 × 30 kHz",
      memoryCard: "Micro Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/goos/catalog/Pages/mmpdata.ashx?MLFB1=6ES7313-6CG04-0AB0&lang=en",
  },

  {
    id: "siemens-s7-300-cpu-314c-2ptp-6bh04-0ab0",
    mlfb: "6ES7314-6BH04-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "CPU",
    variantId: "compact",

    title: "SIMATIC S7-300 CPU 314C-2 PtP",

    description:
      "SIMATIC S7-300 CPU 314C-2 PtP compact CPU with MPI, integrated RS485 interface, 24 digital inputs, 16 digital outputs, 4 analog inputs, 2 analog outputs, Pt100 input, 4 high-speed counters, integrated 24 V DC power supply and 192 KB work memory.",

    lifecycle: "spare-part",

    specifications: {
      workMemory: "192 KB",
      interfaces: ["MPI", "RS485"],
      supplyVoltage: "24 V DC",
      digitalInputs: 24,
      digitalOutputs: 16,
      analogInputs: 4,
      analogOutputs: 2,
      highSpeedCounters: "4 × 60 kHz",
      memoryCard: "Micro Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/inosatavtomatica/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7314-6BH04-0AB0",
  },

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
      "SIMATIC S7-300 CPU 314C-2 DP compact CPU with MPI, 24 digital inputs, 16 digital outputs, 4 analog inputs, 2 analog outputs, Pt100 input, 4 high-speed counters (60 kHz), integrated DP interface and integrated 24 V DC power supply.",

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
      "SIMATIC S7-300 CPU 314C-2 PN/DP compact CPU with 192 KB work memory, 24 digital inputs, 16 digital outputs, 4 analog inputs, 2 analog outputs, 1 Pt100 input, 4 high-speed counters (60 kHz), MPI/DP and Ethernet PROFINET interfaces with 2-port switch, and integrated 24 V DC power supply.",

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
      "https://mall.industry.siemens.com/mall/ae/EN/Catalog/Product/?mlfb=6ES7314-6EH04-0AB0",
  },

  // --------------------------------------------------
  // S7-300 — Fail-safe CPU
  // --------------------------------------------------

  {
    id: "siemens-s7-300-cpu-315f-2dp-6es7315-6ff04-0ab0",
    mlfb: "6ES7315-6FF04-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "CPU",
    variantId: "fail-safe",

    title: "SIMATIC S7-300 CPU 315F-2 DP",

    description:
      "SIMATIC S7-300 CPU 315F-2 DP fail-safe central processing unit with 384 KB work memory, MPI and PROFIBUS DP interfaces and second DP master/slave interface.",

    lifecycle: "spare-part",

    specifications: {
      workMemory: "384 KB",
      interfaces: ["MPI", "PROFIBUS DP"],
      supplyVoltage: "24 V DC",
      memoryCard: "Micro Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7315-6FF04-0AB0",
  },

  {
    id: "siemens-s7-300-cpu-315f-2pn-dp-6es7315-2fj14-0ab0",
    mlfb: "6ES7315-2FJ14-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "CPU",
    variantId: "fail-safe",

    title: "SIMATIC S7-300 CPU 315F-2 PN/DP",

    description:
      "SIMATIC S7-300 CPU 315F-2 PN/DP fail-safe central processing unit with 512 KB work memory, MPI/DP and Ethernet PROFINET interface with 2-port switch.",

    lifecycle: "phase-out",

    specifications: {
      workMemory: "512 KB",
      interfaces: ["MPI/DP", "PROFINET"],
      supplyVoltage: "24 V DC",
      memoryCard: "Micro Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/br/Catalog/Product?SiepCountryCode=BR&mlfb=6ES7315-2FJ14-0AB0",
  },

  {
    id: "siemens-s7-300-cpu-317f-2dp-6es7317-6ff04-0ab0",
    mlfb: "6ES7317-6FF04-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "CPU",
    variantId: "fail-safe",

    title: "SIMATIC S7-300 CPU 317F-2 DP",

    description:
      "SIMATIC S7-300 CPU 317F-2 DP fail-safe central processing unit with 1.5 MB work memory, MPI/DP and second PROFIBUS DP master/slave interface.",

    lifecycle: "spare-part",

    specifications: {
      workMemory: "1.5 MB",
      interfaces: ["MPI/DP", "PROFIBUS DP"],
      supplyVoltage: "24 V DC",
      memoryCard: "Micro Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7317-6FF04-0AB0",
  },

  {
    id: "siemens-s7-300-cpu-317f-2pn-dp-6es7317-2fk14-0ab0",
    mlfb: "6ES7317-2FK14-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "CPU",
    variantId: "fail-safe",

    title: "SIMATIC S7-300 CPU 317F-2 PN/DP",

    description:
      "SIMATIC S7-300 CPU 317F-2 PN/DP fail-safe central processing unit with 1.5 MB work memory, MPI/DP and Ethernet PROFINET interface with 2-port switch.",

    lifecycle: "phase-out",

    specifications: {
      workMemory: "1.5 MB",
      interfaces: ["MPI/DP", "PROFINET"],
      supplyVoltage: "24 V DC",
      memoryCard: "Micro Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7317-2FK14-0AB0",
  },

  {
    id: "siemens-s7-300-cpu-319f-3pn-dp-3fl01-0ab0",
    mlfb: "6ES7318-3FL01-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "CPU",
    variantId: "fail-safe",

    title: "SIMATIC S7-300 CPU 319F-3 PN/DP",

    description:
      "SIMATIC S7-300 CPU 319F-3 PN/DP fail-safe central processing unit with 2.5 MB work memory, MPI/DP, DP master/slave and Ethernet PROFINET interfaces.",

    lifecycle: "spare-part",

    specifications: {
      workMemory: "2.5 MB",
      interfaces: ["MPI/DP", "PROFIBUS DP", "PROFINET"],
      supplyVoltage: "24 V DC",
      memoryCard: "Micro Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/inosatavtomatica/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7318-3FL01-0AB0",
  },
  // --------------------------------------------------
  // S7-300 — Technology CPU
  // --------------------------------------------------

  {
    id: "siemens-s7-300-cpu-315t-3pn-dp-7tj10-0ab0",
    mlfb: "6ES7315-7TJ10-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "CPU",
    variantId: "technology",

    title: "SIMATIC S7-300 CPU 315T-3 PN/DP",

    description:
      "SIMATIC S7-300 CPU 315T-3 PN/DP technology CPU for PLC and technology tasks with 384 KB work memory, MPI/DP, drive PROFIBUS DP, PROFINET and integrated technology I/O.",

    lifecycle: "phase-out",

    specifications: {
      workMemory: "384 KB",
      interfaces: ["MPI/DP", "PROFIBUS DP", "PROFINET"],
      supplyVoltage: "24 V DC",
      memoryCard: "Micro Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/us/Catalog/Product/6ES73157TJ100AB0",
  },

  {
    id: "siemens-s7-300-cpu-317t-3pn-dp-7tk10-0ab0",
    mlfb: "6ES7317-7TK10-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "CPU",
    variantId: "technology",

    title: "SIMATIC S7-300 CPU 317T-3 PN/DP",

    description:
      "SIMATIC S7-300 CPU 317T-3 PN/DP technology CPU for PLC and technology tasks with 1 MB work memory, MPI/DP, drive PROFIBUS DP, PROFINET and integrated technology I/O.",

    lifecycle: "spare-part",

    specifications: {
      workMemory: "1 MB",
      interfaces: ["MPI/DP", "PROFIBUS DP", "PROFINET"],
      supplyVoltage: "24 V DC",
      memoryCard: "Micro Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/cn/Catalog/Product/6ES73177TK100AB0",
  },

  {
    id: "siemens-s7-300-cpu-317tf-3pn-dp-7ul10-0ab0",
    mlfb: "6ES7317-7UL10-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "CPU",
    variantId: "technology",

    title: "SIMATIC S7-300 CPU 317TF-3 PN/DP",

    description:
      "SIMATIC S7-300 CPU 317TF-3 PN/DP technology and safety CPU with 1.5 MB work memory, MPI/DP, drive PROFIBUS DP, PROFINET, integrated technology I/O and fail-safe functionality.",

    lifecycle: "spare-part",

    specifications: {
      workMemory: "1.5 MB",
      interfaces: ["MPI/DP", "PROFIBUS DP", "PROFINET"],
      supplyVoltage: "24 V DC",
      memoryCard: "Micro Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/goos/catalog/Pages/mmpdata.ashx?MLFB1=6ES7317-7UL10-0AB0&MLFB2=6ES7317-6TF14-0AB0&lang=en",
  },

  // --------------------------------------------------
  // S7-300 — SIPLUS Standard CPU
  // --------------------------------------------------

  {
    id: "siemens-siplus-s7-300-cpu-314-1ag14-7ab0",
    mlfb: "6AG1314-1AG14-7AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "CPU",
    variantId: "siplus",

    title: "SIPLUS S7-300 CPU 314",

    description:
      "SIPLUS S7-300 CPU 314 based on SIMATIC CPU 314 with conformal coating, -25…+70 °C, 128 KB work memory, MPI interface and integrated 24 V DC power supply.",

    lifecycle: "spare-part",

    specifications: {
      workMemory: "128 KB",
      interfaces: ["MPI"],
      supplyVoltage: "24 V DC",
      memoryCard: "Micro Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/fescomelsaownuy/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1314-1AG14-7AB0",
  },

  {
    id: "siemens-siplus-s7-300-cpu-315-2dp-6ag1315-2ah14-7ab0",
    mlfb: "6AG1315-2AH14-7AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "CPU",
    variantId: "siplus",

    title: "SIPLUS S7-300 CPU 315-2 DP",

    description:
      "SIPLUS S7-300 CPU 315-2 DP based on SIMATIC CPU 315-2 DP with conformal coating, -25…+70 °C, 256 KB work memory, MPI and PROFIBUS DP interface.",

    lifecycle: "phase-out",

    specifications: {
      workMemory: "256 KB",
      interfaces: ["MPI", "PROFIBUS DP"],
      supplyVoltage: "24 V DC",
      memoryCard: "Micro Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/ww/Catalog/Product/?mlfb=6AG1315-2AH14-7AB0",
  },

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
      "SIPLUS S7-300 CPU 315-2 PN/DP based on SIMATIC CPU 315-2 PN/DP with conformal coating, -25…+70 °C, 384 KB work memory, MPI/DP and Ethernet PROFINET interfaces with 2-port switch.",

    lifecycle: "discontinued",

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
    id: "siemens-siplus-s7-300-cpu-317-2pn-dp-6ag1317-2ek14-7ab0",
    mlfb: "6AG1317-2EK14-7AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "CPU",
    variantId: "siplus",

    title: "SIPLUS S7-300 CPU 317-2 PN/DP",

    description:
      "SIPLUS S7-300 CPU 317-2 PN/DP based on SIMATIC CPU 317-2 PN/DP with conformal coating, -25…+70 °C, 1 MB work memory, MPI/DP and Ethernet PROFINET interfaces with 2-port switch.",

    lifecycle: "spare-part",

    specifications: {
      workMemory: "1 MB",
      interfaces: ["MPI/DP", "PROFINET"],
      supplyVoltage: "24 V DC",
      memoryCard: "Micro Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product/6AG13172EK147AB0",
  },

  // --------------------------------------------------
  // S7-300 — SIPLUS Compact CPU
  // --------------------------------------------------

  {
    id: "siemens-siplus-s7-300-cpu-312c-5bf04-7ab0",
    mlfb: "6AG1312-5BF04-7AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "CPU",
    variantId: "siplus",

    title: "SIPLUS S7-300 CPU 312C",

    description:
      "SIPLUS S7-300 CPU 312C based on SIMATIC CPU 312C with conformal coating, -25…+70 °C, 64 KB work memory, MPI interface, 10 digital inputs, 6 digital outputs and 2 high-speed counters.",

    lifecycle: "phase-out",

    specifications: {
      workMemory: "64 KB",
      interfaces: ["MPI"],
      supplyVoltage: "24 V DC",
      digitalInputs: 10,
      digitalOutputs: 6,
      highSpeedCounters: "2 × 10 kHz",
      memoryCard: "Micro Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/hu/Catalog/Product/6AG13125BF047AB0",
  },

  {
    id: "siemens-siplus-s7-300-cpu-313c-5bg04-7ab0",
    mlfb: "6AG1313-5BG04-7AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "CPU",
    variantId: "siplus",

    title: "SIPLUS S7-300 CPU 313C",

    description:
      "SIPLUS S7-300 CPU 313C based on SIMATIC CPU 313C with conformal coating, -25…+70 °C, 128 KB work memory, MPI interface, 24 digital inputs, 16 digital outputs, 4 analog inputs, 2 analog outputs, 1 Pt100 input and 3 high-speed counters.",

    lifecycle: "discontinued",

    specifications: {
      workMemory: "128 KB",
      interfaces: ["MPI"],
      supplyVoltage: "24 V DC",
      digitalInputs: 24,
      digitalOutputs: 16,
      analogInputs: 4,
      analogOutputs: 2,
      highSpeedCounters: "3 × 30 kHz",
      memoryCard: "Micro Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/powertecownsy/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1313-5BG04-7AB0",
  },

  {
    id: "siemens-siplus-s7-300-cpu-313c-2dp-6cg04-7ab0",
    mlfb: "6AG1313-6CG04-7AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "CPU",
    variantId: "siplus",

    title: "SIPLUS S7-300 CPU 313C-2 DP",

    description:
      "SIPLUS S7-300 CPU 313C-2 DP based on SIMATIC CPU 313C-2 DP with conformal coating, -25…+70 °C, 128 KB work memory, MPI and PROFIBUS DP interfaces, 16 digital inputs, 16 digital outputs and 3 high-speed counters.",

    lifecycle: "phase-out",

    specifications: {
      workMemory: "128 KB",
      interfaces: ["MPI", "PROFIBUS DP"],
      supplyVoltage: "24 V DC",
      digitalInputs: 16,
      digitalOutputs: 16,
      highSpeedCounters: "3 × 30 kHz",
      memoryCard: "Micro Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/ww/Catalog/Product/?mlfb=6AG1313-6CG04-7AB0",
  },

  {
    id: "siemens-siplus-s7-300-cpu-314c-2ptp-6bh04-7ab0",
    mlfb: "6AG1314-6BH04-7AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "CPU",
    variantId: "siplus",

    title: "SIPLUS S7-300 CPU 314C-2 PtP",

    description:
      "SIPLUS S7-300 CPU 314C-2 PtP based on SIMATIC CPU 314C-2 PtP with conformal coating, -25…+70 °C, 192 KB work memory, MPI and RS485 interfaces, 24 digital inputs, 16 digital outputs, 4 analog inputs, 2 analog outputs, 1 Pt100 input and 4 high-speed counters.",

    lifecycle: "phase-out",

    specifications: {
      workMemory: "192 KB",
      interfaces: ["MPI", "RS485"],
      supplyVoltage: "24 V DC",
      digitalInputs: 24,
      digitalOutputs: 16,
      analogInputs: 4,
      analogOutputs: 2,
      highSpeedCounters: "4 × 60 kHz",
      memoryCard: "Micro Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/ww/Catalog/Product/?mlfb=6AG1314-6BH04-7AB0",
  },

  {
    id: "siemens-siplus-s7-300-cpu-314c-2dp-6ch04-7ab0",
    mlfb: "6AG1314-6CH04-7AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "CPU",
    variantId: "siplus",

    title: "SIPLUS S7-300 CPU 314C-2 DP",

    description:
      "SIPLUS S7-300 CPU 314C-2 DP based on SIMATIC CPU 314C-2 DP with conformal coating, -25…+70 °C, 192 KB work memory, MPI and PROFIBUS DP interfaces, 24 digital inputs, 16 digital outputs, 4 analog inputs, 2 analog outputs, 1 Pt100 input and 4 high-speed counters.",

    lifecycle: "discontinued",

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
      "https://mall.industry.siemens.com/mall/en/ww/Catalog/Product/?mlfb=6AG1314-6CH04-7AB0",
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
      "SIPLUS S7-300 CPU 314C-2 PN/DP based on SIMATIC CPU 314C-2 PN/DP with conformal coating, -25…+70 °C, 192 KB work memory, 24 digital inputs, 16 digital outputs, 4 analog inputs, 2 analog outputs, 1 Pt100 input, 4 high-speed counters at 60 kHz, MPI/DP and Ethernet PROFINET interfaces with 2-port switch.",

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

  // --------------------------------------------------
  // S7-300 — SIPLUS Fail-safe CPU
  // --------------------------------------------------

  {
    id: "siemens-siplus-s7-300-cpu-315f-2dp-6ag1315-6ff04-2ab0",
    mlfb: "6AG1315-6FF04-2AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "CPU",
    variantId: "siplus",

    title: "SIPLUS S7-300 CPU 315F-2 DP",

    description:
      "SIPLUS S7-300 CPU 315F-2 DP based on SIMATIC CPU 315F-2 DP with conformal coating, -25…+60 °C, 384 KB work memory, MPI and PROFIBUS DP interfaces and fail-safe functionality.",

    lifecycle: "phase-out",

    specifications: {
      workMemory: "384 KB",
      interfaces: ["MPI", "PROFIBUS DP"],
      supplyVoltage: "24 V DC",
      memoryCard: "Micro Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/NO/NO/Catalog/Product/?mlfb=6AG1315-6FF04-2AB0",
  },

  {
    id: "siemens-siplus-s7-300-cpu-315f-2pn-dp-6ag1315-2fj14-2ab0",
    mlfb: "6AG1315-2FJ14-2AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "CPU",
    variantId: "siplus",

    title: "SIPLUS S7-300 CPU 315F-2 PN/DP",

    description:
      "SIPLUS S7-300 CPU 315F-2 PN/DP based on SIMATIC CPU 315F-2 PN/DP with conformal coating, -25…+60 °C, 512 KB work memory, MPI/DP and Ethernet PROFINET interfaces with 2-port switch.",

    lifecycle: "phase-out",

    specifications: {
      workMemory: "512 KB",
      interfaces: ["MPI/DP", "PROFINET"],
      supplyVoltage: "24 V DC",
      memoryCard: "Micro Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/ww/Catalog/Product/?mlfb=6AG1315-2FJ14-2AB0",
  },

  {
    id: "siemens-siplus-s7-300-cpu-317f-2dp-6ag1317-6ff04-2ab0",
    mlfb: "6AG1317-6FF04-2AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "CPU",
    variantId: "siplus",

    title: "SIPLUS S7-300 CPU 317F-2 DP",

    description:
      "SIPLUS S7-300 CPU 317F-2 DP based on SIMATIC CPU 317F-2 DP with conformal coating, -25…+60 °C, 1.5 MB work memory, MPI/DP and second DP master/slave interface.",

    lifecycle: "phase-out",

    specifications: {
      workMemory: "1.5 MB",
      interfaces: ["MPI/DP", "PROFIBUS DP"],
      supplyVoltage: "24 V DC",
      memoryCard: "Micro Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/ww/Catalog/Product/?mlfb=6AG1317-6FF04-2AB0",
  },

  {
    id: "siemens-siplus-s7-300-cpu-317f-2pn-dp-6ag1317-2fk14-2ab0",
    mlfb: "6AG1317-2FK14-2AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "CPU",
    variantId: "siplus",

    title: "SIPLUS S7-300 CPU 317F-2 PN/DP",

    description:
      "SIPLUS S7-300 CPU 317F-2 PN/DP based on SIMATIC CPU 317F-2 PN/DP with conformal coating, -25…+60 °C, 1.5 MB work memory, MPI/DP and Ethernet PROFINET interfaces with 2-port switch and fail-safe functionality.",

    lifecycle: "phase-out",

    specifications: {
      workMemory: "1.5 MB",
      interfaces: ["MPI/DP", "PROFINET"],
      supplyVoltage: "24 V DC",
      memoryCard: "Micro Memory Card",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/uk/Catalog/Product/6AG1317-2FK14-2AB0",
  },
];
