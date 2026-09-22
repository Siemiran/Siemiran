import "server-only";

import type {
  PersianProductCopyOverlay,
  ProductCopyParagraph,
} from "./product-copy.types";

/**
 * Draft and review entries remain declarations in an array so duplicate IDs
 * are observable by validation. Entries stay private until complete coverage
 * and current linguistic and technical approvals permit activation.
 */
const cpu1211Copy = [
  { kind: "text", value: "مدل " },
  {
    kind: "technical",
    value: "SIMATIC S7-1200 CPU 1211C DC/DC/DC",
  },
  { kind: "text", value: "، یک " },
  { kind: "technical", value: "CPU" },
  {
    kind: "text",
    value: " کامپکت با ورودی‌ها و خروجی‌های داخلی شامل ",
  },
  { kind: "technical", value: "6" },
  { kind: "text", value: " ورودی دیجیتال، " },
  { kind: "technical", value: "4" },
  { kind: "text", value: " خروجی دیجیتال و " },
  { kind: "technical", value: "2" },
  { kind: "text", value: " ورودی آنالوگ " },
  { kind: "technical", value: "0-10 V DC" },
  { kind: "text", value: " است." },
] as const satisfies ProductCopyParagraph;

const cpu1212Copy = [
  { kind: "text", value: "مدل " },
  {
    kind: "technical",
    value: "SIMATIC S7-1200 CPU 1212C DC/DC/DC",
  },
  { kind: "text", value: "، یک " },
  { kind: "technical", value: "CPU" },
  {
    kind: "text",
    value: " کامپکت با ورودی‌ها و خروجی‌های داخلی شامل ",
  },
  { kind: "technical", value: "8" },
  { kind: "text", value: " ورودی دیجیتال، " },
  { kind: "technical", value: "6" },
  { kind: "text", value: " خروجی دیجیتال و " },
  { kind: "technical", value: "2" },
  { kind: "text", value: " ورودی آنالوگ " },
  { kind: "technical", value: "0-10 V DC" },
  { kind: "text", value: " است." },
] as const satisfies ProductCopyParagraph;

const cpu1214Copy = [
  { kind: "text", value: "مدل " },
  {
    kind: "technical",
    value: "SIMATIC S7-1200 CPU 1214C DC/DC/DC",
  },
  { kind: "text", value: "، یک " },
  { kind: "technical", value: "CPU" },
  {
    kind: "text",
    value: " کامپکت با ورودی‌ها و خروجی‌های داخلی شامل ",
  },
  { kind: "technical", value: "14" },
  { kind: "text", value: " ورودی دیجیتال، " },
  { kind: "technical", value: "10" },
  { kind: "text", value: " خروجی دیجیتال و " },
  { kind: "technical", value: "2" },
  { kind: "text", value: " ورودی آنالوگ " },
  { kind: "technical", value: "0-10 V DC" },
  { kind: "text", value: " است." },
] as const satisfies ProductCopyParagraph;

const cpu1215Copy = [
  { kind: "text", value: "مدل " },
  {
    kind: "technical",
    value: "SIMATIC S7-1200 CPU 1215C DC/DC/DC",
  },
  { kind: "text", value: "، یک " },
  { kind: "technical", value: "CPU" },
  {
    kind: "text",
    value: " کامپکت با ورودی‌ها و خروجی‌های داخلی شامل ",
  },
  { kind: "technical", value: "14" },
  { kind: "text", value: " ورودی دیجیتال، " },
  { kind: "technical", value: "10" },
  { kind: "text", value: " خروجی دیجیتال، " },
  { kind: "technical", value: "2" },
  { kind: "text", value: " ورودی آنالوگ " },
  { kind: "technical", value: "0-10 V DC" },
  { kind: "text", value: " و " },
  { kind: "technical", value: "2" },
  { kind: "text", value: " خروجی آنالوگ " },
  { kind: "technical", value: "0-20 mA DC" },
  { kind: "text", value: " است و " },
  { kind: "technical", value: "2" },
  { kind: "text", value: " پورت " },
  { kind: "technical", value: "PROFINET" },
  { kind: "text", value: " دارد." },
] as const satisfies ProductCopyParagraph;

const cpu1217Copy = [
  { kind: "text", value: "مدل " },
  {
    kind: "technical",
    value: "SIMATIC S7-1200 CPU 1217C DC/DC/DC",
  },
  { kind: "text", value: "، یک " },
  { kind: "technical", value: "CPU" },
  {
    kind: "text",
    value: " کامپکت با ورودی‌ها و خروجی‌های داخلی شامل ",
  },
  { kind: "technical", value: "10" },
  { kind: "text", value: " ورودی دیجیتال و " },
  { kind: "technical", value: "6" },
  {
    kind: "text",
    value: " خروجی دیجیتال است. برای توابع فناوری نیز چهار ورودی ",
  },
  { kind: "technical", value: "RS-422/485" },
  { kind: "text", value: " و چهار خروجی " },
  { kind: "technical", value: "RS-422/485" },
  { kind: "text", value: " دارد. همچنین دارای " },
  { kind: "technical", value: "2" },
  { kind: "text", value: " ورودی آنالوگ " },
  { kind: "technical", value: "0-10 V DC" },
  { kind: "text", value: " و " },
  { kind: "technical", value: "2" },
  { kind: "text", value: " خروجی آنالوگ " },
  { kind: "technical", value: "0-20 mA DC" },
  { kind: "text", value: " است و " },
  { kind: "technical", value: "2" },
  { kind: "text", value: " پورت " },
  { kind: "technical", value: "PROFINET" },
  { kind: "text", value: " دارد." },
] as const satisfies ProductCopyParagraph;

export const persianProductCopyDraftRegistry = [
  {
    productId: "siemens-s7-1200-cpu-211-1ae40",
    shortDescription: cpu1211Copy,
    description: [cpu1211Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-21T19:26:31Z",
      reviewedContentHash:
        "sha256:9f4eb09fec28f71baef3c0ed074486afec042c0a20d779da51fc4a90d518e8f3",
      evidenceRef:
        "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7211-1AE40-0XB0",
      note: "Reviewed Persian wording, terminology, grammar, punctuation, spacing, direction, and typed segmentation against the canonical Product copy; approved without content changes.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-21T19:27:19Z",
      reviewedContentHash:
        "sha256:9f4eb09fec28f71baef3c0ed074486afec042c0a20d779da51fc4a90d518e8f3",
      evidenceRef:
        "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7211-1AE40-0XB0",
      note: "Verified Product identity, MLFB, lifecycle, I/O quantities, electrical ranges, interfaces, port counts, technical tokens, and canonical Siemens source; approved without content changes.",
    },
  },
  {
    productId: "siemens-s7-1200-cpu-212-1ae40",
    shortDescription: cpu1212Copy,
    description: [cpu1212Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-21T19:26:31Z",
      reviewedContentHash:
        "sha256:467e4c69ff60f302f22acc31bdb3521dfb9335d5171cc5131ba3514f5f6c11fb",
      evidenceRef:
        "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7212-1AE40-0XB0",
      note: "Reviewed Persian wording, terminology, grammar, punctuation, spacing, direction, and typed segmentation against the canonical Product copy; approved without content changes.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-21T19:27:19Z",
      reviewedContentHash:
        "sha256:467e4c69ff60f302f22acc31bdb3521dfb9335d5171cc5131ba3514f5f6c11fb",
      evidenceRef:
        "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7212-1AE40-0XB0",
      note: "Verified Product identity, MLFB, lifecycle, I/O quantities, electrical ranges, interfaces, port counts, technical tokens, and canonical Siemens source; approved without content changes.",
    },
  },
  {
    productId: "siemens-s7-1200-cpu-214-1ag40",
    shortDescription: cpu1214Copy,
    description: [cpu1214Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-21T19:26:31Z",
      reviewedContentHash:
        "sha256:5175b7456d490551af2627bc05aaa26c752555e565205a50fa29751b43b8e3ac",
      evidenceRef:
        "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7214-1AG40-0XB0",
      note: "Reviewed Persian wording, terminology, grammar, punctuation, spacing, direction, and typed segmentation against the canonical Product copy; approved without content changes.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-21T19:27:19Z",
      reviewedContentHash:
        "sha256:5175b7456d490551af2627bc05aaa26c752555e565205a50fa29751b43b8e3ac",
      evidenceRef:
        "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7214-1AG40-0XB0",
      note: "Verified Product identity, MLFB, lifecycle, I/O quantities, electrical ranges, interfaces, port counts, technical tokens, and canonical Siemens source; approved without content changes.",
    },
  },
  {
    productId: "siemens-s7-1200-cpu-215-1ag40",
    shortDescription: cpu1215Copy,
    description: [cpu1215Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-21T19:26:31Z",
      reviewedContentHash:
        "sha256:fa672b497d742bcc06e87ecb71b1128ad92c7771e968e0889c0954fb88ebe305",
      evidenceRef:
        "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7215-1AG40-0XB0",
      note: "Reviewed Persian wording, terminology, grammar, punctuation, spacing, direction, and typed segmentation against the canonical Product copy; approved without content changes.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-21T19:27:19Z",
      reviewedContentHash:
        "sha256:fa672b497d742bcc06e87ecb71b1128ad92c7771e968e0889c0954fb88ebe305",
      evidenceRef:
        "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7215-1AG40-0XB0",
      note: "Verified Product identity, MLFB, lifecycle, I/O quantities, electrical ranges, interfaces, port counts, technical tokens, and canonical Siemens source; approved without content changes.",
    },
  },
  {
    productId: "siemens-s7-1200-cpu-217-1ag40",
    shortDescription: cpu1217Copy,
    description: [cpu1217Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-21T19:26:31Z",
      reviewedContentHash:
        "sha256:8d231e613502f35684728b238068d1e59aa1f67d17048dc7914a2469c38197c3",
      evidenceRef:
        "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7217-1AG40-0XB0",
      note: "Reviewed Persian wording, terminology, grammar, punctuation, spacing, direction, and typed segmentation against the canonical Product copy; approved without content changes.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-21T19:27:19Z",
      reviewedContentHash:
        "sha256:8d231e613502f35684728b238068d1e59aa1f67d17048dc7914a2469c38197c3",
      evidenceRef:
        "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7217-1AG40-0XB0",
      note: "Verified Product identity, MLFB, lifecycle, I/O quantities, electrical ranges, interfaces, port counts, technical tokens, and canonical Siemens source; approved without content changes.",
    },
  },
] as const satisfies readonly PersianProductCopyOverlay[];
