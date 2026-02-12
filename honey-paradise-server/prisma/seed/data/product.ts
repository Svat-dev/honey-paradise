import type { Prisma } from "@prisma/client"

import { EnumApiRoute } from "../../../src/shared/lib/common/constants"

export const productsData: Record<
	number,
	Omit<Prisma.ProductCreateInput, "category">[]
> = {
	1: [
		{
			title: {
				en: "Meadow honey",
				ru: "Луговой мед"
			},
			slug: "meadow-honey",
			description: {
				en: "Common meadow honey from different flowers",
				ru: "Обычный луговой мед из разных цветов"
			},
			images: [
				`${EnumApiRoute.STATIC_PRODUCTS}/meadow-honey-1.webp`,
				`${EnumApiRoute.STATIC_PRODUCTS}/meadow-honey-2.webp`,
				`${EnumApiRoute.STATIC_PRODUCTS}/meadow-honey-3.webp`
			]
		}
	],
	2: [
		{
			title: {
				en: "Raspberry cream-honey",
				ru: "Малиновый крем-мед"
			},
			slug: "raspberry-cream-honey",
			images: [
				`${EnumApiRoute.STATIC_PRODUCTS}/cream-honey-raspberry-1.webp`,
				`${EnumApiRoute.STATIC_PRODUCTS}/cream-honey-raspberry-2.webp`
			]
		},
		{
			title: {
				en: "Orange cream-honey",
				ru: "Апельсиновый крем-мед"
			},
			slug: "orange-cream-honey",
			images: [
				`${EnumApiRoute.STATIC_PRODUCTS}/cream-honey-orange-1.webp`,
				`${EnumApiRoute.STATIC_PRODUCTS}/cream-honey-orange-2.webp`
			]
		}
	],
	3: [
		{
			title: {
				en: "Propolis",
				ru: "Прополис"
			},
			slug: "propolis",
			description: {
				en: "Bee glue or uza is a resinous substance used by bees to cover cracks. Useful substance",
				ru: "Пчелиный клей или уза — смолистое вещество, используемое пчёлами для замазывания щелей. Полезное вещество"
			},
			images: [
				`${EnumApiRoute.STATIC_PRODUCTS}/propolis-1.webp`,
				`${EnumApiRoute.STATIC_PRODUCTS}/propolis-2.webp`
			]
		},
		{
			title: {
				en: "The honeycomb",
				ru: "Пчелиные соты"
			},
			slug: "honeycombs",
			description: {
				en: "Wax buildings of honey bees, consisting of ordered cells containing honey inside them.",
				ru: "Восковые постройки медоносных пчёл, состоящие из упорядоченных ячеек внутри них содержится мед."
			},
			images: [
				`${EnumApiRoute.STATIC_PRODUCTS}/honeycomb-1.webp`,
				`${EnumApiRoute.STATIC_PRODUCTS}/honeycomb-2.webp`,
				`${EnumApiRoute.STATIC_PRODUCTS}/honeycomb-3.webp`
			]
		}
	]
}
