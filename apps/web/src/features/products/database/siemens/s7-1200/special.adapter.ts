import type { Product } from "@/features/products/types/product.types";
import { mapSiemensPLCSourceToProduct } from "../plc.adapter";
import type { SiemensS71200SpecialModule } from "./special";

function normalizeS71200SpecialModuleSpecifications(
  source: SiemensS71200SpecialModule
): Record<string, string> {
  const specifications: Record<string, string> = {};

  if (source.specifications.function) {
    specifications.Function = source.specifications.function;
  }

  if (source.specifications.channels !== undefined) {
    specifications.Channels = String(source.specifications.channels);
  }

  if (source.specifications.digitalInputs !== undefined) {
    specifications["Digital Inputs"] = String(
      source.specifications.digitalInputs
    );
  }

  if (source.specifications.digitalOutputs !== undefined) {
    specifications["Digital Outputs"] = String(
      source.specifications.digitalOutputs
    );
  }

  if (source.specifications.analogOutputs !== undefined) {
    specifications["Analog Outputs"] = String(
      source.specifications.analogOutputs
    );
  }

  if (source.specifications.supplyVoltage) {
    specifications["Supply Voltage"] = source.specifications.supplyVoltage;
  }

  if (source.specifications.interfaces?.length) {
    specifications.Interfaces = source.specifications.interfaces.join(", ");
  }

  if (source.specifications.connector) {
    specifications.Connector = source.specifications.connector;
  }

  if (source.specifications.compatibility) {
    specifications.Compatibility = source.specifications.compatibility;
  }

  if (source.specifications.mounting) {
    specifications.Mounting = source.specifications.mounting;
  }

  if (source.specifications.diagnostics) {
    specifications.Diagnostics = source.specifications.diagnostics;
  }

  if (source.specifications.ioLinkPorts !== undefined) {
    specifications["IO-Link Ports"] = String(source.specifications.ioLinkPorts);
  }

  if (source.specifications.memoryBackup) {
    specifications["Memory Backup"] = source.specifications.memoryBackup;
  }

  return specifications;
}

export function mapSiemensS71200SpecialModuleToProduct(
  source: SiemensS71200SpecialModule
): Product {
  return mapSiemensPLCSourceToProduct(
    source,
    normalizeS71200SpecialModuleSpecifications
  );
}
