import { productsService } from "@/services/products.service";
import { queryKeys } from "@/shared/lib/constants/routes";
import { useMutation } from "@tanstack/react-query";

export const useSwitchFavoritesProducts = () => {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: [queryKeys.switchFavoritesProducts],
		mutationFn: (productId: string) => productsService.switchFavoritesProduct(productId),
	});

	return {
		switchFavoriteProductAsync: mutateAsync,
		isSwitchingFavoritesProduct: isPending,
	};
};

export const useClearFavoritesProducts = () => {
	// const { mutateAsync, isPending } = useMutation({
	// 	mutationKey: [queryKeys.clearAllFavoritesProducts],
	// 	mutationFn: () => productsService.getAllCatsWithProducts(),
	// });
	// return {
	//   clearFavoritesProductsAsync: mutateAsync,
	//   isClearingFavoritesProducts: isPending,
	// };
};
