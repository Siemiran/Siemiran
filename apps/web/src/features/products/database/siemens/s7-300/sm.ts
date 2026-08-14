export type SiemensS7300ModuleLifecycle =
  "active" | "phase-out" | "spare-part" | "discontinued";

export interface SiemensS7300SignalModule {
  id: string;
  mlfb: string;

  brandId: "siemens";
  categoryId: "PLC";
  familyId: "S7-300";
  seriesId: "S7-300";

  productTypeId: "Signal Module";
  variantId: string;

  title: string;
  description: string;

  lifecycle: SiemensS7300ModuleLifecycle;

  specifications: {
    digitalInputs?: number;
    digitalOutputs?: number;
    inputVoltage?: string;
    outputVoltage?: string;
    interfaces?: string[];
    terminalConnection?: string;
    diagnostics?: string;
    interrupts?: string;
    isochronousMode?: boolean;
    memoryCard?: string;
    signalStandard?: string;
    hazardousArea?: boolean;
  };

  source: string;
}

export const s7300SM: SiemensS7300SignalModule[] = [
  // --------------------------------------------------
  // S7-300 — SM 321 — Digital Input
  // Siemens catalog order: low-voltage DC, AC/DC, high-voltage AC,
  // high-density, diagnostics/high-speed, and Ex/NAMUR variants.
  // --------------------------------------------------

  {
    id: "siemens-s7-300-sm321-di-16-24vdc-1bh02-0aa0",
    mlfb: "6ES7321-1BH02-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "digital-input",

    title: "SIMATIC S7-300 SM 321 16 DI 24 V DC",

    description:
      "SIMATIC S7-300 digital input SM 321, isolated, 16 digital inputs, 24 V DC, 1 x 20-pole.",

    lifecycle: "spare-part",

    specifications: {
      digitalInputs: 16,
      inputVoltage: "24 V DC",
      terminalConnection: "1 x 20-pole",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product/6ES7321-1BH02-0AA0",
  },

  {
    id: "siemens-s7-300-sm321-di-16-24vdc-1bh10-0aa0",
    mlfb: "6ES7321-1BH10-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "digital-input",

    title: "SIMATIC S7-300 SM 321 16 DI 24 V DC HF",

    description:
      "SIMATIC S7-300 digital input SM 321, isolated, 16 digital inputs, 24 V DC, 1 x 20-pole, with 0.05 ms input delay.",

    lifecycle: "phase-out",

    specifications: {
      digitalInputs: 16,
      inputVoltage: "24 V DC",
      terminalConnection: "1 x 20-pole",
      interfaces: ["Backplane bus"],
      diagnostics: "Module diagnostics",
      interrupts: "Process interrupt",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/pt/Catalog/Product/?mlfb=6ES7321-1BH10-0AA0",
  },

  {
    id: "siemens-s7-300-sm321-di-32-24vdc-1bl00-0aa0",
    mlfb: "6ES7321-1BL00-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "digital-input",

    title: "SIMATIC S7-300 SM 321 32 DI 24 V DC",

    description:
      "SIMATIC S7-300 digital input SM 321, isolated, 32 digital inputs, 24 V DC, 1 x 40-pole.",

    lifecycle: "spare-part",

    specifications: {
      digitalInputs: 32,
      inputVoltage: "24 V DC",
      terminalConnection: "1 x 40-pole",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product/6ES7321-1BL00-0AA0",
  },

  {
    id: "siemens-s7-300-sm321-di-64-24vdc-1bp00-0aa0",
    mlfb: "6ES7321-1BP00-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "digital-input",

    title: "SIMATIC S7-300 SM 321 64 DI 24 V DC",

    description:
      "SIMATIC S7-300 digital input SM 321, isolated in groups of 16, 64 digital inputs, 24 V DC, 3 ms input delay, with sinking/sourcing terminal blocks.",

    lifecycle: "spare-part",

    specifications: {
      digitalInputs: 64,
      inputVoltage: "24 V DC",
      terminalConnection:
        "Sinking/sourcing input terminal blocks 6ES7392-1.N00-0AA0 and cable 6ES7392-4...0-0AA0",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product/6ES7321-1BP00-0AA0",
  },

  {
    id: "siemens-s7-300-sm321-di-16-48-125vdc-1ch20-0aa0",
    mlfb: "6ES7321-1CH20-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "digital-input",

    title: "SIMATIC S7-300 SM 321 16 DI 48-125 V DC",

    description:
      "SIMATIC S7-300 digital input SM 321, isolated, 16 digital inputs, 48-125 V DC, 1 x 20-pole.",

    lifecycle: "spare-part",

    specifications: {
      digitalInputs: 16,
      inputVoltage: "48-125 V DC",
      terminalConnection: "1 x 20-pole",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7321-1CH20-0AA0",
  },

  {
    id: "siemens-s7-300-sm321-di-16-24-48vacdc-1ch00-0aa0",
    mlfb: "6ES7321-1CH00-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "digital-input",

    title: "SIMATIC S7-300 SM 321 16 DI 24-48 V AC/DC",

    description:
      "SIMATIC S7-300 digital input SM 321, isolated, 16 digital inputs, 24-48 V AC/DC, with single rooting, 1 x 40-pole.",

    lifecycle: "phase-out",

    specifications: {
      digitalInputs: 16,
      inputVoltage: "24-48 V AC/DC",
      terminalConnection: "1 x 40-pole",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/mall/en/ww/Catalog/Product/6ES7321-1CH00-0AA0",
  },

  {
    id: "siemens-s7-300-sm321-di-32-120vac-1el00-0aa0",
    mlfb: "6ES7321-1EL00-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "digital-input",

    title: "SIMATIC S7-300 SM 321 32 DI 120 V AC",

    description:
      "SIMATIC S7-300 digital input SM 321, isolated, 32 digital inputs, 120 V AC, 1 x 40-pole.",

    lifecycle: "spare-part",

    specifications: {
      digitalInputs: 32,
      inputVoltage: "120 V AC",
      terminalConnection: "1 x 40-pole",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product/6ES7321-1EL00-0AA0",
  },

  {
    id: "siemens-s7-300-sm321-di-8-120-230vac-1ff01-0aa0",
    mlfb: "6ES7321-1FF01-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "digital-input",

    title: "SIMATIC S7-300 SM 321 8 DI 120/230 V AC",

    description:
      "SIMATIC S7-300 digital input SM 321, isolated, 8 digital inputs, 120/230 V AC, 1 x 20-pole.",

    lifecycle: "spare-part",

    specifications: {
      digitalInputs: 8,
      inputVoltage: "120/230 V AC",
      terminalConnection: "1 x 20-pole",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product/6ES7321-1FF01-0AA0",
  },

  {
    id: "siemens-s7-300-sm321-di-8-120-230vac-1ff10-0aa0",
    mlfb: "6ES7321-1FF10-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "digital-input",

    title: "SIMATIC S7-300 SM 321 8 DI 120/230 V AC",

    description:
      "SIMATIC S7-300 digital input SM 321, isolated, 8 digital inputs, 120/230 V AC, 1 x 40-pole, with single rooting/channel.",

    lifecycle: "phase-out",

    specifications: {
      digitalInputs: 8,
      inputVoltage: "120/230 V AC",
      terminalConnection: "1 x 40-pole",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/mall/en/se/Catalog/Product/6ES7321-1FF10-0AA0",
  },

  {
    id: "siemens-s7-300-sm321-di-16-120-230vac-1fh00-0aa0",
    mlfb: "6ES7321-1FH00-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "digital-input",

    title: "SIMATIC S7-300 SM 321 16 DI 120/230 V AC",

    description:
      "SIMATIC S7-300 digital input SM 321, isolated, 16 digital inputs, 120/230 V AC, 1 x 20-pole.",

    lifecycle: "spare-part",

    specifications: {
      digitalInputs: 16,
      inputVoltage: "120/230 V AC",
      terminalConnection: "1 x 20-pole",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/mall/ru/ru/Catalog/Product/6ES7321-1FH00-0AA0",
  },

  {
    id: "siemens-s7-300-sm321-di-16-24vdc-diagnostics-7bh01-0ab0",
    mlfb: "6ES7321-7BH01-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "digital-input",

    title: "SIMATIC S7-300 SM 321 16 DI 24 V DC HF Diagnostics",

    description:
      "SIMATIC S7-300 digital input SM 321, isolated, 16 digital inputs, 24 V DC, 1 x 20-pole, with process interrupt, diagnostics and support for isochronous mode.",

    lifecycle: "spare-part",

    specifications: {
      digitalInputs: 16,
      inputVoltage: "24 V DC",
      terminalConnection: "1 x 20-pole",
      interfaces: ["Backplane bus"],
      diagnostics: "Module diagnostics",
      interrupts: "Process interrupt",
      isochronousMode: true,
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7321-7BH01-0AB0",
  },

  {
    id: "siemens-s7-300-sm321-di-4-24vdc-namur-7rd00-0ab0",
    mlfb: "6ES7321-7RD00-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "digital-input",

    title: "SIMATIC S7-300 SM 321 4 DI 24 V DC NAMUR",

    description:
      "SIMATIC S7-300 SM 321 digital input module, isolated, 4 digital inputs, 24 V DC, NAMUR/DIN 19234, for signals from hazardous areas, diagnostics-capable and PTB tested.",

    lifecycle: "spare-part",

    specifications: {
      digitalInputs: 4,
      inputVoltage: "24 V DC",
      interfaces: ["Backplane bus"],
      diagnostics: "Diagnostics-capable",
      signalStandard: "NAMUR / DIN 19234",
      hazardousArea: true,
    },

    source:
      "https://mall.industry.siemens.com/mall/en/fescomelsaownuy/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7321-7RD00-0AB0",
  },

  {
    id: "siemens-s7-300-sm321-di-16-24-125vdc-7eh00-0ab0",
    mlfb: "6ES7321-7EH00-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "digital-input",

    title: "SIMATIC S7-300 SM 321 16 DI 24/125 V DC",

    description:
      "SIMATIC S7-300 SM 321 digital input module with 16 digital inputs, 24/125 V DC, wire-break diagnostics and hardware interrupt diagnostics.",

    lifecycle: "spare-part",

    specifications: {
      digitalInputs: 16,
      inputVoltage: "24/125 V DC",
      terminalConnection: "1 x 40-pole",
      interfaces: ["Backplane bus"],
      diagnostics: "Wire-break diagnostics",
      interrupts: "Hardware interrupt diagnostics",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/fescomelsaownuy/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7321-7EH00-0AB0",
  },

  {
    id: "siemens-s7-300-sm321-di-16-24vdc-namur-7th00-0ab0",
    mlfb: "6ES7321-7TH00-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "digital-input",

    title: "SIMATIC S7-300 SM 321 16 DI 24 V DC NAMUR",

    description:
      "SIMATIC S7-300 SM 321 digital input module with 16 digital inputs, 24 V DC and NAMUR signal evaluation for process automation applications.",

    lifecycle: "discontinued",

    specifications: {
      digitalInputs: 16,
      inputVoltage: "24 V DC",
      terminalConnection: "1 x 40-pole",
      interfaces: ["Backplane bus"],
      signalStandard: "NAMUR",
      hazardousArea: true,
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/7215812/Signalbaugruppen_EN_en-US.pdf",
  },

  {
    id: "siemens-s7-300-sm321-di-16-24vdc-sourcing-1bh50-0aa0",
    mlfb: "6ES7321-1BH50-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "digital-input",

    title: "SIMATIC S7-300 SM 321 16 DI 24 V DC Sourcing",

    description:
      "SIMATIC S7-300 digital input SM 321, isolated, 16 digital inputs, 24 V DC sourcing inputs, 1 x 20-pole.",

    lifecycle: "spare-part",

    specifications: {
      digitalInputs: 16,
      inputVoltage: "24 V DC",
      terminalConnection: "1 x 20-pole",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product/6ES7321-1BH50-0AA0",
  },

  {
    id: "siemens-s7-300-sm321-di16-24vdc-diagnostics-7bh00-0ab0",
    mlfb: "6ES7321-7BH00-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "digital-input",

    title: "SIMATIC S7-300 SM 321 16 DI 24 V DC Diagnostics",

    description:
      "SIMATIC S7-300 digital input SM 321, 16 digital inputs, 24 V DC, with diagnostics and process/hardware interrupt capability.",

    lifecycle: "discontinued",

    specifications: {
      digitalInputs: 16,
      inputVoltage: "24 V DC",
      terminalConnection: "1 x 40-pole",
      interfaces: ["Backplane bus"],
      diagnostics: "Parameterizable diagnostics",
      interrupts: "Hardware/process interrupt",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/109983085/s7400_cpu_410_proc_autom_v8.3_system_en-US_en-US.pdf",
  },

  // --------------------------------------------------
  // S7-300 — SM 322 — Digital Output
  // --------------------------------------------------

  {
    id: "siemens-s7-300-sm322-do-8-24vdc-2a-1bf01-0aa0",
    mlfb: "6ES7322-1BF01-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "digital-output",

    title: "SIMATIC S7-300 SM 322 8 DO 24 V DC",

    description:
      "SIMATIC S7-300 digital output signal module SM 322, isolated, 8 digital outputs, 24 V DC, 2 A, 1 x 20-pole.",

    lifecycle: "spare-part",

    specifications: {
      digitalOutputs: 8,
      outputVoltage: "24 V DC",
      terminalConnection: "1 x 20-pole",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/mall/en/mx/Catalog/Product/6ES7322-1BF01-0AA0",
  },

  {
    id: "siemens-s7-300-sm322-do-16-24vdc-0-5a-1bh01-0aa0",
    mlfb: "6ES7322-1BH01-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "digital-output",

    title: "SIMATIC S7-300 SM 322 16 DO 24 V DC",

    description:
      "SIMATIC S7-300 digital output signal module SM 322, isolated, 16 digital outputs, 24 V DC, 0.5 A, 1 x 20-pole.",

    lifecycle: "spare-part",

    specifications: {
      digitalOutputs: 16,
      outputVoltage: "24 V DC",
      terminalConnection: "1 x 20-pole",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product/6ES7322-1BH01-0AA0",
  },

  {
    id: "siemens-s7-300-sm322-do-16-24vdc-high-speed-1bh10-0aa0",
    mlfb: "6ES7322-1BH10-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "digital-output",

    title: "SIMATIC S7-300 SM 322 High Speed 16 DO 24 V DC",

    description:
      "SIMATIC S7-300 high-speed digital output signal module SM 322, isolated, 16 digital outputs, 24 V DC, 0.5 A, 1 x 20-pole.",

    lifecycle: "spare-part",

    specifications: {
      digitalOutputs: 16,
      outputVoltage: "24 V DC",
      terminalConnection: "1 x 20-pole",
      interfaces: ["Backplane bus"],
      diagnostics: "High-speed output module",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product/6ES7322-1BH10-0AA0",
  },

  {
    id: "siemens-s7-300-sm322-do-32-24vdc-0-5a-1bl00-0aa0",
    mlfb: "6ES7322-1BL00-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "digital-output",

    title: "SIMATIC S7-300 SM 322 32 DO 24 V DC",

    description:
      "SIMATIC S7-300 digital output signal module SM 322, isolated, 32 digital outputs, 24 V DC, 0.5 A, 1 x 40-pole.",

    lifecycle: "spare-part",

    specifications: {
      digitalOutputs: 32,
      outputVoltage: "24 V DC",
      terminalConnection: "1 x 40-pole",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/mall/en/ie/Catalog/Product/6ES7322-1BL00-0AA0",
  },

  {
    id: "siemens-s7-300-sm322-do-16-ac-120-230v-1a-1fh00-0aa0",
    mlfb: "6ES7322-1FH00-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "digital-output",

    title: "SIMATIC S7-300 SM 322 16 DO 120/230 V AC",

    description:
      "SIMATIC S7-300 digital output signal module SM 322, isolated, 16 digital outputs, 120 V/230 V AC, 1 A, 1 x 20-pole.",

    lifecycle: "spare-part",

    specifications: {
      digitalOutputs: 16,
      outputVoltage: "120/230 V AC",
      terminalConnection: "1 x 20-pole",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product/6ES7322-1FH00-0AA0",
  },

  {
    id: "siemens-s7-300-sm322-do-16-acdc-24-48v-0-5a-5gh00-0ab0",
    mlfb: "6ES7322-5GH00-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "digital-output",

    title: "SIMATIC S7-300 SM 322 16 DO 24-48 V AC/DC",

    description:
      "SIMATIC S7-300 digital output signal module SM 322, isolated, 16 digital outputs using solid-state relays, 24-48 V AC/DC, 0.5 A, 1 x 40-pole.",

    lifecycle: "phase-out",

    specifications: {
      digitalOutputs: 16,
      outputVoltage: "24-48 V AC/DC",
      terminalConnection: "1 x 40-pole",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/mall/en/en/Catalog/Product/6ES7322-5GH00-0AB0",
  },

  {
    id: "siemens-s7-300-sm322-do-8-relay-24vdc-230vac-2a-1hf01-0aa0",
    mlfb: "6ES7322-1HF01-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "digital-output",

    title: "SIMATIC S7-300 SM 322 8 DO Relay",

    description:
      "SIMATIC S7-300 digital output signal module SM 322, isolated, 8 relay outputs, 24 V DC or 230 V AC, 2 A, 1 x 20-pole.",

    lifecycle: "phase-out",

    specifications: {
      digitalOutputs: 8,
      outputVoltage: "24 V DC / 230 V AC",
      terminalConnection: "1 x 20-pole",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/mall/en/WW/Catalog/Product/6ES7322-1HF01-0AA0",
  },

  {
    id: "siemens-s7-300-sm322-do-8-relay-24vdc-230vac-5a-1hf10-0aa0",
    mlfb: "6ES7322-1HF10-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "digital-output",

    title: "SIMATIC S7-300 SM 322 8 DO Relay 5 A",

    description:
      "SIMATIC S7-300 digital output signal module SM 322, isolated, 8 relay outputs, 24 V DC or 230 V AC, 5 A, 1 x 40-pole.",

    lifecycle: "spare-part",

    specifications: {
      digitalOutputs: 8,
      outputVoltage: "24 V DC / 230 V AC",
      terminalConnection: "1 x 40-pole",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/mall/en/dimensionalequipamentoseletricosbrown/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7322-1HF10-0AA0",
  },

  {
    id: "siemens-s7-300-sm322-do-16-relay-120vdc-230vac-2a-1hh01-0aa0",
    mlfb: "6ES7322-1HH01-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "digital-output",

    title: "SIMATIC S7-300 SM 322 16 DO Relay 120 V DC / 230 V AC",

    description:
      "SIMATIC S7-300 digital output signal module SM 322, isolated, 16 relay outputs, 120 V DC or 230 V AC, 2 A, 1 x 20-pole.",

    lifecycle: "spare-part",

    specifications: {
      digitalOutputs: 16,
      outputVoltage: "120 V DC / 230 V AC",
      terminalConnection: "1 x 20-pole",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/mall/en/WW/Catalog/Product/6ES7322-1HH01-0AA0",
  },

  {
    id: "siemens-s7-300-sm322-do-8-ac-120-230v-2a-5ff00-0ab0",
    mlfb: "6ES7322-5FF00-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "digital-output",

    title: "SIMATIC S7-300 SM 322 8 DO 120/230 V AC",

    description:
      "SIMATIC S7-300 digital output signal module SM 322, isolated, 8 digital outputs, 120/230 V AC, 2 A, with selectable failure mode and 1 x 40-pole connection.",

    lifecycle: "phase-out",

    specifications: {
      digitalOutputs: 8,
      outputVoltage: "120/230 V AC",
      terminalConnection: "1 x 40-pole",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/mall/NO/NO/Catalog/Product/?mlfb=6ES7322-5FF00-0AB0",
  },

  {
    id: "siemens-s7-300-sm322-do-32-ac-120-230v-1a-1fl00-0aa0",
    mlfb: "6ES7322-1FL00-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "digital-output",

    title: "SIMATIC S7-300 SM 322 32 DO 120/230 V AC",

    description:
      "SIMATIC S7-300 digital output signal module SM 322, isolated, 32 digital outputs, 120/230 V AC, 1 A, double-width, 2 x 20-pole.",

    lifecycle: "spare-part",

    specifications: {
      digitalOutputs: 32,
      outputVoltage: "120/230 V AC",
      terminalConnection: "2 x 20-pole",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product/6ES7322-1FL00-0AA0",
  },

  {
    id: "siemens-s7-300-sm322-do-64-24vdc-0-3a-1bp00-0aa0",
    mlfb: "6ES7322-1BP00-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "digital-output",

    title: "SIMATIC S7-300 SM 322 64 DO 24 V DC",

    description:
      "SIMATIC S7-300 digital output SM 322, isolated in groups of 16, 64 digital outputs, 24 V DC, 0.3 A sink output, total current 2 A per group and 8 A per module.",

    lifecycle: "phase-out",

    specifications: {
      digitalOutputs: 64,
      outputVoltage: "24 V DC",
      terminalConnection: "64-pin",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7322-1BP00-0AA0",
  },

  {
    id: "siemens-s7-300-sm322-do-64-24vdc-0-3a-sinking-1bp50-0aa0",
    mlfb: "6ES7322-1BP50-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "digital-output",

    title: "SIMATIC S7-300 SM 322 64 DO 24 V DC Sinking",

    description:
      "SIMATIC S7-300 digital output SM 322 with 64 digital outputs, 24 V DC, 0.3 A sinking outputs, electrically isolated in four groups of 16 channels.",

    lifecycle: "phase-out",

    specifications: {
      digitalOutputs: 64,
      outputVoltage: "24 V DC",
      terminalConnection:
        "Terminal blocks 6ES7392-1.N00-0AA0 and cables 6ES7392-4...0-0AA0",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/8859629/s7300_module_data_manual_en-US_en-US.pdf",
  },

  {
    id: "siemens-s7-300-sm322-do-16-24vdc-0-5a-diagnostics-8bh10-0ab0",
    mlfb: "6ES7322-8BH10-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "digital-output",

    title: "SIMATIC S7-300 SM 322 16 DO 24 V DC Diagnostics",

    description:
      "SIMATIC S7-300 digital output SM 322, 16 digital outputs, 24 V DC, 0.5 A, diagnostics-capable with wire-break detection for 0 and 1 signal.",

    lifecycle: "phase-out",

    specifications: {
      digitalOutputs: 16,
      outputVoltage: "24 V DC",
      terminalConnection: "1 x 40-pole",
      interfaces: ["Backplane bus"],
      diagnostics: "Parameterizable diagnostics and wire-break detection",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/ww/Catalog/Product/?mlfb=6ES7322-8BH10-0AB0",
  },

  {
    id: "siemens-s7-300-sm322-do-4-ex-15v-20ma-5rd00-0ab0",
    mlfb: "6ES7322-5RD00-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "digital-output",

    title: "SIMATIC S7-300 SM 322 4 DO 15 V / 20 mA Ex",

    description:
      "SIMATIC S7-300 SM 322 digital output module with 4 optically isolated outputs, 15 V / 20 mA, for signals from hazardous areas, with diagnostics capability and PTB testing.",

    lifecycle: "discontinued",

    specifications: {
      digitalOutputs: 4,
      outputVoltage: "15 V",
      terminalConnection: "1 x 20-pole",
      interfaces: ["Backplane bus"],
      diagnostics: "Diagnostics-capable",
    },

    source:
      "https://mall.industry.siemens.com/mall/IT/IT/Catalog/Product/?mlfb=6ES7322-5RD00-0AB0",
  },

  {
    id: "siemens-s7-300-sm322-do-4-ex-24v-10ma-5sd00-0ab0",
    mlfb: "6ES7322-5SD00-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "digital-output",

    title: "SIMATIC S7-300 SM 322 4 DO 24 V DC / 10 mA Ex",

    description:
      "SIMATIC S7-300 SM 322 digital output module with 4 optically isolated outputs, 24 V DC / 10 mA, for signals from hazardous areas, with diagnostics capability.",

    lifecycle: "discontinued",

    specifications: {
      digitalOutputs: 4,
      outputVoltage: "24 V DC",
      terminalConnection: "1 x 20-pole",
      interfaces: ["Backplane bus"],
      diagnostics: "Diagnostics-capable",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/WW/Catalog/Product/?mlfb=6ES7322-5SD00-0AB0",
  },

  {
    id: "siemens-s7-300-sm322-do-8-24vdc-0-5a-diagnostics-8bf00-0ab0",
    mlfb: "6ES7322-8BF00-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "digital-output",

    title: "SIMATIC S7-300 SM 322 8 DO 24 V DC Diagnostics",

    description:
      "SIMATIC S7-300 digital output signal module SM 322 with 8 digital outputs, 24 V DC, 0.5 A and programmable diagnostics with diagnostic interrupt.",

    lifecycle: "discontinued",

    specifications: {
      digitalOutputs: 8,
      outputVoltage: "24 V DC",
      terminalConnection: "1 x 20-pole",
      interfaces: ["Backplane bus"],
      diagnostics: "Programmable diagnostics and diagnostic interrupt",
      interrupts: "Diagnostic interrupt",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product/6ES7322-8BF00-0AB0",
  },

  {
    id: "siemens-s7-300-sm322-do-8-48-125vdc-1-5a-1cf00-0aa0",
    mlfb: "6ES7322-1CF00-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "digital-output",

    title: "SIMATIC S7-300 SM 322 8 DO 48/125 V DC",

    description:
      "SIMATIC S7-300 digital output signal module SM 322, isolated, 8 digital outputs, 48/125 V DC, 1.5 A, 1 x 20-pole.",

    lifecycle: "discontinued",

    specifications: {
      digitalOutputs: 8,
      outputVoltage: "48/125 V DC",
      terminalConnection: "1 x 20-pole",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7322-1CF00-0AA0",
  },

  {
    id: "siemens-s7-300-sm322-do-8-relay-230vac-5a-rc-5hf00-0ab0",
    mlfb: "6ES7322-5HF00-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "digital-output",

    title: "SIMATIC S7-300 SM 322 8 DO Relay 230 V AC 5 A RC",

    description:
      "SIMATIC S7-300 digital output signal module SM 322 with 8 relay outputs, 230 V AC, 5 A, 1 x 40-pole and RC filter overvoltage protection.",

    lifecycle: "discontinued",

    specifications: {
      digitalOutputs: 8,
      outputVoltage: "230 V AC",
      terminalConnection: "1 x 40-pole",
      interfaces: ["Backplane bus"],
      diagnostics: "RC filter overvoltage protection",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/WW/Catalog/Product/?mlfb=6ES7322-5HF00-0AB0",
  },

  // --------------------------------------------------
  // S7-300 — SM 323 — Digital Input / Output
  // --------------------------------------------------

  {
    id: "siemens-s7-300-sm323-di8-do8-24vdc-0-5a-1bh01-0aa0",
    mlfb: "6ES7323-1BH01-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "digital-io",

    title: "SIMATIC S7-300 SM 323 8 DI / 8 DO 24 V DC",

    description:
      "SIMATIC S7-300 digital input/output signal module SM 323 with 8 digital inputs and 8 digital outputs, 24 V DC, 0.5 A, isolated, 1 x 20-pole.",

    lifecycle: "spare-part",

    specifications: {
      digitalInputs: 8,
      digitalOutputs: 8,
      inputVoltage: "24 V DC",
      outputVoltage: "24 V DC",
      terminalConnection: "1 x 20-pole",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7323-1BH01-0AA0",
  },

  {
    id: "siemens-s7-300-sm323-di16-do16-24vdc-0-5a-1bl00-0aa0",
    mlfb: "6ES7323-1BL00-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "digital-io",

    title: "SIMATIC S7-300 SM 323 16 DI / 16 DO 24 V DC",

    description:
      "SIMATIC S7-300 digital input/output signal module SM 323 with 16 digital inputs and 16 digital outputs, 24 V DC, 0.5 A, isolated, 1 x 40-pole.",

    lifecycle: "spare-part",

    specifications: {
      digitalInputs: 16,
      digitalOutputs: 16,
      inputVoltage: "24 V DC",
      outputVoltage: "24 V DC",
      terminalConnection: "1 x 40-pole",
      interfaces: ["Backplane bus"],
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7323-1BL00-0AA0",
  },

  // --------------------------------------------------
  // S7-300 — SM 327 — Programmable Digital I/O
  // --------------------------------------------------

  {
    id: "siemens-s7-300-sm327-di8-do8-24vdc-0-5a-1bh00-0ab0",
    mlfb: "6ES7327-1BH00-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "programmable-digital-io",

    title: "SIMATIC S7-300 SM 327 8 DI / 8 DX 24 V DC",

    description:
      "SIMATIC S7-300 programmable digital I/O module SM 327 with 8 digital inputs and 8 individually parameterizable digital I/O channels, configurable as DI or DO, 24 V DC, 0.5 A.",

    lifecycle: "spare-part",

    specifications: {
      digitalInputs: 8,
      digitalOutputs: 8,
      inputVoltage: "24 V DC",
      outputVoltage: "24 V DC",
      interfaces: ["Backplane bus"],
      terminalConnection: "1 x 20-pole",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/download/8859629/s7300_module_data_manual_en-US_en-US.pdf",
  },
];
