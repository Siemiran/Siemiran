export interface ProductInquiryInput {
  productId: string;
  productTitle: string;
  partNumber: string;

  quantity: number;

  name: string;
  company?: string;

  email: string;
  phone?: string;

  message?: string;
}
