export type SiemensPLCSourceLifecycle =
  | "active"
  | "phase-out"
  | "spare-part"
  | "discontinued";

export interface SiemensPLCSourceBase {
  id: string;
  mlfb: string;

  brandId: "siemens";
  categoryId: "PLC";

  familyId: string;
  seriesId: string;
  productTypeId: string;
  variantId: string;

  title: string;
  description: string;

  lifecycle: SiemensPLCSourceLifecycle;

  source: string;
}

export type { SiemensPLCLifecycle, SiemensPLCProduct } from "./s7-300/cpu";
export { siemensPLC } from "./s7-300/cpu";
