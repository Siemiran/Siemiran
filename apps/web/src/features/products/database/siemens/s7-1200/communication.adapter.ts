import type { Product } from "@/features/products/types/product.types";
import { mapSiemensPLCSourceToProduct } from "../plc.adapter";
import type { SiemensS71200CommunicationBoard } from "./cb";
import type { SiemensS71200CommunicationModule } from "./cm";
import type { SiemensS71200CommunicationProcessor } from "./cp";
import type { SiemensS71200OtherModule } from "./other";

type SiemensS71200CommunicationSource =
  | SiemensS71200CommunicationModule
  | SiemensS71200CommunicationProcessor
  | SiemensS71200CommunicationBoard
  | SiemensS71200OtherModule;

function normalizeS71200CommunicationSpecifications(
  source: SiemensS71200CommunicationSource
): Record<string, string> {
  const specifications: Record<string, string> = {};
  const sourceSpecifications = source.specifications;

  if ("function" in sourceSpecifications && sourceSpecifications.function) {
    specifications.Function = sourceSpecifications.function;
  }

  if ("interface" in sourceSpecifications && sourceSpecifications.interface) {
    specifications.Interface = sourceSpecifications.interface;
  }

  if (sourceSpecifications.interfaces?.length) {
    specifications.Interfaces = sourceSpecifications.interfaces.join(", ");
  }

  if (
    "protocols" in sourceSpecifications &&
    sourceSpecifications.protocols?.length
  ) {
    specifications.Protocols = sourceSpecifications.protocols.join(", ");
  }

  if (
    "transmissionRate" in sourceSpecifications &&
    sourceSpecifications.transmissionRate
  ) {
    specifications["Transmission Rate"] = sourceSpecifications.transmissionRate;
  }

  if (
    "supplyVoltage" in sourceSpecifications &&
    sourceSpecifications.supplyVoltage
  ) {
    specifications["Supply Voltage"] = sourceSpecifications.supplyVoltage;
  }

  if ("connector" in sourceSpecifications && sourceSpecifications.connector) {
    specifications.Connector = sourceSpecifications.connector;
  }

  if (
    "antennaInterface" in sourceSpecifications &&
    sourceSpecifications.antennaInterface
  ) {
    specifications["Antenna Interface"] = sourceSpecifications.antennaInterface;
  }

  if (
    "diagnostics" in sourceSpecifications &&
    sourceSpecifications.diagnostics
  ) {
    specifications.Diagnostics = sourceSpecifications.diagnostics;
  }

  if (
    "security" in sourceSpecifications &&
    sourceSpecifications.security?.length
  ) {
    specifications.Security = sourceSpecifications.security.join(", ");
  }

  if (
    "wirelessTechnology" in sourceSpecifications &&
    sourceSpecifications.wirelessTechnology?.length
  ) {
    specifications["Wireless Technology"] =
      sourceSpecifications.wirelessTechnology.join(", ");
  }

  if (sourceSpecifications.mounting) {
    specifications.Mounting = sourceSpecifications.mounting;
  }

  if ("role" in sourceSpecifications && sourceSpecifications.role) {
    specifications.Role = sourceSpecifications.role;
  }

  if ("terminals" in sourceSpecifications && sourceSpecifications.terminals) {
    specifications.Terminals = sourceSpecifications.terminals;
  }

  if (
    "compatibility" in sourceSpecifications &&
    sourceSpecifications.compatibility
  ) {
    specifications.Compatibility = sourceSpecifications.compatibility;
  }

  return specifications;
}

export function mapSiemensS71200CommunicationToProduct(
  source: SiemensS71200CommunicationSource
): Product {
  if (
    source.productTypeId !== "Communication Module" &&
    source.productTypeId !== "Communication Processor" &&
    source.productTypeId !== "Communication Board"
  ) {
    throw new Error(
      `Unsupported S7-1200 communication Product Type: ${source.productTypeId}`
    );
  }

  return mapSiemensPLCSourceToProduct(
    source,
    normalizeS71200CommunicationSpecifications
  );
}
