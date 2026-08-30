import type { Product } from "@/features/products/types/product.types";
import { mapSiemensPLCSourceToProduct } from "../plc.adapter";
import type { SiemensS71200CPUProduct } from "./cpu";
import type { SiemensS71200G2CPUProduct } from "./g2/cpu";

type SiemensS71200CPUProductSource =
  | SiemensS71200CPUProduct
  | SiemensS71200G2CPUProduct;

function normalizeS71200CPUSpecifications(
  source: SiemensS71200CPUProductSource,
): Record<string, string> {
  const specifications: Record<string, string> = {};

  if (source.specifications.workMemory) {
    specifications["Work Memory"] = source.specifications.workMemory;
  }

  if (source.specifications.programDataMemory) {
    specifications["Program/Data Memory"] =
      source.specifications.programDataMemory;
  }

  if (source.specifications.loadMemory) {
    specifications["Load Memory"] = source.specifications.loadMemory;
  }

  if (source.specifications.retentiveMemory) {
    specifications["Retentive Memory"] =
      source.specifications.retentiveMemory;
  }

  if (source.specifications.interfaces?.length) {
    specifications.Interfaces = source.specifications.interfaces.join(", ");
  }

  if (source.specifications.profinetPorts !== undefined) {
    specifications["PROFINET Ports"] = String(
      source.specifications.profinetPorts,
    );
  }

  if (source.specifications.supplyVoltage) {
    specifications["Supply Voltage"] = source.specifications.supplyVoltage;
  }

  if (source.specifications.digitalInputs !== undefined) {
    specifications["Digital Inputs"] = String(
      source.specifications.digitalInputs,
    );
  }

  if (source.specifications.digitalOutputs !== undefined) {
    specifications["Digital Outputs"] = String(
      source.specifications.digitalOutputs,
    );
  }

  if (source.specifications.analogInputs !== undefined) {
    specifications["Analog Inputs"] = String(
      source.specifications.analogInputs,
    );
  }

  if (source.specifications.analogOutputs !== undefined) {
    specifications["Analog Outputs"] = String(
      source.specifications.analogOutputs,
    );
  }

  if (source.specifications.specialDigitalInputs) {
    specifications["Special Digital Inputs"] =
      source.specifications.specialDigitalInputs;
  }

  if (source.specifications.specialDigitalOutputs) {
    specifications["Special Digital Outputs"] =
      source.specifications.specialDigitalOutputs;
  }

  if (source.specifications.memoryCard) {
    specifications["Memory Card"] = source.specifications.memoryCard;
  }

  return specifications;
}

export function mapSiemensS71200CPUToProduct(
  source: SiemensS71200CPUProductSource,
): Product {
  return mapSiemensPLCSourceToProduct(source, normalizeS71200CPUSpecifications);
}
