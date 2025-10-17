export const cartItemDefaultOutput = {
	id: true,

	priceInUSD: true,
	quantity: true,
	productId: true,

	createdAt: true,
	updatedAt: true,
}; // Prisma.CartItemSelect

export const cartDefaultOutput = {
	id: true,

	cartItems: { select: cartItemDefaultOutput },
	totalPrice: true,

	createdAt: true,
	updatedAt: true,
}; // Prisma.CartSelect
