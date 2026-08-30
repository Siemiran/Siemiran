import type { Product } from "@/features/products/types/product.types";
import { siemensPLC } from "@/features/products/database/siemens/plc";
import { mapSiemensPLCToProduct } from "@/features/products/database/siemens/plc.adapter";
import { mapSiemensS7300PowerSupplyToProduct } from "@/features/products/database/siemens/s7-300/ps.adapter";
import { siemensS7300PowerSupplies } from "@/features/products/database/siemens/s7-300/ps";
import { mapSiemensS71200CPUToProduct } from "@/features/products/database/siemens/s7-1200/cpu.adapter";
import { siemensS71200G2CPU } from "@/features/products/database/siemens/s7-1200/g2/cpu";
import { siemensS71200G2PowerModules } from "@/features/products/database/siemens/s7-1200/g2/pm";
import { mapSiemensS71200PowerModuleToProduct } from "@/features/products/database/siemens/s7-1200/pm.adapter";
import { siemensS71200PowerModules } from "@/features/products/database/siemens/s7-1200/pm";

const existingProducts: Product[] = [
  {
    id: "6es7214-1ag40-0xb0",

    slug: "cpu-1214c-dc-dc-dc",

    title: "SIMATIC S7-1200 CPU 1214C DC/DC/DC",

    shortDescription:
      "Compact CPU with DC power supply and DC digital inputs/outputs",

    description:
      "SIMATIC S7-1200 Compact CPU for small and medium automation systems.",

    brandId: "siemens",

    categoryId: "PLC",

    familyId: "S7-1200",

    seriesId: "S7-1200",

    productTypeId: "CPU",

    variantId: "compact",

    partNumber: "6ES7214-1AG40-0XB0",

    manufacturerPartNumber: "6ES7214-1AG40-0XB0",

    images: ["/images/products/placeholders/siemens-product.svg"],

    specifications: {
      "Supply Voltage": "24 V DC",
      "Digital Inputs": "14",
      "Digital Outputs": "10",
      "Analog Inputs": "2",
      Communication: "PROFINET",
      Memory: "100 KB",
    },

    downloads: [],

    compatibility: [],

    accessories: [],

    relatedProducts: [],

    replacementProduct: "",

    tags: ["PLC", "S7-1200", "CPU", "Compact CPU"],

    lifecycle: "active",

    inStock: false,

    featured: true,

    seoTitle: "SIMATIC S7-1200 CPU 1214C DC/DC/DC",

    seoDescription:
      "Technical specifications and documentation for Siemens CPU 1214C.",

    siemensUrl: "",
  },
];

const verifiedSiemensPLCProducts: Product[] = siemensPLC.map(
  mapSiemensPLCToProduct
);

const verifiedSiemensS7300PowerSupplyProducts: Product[] =
  siemensS7300PowerSupplies.map(mapSiemensS7300PowerSupplyToProduct);

const verifiedSiemensS71200ClassicPowerModuleProducts: Product[] =
  siemensS71200PowerModules.map(mapSiemensS71200PowerModuleToProduct);

const verifiedSiemensS71200G2PowerModuleProducts: Product[] =
  siemensS71200G2PowerModules.map(mapSiemensS71200PowerModuleToProduct);

const verifiedSiemensS71200G2CPUProducts: Product[] =
  siemensS71200G2CPU.map(mapSiemensS71200CPUToProduct);

export const products: Product[] = [
  ...existingProducts,
  ...verifiedSiemensPLCProducts,
  ...verifiedSiemensS7300PowerSupplyProducts,
  ...verifiedSiemensS71200ClassicPowerModuleProducts,
  ...verifiedSiemensS71200G2PowerModuleProducts,
  ...verifiedSiemensS71200G2CPUProducts,
];
