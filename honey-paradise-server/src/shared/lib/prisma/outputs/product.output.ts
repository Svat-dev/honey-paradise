export const productOutput = {
	select: {
		id: true,
		title: true,
		description: true,
		priceInUsd: true,
		rating: true,
		_count: {
			select: {
				comments: true,
			},
		},
	},
};
