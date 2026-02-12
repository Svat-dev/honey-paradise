import type { Prisma } from "@prisma/client"

type TProductVariant = Record<
	number, // This is category index
	Record<
		number, // This is product index
		Prisma.ProductVariantCreateManyProductInput[]
	>
>

export const productVariants: TProductVariant = {
	1: {
		1: [
			{ weight: 500, priceInUsd: 10.99 },
			{ weight: 700, priceInUsd: 12.99 },
			{ weight: 1000, priceInUsd: 14.99 }
		]
	},
	2: {
		1: [
			{ weight: 250, priceInUsd: 11.99 },
			{ weight: 400, priceInUsd: 13.99 },
			{ weight: 700, priceInUsd: 15.99 }
		],
		2: [
			{ weight: 200, priceInUsd: 13.99 },
			{ weight: 400, priceInUsd: 15.99 },
			{ weight: 700, priceInUsd: 17.99 }
		]
	},
	3: {
		1: [
			{ weight: 100, priceInUsd: 5.99 },
			{ weight: 250, priceInUsd: 7.99 },
			{ weight: 500, priceInUsd: 13.99 },
			{ weight: 800, priceInUsd: 19.99 }
		],
		2: [
			{ weight: 250, priceInUsd: 8.99 },
			{ weight: 500, priceInUsd: 15.99 },
			{ weight: 1000, priceInUsd: 29.99 }
		]
	}
}
