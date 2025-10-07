import type { Prisma } from "@prisma/client";

export const productsData: Record<number, Prisma.ProductCreateManyCategoryInput[]> = {
	1: [
		{
			title: {
				en: "Meadow honey",
				ru: "Луговой мед",
			},
			description: {
				en: "Common meadow honey from different flowers",
				ru: "Обычный луговой мед из разных цветов",
			},
			priceInUsd: 10,
		},
	],
	2: [
		{
			title: {
				en: "Raspberry cream-honey",
				ru: "Малиновый крем-мед",
			},
			priceInUsd: 15,
		},
		{
			title: {
				en: "Mango cream-honey",
				ru: "Манговый крем-мед",
			},
			priceInUsd: 20,
		},
	],
	3: [
		{
			title: {
				en: "Propolis",
				ru: "Прополис",
			},
			description: {
				en: "Bee glue or uza is a resinous substance used by bees to cover cracks. Useful substance",
				ru: "Пчелиный клей или уза — смолистое вещество, используемое пчёлами для замазывания щелей. Полезное вещество",
			},
			priceInUsd: 20,
		},
	],
};
