import type { Prisma } from "@prisma/client";

export const productsData: Prisma.ProductCreateManyInput[] = [
	{
		title: {
			en: "Meadow honey",
			ru: "Луговой мед",
		},
		description: {
			en: "Common meadow honey from different flowers",
			ru: "Обычный луговой мед из разных цветов",
		},
		categoryId: "eGjtQ5wSEPMbCvFut-o42",
		priceInUsd: 10,
	},
	{
		title: {
			en: "Raspberry cream-honey",
			ru: "Малиновый крем-мед",
		},
		categoryId: "_ZGC6H_0jf-TtknYau1d8",
		priceInUsd: 15,
	},
	{
		title: {
			en: "Mango cream-honey",
			ru: "Манговый крем-мед",
		},
		categoryId: "_ZGC6H_0jf-TtknYau1d8",
		priceInUsd: 20,
	},
	{
		title: {
			en: "Propolis",
			ru: "Прополис",
		},
		description: {
			en: "Bee glue or uza is a resinous substance used by bees to cover cracks. Useful substance",
			ru: "Пчелиный клей или уза — смолистое вещество, используемое пчёлами для замазывания щелей. Полезное вещество",
		},
		categoryId: "p0aY7QYqFsCSO0hoZ8w72",
		priceInUsd: 20,
	},
];
