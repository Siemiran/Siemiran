export type SiemensS7300FMLifecycle =
  "active" | "phase-out" | "spare-part" | "discontinued";

export interface SiemensS7300FunctionModule {
  id: string;
  mlfb: string;

  brandId: "siemens";
  categoryId: "PLC";
  familyId: "S7-300";
  seriesId: "S7-300";

  productTypeId: "Function Module";
  variantId: string;

  title: string;
  description: string;

  lifecycle: SiemensS7300FMLifecycle;

  specifications: {
    function?: string;
    channels?: number;
    maximumFrequency?: string;
    encoderSupply?: string;
    digitalInputs?: number;
    analogInputs?: number;
    digitalOutputs?: number;
    inputVoltage?: string;
    outputCurrent?: string;
    interfaces?: string[];
    terminalConnection?: string;
    isochronousMode?: boolean;
    diagnostics?: string;
    supplyVoltage?: string;
  };

  source: string;
}

export const s7300FM: SiemensS7300FunctionModule[] = [
  // --------------------------------------------------
  // S7-300 — FM 350-1 — Counter Module
  // --------------------------------------------------

  {
    id: "siemens-s7-300-fm350-1-counter-1ah03-0ae0",
    mlfb: "6ES7350-1AH03-0AE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Function Module",
    variantId: "counter",

    title: "SIMATIC S7-300 FM 350-1 Counter Module",

    description:
      "SIMATIC S7-300 counter module FM 350-1 with one channel, counter functions up to 500 kHz, connection for 5 V and 24 V incremental encoders, isochronous mode and measuring range functions.",

    lifecycle: "spare-part",

    specifications: {
      function: "Counter",
      channels: 1,
      maximumFrequency: "500 kHz",
      encoderSupply: "5 V DC / 24 V DC",
      digitalInputs: 3,
      inputVoltage: "24 V DC",
      interfaces: ["Backplane bus"],
      terminalConnection: "1 x 40-pole",
      isochronousMode: true,
      diagnostics: "Diagnostics and status LEDs",
      supplyVoltage: "24 V DC",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/ww/Catalog/Product/?SiepCountryCode=WW&mlfb=6ES7350-1AH03-0AE0",
  },

  // --------------------------------------------------
  // S7-300 — FM 350-2 — Counter Module
  // --------------------------------------------------

  {
    id: "siemens-s7-300-fm350-2-counter-2ah00-0ae0",
    mlfb: "6ES7350-2AH00-0AE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Function Module",
    variantId: "counter",

    title: "SIMATIC S7-300 FM 350-2 Counter Module",

    description:
      "SIMATIC S7-300 counter module FM 350-2 with 8 channels, 20 kHz counting frequency and 24 V encoder inputs for counting, frequency measurement, speed measurement, period duration measurement and dosing.",

    lifecycle: "discontinued",

    specifications: {
      function:
        "Counting, frequency measurement, speed measurement, period duration measurement and dosing",
      channels: 8,
      maximumFrequency: "20 kHz",
      encoderSupply: "24 V DC",
      digitalInputs: 8,
      inputVoltage: "24 V DC",
      interfaces: ["Backplane bus"],
      terminalConnection: "1 x 40-pole",
      diagnostics: "Diagnostics and status LEDs",
      supplyVoltage: "24 V DC",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/uk/Catalog/Product/6ES7350-2AH00-0AE0",
  },

  {
    id: "siemens-s7-300-fm350-2-counter-2ah01-0ae0",
    mlfb: "6ES7350-2AH01-0AE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Function Module",
    variantId: "counter",

    title: "SIMATIC S7-300 FM 350-2 Counter Module",

    description:
      "SIMATIC S7-300 counter module FM 350-2 with 8 channels, 20 kHz counting frequency and 24 V encoder inputs for counting, frequency measurement, speed measurement, period duration measurement and dosing.",

    lifecycle: "spare-part",

    specifications: {
      function:
        "Counting, frequency measurement, speed measurement, period duration measurement and dosing",
      channels: 8,
      maximumFrequency: "20 kHz",
      encoderSupply: "24 V DC",
      digitalInputs: 8,
      inputVoltage: "24 V DC",
      interfaces: ["Backplane bus"],
      terminalConnection: "1 x 40-pole",
      diagnostics: "Diagnostics and status LEDs",
      supplyVoltage: "24 V DC",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product/6ES7350-2AH01-0AE0",
  },

  {
    id: "siemens-siplus-s7-300-fm350-2-counter-2ah01-4ae0",
    mlfb: "6AG1350-2AH01-4AE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Function Module",
    variantId: "counter",

    title: "SIPLUS S7-300 FM 350-2 Counter Module",

    description:
      "SIPLUS S7-300 FM 350-2 counter module based on 6ES7350-2AH01-0AE0, with conformal coating and extended environmental temperature range, 8 channels, 20 kHz and 24 V encoder inputs.",

    lifecycle: "spare-part",

    specifications: {
      function:
        "Counting, frequency measurement, speed measurement, period duration measurement and dosing",
      channels: 8,
      maximumFrequency: "20 kHz",
      encoderSupply: "24 V DC",
      digitalInputs: 8,
      inputVoltage: "24 V DC",
      interfaces: ["Backplane bus"],
      terminalConnection: "1 x 40-pole",
      diagnostics: "Diagnostics and status LEDs",
      supplyVoltage: "24 V DC",
    },

    source:
      "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6AG1350-2AH01-4AE0",
  },

  // --------------------------------------------------
  // S7-300 — FM 351 — Positioning Module
  // --------------------------------------------------

  {
    id: "siemens-s7-300-fm351-positioning-1ch01-0ae0",
    mlfb: "6ES7351-1AH01-0AE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Function Module",
    variantId: "positioning",

    title: "SIMATIC S7-300 FM 351 Positioning Module",

    description:
      "SIMATIC S7-300 FM 351 positioning module for positioning drives with incremental encoder feedback, supporting parameterizable positioning functions and diagnostic capabilities.",

    lifecycle: "discontinued",

    specifications: {
      function: "Positioning",
      channels: 1,
      encoderSupply: "24 V DC",
      digitalInputs: 8,
      digitalOutputs: 8,
      inputVoltage: "24 V DC",
      interfaces: ["Backplane bus"],
      terminalConnection: "1 x 40-pole",
      diagnostics: "Diagnostics and status LEDs",
      supplyVoltage: "24 V DC",
    },

    source:
      "https://cache.industry.siemens.com/dl/files/043/2103043/att_66101/v1/s7300_fm351_operating_instructions_en_en-US.pdf",
  },

  {
    id: "siemens-s7-300-fm351-positioning-1ch02-0ae0",
    mlfb: "6ES7351-1AH02-0AE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Function Module",
    variantId: "positioning",

    title: "SIMATIC S7-300 FM 351 Positioning Module",

    description:
      "SIMATIC S7-300 FM 351 positioning module for positioning drives with incremental encoder feedback, supporting parameterizable positioning functions and diagnostic capabilities.",

    lifecycle: "phase-out",

    specifications: {
      function: "Positioning",
      channels: 1,
      encoderSupply: "24 V DC",
      digitalInputs: 8,
      digitalOutputs: 8,
      inputVoltage: "24 V DC",
      interfaces: ["Backplane bus"],
      terminalConnection: "1 x 40-pole",
      diagnostics: "Diagnostics and status LEDs",
      supplyVoltage: "24 V DC",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/WW/Catalog/Product/6ES7351-1AH02-0AE0",
  },

  // --------------------------------------------------
  // S7-300 — FM 352 — Electronic Cam Controller
  // --------------------------------------------------

  {
    id: "siemens-s7-300-fm352-cam-controller-1ah02-0ae0",
    mlfb: "6ES7352-1AH02-0AE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Function Module",
    variantId: "cam-controller",

    title: "SIMATIC S7-300 FM 352 Electronic Cam Controller",

    description:
      "SIMATIC S7-300 FM 352 electronic cam controller for rotary and linear axes, supporting incremental and SSI absolute encoders, up to 128 position-based or time-based cams assigned to 32 cam tracks.",

    lifecycle: "phase-out",

    specifications: {
      function: "Electronic cam controller",
      channels: 1,
      encoderSupply: "24 V DC",
      digitalInputs: 4,
      digitalOutputs: 13,
      inputVoltage: "24 V DC",
      interfaces: ["Backplane bus", "SSI encoder interface"],
      terminalConnection: "1 x 40-pole",
      diagnostics: "Diagnostics and status LEDs",
      supplyVoltage: "24 V DC",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/2103044/s7300_fm352_operating_instructions_en_en-US.pdf",
  },

  // --------------------------------------------------
  // S7-300 — FM 353 — Positioning Module
  // --------------------------------------------------

  {
    id: "siemens-s7-300-fm353-positioning-1ah01-0ae0",
    mlfb: "6ES7353-1AH01-0AE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Function Module",
    variantId: "positioning",

    title: "SIMATIC S7-300 FM 353 Positioning Module",

    description:
      "SIMATIC S7-300 FM 353 positioning module for positioning drives with stepper motors, supporting parameterizable positioning functions, reference point approach and diagnostic functions.",

    lifecycle: "spare-part",

    specifications: {
      function: "Positioning",
      channels: 1,
      digitalInputs: 8,
      digitalOutputs: 8,
      inputVoltage: "24 V DC",
      interfaces: ["Backplane bus"],
      terminalConnection: "1 x 40-pole",
      diagnostics: "Diagnostics and status LEDs",
      supplyVoltage: "24 V DC",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/2103045/s7300_fm353_operating_instructions_en_en-US.pdf",
  },

  // --------------------------------------------------
  // S7-300 — FM 354 — Servo Drive Positioning Module
  // --------------------------------------------------

  {
    id: "siemens-s7-300-fm354-servo-positioning-1ah01-0ae0",
    mlfb: "6ES7354-1AH01-0AE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Function Module",
    variantId: "servo-positioning",

    title: "SIMATIC S7-300 FM 354 Servo Drive Positioning Module",

    description:
      "SIMATIC S7-300 FM 354 servo drive positioning module for positioning servo drives, with incremental and SSI absolute encoder interfaces, positioning functions and diagnostic capabilities.",

    lifecycle: "spare-part",

    specifications: {
      function: "Servo drive positioning",
      channels: 1,
      encoderSupply: "24 V DC",
      digitalInputs: 8,
      digitalOutputs: 8,
      inputVoltage: "24 V DC",
      interfaces: ["Backplane bus", "SSI encoder interface"],
      terminalConnection: "1 x 40-pole",
      diagnostics: "Diagnostics and status LEDs",
      supplyVoltage: "24 V DC",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/1109366/Fm354v2_e.pdf",
  },

  // --------------------------------------------------
  // S7-300 — FM 355 — Closed-Loop Control Module
  // --------------------------------------------------

  {
    id: "siemens-s7-300-fm355-c-control-0vh10-0ae0",
    mlfb: "6ES7355-0VH10-0AE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Function Module",
    variantId: "closed-loop-control",

    title: "SIMATIC S7-300 FM 355 C Control Module",

    description:
      "SIMATIC S7-300 FM 355 C closed-loop control module with four continuous-control channels, four analog inputs, eight digital inputs and four analog outputs.",

    lifecycle: "phase-out",

    specifications: {
      function: "Continuous-action closed-loop control",
      channels: 4,
      analogInputs: 4,
      digitalInputs: 8,
      digitalOutputs: 0,
      inputVoltage: "24 V DC",
      interfaces: ["Backplane bus"],
      terminalConnection: "1 x 40-pole",
      diagnostics: "Diagnostics and status LEDs",
      supplyVoltage: "24 V DC",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/1109579/s7300_fm355_operating_instructions_en_en-US.pdf",
  },

  {
    id: "siemens-s7-300-fm355-s-control-1vh10-0ae0",
    mlfb: "6ES7355-1VH10-0AE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Function Module",
    variantId: "closed-loop-control-step-pulse",

    title: "SIMATIC S7-300 FM 355 S Control Module",

    description:
      "SIMATIC S7-300 FM 355 S closed-loop control module with four step and pulse control channels, four analog inputs, eight digital inputs and eight digital outputs.",

    lifecycle: "phase-out",

    specifications: {
      function: "Step and pulse closed-loop control",
      channels: 4,
      analogInputs: 4,
      digitalInputs: 8,
      digitalOutputs: 8,
      inputVoltage: "24 V DC",
      outputCurrent: "400 mA per output group",
      interfaces: ["Backplane bus"],
      terminalConnection: "1 x 40-pole",
      diagnostics: "Diagnostics and status LEDs",
      supplyVoltage: "24 V DC",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/1109579/s7300_fm355_operating_instructions_en_en-US.pdf",
  },

  // --------------------------------------------------
  // S7-300 — FM 355-2 — Temperature Control Module
  // --------------------------------------------------

  {
    id: "siemens-s7-300-fm355-2-c-temperature-control-2ch00-0ae0",
    mlfb: "6ES7355-2CH00-0AE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Function Module",
    variantId: "temperature-control",

    title: "SIMATIC S7-300 FM 355-2 C Temperature Control Module",

    description:
      "SIMATIC S7-300 FM 355-2 C temperature control module with four continuous control channels, four analog inputs, eight digital inputs and four analog outputs.",

    lifecycle: "phase-out",

    specifications: {
      function: "Continuous temperature control",
      channels: 4,
      analogInputs: 4,
      digitalInputs: 8,
      digitalOutputs: 0,
      inputVoltage: "24 V DC",
      interfaces: ["Backplane bus"],
      terminalConnection: "1 x 40-pole",
      diagnostics: "Diagnostics and status LEDs",
      supplyVoltage: "24 V DC",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/interhydroilown/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7355-2CH00-0AE0",
  },

  {
    id: "siemens-s7-300-fm355-2-s-temperature-control-2sh00-0ae0",
    mlfb: "6ES7355-2SH00-0AE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Function Module",
    variantId: "temperature-control-step-pulse",

    title: "SIMATIC S7-300 FM 355-2 S Temperature Control Module",

    description:
      "SIMATIC S7-300 FM 355-2 S temperature control module with four step and pulse control channels, four analog inputs, eight digital inputs and eight digital outputs.",

    lifecycle: "phase-out",

    specifications: {
      function: "Step and pulse temperature control",
      channels: 4,
      analogInputs: 4,
      digitalInputs: 8,
      digitalOutputs: 8,
      inputVoltage: "24 V DC",
      outputCurrent: "400 mA per output group",
      interfaces: ["Backplane bus"],
      terminalConnection: "1 x 40-pole",
      diagnostics: "Diagnostics and status LEDs",
      supplyVoltage: "24 V DC",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/12069310/s7300_fm355_2_operating_instructions_en_en-US.pdf",
  },

  // --------------------------------------------------
  // S7-300 — FM 352-5 — High-Speed Boolean Processor
  // --------------------------------------------------

  {
    id: "siemens-s7-300-fm352-5-high-speed-boolean-5ah01-0ae0",
    mlfb: "6ES7352-5AH01-0AE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Function Module",
    variantId: "high-speed-boolean-processor",

    title: "SIMATIC S7-300 FM 352-5 High-Speed Boolean Processor",

    description:
      "SIMATIC S7-300 FM 352-5 high-speed Boolean processor for high-speed linking, with 12 digital inputs, 8 digital outputs and one encoder interface for RS422 incremental or SSI encoders.",

    lifecycle: "phase-out",

    specifications: {
      function: "High-speed Boolean processing",
      digitalInputs: 12,
      digitalOutputs: 8,
      encoderSupply: "24 V DC",
      interfaces: ["Backplane bus", "RS422 incremental encoder", "SSI encoder"],
      terminalConnection: "1 x 40-pole",
      diagnostics: "Diagnostics and status LEDs",
      supplyVoltage: "24 V DC",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/gb/Catalog/Product/6ES7352-5AH01-0AE0",
  },

  // --------------------------------------------------
  // S7-300 — FM 357-2 — Multi-Axis Module
  // --------------------------------------------------

  // --------------------------------------------------
  // S7-300 — CM 35 — Counter Module
  // --------------------------------------------------

  {
    id: "siemens-s7-300-cm35-counter-0aa01-0aa0",
    mlfb: "6AT1735-0AA01-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Function Module",
    variantId: "counter",

    title: "SIMATIC S7-300 CM 35 Counter Module",

    description:
      "SIMATIC CM 35 intelligent 8-channel counter module for universal counting, measurement and simple positioning tasks with up to four axes.",

    lifecycle: "discontinued",

    specifications: {
      function:
        "Counting, period duration measurement, time generation and simple positioning",
      channels: 8,
      maximumFrequency: "10 kHz counting",
      digitalInputs: 8,
      digitalOutputs: 8,
      inputVoltage: "5 V DC / 24 V DC",
      outputCurrent: "500 mA maximum per positioning output",
      interfaces: ["S7 bus"],
      terminalConnection: "1 x 25-pin Sub-D / 1 x 15-pin Sub-D",
      diagnostics: "Hardware interrupt and module diagnostics",
      supplyVoltage: "5 V DC via S7 bus",
    },

    source:
      "https://cache.industry.siemens.com/dl/files/297/1911297/att_59462/v1/HB_CM35_d.pdf",
  },

  // --------------------------------------------------
  // S7-300 — FM 352-5 — High-Speed Boolean Processor
  // Additional hardware revisions
  // --------------------------------------------------

  {
    id: "siemens-s7-300-fm352-5-high-speed-boolean-5ah00-0ae0",
    mlfb: "6ES7352-5AH00-0AE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Function Module",
    variantId: "high-speed-boolean-processor",

    title: "SIMATIC S7-300 FM 352-5 High-Speed Boolean Processor",

    description:
      "SIMATIC S7-300 FM 352-5 high-speed Boolean processor for high-speed logic processing with digital inputs and outputs.",

    lifecycle: "discontinued",

    specifications: {
      function: "High-speed Boolean processing",
      digitalInputs: 12,
      digitalOutputs: 8,
      encoderSupply: "24 V DC",
      interfaces: ["Backplane bus", "RS422 incremental encoder", "SSI encoder"],
      terminalConnection: "1 x 40-pole",
      diagnostics: "Diagnostics and status LEDs",
      supplyVoltage: "24 V DC",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/21536617/21536617_Compatibility_FM_with_PROFIBUS_InterfaceModules_en.pdf",
  },

  {
    id: "siemens-s7-300-fm352-5-high-speed-boolean-5ah10-0ae0",
    mlfb: "6ES7352-5AH10-0AE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Function Module",
    variantId: "high-speed-boolean-processor",

    title: "SIMATIC S7-300 FM 352-5 High-Speed Boolean Processor",

    description:
      "SIMATIC S7-300 FM 352-5 high-speed Boolean processor for high-speed logic processing with digital inputs and outputs.",

    lifecycle: "discontinued",

    specifications: {
      function: "High-speed Boolean processing",
      digitalInputs: 12,
      digitalOutputs: 8,
      encoderSupply: "24 V DC",
      interfaces: ["Backplane bus", "RS422 incremental encoder", "SSI encoder"],
      terminalConnection: "1 x 40-pole",
      diagnostics: "Diagnostics and status LEDs",
      supplyVoltage: "24 V DC",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/21536617/21536617_Compatibility_FM_with_PROFIBUS_InterfaceModules_en.pdf",
  },

  {
    id: "siemens-s7-300-fm352-5-high-speed-boolean-5ah11-0ae0",
    mlfb: "6ES7352-5AH11-0AE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Function Module",
    variantId: "high-speed-boolean-processor",

    title: "SIMATIC S7-300 FM 352-5 High-Speed Boolean Processor",

    description:
      "SIMATIC S7-300 FM 352-5 high-speed Boolean processor for high-speed logic processing with digital inputs and outputs.",

    lifecycle: "phase-out",

    specifications: {
      function: "High-speed Boolean processing",
      digitalInputs: 12,
      digitalOutputs: 8,
      encoderSupply: "24 V DC",
      interfaces: ["Backplane bus", "RS422 incremental encoder", "SSI encoder"],
      terminalConnection: "1 x 40-pole",
      diagnostics: "Diagnostics and status LEDs",
      supplyVoltage: "24 V DC",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/21536617/21536617_Compatibility_FM_with_PROFIBUS_InterfaceModules_en.pdf",
  },

  // --------------------------------------------------
  // S7-300 — FM 354 — Servo Drive Positioning Module
  // --------------------------------------------------

  {
    id: "siemens-s7-300-fm354-servo-positioning-1ah02-0ae0",
    mlfb: "6ES7354-1AH02-0AE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Function Module",
    variantId: "servo-positioning",

    title: "SIMATIC S7-300 FM 354 Servo Drive Positioning Module",

    description:
      "SIMATIC S7-300 FM 354 servo drive positioning module for positioning servo drives with incremental or SSI absolute encoder feedback.",

    lifecycle: "discontinued",

    specifications: {
      function: "Servo drive positioning",
      channels: 1,
      encoderSupply: "24 V DC",
      digitalInputs: 8,
      digitalOutputs: 8,
      inputVoltage: "24 V DC",
      interfaces: ["Backplane bus", "SSI encoder interface"],
      terminalConnection: "1 x 40-pole",
      diagnostics: "Diagnostics and status LEDs",
      supplyVoltage: "24 V DC",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/1109366/Fm354v2_e.pdf",
  },

  // --------------------------------------------------
  // S7-300 / M7-300 — FM 356-4 — Application Function Module
  // --------------------------------------------------

  {
    id: "siemens-m7-300-fm356-4-3bn00-0ae0",
    mlfb: "6ES7356-3BN00-0AE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Function Module",
    variantId: "application-function",

    title: "SIMATIC M7-300 FM 356-4",

    description:
      "SIMATIC FM 356-4 application function module for S7-300/M7-300 systems with 80486DX2-50 processor, 8 MB main memory, RS232 COM1 interface and AT-bus expansion capability.",

    lifecycle: "discontinued",

    specifications: {
      function: "Application function",
      interfaces: ["RS232", "AT bus", "Backplane bus"],
      supplyVoltage: "24 V DC",
      diagnostics: "Status and diagnostic LEDs",
    },

    source:
      "https://cache.industry.siemens.com/dl/files/369/1109369/att_21519/v1/Fm356_e.pdf",
  },

  {
    id: "siemens-m7-300-fm356-4-4bm00-0ae0",
    mlfb: "6ES7356-4BM00-0AE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Function Module",
    variantId: "application-function",

    title: "SIMATIC M7-300 FM 356-4",

    description:
      "SIMATIC FM 356-4 application function module for S7-300/M7-300 systems with 80486DX2-50 processor, 4 MB main memory, RS232 COM1 interface and AT-bus expansion capability.",

    lifecycle: "discontinued",

    specifications: {
      function: "Application function",
      interfaces: ["RS232", "AT bus", "Backplane bus"],
      supplyVoltage: "24 V DC",
      diagnostics: "Status and diagnostic LEDs",
    },

    source:
      "https://cache.industry.siemens.com/dl/files/369/1109369/att_21519/v1/Fm356_e.pdf",
  },

  // --------------------------------------------------
  // S7-300 — FM 357-2 — Multi-Axis Positioning Module
  // --------------------------------------------------

  {
    id: "siemens-s7-300-fm357-2-positioning-4ah01-0ae0",
    mlfb: "6ES7357-4AH01-0AE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Function Module",
    variantId: "multi-axis-positioning",

    title: "SIMATIC S7-300 FM 357-2 Multi-Axis Positioning Module",

    description:
      "SIMATIC S7-300 FM 357-2 function module with integrated M80486 CPU for positioning and path control of stepper and servo motors, supporting four measuring circuits.",

    lifecycle: "discontinued",

    specifications: {
      function: "Multi-axis positioning and path control",
      channels: 4,
      digitalInputs: 18,
      digitalOutputs: 8,
      encoderSupply: "5 V DC / 24 V DC",
      inputVoltage: "24 V DC",
      interfaces: ["Backplane bus", "Encoder interfaces"],
      diagnostics: "Diagnostics and status LEDs",
      supplyVoltage: "24 V DC",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/1803537/FM357-2_s.pdf",
  },

  // --------------------------------------------------
  // S7-300 — SM 338 — POS Input
  // --------------------------------------------------

  {
    id: "siemens-s7-300-sm338-pos-input-4bc01-0ab0",
    mlfb: "6ES7338-4BC01-0AB0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Function Module",
    variantId: "position-input",

    title: "SIMATIC S7-300 SM 338 POS Input",

    description:
      "SIMATIC S7-300 position input module for connecting up to three SSI absolute encoders, with two FREEZE inputs and support for isochronous mode.",

    lifecycle: "phase-out",

    specifications: {
      function: "Position input",
      channels: 3,
      encoderSupply: "24 V DC",
      digitalInputs: 2,
      inputVoltage: "24 V DC",
      interfaces: ["Backplane bus", "SSI encoder"],
      terminalConnection: "1 x 20-pole",
      isochronousMode: true,
      diagnostics: "Diagnostic alarm",
      supplyVoltage: "24 V DC",
    },

    source:
      "https://mall.industry.siemens.com/mall/rs/HR/Catalog/Product/?mlfb=6ES7338-4BC01-0AB0",
  },

  // --------------------------------------------------
  // S7-300 — SIWAREX U — Weighing Electronics
  // --------------------------------------------------

  {
    id: "siemens-s7-300-siwarex-u1-4950-1aa01",
    mlfb: "7MH4950-1AA01",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Function Module",
    variantId: "weighing-electronics",

    title: "SIMATIC S7-300 SIWAREX U1",

    description:
      "SIMATIC S7-300 and ET 200M SIWAREX U1 single-channel weighing module for one platform or hopper scale with analog load cells or strain gauges.",

    lifecycle: "phase-out",

    specifications: {
      function: "Weighing electronics",
      channels: 1,
      interfaces: ["RS232"],
      terminalConnection: "Load cell interface",
      diagnostics: "Module diagnostics",
      supplyVoltage: "24 V DC",
    },

    source:
      "https://mall.industry.siemens.com/mall/NO/NO/Catalog/Product/?mlfb=7MH4950-1AA01",
  },

  {
    id: "siemens-s7-300-siwarex-u2-4950-2aa01",
    mlfb: "7MH4950-2AA01",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Function Module",
    variantId: "weighing-electronics",

    title: "SIMATIC S7-300 SIWAREX U2",

    description:
      "SIMATIC S7-300 and ET 200M SIWAREX U2 two-channel weighing module for two platform or hopper scales with analog load cells or strain gauges.",

    lifecycle: "phase-out",

    specifications: {
      function: "Weighing electronics",
      channels: 2,
      interfaces: ["RS232"],
      terminalConnection: "2 x load cell interface",
      diagnostics: "Module diagnostics",
      supplyVoltage: "24 V DC",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/ua/Catalog/Product/7MH4950-2AA01",
  },

  // --------------------------------------------------
  // SIPLUS S7-300 — SIWAREX U
  // --------------------------------------------------

  {
    id: "siemens-siplus-s7-300-siwarex-u2-1950-2aa01-4aa0",
    mlfb: "6AG1950-2AA01-4AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Function Module",
    variantId: "weighing-electronics",

    title: "SIPLUS S7-300 SIWAREX U",

    description:
      "SIPLUS S7-300 SIWAREX U electronic weighing system based on 7MH4950-2AA01 with conformal coating and extended environmental temperature range.",

    lifecycle: "phase-out",

    specifications: {
      function: "Weighing electronics",
      channels: 2,
      interfaces: ["RS232"],
      terminalConnection: "2 x load cell interface",
      diagnostics: "Module diagnostics",
      supplyVoltage: "24 V DC",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/pt/Catalog/Product/6AG1950-2AA01-4AA0",
  },

  // --------------------------------------------------
  // S7-300 — SIWAREX FTA — Filling / Dosing Weighing Module
  // --------------------------------------------------

  // --------------------------------------------------
  // S7-300 — SIWAREX FTA — Weighing / Dosing Module
  // --------------------------------------------------

  {
    id: "siemens-s7-300-siwarex-fta-4900-2aa01",
    mlfb: "7MH4900-2AA01",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Function Module",
    variantId: "weighing-electronics",

    title: "SIMATIC S7-300 SIWAREX FTA",

    description:
      "SIMATIC SIWAREX FTA weighing and dosing module for high-speed and high-precision automatic weighing applications including filling, batching, loading and totalizing.",

    lifecycle: "spare-part",

    specifications: {
      function: "Weighing, filling, dosing, batching, loading and totalizing",
      channels: 1,
      interfaces: ["Backplane bus", "RS232"],
      terminalConnection: "1 x 40-pole",
      diagnostics: "Extensive diagnostic functions",
      supplyVoltage: "24 V DC",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/17970155/Manual_FTA_en_211.pdf",
  },

  // --------------------------------------------------
  // S7-300 — SIWAREX FTC — Weighing Electronics
  // --------------------------------------------------

  {
    id: "siemens-s7-300-siwarex-ftc-4900-3aa01",
    mlfb: "7MH4900-3AA01",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Function Module",
    variantId: "weighing-electronics",

    title: "SIMATIC S7-300 SIWAREX FTC",

    description:
      "SIMATIC S7-300 SIWAREX FTC weighing module for high-speed and high-precision weighing applications including conveyor scales, loss-in-weight scales, force measurement and bulk flow measurement.",

    lifecycle: "phase-out",

    specifications: {
      function:
        "Weighing, conveyor scale, loss-in-weight, force measurement and bulk flow measurement",
      channels: 1,
      interfaces: ["Backplane bus", "RS232"],
      terminalConnection: "1 x 40-pole",
      diagnostics: "Extensive monitoring and diagnostics functions",
      supplyVoltage: "24 V DC",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/29501218/Manual_FTC_B_en_69.pdf",
  },

  // --------------------------------------------------
  // S7-300 — SIWAREX A — Weighing Module
  // --------------------------------------------------

  {
    id: "siemens-s7-300-siwarex-a-4904-2aa01",
    mlfb: "7MH4904-2AA01",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Function Module",
    variantId: "weighing-electronics",

    title: "SIMATIC S7-300 SIWAREX A",

    description:
      "SIMATIC SIWAREX A weighing module for integration into SIMATIC S7-300 systems for weighing and force measurement applications with analog load cells.",

    lifecycle: "discontinued",

    specifications: {
      function: "Weighing and force measurement",
      channels: 1,
      interfaces: ["Backplane bus", "RS232"],
      terminalConnection: "Load cell interface",
      diagnostics: "Module diagnostics",
      supplyVoltage: "24 V DC",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/7787356/manual_a_en_04072001.pdf",
  },

  // --------------------------------------------------
  // S7-300 — SIWAREX CS — Weighing Electronics
  // --------------------------------------------------

  {
    id: "siemens-s7-300-siwarex-cs-4910-0aa01",
    mlfb: "7MH4910-0AA01",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Function Module",
    variantId: "weighing-electronics",

    title: "SIMATIC SIWAREX CS",

    description:
      "SIWAREX CS compact weighing module for SIMATIC S7-300 and ET 200M systems, with load-cell connection and integration into the automation system.",

    lifecycle: "spare-part",

    specifications: {
      function: "Weighing electronics",
      channels: 1,
      interfaces: ["Backplane bus", "RS232"],
      terminalConnection: "1 x 40-pole",
      diagnostics: "Module diagnostics",
      supplyVoltage: "24 V DC",
    },

    source:
      "https://mall.industry.siemens.com/mall/it/it/Catalog/Product/7MH4910-0AA01",
  },

  // --------------------------------------------------
  // SIPLUS S7-300 — FM 350-1 — Counter Module
  // --------------------------------------------------

  {
    id: "siemens-siplus-s7-300-fm350-1-counter-1ah03-2ae0",
    mlfb: "6AG1350-1AH03-2AE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Function Module",
    variantId: "counter",

    title: "SIPLUS S7-300 FM 350-1 Counter Module",

    description:
      "SIPLUS S7-300 FM 350-1 counter module based on 6ES7350-1AH03-0AE0, with conformal coating and extended environmental conditions.",

    lifecycle: "phase-out",

    specifications: {
      function: "Counting",
      channels: 1,
      maximumFrequency: "500 kHz",
      encoderSupply: "5 V DC / 24 V DC",
      interfaces: ["Backplane bus"],
      terminalConnection: "1 x 40-pole",
      diagnostics: "Diagnostics and status LEDs",
      supplyVoltage: "24 V DC",
    },

    source:
      "https://cache.industry.siemens.com/dl/files/167/109744167/att_1145924/v1/simatic-st70-complete-english-2023.pdf",
  },

  // --------------------------------------------------
  // S7-300 — FM 357-2 — Multi-Axis Positioning Module
  // Additional hardware revision
  // --------------------------------------------------

  {
    id: "siemens-s7-300-fm357-2-positioning-4ah03-0ae0",
    mlfb: "6ES7357-4AH03-0AE0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",

    productTypeId: "Function Module",
    variantId: "multi-axis-positioning",

    title: "SIMATIC S7-300 FM 357-2 Multi-Axis Positioning Module",

    description:
      "SIMATIC S7-300 FM 357-2 function module for multi-axis positioning and path control of servo and stepper drives.",

    lifecycle: "discontinued",

    specifications: {
      function: "Multi-axis positioning and path control",
      channels: 4,
      encoderSupply: "5 V DC / 24 V DC",
      interfaces: ["Backplane bus", "Encoder interfaces"],
      terminalConnection: "1 x 40-pole",
      diagnostics: "Diagnostics and status LEDs",
      supplyVoltage: "24 V DC",
    },

    source:
      "https://support.industry.siemens.com/cs/attachments/1111778/fm357_e.pdf",
  },
];
