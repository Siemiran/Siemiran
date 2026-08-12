import type { ProductInquiryInput } from "./inquiry.schema";

export interface InquiryValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ProductInquiryInput, string>>;
}

export function validateProductInquiry(
  input: ProductInquiryInput
): InquiryValidationResult {
  const errors: InquiryValidationResult["errors"] = {};

  if (!input.productId.trim()) {
    errors.productId = "Product is required.";
  }

  if (!input.productTitle.trim()) {
    errors.productTitle = "Product title is required.";
  }

  if (!input.partNumber.trim()) {
    errors.partNumber = "Part number is required.";
  }

  if (!Number.isInteger(input.quantity) || input.quantity < 1) {
    errors.quantity = "Quantity must be at least 1.";
  }

  if (!input.name.trim()) {
    errors.name = "Name is required.";
  }

  if (!input.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    errors.email = "Enter a valid email address.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
