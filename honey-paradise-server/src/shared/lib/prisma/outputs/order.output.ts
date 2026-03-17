export const ordersDefaultOutput = {
	id: true,
	index: true,

	status: true,
	items: true,

	createdAt: true
}

export const ordersMoreInfoOutput = {
	items: true,

	transaction: {
		select: { id: true, amount: true, status: true, createdAt: true }
	}
}

export const orderItemVariantOutput = {
	id: true,
	art: true,

	weight: true,

	product: { select: { images: true, title: true, slug: true } }
}
