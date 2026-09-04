import type { Product } from "@/features/products/types/product.types";
import { mapSiemensPLCSourceToProduct } from "../plc.adapter";
import type { SiemensS7300FunctionModule } from "./fm";

function normalizeS7300FunctionModuleSpecifications(
  source: SiemensS7300FunctionModule,
): Record<string, string> {
  const specifications: Record<string, string> = {};

  if (source.specifications.function) {
    specifications.Function = source.specifications.function;
  }

  if (source.specifications.channels !== undefined) {
    specifications.Channels = String(source.specifications.channels);
  }

  if (source.specifications.maximumFrequency) {
    specifications["Maximum Frequency"] =
      source.specifications.maximumFrequency;
  }

  if (source.specifications.encoderSupply) {
    specifications["Encoder Supply"] = source.specifications.encoderSupply;
  }

  if (source.specifications.digitalInputs !== undefined) {
    specifications["Digital Inputs"] = String(
      source.specifications.digitalInputs,
    );
  }

  if (source.specifications.analogInputs !== undefined) {
    specifications["Analog Inputs"] = String(source.specifications.analogInputs);
  }

  if (source.specifications.digitalOutputs !== undefined) {
    specifications["Digital Outputs"] = String(
      source.specifications.digitalOutputs,
    );
  }

  if (source.specifications.inputVoltage) {
    specifications["Input Voltage"] = source.specifications.inputVoltage;
  }

  if (source.specifications.outputCurrent) {
    specifications["Output Current"] = source.specifications.outputCurrent;
  }

  if (source.specifications.interfaces?.length) {
    specifications.Interfaces = source.specifications.interfaces.join(", ");
  }

  if (source.specifications.terminalConnection) {
    specifications["Terminal Connection"] =
      source.specifications.terminalConnection;
  }

  if (source.specifications.isochronousMode !== undefined) {
    specifications["Isochronous Mode"] = source.specifications.isochronousMode
      ? "Yes"
      : "No";
  }

  if (source.specifications.diagnostics) {
    specifications.Diagnostics = source.specifications.diagnostics;
  }

  if (source.specifications.supplyVoltage) {
    specifications["Supply Voltage"] = source.specifications.supplyVoltage;
  }

  return specifications;
}

export function mapSiemensS7300FunctionModuleToProduct(
  source: SiemensS7300FunctionModule,
): Product {
  return mapSiemensPLCSourceToProduct(
    source,
    normalizeS7300FunctionModuleSpecifications,
  );
}
