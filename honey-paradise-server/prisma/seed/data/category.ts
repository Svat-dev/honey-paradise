import type { Prisma } from "@prisma/client";

export const categoriesData: Prisma.CategoryCreateManyInput[] = [
	{
		title: {
			ru: "Натуральный мёд",
			en: "Natural honey",
		},
		slug: "natural-honey-product",
	},
	{
		title: {
			ru: "Крем-мёд",
			en: "Cream honey",
		},
		slug: "cream-honey-product",
	},
	{
		title: {
			ru: "Продуты пчеловодства",
			en: "Beekeeping products",
		},
		slug: "beekeeping-products",
	},
];
