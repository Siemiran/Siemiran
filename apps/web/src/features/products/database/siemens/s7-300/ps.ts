export type SiemensS7300PowerSupplyLifecycle =
  | "active"
  | "phase-out"
  | "spare-part"
  | "discontinued";

export interface SiemensS7300PowerSupply {
  id: string;
  mlfb: string;
  baseMlfb?: string;
  successorMlfb?: string;

  brandId: "siemens";
  categoryId: "PLC";
  familyId: "S7-300";
  seriesId: "S7-300";
  productTypeId: "Power Supply";
  variantId: "ps-305" | "ps-307" | "ps-307-outdoor";

  title: string;
  description: string;
  lifecycle: SiemensS7300PowerSupplyLifecycle;

  specifications: {
    model: string;
    inputVoltage: string;
    outputVoltage: string;
    outputCurrent: string;
    ratedPower?: string;
    design?: string;
    mounting?: string;
    operatingTemperature?: string;
    specialFeatures?: string[];
  };

  source: string;
}

export const siemensS7300PowerSupplies: SiemensS7300PowerSupply[] = [
  {
    id: "siemens-s7-300-ps307-1ba01-0aa0",
    mlfb: "6ES7307-1BA01-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "Power Supply",
    variantId: "ps-307",

    title: "SIMATIC S7-300 Regulated power supply PS307",
    description:
      "SIMATIC S7-300 regulated power supply PS307 with 120/230 V AC input and 24 V DC/2 A output.",
    lifecycle: "phase-out",

    specifications: {
      model: "PS 307",
      inputVoltage: "120/230 V AC",
      outputVoltage: "24 V DC",
      outputCurrent: "2 A",
      design: "SIMATIC S7-300 design",
      mounting: "S7-300 mounting rail",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/interhydroilown/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7307-1BA01-0AA0",
  },
  {
    id: "siemens-s7-300-ps305-1ba80-0aa0",
    mlfb: "6ES7305-1BA80-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "Power Supply",
    variantId: "ps-305",

    title: "SIMATIC S7-300 Regulated power supply PS305",
    description:
      "SIMATIC S7-300 regulated power supply PS305 with 24-110 V DC input and 24 V DC/2 A output.",
    lifecycle: "phase-out",

    specifications: {
      model: "PS 305",
      inputVoltage: "24-110 V DC",
      outputVoltage: "24 V DC",
      outputCurrent: "2 A",
      design: "SIMATIC S7-300 design",
      mounting: "S7-300 mounting rail",
      specialFeatures: ["Wide-range DC input"],
    },

    source:
      "https://mall.industry.siemens.com/mall/en/interhydroilown/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7305-1BA80-0AA0",
  },
  {
    id: "siemens-s7-300-ps307-1ea01-0aa0",
    mlfb: "6ES7307-1EA01-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "Power Supply",
    variantId: "ps-307",

    title: "SIMATIC S7-300 Regulated power supply PS307",
    description:
      "SIMATIC S7-300 regulated power supply PS307 with 120/230 V AC input and 24 V DC/5 A output.",
    lifecycle: "phase-out",

    specifications: {
      model: "PS 307",
      inputVoltage: "120/230 V AC",
      outputVoltage: "24 V DC",
      outputCurrent: "5 A",
      design: "SIMATIC S7-300 design",
      mounting: "S7-300 mounting rail",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/interhydroilown/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7307-1EA01-0AA0",
  },
  {
    id: "siemens-s7-300-ps307-outdoor-1ea80-0aa0",
    mlfb: "6ES7307-1EA80-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "Power Supply",
    variantId: "ps-307-outdoor",

    title: "SIMATIC S7-300 Outdoor Regulated power supply PS307",
    description:
      "SIMATIC S7-300 Outdoor regulated power supply PS307 with 120/230 V AC input and 24 V DC/5 A output.",
    lifecycle: "phase-out",

    specifications: {
      model: "PS 307",
      inputVoltage: "120/230 V AC",
      outputVoltage: "24 V DC",
      outputCurrent: "5 A",
      design: "SIMATIC S7-300 Outdoor design",
      mounting: "S7-300 mounting rail",
      operatingTemperature: "-25 to +70 °C",
      specialFeatures: ["Outdoor version"],
    },

    source:
      "https://mall.industry.siemens.com/mall/en/interhydroilown/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7307-1EA80-0AA0",
  },
  {
    id: "siemens-s7-300-ps307-1ka02-0aa0",
    mlfb: "6ES7307-1KA02-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "Power Supply",
    variantId: "ps-307",

    title: "SIMATIC S7-300 Regulated power supply PS307",
    description:
      "SIMATIC S7-300 regulated power supply PS307 with 120/230 V AC input and 24 V DC/10 A output.",
    lifecycle: "phase-out",

    specifications: {
      model: "PS 307",
      inputVoltage: "120/230 V AC",
      outputVoltage: "24 V DC",
      outputCurrent: "10 A",
      design: "SIMATIC S7-300 design",
      mounting: "S7-300 mounting rail",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/interhydroilown/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7307-1KA02-0AA0",
  },
  {
    id: "siemens-s7-300-ps307-1ba00-0aa0",
    mlfb: "6ES7307-1BA00-0AA0",
    successorMlfb: "6ES7307-1BA01-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "Power Supply",
    variantId: "ps-307",

    title: "SIMATIC S7-300 Regulated power supply PS307",
    description:
      "Historical SIMATIC S7-300 regulated power supply PS307 with 120/230 V AC input and 24 V DC/2 A output.",
    lifecycle: "discontinued",

    specifications: {
      model: "PS 307",
      inputVoltage: "120/230 V AC",
      outputVoltage: "24 V DC",
      outputCurrent: "2 A",
      design: "SIMATIC S7-300 design",
      mounting: "S7-300 mounting rail",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7307-1BA00-0AA0",
  },
  {
    id: "siemens-s7-300-ps307-1ea00-0aa0",
    mlfb: "6ES7307-1EA00-0AA0",
    successorMlfb: "6ES7307-1EA01-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "Power Supply",
    variantId: "ps-307",

    title: "SIMATIC S7-300 Regulated power supply PS307",
    description:
      "Historical SIMATIC S7-300 regulated power supply PS307 with 120/230 V AC input and 24 V DC/5 A output.",
    lifecycle: "discontinued",

    specifications: {
      model: "PS 307",
      inputVoltage: "120/230 V AC",
      outputVoltage: "24 V DC",
      outputCurrent: "5 A",
      design: "SIMATIC S7-300 design",
      mounting: "S7-300 mounting rail",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7307-1EA00-0AA0",
  },
  {
    id: "siemens-s7-300-ps307-1ka00-0aa0",
    mlfb: "6ES7307-1KA00-0AA0",
    successorMlfb: "6ES7307-1KA02-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "Power Supply",
    variantId: "ps-307",

    title: "SIMATIC S7-300 Regulated power supply PS307",
    description:
      "Historical SIMATIC S7-300 regulated power supply PS307 with 120/230 V AC input and 24 V DC/10 A output.",
    lifecycle: "discontinued",

    specifications: {
      model: "PS 307",
      inputVoltage: "120/230 V AC",
      outputVoltage: "24 V DC",
      outputCurrent: "10 A",
      design: "SIMATIC S7-300 design",
      mounting: "S7-300 mounting rail",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7307-1KA00-0AA0",
  },
  {
    id: "siemens-s7-300-ps307-1ka01-0aa0",
    mlfb: "6ES7307-1KA01-0AA0",
    successorMlfb: "6ES7307-1KA02-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "Power Supply",
    variantId: "ps-307",

    title: "SIMATIC S7-300 Regulated power supply PS307",
    description:
      "Historical SIMATIC S7-300 regulated power supply PS307 with 120/230 V AC input and 24 V DC/10 A output.",
    lifecycle: "discontinued",

    specifications: {
      model: "PS 307",
      inputVoltage: "120/230 V AC",
      outputVoltage: "24 V DC",
      outputCurrent: "10 A",
      design: "SIMATIC S7-300 design",
      mounting: "S7-300 mounting rail",
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7307-1KA01-0AA0",
  },
  {
    id: "siemens-s7-300-siplus-ps305-1ba80-2aa0",
    mlfb: "6AG1305-1BA80-2AA0",
    baseMlfb: "6ES7305-1BA80-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "Power Supply",
    variantId: "ps-305",

    title: "SIPLUS S7-300 Power supply PS305",
    description:
      "SIPLUS S7-300 PS305 based on 6ES7305-1BA80-0AA0, with conformal coating, 24-110 V DC input, and 24 V DC/2 A output.",
    lifecycle: "spare-part",

    specifications: {
      model: "PS 305",
      inputVoltage: "24-110 V DC",
      outputVoltage: "24 V DC",
      outputCurrent: "2 A",
      design: "SIPLUS S7-300 design",
      mounting: "S7-300 mounting rail",
      operatingTemperature: "-25 to +70 °C",
      specialFeatures: ["SIPLUS", "Conformal coating"],
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1305-1BA80-2AA0",
  },
  {
    id: "siemens-s7-300-siplus-ps307-1ea01-7aa0",
    mlfb: "6AG1307-1EA01-7AA0",
    baseMlfb: "6ES7307-1EA01-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "Power Supply",
    variantId: "ps-307",

    title: "SIPLUS S7-300 Power supply PS307",
    description:
      "SIPLUS S7-300 PS307 based on 6ES7307-1EA01-0AA0, with conformal coating, 120/230 V AC input, and 24 V DC/5 A output.",
    lifecycle: "spare-part",

    specifications: {
      model: "PS 307",
      inputVoltage: "120/230 V AC",
      outputVoltage: "24 V DC",
      outputCurrent: "5 A",
      design: "SIPLUS S7-300 design",
      mounting: "S7-300 mounting rail",
      operatingTemperature: "-25 to +70 °C",
      specialFeatures: ["SIPLUS", "Conformal coating"],
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1307-1EA01-7AA0",
  },
  {
    id: "siemens-s7-300-siplus-ps307-outdoor-1ea80-2aa0",
    mlfb: "6AG1307-1EA80-2AA0",
    baseMlfb: "6ES7307-1EA80-0AA0",
    successorMlfb: "6AG1307-1EA01-7AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "Power Supply",
    variantId: "ps-307-outdoor",

    title: "SIPLUS S7-300 Outdoor Power supply PS307",
    description:
      "SIPLUS S7-300 Outdoor PS307 based on 6ES7307-1EA80-0AA0, with conformal coating, 120/230 V AC input, and 24 V DC/5 A output.",
    lifecycle: "discontinued",

    specifications: {
      model: "PS 307",
      inputVoltage: "120/230 V AC",
      outputVoltage: "24 V DC",
      outputCurrent: "5 A",
      design: "SIPLUS S7-300 Outdoor design",
      mounting: "S7-300 mounting rail",
      operatingTemperature: "-25 to +70 °C",
      specialFeatures: ["SIPLUS", "Conformal coating", "Outdoor version"],
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1307-1EA80-2AA0",
  },
  {
    id: "siemens-s7-300-siplus-ps307-1ka02-7aa0",
    mlfb: "6AG1307-1KA02-7AA0",
    baseMlfb: "6ES7307-1KA02-0AA0",

    brandId: "siemens",
    categoryId: "PLC",
    familyId: "S7-300",
    seriesId: "S7-300",
    productTypeId: "Power Supply",
    variantId: "ps-307",

    title: "SIPLUS S7-300 Power supply PS307 10 A",
    description:
      "SIPLUS S7-300 PS307 10 A based on 6ES7307-1KA02-0AA0, with conformal coating, 120/230 V AC input, and 24 V DC/10 A output.",
    lifecycle: "spare-part",

    specifications: {
      model: "PS 307",
      inputVoltage: "120/230 V AC",
      outputVoltage: "24 V DC",
      outputCurrent: "10 A",
      design: "SIPLUS S7-300 design",
      mounting: "S7-300 mounting rail",
      operatingTemperature: "-25 to +70 °C",
      specialFeatures: ["SIPLUS", "Conformal coating"],
    },

    source:
      "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6AG1307-1KA02-7AA0",
  },
];
