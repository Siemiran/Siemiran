export interface ProductDownload {
  id: string;
  title: string;

  type:
    "datasheet" | "manual" | "firmware" | "certificate" | "software" | "cad";

  language: string;

  size: string;

  file: string;
}
