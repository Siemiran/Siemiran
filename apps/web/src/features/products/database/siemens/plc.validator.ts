import { siemensVerifiedTaxonomy } from "./verified-taxonomy";
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
  product: SiemensPLCProduct
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

  if (!product.seriesId.trim()) {
    errors.push("Missing Siemens PLC series");
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

  const plcFamilies = siemensVerifiedTaxonomy.PLC;

  const family = plcFamilies.find((item) => item.id === product.familyId);

  if (!family) {
    errors.push(`Unknown verified Siemens PLC family: ${product.familyId}`);

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  const series = family.series.find((item) => item.id === product.seriesId);

  if (!series) {
    errors.push(
      `Series "${product.seriesId}" is not registered under family "${product.familyId}".`
    );

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  const productType = series.productTypes.find(
    (item) => item.id === product.productTypeId
  );

  if (!productType) {
    errors.push(
      `Product type "${product.productTypeId}" is not registered under series "${product.seriesId}".`
    );

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  const variant = productType.variants.find(
    (item) => item.id === product.variantId
  );

  if (!variant) {
    errors.push(
      `Variant "${product.variantId}" is not registered under product type "${product.productTypeId}".`
    );
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
