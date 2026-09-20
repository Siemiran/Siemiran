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
const pendingReview = { decision: "pending" } as const;

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
    linguisticReview: pendingReview,
    technicalReview: pendingReview,
  },
  {
    productId: "siemens-s7-1200-cpu-212-1ae40",
    shortDescription: cpu1212Copy,
    description: [cpu1212Copy],
    provenance: "ai-assisted",
    linguisticReview: pendingReview,
    technicalReview: pendingReview,
  },
  {
    productId: "siemens-s7-1200-cpu-214-1ag40",
    shortDescription: cpu1214Copy,
    description: [cpu1214Copy],
    provenance: "ai-assisted",
    linguisticReview: pendingReview,
    technicalReview: pendingReview,
  },
  {
    productId: "siemens-s7-1200-cpu-215-1ag40",
    shortDescription: cpu1215Copy,
    description: [cpu1215Copy],
    provenance: "ai-assisted",
    linguisticReview: pendingReview,
    technicalReview: pendingReview,
  },
  {
    productId: "siemens-s7-1200-cpu-217-1ag40",
    shortDescription: cpu1217Copy,
    description: [cpu1217Copy],
    provenance: "ai-assisted",
    linguisticReview: pendingReview,
    technicalReview: pendingReview,
  },
] as const satisfies readonly PersianProductCopyOverlay[];
