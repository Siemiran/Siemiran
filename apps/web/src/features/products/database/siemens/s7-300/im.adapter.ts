import type { Product } from "@/features/products/types/product.types";
import { mapSiemensPLCSourceToProduct } from "../plc.adapter";
import type { SiemensS7300InterfaceModule } from "./im";

function normalizeS7300InterfaceModuleSpecifications(
  source: SiemensS7300InterfaceModule,
): Record<string, string> {
  const specifications: Record<string, string> = {};

  if (source.specifications.function) {
    specifications.Function = source.specifications.function;
  }

  if (source.specifications.rackConfiguration) {
    specifications["Rack Configuration"] =
      source.specifications.rackConfiguration;
  }

  if (source.specifications.expansionRacks !== undefined) {
    specifications["Expansion Racks"] = String(
      source.specifications.expansionRacks,
    );
  }

  if (source.specifications.channels !== undefined) {
    specifications.Channels = String(source.specifications.channels);
  }

  if (source.specifications.supplyVoltage) {
    specifications["Supply Voltage"] = source.specifications.supplyVoltage;
  }

  if (source.specifications.interfaces?.length) {
    specifications.Interfaces = source.specifications.interfaces.join(", ");
  }

  if (source.specifications.connectingCable) {
    specifications["Connecting Cable"] =
      source.specifications.connectingCable;
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

  if (source.specifications.analogOutputs !== undefined) {
    specifications["Analog Outputs"] = String(
      source.specifications.analogOutputs,
    );
  }

  if (source.specifications.encoderSupply) {
    specifications["Encoder Supply"] = source.specifications.encoderSupply;
  }

  if (source.specifications.diagnostics) {
    specifications.Diagnostics = source.specifications.diagnostics;
  }

  return specifications;
}

export function mapSiemensS7300InterfaceModuleToProduct(
  source: SiemensS7300InterfaceModule,
): Product {
  return mapSiemensPLCSourceToProduct(
    source,
    normalizeS7300InterfaceModuleSpecifications,
  );
}
