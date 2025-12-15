import { useEffect, useMemo, useState } from "react";

import { productsService } from "@/services/products.service";
import { EnumStorageKeys } from "@/shared/lib/constants/base";
import { queryKeys } from "@/shared/lib/constants/routes";
import { GetProductResponse } from "@/shared/types/server";
import { useQuery } from "@tanstack/react-query";
import type { IViewedProductsHistory } from "../../_product/types/product.type";

export const useRecentSection = () => {
	const [history, setHistory] = useState<IViewedProductsHistory[]>([]);
	const [isHistoryLoading, setIsLoading] = useState<boolean>(true);

	const ids = history.map(item => item.id);

	const { data } = useQuery({
		queryKey: [queryKeys.getRecentViewedProducts, ids],
		queryFn: () => productsService.getByIds(ids),
		enabled: history.length > 0,
		refetchInterval: 1000 * 60,
	});

	const removeFromHistory = (id: string) => {
		const newHistory = history.filter(item => item.id !== id);

		localStorage.setItem(EnumStorageKeys.VIEWED_PRODUCTS_HISTORY, JSON.stringify(newHistory));
		setHistory(newHistory);
	};

	const products: (GetProductResponse & { timestamp: string })[] = [];
	for (const item of history) {
		const product = data?.find(product => product.id === item.id);
		if (product) products.push({ ...product, timestamp: item.timestamp });
	}

	products.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

	useEffect(() => {
		const data: IViewedProductsHistory[] = JSON.parse(localStorage.getItem(EnumStorageKeys.VIEWED_PRODUCTS_HISTORY) || "[]");

		setHistory(data);
		setIsLoading(false);
	}, []);

	return useMemo(
		() => ({
			history,
			products,
			isHistoryLoading,
			removeFromHistory,
		}),
		[history, products, isHistoryLoading]
	);
};
