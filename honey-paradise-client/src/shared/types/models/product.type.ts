export interface IProduct {
	id: string

	title: string
	description?: string

	priceInUsd: number
	rating: number

	categoryId: string

	createdAt: Date
	updatedAt: Date
}
