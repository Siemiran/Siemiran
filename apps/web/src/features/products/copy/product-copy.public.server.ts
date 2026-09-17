import "server-only";

import type { AppLocale } from "@/i18n/routing";

import { normalizeProductSearchValue } from "../presentation/product.search";
import type { Product } from "../types/product.types";
import {
  assertResolverIssuedProductCopy,
  resolveProductCopy,
} from "./product-copy.resolver";
import { serializeProductCopyParagraphForSearch } from "./product-copy.serializer";
import type { ResolvedProductCopy } from "./product-copy.types";
import type {
  ProductListItemViewModel,
  PublicProductCardCopyDTO,
  PublicProductCopyParagraphDTO,
  PublicProductRecord,
} from "./product-copy.public-types";

function clonePublicParagraph(
  paragraph: ResolvedProductCopy["shortDescription"]
): PublicProductCopyParagraphDTO {
  return Object.freeze(
    paragraph.map((segment) => Object.freeze({ ...segment }))
  );
}

type PublicPrimitive = string | number | boolean | null | undefined;

type ProductBoundaryDisposition = "public" | "forbidden-copy";

type ProductRequirednessPolicy = {
  readonly [Key in keyof Product]-?: Pick<Product, Key> extends Required<
    Pick<Product, Key>
  >
    ? "required"
    : "optional";
};

type ProductValueValidator<Key extends keyof Product> = (
  value: unknown
) => value is Product[Key];

type ProductBoundaryRule<Key extends keyof Product> = Readonly<{
  disposition: ProductBoundaryDisposition;
  requiredness: ProductRequirednessPolicy[Key];
  validate: ProductValueValidator<Key>;
}>;

type ProductBoundaryPolicy = {
  readonly [Key in keyof Product]-?: ProductBoundaryRule<Key>;
};

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

function optional<Value>(
  validate: (value: unknown) => value is Value
): (value: unknown) => value is Value | undefined {
  return (value): value is Value | undefined =>
    value === undefined || validate(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isString);
}

function isProductImages(value: unknown): value is Product["images"] {
  return Array.isArray(value) && value.length > 0 && value.every(isString);
}

function isUnknownRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isStringRecord(value: unknown): value is Record<string, string> {
  return (
    isUnknownRecord(value) &&
    Reflect.ownKeys(value).every(
      (key) => typeof key === "string" && isString(value[key])
    )
  );
}

function isProductDownloadType(
  value: unknown
): value is Product["downloads"][number]["type"] {
  return (
    value === "datasheet" ||
    value === "manual" ||
    value === "firmware" ||
    value === "certificate" ||
    value === "software" ||
    value === "cad"
  );
}

function isProductDownload(
  value: unknown
): value is Product["downloads"][number] {
  if (!isUnknownRecord(value)) {
    return false;
  }

  const keys = Reflect.ownKeys(value);

  return (
    keys.length === 6 &&
    keys.every(
      (key) =>
        key === "id" ||
        key === "title" ||
        key === "type" ||
        key === "language" ||
        key === "size" ||
        key === "file"
    ) &&
    isString(value.id) &&
    isString(value.title) &&
    isProductDownloadType(value.type) &&
    isString(value.language) &&
    isString(value.size) &&
    isString(value.file)
  );
}

function isProductDownloads(value: unknown): value is Product["downloads"] {
  return Array.isArray(value) && value.every(isProductDownload);
}

function isProductLifecycle(
  value: unknown
): value is Exclude<Product["lifecycle"], undefined> {
  return value === "active" || value === "legacy" || value === "discontinued";
}

const PRODUCT_BOUNDARY_POLICY: ProductBoundaryPolicy = {
  id: {
    disposition: "public",
    requiredness: "required",
    validate: isString,
  },
  slug: {
    disposition: "public",
    requiredness: "required",
    validate: isString,
  },
  title: {
    disposition: "public",
    requiredness: "required",
    validate: isString,
  },
  shortDescription: {
    disposition: "forbidden-copy",
    requiredness: "required",
    validate: isString,
  },
  description: {
    disposition: "forbidden-copy",
    requiredness: "optional",
    validate: optional(isString),
  },
  brandId: {
    disposition: "public",
    requiredness: "required",
    validate: isString,
  },
  categoryId: {
    disposition: "public",
    requiredness: "required",
    validate: isString,
  },
  familyId: {
    disposition: "public",
    requiredness: "required",
    validate: isString,
  },
  seriesId: {
    disposition: "public",
    requiredness: "optional",
    validate: optional(isString),
  },
  productTypeId: {
    disposition: "public",
    requiredness: "optional",
    validate: optional(isString),
  },
  variantId: {
    disposition: "public",
    requiredness: "optional",
    validate: optional(isString),
  },
  partNumber: {
    disposition: "public",
    requiredness: "required",
    validate: isString,
  },
  manufacturerPartNumber: {
    disposition: "public",
    requiredness: "optional",
    validate: optional(isString),
  },
  ean: {
    disposition: "public",
    requiredness: "optional",
    validate: optional(isString),
  },
  images: {
    disposition: "public",
    requiredness: "required",
    validate: isProductImages,
  },
  specifications: {
    disposition: "public",
    requiredness: "optional",
    validate: optional(isStringRecord),
  },
  downloads: {
    disposition: "public",
    requiredness: "required",
    validate: isProductDownloads,
  },
  compatibility: {
    disposition: "public",
    requiredness: "optional",
    validate: optional(isStringArray),
  },
  accessories: {
    disposition: "public",
    requiredness: "optional",
    validate: optional(isStringArray),
  },
  relatedProducts: {
    disposition: "public",
    requiredness: "optional",
    validate: optional(isStringArray),
  },
  replacementProduct: {
    disposition: "public",
    requiredness: "optional",
    validate: optional(isString),
  },
  tags: {
    disposition: "public",
    requiredness: "optional",
    validate: optional(isStringArray),
  },
  lifecycle: {
    disposition: "public",
    requiredness: "optional",
    validate: optional(isProductLifecycle),
  },
  inStock: {
    disposition: "public",
    requiredness: "optional",
    validate: optional(isBoolean),
  },
  featured: {
    disposition: "public",
    requiredness: "optional",
    validate: optional(isBoolean),
  },
  seoTitle: {
    disposition: "forbidden-copy",
    requiredness: "optional",
    validate: optional(isString),
  },
  seoDescription: {
    disposition: "forbidden-copy",
    requiredness: "optional",
    validate: optional(isString),
  },
  siemensUrl: {
    disposition: "public",
    requiredness: "optional",
    validate: optional(isString),
  },
};

function isProductKey(key: PropertyKey): key is keyof Product {
  return (
    typeof key === "string" &&
    Object.prototype.hasOwnProperty.call(PRODUCT_BOUNDARY_POLICY, key)
  );
}

function isPublicPrimitive(value: unknown): value is PublicPrimitive {
  return (
    value === null ||
    value === undefined ||
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  );
}

function getPublicValuePrototype(value: object, path: string): object | null {
  try {
    return Object.getPrototypeOf(value);
  } catch {
    throw new TypeError(`Unsupported public Product value at ${path}.`);
  }
}

function getPublicValueOwnKeys(
  value: object,
  path: string
): readonly PropertyKey[] {
  try {
    return Reflect.ownKeys(value);
  } catch {
    throw new TypeError(`Unsupported public Product value at ${path}.`);
  }
}

function getPublicValueDescriptor(
  value: object,
  key: PropertyKey,
  path: string
): PropertyDescriptor | undefined {
  try {
    return Object.getOwnPropertyDescriptor(value, key);
  } catch {
    throw new TypeError(`Unsupported public Product property at ${path}.`);
  }
}

function cloneAndDeepFreezePublicValue(
  value: unknown,
  path: string,
  ancestors = new WeakSet<object>()
): unknown {
  if (isPublicPrimitive(value)) {
    if (typeof value === "number" && !Number.isFinite(value)) {
      throw new TypeError(`Unsupported public Product value at ${path}.`);
    }

    return value;
  }

  if (Array.isArray(value)) {
    if (getPublicValuePrototype(value, path) !== Array.prototype) {
      throw new TypeError(`Unsupported public Product value at ${path}.`);
    }

    if (ancestors.has(value)) {
      throw new TypeError(`Unsupported public Product cycle at ${path}.`);
    }

    ancestors.add(value);

    const descriptors = new Map<string, PropertyDescriptor>();

    for (const key of getPublicValueOwnKeys(value, path)) {
      if (typeof key !== "string") {
        throw new TypeError(`Unsupported public Product key at ${path}.`);
      }

      const descriptor = getPublicValueDescriptor(value, key, `${path}.${key}`);
      const isLength = key === "length";

      if (
        !descriptor ||
        !("value" in descriptor) ||
        (isLength ? descriptor.enumerable : !descriptor.enumerable) ||
        (!isLength && !/^(0|[1-9]\d*)$/.test(key))
      ) {
        throw new TypeError(
          `Unsupported public Product property at ${path}.${key}.`
        );
      }

      descriptors.set(key, descriptor);
    }

    const lengthDescriptor = descriptors.get("length");
    const length = lengthDescriptor?.value;

    if (
      typeof length !== "number" ||
      !Number.isSafeInteger(length) ||
      length < 0 ||
      descriptors.size !== length + 1
    ) {
      throw new TypeError(`Unsupported public Product value at ${path}.`);
    }

    const clone: unknown[] = [];

    for (let index = 0; index < length; index += 1) {
      const descriptor = descriptors.get(String(index));

      if (!descriptor) {
        throw new TypeError(
          `Unsupported public Product property at ${path}[${index}].`
        );
      }

      Object.defineProperty(clone, String(index), {
        configurable: true,
        enumerable: true,
        value: cloneAndDeepFreezePublicValue(
          descriptor.value,
          `${path}[${index}]`,
          ancestors
        ),
        writable: true,
      });
    }

    ancestors.delete(value);
    return Object.freeze(clone);
  }

  if (typeof value !== "object") {
    throw new TypeError(`Unsupported public Product value at ${path}.`);
  }

  const prototype = getPublicValuePrototype(value, path);
  if (prototype !== Object.prototype && prototype !== null) {
    throw new TypeError(`Unsupported public Product value at ${path}.`);
  }

  if (ancestors.has(value)) {
    throw new TypeError(`Unsupported public Product cycle at ${path}.`);
  }

  ancestors.add(value);

  const clone: Record<string, unknown> = {};
  const descriptors = new Map<string, PropertyDescriptor>();

  for (const key of getPublicValueOwnKeys(value, path)) {
    if (typeof key !== "string") {
      throw new TypeError(`Unsupported public Product key at ${path}.`);
    }

    const descriptor = getPublicValueDescriptor(value, key, `${path}.${key}`);
    if (!descriptor || !("value" in descriptor) || !descriptor.enumerable) {
      throw new TypeError(
        `Unsupported public Product property at ${path}.${key}.`
      );
    }

    descriptors.set(key, descriptor);
  }

  for (const [key, descriptor] of descriptors) {
    Object.defineProperty(clone, key, {
      configurable: true,
      enumerable: true,
      value: cloneAndDeepFreezePublicValue(
        descriptor.value,
        `${path}.${key}`,
        ancestors
      ),
      writable: true,
    });
  }

  ancestors.delete(value);
  return Object.freeze(clone);
}

export interface SanitizedProductBoundary {
  readonly publicProduct: PublicProductRecord;
  readonly trustedProduct: Readonly<Product>;
}

function defineProductProperty<Key extends keyof Product>(
  target: Partial<Product>,
  key: Key,
  value: Product[Key]
): void {
  Object.defineProperty(target, key, {
    configurable: true,
    enumerable: true,
    value,
    writable: true,
  });
}

function cloneAndValidateProductValue<Key extends keyof Product>(
  key: Key,
  value: unknown
): Product[Key] {
  const clonedValue = cloneAndDeepFreezePublicValue(value, `Product.${key}`);
  // TypeScript does not preserve the key/value correlation for a generic
  // indexed access into a mapped object, while the mapped declaration above
  // proves this exact relationship for every Product key.
  const rule = PRODUCT_BOUNDARY_POLICY[key] as ProductBoundaryRule<Key>;

  if (!rule.validate(clonedValue)) {
    throw new TypeError(`Unsupported public Product value at Product.${key}.`);
  }

  return clonedValue;
}

export function createSanitizedProductBoundary(
  product: unknown
): SanitizedProductBoundary {
  if (
    typeof product !== "object" ||
    product === null ||
    Array.isArray(product)
  ) {
    throw new TypeError("Unsupported public Product record.");
  }

  let prototype: object | null;

  try {
    prototype = Object.getPrototypeOf(product);
  } catch {
    throw new TypeError("Unsupported public Product record.");
  }

  if (prototype !== Object.prototype) {
    throw new TypeError("Unsupported public Product record.");
  }

  let ownKeys: readonly PropertyKey[];

  try {
    ownKeys = Reflect.ownKeys(product);
  } catch {
    throw new TypeError("Unsupported public Product record.");
  }

  const descriptors = new Map<keyof Product, PropertyDescriptor>();

  for (const key of ownKeys) {
    if (!isProductKey(key)) {
      throw new TypeError("Unsupported public Product key.");
    }

    let descriptor: PropertyDescriptor | undefined;

    try {
      descriptor = Object.getOwnPropertyDescriptor(product, key);
    } catch {
      throw new TypeError("Unsupported public Product property.");
    }

    if (!descriptor || !("value" in descriptor) || !descriptor.enumerable) {
      throw new TypeError(
        `Unsupported public Product property at Product.${key}.`
      );
    }

    descriptors.set(key, descriptor);
  }

  for (const key of Reflect.ownKeys(PRODUCT_BOUNDARY_POLICY)) {
    if (!isProductKey(key)) {
      throw new TypeError("Unsupported Product boundary policy key.");
    }

    if (
      PRODUCT_BOUNDARY_POLICY[key].requiredness === "required" &&
      !descriptors.has(key)
    ) {
      throw new TypeError(
        `Unsupported public Product property at Product.${key}.`
      );
    }
  }

  const trustedRecord: Partial<Product> = {};
  const publicRecord: Record<string, unknown> = {};

  for (const [key, descriptor] of descriptors) {
    const trustedValue = cloneAndValidateProductValue(key, descriptor.value);

    defineProductProperty(trustedRecord, key, trustedValue);

    if (PRODUCT_BOUNDARY_POLICY[key].disposition === "forbidden-copy") continue;

    Object.defineProperty(publicRecord, key, {
      configurable: true,
      enumerable: true,
      value: cloneAndDeepFreezePublicValue(
        trustedValue,
        `PublicProduct.${key}`
      ),
      writable: true,
    });
  }

  return Object.freeze({
    publicProduct: Object.freeze(publicRecord) as PublicProductRecord,
    trustedProduct: Object.freeze(trustedRecord) as Readonly<Product>,
  });
}

export function createPublicProductCardCopyDTO(
  copy: Readonly<ResolvedProductCopy>
): PublicProductCardCopyDTO {
  assertResolverIssuedProductCopy(copy);

  const approvedPersian = copy.source === "approved-fa";
  const shortDescription = clonePublicParagraph(copy.shortDescription);

  return Object.freeze({
    language: approvedPersian ? "fa" : "en",
    direction: approvedPersian ? "rtl" : "ltr",
    shortDescription,
    searchText: normalizeProductSearchValue(
      serializeProductCopyParagraphForSearch(copy.shortDescription)
    ),
  });
}

export function createProductListItemViewModel(
  product: Readonly<Product>,
  locale: AppLocale
): ProductListItemViewModel {
  const { publicProduct, trustedProduct } =
    createSanitizedProductBoundary(product);
  const resolvedCopy = resolveProductCopy(trustedProduct, locale);

  return Object.freeze({
    product: publicProduct,
    copy: createPublicProductCardCopyDTO(resolvedCopy),
  });
}

export function createProductListItemViewModels(
  products: readonly Readonly<Product>[],
  locale: AppLocale
): readonly ProductListItemViewModel[] {
  return Object.freeze(
    products.map((product) => createProductListItemViewModel(product, locale))
  );
}
