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

    analogInputs?: number;
    analogOutputs?: number;

    inputVoltage?: string;
    outputVoltage?: string;

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

  // --------------------------------------------------
  // S7-300 — SM 331 — Analog Input
  // Siemens catalog order:
  // universal analog input → voltage/current → RTD/thermocouple
  // → Ex → HART
  // --------------------------------------------------

  {
    id: "siemens-s7-300-sm331-ai2-9-12-14bit-7kb02-0ab0",
    mlfb: "6ES7331-7KB02-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "analog-input",

    title: "SIMATIC S7-300 SM 331 2 AI Universal",

    description:
      "SIMATIC S7-300 analog input SM 331, isolated, 2 analog inputs, 9/12/14 bit resolution, voltage, current, thermocouple and resistance measurement, diagnostics and alarm capability, 1 x 20-pole.",

    lifecycle: "spare-part",

    specifications: {
      analogInputs: 2,
      inputVoltage: "24 V DC",
      resolution: "9/12/14 bit",
      signalRanges: [
        "Voltage",
        "Current",
        "Thermocouple",
        "Resistance thermometer",
        "Resistance",
      ],
      measurementType: [
        "Voltage",
        "Current",
        "Thermocouple",
        "Resistance thermometer",
        "Resistance",
      ],
      interfaces: ["Backplane bus"],
      terminalConnection: "1 x 20-pole",
      diagnostics: "Diagnostics",
      interrupts: "Alarm",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product/6ES7331-7KB02-0AB0",
  },

  {
    id: "siemens-s7-300-sm331-ai8-13bit-1kf01-0ab0",
    mlfb: "6ES7331-1KF01-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "analog-input",

    title: "SIMATIC S7-300 SM 331 8 AI 13 Bit",

    description:
      "SIMATIC S7-300 analog input SM 331, optically isolated, 8 analog inputs, 13 bit resolution, voltage, current, resistance and Pt100/Ni100/Ni1000/LG-Ni1000 measurement, 66 ms module update, 1 x 40-pole.",

    lifecycle: "discontinued",

    specifications: {
      analogInputs: 8,
      inputVoltage: "24 V DC",
      resolution: "13 bit",
      signalRanges: [
        "Voltage",
        "Current",
        "Resistance thermometer",
        "Resistance",
        "Pt100",
        "Ni100",
        "Ni1000",
        "LG-Ni1000",
      ],
      measurementType: [
        "Voltage",
        "Current",
        "Resistance thermometer",
        "Resistance",
      ],
      interfaces: ["Backplane bus"],
      terminalConnection: "1 x 40-pole",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/au/Catalog/Product/6ES7331-1KF01-0AB0",
  },

  {
    id: "siemens-s7-300-sm331-ai8-13bit-universal-1kf02-0ab0",
    mlfb: "6ES7331-1KF02-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "analog-input",

    title: "SIMATIC S7-300 SM 331 8 AI Universal 13 Bit",

    description:
      "SIMATIC S7-300 analog input SM 331, isolated, 8 analog inputs, 13 bit resolution, voltage, current, resistance, Pt100, Ni100, Ni1000, LG-Ni1000, PTC and KTY measurement, 66 ms conversion time, 1 x 40-pole.",

    lifecycle: "phase-out",

    specifications: {
      analogInputs: 8,
      inputVoltage: "24 V DC",
      resolution: "13 bit",
      signalRanges: [
        "Voltage",
        "Current",
        "Resistance thermometer",
        "Resistance",
        "Pt100",
        "Ni100",
        "Ni1000",
        "LG-Ni1000",
        "PTC",
        "KTY",
      ],
      measurementType: [
        "Voltage",
        "Current",
        "Resistance thermometer",
        "Resistance",
      ],
      interfaces: ["Backplane bus"],
      terminalConnection: "1 x 40-pole",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/EN/Catalog/Product/6ES7331-1KF02-0AB0",
  },

  {
    id: "siemens-s7-300-sm331-ai8-9-12-14bit-7kf02-0ab0",
    mlfb: "6ES7331-7KF02-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "analog-input",

    title: "SIMATIC S7-300 SM 331 8 AI Universal 9/12/14 Bit",

    description:
      "SIMATIC S7-300 analog input SM 331, isolated, 8 analog inputs, 9/12/14 bit resolution, voltage, current, thermocouple and resistance measurement, diagnostics and alarm capability, 1 x 20-pole, removable and insertable with active backplane bus.",

    lifecycle: "spare-part",

    specifications: {
      analogInputs: 8,
      inputVoltage: "24 V DC",
      resolution: "9/12/14 bit",
      signalRanges: [
        "Voltage",
        "Current",
        "Thermocouple",
        "Resistance thermometer",
        "Resistance",
      ],
      measurementType: [
        "Voltage",
        "Current",
        "Thermocouple",
        "Resistance thermometer",
        "Resistance",
      ],
      interfaces: ["Backplane bus"],
      terminalConnection: "1 x 20-pole",
      diagnostics: "Diagnostics",
      interrupts: "Alarm",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product/6ES7331-7KF02-0AB0",
  },

  {
    id: "siemens-s7-300-sm331-ai8-14bit-isochronous-7hf01-0ab0",
    mlfb: "6ES7331-7HF01-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "analog-input",

    title: "SIMATIC S7-300 SM 331 8 AI 14 Bit Isochronous",

    description:
      "SIMATIC S7-300 analog input SM 331, isolated, 8 analog inputs, 14 bit resolution, voltage and current measurement, diagnostics and interrupts, suitable for isochronous mode with improved DP cycle time.",

    lifecycle: "spare-part",

    specifications: {
      analogInputs: 8,
      inputVoltage: "24 V DC",
      resolution: "14 bit",
      signalRanges: ["Voltage", "Current"],
      measurementType: ["Voltage", "Current"],
      interfaces: ["Backplane bus"],
      terminalConnection: "1 x 20-pole",
      diagnostics: "Diagnostics",
      interrupts: "Hardware/process interrupt",
      isochronousMode: true,
    },

    source:
      "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7331-7HF01-0AB0",
  },

  {
    id: "siemens-s7-300-sm331-ai8-16bit-voltage-current-7nf00-0ab0",
    mlfb: "6ES7331-7NF00-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "analog-input",

    title: "SIMATIC S7-300 SM 331 8 AI Voltage / Current 16 Bit",

    description:
      "SIMATIC S7-300 analog input SM 331, isolated, 8 analog inputs, voltage and current ranges including ±5/10 V, 1-5 V, ±20 mA and 0/4-20 mA, 16 bit resolution, 55 ms conversion time, single-point grounding, 1 x 40-pole.",

    lifecycle: "spare-part",

    specifications: {
      analogInputs: 8,
      inputVoltage: "24 V DC",
      resolution: "16 bit",
      signalRanges: ["±5 V", "±10 V", "1-5 V", "±20 mA", "0/4-20 mA"],
      measurementType: ["Voltage", "Current"],
      interfaces: ["Backplane bus"],
      terminalConnection: "1 x 40-pole",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7331-7NF00-0AB0",
  },

  {
    id: "siemens-s7-300-sm331-ai8-16bit-voltage-current-fast-7nf10-0ab0",
    mlfb: "6ES7331-7NF10-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "analog-input",

    title: "SIMATIC S7-300 SM 331 8 AI Fast 16 Bit",

    description:
      "SIMATIC S7-300 analog input SM 331, isolated, 8 analog inputs, ±5/10 V, 1-5 V, ±20 mA and 0/4-20 mA, 16 bit resolution, single-point grounding, 4-channel operation 10 ms and 8-channel operation 23-95 ms, 1 x 40-pole.",

    lifecycle: "spare-part",

    specifications: {
      analogInputs: 8,
      inputVoltage: "24 V DC",
      resolution: "16 bit",
      signalRanges: ["±5 V", "±10 V", "1-5 V", "±20 mA", "0/4-20 mA"],
      measurementType: ["Voltage", "Current"],
      interfaces: ["Backplane bus"],
      terminalConnection: "1 x 40-pole",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7331-7NF10-0AB0",
  },

  {
    id: "siemens-s7-300-sm331-ai8-rtd-7pf01-0ab0",
    mlfb: "6ES7331-7PF01-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "analog-input",

    title: "SIMATIC S7-300 SM 331 8 AI Resistance / RTD",

    description:
      "SIMATIC S7-300 analog input SM 331, isolated, 8 analog inputs for 2/3/4-wire resistance and resistance-temperature measurement including Pt100/200/1000, Ni100/120/200/500/1000, LG-Ni1000 and Cu10, characteristic curves according to GOST, 50 ms conversion time, 1 x 40-pole.",

    lifecycle: "spare-part",

    specifications: {
      analogInputs: 8,
      inputVoltage: "24 V DC",
      resolution: "16 bit internal 24 bit",
      signalRanges: [
        "Pt100",
        "Pt200",
        "Pt1000",
        "Ni100",
        "Ni120",
        "Ni200",
        "Ni500",
        "Ni1000",
        "LG-Ni1000",
        "Cu10",
        "Resistance",
      ],
      measurementType: ["Resistance thermometer", "Resistance"],
      interfaces: ["Backplane bus"],
      terminalConnection: "1 x 40-pole",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/in/Catalog/Product/6ES7331-7PF01-0AB0",
  },

  {
    id: "siemens-s7-300-sm331-ai6-thermocouple-16bit-7pe10-0ab0",
    mlfb: "6ES7331-7PE10-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "analog-input",

    title: "SIMATIC S7-300 SM 331 6 AI Thermocouple 16 Bit",

    description:
      "SIMATIC S7-300 analog input SM 331, isolated, 6 thermocouple inputs, 16 bit resolution, thermocouple types B, E, J, K, L, N, R, S and T, voltage ranges from ±25 mV to ±1 V, 50 ms conversion time, 1 x 40-pole.",

    lifecycle: "active",

    specifications: {
      analogInputs: 6,
      inputVoltage: "24 V DC",
      resolution: "16 bit",
      signalRanges: [
        "Thermocouple B",
        "Thermocouple E",
        "Thermocouple J",
        "Thermocouple K",
        "Thermocouple L",
        "Thermocouple N",
        "Thermocouple R",
        "Thermocouple S",
        "Thermocouple T",
        "±25 mV to ±1 V",
      ],
      measurementType: ["Thermocouple"],
      interfaces: ["Backplane bus"],
      terminalConnection: "1 x 40-pole",
    },

    source:
      "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7331-7PE10-0AB0",
  },

  {
    id: "siemens-s7-300-sm331-ai8-thermocouple-7pf11-0ab0",
    mlfb: "6ES7331-7PF11-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "analog-input",

    title: "SIMATIC S7-300 SM 331 8 AI Thermocouple 16 Bit",

    description:
      "SIMATIC S7-300 analog input SM 331, isolated, 8 thermocouple analog inputs, types B, E, J, K, L, N, R, S and T, plus TXK/TXK(L) according to GOST, 16 bit resolution, 50 ms conversion time, 1 x 40-pole.",

    lifecycle: "spare-part",

    specifications: {
      analogInputs: 8,
      inputVoltage: "24 V DC",
      resolution: "16 bit",
      signalRanges: [
        "Thermocouple B",
        "Thermocouple E",
        "Thermocouple J",
        "Thermocouple K",
        "Thermocouple L",
        "Thermocouple N",
        "Thermocouple R",
        "Thermocouple S",
        "Thermocouple T",
        "TXK/TXK(L) GOST",
      ],
      measurementType: ["Thermocouple"],
      interfaces: ["Backplane bus"],
      terminalConnection: "1 x 40-pole",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product/6ES7331-7PF11-0AB0",
  },

  {
    id: "siemens-s7-300-sm331-ai4-0-4-20ma-ex-7rd00-0ab0",
    mlfb: "6ES7331-7RD00-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "analog-input",

    title: "SIMATIC S7-300 SM 331 4 AI 0/4-20 mA Ex",

    description:
      "SIMATIC S7-300 analog input SM 331, isolated, 4 analog inputs, 0/4-20 mA, for signals from hazardous areas, diagnostics-capable and PTB tested, 1 x 20-pole.",

    lifecycle: "spare-part",

    specifications: {
      analogInputs: 4,
      inputVoltage: "24 V DC",
      resolution: "Not specified in catalog description",
      signalRanges: ["0-20 mA", "4-20 mA"],
      measurementType: ["Current"],
      interfaces: ["Backplane bus"],
      terminalConnection: "1 x 20-pole",
      diagnostics: "Diagnostics-capable",
      hazardousArea: true,
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7331-7RD00-0AB0",
  },

  {
    id: "siemens-s7-300-sm331-ai8-tc-ai4-pt100-ex-7sf00-0ab0",
    mlfb: "6ES7331-7SF00-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "analog-input",

    title: "SIMATIC S7-300 SM 331 8 AI Thermocouple / 4 AI Pt100 Ex",

    description:
      "SIMATIC S7-300 analog input SM 331, isolated, 8 thermocouple inputs or 4 Pt100 inputs, for signals from hazardous areas, diagnostics-capable and PTB tested, 1 x 20-pole.",

    lifecycle: "spare-part",

    specifications: {
      analogInputs: 8,
      inputVoltage: "24 V DC",
      signalRanges: ["Thermocouple", "Pt100"],
      measurementType: ["Thermocouple", "Resistance thermometer"],
      interfaces: ["Backplane bus"],
      terminalConnection: "1 x 20-pole",
      diagnostics: "Diagnostics-capable",
      hazardousArea: true,
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product/6ES7331-7SF00-0AB0",
  },

  {
    id: "siemens-s7-300-sm331-ai2-hart-7tb00-0ab0",
    mlfb: "6ES7331-7TB00-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "analog-input",

    title: "SIMATIC S7-300 SM 331 2 AI HART",

    description:
      "SIMATIC S7-300 HART analog input SM 331 with 2 analog inputs for 0/4-20 mA HART signal processing and HART communication.",

    lifecycle: "phase-out",

    specifications: {
      analogInputs: 2,
      inputVoltage: "24 V DC",
      signalRanges: ["0-20 mA", "4-20 mA HART"],
      measurementType: ["Current", "HART"],
      interfaces: ["Backplane bus"],
      terminalConnection: "1 x 40-pole",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/8859629/s7300_module_data_manual_en-US_en-US.pdf",
  },

  {
    id: "siemens-s7-300-sm331-ai8-hart-7tf01-0ab0",
    mlfb: "6ES7331-7TF01-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "analog-input",

    title: "SIMATIC S7-300 SM 331 8 AI HART",

    description:
      "SIMATIC DP HART analog input SM 331 with 8 analog inputs for 0/4-20 mA HART, for ET 200M with IM153-2, firmware update, HART auxiliary variables, redundancy and local diagnostic buffer with time stamping, 1 x 20-pole.",

    lifecycle: "spare-part",

    specifications: {
      analogInputs: 8,
      inputVoltage: "24 V DC",
      signalRanges: ["0-20 mA", "4-20 mA HART"],
      measurementType: ["Current", "HART"],
      interfaces: ["Backplane bus"],
      terminalConnection: "1 x 20-pole",
      diagnostics: "Local diagnostic buffer with time stamping",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product/6ES7331-7TF01-0AB0",
  },

  // --------------------------------------------------
  // S7-300 — SM 332 — Analog Output
  // Siemens catalog order:
  // standard U/I → high-density → 16-bit isochronous
  // → Ex → HART → SIPLUS
  // --------------------------------------------------

  {
    id: "siemens-s7-300-sm332-ao2-ui-11-12bit-5hb01-0ab0",
    mlfb: "6ES7332-5HB01-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "analog-output",

    title: "SIMATIC S7-300 SM 332 2 AO U/I 11/12 Bit",

    description:
      "SIMATIC S7-300 analog output SM 332, isolated, 2 analog outputs for voltage and current, 11/12 bit resolution, removable and insertable with active backplane bus, 20-pole.",

    lifecycle: "spare-part",

    specifications: {
      analogOutputs: 2,
      outputVoltage: "24 V DC",
      resolution: "11/12 bit",
      signalRanges: [
        "0-10 V",
        "1-5 V",
        "-10 V to +10 V",
        "0-20 mA",
        "-20 mA to +20 mA",
        "4-20 mA",
      ],
      measurementType: ["Voltage", "Current"],
      interfaces: ["Backplane bus"],
      terminalConnection: "1 x 20-pole",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/pe/Catalog/Product/6ES7332-5HB01-0AB0",
  },

  {
    id: "siemens-s7-300-sm332-ao4-ui-diagnostics-5hd01-0ab0",
    mlfb: "6ES7332-5HD01-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "analog-output",

    title: "SIMATIC S7-300 SM 332 4 AO U/I 11/12 Bit",

    description:
      "SIMATIC S7-300 analog output SM 332, isolated, 4 analog outputs for voltage and current, diagnostics, 11/12 bit resolution, removable and insertable with active backplane bus, 20-pole.",

    lifecycle: "spare-part",

    specifications: {
      analogOutputs: 4,
      outputVoltage: "24 V DC",
      resolution: "11/12 bit",
      signalRanges: [
        "0-10 V",
        "1-5 V",
        "-10 V to +10 V",
        "0-20 mA",
        "-20 mA to +20 mA",
        "4-20 mA",
      ],
      measurementType: ["Voltage", "Current"],
      interfaces: ["Backplane bus"],
      terminalConnection: "1 x 20-pole",
      diagnostics: "Diagnostics",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/fescomelsaownuy/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7332-5HD01-0AB0",
  },

  {
    id: "siemens-s7-300-sm332-ao8-ui-diagnostics-5hf00-0ab0",
    mlfb: "6ES7332-5HF00-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "analog-output",

    title: "SIMATIC S7-300 SM 332 8 AO U/I 11/12 Bit",

    description:
      "SIMATIC S7-300 analog output SM 332, isolated, 8 analog outputs for voltage and current, diagnostics, 11/12 bit resolution, removable and insertable with active backplane bus, 40-pole.",

    lifecycle: "spare-part",

    specifications: {
      analogOutputs: 8,
      outputVoltage: "24 V DC",
      resolution: "11/12 bit",
      signalRanges: [
        "0-10 V",
        "1-5 V",
        "-10 V to +10 V",
        "0-20 mA",
        "-20 mA to +20 mA",
        "4-20 mA",
      ],
      measurementType: ["Voltage", "Current"],
      interfaces: ["Backplane bus"],
      terminalConnection: "1 x 40-pole",
      diagnostics: "Diagnostics",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/en/Catalog/Product/6ES7332-5HF00-0AB0",
  },

  {
    id: "siemens-s7-300-sm332-ao4-channel-isolated-16bit-7nd02-0ab0",
    mlfb: "6ES7332-7ND02-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "analog-output",

    title: "SIMATIC S7-300 SM 332 4 AO 16 Bit Channel-Isolated",

    description:
      "SIMATIC S7-300 analog output SM 332, channel-to-channel isolated, 4 analog outputs, 16 bit resolution, voltage and current ranges, suitable for isochronous mode with improved DP cycle times, 20-pole.",

    lifecycle: "spare-part",

    specifications: {
      analogOutputs: 4,
      outputVoltage: "24 V DC",
      resolution: "16 bit",
      signalRanges: [
        "0-10 V",
        "1-5 V",
        "-10 V to +10 V",
        "0-20 mA",
        "-20 mA to +20 mA",
        "4-20 mA",
      ],
      measurementType: ["Voltage", "Current"],
      interfaces: ["Backplane bus"],
      terminalConnection: "1 x 20-pole",
      isochronousMode: true,
    },

    source:
      "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7332-7ND02-0AB0",
  },

  {
    id: "siemens-s7-300-sm332-ao4-0-4-20ma-ex-5rd00-0ab0",
    mlfb: "6ES7332-5RD00-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "analog-output",

    title: "SIMATIC S7-300 SM 332 4 AO 0/4-20 mA Ex",

    description:
      "SIMATIC S7-300 analog output SM 332, isolated, 4 analog current outputs, 0/4-20 mA, for signals from hazardous areas, diagnostics-capable and PTB tested, 20-pole.",

    lifecycle: "spare-part",

    specifications: {
      analogOutputs: 4,
      outputVoltage: "24 V DC",
      resolution: "15 bit",
      signalRanges: ["0-20 mA", "4-20 mA"],
      measurementType: ["Current"],
      interfaces: ["Backplane bus"],
      terminalConnection: "1 x 20-pole",
      diagnostics: "Diagnostics-capable",
      hazardousArea: true,
    },

    source:
      "https://mall.industry.siemens.com/mall/en/conateluyown/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7332-5RD00-0AB0",
  },

  {
    id: "siemens-s7-300-sm332-ao2-hart-5tb00-0ab0",
    mlfb: "6ES7332-5TB00-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "analog-output",

    title: "SIMATIC S7-300 SM 332 2 AO 0/4-20 mA HART",

    description:
      "SIMATIC S7-300 HART analog output SM 332 with 2 analog outputs for 0/4-20 mA HART, for ET 200M with IM 153-2.",

    lifecycle: "phase-out",

    specifications: {
      analogOutputs: 2,
      outputVoltage: "24 V DC",
      signalRanges: ["0-20 mA HART", "4-20 mA HART"],
      measurementType: ["Current", "HART"],
      interfaces: ["Backplane bus"],
      terminalConnection: "1 x 20-pole",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/8859629/s7300_module_data_manual_en-US_en-US.pdf",
  },

  {
    id: "siemens-s7-300-sm332-ao8-hart-8tf01-0ab0",
    mlfb: "6ES7332-8TF01-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "analog-output",

    title: "SIMATIC S7-300 SM 332 8 AO 0/4-20 mA HART",

    description:
      "SIMATIC DP HART analog output SM 332 with 8 analog outputs, 0/4-20 mA HART, for ET 200M with IM 153-2, firmware update, HART auxiliary variables, redundancy and local diagnostic buffer with time stamping, 20-pole.",

    lifecycle: "phase-out",

    specifications: {
      analogOutputs: 8,
      outputVoltage: "24 V DC",
      signalRanges: ["0-20 mA HART", "4-20 mA HART"],
      measurementType: ["Current", "HART"],
      interfaces: ["Backplane bus"],
      terminalConnection: "1 x 20-pole",
      diagnostics: "Local diagnostic buffer with time stamping",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/in/Catalog/Product/6ES7332-8TF01-0AB0",
  },

  {
    id: "siemens-siplus-s7-300-sm332-ao2-ui-5hb01-2ab0",
    mlfb: "6AG1332-5HB01-2AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "analog-output",

    title: "SIPLUS S7-300 SM 332 2 AO U/I",

    description:
      "SIPLUS S7-300 SM 332 analog output module with 2 isolated analog outputs for voltage and current, based on 6ES7332-5HB01-0AB0, with conformal coating and extended environmental temperature range.",

    lifecycle: "spare-part",

    specifications: {
      analogOutputs: 2,
      outputVoltage: "24 V DC",
      resolution: "11/12 bit",
      signalRanges: [
        "0-10 V",
        "1-5 V",
        "-10 V to +10 V",
        "0-20 mA",
        "-20 mA to +20 mA",
        "4-20 mA",
      ],
      measurementType: ["Voltage", "Current"],
      interfaces: ["Backplane bus"],
      terminalConnection: "1 x 20-pole",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1332-5HB01-2AB0",
  },

  {
    id: "siemens-siplus-s7-300-sm332-ao8-ui-5hf00-2ab0",
    mlfb: "6AG1332-5HF00-2AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Signal Module",
    variantId: "analog-output",

    title: "SIPLUS S7-300 SM 332 8 AO U/I",

    description:
      "SIPLUS S7-300 SM 332 analog output module with 8 isolated analog outputs for voltage and current, based on 6ES7332-5HF00-0AB0, with conformal coating and extended environmental temperature range.",

    lifecycle: "spare-part",

    specifications: {
      analogOutputs: 8,
      outputVoltage: "24 V DC",
      resolution: "11/12 bit",
      signalRanges: [
        "0-10 V",
        "1-5 V",
        "-10 V to +10 V",
        "0-20 mA",
        "-20 mA to +20 mA",
        "4-20 mA",
      ],
      measurementType: ["Voltage", "Current"],
      interfaces: ["Backplane bus"],
      terminalConnection: "1 x 40-pole",
      diagnostics: "Diagnostics",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1332-5HF00-2AB0",
  },
];
