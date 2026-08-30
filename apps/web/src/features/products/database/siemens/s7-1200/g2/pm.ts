export type SiemensS71200G2PowerModuleLifecycle =
  | "active"
  | "phase-out"
  | "spare-part"
  | "discontinued";

export interface SiemensS71200G2PowerModule {
  id: string;
  mlfb: string;
  baseMlfb?: string;

  brandId: "siemens";
  categoryId: "PLC";
  familyId: "S7-1200";
  seriesId: "S7-1200 G2";
  productTypeId: "Power Module";
  variantId: "pm-1207" | "pm-1207-ex";

  title: string;
  description: string;
  lifecycle: SiemensS71200G2PowerModuleLifecycle;

  specifications: {
    model: string;
    inputVoltage: string;
    outputVoltage: string;
    outputCurrent: string;
    ratedPower?: string;
    design?: string;
    diagnostics?: string;
    mounting?: string;
    certification?: string;
    operatingTemperature?: string;
    specialFeatures?: string[];
  };

  source: string;
}

export const siemensS71200G2PowerModules: SiemensS71200G2PowerModule[] = [
  {
    id: "siemens-s7-1200-g2-pm1207-4sb00-3ax0",
    mlfb: "6EP3333-4SB00-3AX0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200 G2",
    productTypeId: "Power Module",
    variantId: "pm-1207",

    title: "SIMATIC S7-1200 Power Module PM 1207",
    description:
      "SIMATIC S7-1200 G2 Power Module PM 1207 stabilized power supply with 120-240 V AC/DC input, 24 V DC/5 A output, and diagnostic interface.",
    lifecycle: "active",

    specifications: {
      model: "PM 1207",
      inputVoltage: "120-240 V AC/DC",
      outputVoltage: "24 V DC",
      outputCurrent: "5 A",
      design: "Matches the SIMATIC S7-1200 G2 form and color",
      diagnostics: "Diagnostic interface",
      mounting: "External S7-1200 G2 power module",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/interhydroilown/Catalog/Product?SiepCountryCode=OE&mlfb=6EP3333-4SB00-3AX0",
  },
  {
    id: "siemens-s7-1200-g2-pm1207-ex-4sc00-3ax0",
    mlfb: "6EP3333-4SC00-3AX0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-1200",
    seriesId: "S7-1200 G2",
    productTypeId: "Power Module",
    variantId: "pm-1207-ex",

    title: "SIMATIC S7-1200 Power Module PM 1207 EX",
    description:
      "SIMATIC S7-1200 G2 Power Module PM 1207 EX stabilized power supply with 120-240 V AC/DC input, 24 V DC/5 A output, diagnostic interface, and EX certification.",
    lifecycle: "active",

    specifications: {
      model: "PM 1207",
      inputVoltage: "120-240 V AC/DC",
      outputVoltage: "24 V DC",
      outputCurrent: "5 A",
      design: "Matches the SIMATIC S7-1200 G2 form and color",
      diagnostics: "Diagnostic interface",
      mounting: "External S7-1200 G2 power module",
      certification: "EX certified",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/interhydroilown/Catalog/Product?SiepCountryCode=OE&mlfb=6EP3333-4SC00-3AX0",
  },
];
