import { PrismaClient } from "@prisma/client";
import { categoriesAndProductsData } from "./data/cats&products";

const prisma = new PrismaClient();

function log(message: any, type: "error" | "success" | "loading", ...optionalParams: any[]) {
	const date = new Date().toISOString();

	console.log(`[${date}]`, `[${type.toUpperCase()}]`, message, ...optionalParams);
}

async function categoriesAndProducts() {
	let i: number = 0;

	for (const data of categoriesAndProductsData) {
		i++;

		log("Creating category", "loading", i, data.slug);

		const { _count } = await prisma.category.create({ data, select: { _count: { select: { products: true } } } });

		log("Category created", "success", i, data.slug, "with", _count.products, "products");
	}

	return true;
}

async function main() {
	log("Starting data upload to database...", "loading");

	try {
		await categoriesAndProducts();
	} catch (error) {
		log("Error during data upload:", "error", error);
		process.exit(1);
	} finally {
		await prisma.$disconnect();

		log("Successfully seeded the database!", "success");
		log("Disconnected from database.", "success");
	}
}

main();
