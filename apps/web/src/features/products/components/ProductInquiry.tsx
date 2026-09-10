"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";

import type { Product } from "@/features/products/types/product.types";
import type { ProductInquiryInput } from "../lib/inquiry.schema";
import { validateProductInquiry } from "../lib/inquiry.validation";

interface ProductInquiryProps {
  product: Product;
  onClose?: () => void;
}

export default function ProductInquiry({
  product,
  onClose,
}: ProductInquiryProps) {
  const t = useTranslations("Inquiry");
  const [quantity, setQuantity] = useState("1");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<
    Partial<Record<keyof ProductInquiryInput, string>>
  >({});

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function localizeValidationErrors(
    validationErrors: Partial<Record<keyof ProductInquiryInput, string>>,
    input: ProductInquiryInput,
  ) {
    const localizedErrors: Partial<
      Record<keyof ProductInquiryInput, string>
    > = {};

    if (validationErrors.quantity) {
      localizedErrors.quantity = t("validation.quantityMin");
    }

    if (validationErrors.name) {
      localizedErrors.name = t("validation.nameRequired");
    }

    if (validationErrors.email) {
      localizedErrors.email = input.email.trim()
        ? t("validation.emailInvalid")
        : t("validation.emailRequired");
    }

    const hasUnmappedErrors = Object.keys(validationErrors).some(
      (field) => !["quantity", "name", "email"].includes(field),
    );

    return { localizedErrors, hasUnmappedErrors };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const input: ProductInquiryInput = {
      productId: product.id,
      productTitle: product.title,
      partNumber: product.partNumber,
      quantity: Number(quantity),
      name,
      company: company || undefined,
      email,
      phone: phone || undefined,
      message: message || undefined,
    };

    const result = validateProductInquiry(input);

    if (!result.valid) {
      const { localizedErrors, hasUnmappedErrors } =
        localizeValidationErrors(result.errors, input);
      setErrors(localizedErrors);
      setSubmitError(
        hasUnmappedErrors || Object.keys(localizedErrors).length === 0
          ? t("submitError")
          : "",
      );
      return;
    }

    setErrors({});
    setSubmitError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      let data: {
        success?: boolean;
        message?: string;
        errors?: Partial<Record<keyof ProductInquiryInput, string>>;
      };

      try {
        data = (await response.json()) as typeof data;
      } catch {
        setSubmitError(t("submitError"));
        return;
      }

      if (!response.ok || !data.success) {
        if (data.errors) {
          const { localizedErrors, hasUnmappedErrors } =
            localizeValidationErrors(data.errors, input);
          setErrors(localizedErrors);
          setSubmitError(
            hasUnmappedErrors || Object.keys(localizedErrors).length === 0
              ? t("submitError")
              : "",
          );
        } else {
          setSubmitError(t("submitError"));
        }

        return;
      }
    } catch {
      setSubmitError(t("connectionError"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section
      aria-labelledby="product-inquiry-title"
      className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="product-inquiry-title"
              className="text-xl font-bold text-slate-900"
            >
              {t("title")}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {t("description")}
            </p>
          </div>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label={t("close")}
              className="rounded-lg px-2 py-1 text-xl leading-none text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              ×
            </button>
          )}
        </div>

        <div className="mt-4 rounded-lg bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-900">
            <bdi dir="ltr">{product.title}</bdi>
          </p>

          <p className="mt-1 font-mono text-xs text-slate-500">
            <bdi dir="ltr">{product.partNumber}</bdi>
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {submitError && (
          <div
            role="alert"
            className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            {submitError}
          </div>
        )}
        <div>
          <label
            htmlFor="inquiry-quantity"
            className="block text-sm font-medium text-slate-700"
          >
            {t("quantity")}
          </label>

          <input
            id="inquiry-quantity"
            name="quantity"
            type="number"
            dir="ltr"
            min="1"
            step="1"
            required
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            aria-invalid={Boolean(errors.quantity)}
            className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
          />

          {errors.quantity && (
            <p className="mt-1 text-xs text-red-600">{errors.quantity}</p>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="inquiry-name"
              className="block text-sm font-medium text-slate-700"
            >
              {t("name")}
            </label>

            <input
              id="inquiry-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              aria-invalid={Boolean(errors.name)}
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
            />

            {errors.name && (
              <p className="mt-1 text-xs text-red-600">{errors.name}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="inquiry-company"
              className="block text-sm font-medium text-slate-700"
            >
              {t("company")}
            </label>

            <input
              id="inquiry-company"
              name="company"
              type="text"
              autoComplete="organization"
              value={company}
              onChange={(event) => setCompany(event.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="inquiry-email"
              className="block text-sm font-medium text-slate-700"
            >
              {t("email")}
            </label>

            <input
              id="inquiry-email"
              name="email"
              type="email"
              dir="ltr"
              autoComplete="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-invalid={Boolean(errors.email)}
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
            />

            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="inquiry-phone"
              className="block text-sm font-medium text-slate-700"
            >
              {t("phone")}
            </label>

            <input
              id="inquiry-phone"
              name="phone"
              type="tel"
              dir="ltr"
              autoComplete="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="inquiry-message"
            className="block text-sm font-medium text-slate-700"
          >
            {t("message")}
          </label>

          <textarea
            id="inquiry-message"
            name="message"
            rows={5}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={t("messagePlaceholder")}
            className="mt-1.5 w-full resize-y rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-cyan-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700 focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? t("submitting") : t("submit")}
        </button>
      </form>
    </section>
  );
}
