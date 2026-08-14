import type { SiemensPLCProduct } from "./plc";

export interface SiemensPLCValidationResult {
  valid: boolean;
  errors: string[];
}

const SUPPORTED_LIFECYCLES: SiemensPLCProduct["lifecycle"][] = [
  "active",
  "phase-out",
  "spare-part",
  "discontinued",
];

export function validateSiemensPLCProduct(
  product: SiemensPLCProduct,
): SiemensPLCValidationResult {
  const errors: string[] = [];

  if (!product.id.trim()) {
    errors.push("Missing Siemens PLC id");
  }

  if (!product.mlfb.trim()) {
    errors.push("Missing Siemens MLFB");
  }

  if (product.brandId !== "siemens") {
    errors.push("Invalid Siemens brand id");
  }

  if (product.categoryId !== "PLC") {
    errors.push("Invalid Siemens PLC category id");
  }

  if (!product.familyId.trim()) {
    errors.push("Missing Siemens PLC family");
  }

  if (!product.productTypeId.trim()) {
    errors.push("Missing Siemens PLC product type");
  }

  if (!product.variantId.trim()) {
    errors.push("Missing Siemens PLC variant");
  }

  if (!product.title.trim()) {
    errors.push("Missing Siemens PLC title");
  }

  if (!product.description.trim()) {
    errors.push("Missing Siemens PLC description");
  }

  if (!SUPPORTED_LIFECYCLES.includes(product.lifecycle)) {
    errors.push(`Invalid lifecycle: ${product.lifecycle}`);
  }

  if (!product.source.trim()) {
    errors.push("Missing official Siemens source");
  } else if (!/^https:\/\/.+/i.test(product.source)) {
    errors.push("Siemens source must be an HTTPS URL");
  }

  if (!/^[0-9A-Z-]+$/i.test(product.mlfb)) {
    errors.push(`Invalid MLFB format: ${product.mlfb}`);
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
