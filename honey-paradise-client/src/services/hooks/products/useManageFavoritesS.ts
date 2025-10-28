import { productsService } from "@/services/products.service";
import { queryKeys } from "@/shared/lib/constants/routes";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddFavoritesToCart = () => {
  const client = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [queryKeys.addFavoritesToCart],
    mutationFn: () => productsService.addFavoritesToCart(),
    onSuccess: () => client.refetchQueries({ queryKey: [queryKeys.getMyCart] }),
  });

  return {
    addFavoritesToCartAsync: mutateAsync,
    isAddingFavoritesToCart: isPending,
  };
};

export const useSwitchFavoritesProducts = () => {
  const client = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [queryKeys.switchFavoritesProducts],
    mutationFn: (productId: string) => productsService.switchFavoritesProduct(productId),
    onSuccess: () => client.refetchQueries({ queryKey: [queryKeys.getFavoriteProducts] }),
  });

  return {
    switchFavoriteProductAsync: mutateAsync,
    isSwitchingFavoritesProduct: isPending,
  };
};

export const useClearFavoritesProducts = () => {
  const client = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [queryKeys.clearAllFavoritesProducts],
    mutationFn: () => productsService.clearAllFavoritesProducts(),
    onSuccess: () => client.refetchQueries({ queryKey: [queryKeys.getFavoriteProducts] }),
  });

  return {
    clearFavoritesProductsAsync: mutateAsync,
    isClearingFavoritesProducts: isPending,
  };
};
