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
    value: "، یک واحد پردازش مرکزی ایمن در برابر خطا با حافظه کاری ",
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
    value: "، یک واحد پردازش مرکزی ایمن در برابر خطا با حافظه کاری ",
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
    value: "، یک واحد پردازش مرکزی ایمن در برابر خطا با حافظه کاری ",
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
    value: "، یک واحد پردازش مرکزی ایمن در برابر خطا با حافظه کاری ",
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
    value: "، یک واحد پردازش مرکزی ایمن در برابر خطا با حافظه کاری ",
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

const sm321Di16_24_48Vacdc1Ch00Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "SIMATIC S7-300 SM 321 16 DI 24-48 V AC/DC" },
  { kind: "text", value: "، ماژول ورودی دیجیتال با " },
  { kind: "technical", value: "16" },
  { kind: "text", value: " ورودی است." },
] as const satisfies ProductCopyParagraph;

const sm321Di32_120Vac1El00Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "SIMATIC S7-300 SM 321 32 DI 120 V AC" },
  { kind: "text", value: "، ماژول ورودی دیجیتال با " },
  { kind: "technical", value: "32" },
  { kind: "text", value: " ورودی است. ولتاژ نامی ورودی آن " },
  { kind: "technical", value: "120 V AC" },
  { kind: "text", value: " است." },
] as const satisfies ProductCopyParagraph;

const sm321Di8_120_230Vac1Ff01Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "SIMATIC S7-300 SM 321 8 DI 120/230 V AC" },
  { kind: "text", value: "، ماژول ورودی دیجیتال با " },
  { kind: "technical", value: "8" },
  { kind: "text", value: " ورودی است. ولتاژهای نامی ورودی آن " },
  { kind: "technical", value: "120/230 V AC" },
  { kind: "text", value: " هستند." },
] as const satisfies ProductCopyParagraph;

const sm321Di8_120_230Vac1Ff10Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "SIMATIC S7-300 SM 321 8 DI 120/230 V AC" },
  { kind: "text", value: "، ماژول ورودی دیجیتال با " },
  { kind: "technical", value: "8" },
  { kind: "text", value: " ورودی است. ولتاژهای نامی ورودی آن " },
  { kind: "technical", value: "120/230 V AC" },
  { kind: "text", value: " هستند." },
] as const satisfies ProductCopyParagraph;

const sm321Di16_120_230Vac1Fh00Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "SIMATIC S7-300 SM 321 16 DI 120/230 V AC" },
  { kind: "text", value: "، ماژول ورودی دیجیتال با " },
  { kind: "technical", value: "16" },
  { kind: "text", value: " ورودی است. ولتاژهای نامی ورودی آن " },
  { kind: "technical", value: "120/230 V AC" },
  { kind: "text", value: " هستند." },
] as const satisfies ProductCopyParagraph;

const sm321Di16_24Vdc7Bh01Copy = [
  { kind: "text", value: "مدل " },
  {
    kind: "technical",
    value: "SIMATIC S7-300 SM 321 16 DI 24 V DC HF Diagnostics",
  },
  { kind: "text", value: "، ماژول ورودی دیجیتال با " },
  { kind: "technical", value: "16" },
  { kind: "text", value: " ورودی است." },
] as const satisfies ProductCopyParagraph;

const sm321Di16_24_125Vdc7Eh00Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "SIMATIC S7-300 SM 321 16 DI 24/125 V DC" },
  { kind: "text", value: "، ماژول ورودی دیجیتال با " },
  { kind: "technical", value: "16" },
  { kind: "text", value: " ورودی است." },
] as const satisfies ProductCopyParagraph;

const sm321Di16_24Vdc7Th00Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "SIMATIC S7-300 SM 321 16 DI 24 V DC NAMUR" },
  { kind: "text", value: "، ماژول ورودی دیجیتال با " },
  { kind: "technical", value: "16" },
  { kind: "text", value: " ورودی است." },
] as const satisfies ProductCopyParagraph;

const sm321Di16_24Vdc1Bh50Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "SIMATIC S7-300 SM 321 16 DI 24 V DC Sourcing" },
  { kind: "text", value: "، ماژول ورودی دیجیتال با " },
  { kind: "technical", value: "16" },
  { kind: "text", value: " ورودی است." },
] as const satisfies ProductCopyParagraph;

const sm321Di16_24Vdc7Bh00Copy = [
  { kind: "text", value: "مدل " },
  {
    kind: "technical",
    value: "SIMATIC S7-300 SM 321 16 DI 24 V DC Diagnostics",
  },
  { kind: "text", value: "، ماژول ورودی دیجیتال با " },
  { kind: "technical", value: "16" },
  { kind: "text", value: " ورودی است." },
] as const satisfies ProductCopyParagraph;

const sm321Di4_24VdcNamur7Rd00Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "SIMATIC S7-300 SM 321 4 DI 24 V DC NAMUR" },
  { kind: "text", value: "، ماژول ورودی دیجیتال با " },
  { kind: "technical", value: "4" },
  { kind: "text", value: " ورودی است." },
] as const satisfies ProductCopyParagraph;

const sm322Do8_24Vdc1Bf01Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "SIMATIC S7-300 SM 322 8 DO 24 V DC" },
  { kind: "text", value: "، ماژول خروجی دیجیتال با " },
  { kind: "technical", value: "8" },
  { kind: "text", value: " خروجی است." },
] as const satisfies ProductCopyParagraph;

const sm322Do16_24Vdc1Bh01Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "SIMATIC S7-300 SM 322 16 DO 24 V DC" },
  { kind: "text", value: "، ماژول خروجی دیجیتال با " },
  { kind: "technical", value: "16" },
  { kind: "text", value: " خروجی است." },
] as const satisfies ProductCopyParagraph;

const sm322Do16_24Vdc1Bh10Copy = [
  { kind: "text", value: "مدل " },
  {
    kind: "technical",
    value: "SIMATIC S7-300 SM 322 High Speed 16 DO 24 V DC",
  },
  { kind: "text", value: "، ماژول خروجی دیجیتال با " },
  { kind: "technical", value: "16" },
  { kind: "text", value: " خروجی است." },
] as const satisfies ProductCopyParagraph;

const sm322Do32_24Vdc1Bl00Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "SIMATIC S7-300 SM 322 32 DO 24 V DC" },
  { kind: "text", value: "، ماژول خروجی دیجیتال با " },
  { kind: "technical", value: "32" },
  { kind: "text", value: " خروجی است." },
] as const satisfies ProductCopyParagraph;

const sm322Do16_120_230Vac1Fh00Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "SIMATIC S7-300 SM 322 16 DO 120/230 V AC" },
  { kind: "text", value: "، ماژول خروجی دیجیتال با " },
  { kind: "technical", value: "16" },
  { kind: "text", value: " خروجی است." },
] as const satisfies ProductCopyParagraph;

const sm322Do16_24_48VacDc5Gh00Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "SIMATIC S7-300 SM 322 16 DO 24-48 V AC/DC" },
  { kind: "text", value: "، ماژول خروجی دیجیتال با " },
  { kind: "technical", value: "16" },
  { kind: "text", value: " خروجی است." },
] as const satisfies ProductCopyParagraph;

const sm322Do8Relay1Hf01Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "SIMATIC S7-300 SM 322 8 DO Relay" },
  { kind: "text", value: "، ماژول خروجی دیجیتال با " },
  { kind: "technical", value: "8" },
  { kind: "text", value: " خروجی است." },
] as const satisfies ProductCopyParagraph;

const sm322Do8Relay5A1Hf10Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "SIMATIC S7-300 SM 322 8 DO Relay 5 A" },
  { kind: "text", value: "، ماژول خروجی دیجیتال با " },
  { kind: "technical", value: "8" },
  { kind: "text", value: " خروجی است." },
] as const satisfies ProductCopyParagraph;

const sm322Do16Relay1Hh01Copy = [
  { kind: "text", value: "مدل " },
  {
    kind: "technical",
    value: "SIMATIC S7-300 SM 322 16 DO Relay 120 V DC / 230 V AC",
  },
  { kind: "text", value: "، ماژول خروجی دیجیتال با " },
  { kind: "technical", value: "16" },
  { kind: "text", value: " خروجی است." },
] as const satisfies ProductCopyParagraph;

const sm322Do8_120_230Vac5Ff00Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "SIMATIC S7-300 SM 322 8 DO 120/230 V AC" },
  { kind: "text", value: "، ماژول خروجی دیجیتال با " },
  { kind: "technical", value: "8" },
  { kind: "text", value: " خروجی است." },
] as const satisfies ProductCopyParagraph;

const sm322Do32_120_230Vac1Fl00Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "SIMATIC S7-300 SM 322 32 DO 120/230 V AC" },
  { kind: "text", value: "، ماژول خروجی دیجیتال با " },
  { kind: "technical", value: "32" },
  { kind: "text", value: " خروجی است." },
] as const satisfies ProductCopyParagraph;

const sm322Do64_24Vdc1Bp00Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "SIMATIC S7-300 SM 322 64 DO 24 V DC" },
  { kind: "text", value: "، ماژول خروجی دیجیتال با " },
  { kind: "technical", value: "64" },
  { kind: "text", value: " خروجی است." },
] as const satisfies ProductCopyParagraph;

const sm322Do64_24VdcSinking1Bp50Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "SIMATIC S7-300 SM 322 64 DO 24 V DC Sinking" },
  { kind: "text", value: "، ماژول خروجی دیجیتال با " },
  { kind: "technical", value: "64" },
  { kind: "text", value: " خروجی است." },
] as const satisfies ProductCopyParagraph;

const sm322Do16_24VdcDiagnostics8Bh10Copy = [
  { kind: "text", value: "مدل " },
  {
    kind: "technical",
    value: "SIMATIC S7-300 SM 322 16 DO 24 V DC Diagnostics",
  },
  { kind: "text", value: "، ماژول خروجی دیجیتال با " },
  { kind: "technical", value: "16" },
  { kind: "text", value: " خروجی است." },
] as const satisfies ProductCopyParagraph;

const sm322Do4Ex5Rd00Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "SIMATIC S7-300 SM 322 4 DO 15 V / 20 mA Ex" },
  { kind: "text", value: "، ماژول خروجی دیجیتال با " },
  { kind: "technical", value: "4" },
  { kind: "text", value: " خروجی است." },
] as const satisfies ProductCopyParagraph;

const sm322Do4Ex5Sd00Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "SIMATIC S7-300 SM 322 4 DO 24 V DC / 10 mA Ex" },
  { kind: "text", value: "، ماژول خروجی دیجیتال با " },
  { kind: "technical", value: "4" },
  { kind: "text", value: " خروجی است." },
] as const satisfies ProductCopyParagraph;

const sm322Do8Diagnostics8Bf00Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "SIMATIC S7-300 SM 322 8 DO 24 V DC Diagnostics" },
  { kind: "text", value: "، ماژول خروجی دیجیتال با " },
  { kind: "technical", value: "8" },
  { kind: "text", value: " خروجی است." },
] as const satisfies ProductCopyParagraph;

const sm322Do8_48_125Vdc1Cf00Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "SIMATIC S7-300 SM 322 8 DO 48/125 V DC" },
  { kind: "text", value: "، ماژول خروجی دیجیتال با " },
  { kind: "technical", value: "8" },
  { kind: "text", value: " خروجی است." },
] as const satisfies ProductCopyParagraph;

const sm322Do8RelayRc5Hf00Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "SIMATIC S7-300 SM 322 8 DO Relay 230 V AC 5 A RC" },
  { kind: "text", value: "، ماژول خروجی دیجیتال با " },
  { kind: "technical", value: "8" },
  { kind: "text", value: " خروجی است." },
] as const satisfies ProductCopyParagraph;

const sm323Di8Do8_1Bh01Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "SIMATIC S7-300 SM 323 8 DI / 8 DO 24 V DC" },
  { kind: "text", value: "، ماژول ورودی و خروجی دیجیتال با " },
  { kind: "technical", value: "8" },
  { kind: "text", value: " ورودی و " },
  { kind: "technical", value: "8" },
  { kind: "text", value: " خروجی است." },
] as const satisfies ProductCopyParagraph;

const sm323Di16Do16_1Bl00Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "SIMATIC S7-300 SM 323 16 DI / 16 DO 24 V DC" },
  { kind: "text", value: "، ماژول ورودی و خروجی دیجیتال با " },
  { kind: "technical", value: "16" },
  { kind: "text", value: " ورودی و " },
  { kind: "technical", value: "16" },
  { kind: "text", value: " خروجی است." },
] as const satisfies ProductCopyParagraph;

const sm327Di8Dx8_1Bh00Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "SIMATIC S7-300 SM 327 8 DI / 8 DX 24 V DC" },
  { kind: "text", value: "، ماژول ورودی و خروجی دیجیتال با " },
  { kind: "technical", value: "8" },
  { kind: "text", value: " ورودی ثابت و " },
  { kind: "technical", value: "8" },
  {
    kind: "text",
    value: " کانال قابل پیکربندی به‌صورت ورودی یا خروجی است.",
  },
] as const satisfies ProductCopyParagraph;

const sm331MlfbOnly7Kb02Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "6ES7331-7KB02-0AB0" },
  { kind: "text", value: "، ماژول ورودی آنالوگ است." },
] as const satisfies ProductCopyParagraph;

const sm331Ai8_13Bit1Kf01Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "SIMATIC S7-300 SM 331 8 AI 13 Bit" },
  { kind: "text", value: "، ماژول ورودی آنالوگ با " },
  { kind: "technical", value: "8" },
  { kind: "text", value: " ورودی است." },
] as const satisfies ProductCopyParagraph;

const sm331MlfbOnly1Kf02Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "6ES7331-1KF02-0AB0" },
  { kind: "text", value: "، ماژول ورودی آنالوگ است." },
] as const satisfies ProductCopyParagraph;

const sm331MlfbOnly7Kf02Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "6ES7331-7KF02-0AB0" },
  { kind: "text", value: "، ماژول ورودی آنالوگ است." },
] as const satisfies ProductCopyParagraph;

const sm331MlfbOnly7Hf01Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "6ES7331-7HF01-0AB0" },
  { kind: "text", value: "، ماژول ورودی آنالوگ است." },
] as const satisfies ProductCopyParagraph;

const sm331MlfbOnly7Nf00Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "6ES7331-7NF00-0AB0" },
  { kind: "text", value: "، ماژول ورودی آنالوگ است." },
] as const satisfies ProductCopyParagraph;

const sm331MlfbOnly7Nf10Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "6ES7331-7NF10-0AB0" },
  { kind: "text", value: "، ماژول ورودی آنالوگ است." },
] as const satisfies ProductCopyParagraph;

const sm331MlfbOnly7Pf01Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "6ES7331-7PF01-0AB0" },
  { kind: "text", value: "، ماژول ورودی آنالوگ است." },
] as const satisfies ProductCopyParagraph;

const sm331MlfbOnly7Pe10Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "6ES7331-7PE10-0AB0" },
  { kind: "text", value: "، ماژول ورودی آنالوگ است." },
] as const satisfies ProductCopyParagraph;

const sm331MlfbOnly7Pf11Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "6ES7331-7PF11-0AB0" },
  { kind: "text", value: "، ماژول ورودی آنالوگ است." },
] as const satisfies ProductCopyParagraph;

const sm331MlfbOnly7Rd00Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "6ES7331-7RD00-0AB0" },
  { kind: "text", value: "، ماژول ورودی آنالوگ است." },
] as const satisfies ProductCopyParagraph;

const sm331MlfbOnly7Sf00Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "6ES7331-7SF00-0AB0" },
  { kind: "text", value: "، ماژول ورودی آنالوگ است." },
] as const satisfies ProductCopyParagraph;

const sm331MlfbOnly7Tb00Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "6ES7331-7TB00-0AB0" },
  { kind: "text", value: "، ماژول ورودی آنالوگ است." },
] as const satisfies ProductCopyParagraph;

const sm331MlfbOnly7Tf01Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "6ES7331-7TF01-0AB0" },
  { kind: "text", value: "، ماژول ورودی آنالوگ است." },
] as const satisfies ProductCopyParagraph;

const sm332MlfbOnly5Hb01Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "6ES7332-5HB01-0AB0" },
  { kind: "text", value: "، ماژول خروجی آنالوگ است." },
] as const satisfies ProductCopyParagraph;

const sm332MlfbOnly5Hd01Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "6ES7332-5HD01-0AB0" },
  { kind: "text", value: "، ماژول خروجی آنالوگ است." },
] as const satisfies ProductCopyParagraph;

const sm332MlfbOnly5Hf00Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "6ES7332-5HF00-0AB0" },
  { kind: "text", value: "، ماژول خروجی آنالوگ است." },
] as const satisfies ProductCopyParagraph;

const sm332MlfbOnly7Nd02Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "6ES7332-7ND02-0AB0" },
  { kind: "text", value: "، ماژول خروجی آنالوگ است." },
] as const satisfies ProductCopyParagraph;

const sm332MlfbOnly5Rd00Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "6ES7332-5RD00-0AB0" },
  { kind: "text", value: "، ماژول خروجی آنالوگ است." },
] as const satisfies ProductCopyParagraph;

const sm332MlfbOnly5Tb00Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "6ES7332-5TB00-0AB0" },
  { kind: "text", value: "، ماژول خروجی آنالوگ است." },
] as const satisfies ProductCopyParagraph;

const sm332MlfbOnly8Tf01Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "6ES7332-8TF01-0AB0" },
  { kind: "text", value: "، ماژول خروجی آنالوگ است." },
] as const satisfies ProductCopyParagraph;

const siplusSm332MlfbOnly5Hb01Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "6AG1332-5HB01-2AB0" },
  { kind: "text", value: "، ماژول خروجی آنالوگ است." },
] as const satisfies ProductCopyParagraph;

const siplusSm332MlfbOnly5Hf00Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "6AG1332-5HF00-2AB0" },
  { kind: "text", value: "، ماژول خروجی آنالوگ است." },
] as const satisfies ProductCopyParagraph;

const sm334MlfbOnly0Ce01Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "6ES7334-0CE01-0AA0" },
  { kind: "text", value: "، ماژول ورودی و خروجی آنالوگ است." },
] as const satisfies ProductCopyParagraph;

const sm334MlfbOnly0Ke00Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "6ES7334-0KE00-0AB0" },
  { kind: "text", value: "، ماژول ورودی و خروجی آنالوگ است." },
] as const satisfies ProductCopyParagraph;

const siplusSm334MlfbOnly0Ke00Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "6AG1334-0KE00-7AB0" },
  { kind: "text", value: "، ماژول ورودی و خروجی آنالوگ است." },
] as const satisfies ProductCopyParagraph;

const sm335MlfbOnly7Hg01Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "6ES7335-7HG01-0AB0" },
  { kind: "text", value: "، ماژول ورودی و خروجی آنالوگ است." },
] as const satisfies ProductCopyParagraph;

const sm335MlfbOnly7Hg02Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "6ES7335-7HG02-0AB0" },
  { kind: "text", value: "، ماژول ورودی و خروجی آنالوگ است." },
] as const satisfies ProductCopyParagraph;

const im360MlfbOnly3Aa01Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "6ES7360-3AA01-0AA0" },
  { kind: "text", value: "، ماژول رابط است." },
] as const satisfies ProductCopyParagraph;

const im361MlfbOnly3Ca01Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "6ES7361-3CA01-0AA0" },
  { kind: "text", value: "، ماژول رابط است." },
] as const satisfies ProductCopyParagraph;

const im365MlfbOnly0Ba01Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "6ES7365-0BA01-0AA0" },
  { kind: "text", value: "، ماژول رابط است." },
] as const satisfies ProductCopyParagraph;

const im365MlfbOnly0Ba81Copy = [
  { kind: "text", value: "مدل " },
  { kind: "technical", value: "6ES7365-0BA81-0AA0" },
  { kind: "text", value: "، ماژول رابط است." },
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
      reviewedContentHash:
        "sha256:1057b0253160356d5add3c8ce7639116fae7c8af48ccdc2630b7d648da29d410",
      evidenceRef:
        "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7321-1BH02-0AA0",
      note: "Reviewed Persian grammar, punctuation, spacing, NFC, Persian ی/ک, and typed LTR segments in RTL copy; approved without content changes.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-24T18:38:53Z",
      reviewedContentHash:
        "sha256:1057b0253160356d5add3c8ce7639116fae7c8af48ccdc2630b7d648da29d410",
      evidenceRef:
        "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7321-1BH02-0AA0",
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
      reviewedContentHash:
        "sha256:5d64c61a0fb7f9c62e3ee9eda046b1a4337fe751694fe4096378c0b5f714dd07",
      evidenceRef:
        "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7321-1BH10-0AA0",
      note: "Reviewed Persian grammar, punctuation, spacing, NFC, Persian ی/ک, and typed LTR segments in RTL copy; approved without content changes.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-24T18:38:53Z",
      reviewedContentHash:
        "sha256:5d64c61a0fb7f9c62e3ee9eda046b1a4337fe751694fe4096378c0b5f714dd07",
      evidenceRef:
        "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7321-1BH10-0AA0",
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
      reviewedContentHash:
        "sha256:5554a0e19f15bccce5c689fde62b5669189267143a09d41ef3fbc699d4c9430b",
      evidenceRef:
        "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7321-1BL00-0AA0",
      note: "Reviewed Persian grammar, punctuation, spacing, NFC, Persian ی/ک, and typed LTR segments in RTL copy; approved without content changes.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-24T18:38:53Z",
      reviewedContentHash:
        "sha256:5554a0e19f15bccce5c689fde62b5669189267143a09d41ef3fbc699d4c9430b",
      evidenceRef:
        "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7321-1BL00-0AA0",
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
      reviewedContentHash:
        "sha256:f276c29b5ef82e5567ed10c70d07080b54fdd7ae2a0bb48783cb3215638e765b",
      evidenceRef:
        "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7321-1BP00-0AA0",
      note: "Reviewed Persian grammar, punctuation, spacing, NFC, Persian ی/ک, and typed LTR segments in RTL copy; approved without content changes.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-24T18:38:53Z",
      reviewedContentHash:
        "sha256:f276c29b5ef82e5567ed10c70d07080b54fdd7ae2a0bb48783cb3215638e765b",
      evidenceRef:
        "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7321-1BP00-0AA0",
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
      reviewedContentHash:
        "sha256:fd3901cc3a5c3f3ba356b2beaf2d46935fafa4b525b062efca63ff3db62fa754",
      evidenceRef:
        "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7321-1CH20-0AA0",
      note: "Reviewed Persian grammar, punctuation, spacing, NFC, Persian ی/ک, and typed LTR segments in RTL copy; approved without content changes.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-24T18:38:53Z",
      reviewedContentHash:
        "sha256:fd3901cc3a5c3f3ba356b2beaf2d46935fafa4b525b062efca63ff3db62fa754",
      evidenceRef:
        "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7321-1CH20-0AA0",
      note: "Verified title against the canonical Product and input count and voltage against indexed exact-product Siemens datasheet content. Direct PDF returned HTTP 403; delay, diagnostics, and interrupts were not reviewed.",
    },
  },
  {
    productId: "siemens-s7-300-sm321-di-16-24-48vacdc-1ch00-0aa0",
    shortDescription: sm321Di16_24_48Vacdc1Ch00Copy,
    description: [sm321Di16_24_48Vacdc1Ch00Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-27T19:51:43Z",
      reviewedContentHash:
        "sha256:d7877cc55cc166b4cff3e96961b8c05e88a06cc38f1567ffafe558484175d632",
      evidenceRef:
        "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7321-1CH00-0AA0",
      note: "Reviewed concise Persian identity and input-count wording, grammar, punctuation, spacing, NFC, Persian ی/ک, and typed LTR segments in RTL copy.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-27T19:51:44Z",
      reviewedContentHash:
        "sha256:d7877cc55cc166b4cff3e96961b8c05e88a06cc38f1567ffafe558484175d632",
      evidenceRef:
        "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7321-1CH00-0AA0",
      note: "Reviewed exact 1CH00 identity, canonical title, and 16 inputs using Siemens-indexed exact-product datasheet text and available Siemens product HTML. Direct PDF access returned HTTP 403 during review. The removed separate voltage sentence and lifecycle were not approved.",
    },
  },
  {
    productId: "siemens-s7-300-sm321-di-32-120vac-1el00-0aa0",
    shortDescription: sm321Di32_120Vac1El00Copy,
    description: [sm321Di32_120Vac1El00Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-27T19:51:43Z",
      reviewedContentHash:
        "sha256:ac298cff5d66e725944026417f976f0237650bc356ad50cce678f57d0e42a4e5",
      evidenceRef:
        "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7321-1EL00-0AA0",
      note: "Reviewed Persian wording, grammar, punctuation, spacing, NFC, Persian ی/ک, and typed LTR segments in RTL copy.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-27T19:51:44Z",
      reviewedContentHash:
        "sha256:ac298cff5d66e725944026417f976f0237650bc356ad50cce678f57d0e42a4e5",
      evidenceRef:
        "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7321-1EL00-0AA0",
      note: "Reviewed exact 1EL00 identity, 32 inputs, and rated 120 V AC using Siemens-indexed exact-product datasheet text and available Siemens product HTML. Direct PDF access returned HTTP 403 during review. No lifecycle or other feature claim was approved.",
    },
  },
  {
    productId: "siemens-s7-300-sm321-di-8-120-230vac-1ff01-0aa0",
    shortDescription: sm321Di8_120_230Vac1Ff01Copy,
    description: [sm321Di8_120_230Vac1Ff01Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-27T19:51:43Z",
      reviewedContentHash:
        "sha256:42084ab3fc1652eac520c5bbabd0c034f91f3398dceb97525737754190534765",
      evidenceRef:
        "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7321-1FF01-0AA0",
      note: "Reviewed Persian rated-value wording, grammar, punctuation, spacing, NFC, Persian ی/ک, and typed LTR segments in RTL copy.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-27T19:51:44Z",
      reviewedContentHash:
        "sha256:42084ab3fc1652eac520c5bbabd0c034f91f3398dceb97525737754190534765",
      evidenceRef:
        "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7321-1FF01-0AA0",
      note: "Reviewed exact 1FF01 identity, 8 inputs, and rated 120/230 V AC using Siemens-indexed exact-product datasheet text and available Siemens product HTML; distinguished 1FF10 by Product ID. Direct PDF access returned HTTP 403 during review. No lifecycle or other feature claim was approved.",
    },
  },
  {
    productId: "siemens-s7-300-sm321-di-8-120-230vac-1ff10-0aa0",
    shortDescription: sm321Di8_120_230Vac1Ff10Copy,
    description: [sm321Di8_120_230Vac1Ff10Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-27T19:51:43Z",
      reviewedContentHash:
        "sha256:71defd1d6395a23a116bf19da498e4d9f0c40335b1a520e1294177208830f3f9",
      evidenceRef:
        "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7321-1FF10-0AA0",
      note: "Reviewed Persian rated-value wording, grammar, punctuation, spacing, NFC, Persian ی/ک, and typed LTR segments in RTL copy.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-27T19:51:44Z",
      reviewedContentHash:
        "sha256:71defd1d6395a23a116bf19da498e4d9f0c40335b1a520e1294177208830f3f9",
      evidenceRef:
        "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7321-1FF10-0AA0",
      note: "Reviewed exact 1FF10 identity, 8 inputs, and rated 120/230 V AC using Siemens-indexed exact-product datasheet text and available Siemens product HTML; distinguished 1FF01 by Product ID. Direct PDF access returned HTTP 403 during review. Current lifecycle remains unknown and was neither claimed nor approved.",
    },
  },
  {
    productId: "siemens-s7-300-sm321-di-16-120-230vac-1fh00-0aa0",
    shortDescription: sm321Di16_120_230Vac1Fh00Copy,
    description: [sm321Di16_120_230Vac1Fh00Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-27T19:51:43Z",
      reviewedContentHash:
        "sha256:659f93e6818797378f02e46b89a8561f2722804b28b874a42801a442b1214a74",
      evidenceRef:
        "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7321-1FH00-0AA0",
      note: "Reviewed Persian rated-value wording, grammar, punctuation, spacing, NFC, Persian ی/ک, and typed LTR segments in RTL copy.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-09-27T19:51:44Z",
      reviewedContentHash:
        "sha256:659f93e6818797378f02e46b89a8561f2722804b28b874a42801a442b1214a74",
      evidenceRef:
        "https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7321-1FH00-0AA0",
      note: "Reviewed exact 1FH00 identity, 16 inputs, and rated 120/230 V AC using Siemens-indexed exact-product datasheet text and available Siemens product HTML. Direct PDF access returned HTTP 403 during review. No lifecycle or other feature claim was approved.",
    },
  },
  {
    productId: "siemens-s7-300-sm321-di-16-24vdc-diagnostics-7bh01-0ab0",
    shortDescription: sm321Di16_24Vdc7Bh01Copy,
    description: [sm321Di16_24Vdc7Bh01Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-10-01T17:45:15Z",
      reviewedContentHash:
        "sha256:317aa317e2a9b3cab8b8f032cb3b307097c6a4452ff51a9ee986361235f95de7",
      evidenceRef:
        "https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf",
      note: "Reviewed 6ES7321-7BH01-0AB0 Persian identity and sixteen-input wording, spacing, Persian comma and final period, NFC and Persian yeh/kaf; the complete Latin title and numeric 16 remain separate typed LTR segments.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-10-01T17:45:26Z",
      reviewedContentHash:
        "sha256:317aa317e2a9b3cab8b8f032cb3b307097c6a4452ff51a9ee986361235f95de7",
      evidenceRef:
        "https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf",
      note: "Reviewed exact 6ES7321-7BH01-0AB0: Module Data section 3.11, printed pp73-74. HF operation remains conditional; retaining the title does not approve unconditional HF behavior. Previously reviewed parsed cache-PDF text; visual page verification unavailable. Approves only identity, digital-input type and 16 inputs; the full canonical title is an identifier. No standalone voltage, lifecycle, availability, compatibility, operating-feature or unrelated specification is approved.",
    },
  },
  {
    productId: "siemens-s7-300-sm321-di-16-24-125vdc-7eh00-0ab0",
    shortDescription: sm321Di16_24_125Vdc7Eh00Copy,
    description: [sm321Di16_24_125Vdc7Eh00Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-10-01T17:45:15Z",
      reviewedContentHash:
        "sha256:b2fff655b1ac061b629dc798892a262f4e14cf5bc8bb46cf7afa26b95113eb08",
      evidenceRef:
        "https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf",
      note: "Reviewed 6ES7321-7EH00-0AB0 Persian identity and sixteen-input wording, spacing, Persian comma and final period, NFC and Persian yeh/kaf; the complete Latin title and numeric 16 remain separate typed LTR segments.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-10-01T17:45:26Z",
      reviewedContentHash:
        "sha256:b2fff655b1ac061b629dc798892a262f4e14cf5bc8bb46cf7afa26b95113eb08",
      evidenceRef:
        "https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf",
      note: "Reviewed exact 6ES7321-7EH00-0AB0: Module Data section 3.12, printed pp84-85. Previously reviewed parsed cache-PDF text; visual page verification unavailable. Approves only identity, digital-input type and 16 inputs; the full canonical title is an identifier. No standalone voltage, lifecycle, availability, compatibility, operating-feature or unrelated specification is approved.",
    },
  },
  {
    productId: "siemens-s7-300-sm321-di-16-24vdc-namur-7th00-0ab0",
    shortDescription: sm321Di16_24Vdc7Th00Copy,
    description: [sm321Di16_24Vdc7Th00Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-10-01T17:45:15Z",
      reviewedContentHash:
        "sha256:e5fd7c58fefaf24781f555ae6048689d8ac47dc50d5299c5f543bfe5f8d8d49b",
      evidenceRef:
        "https://cache.industry.siemens.com/dl/files/812/7215812/att_81952/v1/Signalbaugruppen_EN_en-US.pdf; https://cache.industry.siemens.com/dl/files/726/23060726/att_66629/v1/23060726_s7-300_kabel_und_zubehoer_zuordnung_stecker_baugruppe_d.pdf",
      note: "Reviewed 6ES7321-7TH00-0AB0 Persian identity and sixteen-input wording, spacing, Persian comma and final period, NFC and Persian yeh/kaf; the complete Latin title and numeric 16 remain separate typed LTR segments.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-10-01T17:45:26Z",
      reviewedContentHash:
        "sha256:e5fd7c58fefaf24781f555ae6048689d8ac47dc50d5299c5f543bfe5f8d8d49b",
      evidenceRef:
        "https://cache.industry.siemens.com/dl/files/812/7215812/att_81952/v1/Signalbaugruppen_EN_en-US.pdf; https://cache.industry.siemens.com/dl/files/726/23060726/att_66629/v1/23060726_s7-300_kabel_und_zubehoer_zuordnung_stecker_baugruppe_d.pdf",
      note: "Reviewed exact 6ES7321-7TH00-0AB0: Process Automation manual section 6.2.1, printed 6-2 and 6-4 to 6-5; FAQ table 2, p6. inputVoltage semantics remain unresolved and unverified. Previously reviewed parsed cache-PDF text; visual page verification unavailable. Approves only identity, digital-input type and 16 inputs; the full canonical title is an identifier. No standalone voltage, lifecycle, availability, compatibility, operating-feature or unrelated specification is approved.",
    },
  },
  {
    productId: "siemens-s7-300-sm321-di-16-24vdc-sourcing-1bh50-0aa0",
    shortDescription: sm321Di16_24Vdc1Bh50Copy,
    description: [sm321Di16_24Vdc1Bh50Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-10-01T17:45:15Z",
      reviewedContentHash:
        "sha256:4b3c1b2f32fbc23fcfa9de3914a0dc8af215b6286ee43c8383861b906a87644c",
      evidenceRef:
        "https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf",
      note: "Reviewed 6ES7321-1BH50-0AA0 Persian identity and sixteen-input wording, spacing, Persian comma and final period, NFC and Persian yeh/kaf; the complete Latin title and numeric 16 remain separate typed LTR segments.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-10-01T17:45:26Z",
      reviewedContentHash:
        "sha256:4b3c1b2f32fbc23fcfa9de3914a0dc8af215b6286ee43c8383861b906a87644c",
      evidenceRef:
        "https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf",
      note: "Reviewed exact 6ES7321-1BH50-0AA0: Module Data section 3.13, printed p92. Previously reviewed parsed cache-PDF text; visual page verification unavailable. Approves only identity, digital-input type and 16 inputs; the full canonical title is an identifier. No standalone voltage, lifecycle, availability, compatibility, operating-feature or unrelated specification is approved.",
    },
  },
  {
    productId: "siemens-s7-300-sm321-di16-24vdc-diagnostics-7bh00-0ab0",
    shortDescription: sm321Di16_24Vdc7Bh00Copy,
    description: [sm321Di16_24Vdc7Bh00Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-10-01T17:45:15Z",
      reviewedContentHash:
        "sha256:b9d498f47a5b5ed2a6f5bb3a32ef57fefe765211d67b9dc852c0520e15fc1e1f",
      evidenceRef:
        "https://cache.industry.siemens.com/dl/files/047/88868047/att_68363/v1/S7pcshwb.pdf",
      note: "Reviewed 6ES7321-7BH00-0AB0 Persian identity and sixteen-input wording, spacing, Persian comma and final period, NFC and Persian yeh/kaf; the complete Latin title and numeric 16 remain separate typed LTR segments.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-10-01T17:45:26Z",
      reviewedContentHash:
        "sha256:b9d498f47a5b5ed2a6f5bb3a32ef57fefe765211d67b9dc852c0520e15fc1e1f",
      evidenceRef:
        "https://cache.industry.siemens.com/dl/files/047/88868047/att_68363/v1/S7pcshwb.pdf",
      note: "Reviewed exact 6ES7321-7BH00-0AB0: Exact PCS 7 S7-300 SM-DI row, printed Page 24 of 41. The existing canonical source link points to a CPU410 manual; copy evidence uses this exact PCS 7 row, and source-link reconciliation remains separate. Previously reviewed parsed cache-PDF text; visual page verification unavailable. Approves only identity, digital-input type and 16 inputs; the full canonical title is an identifier. No standalone voltage, lifecycle, availability, compatibility, operating-feature or unrelated specification is approved.",
    },
  },
  {
    productId: "siemens-s7-300-sm321-di-4-24vdc-namur-7rd00-0ab0",
    shortDescription: sm321Di4_24VdcNamur7Rd00Copy,
    description: [sm321Di4_24VdcNamur7Rd00Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-13T10:10:19Z",
      reviewedContentHash:
        "sha256:a87a378c221bd7fae8d5eac58fb451c2e100232bfb8358cc2f366c46bc6e7d49",
      evidenceRef:
        "PM linguistic approval in this conversation; draft commit 02d2ea2b17db358a617024b5e05e3cfdb084f113; Product siemens-s7-300-sm321-di-4-24vdc-namur-7rd00-0ab0; MLFB 6ES7321-7RD00-0AB0.",
      note: "6ES7321-7RD00-0AB0: PM-approved Persian wording, punctuation, spacing, NFC and typed full-title/count segmentation.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-13T10:10:47Z",
      reviewedContentHash:
        "sha256:a87a378c221bd7fae8d5eac58fb451c2e100232bfb8358cc2f366c46bc6e7d49",
      evidenceRef:
        "PM technical approval in this conversation; draft commit 02d2ea2b17db358a617024b5e05e3cfdb084f113; Product siemens-s7-300-sm321-di-4-24vdc-namur-7rd00-0ab0; MLFB 6ES7321-7RD00-0AB0; previously reviewed Siemens A5E00348721-03, English PDF pp4-6; https://cache.industry.siemens.com/dl/files/861/30332861/att_108633/v1/sm321_di_namur_product_information.pdf.",
      note: "6ES7321-7RD00-0AB0: PM-approved full-title identification, digital-input type and 4 inputs only. 24 V concerns electronic load supply; inputVoltage and Ex application claims are not approved.",
    },
  },
  {
    productId: "siemens-s7-300-sm322-do-8-24vdc-2a-1bf01-0aa0",
    shortDescription: sm322Do8_24Vdc1Bf01Copy,
    description: [sm322Do8_24Vdc1Bf01Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-13T10:10:19Z",
      reviewedContentHash:
        "sha256:06946f86824902d2e68cc8d91cd69836c998e8bfc059275d8b768ebb5da6edc9",
      evidenceRef:
        "PM linguistic approval in this conversation; draft commit 02d2ea2b17db358a617024b5e05e3cfdb084f113; Product siemens-s7-300-sm322-do-8-24vdc-2a-1bf01-0aa0; MLFB 6ES7322-1BF01-0AA0.",
      note: "6ES7322-1BF01-0AA0: PM-approved Persian wording, punctuation, spacing, NFC and typed full-title/count segmentation.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-13T10:10:47Z",
      reviewedContentHash:
        "sha256:06946f86824902d2e68cc8d91cd69836c998e8bfc059275d8b768ebb5da6edc9",
      evidenceRef:
        "PM technical approval in this conversation; draft commit 02d2ea2b17db358a617024b5e05e3cfdb084f113; Product siemens-s7-300-sm322-do-8-24vdc-2a-1bf01-0aa0; MLFB 6ES7322-1BF01-0AA0; previously reviewed Siemens Module Data 05/2022 A5E00105505-AK, section 3.28 pp148-149; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf.",
      note: "6ES7322-1BF01-0AA0: PM-approved full-title identification, digital-output type and 8 outputs only. Prior Siemens evidence reused.",
    },
  },
  {
    productId: "siemens-s7-300-sm322-do-16-24vdc-0-5a-1bh01-0aa0",
    shortDescription: sm322Do16_24Vdc1Bh01Copy,
    description: [sm322Do16_24Vdc1Bh01Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-13T10:10:19Z",
      reviewedContentHash:
        "sha256:083edd9853d43518ecc020878a3756a79dd6dbbe63866e564da4ca0310c45110",
      evidenceRef:
        "PM linguistic approval in this conversation; draft commit 02d2ea2b17db358a617024b5e05e3cfdb084f113; Product siemens-s7-300-sm322-do-16-24vdc-0-5a-1bh01-0aa0; MLFB 6ES7322-1BH01-0AA0.",
      note: "6ES7322-1BH01-0AA0: PM-approved Persian wording, punctuation, spacing, NFC and typed full-title/count segmentation.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-13T10:10:47Z",
      reviewedContentHash:
        "sha256:083edd9853d43518ecc020878a3756a79dd6dbbe63866e564da4ca0310c45110",
      evidenceRef:
        "PM technical approval in this conversation; draft commit 02d2ea2b17db358a617024b5e05e3cfdb084f113; Product siemens-s7-300-sm322-do-16-24vdc-0-5a-1bh01-0aa0; MLFB 6ES7322-1BH01-0AA0; previously reviewed Siemens Module Data 05/2022 A5E00105505-AK, section 3.23 pp125-127; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf.",
      note: "6ES7322-1BH01-0AA0: PM-approved full-title identification, digital-output type and 16 outputs only. Prior Siemens evidence reused.",
    },
  },
  {
    productId: "siemens-s7-300-sm322-do-16-24vdc-high-speed-1bh10-0aa0",
    shortDescription: sm322Do16_24Vdc1Bh10Copy,
    description: [sm322Do16_24Vdc1Bh10Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-13T10:10:19Z",
      reviewedContentHash:
        "sha256:13fa669b8a3ff684445ebc642a032025ee69b8435c539c21fb043967c0f0b7ed",
      evidenceRef:
        "PM linguistic approval in this conversation; draft commit 02d2ea2b17db358a617024b5e05e3cfdb084f113; Product siemens-s7-300-sm322-do-16-24vdc-high-speed-1bh10-0aa0; MLFB 6ES7322-1BH10-0AA0.",
      note: "6ES7322-1BH10-0AA0: PM-approved Persian wording, punctuation, spacing, NFC and typed full-title/count segmentation.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-13T10:10:47Z",
      reviewedContentHash:
        "sha256:13fa669b8a3ff684445ebc642a032025ee69b8435c539c21fb043967c0f0b7ed",
      evidenceRef:
        "PM technical approval in this conversation; draft commit 02d2ea2b17db358a617024b5e05e3cfdb084f113; Product siemens-s7-300-sm322-do-16-24vdc-high-speed-1bh10-0aa0; MLFB 6ES7322-1BH10-0AA0; previously reviewed Siemens Module Data 05/2022 A5E00105505-AK, section 3.25 pp137-138; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf.",
      note: "6ES7322-1BH10-0AA0: PM-approved full-title identification, digital-output type and 16 outputs only. High Speed remains part of the full model identifier.",
    },
  },
  {
    productId: "siemens-s7-300-sm322-do-32-24vdc-0-5a-1bl00-0aa0",
    shortDescription: sm322Do32_24Vdc1Bl00Copy,
    description: [sm322Do32_24Vdc1Bl00Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-13T10:10:19Z",
      reviewedContentHash:
        "sha256:f2a0464dc66280cf7906f4f1b25f713c830bb588d0a418b4a350391d5384a4dc",
      evidenceRef:
        "PM linguistic approval in this conversation; draft commit 02d2ea2b17db358a617024b5e05e3cfdb084f113; Product siemens-s7-300-sm322-do-32-24vdc-0-5a-1bl00-0aa0; MLFB 6ES7322-1BL00-0AA0.",
      note: "6ES7322-1BL00-0AA0: PM-approved Persian wording, punctuation, spacing, NFC and typed full-title/count segmentation.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-13T10:10:47Z",
      reviewedContentHash:
        "sha256:f2a0464dc66280cf7906f4f1b25f713c830bb588d0a418b4a350391d5384a4dc",
      evidenceRef:
        "PM technical approval in this conversation; draft commit 02d2ea2b17db358a617024b5e05e3cfdb084f113; Product siemens-s7-300-sm322-do-32-24vdc-0-5a-1bl00-0aa0; MLFB 6ES7322-1BL00-0AA0; previously reviewed Siemens Module Data 05/2022 A5E00105505-AK, section 3.21 pp119-121; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf.",
      note: "6ES7322-1BL00-0AA0: PM-approved full-title identification, digital-output type and 32 outputs only. Prior Siemens evidence reused.",
    },
  },
  {
    productId: "siemens-s7-300-sm322-do-16-ac-120-230v-1a-1fh00-0aa0",
    shortDescription: sm322Do16_120_230Vac1Fh00Copy,
    description: [sm322Do16_120_230Vac1Fh00Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-13T15:45:00Z",
      reviewedContentHash:
        "sha256:2899dd2ecbae2223558f50070ada47d0a4a70f7c0fda3d4d737d9f3c2b74ba0e",
      evidenceRef:
        "PM linguistic approval in this conversation; draft commit e952ecf2036f5d191b712191d637cb042b4426f6; Product siemens-s7-300-sm322-do-16-ac-120-230v-1a-1fh00-0aa0; MLFB 6ES7322-1FH00-0AA0.",
      note: "6ES7322-1FH00-0AA0: PM-approved Persian wording, punctuation and spacing; machine-verified NFC, Persian yeh/kaf and typed full-title/count segmentation.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-13T15:45:06Z",
      reviewedContentHash:
        "sha256:2899dd2ecbae2223558f50070ada47d0a4a70f7c0fda3d4d737d9f3c2b74ba0e",
      evidenceRef:
        "PM technical approval in this conversation; draft commit e952ecf2036f5d191b712191d637cb042b4426f6; Product siemens-s7-300-sm322-do-16-ac-120-230v-1a-1fh00-0aa0; MLFB 6ES7322-1FH00-0AA0; previously reviewed Siemens Module Data 05/2022 A5E00105505-AK, section 3.27 pp145-146; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf.",
      note: "6ES7322-1FH00-0AA0: PM-approved full-title identification, digital-output module type and 16 outputs only. The full canonical title is an identifier. No standalone voltage/current, relay-performance, lifecycle, availability or compatibility claims are approved.",
    },
  },
  {
    productId: "siemens-s7-300-sm322-do-16-acdc-24-48v-0-5a-5gh00-0ab0",
    shortDescription: sm322Do16_24_48VacDc5Gh00Copy,
    description: [sm322Do16_24_48VacDc5Gh00Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-13T15:45:00Z",
      reviewedContentHash:
        "sha256:dcd2e368e9e3c1d8c0fa775d4d217f705a48d156264a6c85ba16fbe780d27ad3",
      evidenceRef:
        "PM linguistic approval in this conversation; draft commit e952ecf2036f5d191b712191d637cb042b4426f6; Product siemens-s7-300-sm322-do-16-acdc-24-48v-0-5a-5gh00-0ab0; MLFB 6ES7322-5GH00-0AB0.",
      note: "6ES7322-5GH00-0AB0: PM-approved Persian wording, punctuation and spacing; machine-verified NFC, Persian yeh/kaf and typed full-title/count segmentation.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-13T15:45:06Z",
      reviewedContentHash:
        "sha256:dcd2e368e9e3c1d8c0fa775d4d217f705a48d156264a6c85ba16fbe780d27ad3",
      evidenceRef:
        "PM technical approval in this conversation; draft commit e952ecf2036f5d191b712191d637cb042b4426f6; Product siemens-s7-300-sm322-do-16-acdc-24-48v-0-5a-5gh00-0ab0; MLFB 6ES7322-5GH00-0AB0; previously reviewed Siemens Module Data 05/2022 A5E00105505-AK, section 3.26 pp140-142; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf; Manual UC 24/48 V; official indexed exact-product datasheet text supports the canonical identifier; direct PDF retrieval returned HTTP 403; visual inspection NOT OBSERVED..",
      note: "6ES7322-5GH00-0AB0: PM-approved full-title identification, digital-output module type and 16 outputs only. The full canonical title is an identifier. No standalone voltage/current, relay-performance, lifecycle, availability or compatibility claims are approved. Manual UC 24/48 V; official indexed exact-product datasheet text supports the canonical identifier; direct PDF retrieval returned HTTP 403; visual inspection NOT OBSERVED.",
    },
  },
  {
    productId: "siemens-s7-300-sm322-do-8-relay-24vdc-230vac-2a-1hf01-0aa0",
    shortDescription: sm322Do8Relay1Hf01Copy,
    description: [sm322Do8Relay1Hf01Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-13T15:45:00Z",
      reviewedContentHash:
        "sha256:fd82f3f5548c850671b0f0b5c1dfb06d8230e7051e59e70e964eaeea9889b561",
      evidenceRef:
        "PM linguistic approval in this conversation; draft commit e952ecf2036f5d191b712191d637cb042b4426f6; Product siemens-s7-300-sm322-do-8-relay-24vdc-230vac-2a-1hf01-0aa0; MLFB 6ES7322-1HF01-0AA0.",
      note: "6ES7322-1HF01-0AA0: PM-approved Persian wording, punctuation and spacing; machine-verified NFC, Persian yeh/kaf and typed full-title/count segmentation.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-13T15:45:06Z",
      reviewedContentHash:
        "sha256:fd82f3f5548c850671b0f0b5c1dfb06d8230e7051e59e70e964eaeea9889b561",
      evidenceRef:
        "PM technical approval in this conversation; draft commit e952ecf2036f5d191b712191d637cb042b4426f6; Product siemens-s7-300-sm322-do-8-relay-24vdc-230vac-2a-1hf01-0aa0; MLFB 6ES7322-1HF01-0AA0; previously reviewed Siemens Module Data 05/2022 A5E00105505-AK, section 3.34 pp172-173; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf.",
      note: "6ES7322-1HF01-0AA0: PM-approved full-title identification, digital-output module type and 8 outputs only. The full canonical title is an identifier. No standalone voltage/current, relay-performance, lifecycle, availability or compatibility claims are approved.",
    },
  },
  {
    productId: "siemens-s7-300-sm322-do-8-relay-24vdc-230vac-5a-1hf10-0aa0",
    shortDescription: sm322Do8Relay5A1Hf10Copy,
    description: [sm322Do8Relay5A1Hf10Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-13T15:45:00Z",
      reviewedContentHash:
        "sha256:8bfc480b7998bd17ec55ffc46b70d35f9b088d67523e15192a48296ca7c9a7e5",
      evidenceRef:
        "PM linguistic approval in this conversation; draft commit e952ecf2036f5d191b712191d637cb042b4426f6; Product siemens-s7-300-sm322-do-8-relay-24vdc-230vac-5a-1hf10-0aa0; MLFB 6ES7322-1HF10-0AA0.",
      note: "6ES7322-1HF10-0AA0: PM-approved Persian wording, punctuation and spacing; machine-verified NFC, Persian yeh/kaf and typed full-title/count segmentation.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-13T15:45:06Z",
      reviewedContentHash:
        "sha256:8bfc480b7998bd17ec55ffc46b70d35f9b088d67523e15192a48296ca7c9a7e5",
      evidenceRef:
        "PM technical approval in this conversation; draft commit e952ecf2036f5d191b712191d637cb042b4426f6; Product siemens-s7-300-sm322-do-8-relay-24vdc-230vac-5a-1hf10-0aa0; MLFB 6ES7322-1HF10-0AA0; previously reviewed Siemens Module Data 05/2022 A5E00105505-AK, section 3.36 pp182-185; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf.",
      note: "6ES7322-1HF10-0AA0: PM-approved full-title identification, digital-output module type and 8 outputs only. The full canonical title is an identifier. No standalone voltage/current, relay-performance, lifecycle, availability or compatibility claims are approved.",
    },
  },
  {
    productId: "siemens-s7-300-sm322-do-16-relay-120vdc-230vac-2a-1hh01-0aa0",
    shortDescription: sm322Do16Relay1Hh01Copy,
    description: [sm322Do16Relay1Hh01Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-13T15:45:00Z",
      reviewedContentHash:
        "sha256:527c73b9abff604dacc97629ec9cec3421eed355227cdc0437ca7232c4ba591b",
      evidenceRef:
        "PM linguistic approval in this conversation; draft commit e952ecf2036f5d191b712191d637cb042b4426f6; Product siemens-s7-300-sm322-do-16-relay-120vdc-230vac-2a-1hh01-0aa0; MLFB 6ES7322-1HH01-0AA0.",
      note: "6ES7322-1HH01-0AA0: PM-approved Persian wording, punctuation and spacing; machine-verified NFC, Persian yeh/kaf and typed full-title/count segmentation.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-13T15:45:06Z",
      reviewedContentHash:
        "sha256:527c73b9abff604dacc97629ec9cec3421eed355227cdc0437ca7232c4ba591b",
      evidenceRef:
        "PM technical approval in this conversation; draft commit e952ecf2036f5d191b712191d637cb042b4426f6; Product siemens-s7-300-sm322-do-16-relay-120vdc-230vac-2a-1hh01-0aa0; MLFB 6ES7322-1HH01-0AA0; previously reviewed Siemens Module Data 05/2022 A5E00105505-AK, section 3.33 pp169-171; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf.",
      note: "6ES7322-1HH01-0AA0: PM-approved full-title identification, digital-output module type and 16 outputs only. The full canonical title is an identifier. No standalone voltage/current, relay-performance, lifecycle, availability or compatibility claims are approved.",
    },
  },
  {
    productId: "siemens-s7-300-sm322-do-8-ac-120-230v-2a-5ff00-0ab0",
    shortDescription: sm322Do8_120_230Vac5Ff00Copy,
    description: [sm322Do8_120_230Vac5Ff00Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-13T17:07:03Z",
      reviewedContentHash:
        "sha256:2452c2cbf649d43da05803d06d78a607b26d7df8cace1844f21632ce3b7cbf34",
      evidenceRef:
        "PM linguistic approval in the supplied Batch 08 continuation; draft commit 58ecfa94d0e9565fd23967196f358c0f8cb7eccc; Product siemens-s7-300-sm322-do-8-ac-120-230v-2a-5ff00-0ab0; MLFB 6ES7322-5FF00-0AB0.",
      note: "6ES7322-5FF00-0AB0: PM-approved Persian wording, punctuation and spacing; complete Latin title and numeric count retain separate typed isolation.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-13T17:07:54Z",
      reviewedContentHash:
        "sha256:2452c2cbf649d43da05803d06d78a607b26d7df8cace1844f21632ce3b7cbf34",
      evidenceRef:
        "PM technical approval in the supplied Batch 08 continuation; draft commit 58ecfa94d0e9565fd23967196f358c0f8cb7eccc; Product siemens-s7-300-sm322-do-8-ac-120-230v-2a-5ff00-0ab0; MLFB 6ES7322-5FF00-0AB0; reused previously reviewed parsed text of Siemens Module Data, 05/2022, A5E00105505-AK; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf; visual PDF inspection NOT OBSERVED; no fresh retrieval; section 3.32, printed pp164-165.",
      note: "6ES7322-5FF00-0AB0: PM-approved complete canonical title as an identifier, digital-output module type and 8 outputs only. No additional standalone voltage/current, operating-feature, lifecycle, availability or compatibility claims are approved.",
    },
  },
  {
    productId: "siemens-s7-300-sm322-do-32-ac-120-230v-1a-1fl00-0aa0",
    shortDescription: sm322Do32_120_230Vac1Fl00Copy,
    description: [sm322Do32_120_230Vac1Fl00Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-13T17:07:03Z",
      reviewedContentHash:
        "sha256:5906dc1fb0ae7c9a71a0a2e5c5f866878cd49d6f1f2d27bf100809a3930ee3da",
      evidenceRef:
        "PM linguistic approval in the supplied Batch 08 continuation; draft commit 58ecfa94d0e9565fd23967196f358c0f8cb7eccc; Product siemens-s7-300-sm322-do-32-ac-120-230v-1a-1fl00-0aa0; MLFB 6ES7322-1FL00-0AA0.",
      note: "6ES7322-1FL00-0AA0: PM-approved Persian wording, punctuation and spacing; complete Latin title and numeric count retain separate typed isolation.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-13T17:07:54Z",
      reviewedContentHash:
        "sha256:5906dc1fb0ae7c9a71a0a2e5c5f866878cd49d6f1f2d27bf100809a3930ee3da",
      evidenceRef:
        "PM technical approval in the supplied Batch 08 continuation; draft commit 58ecfa94d0e9565fd23967196f358c0f8cb7eccc; Product siemens-s7-300-sm322-do-32-ac-120-230v-1a-1fl00-0aa0; MLFB 6ES7322-1FL00-0AA0; reused previously reviewed parsed text of Siemens Module Data, 05/2022, A5E00105505-AK; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf; visual PDF inspection NOT OBSERVED; no fresh retrieval; section 3.22, printed pp122-124.",
      note: "6ES7322-1FL00-0AA0: PM-approved complete canonical title as an identifier, digital-output module type and 32 outputs only. No additional standalone voltage/current, operating-feature, lifecycle, availability or compatibility claims are approved.",
    },
  },
  {
    productId: "siemens-s7-300-sm322-do-64-24vdc-0-3a-1bp00-0aa0",
    shortDescription: sm322Do64_24Vdc1Bp00Copy,
    description: [sm322Do64_24Vdc1Bp00Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-13T17:07:03Z",
      reviewedContentHash:
        "sha256:eb7c550ce67f8f1b72b92132d73082f9b0ebf2b469c4df2f32dadd3a94cde211",
      evidenceRef:
        "PM linguistic approval in the supplied Batch 08 continuation; draft commit 58ecfa94d0e9565fd23967196f358c0f8cb7eccc; Product siemens-s7-300-sm322-do-64-24vdc-0-3a-1bp00-0aa0; MLFB 6ES7322-1BP00-0AA0.",
      note: "6ES7322-1BP00-0AA0: PM-approved Persian wording, punctuation and spacing; complete Latin title and numeric count retain separate typed isolation.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-13T17:07:54Z",
      reviewedContentHash:
        "sha256:eb7c550ce67f8f1b72b92132d73082f9b0ebf2b469c4df2f32dadd3a94cde211",
      evidenceRef:
        'PM technical approval in the supplied Batch 08 continuation; draft commit 58ecfa94d0e9565fd23967196f358c0f8cb7eccc; Product siemens-s7-300-sm322-do-64-24vdc-0-3a-1bp00-0aa0; MLFB 6ES7322-1BP00-0AA0; reused previously reviewed parsed text of Siemens Module Data, 05/2022, A5E00105505-AK; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf; visual PDF inspection NOT OBSERVED; no fresh retrieval; section 3.19, printed pp106-108. Unresolved discrepancy: canonical English description says "sink", while the reviewed manual says "sourcing"; approved Persian copy asserts neither; canonical data is unchanged.',
      note: '6ES7322-1BP00-0AA0: PM-approved complete canonical title as an identifier, digital-output module type and 64 outputs only. No additional standalone voltage/current, operating-feature, lifecycle, availability or compatibility claims are approved. Unresolved discrepancy: canonical English description says "sink", while the reviewed manual says "sourcing"; approved Persian copy asserts neither; canonical data is unchanged.',
    },
  },
  {
    productId: "siemens-s7-300-sm322-do-64-24vdc-0-3a-sinking-1bp50-0aa0",
    shortDescription: sm322Do64_24VdcSinking1Bp50Copy,
    description: [sm322Do64_24VdcSinking1Bp50Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-13T17:07:03Z",
      reviewedContentHash:
        "sha256:865291d13beef6ecf53fa7ab667d7dd353d88db89938e56215ce1048131efefb",
      evidenceRef:
        "PM linguistic approval in the supplied Batch 08 continuation; draft commit 58ecfa94d0e9565fd23967196f358c0f8cb7eccc; Product siemens-s7-300-sm322-do-64-24vdc-0-3a-sinking-1bp50-0aa0; MLFB 6ES7322-1BP50-0AA0.",
      note: "6ES7322-1BP50-0AA0: PM-approved Persian wording, punctuation and spacing; complete Latin title and numeric count retain separate typed isolation.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-13T17:07:54Z",
      reviewedContentHash:
        "sha256:865291d13beef6ecf53fa7ab667d7dd353d88db89938e56215ce1048131efefb",
      evidenceRef:
        "PM technical approval in the supplied Batch 08 continuation; draft commit 58ecfa94d0e9565fd23967196f358c0f8cb7eccc; Product siemens-s7-300-sm322-do-64-24vdc-0-3a-sinking-1bp50-0aa0; MLFB 6ES7322-1BP50-0AA0; reused previously reviewed parsed text of Siemens Module Data, 05/2022, A5E00105505-AK; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf; visual PDF inspection NOT OBSERVED; no fresh retrieval; section 3.20, printed pp112-115. Sinking remains only within the supported complete canonical title; no independent operating claim is approved.",
      note: "6ES7322-1BP50-0AA0: PM-approved complete canonical title as an identifier, digital-output module type and 64 outputs only. No additional standalone voltage/current, operating-feature, lifecycle, availability or compatibility claims are approved. Sinking remains only within the supported complete canonical title; no independent operating claim is approved.",
    },
  },
  {
    productId: "siemens-s7-300-sm322-do-16-24vdc-0-5a-diagnostics-8bh10-0ab0",
    shortDescription: sm322Do16_24VdcDiagnostics8Bh10Copy,
    description: [sm322Do16_24VdcDiagnostics8Bh10Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-13T17:07:03Z",
      reviewedContentHash:
        "sha256:402de473e8334628845168be88edc7a2b7c99ce78dad01f5ab4c205088820935",
      evidenceRef:
        "PM linguistic approval in the supplied Batch 08 continuation; draft commit 58ecfa94d0e9565fd23967196f358c0f8cb7eccc; Product siemens-s7-300-sm322-do-16-24vdc-0-5a-diagnostics-8bh10-0ab0; MLFB 6ES7322-8BH10-0AB0.",
      note: "6ES7322-8BH10-0AB0: PM-approved Persian wording, punctuation and spacing; complete Latin title and numeric count retain separate typed isolation.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-13T17:07:54Z",
      reviewedContentHash:
        "sha256:402de473e8334628845168be88edc7a2b7c99ce78dad01f5ab4c205088820935",
      evidenceRef:
        "PM technical approval in the supplied Batch 08 continuation; draft commit 58ecfa94d0e9565fd23967196f358c0f8cb7eccc; Product siemens-s7-300-sm322-do-16-24vdc-0-5a-diagnostics-8bh10-0ab0; MLFB 6ES7322-8BH10-0AB0; reused previously reviewed parsed text of Siemens Module Data, 05/2022, A5E00105505-AK; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf; visual PDF inspection NOT OBSERVED; no fresh retrieval; section 3.24, printed p129.",
      note: "6ES7322-8BH10-0AB0: PM-approved complete canonical title as an identifier, digital-output module type and 16 outputs only. No additional standalone voltage/current, operating-feature, lifecycle, availability or compatibility claims are approved.",
    },
  },
  {
    productId: "siemens-s7-300-sm322-do-4-ex-15v-20ma-5rd00-0ab0",
    shortDescription: sm322Do4Ex5Rd00Copy,
    description: [sm322Do4Ex5Rd00Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-14T18:23:04Z",
      reviewedContentHash:
        "sha256:30129c7354a1fa60198fee2f54feb4074612e873f2566f9fac62849c2e9ae2e9",
      evidenceRef:
        "PM linguistic approval in the supplied Batch 09 approval request; draft commit cb9b8f629591d0f32f4a2ebf46da720c50f13305; Product siemens-s7-300-sm322-do-4-ex-15v-20ma-5rd00-0ab0; MLFB 6ES7322-5RD00-0AB0. Recording time is an actual UTC observation, not the PM review timestamp.",
      note:
        "6ES7322-5RD00-0AB0: PM-approved Product-specific Persian wording, punctuation and spacing; complete Latin title and numeric count retain separate typed isolation.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-14T18:23:11Z",
      reviewedContentHash:
        "sha256:30129c7354a1fa60198fee2f54feb4074612e873f2566f9fac62849c2e9ae2e9",
      evidenceRef:
        "PM technical approval in the supplied Batch 09 approval request; draft commit cb9b8f629591d0f32f4a2ebf46da720c50f13305; Product siemens-s7-300-sm322-do-4-ex-15v-20ma-5rd00-0ab0; MLFB 6ES7322-5RD00-0AB0. Recording time is an actual UTC observation, not the PM review timestamp. Reused readiness-reviewed parsed text of Siemens S7-300, ET 200M Ex I/O Modules, 04/2022, A5E00172008-AP; https://cache.industry.siemens.com/dl/files/709/1096709/att_885614/v2/s7300_et200m_ex_io_modules_manual_en_en-US.pdf?download=true; section 2.4.1, printed pp77-78; visual inspection and direct-origin HTTP status NOT OBSERVED; no fresh retrieval. Ex remains only within the supported complete canonical identifier; no independent installation or certification claim.",
      note:
        "6ES7322-5RD00-0AB0: PM-approved complete canonical title as an identifier, digital-output module type and 4 outputs only. No independent voltage/current, Ex certification or hazardous-area suitability, Diagnostics performance, RC protection, lifecycle, availability or compatibility claims are approved. Ex remains only within the supported complete canonical identifier; no independent installation or certification claim.",
    },
  },
  {
    productId: "siemens-s7-300-sm322-do-4-ex-24v-10ma-5sd00-0ab0",
    shortDescription: sm322Do4Ex5Sd00Copy,
    description: [sm322Do4Ex5Sd00Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-14T18:23:04Z",
      reviewedContentHash:
        "sha256:bf78d3e02989c4df9f06c614bccef6db89d03f50d8da24fb2336f98704bb8ddf",
      evidenceRef:
        "PM linguistic approval in the supplied Batch 09 approval request; draft commit cb9b8f629591d0f32f4a2ebf46da720c50f13305; Product siemens-s7-300-sm322-do-4-ex-24v-10ma-5sd00-0ab0; MLFB 6ES7322-5SD00-0AB0. Recording time is an actual UTC observation, not the PM review timestamp.",
      note:
        "6ES7322-5SD00-0AB0: PM-approved Product-specific Persian wording, punctuation and spacing; complete Latin title and numeric count retain separate typed isolation.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-14T18:23:11Z",
      reviewedContentHash:
        "sha256:bf78d3e02989c4df9f06c614bccef6db89d03f50d8da24fb2336f98704bb8ddf",
      evidenceRef:
        "PM technical approval in the supplied Batch 09 approval request; draft commit cb9b8f629591d0f32f4a2ebf46da720c50f13305; Product siemens-s7-300-sm322-do-4-ex-24v-10ma-5sd00-0ab0; MLFB 6ES7322-5SD00-0AB0. Recording time is an actual UTC observation, not the PM review timestamp. Reused readiness-reviewed parsed text of Siemens S7-300, ET 200M Ex I/O Modules, 04/2022, A5E00172008-AP; https://cache.industry.siemens.com/dl/files/709/1096709/att_885614/v2/s7300_et200m_ex_io_modules_manual_en_en-US.pdf?download=true; section 2.3.1, printed pp66-69; visual inspection and direct-origin HTTP status NOT OBSERVED; no fresh retrieval. Ex remains only within the supported complete canonical identifier; no independent installation or certification claim.",
      note:
        "6ES7322-5SD00-0AB0: PM-approved complete canonical title as an identifier, digital-output module type and 4 outputs only. No independent voltage/current, Ex certification or hazardous-area suitability, Diagnostics performance, RC protection, lifecycle, availability or compatibility claims are approved. Ex remains only within the supported complete canonical identifier; no independent installation or certification claim.",
    },
  },
  {
    productId: "siemens-s7-300-sm322-do-8-24vdc-0-5a-diagnostics-8bf00-0ab0",
    shortDescription: sm322Do8Diagnostics8Bf00Copy,
    description: [sm322Do8Diagnostics8Bf00Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-14T18:23:04Z",
      reviewedContentHash:
        "sha256:261c51a45d9c502af6e81277423025fa5ec9b2effba4338b699d6d78680fcb16",
      evidenceRef:
        "PM linguistic approval in the supplied Batch 09 approval request; draft commit cb9b8f629591d0f32f4a2ebf46da720c50f13305; Product siemens-s7-300-sm322-do-8-24vdc-0-5a-diagnostics-8bf00-0ab0; MLFB 6ES7322-8BF00-0AB0. Recording time is an actual UTC observation, not the PM review timestamp.",
      note:
        "6ES7322-8BF00-0AB0: PM-approved Product-specific Persian wording, punctuation and spacing; complete Latin title and numeric count retain separate typed isolation.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-14T18:23:11Z",
      reviewedContentHash:
        "sha256:261c51a45d9c502af6e81277423025fa5ec9b2effba4338b699d6d78680fcb16",
      evidenceRef:
        "PM technical approval in the supplied Batch 09 approval request; draft commit cb9b8f629591d0f32f4a2ebf46da720c50f13305; Product siemens-s7-300-sm322-do-8-24vdc-0-5a-diagnostics-8bf00-0ab0; MLFB 6ES7322-8BF00-0AB0. Recording time is an actual UTC observation, not the PM review timestamp. Reused readiness-reviewed parsed text of Siemens S7-300 Module Data, 05/2022, A5E00105505-AK; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf; section 3.29, printed p151; visual inspection and direct-origin HTTP status NOT OBSERVED; no fresh retrieval. Diagnostics remains only within the supported complete canonical identifier; no Diagnostics performance claim.",
      note:
        "6ES7322-8BF00-0AB0: PM-approved complete canonical title as an identifier, digital-output module type and 8 outputs only. No independent voltage/current, Ex certification or hazardous-area suitability, Diagnostics performance, RC protection, lifecycle, availability or compatibility claims are approved. Diagnostics remains only within the supported complete canonical identifier; no Diagnostics performance claim.",
    },
  },
  {
    productId: "siemens-s7-300-sm322-do-8-48-125vdc-1-5a-1cf00-0aa0",
    shortDescription: sm322Do8_48_125Vdc1Cf00Copy,
    description: [sm322Do8_48_125Vdc1Cf00Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-14T18:23:04Z",
      reviewedContentHash:
        "sha256:2ffd2d15d399972bd875501d45858f0b4d5e079b0ad7d484996ebf6066a5a250",
      evidenceRef:
        "PM linguistic approval in the supplied Batch 09 approval request; draft commit cb9b8f629591d0f32f4a2ebf46da720c50f13305; Product siemens-s7-300-sm322-do-8-48-125vdc-1-5a-1cf00-0aa0; MLFB 6ES7322-1CF00-0AA0. Recording time is an actual UTC observation, not the PM review timestamp.",
      note:
        "6ES7322-1CF00-0AA0: PM-approved Product-specific Persian wording, punctuation and spacing; complete Latin title and numeric count retain separate typed isolation.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-14T18:23:11Z",
      reviewedContentHash:
        "sha256:2ffd2d15d399972bd875501d45858f0b4d5e079b0ad7d484996ebf6066a5a250",
      evidenceRef:
        "PM technical approval in the supplied Batch 09 approval request; draft commit cb9b8f629591d0f32f4a2ebf46da720c50f13305; Product siemens-s7-300-sm322-do-8-48-125vdc-1-5a-1cf00-0aa0; MLFB 6ES7322-1CF00-0AA0. Recording time is an actual UTC observation, not the PM review timestamp. Reused readiness-reviewed parsed text of Siemens S7-300 Module Data, 05/2022, A5E00105505-AK; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf; section 3.30, printed pp158-159; visual inspection and direct-origin HTTP status NOT OBSERVED; no fresh retrieval. Manual describes a 48-125 V DC range; canonical title retains 48/125 V DC as an identifier. No standalone voltage assertion or canonical-data correction.",
      note:
        "6ES7322-1CF00-0AA0: PM-approved complete canonical title as an identifier, digital-output module type and 8 outputs only. No independent voltage/current, Ex certification or hazardous-area suitability, Diagnostics performance, RC protection, lifecycle, availability or compatibility claims are approved. Manual describes a 48-125 V DC range; canonical title retains 48/125 V DC as an identifier. No standalone voltage assertion or canonical-data correction.",
    },
  },
  {
    productId: "siemens-s7-300-sm322-do-8-relay-230vac-5a-rc-5hf00-0ab0",
    shortDescription: sm322Do8RelayRc5Hf00Copy,
    description: [sm322Do8RelayRc5Hf00Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-14T18:23:04Z",
      reviewedContentHash:
        "sha256:eb38af6a708f702bd04da99b086fb94492d85e9f2b4a5581b321e8322b4ca4c0",
      evidenceRef:
        "PM linguistic approval in the supplied Batch 09 approval request; draft commit cb9b8f629591d0f32f4a2ebf46da720c50f13305; Product siemens-s7-300-sm322-do-8-relay-230vac-5a-rc-5hf00-0ab0; MLFB 6ES7322-5HF00-0AB0. Recording time is an actual UTC observation, not the PM review timestamp.",
      note:
        "6ES7322-5HF00-0AB0: PM-approved Product-specific Persian wording, punctuation and spacing; complete Latin title and numeric count retain separate typed isolation.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-14T18:23:11Z",
      reviewedContentHash:
        "sha256:eb38af6a708f702bd04da99b086fb94492d85e9f2b4a5581b321e8322b4ca4c0",
      evidenceRef:
        "PM technical approval in the supplied Batch 09 approval request; draft commit cb9b8f629591d0f32f4a2ebf46da720c50f13305; Product siemens-s7-300-sm322-do-8-relay-230vac-5a-rc-5hf00-0ab0; MLFB 6ES7322-5HF00-0AB0. Recording time is an actual UTC observation, not the PM review timestamp. Reused readiness-reviewed parsed text of Siemens S7-300 Module Data, 05/2022, A5E00105505-AK; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf; section 3.35, printed pp176 and 180; visual inspection and direct-origin HTTP status NOT OBSERVED; no fresh retrieval. RC protection requires a jumper; no unconditional RC protection claim is approved.",
      note:
        "6ES7322-5HF00-0AB0: PM-approved complete canonical title as an identifier, digital-output module type and 8 outputs only. No independent voltage/current, Ex certification or hazardous-area suitability, Diagnostics performance, RC protection, lifecycle, availability or compatibility claims are approved. RC protection requires a jumper; no unconditional RC protection claim is approved.",
    },
  },
  {
    productId: "siemens-s7-300-sm323-di8-do8-24vdc-0-5a-1bh01-0aa0",
    shortDescription: sm323Di8Do8_1Bh01Copy,
    description: [sm323Di8Do8_1Bh01Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-16T17:32:37Z",
      reviewedContentHash:
        "sha256:230d011bba459015aaa2a9ddfd8991a69a4cbd540cd1023c863fa99d67816c42",
      evidenceRef:
        "PM linguistic approval in the supplied Batch 10 approval request; draft commit e203b34b5e19bafa85efaf76cf58fbb7721e909e; Product siemens-s7-300-sm323-di8-do8-24vdc-0-5a-1bh01-0aa0; MLFB 6ES7323-1BH01-0AA0. Recording time is an actual UTC observation, not the PM review timestamp.",
      note:
        "6ES7323-1BH01-0AA0: PM-approved Product-specific Persian wording, spacing and punctuation; complete Latin identifier and both numeric counts retain separate typed isolation.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-16T17:33:11Z",
      reviewedContentHash:
        "sha256:230d011bba459015aaa2a9ddfd8991a69a4cbd540cd1023c863fa99d67816c42",
      evidenceRef:
        "PM technical approval in the supplied Batch 10 approval request; draft commit e203b34b5e19bafa85efaf76cf58fbb7721e909e; Product siemens-s7-300-sm323-di8-do8-24vdc-0-5a-1bh01-0aa0; MLFB 6ES7323-1BH01-0AA0. Recording time is an actual UTC observation, not the PM review timestamp. Reused readiness-reviewed parsed text of Siemens Module Data, 05/2022, A5E00105505-AK; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf; section 3.38, printed pp190-192; visual inspection and direct-origin HTTP status NOT OBSERVED; no fresh retrieval.",
      note:
        "6ES7323-1BH01-0AA0: PM-approved complete canonical identifier, digital input/output module type, 8 inputs and 8 outputs only. No additional standalone electrical, lifecycle, availability, compatibility or operating-performance claims are approved.",
    },
  },
  {
    productId: "siemens-s7-300-sm323-di16-do16-24vdc-0-5a-1bl00-0aa0",
    shortDescription: sm323Di16Do16_1Bl00Copy,
    description: [sm323Di16Do16_1Bl00Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-16T17:32:37Z",
      reviewedContentHash:
        "sha256:7d7b40e0f621db4e6c5e85c4e8502ebf6e4fa65d3219364c88d85e87828392c6",
      evidenceRef:
        "PM linguistic approval in the supplied Batch 10 approval request; draft commit e203b34b5e19bafa85efaf76cf58fbb7721e909e; Product siemens-s7-300-sm323-di16-do16-24vdc-0-5a-1bl00-0aa0; MLFB 6ES7323-1BL00-0AA0. Recording time is an actual UTC observation, not the PM review timestamp.",
      note:
        "6ES7323-1BL00-0AA0: PM-approved Product-specific Persian wording, spacing and punctuation; complete Latin identifier and both numeric counts retain separate typed isolation.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-16T17:33:11Z",
      reviewedContentHash:
        "sha256:7d7b40e0f621db4e6c5e85c4e8502ebf6e4fa65d3219364c88d85e87828392c6",
      evidenceRef:
        "PM technical approval in the supplied Batch 10 approval request; draft commit e203b34b5e19bafa85efaf76cf58fbb7721e909e; Product siemens-s7-300-sm323-di16-do16-24vdc-0-5a-1bl00-0aa0; MLFB 6ES7323-1BL00-0AA0. Recording time is an actual UTC observation, not the PM review timestamp. Reused readiness-reviewed parsed text of Siemens Module Data, 05/2022, A5E00105505-AK; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf; section 3.37, printed pp187-189; visual inspection and direct-origin HTTP status NOT OBSERVED; no fresh retrieval.",
      note:
        "6ES7323-1BL00-0AA0: PM-approved complete canonical identifier, digital input/output module type, 16 inputs and 16 outputs only. No additional standalone electrical, lifecycle, availability, compatibility or operating-performance claims are approved.",
    },
  },
  {
    productId: "siemens-s7-300-sm327-di8-do8-24vdc-0-5a-1bh00-0ab0",
    shortDescription: sm327Di8Dx8_1Bh00Copy,
    description: [sm327Di8Dx8_1Bh00Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-16T17:32:37Z",
      reviewedContentHash:
        "sha256:6bead8934643a3532b824141de26f3b41962713829bdb36693a9bed296ad7a0d",
      evidenceRef:
        "PM linguistic approval in the supplied Batch 10 approval request; draft commit e203b34b5e19bafa85efaf76cf58fbb7721e909e; Product siemens-s7-300-sm327-di8-do8-24vdc-0-5a-1bh00-0ab0; MLFB 6ES7327-1BH00-0AB0. Recording time is an actual UTC observation, not the PM review timestamp.",
      note:
        "6ES7327-1BH00-0AB0: PM-approved Product-specific Persian wording, spacing and punctuation; complete Latin identifier and both numeric counts retain separate typed isolation; wording correctly describes fixed inputs and channels individually configurable as input or output.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-16T17:33:11Z",
      reviewedContentHash:
        "sha256:6bead8934643a3532b824141de26f3b41962713829bdb36693a9bed296ad7a0d",
      evidenceRef:
        "PM technical approval in the supplied Batch 10 approval request; draft commit e203b34b5e19bafa85efaf76cf58fbb7721e909e; Product siemens-s7-300-sm327-di8-do8-24vdc-0-5a-1bh00-0ab0; MLFB 6ES7327-1BH00-0AB0. Recording time is an actual UTC observation, not the PM review timestamp. Reused readiness-reviewed parsed text of Siemens Module Data, 05/2022, A5E00105505-AK; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf; section 3.39, printed pp193-195; visual inspection and direct-origin HTTP status NOT OBSERVED; no fresh retrieval.",
      note:
        "6ES7327-1BH00-0AB0: PM-approved complete canonical identifier, digital input/output module type, 8 fixed digital inputs plus 8 individually configurable input/output channels only. No approval of 8 permanently assigned outputs or inference from normalized output fields. No additional standalone electrical, lifecycle, availability, compatibility or operating-performance claims are approved.",
    },
  },
  {
    productId: "siemens-s7-300-sm331-ai2-9-12-14bit-7kb02-0ab0",
    shortDescription: sm331MlfbOnly7Kb02Copy,
    description: [sm331MlfbOnly7Kb02Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-16T17:32:37Z",
      reviewedContentHash:
        "sha256:2a3d107c79fffcb9ada9893bd8ea1be89529b774a44dccfd6755ce259ab157a4",
      evidenceRef:
        "PM linguistic approval in the supplied Batch 10 approval request; draft commit e203b34b5e19bafa85efaf76cf58fbb7721e909e; Product siemens-s7-300-sm331-ai2-9-12-14bit-7kb02-0ab0; MLFB 6ES7331-7KB02-0AB0. Recording time is an actual UTC observation, not the PM review timestamp.",
      note:
        "6ES7331-7KB02-0AB0: PM-approved Product-specific Persian wording, spacing and punctuation; the Latin identifier remains MLFB-only with typed isolation; no complete canonical title or input count is introduced.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-16T17:33:11Z",
      reviewedContentHash:
        "sha256:2a3d107c79fffcb9ada9893bd8ea1be89529b774a44dccfd6755ce259ab157a4",
      evidenceRef:
        "PM technical approval in the supplied Batch 10 approval request; draft commit e203b34b5e19bafa85efaf76cf58fbb7721e909e; Product siemens-s7-300-sm331-ai2-9-12-14bit-7kb02-0ab0; MLFB 6ES7331-7KB02-0AB0. Recording time is an actual UTC observation, not the PM review timestamp. Reused readiness-reviewed parsed text of Siemens Module Data, 05/2022, A5E00105505-AK; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf; section 6.8.1, printed pp305 and 310; section 6.8.2, printed pp313-314; visual inspection and direct-origin HTTP status NOT OBSERVED; no fresh retrieval.",
      note:
        "6ES7331-7KB02-0AB0: PM-approved exact MLFB and analog-input module type only. No approval of the Universal qualifier, complete canonical title or input count. The manufacturer's exact Universal label was not observed; two inputs is nominal and resistance measurement uses one measurement channel. Canonical data remains unchanged. No additional standalone electrical, lifecycle, availability, compatibility or operating-performance claims are approved.",
    },
  },
  {
    productId: "siemens-s7-300-sm331-ai8-13bit-1kf01-0ab0",
    shortDescription: sm331Ai8_13Bit1Kf01Copy,
    description: [sm331Ai8_13Bit1Kf01Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-16T17:32:37Z",
      reviewedContentHash:
        "sha256:9b8015c893fda3c9a340f6d2e9e0a3539312326ff1ce1918f1623119c30109f9",
      evidenceRef:
        "PM linguistic approval in the supplied Batch 10 approval request; draft commit e203b34b5e19bafa85efaf76cf58fbb7721e909e; Product siemens-s7-300-sm331-ai8-13bit-1kf01-0ab0; MLFB 6ES7331-1KF01-0AB0. Recording time is an actual UTC observation, not the PM review timestamp.",
      note:
        "6ES7331-1KF01-0AB0: PM-approved Product-specific Persian wording, spacing and punctuation; complete Latin identifier and numeric input count retain separate typed isolation.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-16T17:33:11Z",
      reviewedContentHash:
        "sha256:9b8015c893fda3c9a340f6d2e9e0a3539312326ff1ce1918f1623119c30109f9",
      evidenceRef:
        "PM technical approval in the supplied Batch 10 approval request; draft commit e203b34b5e19bafa85efaf76cf58fbb7721e909e; Product siemens-s7-300-sm331-ai8-13bit-1kf01-0ab0; MLFB 6ES7331-1KF01-0AB0. Recording time is an actual UTC observation, not the PM review timestamp. Reused readiness-reviewed parsed text of Siemens Software Development Kit for EC31, 08/2010, A5E01716340-03; https://cache.industry.siemens.com/dl/files/383/46360383/att_84101/v1/s7_mec_sdk_programming_manual_en-US_en-US.pdf; section A.3, Table A-4, printed p54; visual inspection and direct-origin HTTP status NOT OBSERVED; no fresh retrieval.",
      note:
        "6ES7331-1KF01-0AB0: PM-approved complete canonical identifier, analog-input module type and 8 analog inputs only. The cited SDK Table A-4 does not authorize compatibility claims. No additional standalone electrical, lifecycle, availability, compatibility or operating-performance claims are approved.",
    },
  },
  {
    productId: "siemens-s7-300-sm331-ai8-13bit-universal-1kf02-0ab0",
    shortDescription: sm331MlfbOnly1Kf02Copy,
    description: [sm331MlfbOnly1Kf02Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-16T18:54:19Z",
      reviewedContentHash:
        "sha256:a6381c0d18676bf6493922f44565530ef2918b5faef480243edf38e6ffcf58cd",
      evidenceRef:
        "PM linguistic approval in the supplied Batch 11 approval request; draft commit e2fbdd84911764be9b25dc3f7ddf3c2c51b2c900; Product siemens-s7-300-sm331-ai8-13bit-universal-1kf02-0ab0; MLFB 6ES7331-1KF02-0AB0. Recording time is an actual UTC observation, not the PM review timestamp.",
      note:
        "6ES7331-1KF02-0AB0: PM-approved Product-specific Persian wording, punctuation and spacing; the exact MLFB retains its own typed technical segment and Latin/numeric isolation in identical short and single-paragraph long copy.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-16T18:54:26Z",
      reviewedContentHash:
        "sha256:a6381c0d18676bf6493922f44565530ef2918b5faef480243edf38e6ffcf58cd",
      evidenceRef:
        "PM technical approval in the supplied Batch 11 approval request; draft commit e2fbdd84911764be9b25dc3f7ddf3c2c51b2c900; Product siemens-s7-300-sm331-ai8-13bit-universal-1kf02-0ab0; MLFB 6ES7331-1KF02-0AB0. Recording time is an actual UTC observation, not the PM review timestamp. Reused readiness-reviewed parsed text of Siemens S7-300 Module Data, 05/2022, A5E00105505-AK; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf; section 6.6, printed pp283 and 287; section 6.6.3, printed p292; visual inspection and direct-origin HTTP status NOT OBSERVED; no fresh retrieval or lifecycle verification.",
      note:
        "6ES7331-1KF02-0AB0: PM-approved exact MLFB identity and analog-input module type only. No approval of the complete canonical title, channel count, Universal, resolution, speed, isochronous operation, diagnostics, electrical capabilities, compatibility, lifecycle or availability. The exact Universal label was not observed; PTC mode supplies no analog values. Canonical data and earlier deferred issues remain unchanged.",
    },
  },
  {
    productId: "siemens-s7-300-sm331-ai8-9-12-14bit-7kf02-0ab0",
    shortDescription: sm331MlfbOnly7Kf02Copy,
    description: [sm331MlfbOnly7Kf02Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-16T18:54:19Z",
      reviewedContentHash:
        "sha256:a1075ecbbd65d260501efd5be06ba97aebf655ee6e62bed73e6e3e94d5c309ca",
      evidenceRef:
        "PM linguistic approval in the supplied Batch 11 approval request; draft commit e2fbdd84911764be9b25dc3f7ddf3c2c51b2c900; Product siemens-s7-300-sm331-ai8-9-12-14bit-7kf02-0ab0; MLFB 6ES7331-7KF02-0AB0. Recording time is an actual UTC observation, not the PM review timestamp.",
      note:
        "6ES7331-7KF02-0AB0: PM-approved Product-specific Persian wording, punctuation and spacing; the exact MLFB retains its own typed technical segment and Latin/numeric isolation in identical short and single-paragraph long copy.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-16T18:54:26Z",
      reviewedContentHash:
        "sha256:a1075ecbbd65d260501efd5be06ba97aebf655ee6e62bed73e6e3e94d5c309ca",
      evidenceRef:
        "PM technical approval in the supplied Batch 11 approval request; draft commit e2fbdd84911764be9b25dc3f7ddf3c2c51b2c900; Product siemens-s7-300-sm331-ai8-9-12-14bit-7kf02-0ab0; MLFB 6ES7331-7KF02-0AB0. Recording time is an actual UTC observation, not the PM review timestamp. Reused readiness-reviewed parsed text of Siemens S7-300 Module Data, 05/2022, A5E00105505-AK; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf; section 6.7.1, printed pp293 and 298-299; section 6.7.2, printed pp301-303; visual inspection and direct-origin HTTP status NOT OBSERVED; no fresh retrieval or lifecycle verification.",
      note:
        "6ES7331-7KF02-0AB0: PM-approved exact MLFB identity and analog-input module type only. No approval of the complete canonical title, channel count, Universal, resolution, speed, isochronous operation, diagnostics, electrical capabilities, compatibility, lifecycle or availability. Eight nominal inputs versus four with resistive transducers; resolution depends on integration time; Universal was not observed. Canonical data and earlier deferred issues remain unchanged.",
    },
  },
  {
    productId: "siemens-s7-300-sm331-ai8-14bit-isochronous-7hf01-0ab0",
    shortDescription: sm331MlfbOnly7Hf01Copy,
    description: [sm331MlfbOnly7Hf01Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-16T18:54:19Z",
      reviewedContentHash:
        "sha256:ec1b81cd5f1164c8c7cbe5992e2c55151e90f95965c378f62d4ffb0dc285e0dd",
      evidenceRef:
        "PM linguistic approval in the supplied Batch 11 approval request; draft commit e2fbdd84911764be9b25dc3f7ddf3c2c51b2c900; Product siemens-s7-300-sm331-ai8-14bit-isochronous-7hf01-0ab0; MLFB 6ES7331-7HF01-0AB0. Recording time is an actual UTC observation, not the PM review timestamp.",
      note:
        "6ES7331-7HF01-0AB0: PM-approved Product-specific Persian wording, punctuation and spacing; the exact MLFB retains its own typed technical segment and Latin/numeric isolation in identical short and single-paragraph long copy.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-16T18:54:26Z",
      reviewedContentHash:
        "sha256:ec1b81cd5f1164c8c7cbe5992e2c55151e90f95965c378f62d4ffb0dc285e0dd",
      evidenceRef:
        "PM technical approval in the supplied Batch 11 approval request; draft commit e2fbdd84911764be9b25dc3f7ddf3c2c51b2c900; Product siemens-s7-300-sm331-ai8-14bit-isochronous-7hf01-0ab0; MLFB 6ES7331-7HF01-0AB0. Recording time is an actual UTC observation, not the PM review timestamp. Reused readiness-reviewed parsed text of Siemens S7-300 Module Data, 05/2022, A5E00105505-AK; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf; section 6.5, printed p274; visual inspection and direct-origin HTTP status NOT OBSERVED; no fresh retrieval or lifecycle verification.",
      note:
        "6ES7331-7HF01-0AB0: PM-approved exact MLFB identity and analog-input module type only. No approval of the complete canonical title, channel count, Universal, resolution, speed, isochronous operation, diagnostics, electrical capabilities, compatibility, lifecycle or availability. Approval remains identity/type-only despite documented additional characteristics. Canonical data and earlier deferred issues remain unchanged.",
    },
  },
  {
    productId: "siemens-s7-300-sm331-ai8-16bit-voltage-current-7nf00-0ab0",
    shortDescription: sm331MlfbOnly7Nf00Copy,
    description: [sm331MlfbOnly7Nf00Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-16T18:54:19Z",
      reviewedContentHash:
        "sha256:89dbb40e8e4edac18eff9f9064d130efbf5973193491e8e4f959bcc56fc5d0f0",
      evidenceRef:
        "PM linguistic approval in the supplied Batch 11 approval request; draft commit e2fbdd84911764be9b25dc3f7ddf3c2c51b2c900; Product siemens-s7-300-sm331-ai8-16bit-voltage-current-7nf00-0ab0; MLFB 6ES7331-7NF00-0AB0. Recording time is an actual UTC observation, not the PM review timestamp.",
      note:
        "6ES7331-7NF00-0AB0: PM-approved Product-specific Persian wording, punctuation and spacing; the exact MLFB retains its own typed technical segment and Latin/numeric isolation in identical short and single-paragraph long copy.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-16T18:54:26Z",
      reviewedContentHash:
        "sha256:89dbb40e8e4edac18eff9f9064d130efbf5973193491e8e4f959bcc56fc5d0f0",
      evidenceRef:
        "PM technical approval in the supplied Batch 11 approval request; draft commit e2fbdd84911764be9b25dc3f7ddf3c2c51b2c900; Product siemens-s7-300-sm331-ai8-16bit-voltage-current-7nf00-0ab0; MLFB 6ES7331-7NF00-0AB0. Recording time is an actual UTC observation, not the PM review timestamp. Reused readiness-reviewed parsed text of Siemens S7-300 Module Data, 05/2022, A5E00105505-AK; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf; section 6.3, printed pp255, 259 and 261; visual inspection and direct-origin HTTP status NOT OBSERVED; no fresh retrieval or lifecycle verification.",
      note:
        "6ES7331-7NF00-0AB0: PM-approved exact MLFB identity and analog-input module type only. No approval of the complete canonical title, channel count, Universal, resolution, speed, isochronous operation, diagnostics, electrical capabilities, compatibility, lifecycle or availability. Approval remains identity/type-only. Canonical data and earlier deferred issues remain unchanged.",
    },
  },
  {
    productId: "siemens-s7-300-sm331-ai8-16bit-voltage-current-fast-7nf10-0ab0",
    shortDescription: sm331MlfbOnly7Nf10Copy,
    description: [sm331MlfbOnly7Nf10Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-16T18:54:19Z",
      reviewedContentHash:
        "sha256:2761cc070175cb99e5df37f0ed99e1738a739edae775d2e33dd1fc39690c3b67",
      evidenceRef:
        "PM linguistic approval in the supplied Batch 11 approval request; draft commit e2fbdd84911764be9b25dc3f7ddf3c2c51b2c900; Product siemens-s7-300-sm331-ai8-16bit-voltage-current-fast-7nf10-0ab0; MLFB 6ES7331-7NF10-0AB0. Recording time is an actual UTC observation, not the PM review timestamp.",
      note:
        "6ES7331-7NF10-0AB0: PM-approved Product-specific Persian wording, punctuation and spacing; the exact MLFB retains its own typed technical segment and Latin/numeric isolation in identical short and single-paragraph long copy.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-16T18:54:26Z",
      reviewedContentHash:
        "sha256:2761cc070175cb99e5df37f0ed99e1738a739edae775d2e33dd1fc39690c3b67",
      evidenceRef:
        "PM technical approval in the supplied Batch 11 approval request; draft commit e2fbdd84911764be9b25dc3f7ddf3c2c51b2c900; Product siemens-s7-300-sm331-ai8-16bit-voltage-current-fast-7nf10-0ab0; MLFB 6ES7331-7NF10-0AB0. Recording time is an actual UTC observation, not the PM review timestamp. Reused readiness-reviewed parsed text of Siemens S7-300 Module Data, 05/2022, A5E00105505-AK; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf; section 6.4, printed pp263-264; section 6.4.3, printed pp270-272; visual inspection and direct-origin HTTP status NOT OBSERVED; no fresh retrieval or lifecycle verification.",
      note:
        "6ES7331-7NF10-0AB0: PM-approved exact MLFB identity and analog-input module type only. No approval of the complete canonical title, channel count, Universal, resolution, speed, isochronous operation, diagnostics, electrical capabilities, compatibility, lifecycle or availability. Distinct four- and eight-channel modes; no unconditional eight-channel Fast claim. Canonical data and earlier deferred issues remain unchanged.",
    },
  },
  {
    productId: "siemens-s7-300-sm331-ai8-rtd-7pf01-0ab0",
    shortDescription: sm331MlfbOnly7Pf01Copy,
    description: [sm331MlfbOnly7Pf01Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-17T17:56:09Z",
      reviewedContentHash:
        "sha256:4b2fd6f390cc22aa86d7a436f921fddfe48220399f02dfdc344add49aa264e1a",
      evidenceRef:
        "PM linguistic approval in the supplied Batch 12 approval request; draft commit fafb281b45ff88903742a611acafec31a22f6063; Product siemens-s7-300-sm331-ai8-rtd-7pf01-0ab0; MLFB 6ES7331-7PF01-0AB0. Recording time is an actual UTC observation, not the PM review timestamp.",
      note:
        "6ES7331-7PF01-0AB0: PM-approved Product-specific Persian wording, punctuation and spacing; the exact MLFB retains its own typed technical segment and Latin/numeric isolation in identical short and single-paragraph long copy.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-17T17:56:19Z",
      reviewedContentHash:
        "sha256:4b2fd6f390cc22aa86d7a436f921fddfe48220399f02dfdc344add49aa264e1a",
      evidenceRef:
        "PM technical approval in the supplied Batch 12 approval request; draft commit fafb281b45ff88903742a611acafec31a22f6063; Product siemens-s7-300-sm331-ai8-rtd-7pf01-0ab0; MLFB 6ES7331-7PF01-0AB0. Recording time is an actual UTC observation, not the PM review timestamp. Reused readiness-reviewed parsed text of Siemens S7-300 Module Data, 05/2022, A5E00105505-AK; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf; section 6.9.1, printed pp316-317; section 6.9.4, printed pp325-328. Four- and eight-channel operating modes remain outside approval. Visual inspection and successful direct-origin HTTP status for accessible parsed documents NOT OBSERVED; no fresh retrieval or lifecycle verification.",
      note:
        "6ES7331-7PF01-0AB0: PM-approved exact MLFB identity and analog-input module type only. No approval of complete canonical titles, channel counts, RTD/thermocouple characteristics, Ex certification/suitability, resolution, electrical ranges, performance, compatibility, lifecycle or availability. Four- and eight-channel operating modes remain outside approval. Canonical data, earlier scopes and deferred issues remain unchanged.",
    },
  },
  {
    productId: "siemens-s7-300-sm331-ai6-thermocouple-16bit-7pe10-0ab0",
    shortDescription: sm331MlfbOnly7Pe10Copy,
    description: [sm331MlfbOnly7Pe10Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-17T17:56:09Z",
      reviewedContentHash:
        "sha256:f151e41395474c7ea56d74f247daefabe984f2c874f712ca6157549b1c77d194",
      evidenceRef:
        "PM linguistic approval in the supplied Batch 12 approval request; draft commit fafb281b45ff88903742a611acafec31a22f6063; Product siemens-s7-300-sm331-ai6-thermocouple-16bit-7pe10-0ab0; MLFB 6ES7331-7PE10-0AB0. Recording time is an actual UTC observation, not the PM review timestamp.",
      note:
        "6ES7331-7PE10-0AB0: PM-approved Product-specific Persian wording, punctuation and spacing; the exact MLFB retains its own typed technical segment and Latin/numeric isolation in identical short and single-paragraph long copy.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-17T17:56:19Z",
      reviewedContentHash:
        "sha256:f151e41395474c7ea56d74f247daefabe984f2c874f712ca6157549b1c77d194",
      evidenceRef:
        "PM technical approval in the supplied Batch 12 approval request; draft commit fafb281b45ff88903742a611acafec31a22f6063; Product siemens-s7-300-sm331-ai6-thermocouple-16bit-7pe10-0ab0; MLFB 6ES7331-7PE10-0AB0. Recording time is an actual UTC observation, not the PM review timestamp. Reused readiness-reviewed parsed text of Siemens S7-300 Module Data, 05/2022, A5E00105505-AK; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf; section 6.11, printed pp342-343. Exact identity and analog-input type established; no additional characteristic is approved. Visual inspection and successful direct-origin HTTP status for accessible parsed documents NOT OBSERVED; no fresh retrieval or lifecycle verification.",
      note:
        "6ES7331-7PE10-0AB0: PM-approved exact MLFB identity and analog-input module type only. No approval of complete canonical titles, channel counts, RTD/thermocouple characteristics, Ex certification/suitability, resolution, electrical ranges, performance, compatibility, lifecycle or availability. Exact identity and analog-input type established; no additional characteristic is approved. Canonical data, earlier scopes and deferred issues remain unchanged.",
    },
  },
  {
    productId: "siemens-s7-300-sm331-ai8-thermocouple-7pf11-0ab0",
    shortDescription: sm331MlfbOnly7Pf11Copy,
    description: [sm331MlfbOnly7Pf11Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-17T17:56:09Z",
      reviewedContentHash:
        "sha256:3f64cb913ca57a3f6eea0845bdcd7c1234c6cab4dae4dc5698d343f86c58cc4d",
      evidenceRef:
        "PM linguistic approval in the supplied Batch 12 approval request; draft commit fafb281b45ff88903742a611acafec31a22f6063; Product siemens-s7-300-sm331-ai8-thermocouple-7pf11-0ab0; MLFB 6ES7331-7PF11-0AB0. Recording time is an actual UTC observation, not the PM review timestamp.",
      note:
        "6ES7331-7PF11-0AB0: PM-approved Product-specific Persian wording, punctuation and spacing; the exact MLFB retains its own typed technical segment and Latin/numeric isolation in identical short and single-paragraph long copy.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-17T17:56:19Z",
      reviewedContentHash:
        "sha256:3f64cb913ca57a3f6eea0845bdcd7c1234c6cab4dae4dc5698d343f86c58cc4d",
      evidenceRef:
        "PM technical approval in the supplied Batch 12 approval request; draft commit fafb281b45ff88903742a611acafec31a22f6063; Product siemens-s7-300-sm331-ai8-thermocouple-7pf11-0ab0; MLFB 6ES7331-7PF11-0AB0. Recording time is an actual UTC observation, not the PM review timestamp. Reused readiness-reviewed parsed text of Siemens S7-300 Module Data, 05/2022, A5E00105505-AK; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf; section 6.10, printed pp329-330; section 6.10.3, printed pp339-341. Four- and eight-channel modes and compensation-wiring-dependent usable channels remain outside approval. Visual inspection and successful direct-origin HTTP status for accessible parsed documents NOT OBSERVED; no fresh retrieval or lifecycle verification.",
      note:
        "6ES7331-7PF11-0AB0: PM-approved exact MLFB identity and analog-input module type only. No approval of complete canonical titles, channel counts, RTD/thermocouple characteristics, Ex certification/suitability, resolution, electrical ranges, performance, compatibility, lifecycle or availability. Four- and eight-channel modes and compensation-wiring-dependent usable channels remain outside approval. Canonical data, earlier scopes and deferred issues remain unchanged.",
    },
  },
  {
    productId: "siemens-s7-300-sm331-ai4-0-4-20ma-ex-7rd00-0ab0",
    shortDescription: sm331MlfbOnly7Rd00Copy,
    description: [sm331MlfbOnly7Rd00Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-17T17:56:09Z",
      reviewedContentHash:
        "sha256:34b333674940106446f9e5a4da38aea5fd7d3a951943c917c22acfd742eee33f",
      evidenceRef:
        "PM linguistic approval in the supplied Batch 12 approval request; draft commit fafb281b45ff88903742a611acafec31a22f6063; Product siemens-s7-300-sm331-ai4-0-4-20ma-ex-7rd00-0ab0; MLFB 6ES7331-7RD00-0AB0. Recording time is an actual UTC observation, not the PM review timestamp.",
      note:
        "6ES7331-7RD00-0AB0: PM-approved Product-specific Persian wording, punctuation and spacing; the exact MLFB retains its own typed technical segment and Latin/numeric isolation in identical short and single-paragraph long copy.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-17T17:56:19Z",
      reviewedContentHash:
        "sha256:34b333674940106446f9e5a4da38aea5fd7d3a951943c917c22acfd742eee33f",
      evidenceRef:
        "PM technical approval in the supplied Batch 12 approval request; draft commit fafb281b45ff88903742a611acafec31a22f6063; Product siemens-s7-300-sm331-ai4-0-4-20ma-ex-7rd00-0ab0; MLFB 6ES7331-7RD00-0AB0. Recording time is an actual UTC observation, not the PM review timestamp. Reused readiness-reviewed official indexed exact-product datasheet text; https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES7331-7RD00-0AB0; printed p1/3, product description and Analog inputs. Readiness-reported direct tool retrieval returned 403 Forbidden; not a successful PDF read or parsed-PDF access. Recorded footer string: 1/29/2026; document observation only, no date-format interpretation or lifecycle inference. Visual inspection and successful direct-origin HTTP status for accessible parsed documents NOT OBSERVED; no fresh retrieval or lifecycle verification.",
      note:
        "6ES7331-7RD00-0AB0: PM-approved exact MLFB identity and analog-input module type only. No approval of complete canonical titles, channel counts, RTD/thermocouple characteristics, Ex certification/suitability, resolution, electrical ranges, performance, compatibility, lifecycle or availability. Readiness-reported direct tool retrieval returned 403 Forbidden; not a successful PDF read or parsed-PDF access. Recorded footer string: 1/29/2026; document observation only, no date-format interpretation or lifecycle inference. Canonical data, earlier scopes and deferred issues remain unchanged.",
    },
  },
  {
    productId: "siemens-s7-300-sm331-ai8-tc-ai4-pt100-ex-7sf00-0ab0",
    shortDescription: sm331MlfbOnly7Sf00Copy,
    description: [sm331MlfbOnly7Sf00Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-17T17:56:09Z",
      reviewedContentHash:
        "sha256:f0fd456293f7046a9e9d1a9bb3457bef6104cde1aca1f85000977cef9e23b344",
      evidenceRef:
        "PM linguistic approval in the supplied Batch 12 approval request; draft commit fafb281b45ff88903742a611acafec31a22f6063; Product siemens-s7-300-sm331-ai8-tc-ai4-pt100-ex-7sf00-0ab0; MLFB 6ES7331-7SF00-0AB0. Recording time is an actual UTC observation, not the PM review timestamp.",
      note:
        "6ES7331-7SF00-0AB0: PM-approved Product-specific Persian wording, punctuation and spacing; the exact MLFB retains its own typed technical segment and Latin/numeric isolation in identical short and single-paragraph long copy.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-17T17:56:19Z",
      reviewedContentHash:
        "sha256:f0fd456293f7046a9e9d1a9bb3457bef6104cde1aca1f85000977cef9e23b344",
      evidenceRef:
        "PM technical approval in the supplied Batch 12 approval request; draft commit fafb281b45ff88903742a611acafec31a22f6063; Product siemens-s7-300-sm331-ai8-tc-ai4-pt100-ex-7sf00-0ab0; MLFB 6ES7331-7SF00-0AB0. Recording time is an actual UTC observation, not the PM review timestamp. Reused readiness-accessed parsed exact-product datasheet text; https://support.industry.siemens.com/teddatasheet/?caller=SIOS&format=pdf&language=en&mlfbs=6ES73317SF000AB0; printed p1/3, product description and Analog inputs. Recorded footer string: 11/4/2025; document observation only, no date-format interpretation or lifecycle inference. Eight thermocouple versus four RTD inputs are mode-dependent alternatives, outside approval. Visual inspection and successful direct-origin HTTP status for accessible parsed documents NOT OBSERVED; no fresh retrieval or lifecycle verification.",
      note:
        "6ES7331-7SF00-0AB0: PM-approved exact MLFB identity and analog-input module type only. No approval of complete canonical titles, channel counts, RTD/thermocouple characteristics, Ex certification/suitability, resolution, electrical ranges, performance, compatibility, lifecycle or availability. Recorded footer string: 11/4/2025; document observation only, no date-format interpretation or lifecycle inference. Eight thermocouple versus four RTD inputs are mode-dependent alternatives, outside approval. Canonical data, earlier scopes and deferred issues remain unchanged.",
    },
  },
  {
    productId: "siemens-s7-300-sm331-ai2-hart-7tb00-0ab0",
    shortDescription: sm331MlfbOnly7Tb00Copy,
    description: [sm331MlfbOnly7Tb00Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-17T19:13:24Z",
      reviewedContentHash:
        "sha256:a6896ed2f4528cb62e0f001f5f683bdc5aa0ccde450d4876bce0b45fbb85bf98",
      evidenceRef:
        "PM linguistic approval in the supplied Batch 13 approval request; draft commit 1b92833003a32176546b7e8064e79a6b44a22591; Product siemens-s7-300-sm331-ai2-hart-7tb00-0ab0; MLFB 6ES7331-7TB00-0AB0; module type analog-input. Recording time is an actual UTC observation, not the PM review timestamp.",
      note:
        "6ES7331-7TB00-0AB0: PM-approved Product-specific Persian wording, punctuation and spacing, typed MLFB isolation and the correct Persian ورودی suffix in identical short and single-paragraph long copy.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-17T19:13:41Z",
      reviewedContentHash:
        "sha256:a6896ed2f4528cb62e0f001f5f683bdc5aa0ccde450d4876bce0b45fbb85bf98",
      evidenceRef:
        "PM technical approval in the supplied Batch 13 approval request; draft commit 1b92833003a32176546b7e8064e79a6b44a22591; Product siemens-s7-300-sm331-ai2-hart-7tb00-0ab0; MLFB 6ES7331-7TB00-0AB0; module type analog-input. Recording time is an actual UTC observation, not the PM review timestamp. Reused readiness-reviewed official indexed text of Siemens S7-300, ET 200M Ex I/O Modules, 04/2022, A5E00172008-AP; https://support.industry.siemens.com/cs/attachments/1096709/s7300_et200m_ex_io_modules_manual_en_en-US.pdf; section 4.4.4, printed p176. Readiness direct tool fetch returned 403 Forbidden; this was not a successful PDF read or parsed-PDF access. HART measurement modes and nominal counts remain outside approval. Printed pages are not assumed viewer indices. Visual inspection and successful direct-origin HTTP status for accessible parsed material NOT OBSERVED; no fresh retrieval or lifecycle verification.",
      note:
        "6ES7331-7TB00-0AB0: PM-approved exact MLFB identity and analog-input module type only. No approval of complete titles, counts, HART/U/I characteristics, resolution, diagnostics, electrical ranges, compatibility, certification, lifecycle, availability or performance. Readiness direct tool fetch returned 403 Forbidden; this was not a successful PDF read or parsed-PDF access. HART measurement modes and nominal counts remain outside approval. Canonical data, earlier scopes and deferred issues remain unchanged.",
    },
  },
  {
    productId: "siemens-s7-300-sm331-ai8-hart-7tf01-0ab0",
    shortDescription: sm331MlfbOnly7Tf01Copy,
    description: [sm331MlfbOnly7Tf01Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-17T19:13:24Z",
      reviewedContentHash:
        "sha256:8a24745ae08f5316c66cbe7a02673c6ee5a21d64238061d962217fa83c289a16",
      evidenceRef:
        "PM linguistic approval in the supplied Batch 13 approval request; draft commit 1b92833003a32176546b7e8064e79a6b44a22591; Product siemens-s7-300-sm331-ai8-hart-7tf01-0ab0; MLFB 6ES7331-7TF01-0AB0; module type analog-input. Recording time is an actual UTC observation, not the PM review timestamp.",
      note:
        "6ES7331-7TF01-0AB0: PM-approved Product-specific Persian wording, punctuation and spacing, typed MLFB isolation and the correct Persian ورودی suffix in identical short and single-paragraph long copy.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-17T19:13:41Z",
      reviewedContentHash:
        "sha256:8a24745ae08f5316c66cbe7a02673c6ee5a21d64238061d962217fa83c289a16",
      evidenceRef:
        "PM technical approval in the supplied Batch 13 approval request; draft commit 1b92833003a32176546b7e8064e79a6b44a22591; Product siemens-s7-300-sm331-ai8-hart-7tf01-0ab0; MLFB 6ES7331-7TF01-0AB0; module type analog-input. Recording time is an actual UTC observation, not the PM review timestamp. Reused readiness-reviewed official indexed text of Siemens HART analog modules, 11/2020, A5E00434623-AG; https://support.industry.siemens.com/cs/attachments/22063748/et200m_hart_analog_modules_manual_en-US_en-US.pdf; section 6.1, printed p55. Readiness direct tool fetch returned 403 Forbidden; this was not a successful PDF read or parsed-PDF access. HART measurement modes and nominal counts remain outside approval. Printed pages are not assumed viewer indices. Visual inspection and successful direct-origin HTTP status for accessible parsed material NOT OBSERVED; no fresh retrieval or lifecycle verification.",
      note:
        "6ES7331-7TF01-0AB0: PM-approved exact MLFB identity and analog-input module type only. No approval of complete titles, counts, HART/U/I characteristics, resolution, diagnostics, electrical ranges, compatibility, certification, lifecycle, availability or performance. Readiness direct tool fetch returned 403 Forbidden; this was not a successful PDF read or parsed-PDF access. HART measurement modes and nominal counts remain outside approval. Canonical data, earlier scopes and deferred issues remain unchanged.",
    },
  },
  {
    productId: "siemens-s7-300-sm332-ao2-ui-11-12bit-5hb01-0ab0",
    shortDescription: sm332MlfbOnly5Hb01Copy,
    description: [sm332MlfbOnly5Hb01Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-17T19:13:24Z",
      reviewedContentHash:
        "sha256:6552b4aa8b0764023e34078b81a23934b4e9e17615dc0296926a2f5bda4b7f63",
      evidenceRef:
        "PM linguistic approval in the supplied Batch 13 approval request; draft commit 1b92833003a32176546b7e8064e79a6b44a22591; Product siemens-s7-300-sm332-ao2-ui-11-12bit-5hb01-0ab0; MLFB 6ES7332-5HB01-0AB0; module type analog-output. Recording time is an actual UTC observation, not the PM review timestamp.",
      note:
        "6ES7332-5HB01-0AB0: PM-approved Product-specific Persian wording, punctuation and spacing, typed MLFB isolation and the correct Persian خروجی suffix in identical short and single-paragraph long copy.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-17T19:13:41Z",
      reviewedContentHash:
        "sha256:6552b4aa8b0764023e34078b81a23934b4e9e17615dc0296926a2f5bda4b7f63",
      evidenceRef:
        "PM technical approval in the supplied Batch 13 approval request; draft commit 1b92833003a32176546b7e8064e79a6b44a22591; Product siemens-s7-300-sm332-ao2-ui-11-12bit-5hb01-0ab0; MLFB 6ES7332-5HB01-0AB0; module type analog-output. Recording time is an actual UTC observation, not the PM review timestamp. Reused readiness-accessible parsed document text of Siemens S7-300 Module Data, 05/2022, A5E00105505-AK; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf; section 6.15, printed pp388-389. Voltage/current output configuration and nominal counts remain outside approval. Printed pages are not assumed viewer indices. Visual inspection and successful direct-origin HTTP status for accessible parsed material NOT OBSERVED; no fresh retrieval or lifecycle verification.",
      note:
        "6ES7332-5HB01-0AB0: PM-approved exact MLFB identity and analog-output module type only. No approval of complete titles, counts, HART/U/I characteristics, resolution, diagnostics, electrical ranges, compatibility, certification, lifecycle, availability or performance. Voltage/current output configuration and nominal counts remain outside approval. Canonical data, earlier scopes and deferred issues remain unchanged.",
    },
  },
  {
    productId: "siemens-s7-300-sm332-ao4-ui-diagnostics-5hd01-0ab0",
    shortDescription: sm332MlfbOnly5Hd01Copy,
    description: [sm332MlfbOnly5Hd01Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-17T19:13:24Z",
      reviewedContentHash:
        "sha256:23942831cb57197f2cf8bf5906c8acc4da25029b2238545e316f31b9901c767d",
      evidenceRef:
        "PM linguistic approval in the supplied Batch 13 approval request; draft commit 1b92833003a32176546b7e8064e79a6b44a22591; Product siemens-s7-300-sm332-ao4-ui-diagnostics-5hd01-0ab0; MLFB 6ES7332-5HD01-0AB0; module type analog-output. Recording time is an actual UTC observation, not the PM review timestamp.",
      note:
        "6ES7332-5HD01-0AB0: PM-approved Product-specific Persian wording, punctuation and spacing, typed MLFB isolation and the correct Persian خروجی suffix in identical short and single-paragraph long copy.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-17T19:13:41Z",
      reviewedContentHash:
        "sha256:23942831cb57197f2cf8bf5906c8acc4da25029b2238545e316f31b9901c767d",
      evidenceRef:
        "PM technical approval in the supplied Batch 13 approval request; draft commit 1b92833003a32176546b7e8064e79a6b44a22591; Product siemens-s7-300-sm332-ao4-ui-diagnostics-5hd01-0ab0; MLFB 6ES7332-5HD01-0AB0; module type analog-output. Recording time is an actual UTC observation, not the PM review timestamp. Reused readiness-accessible parsed document text of Siemens S7-300 Module Data, 05/2022, A5E00105505-AK; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf; section 6.14, printed p382. Voltage/current output configuration and nominal counts remain outside approval. Printed pages are not assumed viewer indices. Visual inspection and successful direct-origin HTTP status for accessible parsed material NOT OBSERVED; no fresh retrieval or lifecycle verification.",
      note:
        "6ES7332-5HD01-0AB0: PM-approved exact MLFB identity and analog-output module type only. No approval of complete titles, counts, HART/U/I characteristics, resolution, diagnostics, electrical ranges, compatibility, certification, lifecycle, availability or performance. Voltage/current output configuration and nominal counts remain outside approval. Canonical data, earlier scopes and deferred issues remain unchanged.",
    },
  },
  {
    productId: "siemens-s7-300-sm332-ao8-ui-diagnostics-5hf00-0ab0",
    shortDescription: sm332MlfbOnly5Hf00Copy,
    description: [sm332MlfbOnly5Hf00Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-17T19:13:24Z",
      reviewedContentHash:
        "sha256:27389a865bd2a8960e5ca1a428242d84f524aec88adf6132a596084fb716ba86",
      evidenceRef:
        "PM linguistic approval in the supplied Batch 13 approval request; draft commit 1b92833003a32176546b7e8064e79a6b44a22591; Product siemens-s7-300-sm332-ao8-ui-diagnostics-5hf00-0ab0; MLFB 6ES7332-5HF00-0AB0; module type analog-output. Recording time is an actual UTC observation, not the PM review timestamp.",
      note:
        "6ES7332-5HF00-0AB0: PM-approved Product-specific Persian wording, punctuation and spacing, typed MLFB isolation and the correct Persian خروجی suffix in identical short and single-paragraph long copy.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-17T19:13:41Z",
      reviewedContentHash:
        "sha256:27389a865bd2a8960e5ca1a428242d84f524aec88adf6132a596084fb716ba86",
      evidenceRef:
        "PM technical approval in the supplied Batch 13 approval request; draft commit 1b92833003a32176546b7e8064e79a6b44a22591; Product siemens-s7-300-sm332-ao8-ui-diagnostics-5hf00-0ab0; MLFB 6ES7332-5HF00-0AB0; module type analog-output. Recording time is an actual UTC observation, not the PM review timestamp. Reused readiness-accessible parsed document text of Siemens S7-300 Module Data, 05/2022, A5E00105505-AK; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf; section 6.12, printed p367. Voltage/current output configuration and nominal counts remain outside approval. Printed pages are not assumed viewer indices. Visual inspection and successful direct-origin HTTP status for accessible parsed material NOT OBSERVED; no fresh retrieval or lifecycle verification.",
      note:
        "6ES7332-5HF00-0AB0: PM-approved exact MLFB identity and analog-output module type only. No approval of complete titles, counts, HART/U/I characteristics, resolution, diagnostics, electrical ranges, compatibility, certification, lifecycle, availability or performance. Voltage/current output configuration and nominal counts remain outside approval. Canonical data, earlier scopes and deferred issues remain unchanged.",
    },
  },
  {
    productId: "siemens-s7-300-sm332-ao4-channel-isolated-16bit-7nd02-0ab0",
    shortDescription: sm332MlfbOnly7Nd02Copy,
    description: [sm332MlfbOnly7Nd02Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-19T09:05:22Z",
      reviewedContentHash:
        "sha256:31d12dc70ce3271779b913a916729290ef8622fd2b65bc0f0de3c728fe81c3b2",
      evidenceRef:
        "PM linguistic approval in the supplied Batch 14 approval request; draft commit 31cc7c87d22df51dde622c5f1ef34c942acefad6; Product siemens-s7-300-sm332-ao4-channel-isolated-16bit-7nd02-0ab0; MLFB 6ES7332-7ND02-0AB0; module type analog-output. Recording time is an actual UTC observation, not the PM review timestamp.",
      note:
        "6ES7332-7ND02-0AB0: PM-approved Persian wording, spacing and punctuation, with typed MLFB isolation and the analog-output suffix in identical short and single-paragraph long copy.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-19T09:05:23Z",
      reviewedContentHash:
        "sha256:31d12dc70ce3271779b913a916729290ef8622fd2b65bc0f0de3c728fe81c3b2",
      evidenceRef:
        "PM technical approval in the supplied Batch 14 approval request; draft commit 31cc7c87d22df51dde622c5f1ef34c942acefad6; Product siemens-s7-300-sm332-ao4-channel-isolated-16bit-7nd02-0ab0; MLFB 6ES7332-7ND02-0AB0; module type analog-output. Recording time is an actual UTC observation, not the PM review timestamp. Reused readiness parsed manual text from Siemens S7-300 Module Data, 05/2022, A5E00105505-AK; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf; section 6.13, printed p373. Indexed Industry Mall wording \"4 AI\" conflicts with the parsed manual's analog-output type; https://mall.industry.siemens.com/mall/en/sg/Catalog/Product/6ES7332-7ND02-0AB0. No count approval, catalog correction or canonical-data change. Printed pages are not assumed viewer indices. Visual inspection and direct-origin HTTP status were NOT OBSERVED. No fresh retrieval or lifecycle verification.",
      note:
        "6ES7332-7ND02-0AB0: PM-approved exact MLFB identity and analog-output module type only. Full titles, counts, isolation, resolution, Ex, HART, electrical ranges, operating characteristics, compatibility, certification, lifecycle and availability remain outside approval.",
    },
  },
  {
    productId: "siemens-s7-300-sm332-ao4-0-4-20ma-ex-5rd00-0ab0",
    shortDescription: sm332MlfbOnly5Rd00Copy,
    description: [sm332MlfbOnly5Rd00Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-19T09:05:22Z",
      reviewedContentHash:
        "sha256:69abfc57a5946c926b15c7b1e0e18c4c742e7f3f26211a5fc568ea4953344e03",
      evidenceRef:
        "PM linguistic approval in the supplied Batch 14 approval request; draft commit 31cc7c87d22df51dde622c5f1ef34c942acefad6; Product siemens-s7-300-sm332-ao4-0-4-20ma-ex-5rd00-0ab0; MLFB 6ES7332-5RD00-0AB0; module type analog-output. Recording time is an actual UTC observation, not the PM review timestamp.",
      note:
        "6ES7332-5RD00-0AB0: PM-approved Persian wording, spacing and punctuation, with typed MLFB isolation and the analog-output suffix in identical short and single-paragraph long copy.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-19T09:05:23Z",
      reviewedContentHash:
        "sha256:69abfc57a5946c926b15c7b1e0e18c4c742e7f3f26211a5fc568ea4953344e03",
      evidenceRef:
        "PM technical approval in the supplied Batch 14 approval request; draft commit 31cc7c87d22df51dde622c5f1ef34c942acefad6; Product siemens-s7-300-sm332-ao4-0-4-20ma-ex-5rd00-0ab0; MLFB 6ES7332-5RD00-0AB0; module type analog-output. Recording time is an actual UTC observation, not the PM review timestamp. Reused readiness official indexed excerpts and parsed text from Siemens S7-300, ET 200M Ex I/O Modules, 04/2022, A5E00172008-AP; https://cache.industry.siemens.com/dl/files/709/1096709/att_885614/v2/s7300_et200m_ex_io_modules_manual_en_en-US.pdf?download=true; section 3.13, printed p153. Printed pages are not assumed viewer indices. Visual inspection and direct-origin HTTP status were NOT OBSERVED. No fresh retrieval or lifecycle verification.",
      note:
        "6ES7332-5RD00-0AB0: PM-approved exact MLFB identity and analog-output module type only. Full titles, counts, isolation, resolution, Ex, HART, electrical ranges, operating characteristics, compatibility, certification, lifecycle and availability remain outside approval.",
    },
  },
  {
    productId: "siemens-s7-300-sm332-ao2-hart-5tb00-0ab0",
    shortDescription: sm332MlfbOnly5Tb00Copy,
    description: [sm332MlfbOnly5Tb00Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-19T09:05:22Z",
      reviewedContentHash:
        "sha256:da80c757ca2bbc694590e9eebad1aef4b604dc05f092ca139688653af0f880bf",
      evidenceRef:
        "PM linguistic approval in the supplied Batch 14 approval request; draft commit 31cc7c87d22df51dde622c5f1ef34c942acefad6; Product siemens-s7-300-sm332-ao2-hart-5tb00-0ab0; MLFB 6ES7332-5TB00-0AB0; module type analog-output. Recording time is an actual UTC observation, not the PM review timestamp.",
      note:
        "6ES7332-5TB00-0AB0: PM-approved Persian wording, spacing and punctuation, with typed MLFB isolation and the analog-output suffix in identical short and single-paragraph long copy.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-19T09:05:23Z",
      reviewedContentHash:
        "sha256:da80c757ca2bbc694590e9eebad1aef4b604dc05f092ca139688653af0f880bf",
      evidenceRef:
        "PM technical approval in the supplied Batch 14 approval request; draft commit 31cc7c87d22df51dde622c5f1ef34c942acefad6; Product siemens-s7-300-sm332-ao2-hart-5tb00-0ab0; MLFB 6ES7332-5TB00-0AB0; module type analog-output. Recording time is an actual UTC observation, not the PM review timestamp. Reused readiness official indexed excerpts and parsed text from Siemens S7-300, ET 200M Ex I/O Modules, 04/2022, A5E00172008-AP; https://cache.industry.siemens.com/dl/files/709/1096709/att_885614/v2/s7300_et200m_ex_io_modules_manual_en_en-US.pdf?download=true; section 4.4.5, printed p183. Printed pages are not assumed viewer indices. Visual inspection and direct-origin HTTP status were NOT OBSERVED. No fresh retrieval or lifecycle verification.",
      note:
        "6ES7332-5TB00-0AB0: PM-approved exact MLFB identity and analog-output module type only. Full titles, counts, isolation, resolution, Ex, HART, electrical ranges, operating characteristics, compatibility, certification, lifecycle and availability remain outside approval.",
    },
  },
  {
    productId: "siemens-s7-300-sm332-ao8-hart-8tf01-0ab0",
    shortDescription: sm332MlfbOnly8Tf01Copy,
    description: [sm332MlfbOnly8Tf01Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-19T09:05:22Z",
      reviewedContentHash:
        "sha256:91d11f448e3ab88cecc1845903aae8b1b689ebadf47f98f24b515eec9949690d",
      evidenceRef:
        "PM linguistic approval in the supplied Batch 14 approval request; draft commit 31cc7c87d22df51dde622c5f1ef34c942acefad6; Product siemens-s7-300-sm332-ao8-hart-8tf01-0ab0; MLFB 6ES7332-8TF01-0AB0; module type analog-output. Recording time is an actual UTC observation, not the PM review timestamp.",
      note:
        "6ES7332-8TF01-0AB0: PM-approved Persian wording, spacing and punctuation, with typed MLFB isolation and the analog-output suffix in identical short and single-paragraph long copy.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-19T09:05:23Z",
      reviewedContentHash:
        "sha256:91d11f448e3ab88cecc1845903aae8b1b689ebadf47f98f24b515eec9949690d",
      evidenceRef:
        "PM technical approval in the supplied Batch 14 approval request; draft commit 31cc7c87d22df51dde622c5f1ef34c942acefad6; Product siemens-s7-300-sm332-ao8-hart-8tf01-0ab0; MLFB 6ES7332-8TF01-0AB0; module type analog-output. Recording time is an actual UTC observation, not the PM review timestamp. Reused readiness official indexed excerpts and parsed text from Siemens HART analog modules, 11/2020, A5E00434623-AG; https://support.industry.siemens.com/cs/attachments/22063748/et200m_hart_analog_modules_manual_en-US_en-US.pdf?download=true; section 6.2, printed p61. Printed pages are not assumed viewer indices. Visual inspection and direct-origin HTTP status were NOT OBSERVED. No fresh retrieval or lifecycle verification.",
      note:
        "6ES7332-8TF01-0AB0: PM-approved exact MLFB identity and analog-output module type only. Full titles, counts, isolation, resolution, Ex, HART, electrical ranges, operating characteristics, compatibility, certification, lifecycle and availability remain outside approval.",
    },
  },
  {
    productId: "siemens-siplus-s7-300-sm332-ao2-ui-5hb01-2ab0",
    shortDescription: siplusSm332MlfbOnly5Hb01Copy,
    description: [siplusSm332MlfbOnly5Hb01Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-19T09:05:22Z",
      reviewedContentHash:
        "sha256:2fc22d6c41f2e4492722c6809128ea38ebaebd1b6bff51877c96ebb2e4900374",
      evidenceRef:
        "PM linguistic approval in the supplied Batch 14 approval request; draft commit 31cc7c87d22df51dde622c5f1ef34c942acefad6; Product siemens-siplus-s7-300-sm332-ao2-ui-5hb01-2ab0; MLFB 6AG1332-5HB01-2AB0; module type analog-output. Recording time is an actual UTC observation, not the PM review timestamp.",
      note:
        "6AG1332-5HB01-2AB0: PM-approved Persian wording, spacing and punctuation, with typed MLFB isolation and the analog-output suffix in identical short and single-paragraph long copy.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-19T09:05:23Z",
      reviewedContentHash:
        "sha256:2fc22d6c41f2e4492722c6809128ea38ebaebd1b6bff51877c96ebb2e4900374",
      evidenceRef:
        "PM technical approval in the supplied Batch 14 approval request; draft commit 31cc7c87d22df51dde622c5f1ef34c942acefad6; Product siemens-siplus-s7-300-sm332-ao2-ui-5hb01-2ab0; MLFB 6AG1332-5HB01-2AB0; module type analog-output. Recording time is an actual UTC observation, not the PM review timestamp. Reused readiness parsed manual text from Siemens S7-300 Module Data, 05/2022, A5E00105505-AK; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf; section 1.7, printed p28 and section 6.15, printed p388. The parsed text identifies the exact SIPLUS order number, distinct from 6ES7332-5HB01-0AB0. The SIPLUS Mall and datasheet URLs were inaccessible through the reader, with no numeric status reported. Printed pages are not assumed viewer indices. Visual inspection and direct-origin HTTP status were NOT OBSERVED. No fresh retrieval or lifecycle verification.",
      note:
        "6AG1332-5HB01-2AB0: PM-approved exact MLFB identity and analog-output module type only. Full titles, counts, isolation, resolution, Ex, HART, electrical ranges, operating characteristics, compatibility, certification, lifecycle and availability remain outside approval.",
    },
  },
  {
    productId: "siemens-siplus-s7-300-sm332-ao8-ui-5hf00-2ab0",
    shortDescription: siplusSm332MlfbOnly5Hf00Copy,
    description: [siplusSm332MlfbOnly5Hf00Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-19T09:57:17Z",
      reviewedContentHash:
        "sha256:335779e11d5d493187d7dccc5663fe7836ae473f0771d1f18311b828c56973d9",
      evidenceRef:
        "PM linguistic approval in the supplied Batch 15 approval request; draft commit 55aafe89238e3c68dac886358e9d9fcda753b4a2; Product siemens-siplus-s7-300-sm332-ao8-ui-5hf00-2ab0; MLFB 6AG1332-5HF00-2AB0; module type analog-output. Recording time is an actual UTC observation, not the PM review timestamp.",
      note:
        "6AG1332-5HF00-2AB0: PM-approved Persian wording, punctuation and spacing, typed MLFB isolation, and the exact خروجی آنالوگ wording in identical short and single-paragraph long descriptions.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-19T09:57:18Z",
      reviewedContentHash:
        "sha256:335779e11d5d493187d7dccc5663fe7836ae473f0771d1f18311b828c56973d9",
      evidenceRef:
        "PM technical approval in the supplied Batch 15 approval request; draft commit 55aafe89238e3c68dac886358e9d9fcda753b4a2; Product siemens-siplus-s7-300-sm332-ao8-ui-5hf00-2ab0; MLFB 6AG1332-5HF00-2AB0; module type analog-output. Recording time is an actual UTC observation, not the PM review timestamp. Reused readiness parsed text from Siemens S7-300 Module Data, 05/2022, A5E00105505-AK; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf; section 1.7, printed p28 and section 6.12, printed p367. Distinct from the standard order number 6ES7332-5HF00-0AB0. Printed pages are not assumed viewer indices. Visual inspection and successful direct-origin HTTP status for parsed material were NOT OBSERVED. No fresh retrieval or lifecycle verification.",
      note:
        "6AG1332-5HF00-2AB0: PM-approved exact MLFB identity and analog-output module type only. Full titles, counts, resolution, speed, electrical or operating characteristics, compatibility, certification, lifecycle and availability remain outside approval.",
    },
  },
  {
    productId: "siemens-s7-300-sm334-ai4-ao2-8bit-0ce01-0aa0",
    shortDescription: sm334MlfbOnly0Ce01Copy,
    description: [sm334MlfbOnly0Ce01Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-19T09:57:17Z",
      reviewedContentHash:
        "sha256:e4d3dfb326ba107c2fd3b278b53a02f994b88a1f58b222431d260f85da229f11",
      evidenceRef:
        "PM linguistic approval in the supplied Batch 15 approval request; draft commit 55aafe89238e3c68dac886358e9d9fcda753b4a2; Product siemens-s7-300-sm334-ai4-ao2-8bit-0ce01-0aa0; MLFB 6ES7334-0CE01-0AA0; module type analog-io. Recording time is an actual UTC observation, not the PM review timestamp.",
      note:
        "6ES7334-0CE01-0AA0: PM-approved Persian wording, punctuation and spacing, typed MLFB isolation, and the exact ورودی و خروجی آنالوگ wording in identical short and single-paragraph long descriptions.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-19T09:57:18Z",
      reviewedContentHash:
        "sha256:e4d3dfb326ba107c2fd3b278b53a02f994b88a1f58b222431d260f85da229f11",
      evidenceRef:
        "PM technical approval in the supplied Batch 15 approval request; draft commit 55aafe89238e3c68dac886358e9d9fcda753b4a2; Product siemens-s7-300-sm334-ai4-ao2-8bit-0ce01-0aa0; MLFB 6ES7334-0CE01-0AA0; module type analog-io. Recording time is an actual UTC observation, not the PM review timestamp. Reused readiness parsed text from Siemens S7-300 Module Data, 05/2022, A5E00105505-AK; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf; section 6.16, printed p395. Printed pages are not assumed viewer indices. Visual inspection and successful direct-origin HTTP status for parsed material were NOT OBSERVED. No fresh retrieval or lifecycle verification.",
      note:
        "6ES7334-0CE01-0AA0: PM-approved exact MLFB identity and mixed analog input and output module type only. Full titles, counts, resolution, speed, electrical or operating characteristics, compatibility, certification, lifecycle and availability remain outside approval.",
    },
  },
  {
    productId: "siemens-s7-300-sm334-ai4-ao2-12bit-0ke00-0ab0",
    shortDescription: sm334MlfbOnly0Ke00Copy,
    description: [sm334MlfbOnly0Ke00Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-19T09:57:17Z",
      reviewedContentHash:
        "sha256:b8d05d32718ace7c27bba9c90964e672228b8960fa504062bb6e7a7f0fe390bf",
      evidenceRef:
        "PM linguistic approval in the supplied Batch 15 approval request; draft commit 55aafe89238e3c68dac886358e9d9fcda753b4a2; Product siemens-s7-300-sm334-ai4-ao2-12bit-0ke00-0ab0; MLFB 6ES7334-0KE00-0AB0; module type analog-io. Recording time is an actual UTC observation, not the PM review timestamp.",
      note:
        "6ES7334-0KE00-0AB0: PM-approved Persian wording, punctuation and spacing, typed MLFB isolation, and the exact ورودی و خروجی آنالوگ wording in identical short and single-paragraph long descriptions.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-19T09:57:18Z",
      reviewedContentHash:
        "sha256:b8d05d32718ace7c27bba9c90964e672228b8960fa504062bb6e7a7f0fe390bf",
      evidenceRef:
        "PM technical approval in the supplied Batch 15 approval request; draft commit 55aafe89238e3c68dac886358e9d9fcda753b4a2; Product siemens-s7-300-sm334-ai4-ao2-12bit-0ke00-0ab0; MLFB 6ES7334-0KE00-0AB0; module type analog-io. Recording time is an actual UTC observation, not the PM review timestamp. Reused readiness parsed text from Siemens S7-300 Module Data, 05/2022, A5E00105505-AK; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf; section 6.17, printed p401. Printed pages are not assumed viewer indices. Visual inspection and successful direct-origin HTTP status for parsed material were NOT OBSERVED. No fresh retrieval or lifecycle verification.",
      note:
        "6ES7334-0KE00-0AB0: PM-approved exact MLFB identity and mixed analog input and output module type only. Full titles, counts, resolution, speed, electrical or operating characteristics, compatibility, certification, lifecycle and availability remain outside approval.",
    },
  },
  {
    productId: "siemens-siplus-s7-300-sm334-ai4-ao2-12bit-0ke00-7ab0",
    shortDescription: siplusSm334MlfbOnly0Ke00Copy,
    description: [siplusSm334MlfbOnly0Ke00Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-19T09:57:17Z",
      reviewedContentHash:
        "sha256:31c4b179029b64012767dae1d797942be038a1fd2864b31386de93e7c3941fbb",
      evidenceRef:
        "PM linguistic approval in the supplied Batch 15 approval request; draft commit 55aafe89238e3c68dac886358e9d9fcda753b4a2; Product siemens-siplus-s7-300-sm334-ai4-ao2-12bit-0ke00-7ab0; MLFB 6AG1334-0KE00-7AB0; module type analog-io. Recording time is an actual UTC observation, not the PM review timestamp.",
      note:
        "6AG1334-0KE00-7AB0: PM-approved Persian wording, punctuation and spacing, typed MLFB isolation, and the exact ورودی و خروجی آنالوگ wording in identical short and single-paragraph long descriptions.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-19T09:57:18Z",
      reviewedContentHash:
        "sha256:31c4b179029b64012767dae1d797942be038a1fd2864b31386de93e7c3941fbb",
      evidenceRef:
        "PM technical approval in the supplied Batch 15 approval request; draft commit 55aafe89238e3c68dac886358e9d9fcda753b4a2; Product siemens-siplus-s7-300-sm334-ai4-ao2-12bit-0ke00-7ab0; MLFB 6AG1334-0KE00-7AB0; module type analog-io. Recording time is an actual UTC observation, not the PM review timestamp. Reused readiness parsed text from Siemens S7-300 Module Data, 05/2022, A5E00105505-AK; https://cache.industry.siemens.com/dl/files/629/8859629/att_55794/v1/s7300_module_data_manual_en-US_en-US.pdf; section 1.7, printed p28. Siemens ST 70, 2023, SIPLUS SM 334; https://cache.industry.siemens.com/dl/files/167/109744167/att_1145924/v1/simatic-st70-complete-english-2023.pdf; printed p5/104. Module Data section 6.17, printed p401 lists a separate SIPLUS -2AB0 order number and is not evidence for -7AB0. Printed pages are not assumed viewer indices. Visual inspection and successful direct-origin HTTP status for parsed material were NOT OBSERVED. No fresh retrieval or lifecycle verification.",
      note:
        "6AG1334-0KE00-7AB0: PM-approved exact MLFB identity and mixed analog input and output module type only. Full titles, counts, resolution, speed, electrical or operating characteristics, compatibility, certification, lifecycle and availability remain outside approval.",
    },
  },
  {
    productId: "siemens-s7-300-sm335-ai4-ao4-14bit-7hg01-0ab0",
    shortDescription: sm335MlfbOnly7Hg01Copy,
    description: [sm335MlfbOnly7Hg01Copy],
    provenance: "ai-assisted",
    linguisticReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-19T09:57:17Z",
      reviewedContentHash:
        "sha256:5977e85f4e4304fe10efa342a31b69830981b800d55a7f2d7d6797a0915359a8",
      evidenceRef:
        "PM linguistic approval in the supplied Batch 15 approval request; draft commit 55aafe89238e3c68dac886358e9d9fcda753b4a2; Product siemens-s7-300-sm335-ai4-ao4-14bit-7hg01-0ab0; MLFB 6ES7335-7HG01-0AB0; module type analog-io. Recording time is an actual UTC observation, not the PM review timestamp.",
      note:
        "6ES7335-7HG01-0AB0: PM-approved Persian wording, punctuation and spacing, typed MLFB isolation, and the exact ورودی و خروجی آنالوگ wording in identical short and single-paragraph long descriptions.",
    },
    technicalReview: {
      decision: "approved",
      reviewerId: "Siemiran",
      reviewedAt: "2026-11-19T09:57:18Z",
      reviewedContentHash:
        "sha256:5977e85f4e4304fe10efa342a31b69830981b800d55a7f2d7d6797a0915359a8",
      evidenceRef:
        "PM technical approval in the supplied Batch 15 approval request; draft commit 55aafe89238e3c68dac886358e9d9fcda753b4a2; Product siemens-s7-300-sm335-ai4-ao4-14bit-7hg01-0ab0; MLFB 6ES7335-7HG01-0AB0; module type analog-io. Recording time is an actual UTC observation, not the PM review timestamp. Reused readiness indexed and parsed FAQ text from Siemens Front Connector Selection, V2.0, 15 October 2008, ID 23060726; https://cache.industry.siemens.com/dl/files/726/23060726/att_66628/v1/23060726_s7-300_kabel_und_zubehoer_zuordnung_stecker_baugruppe_e.pdf; section 1.3 Table 7, printed p13/16. The separate SM 335 manual request returned 403 in the reader and supplied no evidence. The usable indexed and parsed FAQ is a separate source. Printed pages are not assumed viewer indices. Visual inspection and successful direct-origin HTTP status for parsed material were NOT OBSERVED. No fresh retrieval or lifecycle verification.",
      note:
        "6ES7335-7HG01-0AB0: PM-approved exact MLFB identity and mixed analog input and output module type only. Full titles, counts, resolution, speed, electrical or operating characteristics, compatibility, certification, lifecycle and availability remain outside approval.",
    },
  },
  {
    productId: "siemens-s7-300-sm335-ai4-ao4-14bit-7hg02-0ab0",
    shortDescription: sm335MlfbOnly7Hg02Copy,
    description: [sm335MlfbOnly7Hg02Copy],
    provenance: "ai-assisted",
    linguisticReview: { decision: "pending" },
    technicalReview: { decision: "pending" },
  },
  {
    productId: "siemens-s7-300-im360-3aa01-0aa0",
    shortDescription: im360MlfbOnly3Aa01Copy,
    description: [im360MlfbOnly3Aa01Copy],
    provenance: "ai-assisted",
    linguisticReview: { decision: "pending" },
    technicalReview: { decision: "pending" },
  },
  {
    productId: "siemens-s7-300-im361-3ca01-0aa0",
    shortDescription: im361MlfbOnly3Ca01Copy,
    description: [im361MlfbOnly3Ca01Copy],
    provenance: "ai-assisted",
    linguisticReview: { decision: "pending" },
    technicalReview: { decision: "pending" },
  },
  {
    productId: "siemens-s7-300-im365-0ba01-0aa0",
    shortDescription: im365MlfbOnly0Ba01Copy,
    description: [im365MlfbOnly0Ba01Copy],
    provenance: "ai-assisted",
    linguisticReview: { decision: "pending" },
    technicalReview: { decision: "pending" },
  },
  {
    productId: "siemens-s7-300-im365-0ba81-0aa0",
    shortDescription: im365MlfbOnly0Ba81Copy,
    description: [im365MlfbOnly0Ba81Copy],
    provenance: "ai-assisted",
    linguisticReview: { decision: "pending" },
    technicalReview: { decision: "pending" },
  },
] as const satisfies readonly PersianProductCopyOverlay[];
