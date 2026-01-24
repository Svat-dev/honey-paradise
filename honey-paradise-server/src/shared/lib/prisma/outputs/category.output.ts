import { productOutput } from "./product.output"

export const productCategoryOutput = {
	id: true,
	title: true,
	slug: true
}

export const categoryOutput = {
	...productCategoryOutput,
	products: productOutput
}
