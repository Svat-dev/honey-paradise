"use client";

import { useGetFavoriteProducts } from "@/services/hooks/products/useGetFavoriteProductsS";
import { FavoriteProductCard } from "./FavoriteProductCard";
import { useMyAccount } from "@/shared/lib/hooks/auth";
import { useGetPrice } from "@/shared/lib/hooks/useGetPrice";
import { FavoritesLoading } from "./FavoritesLoading";
import { FavoritesHeader } from "./FavoritesHeader";
import { AnimatePresence } from "motion/react";
import { FavoritesEmpty } from "./FavoritesEmpty";

const FavoritesContent = () => {
  const { user } = useMyAccount();
  const { favoriteProducts, isFavoritesLoading } = useGetFavoriteProducts();
  const { getPrice } = useGetPrice(user?.settings.defaultCurrency);

  return (
    <>
      <FavoritesHeader
        total={getPrice(favoriteProducts?.data.total || 0, true, true)}
        length={favoriteProducts?.data.length}
        isLoading={isFavoritesLoading}
      />

      <section className="flex flex-col gap-4">
        <AnimatePresence mode="sync">
          {isFavoritesLoading ? (
            <FavoritesLoading limit={4} />
          ) : favoriteProducts?.data.length === 0 ? (
            <FavoritesEmpty />
          ) : (
            favoriteProducts?.data.products.map((item) => (
              <FavoriteProductCard key={item.id} price={getPrice(item.priceInUsd, true, true)} {...item} />
            ))
          )}
        </AnimatePresence>
      </section>
    </>
  );
};

export { FavoritesContent };
