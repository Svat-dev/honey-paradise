import type { Prisma } from "@prisma/client"

import { EnumApiRoute } from "../../../src/shared/lib/common/constants"

export const categoriesAndProductsData: Prisma.CategoryCreateInput[] = [
	{
		title: {
			ru: "Натуральный мёд",
			en: "Natural honey"
		},
		slug: "natural-honey-product",
		image: `${EnumApiRoute.STATIC_CATEGORIES}/natural-honey.webp`
	},
	{
		title: {
			ru: "Крем-мёд",
			en: "Cream honey"
		},
		slug: "cream-honey-product",
		image: `${EnumApiRoute.STATIC_CATEGORIES}/cream-honey.webp`
	},
	{
		title: {
			ru: "Продуты пчеловодства",
			en: "Beekeeping products"
		},
		slug: "beekeeping-products",
		image: `${EnumApiRoute.STATIC_CATEGORIES}/beekeeping-products.webp`
	}
]
