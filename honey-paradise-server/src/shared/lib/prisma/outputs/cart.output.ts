export const cartItemProductVariantOutput = {
	id: true,
	art: true,
	product: { select: { id: true, title: true, images: true, slug: true } }
}

export const cartItemDefaultOutput = {
	id: true,

	priceInUSD: true,
	weight: true,
	quantity: true,

	createdAt: true
} // Prisma.CartItemSelect

export const cartDefaultOutput = {
	id: true,
	totalPrice: true,

	_count: { select: { cartItems: true } },
	createdAt: true
} // Prisma.CartSelect
