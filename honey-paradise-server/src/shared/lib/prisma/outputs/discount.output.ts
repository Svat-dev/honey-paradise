import { productDiscountOutput } from "./product.output";

export const discountProductOutput = {
  id: true,
  type: true,
  discount: true,
};

export const discountDefaultOutput = {
  ...discountProductOutput,
  expiresAt: true,
  products: { select: productDiscountOutput },
};
