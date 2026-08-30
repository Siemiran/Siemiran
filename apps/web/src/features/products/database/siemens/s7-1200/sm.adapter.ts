import type { Product } from "@/features/products/types/product.types";
import { mapSiemensPLCSourceToProduct } from "../plc.adapter";
import type { SiemensS71200G2SignalModule } from "./g2/sm";
import type { SiemensS71200SignalModule } from "./sm";

type SiemensS71200SignalModuleSource =
  | SiemensS71200SignalModule
  | SiemensS71200G2SignalModule;

function normalizeS71200SignalModuleSpecifications(
  source: SiemensS71200SignalModuleSource,
): Record<string, string> {
  const specifications: Record<string, string> = {};

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

  if (source.specifications.inputVoltage) {
    specifications["Input Voltage"] = source.specifications.inputVoltage;
  }

  if (source.specifications.outputVoltage) {
    specifications["Output Voltage"] = source.specifications.outputVoltage;
  }

  if (source.specifications.supplyVoltage) {
    specifications["Supply Voltage"] = source.specifications.supplyVoltage;
  }

  if (source.specifications.inputCurrent) {
    specifications["Input Current"] = source.specifications.inputCurrent;
  }

  if (source.specifications.outputCurrent) {
    specifications["Output Current"] = source.specifications.outputCurrent;
  }

  if (source.specifications.resolution) {
    specifications.Resolution = source.specifications.resolution;
  }

  if (source.specifications.signalRanges?.length) {
    specifications["Signal Ranges"] =
      source.specifications.signalRanges.join(", ");
  }

  if (source.specifications.measurementType?.length) {
    specifications["Measurement Type"] =
      source.specifications.measurementType.join(", ");
  }

  if (source.specifications.interfaces?.length) {
    specifications.Interfaces = source.specifications.interfaces.join(", ");
  }

  if (source.specifications.terminalConnection) {
    specifications["Terminal Connection"] =
      source.specifications.terminalConnection;
  }

  if (source.specifications.diagnostics) {
    specifications.Diagnostics = source.specifications.diagnostics;
  }

  if (source.specifications.interrupts) {
    specifications.Interrupts = source.specifications.interrupts;
  }

  if (source.specifications.isochronousMode !== undefined) {
    specifications["Isochronous Mode"] = source.specifications.isochronousMode
      ? "Yes"
      : "No";
  }

  if (source.specifications.failSafe !== undefined) {
    specifications["Fail-safe"] = source.specifications.failSafe ? "Yes" : "No";
  }

  return specifications;
}

export function mapSiemensS71200SignalModuleToProduct(
  source: SiemensS71200SignalModuleSource,
): Product {
  return mapSiemensPLCSourceToProduct(
    source,
    normalizeS71200SignalModuleSpecifications,
  );
}
