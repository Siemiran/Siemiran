import type { Product } from "@/features/products/types/product.types";
import { mapSiemensPLCSourceToProduct } from "../plc.adapter";
import type { SiemensS71200OtherModule } from "./other";

function normalizeS71200DataDecouplingModuleSpecifications(
  source: SiemensS71200OtherModule
): Record<string, string> {
  const specifications: Record<string, string> = {};

  if (source.specifications.function) {
    specifications.Function = source.specifications.function;
  }

  if (source.specifications.interfaces?.length) {
    specifications.Interfaces = source.specifications.interfaces.join(", ");
  }

  if (source.specifications.supplyVoltage) {
    specifications["Supply Voltage"] = source.specifications.supplyVoltage;
  }

  if (source.specifications.diagnostics) {
    specifications.Diagnostics = source.specifications.diagnostics;
  }

  if (source.specifications.mounting) {
    specifications.Mounting = source.specifications.mounting;
  }

  return specifications;
}

export function mapSiemensS71200DataDecouplingModuleToProduct(
  source: SiemensS71200OtherModule
): Product {
  if (source.productTypeId !== "Data Decoupling Module") {
    throw new Error(
      `Unsupported S7-1200 Data Decoupling Module Product Type: ${source.productTypeId}`
    );
  }

  return mapSiemensPLCSourceToProduct(
    source,
    normalizeS71200DataDecouplingModuleSpecifications
  );
}
