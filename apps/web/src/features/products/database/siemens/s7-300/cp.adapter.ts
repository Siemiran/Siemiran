import type { Product } from "@/features/products/types/product.types";
import { mapSiemensPLCSourceToProduct } from "../plc.adapter";
import type { SiemensS7300CommunicationProcessor } from "./cp";

function normalizeS7300CommunicationProcessorSpecifications(
  source: SiemensS7300CommunicationProcessor,
): Record<string, string> {
  const specifications: Record<string, string> = {};

  if (source.specifications.interface) {
    specifications.Interface = source.specifications.interface;
  }

  if (source.specifications.interfaces?.length) {
    specifications.Interfaces = source.specifications.interfaces.join(", ");
  }

  if (source.specifications.supplyVoltage) {
    specifications["Supply Voltage"] = source.specifications.supplyVoltage;
  }

  if (source.specifications.transmissionRate) {
    specifications["Transmission Rate"] =
      source.specifications.transmissionRate;
  }

  if (source.specifications.protocols?.length) {
    specifications.Protocols = source.specifications.protocols.join(", ");
  }

  if (source.specifications.connector) {
    specifications.Connector = source.specifications.connector;
  }

  if (source.specifications.cableLength) {
    specifications["Cable Length"] = source.specifications.cableLength;
  }

  if (source.specifications.diagnostics) {
    specifications.Diagnostics = source.specifications.diagnostics;
  }

  return specifications;
}

export function mapSiemensS7300CommunicationProcessorToProduct(
  source: SiemensS7300CommunicationProcessor,
): Product {
  return mapSiemensPLCSourceToProduct(
    source,
    normalizeS7300CommunicationProcessorSpecifications,
  );
}
