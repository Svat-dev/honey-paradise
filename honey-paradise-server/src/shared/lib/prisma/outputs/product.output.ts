import { productCategoryOutput } from "./category.output";

//: Prisma.ProductSelect
export const productOutput = {
	select: {
		id: true,
		title: true,
		slug: true,
		description: true,
		priceInUsd: true,
		rating: true,
		images: true,
		_count: {
			select: {
				reviews: true,
			},
		},
	},
};

export const productBySlugOutput = {
	...productOutput.select,
	extraRating: true,
	category: {
		select: productCategoryOutput,
	},
};

export const productFavoriteOutput = {
	id: true,
	title: true,
	slug: true,
	priceInUsd: true,
	images: true,
};
