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

const cpu315f2DpCopy = [
  { kind: "text", value: "مدل " },
  {
    kind: "technical",
    value: "SIMATIC S7-300 CPU 315F-2 DP",
  },
  {
    kind: "text",
    value:
      "، یک واحد پردازش مرکزی ایمن در برابر خطا با حافظه کاری ",
  },
  { kind: "technical", value: "384 KB" },
  { kind: "text", value: " است. دارای رابط‌های " },
  { kind: "technical", value: "MPI" },
  { kind: "text", value: " و " },
  { kind: "technical", value: "PROFIBUS DP" },
  {
    kind: "text",
    value: " است و رابط دوم می‌تواند در نقش اصلی یا تابع کار کند.",
  },
] as const satisfies ProductCopyParagraph;

const cpu315f2PnDpCopy = [
  { kind: "text", value: "مدل " },
  {
    kind: "technical",
    value: "SIMATIC S7-300 CPU 315F-2 PN/DP",
  },
  {
    kind: "text",
    value:
      "، یک واحد پردازش مرکزی ایمن در برابر خطا با حافظه کاری ",
  },
  { kind: "technical", value: "512 KB" },
  { kind: "text", value: " است. دارای رابط‌های " },
  { kind: "technical", value: "MPI/DP" },
  { kind: "text", value: " و " },
  { kind: "technical", value: "PROFINET" },
  { kind: "text", value: " مبتنی بر اترنت با سوئیچ دو پورت است." },
] as const satisfies ProductCopyParagraph;

const cpu317f2DpCopy = [
  { kind: "text", value: "مدل " },
  {
    kind: "technical",
    value: "SIMATIC S7-300 CPU 317F-2 DP",
  },
  {
    kind: "text",
    value:
      "، یک واحد پردازش مرکزی ایمن در برابر خطا با حافظه کاری ",
  },
  { kind: "technical", value: "1.5 MB" },
  { kind: "text", value: " است. دارای رابط‌های " },
  { kind: "technical", value: "MPI/DP" },
  { kind: "text", value: " و " },
  { kind: "technical", value: "PROFIBUS DP" },
  {
    kind: "text",
    value: " است و رابط دوم می‌تواند در نقش اصلی یا تابع کار کند.",
  },
] as const satisfies ProductCopyParagraph;

const cpu317f2PnDpCopy = [
  { kind: "text", value: "مدل " },
  {
    kind: "technical",
    value: "SIMATIC S7-300 CPU 317F-2 PN/DP",
  },
  {
    kind: "text",
    value:
      "، یک واحد پردازش مرکزی ایمن در برابر خطا با حافظه کاری ",
  },
  { kind: "technical", value: "1.5 MB" },
  { kind: "text", value: " است. دارای رابط‌های " },
  { kind: "technical", value: "MPI/DP" },
  { kind: "text", value: " و " },
  { kind: "technical", value: "PROFINET" },
  { kind: "text", value: " مبتنی بر اترنت با سوئیچ دو پورت است." },
] as const satisfies ProductCopyParagraph;

const cpu319f3PnDpCopy = [
  { kind: "text", value: "مدل " },
  {
    kind: "technical",
    value: "SIMATIC S7-300 CPU 319F-3 PN/DP",
  },
  {
    kind: "text",
    value:
      "، یک واحد پردازش مرکزی ایمن در برابر خطا با حافظه کاری ",
  },
  { kind: "technical", value: "2.5 MB" },
  { kind: "text", value: " است. دارای رابط‌های " },
  { kind: "technical", value: "MPI/DP" },
  { kind: "text", value: "، " },
  { kind: "technical", value: "PROFIBUS DP" },
  { kind: "text", value: " با امکان کار در نقش اصلی یا تابع، و " },
  { kind: "technical", value: "PROFINET" },
  { kind: "text", value: " مبتنی بر اترنت است." },
] as const satisfies ProductCopyParagraph;

const sm321Di16_24Vdc1Bh02Copy = [
  { kind: "text", value: "مدل " },
  {
    kind: "technical",
    value: "SIMATIC S7-300 SM 321 16 DI 24 V DC",
  },
  { kind: "text", value: "، یک ماژول ورودی دیجیتال با " },
  { kind: "technical", value: "16" },
  { kind: "text", value: " ورودی و ولتاژ ورودی " },
  { kind: "technical", value: "24 V DC" },
  { kind: "text", value: " است." },
] as const satisfies ProductCopyParagraph;

const sm321Di16_24Vdc1Bh10Copy = [
  { kind: "text", value: "مدل " },
  {
    kind: "technical",
    value: "SIMATIC S7-300 SM 321 16 DI 24 V DC HF",
  },
  { kind: "text", value: "، یک ماژول ورودی دیجیتال با " },
  { kind: "technical", value: "16" },
  { kind: "text", value: " ورودی و ولتاژ ورودی " },
  { kind: "technical", value: "24 V DC" },
  { kind: "text", value: " است." },
] as const satisfies ProductCopyParagraph;

const sm321Di32_24Vdc1Bl00Copy = [
  { kind: "text", value: "مدل " },
  {
    kind: "technical",
    value: "SIMATIC S7-300 SM 321 32 DI 24 V DC",
  },
  { kind: "text", value: "، یک ماژول ورودی دیجیتال با " },
  { kind: "technical", value: "32" },
  { kind: "text", value: " ورودی و ولتاژ ورودی " },
  { kind: "technical", value: "24 V DC" },
  { kind: "text", value: " است." },
] as const satisfies ProductCopyParagraph;

const sm321Di64_24Vdc1Bp00Copy = [
  { kind: "text", value: "مدل " },
  {
    kind: "technical",
    value: "SIMATIC S7-300 SM 321 64 DI 24 V DC",
  },
  { kind: "text", value: "، یک ماژول ورودی دیجیتال با " },
  { kind: "technical", value: "64" },
  { kind: "text", value: " ورودی و ولتاژ ورودی " },
  { kind: "technical", value: "24 V DC" },
  { kind: "text", value: " است." },
] as const satisfies ProductCopyParagraph;

const sm321Di16_48_125Vdc1Ch20Copy = [
  { kind: "text", value: "مدل " },
  {
    kind: "technical",
    value: "SIMATIC S7-300 SM 321 16 DI 48-125 V DC",
  },
  { kind: "text", value: "، یک ماژول ورودی دیجیتال با " },
  { kind: "technical", value: "16" },
  { kind: "text", value: " ورودی و ولتاژ ورودی " },
  { kind: "technical", value: "48-125 V DC" },
  { kind: "text", value: " است." },
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
  {
    productId: "siemens-s7-300-cpu-315f-2dp-6es7315-6ff04-0ab0",
    shortDescription: cpu315f2DpCopy,
    description: [cpu315f2DpCopy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-23T18:33:39Z",
      reviewedContentHash:
        "sha256:8fc714b37de5c59d78c557945706fe0fb66202ff1782e81cdbfc4c3edbc598d8",
      evidenceRef:
        "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7315-6FF04-0AB0",
      note: "Reviewed Persian wording, terminology, grammar, punctuation, spacing, direction, and typed segmentation against the canonical Product copy; approved without content changes.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-23T18:33:41Z",
      reviewedContentHash:
        "sha256:8fc714b37de5c59d78c557945706fe0fb66202ff1782e81cdbfc4c3edbc598d8",
      evidenceRef:
        "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7315-6FF04-0AB0",
      note: "Verified Product identity, MLFB, fail-safe CPU classification, work memory, interfaces, interface roles, technical tokens, and canonical Siemens source; approved without content changes.",
    },
  },
  {
    productId: "siemens-s7-300-cpu-315f-2pn-dp-6es7315-2fj14-0ab0",
    shortDescription: cpu315f2PnDpCopy,
    description: [cpu315f2PnDpCopy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-23T18:33:39Z",
      reviewedContentHash:
        "sha256:bc4e92906d0c8382cf2e79fdd5d4a8da363afef86660b3662500776670b07c6b",
      evidenceRef:
        "https://mall.industry.siemens.com/mall/en/br/Catalog/Product?SiepCountryCode=BR&mlfb=6ES7315-2FJ14-0AB0",
      note: "Reviewed Persian wording, terminology, grammar, punctuation, spacing, direction, and typed segmentation against the canonical Product copy; approved without content changes.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-23T18:33:41Z",
      reviewedContentHash:
        "sha256:bc4e92906d0c8382cf2e79fdd5d4a8da363afef86660b3662500776670b07c6b",
      evidenceRef:
        "https://mall.industry.siemens.com/mall/en/br/Catalog/Product?SiepCountryCode=BR&mlfb=6ES7315-2FJ14-0AB0",
      note: "Verified Product identity, MLFB, fail-safe CPU classification, work memory, interfaces, interface roles, technical tokens, and canonical Siemens source; approved without content changes.",
    },
  },
  {
    productId: "siemens-s7-300-cpu-317f-2dp-6es7317-6ff04-0ab0",
    shortDescription: cpu317f2DpCopy,
    description: [cpu317f2DpCopy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-23T18:33:39Z",
      reviewedContentHash:
        "sha256:669054b0662ee5211d27868ca430e6b1ad7b55756c6b3e4c05c98b678dd26372",
      evidenceRef:
        "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7317-6FF04-0AB0",
      note: "Reviewed Persian wording, terminology, grammar, punctuation, spacing, direction, and typed segmentation against the canonical Product copy; approved without content changes.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-23T18:33:41Z",
      reviewedContentHash:
        "sha256:669054b0662ee5211d27868ca430e6b1ad7b55756c6b3e4c05c98b678dd26372",
      evidenceRef:
        "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7317-6FF04-0AB0",
      note: "Verified Product identity, MLFB, fail-safe CPU classification, work memory, interfaces, interface roles, technical tokens, and canonical Siemens source; approved without content changes.",
    },
  },
  {
    productId: "siemens-s7-300-cpu-317f-2pn-dp-6es7317-2fk14-0ab0",
    shortDescription: cpu317f2PnDpCopy,
    description: [cpu317f2PnDpCopy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-23T18:33:39Z",
      reviewedContentHash:
        "sha256:db77d0008754e81a0761dc55249b647a0d89b251d78c2d71bbb680ba6bc76300",
      evidenceRef:
        "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7317-2FK14-0AB0",
      note: "Reviewed Persian wording, terminology, grammar, punctuation, spacing, direction, and typed segmentation against the canonical Product copy; approved without content changes.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-23T18:33:41Z",
      reviewedContentHash:
        "sha256:db77d0008754e81a0761dc55249b647a0d89b251d78c2d71bbb680ba6bc76300",
      evidenceRef:
        "https://mall.industry.siemens.com/mall/en/oeii/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7317-2FK14-0AB0",
      note: "Verified Product identity, MLFB, fail-safe CPU classification, work memory, interfaces, interface roles, technical tokens, and canonical Siemens source; approved without content changes.",
    },
  },
  {
    productId: "siemens-s7-300-cpu-319f-3pn-dp-3fl01-0ab0",
    shortDescription: cpu319f3PnDpCopy,
    description: [cpu319f3PnDpCopy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-23T18:33:39Z",
      reviewedContentHash:
        "sha256:b94828a69f8ffc1b03b357451e4d3f03550120f746636c80fd768a1dd41f48cf",
      evidenceRef:
        "https://mall.industry.siemens.com/mall/en/inosatavtomatica/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7318-3FL01-0AB0",
      note: "Reviewed Persian wording, terminology, grammar, punctuation, spacing, direction, and typed segmentation against the canonical Product copy; approved without content changes.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-23T18:33:41Z",
      reviewedContentHash:
        "sha256:b94828a69f8ffc1b03b357451e4d3f03550120f746636c80fd768a1dd41f48cf",
      evidenceRef:
        "https://mall.industry.siemens.com/mall/en/inosatavtomatica/Catalog/Product?SiepCountryCode=OE&mlfb=6ES7318-3FL01-0AB0",
      note: "Verified Product identity, MLFB, fail-safe CPU classification, work memory, interfaces, interface roles, technical tokens, and canonical Siemens source; approved without content changes.",
    },
  },
  {
    productId: "siemens-s7-300-sm321-di-16-24vdc-1bh02-0aa0",
    shortDescription: sm321Di16_24Vdc1Bh02Copy,
    description: [sm321Di16_24Vdc1Bh02Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-24T18:38:52Z",
      reviewedContentHash: "sha256:1057b0253160356d5add3c8ce7639116fae7c8af48ccdc2630b7d648da29d410",
      evidenceRef: "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7321-1BH02-0AA0",
      note: "Reviewed Persian grammar, punctuation, spacing, NFC, Persian ی/ک, and typed LTR segments in RTL copy; approved without content changes.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-24T18:38:53Z",
      reviewedContentHash: "sha256:1057b0253160356d5add3c8ce7639116fae7c8af48ccdc2630b7d648da29d410",
      evidenceRef: "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7321-1BH02-0AA0",
      note: "Verified title against the canonical Product and input count and voltage against indexed exact-product Siemens datasheet content. Direct PDF returned HTTP 403; delay, diagnostics, and interrupts were not reviewed.",
    },
  },
  {
    productId: "siemens-s7-300-sm321-di-16-24vdc-1bh10-0aa0",
    shortDescription: sm321Di16_24Vdc1Bh10Copy,
    description: [sm321Di16_24Vdc1Bh10Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-24T18:38:52Z",
      reviewedContentHash: "sha256:5d64c61a0fb7f9c62e3ee9eda046b1a4337fe751694fe4096378c0b5f714dd07",
      evidenceRef: "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7321-1BH10-0AA0",
      note: "Reviewed Persian grammar, punctuation, spacing, NFC, Persian ی/ک, and typed LTR segments in RTL copy; approved without content changes.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-24T18:38:53Z",
      reviewedContentHash: "sha256:5d64c61a0fb7f9c62e3ee9eda046b1a4337fe751694fe4096378c0b5f714dd07",
      evidenceRef: "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7321-1BH10-0AA0",
      note: "Verified title against the canonical Product and input count and voltage against indexed exact-product Siemens datasheet content. Direct PDF returned HTTP 403; delay, diagnostics, and interrupts were not reviewed.",
    },
  },
  {
    productId: "siemens-s7-300-sm321-di-32-24vdc-1bl00-0aa0",
    shortDescription: sm321Di32_24Vdc1Bl00Copy,
    description: [sm321Di32_24Vdc1Bl00Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-24T18:38:52Z",
      reviewedContentHash: "sha256:5554a0e19f15bccce5c689fde62b5669189267143a09d41ef3fbc699d4c9430b",
      evidenceRef: "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7321-1BL00-0AA0",
      note: "Reviewed Persian grammar, punctuation, spacing, NFC, Persian ی/ک, and typed LTR segments in RTL copy; approved without content changes.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-24T18:38:53Z",
      reviewedContentHash: "sha256:5554a0e19f15bccce5c689fde62b5669189267143a09d41ef3fbc699d4c9430b",
      evidenceRef: "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7321-1BL00-0AA0",
      note: "Verified title against the canonical Product and input count and voltage against indexed exact-product Siemens datasheet content. Direct PDF returned HTTP 403; delay, diagnostics, and interrupts were not reviewed.",
    },
  },
  {
    productId: "siemens-s7-300-sm321-di-64-24vdc-1bp00-0aa0",
    shortDescription: sm321Di64_24Vdc1Bp00Copy,
    description: [sm321Di64_24Vdc1Bp00Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-24T18:38:52Z",
      reviewedContentHash: "sha256:f276c29b5ef82e5567ed10c70d07080b54fdd7ae2a0bb48783cb3215638e765b",
      evidenceRef: "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7321-1BP00-0AA0",
      note: "Reviewed Persian grammar, punctuation, spacing, NFC, Persian ی/ک, and typed LTR segments in RTL copy; approved without content changes.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-24T18:38:53Z",
      reviewedContentHash: "sha256:f276c29b5ef82e5567ed10c70d07080b54fdd7ae2a0bb48783cb3215638e765b",
      evidenceRef: "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7321-1BP00-0AA0",
      note: "Verified title against the canonical Product and input count and voltage against indexed exact-product Siemens datasheet content. Direct PDF returned HTTP 403; delay, diagnostics, and interrupts were not reviewed.",
    },
  },
  {
    productId: "siemens-s7-300-sm321-di-16-48-125vdc-1ch20-0aa0",
    shortDescription: sm321Di16_48_125Vdc1Ch20Copy,
    description: [sm321Di16_48_125Vdc1Ch20Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-24T18:38:52Z",
      reviewedContentHash: "sha256:fd3901cc3a5c3f3ba356b2beaf2d46935fafa4b525b062efca63ff3db62fa754",
      evidenceRef: "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7321-1CH20-0AA0",
      note: "Reviewed Persian grammar, punctuation, spacing, NFC, Persian ی/ک, and typed LTR segments in RTL copy; approved without content changes.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-24T18:38:53Z",
      reviewedContentHash: "sha256:fd3901cc3a5c3f3ba356b2beaf2d46935fafa4b525b062efca63ff3db62fa754",
      evidenceRef: "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7321-1CH20-0AA0",
      note: "Verified title against the canonical Product and input count and voltage against indexed exact-product Siemens datasheet content. Direct PDF returned HTTP 403; delay, diagnostics, and interrupts were not reviewed.",
    },
  },
] as const satisfies readonly PersianProductCopyOverlay[];
