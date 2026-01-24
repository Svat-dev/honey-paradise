import { useAuth, useMyAccount, useMyCart } from "@/shared/lib/hooks/auth";

import { useSwitchFavoritesProducts } from "@/services/hooks/products/useManageFavoritesS";
import { useGetPrice } from "@/shared/lib/hooks/useGetPrice";
import { useLanguage } from "@/shared/lib/i18n/hooks";
import { useTranslations } from "next-intl";
import { useState } from "react";
import toast from "react-hot-toast";

export const useProductCard = (priceInUsd: number, totalDiscount: number) => {
	const t = useTranslations("global.home.content");
	const { locale } = useLanguage(false);

	const { user } = useMyAccount();
	const { getPrice } = useGetPrice(user?.settings.defaultCurrency);

	const totalPrice = priceInUsd - priceInUsd * totalDiscount;

	return {
		getPrice,
		totalPrice,
		locale,
		t,
	};
};

export const useProductCardFooter = (isLikedServer: boolean) => {
	const t = useTranslations("global.home.content");

	const { isAuthenticated } = useAuth();
	const { switchFavoriteProductAsync, isSwitchingFavoritesProduct } = useSwitchFavoritesProducts();
	const { addCartItem, loading } = useMyCart();

	const [isLiked, setIsLiked] = useState<boolean>(isLikedServer);

	const addToCart = async (id: string) => addCartItem({ productId: id, quantity: 1 }, () => toast.success(t("products.toasters.success")));

	const switchFavorites = async (id: string) => {
		try {
			setIsLiked(prev => !prev);
			await switchFavoriteProductAsync(id);
		} catch (error) {
			toast.error(t("products.toasters.error.like"));
			setIsLiked(prev => !prev);
		}
	};

	return {
		addToCart,
		switchFavorites,
		isAuthenticated,
		isAddingCartItem: loading.add,
		isSwitchingFavoritesProduct,
		isLiked,
		t,
	};
};
