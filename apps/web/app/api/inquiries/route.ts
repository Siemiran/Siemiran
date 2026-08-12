import { NextResponse } from "next/server";

import type { ProductInquiryInput } from "@/features/products/lib/inquiry.schema";
import { validateProductInquiry } from "@/features/products/lib/inquiry.validation";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<ProductInquiryInput>;

    const input: ProductInquiryInput = {
      productId: typeof body.productId === "string" ? body.productId : "",
      productTitle:
        typeof body.productTitle === "string" ? body.productTitle : "",
      partNumber: typeof body.partNumber === "string" ? body.partNumber : "",
      quantity:
        typeof body.quantity === "number"
          ? body.quantity
          : Number(body.quantity),
      name: typeof body.name === "string" ? body.name : "",
      company: typeof body.company === "string" ? body.company : undefined,
      email: typeof body.email === "string" ? body.email : "",
      phone: typeof body.phone === "string" ? body.phone : undefined,
      message: typeof body.message === "string" ? body.message : undefined,
    };

    const validation = validateProductInquiry(input);

    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Inquiry received successfully.",
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Invalid request.",
      },
      { status: 400 }
    );
  }
}
