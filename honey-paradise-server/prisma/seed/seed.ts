import { PrismaClient } from "@prisma/client"

import { categoriesAndProductsData } from "./data/cats&products"
import { productsData } from "./data/product"
import { productVariants } from "./data/productVariants"
import { promoCodesData } from "./data/promoCodes"

const prisma = new PrismaClient()

function log(
	message: any,
	type: "error" | "success" | "loading",
	...optionalParams: any[]
) {
	const date = new Date().toISOString()

	console.log(
		`[${date}]`,
		`[${type.toUpperCase()}]`,
		message,
		...optionalParams
	)
}

async function productAndVariants(i: number, categoryId: string) {
	let j: number = 0

	for (const productData of productsData[i]) {
		try {
			j++

			log("Creating product", "loading", j, productData.slug)

			const variants = productVariants[i][j]
			const { _count } = await prisma.product.create({
				data: {
					...productData,
					category: { connect: { id: categoryId } },
					variants: { createMany: { data: variants, skipDuplicates: true } }
				},
				select: { _count: { select: { variants: true } } }
			})

			log(
				"Product created",
				"success",
				j,
				productData.slug,
				"with",
				_count.variants,
				"variants"
			)
		} catch (error) {
			log(
				"Error while creating product",
				"error",
				i,
				productData.slug,
				"\n",
				error
			)
			continue
		}
	}

	return j
}

async function categoriesAndProducts() {
	let i: number = 0

	for (const data of categoriesAndProductsData) {
		try {
			i++

			log("Creating category", "loading", i, data.slug)

			const { id } = await prisma.category.create({
				data,
				select: { id: true }
			})

			const productsCount = await productAndVariants(i, id)

			log(
				"Category created",
				"success",
				i,
				data.slug,
				"with",
				productsCount,
				"products"
			)
		} catch (error) {
			log("Error while creating category", "error", i, data.slug, "\n", error)
			continue
		}
	}

	return true
}

async function promoCodes() {
	let i: number = 0

	for (const data of promoCodesData) {
		try {
			i++

			log("Creating promo code...", "loading", i, data.id)

			await prisma.promoToken.create({ data })

			log("Created promo code", "success", i, data.token)
		} catch (error) {
			log("Error while creating promo code", "error", i, data.id)
			continue
		}
	}

	return true
}

async function main() {
	log("Starting data upload to database...", "loading")

	try {
		await categoriesAndProducts()
		// await promoCodes();
	} catch (error) {
		log("Error during data upload:", "error", error)
		process.exit(1)
	} finally {
		await prisma.$disconnect()

		log("Successfully seeded the database!", "success")
		log("Disconnected from database.", "success")
	}
}

main()
