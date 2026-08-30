import type { Product } from "@/features/products/types/product.types";
import { mapSiemensPLCSourceToProduct } from "../plc.adapter";
import type { SiemensS71200G2PowerModule } from "./g2/pm";
import type { SiemensS71200PowerModule } from "./pm";

type SiemensS71200PowerModuleSource =
  | SiemensS71200PowerModule
  | SiemensS71200G2PowerModule;

function normalizeS71200PowerModuleSpecifications(
  source: SiemensS71200PowerModuleSource,
): Record<string, string> {
  const specifications: Record<string, string> = {
    Model: source.specifications.model,
    "Input Voltage": source.specifications.inputVoltage,
    "Output Voltage": source.specifications.outputVoltage,
    "Output Current": source.specifications.outputCurrent,
  };

  if (source.specifications.ratedPower) {
    specifications["Rated Power"] = source.specifications.ratedPower;
  }

  if (source.specifications.design) {
    specifications.Design = source.specifications.design;
  }

  if (source.specifications.diagnostics) {
    specifications.Diagnostics = source.specifications.diagnostics;
  }

  if (source.specifications.mounting) {
    specifications.Mounting = source.specifications.mounting;
  }

  if (source.specifications.certification) {
    specifications.Certification = source.specifications.certification;
  }

  if (source.specifications.operatingTemperature) {
    specifications["Operating Temperature"] =
      source.specifications.operatingTemperature;
  }

  if (source.specifications.specialFeatures?.length) {
    specifications["Special Features"] =
      source.specifications.specialFeatures.join(", ");
  }

  return specifications;
}

export function mapSiemensS71200PowerModuleToProduct(
  source: SiemensS71200PowerModuleSource,
): Product {
  return mapSiemensPLCSourceToProduct(
    source,
    normalizeS71200PowerModuleSpecifications,
  );
}
