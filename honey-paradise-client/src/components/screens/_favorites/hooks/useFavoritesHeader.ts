import { errorCatch } from "@/api/api-helper";
import { useAddFavoritesToCart, useClearFavoritesProducts } from "@/services/hooks/products";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

export const useFavoritesHeader = () => {
  const { clearFavoritesProductsAsync, isClearingFavoritesProducts } = useClearFavoritesProducts();
  const { addFavoritesToCartAsync, isAddingFavoritesToCart } = useAddFavoritesToCart();

  const handleClearFavorites = async () => {
    try {
      await clearFavoritesProductsAsync();
    } catch (e) {
      const { errMsg } = errorCatch(e as AxiosError);
      toast.error(errMsg);
    }
  };

  const handleAddFavoritesToCart = async () => {
    try {
      await addFavoritesToCartAsync();
    } catch (e) {
      const { errMsg } = errorCatch(e as AxiosError);
      toast.error(errMsg);
    }
  };

  return {
    handleClearFavorites,
    handleAddFavoritesToCart,
    isClearingFavoritesProducts,
    isAddingFavoritesToCart,
  };
};
