import type { Product } from "@/features/products/types/product.types";
import { mapSiemensPLCSourceToProduct } from "../plc.adapter";
import type { SiemensS7300PowerSupply } from "./ps";

function normalizeS7300PowerSupplySpecifications(
  source: SiemensS7300PowerSupply,
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

  if (source.specifications.mounting) {
    specifications.Mounting = source.specifications.mounting;
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

export function mapSiemensS7300PowerSupplyToProduct(
  source: SiemensS7300PowerSupply,
): Product {
  return mapSiemensPLCSourceToProduct(
    source,
    normalizeS7300PowerSupplySpecifications,
  );
}
