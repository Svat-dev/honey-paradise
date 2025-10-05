import { PrismaClient } from "@prisma/client";
import { categoriesData } from "./data/category";
import { productsData } from "./data/product";

const prisma = new PrismaClient();

async function categories() {
	const res = await prisma.category.createMany({ data: categoriesData, skipDuplicates: true });

	console.log(`Added ${res.count} categories to database`);

	return true;
}

async function products() {
	const res = await prisma.product.createMany({ data: productsData, skipDuplicates: true });

	console.log(`Added ${res.count} products to database`);

	return true;
}

async function main() {
	console.log("Starting data upload to database...");

	try {
		// await categories();
		await products();
	} catch (error) {
		console.error("Error during data upload:", error);
		process.exit(1);
	} finally {
		await prisma.$disconnect();

		console.log("Successfully seeded the database!");
		console.log("Disconnected from database.");
	}
}

main();
