import type { Prisma } from "@prisma/client";
import { productsData } from "./product";

export const categoriesAndProductsData: Prisma.CategoryCreateInput[] = [
	{
		title: {
			ru: "Натуральный мёд",
			en: "Natural honey",
		},
		slug: "natural-honey-product",
		products: {
			createMany: { data: productsData[1], skipDuplicates: true },
		},
	},
	{
		title: {
			ru: "Крем-мёд",
			en: "Cream honey",
		},
		slug: "cream-honey-product",
		products: {
			createMany: { data: productsData[2], skipDuplicates: true },
		},
	},
	{
		title: {
			ru: "Продуты пчеловодства",
			en: "Beekeeping products",
		},
		slug: "beekeeping-products",
		products: {
			createMany: { data: productsData[3], skipDuplicates: true },
		},
	},
];
