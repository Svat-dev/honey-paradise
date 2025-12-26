import { EnumPromoTokenDiscountType, EnumPromoTokenTypes, type Prisma } from "@prisma/client";

export const promoCodesData: Prisma.PromoTokenCreateInput[] = [
	{
		token: "MY_HAPPY_BIRTHDAY",
		type: EnumPromoTokenTypes.BIRTHDAY,
		discount: 0.15,
		discountType: EnumPromoTokenDiscountType.ALL,
	},
	{
		token: "SHOP_HAPPY_BIRTHDAY",
		type: EnumPromoTokenTypes.SHOP_BIRTHDAY,
		discount: 0.15,
		discountType: EnumPromoTokenDiscountType.ALL,
	},
	{
		token: "MY_FIRST_ORDER_EVER",
		type: EnumPromoTokenTypes.FIRST_ORDER,
		discount: 0.2,
		discountType: EnumPromoTokenDiscountType.ALL,
	},
];
