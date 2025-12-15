import { EnumStorageKeys } from "@/shared/lib/constants/base";
import { useMyAccount } from "@/shared/lib/hooks/auth";
import { useLanguage } from "@/shared/lib/i18n/hooks";
import { useEffect } from "react";
import type { IViewedProductsHistory } from "../types/product.type";

export const useProduct = (id: string) => {
	const { user, isAccLoading } = useMyAccount();
	const { locale } = useLanguage();

	useEffect(() => {
		const history: IViewedProductsHistory[] = JSON.parse(localStorage.getItem(EnumStorageKeys.VIEWED_PRODUCTS_HISTORY) || "[]");

		if (!history.find(item => item.id === id)) {
			if (history.length >= 10) history.shift();

			const timestamp = new Date().toISOString();

			history.push({ id, timestamp });
			localStorage.setItem(EnumStorageKeys.VIEWED_PRODUCTS_HISTORY, JSON.stringify(history));
		}
	}, []);

	const isLikedServer = user?.likedProductIds.includes(id);

	return {
		user,
		isAccLoading,
		locale,
		isLikedServer,
	};
};
