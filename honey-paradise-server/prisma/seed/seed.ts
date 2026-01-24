import { PrismaClient } from "@prisma/client";
import { categoriesAndProductsData } from "./data/cats&products";
import { promoCodesData } from "./data/promoCodes";

const prisma = new PrismaClient();

function log(
  message: any,
  type: "error" | "success" | "loading",
  ...optionalParams: any[]
) {
  const date = new Date().toISOString();

  console.log(
    `[${date}]`,
    `[${type.toUpperCase()}]`,
    message,
    ...optionalParams,
  );
}

async function categoriesAndProducts() {
  let i: number = 0;

  for (const data of categoriesAndProductsData) {
    try {
      i++;

      log("Creating category", "loading", i, data.slug);

      const { _count } = await prisma.category.create({
        data,
        select: { _count: { select: { products: true } } },
      });

      log(
        "Category created",
        "success",
        i,
        data.slug,
        "with",
        _count.products,
        "products",
      );
    } catch (error) {
      log("Error while creating product", "error", i, data.slug);
      continue;
    }
  }

  return true;
}

async function promoCodes() {
  let i: number = 0;

  for (const data of promoCodesData) {
    try {
      i++;

      log("Creating promo code...", "loading", i, data.id);

      await prisma.promoToken.create({ data });

      log("Created promo code", "success", i, data.token);
    } catch (error) {
      log("Error while creating promo code", "error", i, data.id);
      continue;
    }
  }

  return true;
}

async function main() {
  log("Starting data upload to database...", "loading");

  try {
    // await categoriesAndProducts();
    await promoCodes();
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
