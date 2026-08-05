import type { Product } from "@/features/products/types/product.types";

export const products: Product[] = [
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

    seriesId: "CPU",

    productTypeId: "Compact CPU",

    partNumber: "6ES7214-1AG40-0XB0",

    manufacturerPartNumber: "6ES7214-1AG40-0XB0",

    images: ["/images/products/siemens/s7-1200/cpu1214c.webp"],

    gallery: [],

    specifications: {
      "Supply Voltage": "24 V DC",
      "Digital Inputs": "14",
      "Digital Outputs": "10",
      "Analog Inputs": "2",
      Communication: "PROFINET",
      Memory: "100 KB",
    },

    downloads: [
      {
        id: "cpu1214c-datasheet",

        title: "Datasheet",

        type: "datasheet",

        language: "EN",

        size: "3.4 MB",

        file: "/downloads/cpu1214c/datasheet.pdf",
      },

      {
        id: "cpu1214c-manual",

        title: "System Manual",

        type: "manual",

        language: "EN",

        size: "11.2 MB",

        file: "/downloads/cpu1214c/manual.pdf",
      },
    ],

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
