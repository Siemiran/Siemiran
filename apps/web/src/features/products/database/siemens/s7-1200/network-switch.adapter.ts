import type { Product } from "@/features/products/types/product.types";
import { mapSiemensPLCSourceToProduct } from "../plc.adapter";
import type { SiemensS71200OtherModule } from "./other";

function normalizeS71200NetworkSwitchSpecifications(
  source: SiemensS71200OtherModule
): Record<string, string> {
  const specifications: Record<string, string> = {};

  if (source.specifications.function) {
    specifications.Function = source.specifications.function;
  }

  if (source.specifications.interfaces?.length) {
    specifications.Interfaces = source.specifications.interfaces.join(", ");
  }

  if (source.specifications.ports !== undefined) {
    specifications.Ports = String(source.specifications.ports);
  }

  if (source.specifications.transmissionRate) {
    specifications["Transmission Rate"] =
      source.specifications.transmissionRate;
  }

  if (source.specifications.supplyVoltage) {
    specifications["Supply Voltage"] = source.specifications.supplyVoltage;
  }

  if (source.specifications.connector) {
    specifications.Connector = source.specifications.connector;
  }

  if (source.specifications.diagnostics) {
    specifications.Diagnostics = source.specifications.diagnostics;
  }

  if (source.specifications.mounting) {
    specifications.Mounting = source.specifications.mounting;
  }

  return specifications;
}

export function mapSiemensS71200NetworkSwitchToProduct(
  source: SiemensS71200OtherModule
): Product {
  if (source.productTypeId !== "Network Switch") {
    throw new Error(
      `Unsupported S7-1200 Network Switch Product Type: ${source.productTypeId}`
    );
  }

  return mapSiemensPLCSourceToProduct(
    source,
    normalizeS71200NetworkSwitchSpecifications
  );
}
