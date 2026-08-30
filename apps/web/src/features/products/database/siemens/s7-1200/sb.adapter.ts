import type { Product } from "@/features/products/types/product.types";
import { mapSiemensPLCSourceToProduct } from "../plc.adapter";
import type { SiemensS71200G2SignalBoard } from "./g2/sb";
import type { SiemensS71200SignalBoard } from "./sb";

type SiemensS71200SignalBoardSource =
  | SiemensS71200SignalBoard
  | SiemensS71200G2SignalBoard;

function normalizeS71200SignalBoardSpecifications(
  source: SiemensS71200SignalBoardSource,
): Record<string, string> {
  const specifications: Record<string, string> = {};

  if (source.specifications.function) {
    specifications.Function = source.specifications.function;
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

  if (source.specifications.inputVoltage) {
    specifications["Input Voltage"] = source.specifications.inputVoltage;
  }

  if (source.specifications.outputVoltage) {
    specifications["Output Voltage"] = source.specifications.outputVoltage;
  }

  if (source.specifications.signalType) {
    specifications["Signal Type"] = source.specifications.signalType;
  }

  if (source.specifications.resolution) {
    specifications.Resolution = source.specifications.resolution;
  }

  if (source.specifications.maximumFrequency) {
    specifications["Maximum Frequency"] =
      source.specifications.maximumFrequency;
  }

  if (source.specifications.interfaces?.length) {
    specifications.Interfaces = source.specifications.interfaces.join(", ");
  }

  if (source.specifications.supplyVoltage) {
    specifications["Supply Voltage"] = source.specifications.supplyVoltage;
  }

  if (source.specifications.terminalConnection) {
    specifications["Terminal Connection"] =
      source.specifications.terminalConnection;
  }

  if (source.specifications.diagnostics) {
    specifications.Diagnostics = source.specifications.diagnostics;
  }

  if (source.specifications.mounting) {
    specifications.Mounting = source.specifications.mounting;
  }

  return specifications;
}

export function mapSiemensS71200SignalBoardToProduct(
  source: SiemensS71200SignalBoardSource,
): Product {
  return mapSiemensPLCSourceToProduct(
    source,
    normalizeS71200SignalBoardSpecifications,
  );
}
