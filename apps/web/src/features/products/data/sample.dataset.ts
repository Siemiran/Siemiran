import type { ProductDataset } from "./products.schema";

export const sampleDataset: ProductDataset = {
  version: "1.0.0",

  brand: "Siemens",

  generatedAt: new Date().toISOString(),

  source: "manual",

  products: [],
};
