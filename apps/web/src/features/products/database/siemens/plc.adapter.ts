import type { Product } from "@/features/products/types/product.types";
import type { SiemensPLCProduct } from "./plc";

function mapLifecycle(
  lifecycle: SiemensPLCProduct["lifecycle"],
): NonNullable<Product["lifecycle"]> {
  switch (lifecycle) {
    case "active":
      return "active";
    case "discontinued":
      return "discontinued";
    case "phase-out":
    case "spare-part":
      return "legacy";
  }
}

function createSlug(mlfb: string): string {
  return mlfb
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function mapSiemensPLCToProduct(
  source: SiemensPLCProduct,
): Product {
  const specifications: Record<string, string> = {};

  if (source.specifications.workMemory) {
    specifications["Work Memory"] = source.specifications.workMemory;
  }

  if (source.specifications.interfaces?.length) {
    specifications["Interfaces"] =
      source.specifications.interfaces.join(", ");
  }

  if (source.specifications.supplyVoltage) {
    specifications["Supply Voltage"] =
      source.specifications.supplyVoltage;
  }

  if (source.specifications.digitalInputs !== undefined) {
    specifications["Digital Inputs"] =
      String(source.specifications.digitalInputs);
  }

  if (source.specifications.digitalOutputs !== undefined) {
    specifications["Digital Outputs"] =
      String(source.specifications.digitalOutputs);
  }

  if (source.specifications.analogInputs !== undefined) {
    specifications["Analog Inputs"] =
      String(source.specifications.analogInputs);
  }

  if (source.specifications.analogOutputs !== undefined) {
    specifications["Analog Outputs"] =
      String(source.specifications.analogOutputs);
  }

  if (source.specifications.highSpeedCounters) {
    specifications["High Speed Counters"] =
      source.specifications.highSpeedCounters;
  }

  if (source.specifications.memoryCard) {
    specifications["Memory Card"] =
      source.specifications.memoryCard;
  }

  return {
    id: source.id,
    slug: createSlug(source.mlfb),

    title: source.title,
    shortDescription: source.description,
    description: source.description,

    brandId: source.brandId,
    categoryId: source.categoryId,
    familyId: source.familyId,
    seriesId: source.seriesId,
    productTypeId: source.productTypeId,
    variantId: source.variantId,

    partNumber: source.mlfb,
    manufacturerPartNumber: source.mlfb,

    images: [
      "/images/products/placeholders/siemens-product.svg",
    ],

    specifications,

    downloads: [],

    tags: [
      source.familyId,
      source.seriesId,
      source.productTypeId,
      source.variantId,
    ],

    lifecycle: mapLifecycle(source.lifecycle),

    siemensUrl: source.source,
  };
}
