import { EnumAppRoute, queryKeys } from "@/shared/lib/constants/routes";
import type { ApiJsonValue, GetMyCartResponseCurrency } from "@/shared/types/server";
import { MessageCircleMoreIcon, StarIcon } from "lucide-react";

import { errorCatch } from "@/api/api-helper";
import { Link } from "@/components/ui/common";
import { useSwitchFavoritesProducts } from "@/services/hooks/products";
import { useMyCart } from "@/shared/lib/hooks/auth";
import { useGetPrice } from "@/shared/lib/hooks/useGetPrice";
import { useLanguage } from "@/shared/lib/i18n/hooks";
import { capitalize } from "@/shared/lib/utils/base";
import { useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import toast from "react-hot-toast";
import type { IProductDescriptionPropsData } from "../types/product-description.type";

export const useProductDescription = (
	{ id, description, priceInUsd, category, rating, reviews }: IProductDescriptionPropsData,
	currency: GetMyCartResponseCurrency | undefined
) => {
	const t = useTranslations("global.product.content");
	const { locale } = useLanguage();

	const { push } = useRouter();
	const client = useQueryClient();
	const { getPrice } = useGetPrice(currency);

	const { addCartItem, cart, loading } = useMyCart();
	const { switchFavoriteProductAsync, isSwitchingFavoritesProduct } = useSwitchFavoritesProducts(queryKeys.getMyAccount);

	const isInCart = cart?.cartItems.some(el => el.product.id === id);

	const handleSwitchFavorite = async () => {
		try {
			await switchFavoriteProductAsync(id);
		} catch (e) {
			const { errMsg } = errorCatch(e as AxiosError);
			toast.error(errMsg);
		}
	};

	const handleAddToCart = () => {
		if (isInCart) return push(EnumAppRoute.MY_CART);

		const onSuccess = () => {
			client.refetchQueries({ queryKey: [queryKeys.getMyCart], type: "all" });
			toast.success("Товар добавлен в корзину!");
		};

		addCartItem({ priceInUSD: priceInUsd, productId: id, quantity: 1 }, onSuccess);
	};

	const descData = useMemo(
		() => [
			{
				name: t("description.category"),
				value: (
					<Link
						href={EnumAppRoute.CATALOG + `/${category.slug}`}
						className="will-change-auto transition-all hover:text-muted hover:shadow-sm"
					>
						{capitalize(category.title[locale as keyof ApiJsonValue], true)}
					</Link>
				),
			},
			{
				name: t("description.text.name"),
				value: description ? description[locale as keyof ApiJsonValue] : t("description.text.noDesc"),
			},
			{
				name: t("description.rating.name"),
				value: t.rich("description.rating.value", { rating, icon: () => <StarIcon size={20} className="ml-1" /> }),
			},
			{
				name: t("description.comment"),
				value: (
					<Link href="#product-reviews">
						{reviews} <MessageCircleMoreIcon size={20} className="ml-1" />
					</Link>
				),
			},
		],
		[locale, rating, reviews]
	);

	return {
		t,
		descData,
		handleSwitchFavorite,
		handleAddToCart,
		getPrice,
		isInCart,
		loading,
		isSwitchingFavoritesProduct,
	};
};
