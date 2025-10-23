export const cartItemDefaultOutput = {
	id: true,

	priceInUSD: true,
	quantity: true,
	product: {
		select: {
			id: true,
			title: true,
			slug: true,
			images: true,
		},
	},

	createdAt: true,
}; // Prisma.CartItemSelect

export const cartDefaultOutput = {
	id: true,

	cartItems: { select: cartItemDefaultOutput },
	totalPrice: true,

	createdAt: true,
}; // Prisma.CartSelect
