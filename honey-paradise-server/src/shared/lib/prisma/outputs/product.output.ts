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
				comments: true,
			},
		},
	},
};
