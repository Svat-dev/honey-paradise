import { useMyCart } from "@/shared/lib/hooks/auth";
import { useGetPrice } from "@/shared/lib/hooks/useGetPrice";
import type { GetMyCartResponseCurrency, UpdateQuantityDtoType } from "@/shared/types/server";
import { useEffect, useState } from "react";

export const useCartItem = (currency: GetMyCartResponseCurrency, quantity: number) => {
  const { loading, deleteCartItem, updateQuantity } = useMyCart();
  const { getPrice } = useGetPrice(currency);

  const [amount, setAmount] = useState<number>(quantity);

  const changeQuantity = (type: UpdateQuantityDtoType, cartItemId: string) => {
    updateQuantity({ type, cartItemId });
    setAmount((prev) => (type === "increase" ? prev + 1 : prev - 1));
  };

  useEffect(() => {
    if (quantity !== amount) setAmount(quantity);
  }, [quantity]);

  const isDeleting = loading.delete;
  const isLoading = isDeleting || loading.update;

  return {
    amount,
    changeQuantity,
    deleteCartItem,
    isLoading,
    isDeleting,
    getPrice,
  };
};
